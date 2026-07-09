export interface IntensityStats {
  mean: number;
  sd: number;
  min: number;
  max: number;
}

export class MeasurementManager {
  /**
   * Calculate 3D Euclidean distance between two points in millimeters
   */
  public static calculateDistance(
    p1: [number, number, number],
    p2: [number, number, number]
  ): number {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dz = p2[2] - p1[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Calculate 3D angle between vectors (p1-p2) and (p3-p2) in degrees
   */
  public static calculateAngle(
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number]
  ): number {
    const v1 = [p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]];
    const v2 = [p3[0] - p2[0], p3[1] - p2[1], p3[2] - p2[2]];

    const dotProduct = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    const mag1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]);
    const mag2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2]);

    if (mag1 === 0 || mag2 === 0) return 0;
    const cosTheta = Math.max(-1, Math.min(1, dotProduct / (mag1 * mag2)));
    return (Math.acos(cosTheta) * 180) / Math.PI;
  }

  /**
   * Calculate volume of a sphere in mm^3
   */
  public static calculateSphereVolume(radiusMm: number): number {
    return (4 / 3) * Math.PI * Math.pow(radiusMm, 3);
  }

  /**
   * Calculate area of a polygon drawn on a viewport using the Shoelace formula.
   * Projects the 3D points onto the 2D plane based on viewport orientation.
   */
  public static calculatePolylineArea(
    points: [number, number, number][],
    viewportType: 'axial' | 'sagittal' | 'coronal'
  ): number {
    if (points.length < 3) return 0;

    // Project points to 2D based on viewport orientation
    const pts2d: [number, number][] = points.map((p) => {
      if (viewportType === 'axial') {
        return [p[0], p[1]]; // Drop Z
      } else if (viewportType === 'sagittal') {
        return [p[1], p[2]]; // Drop X
      } else {
        return [p[0], p[2]]; // Drop Y
      }
    });

    // Shoelace formula
    let area = 0;
    const n = pts2d.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += pts2d[i][0] * pts2d[j][1];
      area -= pts2d[j][0] * pts2d[i][1];
    }
    return Math.abs(area) / 2.0;
  }

  /**
   * Calculate minimum, maximum, mean, and SD voxel intensities in a spherical region.
   */
  public static calculateVoxelIntensityStats(
    voxels: Int16Array,
    dims: [number, number, number],
    spacing: [number, number, number],
    center: [number, number, number],
    radiusMm: number
  ): IntensityStats {
    const [width, height, depth] = dims;
    const [dx, dy, dz] = spacing;
    const [cx, cy, cz] = center;

    let sum = 0;
    let sumSq = 0;
    let count = 0;
    let min = Infinity;
    let max = -Infinity;

    const rVoxelX = Math.ceil(radiusMm / dx);
    const rVoxelY = Math.ceil(radiusMm / dy);
    const rVoxelZ = Math.ceil(radiusMm / dz);

    const cIdxX = Math.round(cx / dx);
    const cIdxY = Math.round(cy / dy);
    const cIdxZ = Math.round(cz / dz);

    const startX = Math.max(0, cIdxX - rVoxelX);
    const endX = Math.min(width - 1, cIdxX + rVoxelX);
    const startY = Math.max(0, cIdxY - rVoxelY);
    const endY = Math.min(height - 1, cIdxY + rVoxelY);
    const startZ = Math.max(0, cIdxZ - rVoxelZ);
    const endZ = Math.min(depth - 1, cIdxZ + rVoxelZ);

    for (let z = startZ; z <= endZ; z++) {
      const zDistSq = Math.pow((z - cIdxZ) * dz, 2);
      const zOffset = z * width * height;

      for (let y = startY; y <= endY; y++) {
        const yDistSq = Math.pow((y - cIdxY) * dy, 2);
        const yOffset = y * width;

        for (let x = startX; x <= endX; x++) {
          const xDistSq = Math.pow((x - cIdxX) * dx, 2);

          if (xDistSq + yDistSq + zDistSq <= radiusMm * radiusMm) {
            const idx = zOffset + yOffset + x;
            const val = voxels[idx];
            
            if (val !== undefined) {
              sum += val;
              sumSq += val * val;
              count++;
              if (val < min) min = val;
              if (val > max) max = val;
            }
          }
        }
      }
    }

    if (count === 0) {
      return { mean: 0, sd: 0, min: 0, max: 0 };
    }

    const mean = sum / count;
    const variance = sumSq / count - mean * mean;
    const sd = Math.sqrt(Math.max(0, variance));

    return { mean, sd, min, max };
  }

  /**
   * Calculate intensity stats inside a 2D rectangular ROI or 3D bounding box
   */
  public static calculateRectangularROIStats(
    voxels: Int16Array,
    dims: [number, number, number],
    spacing: [number, number, number],
    p1: [number, number, number],
    p2: [number, number, number]
  ): IntensityStats {
    const [width, height, depth] = dims;
    const [dx, dy, dz] = spacing;

    // Convert coordinates to voxel indices
    const minXIdx = Math.max(0, Math.min(width - 1, Math.round(Math.min(p1[0], p2[0]) / dx)));
    const maxXIdx = Math.max(0, Math.min(width - 1, Math.round(Math.max(p1[0], p2[0]) / dx)));
    
    const minYIdx = Math.max(0, Math.min(height - 1, Math.round(Math.min(p1[1], p2[1]) / dy)));
    const maxYIdx = Math.max(0, Math.min(height - 1, Math.round(Math.max(p1[1], p2[1]) / dy)));
    
    const minZIdx = Math.max(0, Math.min(depth - 1, Math.round(Math.min(p1[2], p2[2]) / dz)));
    const maxZIdx = Math.max(0, Math.min(depth - 1, Math.round(Math.max(p1[2], p2[2]) / dz)));

    let sum = 0;
    let sumSq = 0;
    let count = 0;
    let min = Infinity;
    let max = -Infinity;

    for (let z = minZIdx; z <= maxZIdx; z++) {
      const zOffset = z * width * height;
      for (let y = minYIdx; y <= maxYIdx; y++) {
        const yOffset = y * width;
        for (let x = minXIdx; x <= maxXIdx; x++) {
          const idx = zOffset + yOffset + x;
          const val = voxels[idx];
          if (val !== undefined) {
            sum += val;
            sumSq += val * val;
            count++;
            if (val < min) min = val;
            if (val > max) max = val;
          }
        }
      }
    }

    if (count === 0) {
      return { mean: 0, sd: 0, min: 0, max: 0 };
    }

    const mean = sum / count;
    const variance = sumSq / count - mean * mean;
    const sd = Math.sqrt(Math.max(0, variance));

    return { mean, sd, min, max };
  }
}

export type { IntensityStats as MeasurementIntensityStats };
