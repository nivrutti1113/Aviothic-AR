import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Upload, 
  Trash2, 
  ZoomIn, 
  Sun, 
  Ruler, 
  Maximize2, 
  Minimize2,
  AlertCircle, 
  User, 
  Database,
  Crosshair,
  RefreshCw,
  FolderOpen,
  Square,
  Circle,
  FileText,
  Download,
  Compass,
  Layers,
  Type,
  Undo,
  Redo,
  Save
} from 'lucide-react';

// VTK.js core imports
import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData';
import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkImageSlice from '@kitware/vtk.js/Rendering/Core/ImageSlice';
import vtkImageMapper from '@kitware/vtk.js/Rendering/Core/ImageMapper';
import ImageConstants from '@kitware/vtk.js/Rendering/Core/ImageMapper/Constants';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkCoordinate from '@kitware/vtk.js/Rendering/Core/Coordinate';
import vtkInteractorStyleImage from '@kitware/vtk.js/Interaction/Style/InteractorStyleImage';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';

// Modular Rendering Engine Imports
import { useRenderingStore } from './rendering/renderingStore';
import { VolumeViewer } from './rendering/VolumeViewer';
import { VolumeManager } from './rendering/volume/VolumeManager';
import { volumeCache } from './rendering/cache/VolumeCache';
import { MeshExporter } from './rendering/volume/Exporter';
import vtkLookupTable from '@kitware/vtk.js/Common/Core/LookupTable';
// @ts-ignore
import vtkImageMarchingCubes from '@kitware/vtk.js/Filters/General/ImageMarchingCubes';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';

// Import VTK rendering profiles (required to register rendering backends like WebGL)
import '@kitware/vtk.js/Rendering/Profiles/All';

const { SlicingMode } = ImageConstants;

const API_BASE = "http://localhost:8000/api";

function computePercentiles(data: Int16Array) {
  const sampleSize = Math.min(data.length, 100000);
  const step = Math.max(1, Math.floor(data.length / sampleSize));
  const samples: number[] = [];
  for (let i = 0; i < data.length; i += step) {
    samples.push(data[i]);
  }
  samples.sort((a, b) => a - b);
  const p1 = samples[Math.floor(samples.length * 0.01)] ?? samples[0] ?? 0;
  const p99 = samples[Math.floor(samples.length * 0.99)] ?? samples[samples.length - 1] ?? 1000;
  const min = samples[0] ?? 0;
  const max = samples[samples.length - 1] ?? 1000;
  return { min, max, p1, p99 };
}



// Interfaces
interface PatientCase {
  id: string;
  patient_id: string;
  patient_name: string;
  patient_birth_date: string;
  patient_sex: string;
  modality: string;
  study_uid: string;
  series_uid: string;
  slice_count: number;
  status: string;
  error_message: string | null;
  width: number | null;
  height: number | null;
  depth: number | null;
  dx: number | null;
  dy: number | null;
  dz: number | null;
  window_center: number | null;
  window_width: number | null;
  created_at: string;
}

interface Annotation {
  id: string;
  case_id: string;
  type: 'distance' | 'marker' | 'angle' | 'area' | 'roi_rect' | 'roi_circle' | 'volume_sphere' | 'text';
  label: string;
  data: {
    points: [number, number, number][]; // 3D world coordinates
    screenPoints?: { x: number; y: number }[];
    sliceIndex: number;
    viewportType: 'axial' | 'sagittal' | 'coronal';
    distanceMm?: number;
    angleDeg?: number;
    areaMm2?: number;
    radiusMm?: number;
    volumeMm3?: number;
    voxelVolumeMm3?: number;
    threshold?: number;
    notes?: string;
    color?: string;
    stats?: {
      mean: number;
      sd: number;
      min: number;
      max: number;
    } | null;
  };
}

interface HistoryAction {
  type: 'add' | 'delete' | 'edit';
  annotation: Annotation;
  prevAnnotation?: Annotation;
}

