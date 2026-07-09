import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData';

interface CacheEntry {
  imageData: vtkImageData;
  volumeImageData: vtkImageData;
  meta: any;
  binBuffer: ArrayBuffer;
  resampledDz: number;
}

class VolumeCacheManager {
  private cache = new Map<string, CacheEntry>();
  private maxEntries = 5;

  public get(caseId: string): CacheEntry | undefined {
    return this.cache.get(caseId);
  }

  public set(caseId: string, entry: CacheEntry) {
    if (this.cache.size >= this.maxEntries) {
      // Evict oldest entry to prevent GPU/RAM memory leaks
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        const oldest = this.cache.get(oldestKey);
        if (oldest) {
          oldest.imageData.delete();
          if (oldest.volumeImageData !== oldest.imageData) {
            oldest.volumeImageData.delete();
          }
        }
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(caseId, entry);
  }

  public clear() {
    this.cache.forEach(entry => {
      entry.imageData.delete();
      if (entry.volumeImageData !== entry.imageData) {
        entry.volumeImageData.delete();
      }
    });
    this.cache.clear();
  }
}

export const volumeCache = new VolumeCacheManager();
export type { CacheEntry };
