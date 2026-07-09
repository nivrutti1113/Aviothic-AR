import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';

export interface LightingConfig {
  ambient: number;
  diffuse: number;
  specular: number;
  specularPower: number;
  shade: boolean;
  brightness: number;
  contrast: number;
  gamma: number;
  exposure: number;
}

export class LightingManager {
  /**
   * Applies shading and light reflection parameters to a vtkVolume
   */
  public static applyLighting(volume: vtkVolume, config: LightingConfig) {
    const property = volume.getProperty();
    property.setAmbient(config.ambient * config.brightness);
    property.setDiffuse(config.diffuse * config.contrast);
    property.setSpecular(config.specular);
    property.setSpecularPower(config.specularPower);
    property.setShade(config.shade);
    
    volume.modified();
  }

  /**
   * Apply gamma correction and exposure scaling directly onto the opacity piecewise function
   */
  public static applyGammaAndExposure(
    opacityFun: vtkPiecewiseFunction,
    originalPoints: { val: number; o: number }[],
    gamma: number,
    exposure: number,
    volumeOpacity: number
  ) {
    opacityFun.removeAllPoints();
    
    originalPoints.forEach(p => {
      // Gamma correction: o_new = o_orig ^ (1/gamma)
      let correctedOpacity = p.o;
      if (gamma > 0 && gamma !== 1) {
        correctedOpacity = Math.pow(p.o, 1 / gamma);
      }
      
      // Exposure correction: scale linearly
      let finalOpacity = correctedOpacity * exposure * volumeOpacity;
      finalOpacity = Math.max(0, Math.min(1.0, finalOpacity));

      opacityFun.addPoint(p.val, finalOpacity);
    });

    opacityFun.modified();
  }

  /**
   * Retrieve standard clinical lighting profiles
   */
  public static getPresetLighting(presetName: string): Partial<LightingConfig> {
    switch (presetName) {
      case 'bone':
        return { ambient: 0.2, diffuse: 0.7, specular: 0.4, specularPower: 20, shade: true };
      case 'soft_tissue':
        return { ambient: 0.3, diffuse: 0.6, specular: 0.1, specularPower: 5, shade: true };
      case 'brain':
      case 'brain_tissue':
        return { ambient: 0.3, diffuse: 0.55, specular: 0.15, specularPower: 8, shade: true };
      case 'breast':
      case 'breast_tissue':
        return { ambient: 0.35, diffuse: 0.6, specular: 0.1, specularPower: 5, shade: true };
      case 'transparent':
        return { ambient: 0.4, diffuse: 0.6, specular: 0.5, specularPower: 30, shade: true };
      case 'high_detail':
      default:
        return { ambient: 0.25, diffuse: 0.65, specular: 0.3, specularPower: 12, shade: true };
    }
  }
}
