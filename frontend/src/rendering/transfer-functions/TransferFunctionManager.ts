import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';

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

export class TransferFunctionManager {
  /**
   * Updates color and opacity transfer functions based on current W/L, intensity stats, modality, and selected preset.
   */
  public static update3DTransferFunctions(
    colorFun: vtkColorTransferFunction,
    opacityFun: vtkPiecewiseFunction,
    ww: number,
    wl: number,
    minInt: number,
    maxInt: number,
    modality: string,
    preset3D: string,
    volumeOpacity: number,
    stats: { min: number; max: number; p1: number; p99: number } | null
  ) {
    colorFun.removeAllPoints();
    opacityFun.removeAllPoints();

    const useStats = stats || { min: minInt, max: maxInt, p1: minInt, p99: maxInt };
    
    // Calculate dynamic window bounds from user W/L inputs
    const wlMin = wl - ww / 2;
    const wlMax = wl + ww / 2;
    const wlRange = ww || 1;

    let resolvedPreset = preset3D;
    if (resolvedPreset === 'default') {
      if (modality === 'PT' || modality === 'PET') {
        resolvedPreset = 'pet_hot_iron';
      } else if (modality === 'MR') {
        resolvedPreset = 'tissue_contrast';
      } else if (modality === 'MG') {
        resolvedPreset = 'breast_tissue';
      } else {
        resolvedPreset = 'soft_tissue';
      }
    }

    let points: { val: number; r: number; g: number; b: number; o: number }[] = [];

    switch (resolvedPreset) {
      case 'bone':
        points = [
          { val: useStats.min, r: 0.0, g: 0.0, b: 0.0, o: 0.0 },
          { val: wlMin, r: 0.2, g: 0.1, b: 0.05, o: 0.0 },
          { val: wlMin + 0.15 * wlRange, r: 0.65, g: 0.35, b: 0.2, o: 0.08 },
          { val: wlMin + 0.35 * wlRange, r: 0.85, g: 0.65, b: 0.45, o: 0.4 },
          { val: wlMin + 0.6 * wlRange, r: 0.95, g: 0.9, b: 0.8, o: 0.8 },
          { val: wlMin + 0.85 * wlRange, r: 1.0, g: 0.98, b: 0.95, o: 0.9 },
          { val: wlMax, r: 1.0, g: 1.0, b: 1.0, o: 0.95 }
        ];
        break;

      case 'soft_tissue':
        points = [
          { val: useStats.min, r: 0.0, g: 0.0, b: 0.0, o: 0.0 },
          { val: wlMin, r: 0.05, g: 0.02, b: 0.02, o: 0.0 },
          { val: wlMin + 0.2 * wlRange, r: 0.45, g: 0.15, b: 0.1, o: 0.05 },
          { val: wlMin + 0.4 * wlRange, r: 0.75, g: 0.45, b: 0.35, o: 0.2 },
          { val: wlMin + 0.65 * wlRange, r: 0.85, g: 0.65, b: 0.55, o: 0.5 },
          { val: wlMin + 0.85 * wlRange, r: 0.95, g: 0.85, b: 0.75, o: 0.75 },
          { val: wlMax, r: 1.0, g: 0.95, b: 0.9, o: 0.85 }
        ];
        break;

      case 'brain_tissue':
      case 'brain':
        points = [
          { val: useStats.min, r: 0.0, g: 0.0, b: 0.0, o: 0.0 },
          { val: wlMin, r: 0.05, g: 0.05, b: 0.08, o: 0.0 },
          { val: wlMin + 0.25 * wlRange, r: 0.5, g: 0.4, b: 0.45, o: 0.1 },
          { val: wlMin + 0.5 * wlRange, r: 0.8, g: 0.65, b: 0.68, o: 0.35 },
          { val: wlMin + 0.75 * wlRange, r: 0.92, g: 0.85, b: 0.88, o: 0.7 },
          { val: wlMax, r: 1.0, g: 0.98, b: 1.0, o: 0.85 }
        ];
        break;

      case 'breast_tissue':
      case 'breast':
        points = [
          { val: useStats.min, r: 0.0, g: 0.0, b: 0.0, o: 0.0 },
          { val: wlMin, r: 0.1, g: 0.05, b: 0.08, o: 0.0 },
          { val: wlMin + 0.3 * wlRange, r: 0.6, g: 0.35, b: 0.4, o: 0.15 },
          { val: wlMin + 0.6 * wlRange, r: 0.88, g: 0.6, b: 0.65, o: 0.45 },
          { val: wlMin + 0.85 * wlRange, r: 0.98, g: 0.88, b: 0.9, o: 0.75 },
          { val: wlMax, r: 1.0, g: 0.95, b: 0.98, o: 0.85 }
        ];
        break;

      case 'pet_hot_iron':
        points = [
          { val: useStats.min, r: 0.0, g: 0.0, b: 0.0, o: 0.0 },
          { val: wlMin, r: 0.0, g: 0.0, b: 0.0, o: 0.0 },
          { val: wlMin + 0.25 * wlRange, r: 0.5, g: 0.0, b: 0.0, o: 0.15 },
          { val: wlMin + 0.5 * wlRange, r: 1.0, g: 0.4, b: 0.0, o: 0.45 },
          { val: wlMin + 0.75 * wlRange, r: 1.0, g: 0.85, b: 0.0, o: 0.75 },
          { val: wlMax, r: 1.0, g: 1.0, b: 1.0, o: 0.95 }
        ];
        break;

      case 'pet_rainbow':
        points = [
          { val: useStats.min, r: 0.0, g: 0.0, b: 0.0, o: 0.0 },
          { val: wlMin, r: 0.0, g: 0.0, b: 0.5, o: 0.0 },
          { val: wlMin + 0.2 * wlRange, r: 0.0, g: 0.5, b: 1.0, o: 0.15 },
          { val: wlMin + 0.4 * wlRange, r: 0.0, g: 1.0, b: 0.0, o: 0.4 },
          { val: wlMin + 0.6 * wlRange, r: 1.0, g: 1.0, b: 0.0, o: 0.6 },
          { val: wlMin + 0.8 * wlRange, r: 1.0, g: 0.5, b: 0.0, o: 0.8 },
          { val: wlMax, r: 1.0, g: 0.0, b: 0.0, o: 0.95 }
        ];
        break;

      case 'transparent':
        points = [
          { val: useStats.min, r: 0.0, g: 0.0, b: 0.0, o: 0.0 },
          { val: wlMin, r: 0.3, g: 0.3, b: 0.3, o: 0.0 },
          { val: wlMin + 0.3 * wlRange, r: 0.4, g: 0.6, b: 0.8, o: 0.05 },
          { val: wlMin + 0.6 * wlRange, r: 0.8, g: 0.8, b: 0.9, o: 0.15 },
          { val: wlMax, r: 1.0, g: 1.0, b: 1.0, o: 0.3 }
        ];
        break;

      case 'high_detail':
      case 'tissue_contrast':
      default:
        points = [
          { val: useStats.min, r: 0.0, g: 0.0, b: 0.0, o: 0.0 },
          { val: wlMin, r: 0.1, g: 0.05, b: 0.05, o: 0.0 },
          { val: wlMin + 0.25 * wlRange, r: 0.8, g: 0.5, b: 0.4, o: 0.25 },
          { val: wlMin + 0.6 * wlRange, r: 0.88, g: 0.75, b: 0.65, o: 0.55 },
          { val: wlMin + 0.85 * wlRange, r: 0.95, g: 0.9, b: 0.8, o: 0.75 },
          { val: wlMax, r: 1.0, g: 1.0, b: 0.95, o: 0.85 }
        ];
        break;
    }

    // Sort to guarantee ascending order (required by VTK.js)
    const sorted = points.sort((a, b) => a.val - b.val);
    const unique = sorted.filter((p, i, self) => i === 0 || p.val > self[i - 1].val);

    unique.forEach((p) => {
      colorFun.addRGBPoint(p.val, p.r, p.g, p.b);
      opacityFun.addPoint(p.val, p.o * volumeOpacity);
    });
  }

