import { create } from 'zustand';

export interface PatientCase {
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
}

export interface Annotation {
  id: string;
  case_id: string;
  type: 'distance' | 'marker' | 'angle' | 'area' | 'roi_rect' | 'roi_circle' | 'volume_sphere' | 'text';
  label: string;
  data: {
    points: [number, number, number][];
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

export interface HistoryAction {
  type: 'add' | 'delete' | 'edit';
  annotation: Annotation;
  prevAnnotation?: Annotation;
}

export interface LightingConfig {
  ambient: number;
  diffuse: number;
  specular: number;
  specularPower: number;
  shade: boolean;
  brightness: number;
  contrast: number;
  gamma: number;
  exposure: number;
}

export interface ClippingPlane {
  id: string;
  origin: [number, number, number];
  normal: [number, number, number];
}

export interface CustomTFPoints {
  val: number;
  r: number;
  g: number;
  b: number;
  o: number;
}

export interface CustomPreset {
  name: string;
  points: CustomTFPoints[];
}

export interface RenderingState {
  activeCase: PatientCase | null;
  activeCaseMeta: any | null;
  loadedVolume: { meta: any; binBuffer: ArrayBuffer; initialWW: number; initialWL: number } | null;
  activeTool: any;
  activeColor: string;
  selectedAnnotationId: string | null;
  annotations: Annotation[];
  caliperPoints: [number, number, number][];
  caliperViewport: 'axial' | 'sagittal' | 'coronal' | null;
  tempCaliperEnd: [number, number, number] | null;
  undoStack: HistoryAction[];
  redoStack: HistoryAction[];
  
  // Slices
  sliceAxial: number;
  sliceSagittal: number;
  sliceCoronal: number;
  
  // W/L and Presets
  windowWidth: number;
  windowLevel: number;
  activePreset: string;
  active3DPreset: string;
  intensityStats: { min: number; max: number; p1: number; p99: number } | null;

  // Segmentation and Mesh
  activeLabel: number;
  brushRadius: number;
  thresholdMin: number;
  thresholdMax: number;
  regionGrowTolerance: number;
  show3DMesh: boolean;
  meshOpacity: number;
  volumeOpacity: number;
  segmentStats: any[];
  scissorsPoints: { x: number; y: number }[];
  scissorsViewport: 'axial' | 'sagittal' | 'coronal' | null;

  // 3D Rendering modes
  renderMode: 'volume' | 'mip' | 'minip' | 'average';
  
  // Lighting
  lightingConfig: LightingConfig;
  
  // Clipping & Cropping
  clippingPlanes: ClippingPlane[];
  croppingBounds: [number, number, number, number, number, number] | null;
  isClippingActive: boolean;
  
  // Synchronization
  syncSlices: boolean;
  syncCamera: boolean;
  syncWL: boolean;
  
  // Custom Presets
  customPresets: CustomPreset[];

  // Setters
  setActiveCase: (c: PatientCase | null) => void;
  setActiveCaseMeta: (meta: any) => void;
  setLoadedVolume: (vol: { meta: any; binBuffer: ArrayBuffer; initialWW: number; initialWL: number } | null) => void;
  setActiveTool: (tool: any) => void;
  setActiveColor: (color: string) => void;
  setSelectedAnnotationId: (id: string | null) => void;
  setAnnotations: (anns: Annotation[]) => void;
  setCaliperPoints: (pts: [number, number, number][]) => void;
  setCaliperViewport: (vp: 'axial' | 'sagittal' | 'coronal' | null) => void;
  setTempCaliperEnd: (pt: [number, number, number] | null) => void;
  setUndoStack: (stack: HistoryAction[]) => void;
  setRedoStack: (stack: HistoryAction[]) => void;
  
  setSliceAxial: (slice: number) => void;
  setSliceSagittal: (slice: number) => void;
  setSliceCoronal: (slice: number) => void;
  
  setWindowWidth: (w: number) => void;
  setWindowLevel: (l: number) => void;
  setActivePreset: (preset: string) => void;
  setActive3DPreset: (preset: string) => void;
  setIntensityStats: (stats: { min: number; max: number; p1: number; p99: number } | null) => void;

  setActiveLabel: (lbl: number) => void;
  setBrushRadius: (r: number) => void;
  setThresholdMin: (min: number) => void;
  setThresholdMax: (max: number) => void;
  setRegionGrowTolerance: (tol: number) => void;
  setShow3DMesh: (show: boolean) => void;
  setMeshOpacity: (op: number) => void;
  setVolumeOpacity: (op: number) => void;
  setSegmentStats: (stats: any[]) => void;
  setScissorsPoints: (pts: { x: number; y: number }[]) => void;
  setScissorsViewport: (vp: 'axial' | 'sagittal' | 'coronal' | null) => void;

  // New setters
  setRenderMode: (mode: 'volume' | 'mip' | 'minip' | 'average') => void;
  setLightingConfig: (config: Partial<LightingConfig>) => void;
  setClippingPlanes: (planes: ClippingPlane[]) => void;
  setCroppingBounds: (bounds: [number, number, number, number, number, number] | null) => void;
  setIsClippingActive: (active: boolean) => void;
  setSyncSlices: (sync: boolean) => void;
  setSyncCamera: (sync: boolean) => void;
  setSyncWL: (sync: boolean) => void;
  setCustomPresets: (presets: CustomPreset[]) => void;
}

export const useRenderingStore = create<RenderingState>((set) => ({
  activeCase: null,
  activeCaseMeta: null,
  loadedVolume: null,
  activeTool: 'slice',
  activeColor: '#10b981',
  selectedAnnotationId: null,
  annotations: [],
  caliperPoints: [],
  caliperViewport: null,
  tempCaliperEnd: null,
  undoStack: [],
  redoStack: [],
  
  sliceAxial: 0,
  sliceSagittal: 0,
  sliceCoronal: 0,
  
  windowWidth: 800,
  windowLevel: 400,
  activePreset: 'manual',
  active3DPreset: 'default',
  intensityStats: null,

  activeLabel: 1,
  brushRadius: 5,
  thresholdMin: 100,
  thresholdMax: 500,
  regionGrowTolerance: 50,
  show3DMesh: false,
  meshOpacity: 0.85,
  volumeOpacity: 0.15,
  segmentStats: [],
  scissorsPoints: [],
  scissorsViewport: null,

  // Defaults for new fields
  renderMode: 'volume',
  lightingConfig: {
    ambient: 0.3,
    diffuse: 0.6,
    specular: 0.2,
    specularPower: 10,
    shade: true,
    brightness: 1.0,
    contrast: 1.0,
    gamma: 1.0,
    exposure: 1.0,
  },
  clippingPlanes: [],
  croppingBounds: null,
  isClippingActive: false,
  syncSlices: true,
  syncCamera: false,
  syncWL: true,
  customPresets: [],

  setActiveCase: (activeCase) => set({ activeCase }),
  setActiveCaseMeta: (activeCaseMeta) => set({ activeCaseMeta }),
  setLoadedVolume: (loadedVolume) => set({ loadedVolume }),
  setActiveTool: (activeTool) => set({ activeTool }),
  setActiveColor: (activeColor) => set({ activeColor }),
  setSelectedAnnotationId: (selectedAnnotationId) => set({ selectedAnnotationId }),
  setAnnotations: (annotations) => set({ annotations }),
  setCaliperPoints: (caliperPoints) => set({ caliperPoints }),
  setCaliperViewport: (caliperViewport) => set({ caliperViewport }),
  setTempCaliperEnd: (tempCaliperEnd) => set({ tempCaliperEnd }),
  setUndoStack: (undoStack) => set({ undoStack }),
  setRedoStack: (redoStack) => set({ redoStack }),

  setSliceAxial: (sliceAxial) => set({ sliceAxial }),
  setSliceSagittal: (sliceSagittal) => set({ sliceSagittal }),
  setSliceCoronal: (sliceCoronal) => set({ sliceCoronal }),

  setWindowWidth: (windowWidth) => set({ windowWidth }),
  setWindowLevel: (windowLevel) => set({ windowLevel }),
  setActivePreset: (activePreset) => set({ activePreset }),
  setActive3DPreset: (active3DPreset) => set({ active3DPreset }),
  setIntensityStats: (intensityStats) => set({ intensityStats }),

  setActiveLabel: (activeLabel) => set({ activeLabel }),
  setBrushRadius: (brushRadius) => set({ brushRadius }),
  setThresholdMin: (thresholdMin) => set({ thresholdMin }),
  setThresholdMax: (thresholdMax) => set({ thresholdMax }),
  setRegionGrowTolerance: (regionGrowTolerance) => set({ regionGrowTolerance }),
  setShow3DMesh: (show3DMesh) => set({ show3DMesh }),
  setMeshOpacity: (meshOpacity) => set({ meshOpacity }),
  setVolumeOpacity: (volumeOpacity) => set({ volumeOpacity }),
  setSegmentStats: (segmentStats) => set({ segmentStats }),
  setScissorsPoints: (scissorsPoints) => set({ scissorsPoints }),
  setScissorsViewport: (scissorsViewport) => set({ scissorsViewport }),

  // New setters
  setRenderMode: (renderMode) => set({ renderMode }),
  setLightingConfig: (config) =>
    set((state) => ({
      lightingConfig: { ...state.lightingConfig, ...config },
    })),
  setClippingPlanes: (clippingPlanes) => set({ clippingPlanes }),
  setCroppingBounds: (croppingBounds) => set({ croppingBounds }),
  setIsClippingActive: (isClippingActive) => set({ isClippingActive }),
  setSyncSlices: (syncSlices) => set({ syncSlices }),
  setSyncCamera: (syncCamera) => set({ syncCamera }),
  setSyncWL: (syncWL) => set({ syncWL }),
  setCustomPresets: (customPresets) => set({ customPresets }),
}));
