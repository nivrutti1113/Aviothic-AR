import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';

export interface CameraBookmark {
  position: [number, number, number];
  focalPoint: [number, number, number];
  viewUp: [number, number, number];
  parallelScale: number;
}

export class CameraManager {
  /**
   * Resets camera to fit bounding box and applies default zoom offset
   */
  public static resetCamera(renderer: vtkRenderer) {
    renderer.resetCamera();
    const camera = renderer.getActiveCamera();
    camera.zoom(1.2);
    renderer.getRenderWindow()?.render();
  }

  /**
   * Set perspective vs orthographic projection
   */
  public static setProjectionMode(renderer: vtkRenderer, isOrthographic: boolean) {
    const camera = renderer.getActiveCamera();
    camera.setParallelProjection(isOrthographic);
    renderer.getRenderWindow()?.render();
  }

  /**
   * Save current camera parameter state
   */
  public static saveBookmark(renderer: vtkRenderer): CameraBookmark {
    const camera = renderer.getActiveCamera();
    return {
      position: camera.getPosition() as [number, number, number],
      focalPoint: camera.getFocalPoint() as [number, number, number],
      viewUp: camera.getViewUp() as [number, number, number],
      parallelScale: camera.getParallelScale()
    };
  }

  /**
   * Restore camera to saved parameters
   */
  public static restoreBookmark(renderer: vtkRenderer, bookmark: CameraBookmark) {
    const camera = renderer.getActiveCamera();
    camera.setPosition(...bookmark.position);
    camera.setFocalPoint(...bookmark.focalPoint);
    camera.setViewUp(...bookmark.viewUp);
    camera.setParallelScale(bookmark.parallelScale);
    renderer.getRenderWindow()?.render();
  }

  /**
   * Align camera orientation along orthogonal axis planes
   */
  public static alignCameraToAxis(
    renderer: vtkRenderer,
    axis: 'axial' | 'sagittal' | 'coronal',
    bounds: [number, number, number, number, number, number]
  ) {
    const camera = renderer.getActiveCamera();
    
    const centerX = (bounds[0] + bounds[1]) / 2;
    const centerY = (bounds[2] + bounds[3]) / 2;
    const centerZ = (bounds[4] + bounds[5]) / 2;
    
    camera.setFocalPoint(centerX, centerY, centerZ);
    camera.setParallelProjection(true);

    if (axis === 'axial') {
      camera.setPosition(centerX, centerY, centerZ + 500);
      camera.setViewUp([0, -1, 0]);
      camera.setParallelScale((bounds[3] - bounds[2]) / 2);
    } else if (axis === 'sagittal') {
      camera.setPosition(centerX + 500, centerY, centerZ);
      camera.setViewUp([0, 0, 1]);
      camera.setParallelScale((bounds[5] - bounds[4]) / 2);
    } else if (axis === 'coronal') {
      camera.setPosition(centerX, centerY + 500, centerZ);
      camera.setViewUp([0, 0, 1]);
      camera.setParallelScale((bounds[5] - bounds[4]) / 2);
    }

    renderer.resetCameraClippingRange();
    renderer.getRenderWindow()?.render();
  }

  /**
   * Adjust camera parameters to fully enclose the volume bounds
   */
  public static fitToView(
    renderer: vtkRenderer,
    bounds: [number, number, number, number, number, number]
  ) {
    renderer.resetCamera(bounds);
    renderer.resetCameraClippingRange();
    renderer.getRenderWindow()?.render();
  }

  /**
   * Rotate camera around the focal point (elevation/elevation azimuth)
   */
  public static orbit(renderer: vtkRenderer, angleX: number, angleY: number) {
    const camera = renderer.getActiveCamera();
    camera.azimuth(angleX);
    camera.elevation(angleY);
    camera.orthogonalizeViewUp();
    renderer.resetCameraClippingRange();
    renderer.getRenderWindow()?.render();
  }