  /**
   * Serialize custom transfer function curves to JSON
   */
  public static exportCustomPreset(preset: CustomPreset): string {
    return JSON.stringify(preset, null, 2);
  }

  /**
   * Deserialize custom transfer function curves from JSON
   */
  public static importCustomPreset(jsonString: string): CustomPreset {
    const parsed = JSON.parse(jsonString);
    if (!parsed.name || !Array.isArray(parsed.points)) {
      throw new Error('Invalid preset format: missing name or points array');
    }
    return parsed as CustomPreset;
  }

  /**
   * Computes intensity histogram from voxel buffer
   */
  public static computeHistogram(
    voxels: Int16Array,
    binsCount: number = 256
  ): { binCenters: number[]; counts: number[]; min: number; max: number } {
    let min = Infinity;
    let max = -Infinity;
    
    // Find min and max in one pass
    for (let i = 0; i < voxels.length; i++) {
      const val = voxels[i];
      if (val < min) min = val;
      if (val > max) max = val;
    }

    if (min === Infinity || max === -Infinity) {
      return { binCenters: [], counts: [], min: 0, max: 0 };
    }

    const counts = new Array(binsCount).fill(0);
    const range = max - min || 1;
    const binWidth = range / binsCount;

    for (let i = 0; i < voxels.length; i++) {
      const val = voxels[i];
      const binIdx = Math.min(binsCount - 1, Math.floor((val - min) / binWidth));
      counts[binIdx]++;
    }

    const binCenters: number[] = [];
    for (let i = 0; i < binsCount; i++) {
      binCenters.push(min + (i + 0.5) * binWidth);
    }

    return { binCenters, counts, min, max };
  }
}
