import { describe, it, expect, vi } from 'vitest';
import { volumeCache } from '../cache/VolumeCache';
import { MeasurementManager } from '../measurements/MeasurementManager';
import { LightingManager } from '../lighting/LightingManager';
import { GPUManager } from '../gpu/GPUManager';
import { VolumeManager } from '../volume/VolumeManager';
import { TransferFunctionManager } from '../transfer-functions/TransferFunctionManager';
import { ClippingManager } from '../clipping/ClippingManager';
import { MeshExporter } from '../volume/Exporter';

// Mock VTK objects to avoid loading WebGL context during CLI unit tests
vi.mock('@kitware/vtk.js/Common/DataModel/ImageData', () => ({
  default: {
    newInstance: () => ({
      delete: vi.fn(),
      getDimensions: () => [4, 4, 4],
      getSpacing: () => [1.0, 1.0, 1.0],
      getPointData: () => ({
        getScalars: () => ({
          getData: () => new Int16Array(64).fill(100),
        }),
      }),
    }),
  },
}));

vi.mock('@kitware/vtk.js/Common/Core/DataArray', () => ({
  default: {
    newInstance: vi.fn(() => ({
      delete: vi.fn(),
    })),
  },
}));

describe('3D Rendering Engine Subsystems', () => {
  describe('Volume Cache Manager', () => {
    it('should set and get cache entries', () => {
      const mockVolume: any = { delete: vi.fn() };
      const mockCacheEntry: any = {
        imageData: mockVolume,
        volumeImageData: mockVolume,
        meta: { id: 'case_001' },
        binBuffer: new ArrayBuffer(10),
        resampledDz: 1.0,
      };

      volumeCache.set('case_001', mockCacheEntry);
      const retrieved = volumeCache.get('case_001');
      expect(retrieved).toBeDefined();
      expect(retrieved?.meta.id).toBe('case_001');
    });

    it('should evict old cache entries above max size limit', () => {
      volumeCache.clear();
      const mockVolume: any = { delete: vi.fn() };
      
      for (let i = 1; i <= 6; i++) {
        volumeCache.set(`case_00${i}`, {
          imageData: mockVolume,
          volumeImageData: mockVolume,
          meta: { id: `case_00${i}` },
          binBuffer: new ArrayBuffer(10),
          resampledDz: 1.0,
        });
      }

      // First entry should be evicted (maxEntries is 5)
      expect(volumeCache.get('case_001')).toBeUndefined();
      expect(volumeCache.get('case_006')).toBeDefined();
    });
  });

  describe('Measurement Manager', () => {
    it('should calculate 3D Euclidean distances accurately', () => {
      const p1: [number, number, number] = [0, 0, 0];
      const p2: [number, number, number] = [3, 4, 0];
      const distance = MeasurementManager.calculateDistance(p1, p2);
      expect(distance).toBe(5);
    });

    it('should calculate angles between 3D vectors correctly', () => {
      const p1: [number, number, number] = [1, 0, 0];
      const p2: [number, number, number] = [0, 0, 0];
      const p3: [number, number, number] = [0, 1, 0];
      const angle = MeasurementManager.calculateAngle(p1, p2, p3);
      expect(angle).toBeCloseTo(90);
    });

    it('should calculate sphere volumes correctly', () => {
      const radius = 10;
      const volume = MeasurementManager.calculateSphereVolume(radius);
      expect(volume).toBeCloseTo(4188.79, 1);
    });

    it('should calculate polyline area using Shoelace formula', () => {
      const points: [number, number, number][] = [
        [0, 0, 0],
        [10, 0, 0],
        [10, 10, 0],
        [0, 10, 0],
      ];
      const area = MeasurementManager.calculatePolylineArea(points, 'axial');
      expect(area).toBe(100);
    });

    it('should calculate statistics in a rectangular ROI', () => {
      const voxels = new Int16Array(64).fill(10);
      voxels[0] = 50;
      voxels[1] = 100;
      const dims: [number, number, number] = [4, 4, 4];
      const spacing: [number, number, number] = [1, 1, 1];
      const p1: [number, number, number] = [0, 0, 0];
      const p2: [number, number, number] = [1, 0, 0]; // Includes indices 0 and 1

      const stats = MeasurementManager.calculateRectangularROIStats(voxels, dims, spacing, p1, p2);
      expect(stats.min).toBe(50);
      expect(stats.max).toBe(100);
      expect(stats.mean).toBe(75);
      expect(stats.sd).toBe(25);
    });
  });

  describe('Lighting Manager', () => {
    it('should return preset configurations for CT Bone and Soft Tissue', () => {
      const boneConfig = LightingManager.getPresetLighting('bone');
      expect(boneConfig.specular).toBe(0.4);

      const softConfig = LightingManager.getPresetLighting('soft_tissue');
      expect(softConfig.specular).toBe(0.1);
    });

    it('should apply gamma and exposure corrections to opacity functions', () => {
      const mockOpacityFun: any = {
        removeAllPoints: vi.fn(),
        addPoint: vi.fn(),
        modified: vi.fn(),
      };
      const points = [
        { val: 100, o: 0.5 },
        { val: 200, o: 1.0 },
      ];

      LightingManager.applyGammaAndExposure(mockOpacityFun, points, 2.0, 1.2, 0.8);
      expect(mockOpacityFun.addPoint).toHaveBeenCalledTimes(2);
      // Math.pow(0.5, 0.5) * 1.2 * 0.8 = ~0.678
      expect(mockOpacityFun.addPoint).toHaveBeenNthCalledWith(1, 100, expect.closeTo(0.678, 2));
    });
  });

  describe('GPU Manager', () => {
    it('should support checking WebGL capabilities safely', () => {
      const support = GPUManager.isWebGL2Supported();
      expect(typeof support).toBe('boolean');
    });

    it('should estimate GPU texture memory correctly', () => {
      const bytes = GPUManager.estimateGPUMemoryBytes([256, 256, 128], 1, 2);
      expect(bytes).toBe(256 * 256 * 128 * 2);
    });
  });

  describe('Volume Manager blend mode and LOD', () => {
    it('should apply blend modes to mapper', () => {
      const mockMapper: any = {
        setBlendMode: vi.fn(),
        modified: vi.fn(),
      };
      VolumeManager.setBlendMode(mockMapper, 'mip');
      expect(mockMapper.setBlendMode).toHaveBeenCalledWith(1);
    });
  });

  describe('Transfer Function presets and histogram', () => {
    it('should export and import custom presets to JSON', () => {
      const custom = {
        name: 'custom_contrast',
        points: [
          { val: 0, r: 0, g: 0, b: 0, o: 0 },
          { val: 100, r: 1, g: 1, b: 1, o: 1 },
        ],
      };
      const json = TransferFunctionManager.exportCustomPreset(custom);
      const imported = TransferFunctionManager.importCustomPreset(json);
      expect(imported.name).toBe('custom_contrast');
      expect(imported.points.length).toBe(2);
    });

    it('should calculate voxel intensity histograms correctly', () => {
      const voxels = new Int16Array([10, 20, 30, 40, 50]);
      const hist = TransferFunctionManager.computeHistogram(voxels, 4);
      expect(hist.min).toBe(10);
      expect(hist.max).toBe(50);
      expect(hist.counts.length).toBe(4);
      expect(hist.counts.reduce((a, b) => a + b, 0)).toBe(5);
    });
  });

  describe('Clipping and Cropping Manager', () => {
    it('should add opposing planes for slice clipping', () => {
      const mockMapper: any = {
        removeAllClippingPlanes: vi.fn(),
        addClippingPlane: vi.fn(),
        modified: vi.fn(),
      };
      ClippingManager.applySliceClipping(mockMapper, 'Z', 10, 50);
      expect(mockMapper.removeAllClippingPlanes).toHaveBeenCalled();
      expect(mockMapper.addClippingPlane).toHaveBeenCalledTimes(2);
    });
  });

  describe('Mesh Exporting formats', () => {
    it('should generate OBJ, STL and PLY export strings', () => {
      const mockPoints = {
        getData: () => new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0]),
      };
      const mockPolys = {
        getData: () => new Int32Array([3, 0, 1, 2]),
      };
      const mockPolyData: any = {
        getPoints: () => mockPoints,
        getPolys: () => mockPolys,
      };

      const stl = MeshExporter.exportToSTL(mockPolyData);
      expect(stl).toContain('solid vtk_marching_cubes_mesh');
      expect(stl).toContain('vertex 10.000000 0.000000 0.000000');

      const obj = MeshExporter.exportToOBJ(mockPolyData);
      expect(obj).toContain('v 10.000000 0.000000 0.000000');
      expect(obj).toContain('f 1 2 3');

      const ply = MeshExporter.exportToPLY(mockPolyData);
      expect(ply).toContain('ply');
      expect(ply).toContain('element vertex 3');
      expect(ply).toContain('3 0 1 2');
    });
  });
});