  /**
   * Translate camera focal point and position in world coordinates relative to view up and projection direction
   */
  public static pan(
    renderer: vtkRenderer,
    dx: number,
    dy: number,
    _viewportWidth: number,
    viewportHeight: number
  ) {
    const camera = renderer.getActiveCamera();
    const startFocal = camera.getFocalPoint() as [number, number, number];
    const startPos = camera.getPosition() as [number, number, number];
    const viewUp = camera.getViewUp() as [number, number, number];

    const dop = [
      startFocal[0] - startPos[0],
      startFocal[1] - startPos[1],
      startFocal[2] - startPos[2]
    ];
    const len = Math.sqrt(dop[0] * dop[0] + dop[1] * dop[1] + dop[2] * dop[2]);
    dop[0] /= len;
    dop[1] /= len;
    dop[2] /= len;

    // Right vector
    const right = [
      dop[1] * viewUp[2] - dop[2] * viewUp[1],
      dop[2] * viewUp[0] - dop[0] * viewUp[2],
      dop[0] * viewUp[1] - dop[1] * viewUp[0]
    ];

    let factor = 1.0;
    if (camera.getParallelProjection()) {
      factor = (camera.getParallelScale() * 2) / viewportHeight;
    } else {
      // Perspective distance factor
      const distance = len;
      const fov = camera.getViewAngle();
      const radFov = (fov * Math.PI) / 180;
      factor = (2 * distance * Math.tan(radFov / 2)) / viewportHeight;
    }

    const worldDx = -dx * factor;
    const worldDy = dy * factor;

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

    renderer.getRenderWindow()?.render();
  }

  /**
   * Dolly camera in/out
   */
  public static zoom(renderer: vtkRenderer, factor: number) {
    const camera = renderer.getActiveCamera();
    if (camera.getParallelProjection()) {
      const scale = camera.getParallelScale();
      camera.setParallelScale(scale * factor);
    } else {
      camera.dolly(factor);
    }
    renderer.resetCameraClippingRange();
    renderer.getRenderWindow()?.render();
  }

  /**
   * Smoothly animates camera parameters from current state to target state
   */
  public static async animateToBookmark(
    renderer: vtkRenderer,
    target: CameraBookmark,
    durationMs: number = 800
  ): Promise<void> {
    const camera = renderer.getActiveCamera();
    const startPos = camera.getPosition() as [number, number, number];
    const startFocal = camera.getFocalPoint() as [number, number, number];
    const startViewUp = camera.getViewUp() as [number, number, number];
    const startScale = camera.getParallelScale();
    const startTime = performance.now();

    return new Promise((resolve) => {
      const step = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        
        // Easing curve (ease-in-out-cubic)
        const t = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentPos: [number, number, number] = [
          startPos[0] + (target.position[0] - startPos[0]) * t,
          startPos[1] + (target.position[1] - startPos[1]) * t,
          startPos[2] + (target.position[2] - startPos[2]) * t
        ];

        const currentFocal: [number, number, number] = [
          startFocal[0] + (target.focalPoint[0] - startFocal[0]) * t,
          startFocal[1] + (target.focalPoint[1] - startFocal[1]) * t,
          startFocal[2] + (target.focalPoint[2] - startFocal[2]) * t
        ];

        const currentViewUp: [number, number, number] = [
          startViewUp[0] + (target.viewUp[0] - startViewUp[0]) * t,
          startViewUp[1] + (target.viewUp[1] - startViewUp[1]) * t,
          startViewUp[2] + (target.viewUp[2] - startViewUp[2]) * t
        ];

        const currentScale = startScale + (target.parallelScale - startScale) * t;

        camera.setPosition(...currentPos);
        camera.setFocalPoint(...currentFocal);
        camera.setViewUp(...currentViewUp);
        camera.setParallelScale(currentScale);
        
        renderer.resetCameraClippingRange();
        renderer.getRenderWindow()?.render();

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }
}