export default function App() {
  // Auth state
  const [user, setUser] = useState<{ username: string; role: string; token: string } | null>(null);
  const [username, setUsername] = useState('radiologist');
  const [password, setPassword] = useState('clinical123');
  const [authError, setAuthError] = useState('');

  // App state
  // Zustand state selection
  const {
    activeCase,
    setActiveCase,
    activeCaseMeta,
    setActiveCaseMeta,
    loadedVolume,
    setLoadedVolume,
    activeTool,
    setActiveTool,
    activeColor,
    setActiveColor,
    selectedAnnotationId,
    setSelectedAnnotationId,
    annotations,
    setAnnotations,
    caliperPoints,
    setCaliperPoints,
    caliperViewport,
    setCaliperViewport,
    tempCaliperEnd,
    setTempCaliperEnd,
    undoStack,
    setUndoStack,
    redoStack,
    setRedoStack,
    sliceAxial,
    setSliceAxial,
    sliceSagittal,
    setSliceSagittal,
    sliceCoronal,
    setSliceCoronal,
    windowWidth,
    setWindowWidth,
    windowLevel,
    setWindowLevel,
    activePreset,
    setActivePreset,
    active3DPreset,
    setActive3DPreset,
    intensityStats,
    setIntensityStats,
    activeLabel,
    setActiveLabel,
    brushRadius,
    setBrushRadius,
    thresholdMin,
    setThresholdMin,
    thresholdMax,
    setThresholdMax,
    regionGrowTolerance,
    setRegionGrowTolerance,
    show3DMesh,
    setShow3DMesh,
    meshOpacity,
    setMeshOpacity,
    volumeOpacity,
    setVolumeOpacity,
    segmentStats,
    setSegmentStats,
    scissorsPoints,
    setScissorsPoints,
    scissorsViewport,
    setScissorsViewport,
  } = useRenderingStore();

  const [cases, setCases] = useState<PatientCase[]>([]);
  const [loadingCases, setLoadingCases] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'viewer' | 'report'>('viewer');
  const [reportHistory, setReportHistory] = useState<string>('');
  const [reportFindings, setReportFindings] = useState<string>('');
  const [reportImpression, setReportImpression] = useState<string>('');
  const [reportRecommendations, setReportRecommendations] = useState<string>('');

  const [volumeThreshold, setVolumeThreshold] = useState<number>(0);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [deidentify, setDeidentify] = useState(true);

  const [loadingVolume, setLoadingVolume] = useState('');
  const [is3DExpanded, setIs3DExpanded] = useState(false);
  const [isGeneratingMesh, setIsGeneratingMesh] = useState<boolean>(false);
  const [, setSegRevision] = useState<number>(0);

  // Segmentation buffer references
  const labelMapRef = useRef<Uint8Array | null>(null);
  const labelImageDataRef = useRef<vtkImageData | null>(null);
  const labelScalarsRef = useRef<vtkDataArray | null>(null);

  // Mesh reference
  const marchingCubesRef = useRef<any>(null);
  const polyDataRef = useRef<any>(null);

  // Viewport DOM refs
  const axialContainerRef = useRef<HTMLDivElement>(null);
  const sagittalContainerRef = useRef<HTMLDivElement>(null);
  const coronalContainerRef = useRef<HTMLDivElement>(null);
  const volumeContainerRef = useRef<HTMLDivElement>(null);

  // VTK object refs to prevent re-creation
  const vtkObjectsRef = useRef<{
    imageData: vtkImageData | null;
    viewports: {
      axial: { renderer: vtkRenderer; renderWindow: vtkRenderWindow; mapper: vtkImageMapper; actor: vtkImageSlice; interactor: vtkRenderWindowInteractor; openGLRenderWindow: vtkOpenGLRenderWindow; labelActor?: vtkImageSlice | null; labelMapper?: vtkImageMapper | null } | null;
      sagittal: { renderer: vtkRenderer; renderWindow: vtkRenderWindow; mapper: vtkImageMapper; actor: vtkImageSlice; interactor: vtkRenderWindowInteractor; openGLRenderWindow: vtkOpenGLRenderWindow; labelActor?: vtkImageSlice | null; labelMapper?: vtkImageMapper | null } | null;
      coronal: { renderer: vtkRenderer; renderWindow: vtkRenderWindow; mapper: vtkImageMapper; actor: vtkImageSlice; interactor: vtkRenderWindowInteractor; openGLRenderWindow: vtkOpenGLRenderWindow; labelActor?: vtkImageSlice | null; labelMapper?: vtkImageMapper | null } | null;
      volume: { renderer: vtkRenderer; renderWindow: vtkRenderWindow; mapper: vtkVolumeMapper; actor: vtkVolume; interactor: vtkRenderWindowInteractor; openGLRenderWindow: vtkOpenGLRenderWindow; colorFun: vtkColorTransferFunction; opacityFun: vtkPiecewiseFunction; meshActor?: vtkActor | null; meshMapper?: vtkMapper | null } | null;
    };
  }>({
    imageData: null,
    viewports: { axial: null, sagittal: null, coronal: null, volume: null }
  });

  // Fetch Cases on startup or login
  useEffect(() => {
    if (user) {
      fetchCases();
    }
  }, [user]);

  // Polling for processing status
  useEffect(() => {
    const interval = setInterval(() => {
      const processingCases = cases.filter(c => c.status === 'processing' || c.status === 'pending');
      if (processingCases.length > 0) {
        fetchCases(false); // Silent reload
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [cases]);



  // Handle active tool updates on interactors
  useEffect(() => {
    const vp = vtkObjectsRef.current.viewports;
    
    // Set proper interactor styles
    ['axial', 'sagittal', 'coronal'].forEach((key) => {
      const viewport = (vp as any)[key];
      if (viewport && viewport.interactor) {
        if (activeTool === 'distance') {
          // Disable interactor camera movement style during caliper plotting
          viewport.interactor.setInteractorStyle(null);
        } else {
          // Use default PACS interaction style (WL, Zoom, Pan out of the box)
          const style = vtkInteractorStyleImage.newInstance();
          viewport.interactor.setInteractorStyle(style);
        }
      }
    });

    if (vp.volume && vp.volume.interactor) {
      const style = vtkInteractorStyleTrackballCamera.newInstance();
      vp.volume.interactor.setInteractorStyle(style);
    }
  }, [activeTool]);

  const computeVoxelStats = (
    pts: [number, number, number][],
    toolType: string,
    vPort: 'axial' | 'sagittal' | 'coronal',
    sIdx: number,
    tVal: number | null = null
  ) => {
    if (!loadedVolume || !activeCaseMeta || pts.length === 0) {
      return null;
    }

    const { width: W, height: H, depth: D, dx, dy, dz } = activeCaseMeta;
    if (!dx || !dy || !dz) return null;
    const voxels = new Int16Array(loadedVolume.binBuffer);

    let values: number[] = [];
    let areaMm2 = 0;
    let volumeMm3 = 0;
    let voxelVolumeMm3 = 0;

    const dist3D = (a: number[], b: number[]) => {
      return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
    };

    if (toolType === 'roi_rect') {
      if (pts.length < 2) return null;
      const p1 = pts[0];
      const p2 = pts[1];

      const ix1 = Math.max(0, Math.min(W - 1, Math.round(p1[0] / dx)));
      const iy1 = Math.max(0, Math.min(H - 1, Math.round(p1[1] / dy)));
      const iz1 = Math.max(0, Math.min(D - 1, Math.round(p1[2] / dz)));

      const ix2 = Math.max(0, Math.min(W - 1, Math.round(p2[0] / dx)));
      const iy2 = Math.max(0, Math.min(H - 1, Math.round(p2[1] / dy)));
      const iz2 = Math.max(0, Math.min(D - 1, Math.round(p2[2] / dz)));

      const minX = Math.min(ix1, ix2);
      const maxX = Math.max(ix1, ix2);
      const minY = Math.min(iy1, iy2);
      const maxY = Math.max(iy1, iy2);
      const minZ = Math.min(iz1, iz2);
      const maxZ = Math.max(iz1, iz2);

      let wMm = 0;
      let hMm = 0;

      if (vPort === 'axial') {
        wMm = Math.abs(p2[0] - p1[0]);
        hMm = Math.abs(p2[1] - p1[1]);
        const iz = sIdx;
        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            values.push(voxels[x + y * W + iz * W * H]);
          }
        }
      } else if (vPort === 'sagittal') {
        wMm = Math.abs(p2[1] - p1[1]);
        hMm = Math.abs(p2[2] - p1[2]);
        const ix = sIdx;
        for (let z = minZ; z <= maxZ; z++) {
          for (let y = minY; y <= maxY; y++) {
            values.push(voxels[ix + y * W + z * W * H]);
          }
        }
      } else if (vPort === 'coronal') {
        wMm = Math.abs(p2[0] - p1[0]);
        hMm = Math.abs(p2[2] - p1[2]);
        const iy = sIdx;
        for (let z = minZ; z <= maxZ; z++) {
          for (let x = minX; x <= maxX; x++) {
            values.push(voxels[x + iy * W + z * W * H]);
          }
        }
      }
      areaMm2 = wMm * hMm;

    } else if (toolType === 'roi_circle') {
      if (pts.length < 2) return null;
      const center = pts[0];
      const radiusMm = dist3D(center, pts[1]);
      areaMm2 = Math.PI * radiusMm * radiusMm;

      if (vPort === 'axial') {
        const iz = sIdx;
        const minX = Math.max(0, Math.floor((center[0] - radiusMm) / dx));
        const maxX = Math.min(W - 1, Math.ceil((center[0] + radiusMm) / dx));
        const minY = Math.max(0, Math.floor((center[1] - radiusMm) / dy));
        const maxY = Math.min(H - 1, Math.ceil((center[1] + radiusMm) / dy));

        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            const wx = x * dx;
            const wy = y * dy;
            const dist = Math.sqrt(Math.pow(wx - center[0], 2) + Math.pow(wy - center[1], 2));
            if (dist <= radiusMm) {
              values.push(voxels[x + y * W + iz * W * H]);
            }
          }
        }
      } else if (vPort === 'sagittal') {
        const ix = sIdx;
        const minY = Math.max(0, Math.floor((center[1] - radiusMm) / dy));
        const maxY = Math.min(H - 1, Math.ceil((center[1] + radiusMm) / dy));
        const minZ = Math.max(0, Math.floor((center[2] - radiusMm) / dz));
        const maxZ = Math.min(D - 1, Math.ceil((center[2] + radiusMm) / dz));

        for (let z = minZ; z <= maxZ; z++) {
          for (let y = minY; y <= maxY; y++) {
            const wy = y * dy;
            const wz = z * dz;
            const dist = Math.sqrt(Math.pow(wy - center[1], 2) + Math.pow(wz - center[2], 2));
            if (dist <= radiusMm) {
              values.push(voxels[ix + y * W + z * W * H]);
            }
          }
        }
      } else if (vPort === 'coronal') {
        const iy = sIdx;
        const minX = Math.max(0, Math.floor((center[0] - radiusMm) / dx));
        const maxX = Math.min(W - 1, Math.ceil((center[0] + radiusMm) / dx));
        const minZ = Math.max(0, Math.floor((center[2] - radiusMm) / dz));
        const maxZ = Math.min(D - 1, Math.ceil((center[2] + radiusMm) / dz));

        for (let z = minZ; z <= maxZ; z++) {
          for (let x = minX; x <= maxX; x++) {
            const wx = x * dx;
            const wz = z * dz;
            const dist = Math.sqrt(Math.pow(wx - center[0], 2) + Math.pow(wz - center[2], 2));
            if (dist <= radiusMm) {
              values.push(voxels[x + iy * W + z * W * H]);
            }
          }
        }
      }

    } else if (toolType === 'volume_sphere') {
      if (pts.length < 2) return null;
      const center = pts[0];
      const radiusMm = dist3D(center, pts[1]);
      volumeMm3 = (4.0 / 3.0) * Math.PI * Math.pow(radiusMm, 3);

      const minX = Math.max(0, Math.floor((center[0] - radiusMm) / dx));
      const maxX = Math.min(W - 1, Math.ceil((center[0] + radiusMm) / dx));
      const minY = Math.max(0, Math.floor((center[1] - radiusMm) / dy));
      const maxY = Math.min(H - 1, Math.ceil((center[1] + radiusMm) / dy));
      const minZ = Math.max(0, Math.floor((center[2] - radiusMm) / dz));
      const maxZ = Math.min(D - 1, Math.ceil((center[2] + radiusMm) / dz));

      const thresh = tVal !== null ? tVal : (windowLevel - windowWidth / 2);
      let count = 0;

      for (let z = minZ; z <= maxZ; z++) {
        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            const wx = x * dx;
            const wy = y * dy;
            const wz = z * dz;
            const dist = Math.sqrt(Math.pow(wx - center[0], 2) + Math.pow(wy - center[1], 2) + Math.pow(wz - center[2], 2));
            if (dist <= radiusMm) {
              const val = voxels[x + y * W + z * W * H];
              values.push(val);
              if (val >= thresh) {
                count++;
              }
            }
          }
        }
      }
      voxelVolumeMm3 = count * (dx * dy * dz);

    } else if (toolType === 'area') {
      const n = pts.length;
      if (n < 3) return null;

      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        const p1 = pts[i];
        const p2 = pts[j];
        if (vPort === 'axial') {
          areaMm2 += p1[0] * p2[1] - p2[0] * p1[1];
        } else if (vPort === 'sagittal') {
          areaMm2 += p1[1] * p2[2] - p2[1] * p1[2];
        } else {
          areaMm2 += p1[0] * p2[2] - p2[0] * p1[2];
        }
      }
      areaMm2 = Math.abs(areaMm2) / 2;

      const polyIndices = pts.map(p => {
        if (vPort === 'axial') return [Math.round(p[0] / dx), Math.round(p[1] / dy)] as [number, number];
        if (vPort === 'sagittal') return [Math.round(p[1] / dy), Math.round(p[2] / dz)] as [number, number];
        return [Math.round(p[0] / dx), Math.round(p[2] / dz)] as [number, number];
      });

      const xs = polyIndices.map(p => p[0]);
      const ys = polyIndices.map(p => p[1]);
      const minX = Math.max(0, Math.min(...xs));
      const maxX = Math.min(vPort === 'sagittal' ? H - 1 : W - 1, Math.max(...xs));
      const minY = Math.max(0, Math.min(...ys));
      const maxY = Math.min(vPort === 'axial' ? H - 1 : D - 1, Math.max(...ys));

      const isPointInPolygon = (x: number, y: number, poly: [number, number][]) => {
        let inside = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          const xi = poly[i][0], yi = poly[i][1];
          const xj = poly[j][0], yj = poly[j][1];
          const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
        }
        return inside;
      };

      if (vPort === 'axial') {
        const iz = sIdx;
        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            if (isPointInPolygon(x, y, polyIndices)) {
              values.push(voxels[x + y * W + iz * W * H]);
            }
          }
        }
      } else if (vPort === 'sagittal') {
        const ix = sIdx;
        for (let z = minY; z <= maxY; z++) {
          for (let y = minX; y <= maxX; y++) {
            if (isPointInPolygon(y, z, polyIndices)) {
              values.push(voxels[ix + y * W + z * W * H]);
            }
          }
        }
      } else if (vPort === 'coronal') {
        const iy = sIdx;
        for (let z = minY; z <= maxY; z++) {
          for (let x = minX; x <= maxX; x++) {
            if (isPointInPolygon(x, z, polyIndices)) {
              values.push(voxels[x + iy * W + z * W * H]);
            }
          }
        }
      }
    }

    if (values.length === 0) {
      return { mean: 0, sd: 0, min: 0, max: 0, areaMm2, volumeMm3, voxelVolumeMm3 };
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    const sd = Math.sqrt(variance);

    return { mean, sd, min, max, areaMm2, volumeMm3, voxelVolumeMm3 };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        const err = await res.json();
        setAuthError(err.detail || 'Login failed.');
      }
    } catch (e) {
      setAuthError('Connection refused by clinical server.');
    }
  };

  const fetchCases = async (showLoader = true) => {
    if (showLoader) setLoadingCases(true);
    try {
      const res = await fetch(`${API_BASE}/cases`, {
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch (e) {
      console.error("Failed to load patient index", e);
    } finally {
      if (showLoader) setLoadingCases(false);
    }
  };

  const selectCase = async (patientCase: PatientCase) => {
    if (patientCase.status !== 'completed') return;
    
    // Clean up old VTK objects before rendering new volume
    cleanupVtk();

    setActiveCase(patientCase);
    setLoadingVolume('Fetching volume metadata...');
    
    // Fetch manifest and binary volume
    try {
      const resMeta = await fetch(`${API_BASE}/cases/${patientCase.id}/volume`, {
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (!resMeta.ok) throw new Error("Failed to load manifest");
      const meta = await resMeta.json();
      setActiveCaseMeta(meta);

      setLoadingVolume('Downloading raw voxel data...');
      // Load binary voxel array
      const resBin = await fetch(`${API_BASE}/cases/${patientCase.id}/volume/raw`, {
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (!resBin.ok) throw new Error("Failed to download raw voxels");
      const binBuffer = await resBin.arrayBuffer();

      // Load and resample volume off-main-thread using Web Worker
      setLoadingVolume('Analyzing & resampling volume in background...');
      const cacheEntry = await VolumeManager.loadAndResampleVolume(patientCase.id, meta, binBuffer);

      // Compute actual pixel intensity histogram & percentiles
      const voxels = new Int16Array(cacheEntry.binBuffer);
      const stats = computePercentiles(voxels);
      setIntensityStats(stats);
      setActive3DPreset('default');

      // Modality-aware auto W/L setting
      let initialWW = meta.window_width || 800;
      let initialWL = meta.window_center || 400;
      if (patientCase.modality === 'MR' || patientCase.modality === 'MG') {
        initialWW = Math.max(1, stats.p99 - stats.p1);
        initialWL = Math.round((stats.p99 + stats.p1) / 2);
      }
      setWindowWidth(initialWW);
      setWindowLevel(initialWL);
      setVolumeThreshold(Math.round(initialWL - initialWW / 2));
      setSelectedAnnotationId(null);
      setUndoStack([]);
      setRedoStack([]);
      fetchReport(patientCase.id);

      setLoadingVolume('Initializing WebGL viewer rendering...');
      fetchAnnotations(patientCase.id);

      // Create base ImageData for rendering slices
      vtkObjectsRef.current.imageData = cacheEntry.imageData;

      // Create label map array
      const labelMapSize = meta.width * meta.height * meta.depth;
      const labelMap = new Uint8Array(labelMapSize);
      labelMapRef.current = labelMap;

      const labelImageData = vtkImageData.newInstance();
      labelImageData.setDimensions([meta.width, meta.height, meta.depth]);
      labelImageData.setSpacing([meta.dx, meta.dy, meta.dz]);
      labelImageData.setOrigin([0, 0, 0]);

      const labelScalars = vtkDataArray.newInstance({
        name: 'LabelScalars',
        numberOfComponents: 1,
        values: labelMap,
      });
      labelImageData.getPointData().setScalars(labelScalars);
      labelImageDataRef.current = labelImageData;
      labelScalarsRef.current = labelScalars;

      setLoadedVolume({ meta, binBuffer, initialWW, initialWL });

    } catch (e) {
      console.error(e);
      alert("Error initializing 3D volume mapping.");
      setLoadingVolume('');
    }
  };

  const fetchAnnotations = async (caseId: string) => {
    try {
      const res = await fetch(`${API_BASE}/cases/${caseId}/annotations`, {
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAnnotations(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchReport = async (caseId: string) => {
    try {
      const res = await fetch(`${API_BASE}/cases/${caseId}/report`, {
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReportHistory(data.clinical_history);
        setReportFindings(data.findings);
        setReportImpression(data.impression);
        setReportRecommendations(data.recommendations);
      }
    } catch (e) {
      console.error("Failed to load report", e);
    }
  };

  const saveReport = async () => {
    if (!activeCase) return;
    try {
      const res = await fetch(`${API_BASE}/cases/${activeCase.id}/report`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          clinical_history: reportHistory,
          findings: reportFindings,
          impression: reportImpression,
          recommendations: reportRecommendations
        })
      });
      if (res.ok) {
        alert("Clinical report saved successfully.");
      } else {
        alert("Failed to save report.");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving report.");
    }
  };

  const downloadReportPdf = () => {
    if (!activeCase) return;
    fetch(`${API_BASE}/cases/${activeCase.id}/report/pdf`, {
      headers: { 'Authorization': `Bearer ${user?.token}` }
    })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Case_${activeCase.id}_Clinical_Report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(err => {
      console.error(err);
      alert("Failed to download PDF report.");
    });
  };

  const handleAutoGenerateFindings = () => {
    if (annotations.length === 0) {
      setReportFindings("No quantitative measurements recorded.");
      return;
    }
    let summary = `QUANTITATIVE MEASUREMENT SUMMARY:\n`;
    annotations.forEach((ann, idx) => {
      summary += `${idx + 1}. [${ann.label || ann.type.toUpperCase()}] on ${ann.data.viewportType.toUpperCase()} slice ${ann.data.sliceIndex}:\n`;
      if (ann.type === 'distance') {
        summary += `   - Linear distance: ${ann.data.distanceMm} mm\n`;
      } else if (ann.type === 'angle') {
        summary += `   - Caliper angle: ${ann.data.angleDeg}°\n`;
      } else if (ann.type === 'area') {
        summary += `   - Cross-sectional Area: ${ann.data.areaMm2} mm²\n`;
      } else if (ann.type === 'roi_rect' || ann.type === 'roi_circle') {
        summary += `   - Cross-sectional Area: ${ann.data.areaMm2} mm²\n`;
        summary += `   - Voxel Intensity: Mean = ${ann.data.stats?.mean.toFixed(1)}, SD = ±${ann.data.stats?.sd.toFixed(1)}, Range = [${ann.data.stats?.min}, ${ann.data.stats?.max}]\n`;
      } else if (ann.type === 'volume_sphere') {
        summary += `   - Volumetric Sphere: Radius = ${ann.data.radiusMm?.toFixed(1)} mm, Geometric Volume = ${(ann.data.volumeMm3 ? ann.data.volumeMm3 / 1000 : 0).toFixed(2)} cc\n`;
        summary += `   - Segmented Voxel Volume: ${(ann.data.voxelVolumeMm3 ? ann.data.voxelVolumeMm3 / 1000 : 0).toFixed(2)} cc (Voxel intensity threshold >= ${ann.data.threshold})\n`;
      } else if (ann.type === 'text') {
        summary += `   - Clinical marker annotation: "${ann.data.notes || ''}"\n`;
      }
    });
    setReportFindings(prev => prev ? `${prev}\n\n${summary}` : summary);
  };

  const cleanupVtk = () => {
    setLoadedVolume(null);
    setLoadingVolume('');
    Object.keys(vtkObjectsRef.current.viewports).forEach((key) => {
      const vp = (vtkObjectsRef.current.viewports as any)[key];
      if (vp) {
        if (vp.interactor) vp.interactor.delete();
        if (vp.openGLRenderWindow) vp.openGLRenderWindow.delete();
        if (vp.renderer) vp.renderer.delete();
        if (vp.renderWindow) vp.renderWindow.delete();
        if (vp.mapper) vp.mapper.delete();
        if (vp.actor) vp.actor.delete();
        if (vp.labelActor) vp.labelActor.delete();
        if (vp.labelMapper) vp.labelMapper.delete();
        if (vp.meshActor) vp.meshActor.delete();
        if (vp.meshMapper) vp.meshMapper.delete();
      }
      (vtkObjectsRef.current.viewports as any)[key] = null;
    });
    if (vtkObjectsRef.current.imageData) {
      vtkObjectsRef.current.imageData.delete();
      vtkObjectsRef.current.imageData = null;
    }
    if (labelImageDataRef.current) {
      labelImageDataRef.current.delete();
      labelImageDataRef.current = null;
    }
    if (labelScalarsRef.current) {
      labelScalarsRef.current.delete();
      labelScalarsRef.current = null;
    }
    labelMapRef.current = null;
    marchingCubesRef.current = null;
    polyDataRef.current = null;
    setSegmentStats([]);
  };

  // Preset Handlers
  const applyPreset = (preset: 'brain' | 'bone' | 'soft') => {
    setActivePreset(preset as any);
    if (preset === 'brain') {
      setWindowWidth(80);
      setWindowLevel(40);
    } else if (preset === 'bone') {
      setWindowWidth(2000);
      setWindowLevel(500);
    } else if (preset === 'soft') {
      setWindowWidth(350);
      setWindowLevel(50);
    }
  };

  const applyMRPreset = (preset: 'standard' | 'high_contrast' | 'soft_emphasis') => {
    setActivePreset(preset as any);
    if (!intensityStats) return;
    const range = intensityStats.p99 - intensityStats.p1 || 1;
    if (preset === 'standard') {
      setWindowWidth(Math.round(range));
      setWindowLevel(Math.round((intensityStats.p99 + intensityStats.p1) / 2));
    } else if (preset === 'high_contrast') {
      setWindowWidth(Math.round(range * 0.5));
      setWindowLevel(Math.round((intensityStats.p99 + intensityStats.p1) / 2));
    } else if (preset === 'soft_emphasis') {
      setWindowWidth(Math.round(range * 0.8));
      setWindowLevel(Math.round(intensityStats.p1 + range * 0.4));
    }
  };

  const applyMGPreset = (preset: 'standard' | 'detail' | 'high_contrast') => {
    setActivePreset(preset as any);
    if (!intensityStats) return;
    const range = intensityStats.p99 - intensityStats.p1 || 1;
    if (preset === 'standard') {
      setWindowWidth(Math.round(range));
      setWindowLevel(Math.round((intensityStats.p99 + intensityStats.p1) / 2));
    } else if (preset === 'detail') {
      setWindowWidth(Math.round(range * 0.7));
      setWindowLevel(Math.round(intensityStats.p1 + range * 0.45));
    } else if (preset === 'high_contrast') {
      setWindowWidth(Math.round(range * 0.4));
      setWindowLevel(Math.round((intensityStats.p99 + intensityStats.p1) / 2));
    }
  };

  // Cursor mapping for tools
  const getCursorForTool = () => {
    if (activeTool === 'slice') return 'ns-resize';
    if (activeTool === 'wl') return 'ew-resize';
    if (activeTool === 'zoom') return 'grab';
    if (activeTool === 'distance' || activeTool === 'angle' || activeTool === 'area' || activeTool === 'roi_rect' || activeTool === 'roi_circle' || activeTool === 'volume_sphere') return 'crosshair';
    if (activeTool === 'paint' || activeTool === 'erase') return 'cell';
    if (activeTool === 'region_grow') return 'copy';
    if (activeTool === 'scissors') return 'nwse-resize';
    return 'default';
  };

  // Drag-to-Window/Level custom mouse handling
  const handleWlDrag = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = windowWidth;
    const startL = windowLevel;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      // Scaling factors
      const widthDelta = dx * 2;
      const levelDelta = -dy * 1.5;

      setWindowWidth(Math.max(1, Math.round(startW + widthDelta)));
      setWindowLevel(Math.round(startL + levelDelta));
      setActivePreset('manual');
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Drag-to-Slice custom mouse handling
  const handleSliceDrag = (e: React.MouseEvent, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    const startY = e.clientY;
    let startSlice = 0;
    let maxSlice = 1;
    if (viewportType === 'axial') {
      startSlice = sliceAxial;
      maxSlice = (activeCaseMeta?.depth || 1) - 1;
    } else if (viewportType === 'sagittal') {
      startSlice = sliceSagittal;
      maxSlice = (activeCaseMeta?.width || 1) - 1;
    } else if (viewportType === 'coronal') {
      startSlice = sliceCoronal;
      maxSlice = (activeCaseMeta?.height || 1) - 1;
    }

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dy = moveEvent.clientY - startY;
      const sliceDelta = Math.round(-dy / 5);
      const nextSlice = Math.max(0, Math.min(maxSlice, startSlice + sliceDelta));
      if (viewportType === 'axial') setSliceAxial(nextSlice);
      else if (viewportType === 'sagittal') setSliceSagittal(nextSlice);
      else if (viewportType === 'coronal') setSliceCoronal(nextSlice);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Drag-to-Pan custom mouse handling
  const handlePanDrag = (e: React.MouseEvent, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    const vp = (vtkObjectsRef.current.viewports as any)[viewportType];
    if (!vp || !vp.renderer || !vp.renderWindow) return;

    const camera = vp.renderer.getActiveCamera();
    const startX = e.clientX;
    const startY = e.clientY;
    
    const startFocal = [...camera.getFocalPoint()];
    const startPos = [...camera.getPosition()];
    const viewUp = camera.getViewUp();
    
    const container = vp.openGLRenderWindow.getContainer();
    const rect = container.getBoundingClientRect();
    const scale = camera.getParallelScale();
    const unitsPerPixel = (scale * 2) / rect.height;

    // Direction of projection
    const dop = [
      startFocal[0] - startPos[0],
      startFocal[1] - startPos[1],
      startFocal[2] - startPos[2]
    ];
    const len = Math.sqrt(dop[0]*dop[0] + dop[1]*dop[1] + dop[2]*dop[2]);
    dop[0] /= len; dop[1] /= len; dop[2] /= len;
    
    // Right vector
    const right = [
      dop[1] * viewUp[2] - dop[2] * viewUp[1],
      dop[2] * viewUp[0] - dop[0] * viewUp[2],
      dop[0] * viewUp[1] - dop[1] * viewUp[0]
    ];

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      const worldDx = -dx * unitsPerPixel;
      const worldDy = dy * unitsPerPixel;

      camera.setFocalPoint(
        startFocal[0] + worldDx * right[0] + worldDy * viewUp[0],
        startFocal[1] + worldDx * right[1] + worldDy * viewUp[1],
        startFocal[2] + worldDx * right[2] + worldDy * viewUp[2]
      );
      camera.setPosition(
        startPos[0] + worldDx * right[0] + worldDy * viewUp[0],
        startPos[1] + worldDx * right[1] + worldDy * viewUp[1],
        startPos[2] + worldDx * right[2] + worldDy * viewUp[2]
      );
      vp.renderWindow.render();
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Wheel zoom handler
  const handleViewportWheel = (e: React.WheelEvent, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    const vp = (vtkObjectsRef.current.viewports as any)[viewportType];
    if (!vp || !vp.renderer || !vp.renderWindow) return;
    
    const camera = vp.renderer.getActiveCamera();
    const currentScale = camera.getParallelScale();
    const factor = e.deltaY > 0 ? 1.05 : 0.95;
    
    camera.setParallelScale(currentScale * factor);
    vp.renderWindow.render();
  };

  // Click-drag or click-point drawing dispatcher
  const handleInteractiveDrawing = (e: React.MouseEvent, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    const vp = (vtkObjectsRef.current.viewports as any)[viewportType];
    if (!vp || !vp.renderer || !activeCase) return;

    const getWorldPos = (clientX: number, clientY: number) => {
      const rect = vp.openGLRenderWindow.getContainer().getBoundingClientRect();
      const x = clientX - rect.left;
      const y = rect.bottom - clientY;
      const coord = vtkCoordinate.newInstance();
      coord.setCoordinateSystemToDisplay();
      coord.setValue([x, y, 0]);
      const wPos = coord.getComputedWorldValue(vp.renderer) as [number, number, number];
      coord.delete();
      return wPos;
    };

    const p1 = getWorldPos(e.clientX, e.clientY);
    if (!p1) return;

    const currentSlice = viewportType === 'axial' ? sliceAxial : viewportType === 'sagittal' ? sliceSagittal : sliceCoronal;

    // Multi-click tools: angle and area
    if (activeTool === 'angle') {
      if (caliperPoints.length === 0) {
        setCaliperPoints([p1]);
        setCaliperViewport(viewportType);
        setTempCaliperEnd(p1);
      } else if (caliperPoints.length === 1) {
        setCaliperPoints([caliperPoints[0], p1]);
        setTempCaliperEnd(p1);
      } else if (caliperPoints.length === 2) {
        const pA = caliperPoints[0];
        const pB = caliperPoints[1]; // vertex
        const pC = p1;

        const vecBA = [pA[0] - pB[0], pA[1] - pB[1], pA[2] - pB[2]];
        const vecBC = [pC[0] - pB[0], pC[1] - pB[1], pC[2] - pB[2]];

        const dot = vecBA[0] * vecBC[0] + vecBA[1] * vecBC[1] + vecBA[2] * vecBC[2];
        const lenBA = Math.sqrt(vecBA[0]*vecBA[0] + vecBA[1]*vecBA[1] + vecBA[2]*vecBA[2]);
        const lenBC = Math.sqrt(vecBC[0]*vecBC[0] + vecBC[1]*vecBC[1] + vecBC[2]*vecBC[2]);

        let angleDeg = 0;
        if (lenBA > 0 && lenBC > 0) {
          const cosTheta = Math.max(-1, Math.min(1, dot / (lenBA * lenBC)));
          angleDeg = parseFloat((Math.acos(cosTheta) * 180 / Math.PI).toFixed(1));
        }

        const newAnn: Annotation = {
          id: Math.random().toString(36).substring(2, 9),
          case_id: activeCase.id,
          type: 'angle',
          label: `Angle ${annotations.filter(a => a.type === 'angle').length + 1}`,
          data: {
            points: [pA, pB, pC],
            sliceIndex: currentSlice,
            viewportType,
            angleDeg,
            color: activeColor
          }
        };
        saveAnnotationWithHistory(newAnn);

        setCaliperPoints([]);
        setCaliperViewport(null);
        setTempCaliperEnd(null);
      }
      return;
    }

    if (activeTool === 'area') {
      if (caliperPoints.length === 0) {
        setCaliperPoints([p1]);
        setCaliperViewport(viewportType);
        setTempCaliperEnd(p1);
      } else {
        const pStart = caliperPoints[0];
        const distToStart = Math.sqrt(
          Math.pow(p1[0] - pStart[0], 2) +
          Math.pow(p1[1] - pStart[1], 2) +
          Math.pow(p1[2] - pStart[2], 2)
        );

        if (distToStart < 6.0 && caliperPoints.length >= 3) {
          const pts = [...caliperPoints];
          const stats = computeVoxelStats(pts, 'area', viewportType, currentSlice);
          const newAnn: Annotation = {
            id: Math.random().toString(36).substring(2, 9),
            case_id: activeCase.id,
            type: 'area',
            label: `Area ${annotations.filter(a => a.type === 'area').length + 1}`,
            data: {
              points: pts,
              sliceIndex: currentSlice,
              viewportType,
              areaMm2: stats ? parseFloat(stats.areaMm2.toFixed(1)) : 0,
              stats,
              color: activeColor
            }
          };
          saveAnnotationWithHistory(newAnn);
          setCaliperPoints([]);
          setCaliperViewport(null);
          setTempCaliperEnd(null);
        } else {
          setCaliperPoints([...caliperPoints, p1]);
          setTempCaliperEnd(p1);
        }
      }
      return;
    }

    if (activeTool === 'text') {
      const textVal = prompt("Enter text note:");
      if (textVal) {
        const newAnn: Annotation = {
          id: Math.random().toString(36).substring(2, 9),
          case_id: activeCase.id,
          type: 'text',
          label: `Note ${annotations.filter(a => a.type === 'text').length + 1}`,
          data: {
            points: [p1],
            sliceIndex: currentSlice,
            viewportType,
            notes: textVal,
            color: activeColor
          }
        };
        saveAnnotationWithHistory(newAnn);
      }
      return;
    }

    // Click-drag tools: distance, roi_rect, roi_circle, volume_sphere
    setCaliperPoints([p1]);
    setCaliperViewport(viewportType);
    setTempCaliperEnd(p1);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const p2 = getWorldPos(moveEvent.clientX, moveEvent.clientY);
      if (p2) {
        setTempCaliperEnd(p2);
      }
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      const p2 = getWorldPos(upEvent.clientX, upEvent.clientY);
      if (p2) {
        const dist = Math.sqrt(
          Math.pow(p2[0] - p1[0], 2) +
          Math.pow(p2[1] - p1[1], 2) +
          Math.pow(p2[2] - p1[2], 2)
        );

        if (dist > 0.5) {
          let newAnn: Annotation | null = null;
          
          if (activeTool === 'distance') {
            newAnn = {
              id: Math.random().toString(36).substring(2, 9),
              case_id: activeCase.id,
              type: 'distance',
              label: `Distance ${annotations.filter(a => a.type === 'distance').length + 1}`,
              data: {
                points: [p1, p2],
                sliceIndex: currentSlice,
                viewportType,
                distanceMm: parseFloat(dist.toFixed(2)),
                color: activeColor
              }
            };
          } else if (activeTool === 'roi_rect') {
            const stats = computeVoxelStats([p1, p2], 'roi_rect', viewportType, currentSlice);
            newAnn = {
              id: Math.random().toString(36).substring(2, 9),
              case_id: activeCase.id,
              type: 'roi_rect',
              label: `ROI Rect ${annotations.filter(a => a.type === 'roi_rect').length + 1}`,
              data: {
                points: [p1, p2],
                sliceIndex: currentSlice,
                viewportType,
                areaMm2: stats ? parseFloat(stats.areaMm2.toFixed(1)) : 0,
                stats,
                color: activeColor
              }
            };
          } else if (activeTool === 'roi_circle') {
            const stats = computeVoxelStats([p1, p2], 'roi_circle', viewportType, currentSlice);
            newAnn = {
              id: Math.random().toString(36).substring(2, 9),
              case_id: activeCase.id,
              type: 'roi_circle',
              label: `ROI Circle ${annotations.filter(a => a.type === 'roi_circle').length + 1}`,
              data: {
                points: [p1, p2],
                sliceIndex: currentSlice,
                viewportType,
                radiusMm: parseFloat(dist.toFixed(1)),
                areaMm2: stats ? parseFloat(stats.areaMm2.toFixed(1)) : 0,
                stats,
                color: activeColor
              }
            };
          } else if (activeTool === 'volume_sphere') {
            const stats = computeVoxelStats([p1, p2], 'volume_sphere', viewportType, currentSlice, volumeThreshold);
            newAnn = {
              id: Math.random().toString(36).substring(2, 9),
              case_id: activeCase.id,
              type: 'volume_sphere',
              label: `Volume Sphere ${annotations.filter(a => a.type === 'volume_sphere').length + 1}`,
              data: {
                points: [p1, p2],
                sliceIndex: currentSlice,
                viewportType,
                radiusMm: parseFloat(dist.toFixed(1)),
                volumeMm3: stats ? parseFloat(stats.volumeMm3.toFixed(1)) : 0,
                voxelVolumeMm3: stats ? parseFloat(stats.voxelVolumeMm3.toFixed(1)) : 0,
                threshold: volumeThreshold,
                stats,
                color: activeColor
              }
            };
          }

          if (newAnn) {
            saveAnnotationWithHistory(newAnn);
          }
        }
      }
      setCaliperPoints([]);
      setCaliperViewport(null);
      setTempCaliperEnd(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Convert 3D world coordinates to 3D voxel index [i, j, k]
  const worldToVoxel = (worldPoint: [number, number, number], meta: any) => {
    const { dx, dy, dz, width, height, depth } = meta;
    const i = Math.round(worldPoint[0] / dx);
    const j = Math.round(worldPoint[1] / dy);
    const k = Math.round(worldPoint[2] / dz);
    return {
      i: Math.max(0, Math.min(width - 1, i)),
      j: Math.max(0, Math.min(height - 1, j)),
      k: Math.max(0, Math.min(depth - 1, k))
    };
  };

  // Handle Paint / Erase Drag event
  const handlePaintDrag = (e: React.MouseEvent, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    const vp = (vtkObjectsRef.current.viewports as any)[viewportType];
    if (!vp || !vp.renderer || !activeCase || !activeCaseMeta || !labelMapRef.current) return;

    const { width, height, depth } = activeCaseMeta;

    const getWorldPos = (clientX: number, clientY: number) => {
      const rect = vp.openGLRenderWindow.getContainer().getBoundingClientRect();
      const x = clientX - rect.left;
      const y = rect.bottom - clientY;
      const coord = vtkCoordinate.newInstance();
      coord.setCoordinateSystemToDisplay();
      coord.setValue([x, y, 0]);
      const wPos = coord.getComputedWorldValue(vp.renderer) as [number, number, number];
      coord.delete();
      return wPos;
    };

    const paintAtPoint = (clientX: number, clientY: number) => {
      const worldPos = getWorldPos(clientX, clientY);
      if (!worldPos) return;

      const voxel = worldToVoxel(worldPos, activeCaseMeta);
      const val = activeTool === 'paint' ? activeLabel : 0;
      const r = brushRadius;
      const r2 = r * r;

      const currentSlice = viewportType === 'axial' ? sliceAxial : viewportType === 'sagittal' ? sliceSagittal : sliceCoronal;

      if (viewportType === 'axial') {
        const k = currentSlice;
        const iStart = Math.max(0, voxel.i - r);
        const iEnd = Math.min(width - 1, voxel.i + r);
        const jStart = Math.max(0, voxel.j - r);
        const jEnd = Math.min(height - 1, voxel.j + r);

        for (let j = jStart; j <= jEnd; j++) {
          for (let i = iStart; i <= iEnd; i++) {
            const di = i - voxel.i;
            const dj = j - voxel.j;
            if (di*di + dj*dj <= r2) {
              const idx = k * width * height + j * width + i;
              labelMapRef.current![idx] = val;
            }
          }
        }
      } else if (viewportType === 'sagittal') {
        const i = currentSlice;
        const jStart = Math.max(0, voxel.j - r);
        const jEnd = Math.min(height - 1, voxel.j + r);
        const kStart = Math.max(0, voxel.k - r);
        const kEnd = Math.min(depth - 1, voxel.k + r);

        for (let k = kStart; k <= kEnd; k++) {
          for (let j = jStart; j <= jEnd; j++) {
            const dj = j - voxel.j;
            const dk = k - voxel.k;
            if (dj*dj + dk*dk <= r2) {
              const idx = k * width * height + j * width + i;
              labelMapRef.current![idx] = val;
            }
          }
        }
      } else if (viewportType === 'coronal') {
        const j = currentSlice;
        const iStart = Math.max(0, voxel.i - r);
        const iEnd = Math.min(width - 1, voxel.i + r);
        const kStart = Math.max(0, voxel.k - r);
        const kEnd = Math.min(depth - 1, voxel.k + r);

        for (let k = kStart; k <= kEnd; k++) {
          for (let i = iStart; i <= iEnd; i++) {
            const di = i - voxel.i;
            const dk = k - voxel.k;
            if (di*di + dk*dk <= r2) {
              const idx = k * width * height + j * width + i;
              labelMapRef.current![idx] = val;
            }
          }
        }
      }

      labelScalarsRef.current!.modified();
      labelImageDataRef.current!.modified();
      
      const viewports = vtkObjectsRef.current.viewports;
      if (viewports.axial) viewports.axial.renderWindow.render();
      if (viewports.sagittal) viewports.sagittal.renderWindow.render();
      if (viewports.coronal) viewports.coronal.renderWindow.render();
    };

    paintAtPoint(e.clientX, e.clientY);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      paintAtPoint(moveEvent.clientX, moveEvent.clientY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      updateSegmentStats();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Region growing: 3D queue-based flood fill
  const handleRegionGrowClick = (e: React.MouseEvent, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    const vp = (vtkObjectsRef.current.viewports as any)[viewportType];
    if (!vp || !vp.renderer || !activeCase || !activeCaseMeta || !labelMapRef.current || !vtkObjectsRef.current.imageData) return;

    const { width, height, depth } = activeCaseMeta;
    const scanData = vtkObjectsRef.current.imageData.getPointData().getScalars().getData() as Int16Array;

    const rect = vp.openGLRenderWindow.getContainer().getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = rect.bottom - e.clientY;
    const coord = vtkCoordinate.newInstance();
    coord.setCoordinateSystemToDisplay();
    coord.setValue([x, y, 0]);
    const worldPos = coord.getComputedWorldValue(vp.renderer) as [number, number, number];
    coord.delete();

    if (!worldPos) return;

    const seed = worldToVoxel(worldPos, activeCaseMeta);
    const seedIdx = seed.k * width * height + seed.j * width + seed.i;
    const seedVal = scanData[seedIdx];

    const queue: number[] = [seedIdx];
    const visited = new Uint8Array(width * height * depth);
    visited[seedIdx] = 1;

    const labelMap = labelMapRef.current;
    const val = activeLabel;
    const tol = regionGrowTolerance;

    let count = 0;
    const maxVoxels = 200000;
    const sliceSize = width * height;

    while (queue.length > 0 && count < maxVoxels) {
      const idx = queue.shift()!;
      labelMap[idx] = val;
      count++;

      const k_idx = Math.floor(idx / sliceSize);
      const remainder = idx % sliceSize;
      const j_idx = Math.floor(remainder / width);
      const i_idx = remainder % width;

      const neighbors = [
        { i: i_idx + 1, j: j_idx, k: k_idx },
        { i: i_idx - 1, j: j_idx, k: k_idx },
        { i: i_idx, j: j_idx + 1, k: k_idx },
        { i: i_idx, j: j_idx - 1, k: k_idx },
        { i: i_idx, j: j_idx, k: k_idx + 1 },
        { i: i_idx, j: j_idx, k: k_idx - 1 }
      ];

      for (const n of neighbors) {
        if (n.i >= 0 && n.i < width && n.j >= 0 && n.j < height && n.k >= 0 && n.k < depth) {
          const n_idx = n.k * sliceSize + n.j * width + n.i;
          if (visited[n_idx] === 0) {
            visited[n_idx] = 1;
            const n_val = scanData[n_idx];
            if (Math.abs(n_val - seedVal) <= tol) {
              queue.push(n_idx);
            }
          }
        }
      }
    }

    labelScalarsRef.current!.modified();
    labelImageDataRef.current!.modified();
    refreshAllViewports();
    updateSegmentStats();
  };

  // Scissors: Drawing closed polygon and filling it
  const handleScissorsDraw = (e: React.MouseEvent, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    const vp = (vtkObjectsRef.current.viewports as any)[viewportType];
    if (!vp || !vp.renderer || !activeCase || !activeCaseMeta || !labelMapRef.current) return;

    setScissorsViewport(viewportType);
    const rect = vp.openGLRenderWindow.getContainer().getBoundingClientRect();
    
    const startPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    const pointsList = [startPoint];
    setScissorsPoints(pointsList);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const pt = {
        x: moveEvent.clientX - rect.left,
        y: moveEvent.clientY - rect.top
      };
      pointsList.push(pt);
      setScissorsPoints([...pointsList]);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (pointsList.length > 3) {
        applyScissorsCut(pointsList, viewportType);
      }

      setScissorsPoints([]);
      setScissorsViewport(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const applyScissorsCut = (poly: {x: number, y: number}[], viewportType: 'axial' | 'sagittal' | 'coronal') => {
    if (!labelMapRef.current || !activeCaseMeta || !vtkObjectsRef.current.imageData) return;

    const { width, height, depth, dx, dy, dz } = activeCaseMeta;
    const labelMap = labelMapRef.current;
    const val = activeLabel;

    const currentSlice = viewportType === 'axial' ? sliceAxial : viewportType === 'sagittal' ? sliceSagittal : sliceCoronal;

    const isPointInPoly = (x: number, y: number, polyPoints: {x: number, y: number}[]) => {
      let inside = false;
      for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        const xi = polyPoints[i].x, yi = polyPoints[i].y;
        const xj = polyPoints[j].x, yj = polyPoints[j].y;
        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    poly.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    if (viewportType === 'axial') {
      const k = currentSlice;
      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          const worldPoint: [number, number, number] = [i * dx, j * dy, k * dz];
          const disp = worldToDisplay(worldPoint, 'axial');
          
          if (disp.x >= minX && disp.x <= maxX && disp.y >= minY && disp.y <= maxY) {
            if (isPointInPoly(disp.x, disp.y, poly)) {
              const idx = k * width * height + j * width + i;
              labelMap[idx] = val;
            }
          }
        }
      }
    } else if (viewportType === 'sagittal') {
      const i = currentSlice;
      for (let k = 0; k < depth; k++) {
        for (let j = 0; j < height; j++) {
          const worldPoint: [number, number, number] = [i * dx, j * dy, k * dz];
          const disp = worldToDisplay(worldPoint, 'sagittal');
          if (disp.x >= minX && disp.x <= maxX && disp.y >= minY && disp.y <= maxY) {
            if (isPointInPoly(disp.x, disp.y, poly)) {
              const idx = k * width * height + j * width + i;
              labelMap[idx] = val;
            }
          }
        }
      }
    } else if (viewportType === 'coronal') {
      const j = currentSlice;
      for (let k = 0; k < depth; k++) {
        for (let i = 0; i < width; i++) {
          const worldPoint: [number, number, number] = [i * dx, j * dy, k * dz];
          const disp = worldToDisplay(worldPoint, 'coronal');
          if (disp.x >= minX && disp.x <= maxX && disp.y >= minY && disp.y <= maxY) {
            if (isPointInPoly(disp.x, disp.y, poly)) {
              const idx = k * width * height + j * width + i;
              labelMap[idx] = val;
            }
          }
        }
      }
    }

    labelScalarsRef.current!.modified();
    labelImageDataRef.current!.modified();
    refreshAllViewports();
    updateSegmentStats();
  };

  // Smoothing: majority voting median filter
  const smoothSegmentation = () => {
    if (!labelMapRef.current || !activeCaseMeta) return;

    const { width, height, depth } = activeCaseMeta;
    const src = labelMapRef.current;
    const dst = new Uint8Array(src.length);
    const sliceSize = width * height;

    for (let k = 1; k < depth - 1; k++) {
      for (let j = 1; j < height - 1; j++) {
        for (let i = 1; i < width - 1; i++) {
          const idx = k * sliceSize + j * width + i;
          const currentVal = src[idx];
          if (currentVal === 0) {
            dst[idx] = 0;
            continue;
          }

          const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
          counts[src[idx + 1]]++;
          counts[src[idx - 1]]++;
          counts[src[idx + width]]++;
          counts[src[idx - width]]++;
          counts[src[idx + sliceSize]]++;
          counts[src[idx - sliceSize]]++;

          let maxVal = currentVal;
          let maxCount = 1;
          for (const key in counts) {
            const count = counts[key];
            if (count > maxCount) {
              maxCount = count;
              maxVal = parseInt(key);
            }
          }

          dst[idx] = maxCount >= 3 ? maxVal : currentVal;
        }
      }
    }

    labelMapRef.current.set(dst);
    labelScalarsRef.current!.modified();
    labelImageDataRef.current!.modified();
    refreshAllViewports();
    updateSegmentStats();
  };

  // Boolean/Label Map Operations
  const mergeSegments = (src: number, dst: number) => {
    if (!labelMapRef.current) return;
    const arr = labelMapRef.current;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === src) arr[i] = dst;
    }
    labelScalarsRef.current!.modified();
    labelImageDataRef.current!.modified();
    refreshAllViewports();
    updateSegmentStats();
  };

  const clearSegment = (lbl: number) => {
    if (!labelMapRef.current) return;
    const arr = labelMapRef.current;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === lbl) arr[i] = 0;
    }
    labelScalarsRef.current!.modified();
    labelImageDataRef.current!.modified();
    refreshAllViewports();
    updateSegmentStats();
  };

  // Threshold: write activeLabel matching voxel intensity range
  const applyThreshold = (applyToEntireVolume: boolean) => {
    if (!labelMapRef.current || !activeCaseMeta || !vtkObjectsRef.current.imageData) return;

    const { width, height } = activeCaseMeta;
    const scanData = vtkObjectsRef.current.imageData.getPointData().getScalars().getData() as Int16Array;
    const labelMap = labelMapRef.current;
    const val = activeLabel;

    if (applyToEntireVolume) {
      for (let i = 0; i < scanData.length; i++) {
        const intensity = scanData[i];
        if (intensity >= thresholdMin && intensity <= thresholdMax) {
          labelMap[i] = val;
        }
      }
    } else {
      const currentSlice = sliceAxial;
      const k = currentSlice;
      const sliceSize = width * height;
      const startIdx = k * sliceSize;
      const endIdx = startIdx + sliceSize;

      for (let i = startIdx; i < endIdx; i++) {
        const intensity = scanData[i];
        if (intensity >= thresholdMin && intensity <= thresholdMax) {
          labelMap[i] = val;
        }
      }
    }

    labelScalarsRef.current!.modified();
    labelImageDataRef.current!.modified();
    refreshAllViewports();
    updateSegmentStats();
  };

  // Live statistics calculator for segments
  const updateSegmentStats = () => {
    if (!labelMapRef.current || !activeCaseMeta || !vtkObjectsRef.current.imageData) return;

    const { dx, dy, dz } = activeCaseMeta;
    const voxelVol = (dx * dy * dz) / 1000.0; // Cubic cm

    const scanData = vtkObjectsRef.current.imageData.getPointData().getScalars().getData() as Int16Array;
    const labelMap = labelMapRef.current;
    
    const statsMap: Record<number, { count: number; sum: number; min: number; max: number; intensities: number[] }> = {
      1: { count: 0, sum: 0, min: Infinity, max: -Infinity, intensities: [] },
      2: { count: 0, sum: 0, min: Infinity, max: -Infinity, intensities: [] },
      3: { count: 0, sum: 0, min: Infinity, max: -Infinity, intensities: [] },
      4: { count: 0, sum: 0, min: Infinity, max: -Infinity, intensities: [] }
    };

    for (let i = 0; i < labelMap.length; i++) {
      const lbl = labelMap[i];
      if (lbl > 0 && statsMap[lbl]) {
        const val = scanData[i];
        const stat = statsMap[lbl];
        stat.count++;
        stat.sum += val;
        if (val < stat.min) stat.min = val;
        if (val > stat.max) stat.max = val;
        if (stat.intensities.length < 50000 || Math.random() < 0.1) {
          stat.intensities.push(val);
        }
      }
    }

    const calculatedStats = [1, 2, 3, 4].map(lbl => {
      const stat = statsMap[lbl];
      if (stat.count === 0) {
        return {
          label: lbl,
          name: lbl === 1 ? 'Segment 1 (Red)' : lbl === 2 ? 'Segment 2 (Green)' : lbl === 3 ? 'Segment 3 (Blue)' : 'Segment 4 (Yellow)',
          volumeCm3: 0,
          mean: 0,
          min: 0,
          max: 0,
          stdDev: 0
        };
      }

      const mean = stat.sum / stat.count;
      let varianceSum = 0;
      stat.intensities.forEach(v => {
        varianceSum += Math.pow(v - mean, 2);
      });
      const stdDev = Math.sqrt(varianceSum / Math.max(1, stat.intensities.length));

      return {
        label: lbl,
        name: lbl === 1 ? 'Segment 1 (Red)' : lbl === 2 ? 'Segment 2 (Green)' : lbl === 3 ? 'Segment 3 (Blue)' : 'Segment 4 (Yellow)',
        volumeCm3: parseFloat((stat.count * voxelVol).toFixed(2)),
        mean: Math.round(mean),
        min: stat.min,
        max: stat.max,
        stdDev: Math.round(stdDev)
      };
    });

    setSegmentStats(calculatedStats);
    setSegRevision(prev => prev + 1);
  };

  // Generate 3D polygonal surface mesh using Marching Cubes
  const generate3DSurfaceMesh = () => {
    if (!labelImageDataRef.current || !vtkObjectsRef.current.viewports.volume) return;

    setIsGeneratingMesh(true);

    setTimeout(() => {
      try {
        const mc = vtkImageMarchingCubes.newInstance({
          contourValue: 0.5,
          computeNormals: true,
          mergePoints: true
        });

        mc.setInputData(labelImageDataRef.current!);
        
        const polyData = mc.getOutputData();
        polyDataRef.current = polyData;
        marchingCubesRef.current = mc;

        const mapper = vtkMapper.newInstance();
        mapper.setInputData(polyData);

        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);

        actor.getProperty().setColor(0.1, 0.72, 0.5); // Teal green
        actor.getProperty().setOpacity(meshOpacity);
        actor.getProperty().setRepresentationToSurface();
        actor.getProperty().setAmbient(0.2);
        actor.getProperty().setDiffuse(0.7);
        actor.getProperty().setSpecular(0.3);

        const volVp = vtkObjectsRef.current.viewports.volume!;
        
        if (volVp.meshActor) {
          volVp.renderer.removeActor(volVp.meshActor);
          volVp.meshActor.delete();
        }

        volVp.meshActor = actor;
        volVp.meshMapper = mapper;
        volVp.renderer.addActor(actor);

        // Toggle mesh visibility matching state
        actor.setVisibility(show3DMesh);
        
        volVp.renderWindow.render();
        console.log("[Marching Cubes] Mesh generated successfully!");
      } catch (err) {
        console.error(err);
      } finally {
        setIsGeneratingMesh(false);
      }
    }, 100);
  };

  // Export Mesh as STL (ASCII format)
  const exportMeshAsSTL = () => {
    if (!polyDataRef.current) return;
    const stl = MeshExporter.exportToSTL(polyDataRef.current);
    const blob = new Blob([stl], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeCase?.patient_name || 'case'}_segmentation.stl`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export Mesh as OBJ format
  const exportMeshAsOBJ = () => {
    if (!polyDataRef.current) return;
    const obj = MeshExporter.exportToOBJ(polyDataRef.current);
    const blob = new Blob([obj], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeCase?.patient_name || 'case'}_segmentation.obj`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const refreshAllViewports = () => {
    const viewports = vtkObjectsRef.current.viewports;
    if (viewports.axial) viewports.axial.renderWindow.render();
    if (viewports.sagittal) viewports.sagittal.renderWindow.render();
    if (viewports.coronal) viewports.coronal.renderWindow.render();
    if (viewports.volume) viewports.volume.renderWindow.render();
  };

  const handleViewportMouseMove = (e: React.MouseEvent, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    if (caliperPoints.length > 0 && caliperViewport === viewportType) {
      const vp = (vtkObjectsRef.current.viewports as any)[viewportType];
      if (!vp || !vp.renderer) return;

      const rect = vp.openGLRenderWindow.getContainer().getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.bottom - e.clientY;
      const coord = vtkCoordinate.newInstance();
      coord.setCoordinateSystemToDisplay();
      coord.setValue([x, y, 0]);
      const wPos = coord.getComputedWorldValue(vp.renderer) as [number, number, number];
      coord.delete();

      if (wPos) {
        setTempCaliperEnd(wPos);
      }
    }
  };

  // Unified Mouse Down dispatcher
  const handleViewportMouseDown = (e: React.MouseEvent, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    if (e.button !== 0 && e.button !== 1) return;

    if (e.button === 1 || activeTool === 'zoom') {
      handlePanDrag(e, viewportType);
    } else if (activeTool === 'slice') {
      handleSliceDrag(e, viewportType);
    } else if (activeTool === 'wl') {
      handleWlDrag(e);
    } else if (activeTool === 'paint' || activeTool === 'erase') {
      handlePaintDrag(e, viewportType);
    } else if (activeTool === 'region_grow') {
      handleRegionGrowClick(e, viewportType);
    } else if (activeTool === 'scissors') {
      handleScissorsDraw(e, viewportType);
    } else {
      handleInteractiveDrawing(e, viewportType);
    }
  };

  const saveAnnotationWithHistory = async (ann: Annotation, isUndoRedoAction = false) => {
    try {
      const res = await fetch(`${API_BASE}/cases/${activeCase?.id}/annotations`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(ann)
      });
      if (res.ok) {
        if (!isUndoRedoAction) {
          const existing = annotations.find(a => a.id === ann.id);
          if (existing) {
            setUndoStack(prev => [...prev, { type: 'edit', annotation: ann, prevAnnotation: existing }]);
          } else {
            setUndoStack(prev => [...prev, { type: 'add', annotation: ann }]);
          }
          setRedoStack([]);
        }
        fetchAnnotations(activeCase!.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAnnotationWithHistory = async (annId: string, isUndoRedoAction = false) => {
    const ann = annotations.find(a => a.id === annId);
    if (!ann) return;
    try {
      const res = await fetch(`${API_BASE}/cases/${activeCase?.id}/annotations/${annId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        if (!isUndoRedoAction) {
          setUndoStack(prev => [...prev, { type: 'delete', annotation: ann }]);
          setRedoStack([]);
        }
        if (selectedAnnotationId === annId) {
          setSelectedAnnotationId(null);
        }
        fetchAnnotations(activeCase!.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateSelectedAnnotation = async (updates: { label?: string; data?: Partial<Annotation['data']> }) => {
    if (!selectedAnnotationId || !activeCase) return;
    const ann = annotations.find(a => a.id === selectedAnnotationId);
    if (!ann) return;

    const updatedAnn: Annotation = {
      ...ann,
      label: updates.label !== undefined ? updates.label : ann.label,
      data: {
        ...ann.data,
        color: updates.data?.color !== undefined ? updates.data.color : ann.data.color,
        notes: updates.data?.notes !== undefined ? updates.data.notes : ann.data.notes,
        threshold: updates.data?.threshold !== undefined ? updates.data.threshold : ann.data.threshold,
      }
    };

    if (updates.data?.threshold !== undefined && ann.type === 'volume_sphere') {
      const stats = computeVoxelStats(ann.data.points, 'volume_sphere', ann.data.viewportType, ann.data.sliceIndex, updates.data.threshold);
      if (stats) {
        updatedAnn.data.volumeMm3 = parseFloat(stats.volumeMm3.toFixed(1));
        updatedAnn.data.voxelVolumeMm3 = parseFloat(stats.voxelVolumeMm3.toFixed(1));
        updatedAnn.data.stats = stats;
      }
    }

    await saveAnnotationWithHistory(updatedAnn);
  };

  const handleUndo = async () => {
    if (undoStack.length === 0) return;
    const action = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));

    if (action.type === 'add') {
      await deleteAnnotationWithHistory(action.annotation.id, true);
      setRedoStack(prev => [...prev, action]);
    } else if (action.type === 'delete') {
      await saveAnnotationWithHistory(action.annotation, true);
      setRedoStack(prev => [...prev, action]);
    } else if (action.type === 'edit') {
      if (action.prevAnnotation) {
        await saveAnnotationWithHistory(action.prevAnnotation, true);
        setRedoStack(prev => [...prev, action]);
      }
    }
  };

  const handleRedo = async () => {
    if (redoStack.length === 0) return;
    const action = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));

    if (action.type === 'add') {
      await saveAnnotationWithHistory(action.annotation, true);
      setUndoStack(prev => [...prev, action]);
    } else if (action.type === 'delete') {
      await deleteAnnotationWithHistory(action.annotation.id, true);
      setUndoStack(prev => [...prev, action]);
    } else if (action.type === 'edit') {
      await saveAnnotationWithHistory(action.annotation, true);
      setUndoStack(prev => [...prev, action]);
    }
  };

  const exportViewportAsImage = (viewportType: 'axial' | 'sagittal' | 'coronal') => {
    const vp = (vtkObjectsRef.current.viewports as any)[viewportType];
    if (!vp || !vp.openGLRenderWindow || !activeCase) return;

    const vtkCanvas = vp.openGLRenderWindow.getContainer().querySelector('canvas');
    if (!vtkCanvas) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = vtkCanvas.width;
    tempCanvas.height = vtkCanvas.height;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(vtkCanvas, 0, 0);

    const currentSlice = viewportType === 'axial' ? sliceAxial : viewportType === 'sagittal' ? sliceSagittal : sliceCoronal;
    const sliceAnns = annotations.filter(
      ann => ann.data.viewportType === viewportType && ann.data.sliceIndex === currentSlice
    );



    sliceAnns.forEach(ann => {
      const color = ann.data.color || '#10b981';
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = ann.id === selectedAnnotationId ? 3 : 2;
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';

      if (ann.type === 'distance') {
        const p1 = worldToDisplay(ann.data.points[0], viewportType);
        const p2 = worldToDisplay(ann.data.points[1], viewportType);
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        ctx.beginPath();
        ctx.setLineDash([4, 3]);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(midX - 35, midY - 12, 70, 20, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillText(`${ann.data.distanceMm}mm`, midX, midY + 2);
        
        if (ann.label) {
          ctx.fillStyle = '#f1f5f9';
          ctx.font = 'bold 9.5px sans-serif';
          ctx.fillText(ann.label, midX, midY - 16);
        }
      }

      else if (ann.type === 'angle') {
        if (ann.data.points.length < 3) return;
        const p1 = worldToDisplay(ann.data.points[0], viewportType);
        const p2 = worldToDisplay(ann.data.points[1], viewportType);
        const p3 = worldToDisplay(ann.data.points[2], viewportType);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p3.x, p3.y, 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.beginPath();
        ctx.roundRect(p2.x - 30, p2.y - 12, 60, 20, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillText(`${ann.data.angleDeg}°`, p2.x, p2.y + 2);

        if (ann.label) {
          ctx.fillStyle = '#f1f5f9';
          ctx.font = 'bold 9.5px sans-serif';
          ctx.fillText(ann.label, p2.x, p2.y - 16);
        }
      }

      else if (ann.type === 'area') {
        const displayPts = ann.data.points.map(pt => worldToDisplay(pt, viewportType));
        if (displayPts.length < 3) return;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.moveTo(displayPts[0].x, displayPts[0].y);
        for (let i = 1; i < displayPts.length; i++) {
          ctx.lineTo(displayPts[i].x, displayPts[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        displayPts.forEach(p => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        });

        let sumX = 0, sumY = 0;
        displayPts.forEach(p => { sumX += p.x; sumY += p.y; });
        const avgX = sumX / displayPts.length;
        const avgY = sumY / displayPts.length;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.beginPath();
        ctx.roundRect(avgX - 45, avgY - 12, 90, 20, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillText(`${ann.data.areaMm2}mm²`, avgX, avgY + 2);

        if (ann.label) {
          ctx.fillStyle = '#f1f5f9';
          ctx.font = 'bold 9.5px sans-serif';
          ctx.fillText(ann.label, avgX, avgY - 16);
        }
      }

      else if (ann.type === 'roi_rect') {
        const p1 = worldToDisplay(ann.data.points[0], viewportType);
        const p2 = worldToDisplay(ann.data.points[1], viewportType);

        const rx = Math.min(p1.x, p2.x);
        const ry = Math.min(p1.y, p2.y);
        const rw = Math.abs(p1.x - p2.x);
        const rh = Math.abs(p1.y - p2.y);

        const midX = rx + rw/2;
        const midY = ry + rh/2;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeRect(rx, ry, rw, rh);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.roundRect(midX - 55, midY - 22, 110, 40, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillText(`${ann.data.areaMm2}mm²`, midX, midY - 10);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '8px monospace';
        ctx.fillText(`Mean: ${ann.data.stats?.mean.toFixed(1) || '0'}`, midX, midY + 2);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`SD: ±${ann.data.stats?.sd.toFixed(1) || '0'}`, midX, midY + 12);

        if (ann.label) {
          ctx.fillStyle = '#f1f5f9';
          ctx.font = 'bold 9.5px sans-serif';
          ctx.fillText(ann.label, midX, ry - 8);
        }
      }

      else if (ann.type === 'roi_circle' || ann.type === 'volume_sphere') {
        const center = worldToDisplay(ann.data.points[0], viewportType);
        const edge = worldToDisplay(ann.data.points[1], viewportType);
        const rPx = Math.sqrt(Math.pow(edge.x - center.x, 2) + Math.pow(edge.y - center.y, 2));

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.arc(center.x, center.y, rPx, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.roundRect(center.x - 55, center.y - 22, 110, 40, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = color;
        if (ann.type === 'roi_circle') {
          ctx.fillText(`${ann.data.areaMm2}mm²`, center.x, center.y - 10);
          ctx.fillStyle = '#e2e8f0';
          ctx.font = '8px monospace';
          ctx.fillText(`Mean: ${ann.data.stats?.mean.toFixed(1) || '0'}`, center.x, center.y + 2);
          ctx.fillStyle = '#94a3b8';
          ctx.fillText(`SD: ±${ann.data.stats?.sd.toFixed(1) || '0'}`, center.x, center.y + 12);
        } else {
          const volCc = (ann.data.volumeMm3 || 0) / 1000;
          const vvolCc = (ann.data.voxelVolumeMm3 || 0) / 1000;
          ctx.fillText(`Sph Vol: ${volCc.toFixed(2)} cc`, center.x, center.y - 10);
          ctx.fillStyle = '#e2e8f0';
          ctx.font = '8px monospace';
          ctx.fillText(`Vox Vol: ${vvolCc.toFixed(2)} cc`, center.x, center.y + 2);
          ctx.fillStyle = '#94a3b8';
          ctx.fillText(`Thresh: ≥ ${ann.data.threshold || 0}`, center.x, center.y + 12);
        }

        if (ann.label) {
          ctx.fillStyle = '#f1f5f9';
          ctx.font = 'bold 9.5px sans-serif';
          ctx.fillText(ann.label, center.x, center.y - rPx - 8);
        }
      }

      else if (ann.type === 'text') {
        const p1 = worldToDisplay(ann.data.points[0], viewportType);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 7, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.beginPath();
        ctx.roundRect(p1.x + 10, p1.y - 10, 100, 20, 3);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f1f5f9';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(ann.data.notes?.substring(0, 16) || 'Marker', p1.x + 15, p1.y + 3);

        if (ann.label) {
          ctx.fillStyle = '#f1f5f9';
          ctx.font = 'bold 9.5px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(ann.label, p1.x, p1.y - 12);
        }
      }
    });

    const link = document.createElement('a');
    link.download = `${activeCase.patient_name.replace(/\s+/g, '_')}_${viewportType}_slice_${currentSlice}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  // Convert 3D world coordinates into 2D display coordinates on screen SVG using vtkCoordinate
  const worldToDisplay = (worldPoint: any, viewportType: 'axial' | 'sagittal' | 'coronal') => {
    const vp = (vtkObjectsRef.current.viewports as any)[viewportType];
    if (!vp || !vp.renderer || !vp.openGLRenderWindow) return { x: 0, y: 0 };
    if (!worldPoint || !Array.isArray(worldPoint) || worldPoint.length !== 3) {
      return { x: 0, y: 0 };
    }

    const coord = vtkCoordinate.newInstance();
    coord.setCoordinateSystemToWorld();
    coord.setValue(worldPoint);
    const displayPoint = coord.getComputedDisplayValue(vp.renderer);
    coord.delete();

    const container = vp.openGLRenderWindow.getContainer();
    if (!container) return { x: 0, y: 0 };
    const rect = container.getBoundingClientRect();

    // VTK display coordinate starts at bottom left. We map to top left for HTML/SVG
    return {
      x: displayPoint[0],
      y: rect.height - displayPoint[1]
    };
  };

  // Drag & Drop DICOM Upload
  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadError('');
    setUploading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("deidentify", String(deidentify));

    try {
      const res = await fetch(`${API_BASE}/cases/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${user?.token}` },
        body: formData
      });
      if (res.ok) {
        setUploadModalOpen(false);
        fetchCases();
      } else {
        const err = await res.json();
        setUploadError(err.detail || 'Upload processing failed.');
      }
    } catch (e) {
      setUploadError('Failed to connect to backend processing worker.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCase = async (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to permanently delete this clinical case?")) return;

    try {
      const res = await fetch(`${API_BASE}/cases/${caseId}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        if (activeCase?.id === caseId) {
          cleanupVtk();
          setActiveCase(null);
          setActiveCaseMeta(null);
        }
        fetchCases();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Render SVG overlays for all annotations and active measurements
  const renderAnnotationsSvg = (viewportType: 'axial' | 'sagittal' | 'coronal') => {
    if (!activeCase) return null;
    const currentSlice = viewportType === 'axial' ? sliceAxial : viewportType === 'sagittal' ? sliceSagittal : sliceCoronal;

    // Filter annotations matching current slice
    const sliceAnns = annotations.filter(
      ann => ann.data.viewportType === viewportType && ann.data.sliceIndex === currentSlice
    );

    const dist3D = (a: number[], b: number[]) => {
      return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
    };

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {sliceAnns.map((ann) => {
          const color = ann.data.color || '#10b981';
          const isSelected = ann.id === selectedAnnotationId;
          const strokeWidth = isSelected ? 3 : 2;

          if (ann.type === 'distance') {
            const p1 = worldToDisplay(ann.data.points[0], viewportType);
            const p2 = worldToDisplay(ann.data.points[1], viewportType);
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            return (
              <g key={ann.id} className="cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(ann.id); }}>
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={color} strokeWidth={strokeWidth} strokeDasharray="4 3" />
                <circle cx={p1.x} cy={p1.y} r="5" fill={color} />
                <circle cx={p2.x} cy={p2.y} r="5" fill={color} />
                <rect x={midX - 35} y={midY - 12} width="70" height="20" rx="4" fill="rgba(0, 0, 0, 0.85)" stroke={color} strokeWidth="1" />
                <text x={midX} y={midY + 2} fill={color} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {ann.data.distanceMm}mm
                </text>
                {ann.label && (
                  <text x={midX} y={midY - 16} fill="#f1f5f9" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" style={{ textShadow: '0 0 3px #000' }}>
                    {ann.label}
                  </text>
                )}
              </g>
            );
          }

          if (ann.type === 'angle') {
            if (ann.data.points.length < 3) return null;
            const p1 = worldToDisplay(ann.data.points[0], viewportType);
            const p2 = worldToDisplay(ann.data.points[1], viewportType); // vertex
            const p3 = worldToDisplay(ann.data.points[2], viewportType);

            return (
              <g key={ann.id} className="cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(ann.id); }}>
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={color} strokeWidth={strokeWidth} />
                <line x1={p2.x} y1={p2.y} x2={p3.x} y2={p3.y} stroke={color} strokeWidth={strokeWidth} />
                <circle cx={p1.x} cy={p1.y} r="5" fill={color} />
                <circle cx={p2.x} cy={p2.y} r="5" fill={color} />
                <circle cx={p3.x} cy={p3.y} r="5" fill={color} />
                <rect x={p2.x - 30} y={p2.y - 12} width="60" height="20" rx="4" fill="rgba(0, 0, 0, 0.85)" stroke={color} strokeWidth="1" />
                <text x={p2.x} y={p2.y + 2} fill={color} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {ann.data.angleDeg}°
                </text>
                {ann.label && (
                  <text x={p2.x} y={p2.y - 16} fill="#f1f5f9" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" style={{ textShadow: '0 0 3px #000' }}>
                    {ann.label}
                  </text>
                )}
              </g>
            );
          }

          if (ann.type === 'area') {
            const displayPts = ann.data.points.map(pt => worldToDisplay(pt, viewportType));
            const pointsStr = displayPts.map(p => `${p.x},${p.y}`).join(' ');

            let sumX = 0, sumY = 0;
            displayPts.forEach(p => { sumX += p.x; sumY += p.y; });
            const avgX = sumX / displayPts.length;
            const avgY = sumY / displayPts.length;

            return (
              <g key={ann.id} className="cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(ann.id); }}>
                <polygon points={pointsStr} fill="rgba(255, 255, 255, 0.05)" stroke={color} strokeWidth={strokeWidth} />
                {displayPts.map((p, idx) => <circle key={idx} cx={p.x} cy={p.y} r="4" fill={color} />)}
                <rect x={avgX - 45} y={avgY - 12} width="90" height="20" rx="4" fill="rgba(0, 0, 0, 0.85)" stroke={color} strokeWidth="1" />
                <text x={avgX} y={avgY + 2} fill={color} fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {ann.data.areaMm2}mm²
                </text>
                {ann.label && (
                  <text x={avgX} y={avgY - 16} fill="#f1f5f9" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" style={{ textShadow: '0 0 3px #000' }}>
                    {ann.label}
                  </text>
                )}
              </g>
            );
          }

          if (ann.type === 'roi_rect') {
            const p1 = worldToDisplay(ann.data.points[0], viewportType);
            const p2 = worldToDisplay(ann.data.points[1], viewportType);

            const rx = Math.min(p1.x, p2.x);
            const ry = Math.min(p1.y, p2.y);
            const rw = Math.abs(p1.x - p2.x);
            const rh = Math.abs(p1.y - p2.y);

            const midX = rx + rw/2;
            const midY = ry + rh/2;

            return (
              <g key={ann.id} className="cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(ann.id); }}>
                <rect x={rx} y={ry} width={rw} height={rh} fill="rgba(255, 255, 255, 0.05)" stroke={color} strokeWidth={strokeWidth} />
                <rect x={midX - 55} y={midY - 22} width="110" height="40" rx="4" fill="rgba(0, 0, 0, 0.9)" stroke={color} strokeWidth="1" />
                <text x={midX} y={midY - 10} fill={color} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {ann.data.areaMm2}mm²
                </text>
                <text x={midX} y={midY + 2} fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  Mean: {ann.data.stats?.mean.toFixed(1) || '0'}
                </text>
                <text x={midX} y={midY + 12} fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  SD: ±{ann.data.stats?.sd.toFixed(1) || '0'}
                </text>
                {ann.label && (
                  <text x={midX} y={ry - 8} fill="#f1f5f9" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" style={{ textShadow: '0 0 3px #000' }}>
                    {ann.label}
                  </text>
                )}
              </g>
            );
          }

          if (ann.type === 'roi_circle') {
            const center = worldToDisplay(ann.data.points[0], viewportType);
            const edge = worldToDisplay(ann.data.points[1], viewportType);
            const rPx = Math.sqrt(Math.pow(edge.x - center.x, 2) + Math.pow(edge.y - center.y, 2));

            return (
              <g key={ann.id} className="cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(ann.id); }}>
                <circle cx={center.x} cy={center.y} r={rPx} fill="rgba(255, 255, 255, 0.05)" stroke={color} strokeWidth={strokeWidth} />
                <line x1={center.x} y1={center.y} x2={edge.x} y2={edge.y} stroke={color} strokeWidth="1" strokeDasharray="2 2" />
                <rect x={center.x - 55} y={center.y - 22} width="110" height="40" rx="4" fill="rgba(0, 0, 0, 0.9)" stroke={color} strokeWidth="1" />
                <text x={center.x} y={center.y - 10} fill={color} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {ann.data.areaMm2}mm²
                </text>
                <text x={center.x} y={center.y + 2} fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  Mean: {ann.data.stats?.mean.toFixed(1) || '0'}
                </text>
                <text x={center.x} y={center.y + 12} fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  SD: ±{ann.data.stats?.sd.toFixed(1) || '0'}
                </text>
                {ann.label && (
                  <text x={center.x} y={center.y - rPx - 8} fill="#f1f5f9" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" style={{ textShadow: '0 0 3px #000' }}>
                    {ann.label}
                  </text>
                )}
              </g>
            );
          }

          if (ann.type === 'volume_sphere') {
            const center = worldToDisplay(ann.data.points[0], viewportType);
            const edge = worldToDisplay(ann.data.points[1], viewportType);
            const rPx = Math.sqrt(Math.pow(edge.x - center.x, 2) + Math.pow(edge.y - center.y, 2));

            const volCc = (ann.data.volumeMm3 || 0) / 1000;
            const vvolCc = (ann.data.voxelVolumeMm3 || 0) / 1000;

            return (
              <g key={ann.id} className="cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(ann.id); }}>
                <circle cx={center.x} cy={center.y} r={rPx} fill="rgba(245, 158, 11, 0.05)" stroke={color} strokeWidth={strokeWidth} />
                <rect x={center.x - 60} y={center.y - 22} width="120" height="40" rx="4" fill="rgba(0, 0, 0, 0.9)" stroke={color} strokeWidth="1" />
                <text x={center.x} y={center.y - 10} fill={color} fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Sph Vol: {volCc.toFixed(2)} cc
                </text>
                <text x={center.x} y={center.y + 2} fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  Vox Vol: {vvolCc.toFixed(2)} cc
                </text>
                <text x={center.x} y={center.y + 12} fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
                  Threshold: &ge; {ann.data.threshold || 0}
                </text>
                {ann.label && (
                  <text x={center.x} y={center.y - rPx - 8} fill="#f1f5f9" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" style={{ textShadow: '0 0 3px #000' }}>
                    {ann.label}
                  </text>
                )}
              </g>
            );
          }

          if (ann.type === 'text') {
            const p1 = worldToDisplay(ann.data.points[0], viewportType);
            return (
              <g key={ann.id} className="cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); setSelectedAnnotationId(ann.id); }}>
                <circle cx={p1.x} cy={p1.y} r="5" fill={color} />
                <circle cx={p1.x} cy={p1.y} r="8" fill="none" stroke={color} strokeWidth="1.5" />
                <rect x={p1.x + 10} y={p1.y - 10} width="100" height="20" rx="3" fill="rgba(15, 23, 42, 0.95)" stroke={color} strokeWidth="1" />
                <text x={p1.x + 15} y={p1.y + 3} fill="#f1f5f9" fontSize="8.5" fontFamily="sans-serif">
                  {ann.data.notes?.substring(0, 16) || 'Marker'}{ann.data.notes && ann.data.notes.length > 16 ? '...' : ''}
                </text>
                {ann.label && (
                  <text x={p1.x} y={p1.y - 12} fill="#f1f5f9" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" style={{ textShadow: '0 0 3px #000' }}>
                    {ann.label}
                  </text>
                )}
              </g>
            );
          }

          return null;
        })}

        {/* Temporary drawing overlay */}
        {caliperViewport === viewportType && caliperPoints.length > 0 && tempCaliperEnd && (
          <g>
            {(() => {
              const p1 = worldToDisplay(caliperPoints[0], viewportType);
              const p2 = worldToDisplay(tempCaliperEnd, viewportType);
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;

              if (activeTool === 'distance') {
                const dist = dist3D(caliperPoints[0], tempCaliperEnd);
                return (
                  <g>
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={activeColor} strokeWidth="2" strokeDasharray="4 3" />
                    <circle cx={p1.x} cy={p1.y} r="5" fill={activeColor} />
                    <circle cx={p2.x} cy={p2.y} r="5" fill={activeColor} />
                    <rect x={midX - 35} y={midY - 12} width="70" height="20" rx="4" fill="rgba(0, 0, 0, 0.85)" stroke={activeColor} strokeWidth="1" />
                    <text x={midX} y={midY + 2} fill={activeColor} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      {dist.toFixed(1)}mm
                    </text>
                  </g>
                );
              }

              if (activeTool === 'angle') {
                if (caliperPoints.length === 1) {
                  return (
                    <g>
                      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={activeColor} strokeWidth="2" strokeDasharray="4 3" />
                      <circle cx={p1.x} cy={p1.y} r="5" fill={activeColor} />
                      <circle cx={p2.x} cy={p2.y} r="5" fill={activeColor} />
                    </g>
                  );
                } else if (caliperPoints.length === 2) {
                  const pA = caliperPoints[0];
                  const pB = caliperPoints[1]; // vertex
                  const pC = tempCaliperEnd;

                  const vecBA = [pA[0] - pB[0], pA[1] - pB[1], pA[2] - pB[2]];
                  const vecBC = [pC[0] - pB[0], pC[1] - pB[1], pC[2] - pB[2]];

                  const dot = vecBA[0] * vecBC[0] + vecBA[1] * vecBC[1] + vecBA[2] * vecBC[2];
                  const lenBA = Math.sqrt(vecBA[0]*vecBA[0] + vecBA[1]*vecBA[1] + vecBA[2]*vecBA[2]);
                  const lenBC = Math.sqrt(vecBC[0]*vecBC[0] + vecBC[1]*vecBC[1] + vecBC[2]*vecBC[2]);

                  let angleDeg = 0;
                  if (lenBA > 0 && lenBC > 0) {
                    const cosTheta = Math.max(-1, Math.min(1, dot / (lenBA * lenBC)));
                    angleDeg = parseFloat((Math.acos(cosTheta) * 180 / Math.PI).toFixed(1));
                  }

                  const pADisp = worldToDisplay(pA, viewportType);
                  const pBDisp = worldToDisplay(pB, viewportType);

                  return (
                    <g>
                      <line x1={pADisp.x} y1={pADisp.y} x2={pBDisp.x} y2={pBDisp.y} stroke={activeColor} strokeWidth="2" />
                      <line x1={pBDisp.x} y1={pBDisp.y} x2={p2.x} y2={p2.y} stroke={activeColor} strokeWidth="2" strokeDasharray="4 3" />
                      <circle cx={pADisp.x} cy={pADisp.y} r="5" fill={activeColor} />
                      <circle cx={pBDisp.x} cy={pBDisp.y} r="5" fill={activeColor} />
                      <circle cx={p2.x} cy={p2.y} r="5" fill={activeColor} />
                      <rect x={pBDisp.x - 30} y={pBDisp.y - 12} width="60" height="20" rx="4" fill="rgba(0, 0, 0, 0.85)" stroke={activeColor} strokeWidth="1" />
                      <text x={pBDisp.x} y={pBDisp.y + 2} fill={activeColor} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        {angleDeg}°
                      </text>
                    </g>
                  );
                }
              }

              if (activeTool === 'area') {
                const displayPts = caliperPoints.map(pt => worldToDisplay(pt, viewportType));
                const pointsStr = displayPts.map(p => `${p.x},${p.y}`).join(' ');
                return (
                  <g>
                    {caliperPoints.length >= 2 ? (
                      <polyline points={pointsStr} fill="none" stroke={activeColor} strokeWidth="2" />
                    ) : null}
                    <line x1={displayPts[displayPts.length - 1].x} y1={displayPts[displayPts.length - 1].y} x2={p2.x} y2={p2.y} stroke={activeColor} strokeWidth="2" strokeDasharray="3 3" />
                    <line x1={p2.x} y1={p2.y} x2={displayPts[0].x} y2={displayPts[0].y} stroke={activeColor} strokeWidth="2" strokeDasharray="3 3" />
                    {displayPts.map((p, idx) => <circle key={idx} cx={p.x} cy={p.y} r="4" fill={activeColor} />)}
                    <circle cx={p2.x} cy={p2.y} r="4" fill={activeColor} />
                    <text x={p2.x + 10} y={p2.y + 10} fill={activeColor} fontSize="9" fontFamily="monospace" fontWeight="bold" style={{ textShadow: '0 0 3px #000' }}>
                      (Click near start to close)
                    </text>
                  </g>
                );
              }

              if (activeTool === 'roi_rect') {
                const rx = Math.min(p1.x, p2.x);
                const ry = Math.min(p1.y, p2.y);
                const rw = Math.abs(p1.x - p2.x);
                const rh = Math.abs(p1.y - p2.y);
                const area = computeVoxelStats([caliperPoints[0], tempCaliperEnd], 'roi_rect', viewportType, currentSlice)?.areaMm2 || 0;

                return (
                  <g>
                    <rect x={rx} y={ry} width={rw} height={rh} fill="rgba(255, 255, 255, 0.05)" stroke={activeColor} strokeWidth="2" strokeDasharray="4 3" />
                    <circle cx={p1.x} cy={p1.y} r="4" fill={activeColor} />
                    <circle cx={p2.x} cy={p2.y} r="4" fill={activeColor} />
                    <rect x={rx + rw/2 - 35} y={ry + rh/2 - 10} width="70" height="20" rx="4" fill="rgba(0, 0, 0, 0.85)" stroke={activeColor} strokeWidth="1" />
                    <text x={rx + rw/2} y={ry + rh/2 + 4} fill={activeColor} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      {area.toFixed(1)}mm²
                    </text>
                  </g>
                );
              }

              if (activeTool === 'roi_circle' || activeTool === 'volume_sphere') {
                const rPx = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
                const stats = computeVoxelStats([caliperPoints[0], tempCaliperEnd], activeTool, viewportType, currentSlice, volumeThreshold);
                const valStr = activeTool === 'roi_circle' 
                  ? `${stats?.areaMm2.toFixed(1) || '0'} mm²`
                  : `Vol: ${((stats?.volumeMm3 || 0)/1000).toFixed(2)} cc`;

                return (
                  <g>
                    <circle cx={p1.x} cy={p1.y} r={rPx} fill="rgba(255, 255, 255, 0.05)" stroke={activeColor} strokeWidth="2" strokeDasharray="4 3" />
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={activeColor} strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx={p1.x} cy={p1.y} r="4" fill={activeColor} />
                    <circle cx={p2.x} cy={p2.y} r="4" fill={activeColor} />
                    <rect x={p1.x - 45} y={p1.y - 10} width="90" height="20" rx="4" fill="rgba(0, 0, 0, 0.85)" stroke={activeColor} strokeWidth="1" />
                    <text x={p1.x} y={p1.y + 4} fill={activeColor} fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      {valStr}
                    </text>
                  </g>
                );
              }

            })()}
          </g>
        )}

        {/* Scissors drawing preview */}
        {scissorsViewport === viewportType && scissorsPoints.length > 0 && (
          <g>
            <polyline 
              points={scissorsPoints.map(p => `${p.x},${p.y}`).join(' ')}
              fill="rgba(16, 185, 129, 0.15)"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            {/* Draw closing line back to starting point */}
            {scissorsPoints.length > 2 && (
              <line 
                x1={scissorsPoints[scissorsPoints.length - 1].x}
                y1={scissorsPoints[scissorsPoints.length - 1].y}
                x2={scissorsPoints[0].x}
                y2={scissorsPoints[0].y}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            )}
          </g>
        )}
      </svg>
    );
  };

  // Auth Portal
  if (!user) {
    return (
      <div className="modal-overlay">
        <form onSubmit={handleLogin} className="modal-content" style={{ width: '400px' }}>
          <div className="brand-section" style={{ justifyContent: 'center', marginBottom: '25px' }}>
            <Activity className="text-cyan-500 animate-pulse" size={28} style={{ color: 'var(--accent-cyan)' }} />
            <span className="brand-logo" style={{ fontSize: '1.5rem' }}>AVIOTHIC 3D PACS</span>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '20px' }}>
            Visualization and Pre-Surgical Planning Aid. <br/>
            <strong>Not for primary diagnostic use.</strong>
          </p>

          <div className="form-group">
            <label htmlFor="username">Clinical User ID</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="e.g. radiologist, surgeon"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Security Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>

          {authError && (
            <div style={{ color: 'var(--accent-rose)', fontSize: '0.75rem', marginTop: '10px' }} className="flex items-center gap-1">
              <AlertCircle size={14} /> {authError}
            </div>
          )}

          <button type="submit" className="form-submit-btn" style={{ width: '100%', marginTop: '20px' }}>
            Authenticate Session
          </button>
          
          <div style={{ marginTop: '15px', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Default credentials: <code>radiologist</code> / <code>clinical123</code>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="clinical-header">
        <div className="brand-section">
          <Activity className="animate-pulse" style={{ color: 'var(--accent-cyan)' }} />
          <span className="brand-logo">AVIOTHIC 3D</span>
          <span className="modality-badge">{activeCase ? activeCase.modality : 'PACS'}</span>
        </div>

        {activeCase && (
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>Viewing: <strong>{activeCase.patient_name}</strong> ({activeCase.patient_id})</span>
          </div>
        )}

        <div style={{ 
          fontSize: '0.72rem', 
          fontWeight: 700, 
          color: 'var(--accent-amber)', 
          background: 'rgba(245, 158, 11, 0.1)', 
          border: '1px solid rgba(245, 158, 11, 0.3)', 
          padding: '3px 8px', 
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>⚠️ NON-DIAGNOSTIC USE ONLY</span>
        </div>

        <div className="user-section">
          <span className="user-badge flex items-center gap-1">
            <User size={14} /> {user.username} ({user.role})
          </span>
          <button 
            onClick={() => { cleanupVtk(); setUser(null); setActiveCase(null); }} 
            style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="clinical-workspace">
        
        {/* Sidebar Patient Case Directory */}
        <aside className="case-sidebar">
          <div className="sidebar-header">
            <span className="flex items-center gap-2">
              <FolderOpen size={16} style={{ color: 'var(--accent-cyan)' }} /> Patient Directory
            </span>
            <button 
              onClick={() => setUploadModalOpen(true)}
              style={{ background: 'var(--accent-cyan)', border: 'none', color: '#000', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Upload Case
            </button>
          </div>

          <div className="cases-list">
            {loadingCases ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>Loading PACS catalog...</div>
            ) : cases.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>No patients loaded. Upload a DICOM ZIP to begin.</div>
            ) : (
              cases.map(c => (
                <div 
                  key={c.id} 
                  className={`case-card ${activeCase?.id === c.id ? 'active' : ''}`}
                  onClick={() => selectCase(c)}
                >
                  <div className="case-card-header">
                    <span>{c.patient_name}</span>
                    <span className="modality-badge">{c.modality}</span>
                  </div>
                  <div className="case-card-meta">
                    <span>ID: {c.patient_id}</span>
                    <span>Slices: {c.slice_count} slices</span>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                      <span style={{ 
                        color: c.status === 'completed' ? 'var(--accent-emerald)' : c.status === 'failed' ? 'var(--accent-rose)' : 'var(--accent-amber)',
                        fontWeight: 600
                      }}>
                        {c.status.toUpperCase()}
                      </span>
                      <button 
                        onClick={(e) => handleDeleteCase(c.id, e)}
                        className="annotation-delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </span>
                    {c.status === 'failed' && c.error_message && (
                      <div style={{ 
                        color: 'var(--accent-rose)', 
                        fontSize: '0.7rem', 
                        marginTop: '4px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        lineHeight: '1.2'
                      }}>
                        Error: {c.error_message}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Selected Patient Dimensions and Spacing details */}
          {activeCase && (
            <div className="patient-details-box">
              <h4>Scan Specifications</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Modality</span>
                  <span className="detail-value">{activeCase.modality}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Dimensions</span>
                  <span className="detail-value">{activeCase.width} x {activeCase.height} x {activeCase.depth}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pixel Spacing (dx, dy)</span>
                  <span className="detail-value">{activeCase.dx?.toFixed(2)} x {activeCase.dy?.toFixed(2)} mm</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Slice Thickness (dz)</span>
                  <span className="detail-value">{activeCase.dz?.toFixed(2)} mm</span>
                </div>
                <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-label">Series Instance UID</span>
                  <span className="detail-value" style={{ fontSize: '0.6rem', wordBreak: 'break-all' }}>{activeCase.series_uid}</span>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Viewport 4-Panel Grid */}
        <div className="viewport-grid" style={{ position: 'relative' }}>
          {loadingVolume && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(10, 13, 20, 0.92)',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px'
            }}>
              <RefreshCw className="animate-spin" size={48} style={{ color: 'var(--accent-cyan)' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {loadingVolume}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Please wait while the WebGL pipelines are configured.
              </div>
            </div>
          )}
          
          {/* AXIAL */}
          <div 
            className="viewport-panel" 
            style={{ 
              display: is3DExpanded ? 'none' : 'flex',
              cursor: getCursorForTool()
            }}
            onMouseDown={(e) => handleViewportMouseDown(e, 'axial')}
            onMouseMove={(e) => handleViewportMouseMove(e, 'axial')}
            onWheel={(e) => handleViewportWheel(e, 'axial')}
          >
            <div className="viewport-header">
              <span className="viewport-title"><Crosshair size={14} /> Axial (Z Plane)</span>
              <span className="viewport-meta flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Slice: {sliceAxial + 1}/{activeCaseMeta?.depth || 0} (z = {((sliceAxial - (activeCaseMeta?.depth || 0)/2) * (activeCaseMeta?.dz || 1)).toFixed(1)}mm)</span>
                {activeCase && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); exportViewportAsImage('axial'); }} 
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                    title="Export Slice to PNG"
                  >
                    <Download size={13} />
                  </button>
                )}
              </span>
            </div>
            <div className="viewport-canvas-container" style={{ position: 'relative' }}>
              {loadedVolume && vtkObjectsRef.current.imageData && (
                <VolumeViewer
                  type="axial"
                  imageData={vtkObjectsRef.current.imageData}
                  labelImageData={labelImageDataRef.current}
                  onInitialized={(objs) => {
                    vtkObjectsRef.current.viewports.axial = objs as any;
                  }}
                />
              )}
              {renderAnnotationsSvg('axial')}
            </div>
            {activeCase && (
              <div className="viewport-scrubber">
                <input 
                  type="range" 
                  min="0" 
                  max={(activeCaseMeta?.depth || 1) - 1} 
                  value={sliceAxial} 
                  onChange={e => setSliceAxial(parseInt(e.target.value))}
                />
                <span className="scrubber-value">{sliceAxial} / {(activeCaseMeta?.depth || 1) - 1}</span>
              </div>
            )}
          </div>

          {/* SAGITTAL */}
          <div 
            className="viewport-panel" 
            style={{ 
              display: is3DExpanded ? 'none' : 'flex',
              cursor: getCursorForTool()
            }}
            onMouseDown={(e) => handleViewportMouseDown(e, 'sagittal')}
            onMouseMove={(e) => handleViewportMouseMove(e, 'sagittal')}
            onWheel={(e) => handleViewportWheel(e, 'sagittal')}
          >
            <div className="viewport-header">
              <span className="viewport-title"><Crosshair size={14} /> Sagittal (X Plane)</span>
              <span className="viewport-meta flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Slice: {sliceSagittal + 1}/{activeCaseMeta?.width || 0}</span>
                {activeCase && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); exportViewportAsImage('sagittal'); }} 
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                    title="Export Slice to PNG"
                  >
                    <Download size={13} />
                  </button>
                )}
              </span>
            </div>
            <div className="viewport-canvas-container" style={{ position: 'relative' }}>
              {loadedVolume && vtkObjectsRef.current.imageData && (
                <VolumeViewer
                  type="sagittal"
                  imageData={vtkObjectsRef.current.imageData}
                  labelImageData={labelImageDataRef.current}
                  onInitialized={(objs) => {
                    vtkObjectsRef.current.viewports.sagittal = objs as any;
                  }}
                />
              )}
              {renderAnnotationsSvg('sagittal')}
            </div>
            {activeCase && (
              <div className="viewport-scrubber">
                <input 
                  type="range" 
                  min="0" 
                  max={(activeCaseMeta?.width || 1) - 1} 
                  value={sliceSagittal} 
                  onChange={e => setSliceSagittal(parseInt(e.target.value))}
                />
                <span className="scrubber-value">{sliceSagittal} / {(activeCaseMeta?.width || 1) - 1}</span>
              </div>
            )}
          </div>

          {/* CORONAL */}
          <div 
            className="viewport-panel" 
            style={{ 
              display: is3DExpanded ? 'none' : 'flex',
              cursor: getCursorForTool()
            }}
            onMouseDown={(e) => handleViewportMouseDown(e, 'coronal')}
            onMouseMove={(e) => handleViewportMouseMove(e, 'coronal')}
            onWheel={(e) => handleViewportWheel(e, 'coronal')}
          >
            <div className="viewport-header">
              <span className="viewport-title"><Crosshair size={14} /> Coronal (Y Plane)</span>
              <span className="viewport-meta flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Slice: {sliceCoronal + 1}/{activeCaseMeta?.height || 0}</span>
                {activeCase && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); exportViewportAsImage('coronal'); }} 
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                    title="Export Slice to PNG"
                  >
                    <Download size={13} />
                  </button>
                )}
              </span>
            </div>
            <div className="viewport-canvas-container" style={{ position: 'relative' }}>
              {loadedVolume && vtkObjectsRef.current.imageData && (
                <VolumeViewer
                  type="coronal"
                  imageData={vtkObjectsRef.current.imageData}
                  labelImageData={labelImageDataRef.current}
                  onInitialized={(objs) => {
                    vtkObjectsRef.current.viewports.coronal = objs as any;
                  }}
                />
              )}
              {renderAnnotationsSvg('coronal')}
            </div>
            {activeCase && (
              <div className="viewport-scrubber">
                <input 
                  type="range" 
                  min="0" 
                  max={(activeCaseMeta?.height || 1) - 1} 
                  value={sliceCoronal} 
                  onChange={e => setSliceCoronal(parseInt(e.target.value))}
                />
                <span className="scrubber-value">{sliceCoronal} / {(activeCaseMeta?.height || 1) - 1}</span>
              </div>
            )}
          </div>

          {/* 3D VOLUME VIEW */}
          <div className={`viewport-panel ${is3DExpanded ? 'expanded' : ''}`}>
            <div className="viewport-header">
              <span className="viewport-title">
                {is3DExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />} 3D Volume Rendering
              </span>
              <span className="viewport-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>GPU Raycast</span>
                <button
                  onClick={() => setIs3DExpanded(!is3DExpanded)}
                  style={{
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: 'var(--accent-cyan)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title={is3DExpanded ? "Restore Grid Layout" : "Maximize 3D View"}
                >
                  {is3DExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                  <span>{is3DExpanded ? "Minimize" : "Expand"}</span>
                </button>
              </span>
            </div>
            <div className="viewport-canvas-container" style={{ position: 'relative' }}>
              {!activeCase ? (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <Database size={48} style={{ marginBottom: '15px' }} />
                  <span>Select a Patient Case to Initialize 3D Volume Mapping</span>
                </div>
              ) : (
                loadedVolume && vtkObjectsRef.current.imageData && (
                  <VolumeViewer
                    type="volume"
                    imageData={vtkObjectsRef.current.imageData}
                    labelImageData={labelImageDataRef.current}
                    onInitialized={(objs) => {
                      vtkObjectsRef.current.viewports.volume = objs as any;
                    }}
                  />
                )
              )}
            </div>
          </div>

        </div>

        <aside className="tools-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {/* Tab headers */}
          <div className="sidebar-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>
            <button
              onClick={() => setActiveSidebarTab('viewer')}
              style={{
                flex: 1,
                padding: '12px',
                background: activeSidebarTab === 'viewer' ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                border: 'none',
                borderBottom: activeSidebarTab === 'viewer' ? '2px solid var(--accent-cyan)' : 'none',
                color: activeSidebarTab === 'viewer' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Viewer Controls
            </button>
            <button
              onClick={() => setActiveSidebarTab('report')}
              style={{
                flex: 1,
                padding: '12px',
                background: activeSidebarTab === 'report' ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                border: 'none',
                borderBottom: activeSidebarTab === 'report' ? '2px solid var(--accent-cyan)' : 'none',
                color: activeSidebarTab === 'report' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Structured Report
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {activeSidebarTab === 'viewer' ? (
              <>
                {/* Undo / Redo controls */}
                <div className="tools-section" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Drawing State</h4>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={handleUndo}
                        disabled={undoStack.length === 0}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-color)',
                          color: undoStack.length === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          cursor: undoStack.length === 0 ? 'not-allowed' : 'pointer',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Undo size={12} /> Undo
                      </button>
                      <button
                        onClick={handleRedo}
                        disabled={redoStack.length === 0}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-color)',
                          color: redoStack.length === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          cursor: redoStack.length === 0 ? 'not-allowed' : 'pointer',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Redo size={12} /> Redo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Interaction tools */}
                <div className="tools-section">
                  <h4>Clinical Instruments</h4>
                  <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    <button 
                      className={`tool-btn ${activeTool === 'slice' ? 'active' : ''}`}
                      onClick={() => setActiveTool('slice')}
                    >
                      <Crosshair size={15} /> Slicing
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'wl' ? 'active' : ''}`}
                      onClick={() => setActiveTool('wl')}
                      title="Drag on 2D slice to modify window width (horizontal) or level (vertical)"
                    >
                      <Sun size={15} /> Window/Level
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'zoom' ? 'active' : ''}`}
                      onClick={() => setActiveTool('zoom')}
                    >
                      <ZoomIn size={15} /> Zoom & Pan
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'distance' ? 'active' : ''}`}
                      onClick={() => setActiveTool('distance')}
                    >
                      <Ruler size={15} /> Caliper
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'angle' ? 'active' : ''}`}
                      onClick={() => setActiveTool('angle')}
                      title="Click 3 points on slice to measure angle"
                    >
                      <Compass size={15} /> Angle
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'area' ? 'active' : ''}`}
                      onClick={() => setActiveTool('area')}
                      title="Click points to outline polygon area. Click near first point to close."
                    >
                      <Activity size={15} /> Area (Poly)
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'roi_rect' ? 'active' : ''}`}
                      onClick={() => setActiveTool('roi_rect')}
                    >
                      <Square size={15} /> ROI Rect
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'roi_circle' ? 'active' : ''}`}
                      onClick={() => setActiveTool('roi_circle')}
                    >
                      <Circle size={15} /> ROI Circle
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'volume_sphere' ? 'active' : ''}`}
                      onClick={() => setActiveTool('volume_sphere')}
                      title="Define sphere to calculate volumetric and thresholded voxel volume"
                    >
                      <Layers size={15} /> Vol Sphere
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'text' ? 'active' : ''}`}
                      onClick={() => setActiveTool('text')}
                    >
                      <Type size={15} /> Text Note
                    </button>
                  </div>

                  {/* Active Tool Drawing Color Selector */}
                  <div style={{ marginTop: '12px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Drawing Color</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {['#10b981', '#06b6d4', '#f59e0b', '#f43f5e', '#8b5cf6'].map(c => (
                        <button
                          key={c}
                          onClick={() => setActiveColor(c)}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: c,
                            border: activeColor === c ? '2px solid #fff' : '2px solid transparent',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Segmentation Toolkit */}
                <div className="tools-section">
                  <h4>Segmentation Toolkit</h4>
                  
                  {/* Label selector */}
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Active Target Segment</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[
                        { val: 1, color: '#f43f5e', name: 'S1 (Red)' },
                        { val: 2, color: '#10b981', name: 'S2 (Green)' },
                        { val: 3, color: '#3b82f6', name: 'S3 (Blue)' },
                        { val: 4, color: '#eab308', name: 'S4 (Yellow)' }
                      ].map(seg => (
                        <button
                          key={seg.val}
                          onClick={() => setActiveLabel(seg.val)}
                          className="preset-btn"
                          style={{
                            flex: 1,
                            fontSize: '0.7rem',
                            padding: '6px 4px',
                            border: activeLabel === seg.val ? `2px solid ${seg.color}` : '2px solid transparent',
                            background: activeLabel === seg.val ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.2)',
                            color: seg.color,
                            fontWeight: 'bold'
                          }}
                        >
                          {seg.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tool Selection */}
                  <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginBottom: '12px' }}>
                    <button 
                      className={`tool-btn ${activeTool === 'paint' ? 'active' : ''}`}
                      onClick={() => setActiveTool('paint')}
                      title="Left-click and drag on 2D slice to draw segmentation"
                    >
                      Paint
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'erase' ? 'active' : ''}`}
                      onClick={() => setActiveTool('erase')}
                      title="Left-click and drag on 2D slice to erase segmentation"
                    >
                      Erase
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'threshold' ? 'active' : ''}`}
                      onClick={() => setActiveTool('threshold')}
                      title="Label voxels within intensity range"
                    >
                      Threshold
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'region_grow' ? 'active' : ''}`}
                      onClick={() => setActiveTool('region_grow')}
                      title="Click on slice to perform 3D flood fill segment"
                    >
                      Region Grow
                    </button>
                    <button 
                      className={`tool-btn ${activeTool === 'scissors' ? 'active' : ''}`}
                      onClick={() => setActiveTool('scissors')}
                      title="Draw polygon on slice to label everything inside"
                    >
                      Scissors
                    </button>
                  </div>

                  {/* Dynamic Controls based on tool */}
                  {(activeTool === 'paint' || activeTool === 'erase') && (
                    <div style={{ marginBottom: '12px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        <span>Brush Size</span>
                        <span>{brushRadius} px</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="25" 
                        value={brushRadius} 
                        onChange={e => setBrushRadius(parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}

                  {activeTool === 'threshold' && (
                    <div style={{ marginBottom: '12px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>
                          <span>Min Threshold</span>
                          <span>{thresholdMin}</span>
                        </div>
                        <input 
                          type="range" 
                          min={intensityStats?.min || 0} 
                          max={intensityStats?.max || 1000} 
                          value={thresholdMin} 
                          onChange={e => setThresholdMin(parseInt(e.target.value))}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>
                          <span>Max Threshold</span>
                          <span>{thresholdMax}</span>
                        </div>
                        <input 
                          type="range" 
                          min={intensityStats?.min || 0} 
                          max={intensityStats?.max || 1000} 
                          value={thresholdMax} 
                          onChange={e => setThresholdMax(parseInt(e.target.value))}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => applyThreshold(false)} className="preset-btn" style={{ flex: 1, fontSize: '0.7rem', padding: '4px' }}>Apply Slice</button>
                        <button onClick={() => applyThreshold(true)} className="preset-btn" style={{ flex: 1, fontSize: '0.7rem', padding: '4px' }}>Apply Volume</button>
                      </div>
                    </div>
                  )}

                  {activeTool === 'region_grow' && (
                    <div style={{ marginBottom: '12px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        <span>Seed Tolerance</span>
                        <span>±{regionGrowTolerance}</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="200" 
                        value={regionGrowTolerance} 
                        onChange={e => setRegionGrowTolerance(parseInt(e.target.value))}
                        style={{ width: '100%' }}
                      />
                      <div style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', marginTop: '4px', textAlign: 'center' }}>
                        *Click voxel in any 2D viewport to grow
                      </div>
                    </div>
                  )}

                  {activeTool === 'scissors' && (
                    <div style={{ marginBottom: '12px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      Left-click and drag outline to cut/fill segment
                    </div>
                  )}

                  {/* Global Operations */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    <button onClick={smoothSegmentation} className="preset-btn" style={{ flex: 1, fontSize: '0.7rem', padding: '6px 4px' }}>Smooth Boundary</button>
                    <button onClick={() => clearSegment(activeLabel)} className="preset-btn" style={{ flex: 1, fontSize: '0.7rem', padding: '6px 4px', color: 'var(--accent-rose)' }}>Clear Active</button>
                  </div>

                  {/* Boolean Operations (Merge) */}
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Merge:</span>
                    <select 
                      onChange={(e) => {
                        const [src, dst] = e.target.value.split('-').map(Number);
                        if (src && dst) mergeSegments(src, dst);
                        e.target.value = '';
                      }}
                      style={{ flex: 1, padding: '4px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '0.7rem' }}
                    >
                      <option value="">Choose Merge Option...</option>
                      <option value="1-2">Merge S1 into S2</option>
                      <option value="2-1">Merge S2 into S1</option>
                      <option value="3-1">Merge S3 into S1</option>
                      <option value="4-1">Merge S4 into S1</option>
                    </select>
                  </div>

                  {/* 3D mesh toggles and visibility */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '8px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <label htmlFor="toggle-mesh" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Show 3D Surface Mesh</label>
                      <input 
                        type="checkbox" 
                        id="toggle-mesh"
                        checked={show3DMesh}
                        onChange={e => setShow3DMesh(e.target.checked)}
                      />
                    </div>

                    <button 
                      type="button"
                      onClick={generate3DSurfaceMesh} 
                      className="form-submit-btn" 
                      style={{ fontSize: '0.75rem', padding: '6px', opacity: isGeneratingMesh ? 0.7 : 1 }}
                      disabled={isGeneratingMesh}
                    >
                      {isGeneratingMesh ? "Extracting Mesh (Marching Cubes)..." : "Generate 3D Surface Mesh"}
                    </button>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        <span>Mesh Opacity</span>
                        <span>{Math.round(meshOpacity * 100)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05"
                        value={meshOpacity} 
                        onChange={e => setMeshOpacity(parseFloat(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        <span>Volume Rendering Opacity</span>
                        <span>{Math.round(volumeOpacity * 100)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05"
                        value={volumeOpacity} 
                        onChange={e => setVolumeOpacity(parseFloat(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    {polyDataRef.current && (
                      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                        <button onClick={exportMeshAsSTL} className="preset-btn" style={{ flex: 1, fontSize: '0.7rem', padding: '6px 4px' }}><Download size={11} style={{ marginRight: '4px' }} /> Export STL</button>
                        <button onClick={exportMeshAsOBJ} className="preset-btn" style={{ flex: 1, fontSize: '0.7rem', padding: '6px 4px' }}><Download size={11} style={{ marginRight: '4px' }} /> Export OBJ</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Segment Stats Table */}
                {segmentStats.length > 0 && (
                  <div className="tools-section" style={{ padding: '8px' }}>
                    <h5 style={{ fontSize: '0.75rem', marginBottom: '8px', color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>Segment Metrics</h5>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.65rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                          <th style={{ paddingBottom: '4px' }}>Label</th>
                          <th style={{ paddingBottom: '4px' }}>Vol (cc)</th>
                          <th style={{ paddingBottom: '4px' }}>Mean (HU)</th>
                          <th style={{ paddingBottom: '4px' }}>SD</th>
                        </tr>
                      </thead>
                      <tbody>
                        {segmentStats.filter(s => s.volumeCm3 > 0).map(s => {
                          const color = s.label === 1 ? '#f43f5e' : s.label === 2 ? '#10b981' : s.label === 3 ? '#3b82f6' : '#eab308';
                          return (
                            <tr key={s.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                              <td style={{ padding: '6px 0', color, fontWeight: 'bold' }}>S{s.label}</td>
                              <td style={{ padding: '6px 0', color: '#f1f5f9' }}>{s.volumeCm3}</td>
                              <td style={{ padding: '6px 0', color: '#cbd5e1' }}>{s.mean}</td>
                              <td style={{ padding: '6px 0', color: '#94a3b8' }}>±{s.stdDev}</td>
                            </tr>
                          );
                        })}
                        {segmentStats.filter(s => s.volumeCm3 > 0).length === 0 && (
                          <tr>
                            <td colSpan={4} style={{ padding: '8px 0', color: 'var(--text-muted)', textAlign: 'center' }}>No segmentations drawn yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Selected Annotation Details Panel */}
                {selectedAnnotationId && (() => {
                  const selectedAnn = annotations.find(a => a.id === selectedAnnotationId);
                  if (!selectedAnn) return null;
                  return (
                    <div className="tools-section" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>Selected Caliper</span>
                        <button
                          onClick={() => deleteAnnotationWithHistory(selectedAnnotationId)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          title="Delete Annotation"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Custom Label</label>
                          <input
                            type="text"
                            value={selectedAnn.label || ''}
                            onChange={(e) => updateSelectedAnnotation({ label: e.target.value })}
                            style={{ width: '100%', padding: '6px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '0.75rem' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Color Coding</label>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {['#10b981', '#06b6d4', '#f59e0b', '#f43f5e', '#8b5cf6'].map(c => (
                              <button
                                key={c}
                                onClick={() => updateSelectedAnnotation({ data: { color: c } })}
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                  backgroundColor: c,
                                  border: selectedAnn.data.color === c ? '2px solid #fff' : '2px solid transparent',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Text Notes / Findings</label>
                          <textarea
                            value={selectedAnn.data.notes || ''}
                            onChange={(e) => updateSelectedAnnotation({ data: { notes: e.target.value } })}
                            rows={2}
                            style={{ width: '100%', padding: '6px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '0.75rem', resize: 'vertical' }}
                          />
                        </div>

                        {selectedAnn.type === 'volume_sphere' && (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                              <span>Voxel Intensity Lower Limit</span>
                              <span style={{ fontWeight: 'bold', color: 'var(--accent-amber)' }}>&ge; {selectedAnn.data.threshold || 0}</span>
                            </div>
                            <input
                              type="range"
                              min={intensityStats ? Math.round(intensityStats.min) : -100}
                              max={intensityStats ? Math.round(intensityStats.max) : 1000}
                              value={selectedAnn.data.threshold || 0}
                              onChange={(e) => updateSelectedAnnotation({ data: { threshold: parseInt(e.target.value) } })}
                              style={{ width: '100%' }}
                            />
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.3' }}>
                              Voxel stats compute only HU/intensity values equal or greater than threshold inside sphere.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Presets and sliders */}
                <div className="tools-section">
                  <h4>W/L Presets</h4>
                  {activeCase?.modality === 'CT' ? (
                    <div className="preset-list">
                      <button 
                        className={`preset-btn ${activePreset === 'brain' ? 'active' : ''}`}
                        onClick={() => applyPreset('brain')}
                      >
                        Brain (W: 80, L: 40)
                      </button>
                      <button 
                        className={`preset-btn ${activePreset === 'bone' ? 'active' : ''}`}
                        onClick={() => applyPreset('bone')}
                      >
                        Bone / Skull (W: 2000, L: 500)
                      </button>
                      <button 
                        className={`preset-btn ${activePreset === 'soft' ? 'active' : ''}`}
                        onClick={() => applyPreset('soft')}
                      >
                        Soft Tissue (W: 350, L: 50)
                      </button>
                    </div>
                  ) : activeCase?.modality === 'MR' ? (
                    <div className="preset-list">
                      <button 
                        className={`preset-btn ${activePreset === 'standard' ? 'active' : ''}`}
                        onClick={() => applyMRPreset('standard')}
                      >
                        Standard (Auto W/L)
                      </button>
                      <button 
                        className={`preset-btn ${activePreset === 'high_contrast' ? 'active' : ''}`}
                        onClick={() => applyMRPreset('high_contrast')}
                      >
                        High Contrast (W: 50%)
                      </button>
                      <button 
                        className={`preset-btn ${activePreset === 'soft_emphasis' ? 'active' : ''}`}
                        onClick={() => applyMRPreset('soft_emphasis')}
                      >
                        Tissue Emphasis (W: 80%)
                      </button>
                    </div>
                  ) : activeCase?.modality === 'MG' ? (
                    <div className="preset-list">
                      <button 
                        className={`preset-btn ${activePreset === 'standard' ? 'active' : ''}`}
                        onClick={() => applyMGPreset('standard')}
                      >
                        Standard (Auto W/L)
                      </button>
                      <button 
                        className={`preset-btn ${activePreset === 'detail' ? 'active' : ''}`}
                        onClick={() => applyMGPreset('detail')}
                      >
                        Breast Detail (W: 70%)
                      </button>
                      <button 
                        className={`preset-btn ${activePreset === 'high_contrast' ? 'active' : ''}`}
                        onClick={() => applyMGPreset('high_contrast')}
                      >
                        High Contrast (W: 40%)
                      </button>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>
                      Select a Patient Case to Load Presets
                    </div>
                  )}

                  <div className="wl-slider-box" style={{ marginTop: '15px' }}>
                    <div className="wl-slider-item">
                      <label>Window Width <span>{windowWidth}</span></label>
                      <input 
                        type="range" 
                        min="1" 
                        max={intensityStats ? Math.round(intensityStats.max - intensityStats.min) || 2500 : 2500} 
                        value={windowWidth} 
                        onChange={e => { setWindowWidth(parseInt(e.target.value)); setActivePreset('manual'); }}
                      />
                    </div>
                    <div className="wl-slider-item">
                      <label>Window Level <span>{windowLevel}</span></label>
                      <input 
                        type="range" 
                        min={intensityStats ? Math.round(intensityStats.min) : -100} 
                        max={intensityStats ? Math.round(intensityStats.max) : 1000} 
                        value={windowLevel} 
                        onChange={e => { setWindowLevel(parseInt(e.target.value)); setActivePreset('manual'); }}
                      />
                    </div>

                    {activeCase && (
                      <div className="wl-slider-item" style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <label>Active Volume Threshold</label>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-amber)' }}>&ge; {volumeThreshold}</span>
                        </div>
                        <input 
                          type="range" 
                          min={intensityStats ? Math.round(intensityStats.min) : -100} 
                          max={intensityStats ? Math.round(intensityStats.max) : 1000} 
                          value={volumeThreshold} 
                          onChange={e => setVolumeThreshold(parseInt(e.target.value))}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {activeCase && (
                  <div className="tools-section">
                    <h4>3D Volume Presets</h4>
                    {activeCase.modality === 'CT' ? (
                      <div className="preset-list">
                        <button 
                          className={`preset-btn ${active3DPreset === 'soft_tissue' || active3DPreset === 'default' ? 'active' : ''}`}
                          onClick={() => setActive3DPreset('soft_tissue')}
                        >
                          Soft Tissue
                        </button>
                        <button 
                          className={`preset-btn ${active3DPreset === 'bone' ? 'active' : ''}`}
                          onClick={() => setActive3DPreset('bone')}
                        >
                          Bone
                        </button>
                      </div>
                    ) : (
                      <div className="preset-list">
                        <button 
                          className={`preset-btn ${active3DPreset === 'tissue_contrast' || active3DPreset === 'default' ? 'active' : ''}`}
                          onClick={() => setActive3DPreset('tissue_contrast')}
                        >
                          Tissue Contrast
                        </button>
                        <button 
                          className={`preset-btn ${active3DPreset === 'high_detail' ? 'active' : ''}`}
                          onClick={() => setActive3DPreset('high_detail')}
                        >
                          High Detail
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Annotations List */}
                <div className="tools-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', borderBottom: 'none' }}>
                  <h4>Active Calipers ({annotations.length})</h4>
                  <div className="annotations-list" style={{ flex: 1, overflowY: 'auto' }}>
                    {annotations.length === 0 ? (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>
                        No measurements recorded. Select a tool and click/draw on 2D slices.
                      </div>
                    ) : (
                      annotations.map((ann) => (
                        <div
                          key={ann.id}
                          className={`annotation-item ${selectedAnnotationId === ann.id ? 'active' : ''}`}
                          onClick={() => setSelectedAnnotationId(ann.id)}
                          style={{
                            borderLeft: `4px solid ${ann.data.color || '#10b981'}`,
                            cursor: 'pointer',
                            background: selectedAnnotationId === ann.id ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                            padding: '8px 10px',
                            borderRadius: '4px',
                            marginBottom: '6px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div className="annotation-info" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span className="annotation-tag" style={{ fontWeight: 600, fontSize: '0.78rem' }}>
                              {ann.label || `${ann.type.toUpperCase()}`}
                            </span>
                            <span className="annotation-note" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                              {ann.type === 'distance' && `${ann.data.distanceMm} mm`}
                              {ann.type === 'angle' && `${ann.data.angleDeg}°`}
                              {ann.type === 'area' && `${ann.data.areaMm2} mm²`}
                              {ann.type === 'roi_rect' && `${ann.data.areaMm2} mm²`}
                              {ann.type === 'roi_circle' && `${ann.data.areaMm2} mm²`}
                              {ann.type === 'volume_sphere' && `Sph: ${(ann.data.volumeMm3 ? ann.data.volumeMm3 / 1000 : 0).toFixed(2)} cc`}
                              {ann.type === 'text' && `${ann.data.notes?.substring(0, 15) || 'Text Note'}`}
                            </span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                              {ann.data.viewportType.toUpperCase()} Slice {ann.data.sliceIndex}
                            </span>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteAnnotationWithHistory(ann.id); }}
                            className="annotation-delete"
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Structured Clinical Report Tab */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ background: 'rgba(6, 182, 212, 0.04)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', fontSize: '0.75rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '6px', textTransform: 'uppercase' }}>Patient Metadata</div>
                    <div>Name: <strong>{activeCase?.patient_name}</strong></div>
                    <div>Patient ID: {activeCase?.patient_id}</div>
                    <div>Modality: {activeCase?.modality} ({activeCase?.series_uid?.substring(0, 15)}...)</div>
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Clinical History</label>
                    <textarea
                      value={reportHistory}
                      onChange={e => setReportHistory(e.target.value)}
                      rows={3}
                      placeholder="Enter patient symptoms, prior scans, clinical referral reasons..."
                      style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '0.78rem', resize: 'vertical' }}
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Findings</label>
                      <button
                        onClick={handleAutoGenerateFindings}
                        style={{
                          background: 'rgba(6, 182, 212, 0.1)',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                          color: 'var(--accent-cyan)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.7rem',
                          fontWeight: 'bold'
                        }}
                      >
                        Auto-Gen From Calipers
                      </button>
                    </div>
                    <textarea
                      value={reportFindings}
                      onChange={e => setReportFindings(e.target.value)}
                      rows={6}
                      placeholder="Describe anatomical findings, abnormal density, voxel measurements..."
                      style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '0.78rem', resize: 'vertical' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Impression</label>
                    <textarea
                      value={reportImpression}
                      onChange={e => setReportImpression(e.target.value)}
                      rows={3}
                      placeholder="Clinical diagnosis, main diagnostic takeaway..."
                      style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '0.78rem', resize: 'vertical' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Recommendations</label>
                    <textarea
                      value={reportRecommendations}
                      onChange={e => setReportRecommendations(e.target.value)}
                      rows={2}
                      placeholder="Suggested follow-up scans, surgical planning consultation..."
                      style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '0.78rem', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button
                      onClick={saveReport}
                      style={{
                        flex: 1,
                        background: 'var(--accent-cyan)',
                        border: 'none',
                        color: '#000',
                        fontWeight: 700,
                        padding: '10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Save size={14} /> Save Report
                    </button>
                    <button
                      onClick={downloadReportPdf}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: '1px solid var(--accent-cyan)',
                        color: 'var(--accent-cyan)',
                        fontWeight: 700,
                        padding: '10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <FileText size={14} /> Export PDF
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Case Upload Modal */}
      {uploadModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Import Patient DICOM Case</h3>
              <button className="modal-close" onClick={() => setUploadModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="upload-zone" onClick={() => document.getElementById('dicom-file')?.click()}>
                <Upload size={32} className="upload-icon" />
                <div className="upload-text">Select Patient DICOM ZIP Archive</div>
                <div className="upload-subtext">Must contain slices from a single continuous series</div>
                <input 
                  type="file" 
                  id="dicom-file" 
                  name="file" 
                  className="file-input" 
                  accept=".zip"
                  required
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                <input 
                  type="checkbox" 
                  id="deid" 
                  checked={deidentify} 
                  onChange={e => setDeidentify(e.target.checked)} 
                />
                <label htmlFor="deid">Automatically Strip Patient Health Information (PHI) tags</label>
              </div>

              {uploadError && (
                <div style={{ color: 'var(--accent-rose)', fontSize: '0.75rem' }} className="flex items-center gap-1">
                  <AlertCircle size={14} /> {uploadError}
                </div>
              )}

              <button 
                type="submit" 
                className="form-submit-btn flex items-center justify-center gap-2"
                disabled={uploading}
                style={{ opacity: uploading ? 0.7 : 1 }}
              >
                {uploading ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} /> Parsing Slices & Reconstructing Volume...
                  </>
                ) : (
                  "Initiate Volume Processing"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
