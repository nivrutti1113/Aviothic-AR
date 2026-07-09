import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';

export class PerformanceManager {
  private static interactionTimeout: number | null = null;

  public static optimizeForInteraction(
    mapper: vtkVolumeMapper,
    renderWindow: vtkRenderWindow,
    minSpacing: number
  ) {
    mapper.setSampleDistance(minSpacing * 1.5);
    renderWindow.render();

    if (this.interactionTimeout !== null) {
      window.clearTimeout(this.interactionTimeout);
    }

    this.interactionTimeout = window.setTimeout(() => {
      mapper.setSampleDistance(minSpacing * 0.45);
      renderWindow.render();
      this.interactionTimeout = null;
    }, 150);
  }

  public static handleWebGLContextLoss(
    canvas: HTMLCanvasElement,
    restoreCallback: () => void
  ) {
    const handleLoss = (e: Event) => {
      e.preventDefault();
      console.warn('[WebGL Debug] WebGL context lost. Attempting recovery...');
    };

    const handleRestore = () => {
      console.log('[WebGL Debug] WebGL context restored. Re-initializing viewports...');
      restoreCallback();
    };

    canvas.addEventListener('webglcontextlost', handleLoss, false);
    canvas.addEventListener('webglcontextrestored', handleRestore, false);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleLoss);
      canvas.removeEventListener('webglcontextrestored', handleRestore);
    };
  }
}
