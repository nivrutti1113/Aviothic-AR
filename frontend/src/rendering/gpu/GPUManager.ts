export interface GPUCapabilities {
  webgl2: boolean;
  vendor: string;
  renderer: string;
  maxTexture3DSize: number;
  floatTextures: boolean;
  halfFloatTextures: boolean;
  floatLinearFiltering: boolean;
  halfFloatLinearFiltering: boolean;
}

export class GPUManager {
  public static isWebGL2Supported(): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  public static getGPURendererInfo(): { vendor: string; renderer: string } | null {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      if (!gl) return null;

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (!debugInfo) return null;

      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      return { vendor, renderer };
    } catch (e) {
      return null;
    }
  }

  public static getMaxTextureSize(): number {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      if (!gl) return 2048;
      return gl.getParameter(gl.MAX_3D_TEXTURE_SIZE) || 2048;
    } catch (e) {
      return 2048;
    }
  }

  public static getCapabilities(): GPUCapabilities {
    const webgl2 = this.isWebGL2Supported();
    const info = this.getGPURendererInfo();
    const maxTexture3DSize = this.getMaxTextureSize();
    
    let floatTextures = false;
    let halfFloatTextures = false;
    let floatLinearFiltering = false;
    let halfFloatLinearFiltering = false;

    if (webgl2) {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        if (gl) {
          floatTextures = !!gl.getExtension('EXT_color_buffer_float');
          halfFloatTextures = floatTextures; // WebGL2 natively supports half-float renderability with float extensions
          floatLinearFiltering = !!gl.getExtension('OES_texture_float_linear');
          halfFloatLinearFiltering = !!gl.getExtension('OES_texture_half_float_linear');
        }
      } catch (e) {
        // Fallback
      }
    }

    return {
      webgl2,
      vendor: info?.vendor || 'Unknown Vendor',
      renderer: info?.renderer || 'Software Rasterizer',
      maxTexture3DSize,
      floatTextures,
      halfFloatTextures,
      floatLinearFiltering,
      halfFloatLinearFiltering
    };
  }

  public static estimateGPUMemoryBytes(
    dimensions: [number, number, number],
    components: number = 1,
    bytesPerComponent: number = 2 // Int16 (2 bytes) or Float32 (4 bytes)
  ): number {
    const [w, h, d] = dimensions;
    return w * h * d * components * bytesPerComponent;
  }

  public static handleWebGLContextLoss(
    canvas: HTMLCanvasElement,
    onLost: (e: Event) => void,
    onRestored: () => void
  ): () => void {
    const handleLoss = (e: Event) => {
      e.preventDefault();
      console.warn('[WebGL Debug] WebGL context lost. Attempting recovery...');
      onLost(e);
    };

    const handleRestore = () => {
      console.log('[WebGL Debug] WebGL context restored. Re-initializing viewports...');
      onRestored();
    };

    canvas.addEventListener('webglcontextlost', handleLoss, false);
    canvas.addEventListener('webglcontextrestored', handleRestore, false);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleLoss);
      canvas.removeEventListener('webglcontextrestored', handleRestore);
    };
  }
}

export type { GPUManager as MedicalGPUManager };
