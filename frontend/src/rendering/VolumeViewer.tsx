import React, { useEffect, useRef } from 'react';
import { useRenderingStore } from './renderingStore';
import { GPUManager } from './gpu/GPUManager';
import { VolumeManager } from './volume/VolumeManager';
import { CameraManager } from './camera/CameraManager';
import { LightingManager } from './lighting/LightingManager';
import { TransferFunctionManager } from './transfer-functions/TransferFunctionManager';
import { ClippingManager } from './clipping/ClippingManager';

import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkImageSlice from '@kitware/vtk.js/Rendering/Core/ImageSlice';
import vtkImageMapper from '@kitware/vtk.js/Rendering/Core/ImageMapper';
import ImageConstants from '@kitware/vtk.js/Rendering/Core/ImageMapper/Constants';
import vtkLookupTable from '@kitware/vtk.js/Common/Core/LookupTable';
import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData';

const { SlicingMode } = ImageConstants;

interface VolumeViewerProps {
  type: 'axial' | 'sagittal' | 'coronal' | 'volume';
  onInitialized?: (vtkObjects: {
    renderer: vtkRenderer;
    renderWindow: vtkRenderWindow;
    openGLRenderWindow: vtkOpenGLRenderWindow;
    interactor: vtkRenderWindowInteractor;
    mapper?: vtkImageMapper | vtkVolumeMapper;
    actor?: vtkImageSlice | vtkVolume;
    labelMapper?: vtkImageMapper;
    labelActor?: vtkImageSlice;
    colorFun?: vtkColorTransferFunction;
    opacityFun?: vtkPiecewiseFunction;
    meshMapper?: vtkMapper;
    meshActor?: vtkActor;
  }) => void;
  imageData: vtkImageData | null;
  labelImageData?: vtkImageData | null;
}

