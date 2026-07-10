import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkPlane from '@kitware/vtk.js/Common/DataModel/Plane';

export interface ClippingPlaneConfig {
  origin: [number, number, number];
  normal: [number, number, number];
}

export class ClippingManager {
  /**
   * Toggle cropping and apply ROI cropping bounds on the volume mapper.
   */
  public static setCroppingBounds(
    mapper: vtkVolumeMapper,
    bounds: [number, number, number, number, number, number] | null
  ) {
    const anyMapper = mapper as any;
    
    // Check if the mapper supports setCropping (vtk.js does not support this natively on vtkVolumeMapper)
    if (typeof anyMapper.setCropping !== 'function') {
      if (!bounds) {
        return;
      }
      // Fallback: Implement box cropping using 6 clipping planes
      const [xmin, xmax, ymin, ymax, zmin, zmax] = bounds;
      const cropPlanes = [
        { origin: [xmin, 0, 0], normal: [1, 0, 0] },
        { origin: [xmax, 0, 0], normal: [-1, 0, 0] },
        { origin: [0, ymin, 0], normal: [0, 1, 0] },
        { origin: [0, ymax, 0], normal: [0, -1, 0] },
        { origin: [0, 0, zmin], normal: [0, 0, 1] },
        { origin: [0, 0, zmax], normal: [0, 0, -1] }
      ];

      cropPlanes.forEach(p => {
        const plane = vtkPlane.newInstance();
        plane.setOrigin(p.origin as [number, number, number]);
        plane.setNormal(p.normal as [number, number, number]);
        anyMapper.addClippingPlane(plane);
      });
      anyMapper.modified();
      return;
    }

    if (!bounds) {
      anyMapper.setCropping(false);
      anyMapper.modified();
      return;
    }

    anyMapper.setCropping(true);
    anyMapper.setCroppingPlanes(
      bounds[0], bounds[1],
      bounds[2], bounds[3],
      bounds[4], bounds[5]
    );
    anyMapper.modified();
  }

  /**
   * Apply multiple interactive clipping planes on the mapper.
   */
  public static setClippingPlanes(
    mapper: vtkVolumeMapper,
    planes: ClippingPlaneConfig[]
  ) {
    const anyMapper = mapper as any;
    anyMapper.removeAllClippingPlanes();
    
    planes.forEach(p => {
      const plane = vtkPlane.newInstance();
      plane.setOrigin(p.origin);
      plane.setNormal(p.normal);
      anyMapper.addClippingPlane(plane);
    });

    anyMapper.modified();
  }

  /**
   * Slice clipping along a specific coordinate axis using two opposing planes.
   */
  public static applySliceClipping(
    mapper: vtkVolumeMapper,
    axis: 'X' | 'Y' | 'Z',
    minVal: number,
    maxVal: number
  ) {
    const anyMapper = mapper as any;
    anyMapper.removeAllClippingPlanes();

    let normal1: [number, number, number] = [1, 0, 0];
    let normal2: [number, number, number] = [-1, 0, 0];

    if (axis === 'Y') {
      normal1 = [0, 1, 0];
      normal2 = [0, -1, 0];
    } else if (axis === 'Z') {
      normal1 = [0, 0, 1];
      normal2 = [0, 0, -1];
    }

    const plane1 = vtkPlane.newInstance();
    plane1.setOrigin(
      axis === 'X' ? [minVal, 0, 0] : axis === 'Y' ? [0, minVal, 0] : [0, 0, minVal]
    );
    plane1.setNormal(normal1);

    const plane2 = vtkPlane.newInstance();
    plane2.setOrigin(
      axis === 'X' ? [maxVal, 0, 0] : axis === 'Y' ? [0, maxVal, 0] : [0, 0, maxVal]
    );
    plane2.setNormal(normal2);

    anyMapper.addClippingPlane(plane1);
    anyMapper.addClippingPlane(plane2);
    
    anyMapper.modified();
  }

  /**
   * Reset all clipping planes on mapper.
   */
  public static removeAllClippingPlanes(mapper: vtkVolumeMapper) {
    const anyMapper = mapper as any;
    anyMapper.removeAllClippingPlanes();
    anyMapper.modified();
  }
}
