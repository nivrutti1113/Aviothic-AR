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