export const VolumeViewer: React.FC<VolumeViewerProps> = ({
  type,
  onInitialized,
  imageData,
  labelImageData,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Select store state
  const loadedVolume = useRenderingStore((state) => state.loadedVolume);
  const sliceAxial = useRenderingStore((state) => state.sliceAxial);
  const sliceSagittal = useRenderingStore((state) => state.sliceSagittal);
  const sliceCoronal = useRenderingStore((state) => state.sliceCoronal);
  const windowWidth = useRenderingStore((state) => state.windowWidth);
  const windowLevel = useRenderingStore((state) => state.windowLevel);
  const active3DPreset = useRenderingStore((state) => state.active3DPreset);
  const renderMode = useRenderingStore((state) => state.renderMode);
  const volumeOpacity = useRenderingStore((state) => state.volumeOpacity);
  const show3DMesh = useRenderingStore((state) => state.show3DMesh);
  const meshOpacity = useRenderingStore((state) => state.meshOpacity);
  const intensityStats = useRenderingStore((state) => state.intensityStats);
  const lightingConfig = useRenderingStore((state) => state.lightingConfig);
  const clippingPlanes = useRenderingStore((state) => state.clippingPlanes);
  const croppingBounds = useRenderingStore((state) => state.croppingBounds);
  const isClippingActive = useRenderingStore((state) => state.isClippingActive);

  // Keep references to VTK objects for reactivity
  const vtkRefs = useRef<{
    renderer: vtkRenderer | null;
    renderWindow: vtkRenderWindow | null;
    openGLRenderWindow: vtkOpenGLRenderWindow | null;
    interactor: vtkRenderWindowInteractor | null;
    mapper: vtkImageMapper | vtkVolumeMapper | null;
    actor: vtkImageSlice | vtkVolume | null;
    labelMapper: vtkImageMapper | null;
    labelActor: vtkImageSlice | null;
    colorFun: vtkColorTransferFunction | null;
    opacityFun: vtkPiecewiseFunction | null;
    meshMapper: vtkMapper | null;
    meshActor: vtkActor | null;
  }>({
    renderer: null,
    renderWindow: null,
    openGLRenderWindow: null,
    interactor: null,
    mapper: null,
    actor: null,
    labelMapper: null,
    labelActor: null,
    colorFun: null,
    opacityFun: null,
    meshMapper: null,
    meshActor: null,
  });

  useEffect(() => {
    if (!containerRef.current || !imageData) return;

    if (!GPUManager.isWebGL2Supported()) {
      console.error('[Rendering Engine] WebGL2 hardware acceleration not supported.');
      return;
    }

    const renderer = vtkRenderer.newInstance();
    const renderWindow = vtkRenderWindow.newInstance();
    renderWindow.addRenderer(renderer);

    const openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
    openGLRenderWindow.setContainer(containerRef.current);
    renderWindow.addView(openGLRenderWindow);

    const interactor = vtkRenderWindowInteractor.newInstance();
    interactor.setView(openGLRenderWindow);
    interactor.initialize();
    interactor.bindEvents(containerRef.current);

    vtkRefs.current = {
      renderer,
      renderWindow,
      openGLRenderWindow,
      interactor,
      mapper: null,
      actor: null,
      labelMapper: null,
      labelActor: null,
      colorFun: null,
      opacityFun: null,
      meshMapper: null,
      meshActor: null,
    };

    const bounds = imageData.getBounds();

    if (type !== 'volume') {
      // 2D Viewport setup
      renderer.setBackground(0, 0, 0);

      const mapper = vtkImageMapper.newInstance();
      mapper.setInputData(imageData);

      let slicingMode = SlicingMode.K;
      let initialSlice = 0;

      if (type === 'axial') {
        slicingMode = SlicingMode.K;
        initialSlice = sliceAxial;
      } else if (type === 'sagittal') {
        slicingMode = SlicingMode.I;
        initialSlice = sliceSagittal;
      } else if (type === 'coronal') {
        slicingMode = SlicingMode.J;
        initialSlice = sliceCoronal;
      }

      mapper.setSlicingMode(slicingMode);
      mapper.setSlice(initialSlice);

      const actor = vtkImageSlice.newInstance();
      actor.setMapper(mapper);
      actor.getProperty().setColorWindow(windowWidth);
      actor.getProperty().setColorLevel(windowLevel);
      renderer.addActor(actor);

      vtkRefs.current.mapper = mapper;
      vtkRefs.current.actor = actor;

      // Label Overlay Viewport Setup
      if (labelImageData) {
        const labelMapper = vtkImageMapper.newInstance();
        labelMapper.setInputData(labelImageData);
        labelMapper.setSlicingMode(slicingMode);
        labelMapper.setSlice(initialSlice);

        const labelActor = vtkImageSlice.newInstance();
        labelActor.setMapper(labelMapper);

        // Lookup Table for Segmentations (0: Transparent, 1: Red, 2: Green, 3: Blue, 4: Yellow)
        const lut = vtkLookupTable.newInstance();
        lut.setNumberOfColors(5);
        lut.setRange(0, 4);

        const table = vtkDataArray.newInstance({
          numberOfComponents: 4,
          size: 20,
          dataType: 'Uint8Array',
        });
        table.setTuple(0, [0, 0, 0, 0]);      // Transparent
        table.setTuple(1, [255, 0, 0, 128]);  // Red
        table.setTuple(2, [0, 255, 0, 128]);  // Green
        table.setTuple(3, [0, 0, 255, 128]);  // Blue
        table.setTuple(4, [255, 255, 0, 128]); // Yellow
        lut.setTable(table);

        (labelActor.getProperty() as any).setLookupTable(lut);
        renderer.addActor(labelActor);

        vtkRefs.current.labelMapper = labelMapper;
        vtkRefs.current.labelActor = labelActor;
      }

      // Orthographic camera placement
      CameraManager.alignCameraToAxis(renderer, type, bounds);
    } else {
      // 3D Viewport Setup
      renderer.setBackground(0.04, 0.06, 0.1);

      const mapper = vtkVolumeMapper.newInstance();
      mapper.setInputData(imageData);

      // Auto step sizes based on voxel dimensions
      const spacing = imageData.getSpacing();
      const minSpacing = Math.min(spacing[0], spacing[1], spacing[2]);
      mapper.setSampleDistance(minSpacing * 0.45);
      mapper.setAutoAdjustSampleDistances(false);

      const actor = vtkVolume.newInstance();
      actor.setMapper(mapper);

      const colorFun = vtkColorTransferFunction.newInstance();
      const opacityFun = vtkPiecewiseFunction.newInstance();

      actor.getProperty().setRGBTransferFunction(0, colorFun);
      actor.getProperty().setScalarOpacity(0, opacityFun);
      actor.getProperty().setInterpolationTypeToLinear();

      renderer.addVolume(actor);

      // Expose 3D mesh objects
      const meshMapper = vtkMapper.newInstance();
      const meshActor = vtkActor.newInstance();
      meshActor.setMapper(meshMapper);
      meshActor.getProperty().setOpacity(meshOpacity);
      meshActor.setVisibility(show3DMesh);
      renderer.addActor(meshActor);

      vtkRefs.current.mapper = mapper;
      vtkRefs.current.actor = actor;
      vtkRefs.current.colorFun = colorFun;
      vtkRefs.current.opacityFun = opacityFun;
      vtkRefs.current.meshMapper = meshMapper;
      vtkRefs.current.meshActor = meshActor;

      // Initial transfer function & lighting application
      const meta = loadedVolume?.meta || { min_intensity: 0, max_intensity: 1000, modality: 'CT' };
      TransferFunctionManager.update3DTransferFunctions(
        colorFun,
        opacityFun,
        windowWidth,
        windowLevel,
        meta.min_intensity,
        meta.max_intensity,
        meta.modality,
        active3DPreset,
        volumeOpacity,
        intensityStats
      );
      
      VolumeManager.setBlendMode(mapper, renderMode);
      LightingManager.applyLighting(actor, lightingConfig);
      
      if (isClippingActive) {
        ClippingManager.setCroppingBounds(mapper, croppingBounds);
        ClippingManager.setClippingPlanes(mapper, clippingPlanes);
      }

      CameraManager.resetCamera(renderer);
    }

    // Set initial size
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    openGLRenderWindow.setSize(Math.floor(width) || 300, Math.floor(height) || 300);
    renderWindow.render();

    // Expose VTK instances to parent component
    if (onInitialized) {
      onInitialized({
        renderer,
        renderWindow,
        openGLRenderWindow,
        interactor,
        mapper: vtkRefs.current.mapper || undefined,
        actor: vtkRefs.current.actor || undefined,
        labelMapper: vtkRefs.current.labelMapper || undefined,
        labelActor: vtkRefs.current.labelActor || undefined,
        colorFun: vtkRefs.current.colorFun || undefined,
        opacityFun: vtkRefs.current.opacityFun || undefined,
        meshMapper: vtkRefs.current.meshMapper || undefined,
        meshActor: vtkRefs.current.meshActor || undefined,
      });
    }

    // ResizeObserver handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        openGLRenderWindow.setSize(Math.floor(w) || 300, Math.floor(h) || 300);
        renderWindow.render();
      }
    });
    resizeObserver.observe(container);

    // Context loss handler
    const canvasElement = container.querySelector('canvas');
    let removeContextLossListener = () => {};
    if (canvasElement) {
      removeContextLossListener = GPUManager.handleWebGLContextLoss(
        canvasElement,
        () => {
          console.warn('[WebGL] Viewport context lost.');
        },
        () => {
          // Force render window recreation trigger on restore
          renderWindow.render();
        }
      );
    }

    return () => {
      resizeObserver.disconnect();
      removeContextLossListener();
      interactor.delete();
      openGLRenderWindow.delete();
      
      // Delete local instances safely
      if (vtkRefs.current.mapper) vtkRefs.current.mapper.delete();
      if (vtkRefs.current.actor) vtkRefs.current.actor.delete();
      if (vtkRefs.current.labelMapper) vtkRefs.current.labelMapper.delete();
      if (vtkRefs.current.labelActor) vtkRefs.current.labelActor.delete();
      if (vtkRefs.current.colorFun) vtkRefs.current.colorFun.delete();
      if (vtkRefs.current.opacityFun) vtkRefs.current.opacityFun.delete();
      if (vtkRefs.current.meshMapper) vtkRefs.current.meshMapper.delete();
      if (vtkRefs.current.meshActor) vtkRefs.current.meshActor.delete();

      renderWindow.delete();
      renderer.delete();
    };
  }, [type, imageData, labelImageData]);

  // Reactive updates for 2D Slice indices
  useEffect(() => {
    const { mapper, renderWindow } = vtkRefs.current;
    if (!mapper || !renderWindow || type === 'volume') return;

    if (type === 'axial' && (mapper as vtkImageMapper).getSlice() !== sliceAxial) {
      (mapper as vtkImageMapper).setSlice(sliceAxial);
      if (vtkRefs.current.labelMapper) vtkRefs.current.labelMapper.setSlice(sliceAxial);
      renderWindow.render();
    }
  }, [sliceAxial, type]);

  useEffect(() => {
    const { mapper, renderWindow } = vtkRefs.current;
    if (!mapper || !renderWindow || type === 'volume') return;

    if (type === 'sagittal' && (mapper as vtkImageMapper).getSlice() !== sliceSagittal) {
      (mapper as vtkImageMapper).setSlice(sliceSagittal);
      if (vtkRefs.current.labelMapper) vtkRefs.current.labelMapper.setSlice(sliceSagittal);
      renderWindow.render();
    }
  }, [sliceSagittal, type]);

  useEffect(() => {
    const { mapper, renderWindow } = vtkRefs.current;
    if (!mapper || !renderWindow || type === 'volume') return;

    if (type === 'coronal' && (mapper as vtkImageMapper).getSlice() !== sliceCoronal) {
      (mapper as vtkImageMapper).setSlice(sliceCoronal);
      if (vtkRefs.current.labelMapper) vtkRefs.current.labelMapper.setSlice(sliceCoronal);
      renderWindow.render();
    }
  }, [sliceCoronal, type]);

  // Reactive updates for W/L contrast levels
  useEffect(() => {
    const { actor, colorFun, opacityFun, renderWindow } = vtkRefs.current;
    if (!actor || !renderWindow) return;

    if (type !== 'volume') {
      (actor as vtkImageSlice).getProperty().setColorWindow(windowWidth);
      (actor as vtkImageSlice).getProperty().setColorLevel(windowLevel);
      renderWindow.render();
    } else if (colorFun && opacityFun && loadedVolume) {
      const meta = loadedVolume.meta;
      TransferFunctionManager.update3DTransferFunctions(
        colorFun,
        opacityFun,
        windowWidth,
        windowLevel,
        meta.min_intensity,
        meta.max_intensity,
        meta.modality,
        active3DPreset,
        volumeOpacity,
        intensityStats
      );
      renderWindow.render();
    }
  }, [windowWidth, windowLevel, active3DPreset, volumeOpacity, intensityStats, type, loadedVolume]);

  // Reactive updates for 3D Volume rendering modes
  useEffect(() => {
    const { mapper, renderWindow } = vtkRefs.current;
    if (type === 'volume' && mapper && renderWindow) {
      VolumeManager.setBlendMode(mapper as vtkVolumeMapper, renderMode);
      renderWindow.render();
    }
  }, [renderMode, type]);

  // Reactive updates for lighting parameters
  useEffect(() => {
    const { actor, renderWindow } = vtkRefs.current;
    if (type === 'volume' && actor && renderWindow) {
      LightingManager.applyLighting(actor as vtkVolume, lightingConfig);
      renderWindow.render();
    }
  }, [lightingConfig, type]);

  // Reactive updates for clipping & cropping bounds
  useEffect(() => {
    const { mapper, renderWindow } = vtkRefs.current;
    if (type === 'volume' && mapper && renderWindow) {
      if (isClippingActive) {
        ClippingManager.setCroppingBounds(mapper as vtkVolumeMapper, croppingBounds);
        ClippingManager.setClippingPlanes(mapper as vtkVolumeMapper, clippingPlanes);
      } else {
        ClippingManager.removeAllClippingPlanes(mapper as vtkVolumeMapper);
        ClippingManager.setCroppingBounds(mapper as vtkVolumeMapper, null);
      }
      renderWindow.render();
    }
  }, [clippingPlanes, croppingBounds, isClippingActive, type]);

  // Reactive updates for surface mesh overlay
  useEffect(() => {
    const { meshActor, renderWindow } = vtkRefs.current;
    if (type === 'volume' && meshActor && renderWindow) {
      meshActor.setVisibility(show3DMesh);
      meshActor.getProperty().setOpacity(meshOpacity);
      renderWindow.render();
    }
  }, [show3DMesh, meshOpacity, type]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-black rounded"
      style={{ minHeight: '100%', minWidth: '100%' }}
    />
  );
};
export default VolumeViewer;
