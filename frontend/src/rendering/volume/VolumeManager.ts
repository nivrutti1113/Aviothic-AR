import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData';
import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import { volumeCache } from '../cache/VolumeCache';
import type { CacheEntry } from '../cache/VolumeCache';

export class VolumeManager {
  /**
   * Helper to set volume rendering blend mode
   */
  public static setBlendMode(
    mapper: vtkVolumeMapper,
    mode: 'volume' | 'mip' | 'minip' | 'average'
  ) {
    // 0: COMPOSITE_BLEND, 1: MAXIMUM_INTENSITY_BLEND, 2: MINIMUM_INTENSITY_BLEND, 3: AVERAGE_INTENSITY_BLEND
    let blendMode = 0;
    if (mode === 'mip') {
      blendMode = 1;
    } else if (mode === 'minip') {
      blendMode = 2;
    } else if (mode === 'average') {
      blendMode = 3;
    }
    
    mapper.setBlendMode(blendMode);
    mapper.modified();
  }

  /**
   * Create a standard VTK volume from a flat binary ArrayBuffer
   */
  public static createVolumeFromBuffer(
    meta: any,
    binBuffer: ArrayBuffer
  ): vtkImageData {
    const { width, height, depth, dx, dy, dz } = meta;
    const imageData = vtkImageData.newInstance();
    imageData.setDimensions([width, height, depth]);
    imageData.setSpacing([dx, dy, dz]);
    imageData.setOrigin([0, 0, 0]);

    const scalars = vtkDataArray.newInstance({
      name: 'Scalars',
      numberOfComponents: 1,
      values: new Int16Array(binBuffer),
    });
    imageData.getPointData().setScalars(scalars);
    return imageData;
  }

  /**
   * Create a downsampled volume copy for fast adaptive level-of-detail (LOD) rendering
   */
  public static createDownsampledVolume(
    imageData: vtkImageData,
    factor: number
  ): vtkImageData {
    if (factor <= 1) return imageData;

    const [w, h, d] = imageData.getDimensions();
    const [dx, dy, dz] = imageData.getSpacing();
    const scalars = imageData.getPointData().getScalars().getData() as Int16Array;

    const nw = Math.max(1, Math.floor(w / factor));
    const nh = Math.max(1, Math.floor(h / factor));
    const nd = Math.max(1, Math.floor(d / factor));

    const ndx = dx * (w / nw);
    const ndy = dy * (h / nh);
    const ndz = dz * (d / nd);

    const downsampledVolume = vtkImageData.newInstance();
    downsampledVolume.setDimensions([nw, nh, nd]);
    downsampledVolume.setSpacing([ndx, ndy, ndz]);
    downsampledVolume.setOrigin([0, 0, 0]);

    const size = nw * nh * nd;
    const downsampledScalars = new Int16Array(size);

    for (let z = 0; z < nd; z++) {
      const origZ = Math.min(d - 1, Math.round(z * factor));
      const origZOffset = origZ * w * h;
      const destZOffset = z * nw * nh;

      for (let y = 0; y < nh; y++) {
        const origY = Math.min(h - 1, Math.round(y * factor));
        const origYOffset = origY * w;
        const destYOffset = y * nw;

        for (let x = 0; x < nw; x++) {
          const origX = Math.min(w - 1, Math.round(x * factor));
          downsampledScalars[destZOffset + destYOffset + x] = scalars[origZOffset + origYOffset + origX];
        }
      }
    }

    const dataArray = vtkDataArray.newInstance({
      name: 'Scalars',
      numberOfComponents: 1,
      values: downsampledScalars,
    });
    downsampledVolume.getPointData().setScalars(dataArray);
    return downsampledVolume;
  }

  /**
   * Loads and resamples a volume (by scaling slice thickness to match in-plane voxel sizes, if voxel spacing is extremely anisotropic)
   */
  public static async loadAndResampleVolume(
    caseId: string,
    meta: any,
    binBuffer: ArrayBuffer
  ): Promise<CacheEntry> {
    const cached = volumeCache.get(caseId);
    if (cached) {
      return cached;
    }

    const { width, height, depth, dx, dy, dz } = meta;
    const imageData = this.createVolumeFromBuffer(meta, binBuffer);
    
    const inPlane = (dx + dy) / 2;
    let volumeImageData = imageData;
    let resampledDz = dz;

    // Resample only if anisotropy is severe (slice spacing > twice in-plane resolution)
    if (dz > 2 * inPlane) {
      volumeImageData = await new Promise<vtkImageData>((resolve, reject) => {
        const worker = new Worker(
          new URL('../workers/resample.worker.ts', import.meta.url),
          { type: 'module' }
        );
        const rawScalars = new Int16Array(binBuffer);
        
        worker.postMessage({
          data: rawScalars,
          width,
          height,
          depth,
          dx,
          dy,
          dz
        });

        worker.onmessage = (e) => {
          const { data, depth: newDepth, dz: newDz } = e.data;
          
          const resampledVolume = vtkImageData.newInstance();
          resampledVolume.setDimensions([width, height, newDepth]);
          resampledVolume.setSpacing([dx, dy, newDz]);
          resampledVolume.setOrigin([0, 0, 0]);

          const resampledScalars = vtkDataArray.newInstance({
            name: 'Scalars',
            numberOfComponents: 1,
            values: data,
          });
          resampledVolume.getPointData().setScalars(resampledScalars);
          resampledDz = newDz;
          
          worker.terminate();
          resolve(resampledVolume);
        };

        worker.onerror = (err) => {
          worker.terminate();
          reject(err);
        };
      });
    }

    const entry: CacheEntry = {
      imageData,
      volumeImageData,
      meta,
      binBuffer,
      resampledDz
    };

    volumeCache.set(caseId, entry);
    return entry;
  }
}
