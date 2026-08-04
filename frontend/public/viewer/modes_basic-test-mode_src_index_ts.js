"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["modes_basic-test-mode_src_index_ts"], {
"../../../modes/basic-test-mode/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../modes/basic-test-mode/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic-test-mode/src/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  basicTestLayout: () => (basicTestLayout),
  basicTestRoute: () => (basicTestRoute),
  "default": () => (__rspack_default_export),
  initToolGroups: () => (/* reexport safe */ _initToolGroups__rspack_import_5["default"]),
  modeInstance: () => (modeInstance)
});
/* import */ var i18next__rspack_import_0 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* import */ var _ohif_core__rspack_import_1 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_mode_basic__rspack_import_2 = __webpack_require__("../../../modes/basic/src/index.tsx");
/* import */ var _toolbarButtons__rspack_import_3 = __webpack_require__("../../../modes/basic-test-mode/src/toolbarButtons.ts");
/* import */ var _id__rspack_import_4 = __webpack_require__("../../../modes/basic-test-mode/src/id.js");
/* import */ var _initToolGroups__rspack_import_5 = __webpack_require__("../../../modes/basic-test-mode/src/initToolGroups.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");






const {
  TOOLBAR_SECTIONS
} = _ohif_core__rspack_import_1.ToolbarService;

// Allow this mode by excluding non-imaging modalities such as SR, SEG
// Also, SM is not a simple imaging modalities, so exclude it.
const NON_IMAGE_MODALITIES = ['ECG', 'SR', 'SEG', 'RTSTRUCT'];
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  wsiSopClassHandler: '@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList'
};
const testExtension = {
  measurements: '@ohif/extension-test.panelModule.panelMeasurementSeries'
};
const tracked = {
  measurements: '@ohif/extension-measurement-tracking.panelModule.trackedMeasurements',
  thumbnailList: '@ohif/extension-measurement-tracking.panelModule.seriesList',
  viewport: '@ohif/extension-measurement-tracking.viewportModule.cornerstone-tracked'
};
const dicomsr = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr',
  sopClassHandler3D: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr-3d',
  viewport: '@ohif/extension-cornerstone-dicom-sr.viewportModule.dicom-sr'
};
const dicomvideo = {
  sopClassHandler: '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video'
};
const dicompdf = {
  sopClassHandler: '@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf',
  viewport: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf'
};
const dicomSeg = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-seg.sopClassHandlerModule.dicom-seg',
  viewport: '@ohif/extension-cornerstone-dicom-seg.viewportModule.dicom-seg'
};
const cornerstone = {
  panel: '@ohif/extension-cornerstone.panelModule.panelSegmentation',
  measurements: '@ohif/extension-cornerstone.panelModule.panelMeasurement'
};
const dicomPmap = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-pmap.sopClassHandlerModule.dicom-pmap',
  viewport: '@ohif/extension-cornerstone-dicom-pmap.viewportModule.dicom-pmap'
};
const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-measurement-tracking': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-pmap': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1',
  '@ohif/extension-test': '^0.0.1'
};

/**
 * The test mode's toolbar layout, supplied as literal values rather than
 * `{ $reference }` capability-pack markers (the composition is resolved the
 * same way either — literals pass through untouched).
 */
const toolbarSections = {
  [TOOLBAR_SECTIONS.primary]: ['MeasurementTools', 'Zoom', 'WindowLevelGroup', 'Pan', 'Capture', 'Layout', 'MPR', 'Crosshairs', 'MoreTools'],
  WindowLevelGroup: ['WindowLevel', 'Soft tissue', 'Lung', 'Liver', 'Bone', 'Brain'],
  [TOOLBAR_SECTIONS.viewportActionMenu.topLeft]: ['orientationMenu', 'dataOverlayMenu'],
  [TOOLBAR_SECTIONS.viewportActionMenu.bottomMiddle]: ['AdvancedRenderingControls'],
  AdvancedRenderingControls: ['voiManualControlMenu', 'Colorbar', 'opacityMenu', 'thresholdMenu'],
  [TOOLBAR_SECTIONS.viewportActionMenu.topRight]: ['modalityLoadBadge', 'trackingStatus', 'navigationComponent'],
  [TOOLBAR_SECTIONS.viewportActionMenu.bottomLeft]: ['windowLevelMenu'],
  MeasurementTools: ['Length', 'Bidirectional', 'ArrowAnnotate', 'EllipticalROI', 'CircleROI', 'PlanarFreehandROI', 'SplineROI', 'LivewireContour'],
  MoreTools: ['Reset', 'rotate-right', 'flipHorizontal', 'ImageSliceSync', 'ReferenceLines', 'ImageOverlayViewer', 'StackScroll', 'invert', 'Probe', 'Cine', 'Angle', 'CobbAngle', 'Magnify', 'RectangleROI', 'CalibrationLine', 'TagBrowser', 'AdvancedMagnify', 'UltrasoundDirectionalTool', 'WindowLevelRegion']
};
const basicTestLayout = {
  id: ohif.layout,
  props: {
    // Literal panel lists; the shared layout template also accepts
    // customization names here.
    leftPanels: [tracked.thumbnailList],
    leftPanelResizable: true,
    rightPanels: [cornerstone.panel, tracked.measurements, testExtension.measurements],
    rightPanelResizable: true,
    viewports: [{
      namespace: tracked.viewport,
      displaySetsToDisplay: [ohif.sopClassHandler, dicomvideo.sopClassHandler, ohif.wsiSopClassHandler]
    }, {
      namespace: dicomsr.viewport,
      displaySetsToDisplay: [dicomsr.sopClassHandler, dicomsr.sopClassHandler3D]
    }, {
      namespace: dicompdf.viewport,
      displaySetsToDisplay: [dicompdf.sopClassHandler]
    }, {
      namespace: dicomSeg.viewport,
      displaySetsToDisplay: [dicomSeg.sopClassHandler]
    }, {
      namespace: dicomPmap.viewport,
      displaySetsToDisplay: [dicomPmap.sopClassHandler]
    }]
  }
};
const basicTestRoute = {
  path: 'basic-test',
  layoutTemplate: _ohif_mode_basic__rspack_import_2.layoutTemplate,
  layoutInstance: basicTestLayout
};

/**
 * Extends the basic mode instance: the shared onModeEnter/onModeExit are
 * inherited, and the test specifics (toolbar layout, tool groups, test
 * customizations) are supplied as instance data.
 */
const modeInstance = {
  ..._ohif_mode_basic__rspack_import_2.modeInstance,
  id: _id__rspack_import_4.id,
  routeName: 'basic-test',
  displayName: i18next__rspack_import_0["default"].t('Modes:Basic Test Mode'),
  // Literal toolbar values instead of the basic mode's customization names.
  toolbarButtons: _toolbarButtons__rspack_import_3["default"],
  toolbarSections,
  // Tool group setup used by the shared onModeEnter.
  initToolGroups: _initToolGroups__rspack_import_5["default"],
  // The mode's own customizations, applied by the mode route as the bottom
  // layer of the mode scope: the test extension's custom context menu, plus
  // the undo hotkey used by the E2E tests.  Given as a literal here; modes may
  // also reference a registered block by name (see `basicModeCustomizations`).
  modeCustomizations: ['@ohif/extension-test.customizationModule.custom-context-menu', {
    'ohif.hotkeyBindings': {
      $push: [{
        commandName: 'undo',
        label: 'Undo',
        keys: ['ctrl+z'],
        isEditable: true
      }]
    }
  }],
  isValidMode: _ohif_mode_basic__rspack_import_2.isValidMode,
  nonModeModalities: NON_IMAGE_MODALITIES,
  routes: [basicTestRoute],
  extensions: extensionDependencies,
  hangingProtocol: 'default',
  sopClassHandlers: [dicomvideo.sopClassHandler, dicomSeg.sopClassHandler, ohif.wsiSopClassHandler, ohif.sopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler, dicomsr.sopClassHandler3D],
  hotkeys: {
    name: 'basic-test-hotkeys'
  }
};
const mode = {
  id: _id__rspack_import_4.id,
  modeFactory: _ohif_mode_basic__rspack_import_2.modeFactory,
  modeInstance,
  extensionDependencies
};
/* export default */ const __rspack_default_export = (mode);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic-test-mode/src/initToolGroups.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
const colours = {
  'viewport-0': 'rgb(200, 0, 0)',
  'viewport-1': 'rgb(200, 200, 0)',
  'viewport-2': 'rgb(0, 200, 0)'
};
const colorsByOrientation = {
  axial: 'rgb(200, 0, 0)',
  sagittal: 'rgb(200, 200, 0)',
  coronal: 'rgb(0, 200, 0)'
};
function initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, toolGroupId) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }, {
        numTouchPoints: 2
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }, {
        numTouchPoints: 3
      }]
    }],
    passive: [{
      toolName: toolNames.Length
    }, {
      toolName: toolNames.ArrowAnnotate,
      configuration: {
        getTextCallback: (callback, eventDetails) => commandsManager.runCommand('arrowTextCallback', {
          callback,
          eventDetails
        }),
        changeTextCallback: (data, eventDetails, callback) => commandsManager.runCommand('arrowTextCallback', {
          callback,
          data,
          eventDetails
        })
      }
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.DragProbe
    }, {
      toolName: toolNames.Probe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.CircleROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.CobbAngle
    }, {
      toolName: toolNames.Magnify
    }, {
      toolName: toolNames.WindowLevelRegion
    }, {
      toolName: toolNames.UltrasoundDirectional
    }, {
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: toolNames.SplineROI
    }, {
      toolName: toolNames.LivewireContour
    }],
    // enabled
    enabled: [{
      toolName: toolNames.ImageOverlayViewer
    }],
    // disabled
    disabled: [{
      toolName: toolNames.ReferenceLines
    }, {
      toolName: toolNames.AdvancedMagnify
    }]
  };
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
function initSRToolGroup(extensionManager, toolGroupService, commandsManager) {
  const SRUtilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone-dicom-sr.utilityModule.tools');
  const CS3DUtilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames: SRToolNames
  } = SRUtilityModule.exports;
  const {
    toolNames,
    Enums
  } = CS3DUtilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }, {
        numTouchPoints: 2
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }, {
        numTouchPoints: 3
      }]
    }],
    passive: [{
      toolName: SRToolNames.SRLength
    }, {
      toolName: SRToolNames.SRArrowAnnotate
    }, {
      toolName: SRToolNames.SRBidirectional
    }, {
      toolName: SRToolNames.SREllipticalROI
    }, {
      toolName: SRToolNames.SRCircleROI
    }, {
      toolName: toolNames.WindowLevelRegion
    }],
    enabled: [{
      toolName: SRToolNames.DICOMSRDisplay,
      bindings: []
    }]
    // disabled
  };
  const toolGroupId = 'SRToolGroup';
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
function initMPRToolGroup(extensionManager, toolGroupService, commandsManager) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const serviceManager = extensionManager._servicesManager;
  const {
    cornerstoneViewportService
  } = serviceManager.services;
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }, {
        numTouchPoints: 2
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }, {
        numTouchPoints: 3
      }]
    }],
    passive: [{
      toolName: toolNames.Length
    }, {
      toolName: toolNames.ArrowAnnotate,
      configuration: {
        getTextCallback: (callback, eventDetails) => commandsManager.runCommand('arrowTextCallback', {
          callback,
          eventDetails
        }),
        changeTextCallback: (data, eventDetails, callback) => commandsManager.runCommand('arrowTextCallback', {
          callback,
          data,
          eventDetails
        })
      }
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.DragProbe
    }, {
      toolName: toolNames.Probe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.CircleROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.WindowLevelRegion
    }, {
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: toolNames.SplineROI
    }, {
      toolName: toolNames.LivewireContour
    }],
    disabled: [{
      toolName: toolNames.Crosshairs,
      configuration: {
        viewportIndicators: false,
        autoPan: {
          enabled: false,
          panSize: 10
        },
        getReferenceLineColor: viewportId => {
          const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
          const viewportOptions = viewportInfo?.viewportOptions;
          if (viewportOptions) {
            return colours[viewportOptions.id] || colorsByOrientation[viewportOptions.orientation] || '#0c0';
          } else {
            console.warn('missing viewport?', viewportId);
            return '#0c0';
          }
        }
      }
    }, {
      toolName: toolNames.ReferenceLines
    }]

    // enabled
    // disabled
  };
  toolGroupService.createToolGroupAndAddTools('mpr', tools);
}
function initVolume3DToolGroup(extensionManager, toolGroupService) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.TrackballRotateTool,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }, {
        numTouchPoints: 2
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }, {
        numTouchPoints: 3
      }]
    }]
  };
  toolGroupService.createToolGroupAndAddTools('volume3d', tools);
}
function initToolGroups({
  extensionManager,
  toolGroupService,
  commandsManager
}) {
  initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, 'default');
  initSRToolGroup(extensionManager, toolGroupService, commandsManager);
  initMPRToolGroup(extensionManager, toolGroupService, commandsManager);
  initVolume3DToolGroup(extensionManager, toolGroupService);
}
/* export default */ const __rspack_default_export = (initToolGroups);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic-test-mode/src/toolbarButtons.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  setToolActiveToolbar: () => (setToolActiveToolbar)
});
/* import */ var _cornerstonejs_core__rspack_import_0 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _ohif_core__rspack_import_1 = __webpack_require__("../../core/src/index.ts");
/* import */ var i18next__rspack_import_2 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
// TODO: torn, can either bake this here; or have to create a whole new button type
// Only ways that you can pass in a custom React component for render :l




const {
  windowLevelPresets
} = _ohif_core__rspack_import_1.defaults;

/**
 *
 * @param {*} preset - preset number (from above import)
 * @param {*} title
 * @param {*} subtitle
 */
function _createWwwcPreset(preset, title, subtitle) {
  return {
    id: title,
    uiType: 'ohif.toolButton',
    props: {
      title,
      subtitle,
      commands: [{
        commandName: 'setWindowLevel',
        commandOptions: {
          ...windowLevelPresets[preset]
        },
        context: 'CORNERSTONE'
      }]
    }
  };
}
const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: ['default', 'mpr', 'SRToolGroup']
  }
};
const toolbarButtons = [{
  id: 'MeasurementTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
}, {
  id: 'MoreTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
}, {
  id: 'WindowLevelGroup',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
},
// tool defs
{
  id: 'advancedRenderingControls',
  uiType: 'ohif.advancedRenderingControls',
  props: {
    evaluate: {
      name: 'evaluate.advancedRenderingControls',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'modalityLoadBadge',
  uiType: 'ohif.modalityLoadBadge',
  props: {
    icon: 'Status',
    label: i18next__rspack_import_2["default"].t('Buttons:Status'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Status'),
    evaluate: {
      name: 'evaluate.modalityLoadBadge',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'navigationComponent',
  uiType: 'ohif.navigationComponent',
  props: {
    icon: 'Navigation',
    label: i18next__rspack_import_2["default"].t('Buttons:Navigation'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Navigate between segments/measurements and manage their visibility'),
    evaluate: {
      name: 'evaluate.navigationComponent',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'trackingStatus',
  uiType: 'ohif.trackingStatus',
  props: {
    icon: 'TrackingStatus',
    label: i18next__rspack_import_2["default"].t('Buttons:Tracking Status'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:View and manage tracking status of measurements and annotations'),
    evaluate: {
      name: 'evaluate.trackingStatus',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'dataOverlayMenu',
  uiType: 'ohif.dataOverlayMenu',
  props: {
    icon: 'ViewportViews',
    label: i18next__rspack_import_2["default"].t('Buttons:Data Overlay'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Configure data overlay options and manage foreground/background display sets'),
    evaluate: 'evaluate.dataOverlayMenu'
  }
}, {
  id: 'orientationMenu',
  uiType: 'ohif.orientationMenu',
  props: {
    icon: 'OrientationSwitch',
    label: i18next__rspack_import_2["default"].t('Buttons:Orientation'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Change viewport orientation between axial, sagittal, coronal and reformat planes'),
    evaluate: {
      name: 'evaluate.orientationMenu'
    }
  }
}, {
  id: 'windowLevelMenu',
  uiType: 'ohif.windowLevelMenu',
  props: {
    icon: 'WindowLevel',
    label: i18next__rspack_import_2["default"].t('Buttons:Window Level'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Adjust window/level presets and customize image contrast settings'),
    evaluate: 'evaluate.windowLevelMenu'
  }
}, {
  id: 'voiManualControlMenu',
  uiType: 'ohif.voiManualControlMenu',
  props: {
    icon: 'WindowLevelAdvanced',
    label: i18next__rspack_import_2["default"].t('Buttons:Advanced Window Level'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Advanced window/level settings with manual controls and presets'),
    evaluate: 'evaluate.voiManualControlMenu'
  }
}, {
  id: 'thresholdMenu',
  uiType: 'ohif.thresholdMenu',
  props: {
    icon: 'Threshold',
    label: i18next__rspack_import_2["default"].t('Buttons:Threshold'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Image threshold settings'),
    evaluate: {
      name: 'evaluate.thresholdMenu',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'opacityMenu',
  uiType: 'ohif.opacityMenu',
  props: {
    icon: 'Opacity',
    label: i18next__rspack_import_2["default"].t('Buttons:Opacity'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Image opacity settings'),
    evaluate: {
      name: 'evaluate.opacityMenu',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'Colorbar',
  uiType: 'ohif.colorbar',
  props: {
    type: 'tool',
    label: i18next__rspack_import_2["default"].t('Buttons:Colorbar')
  }
}, _createWwwcPreset(1, 'Soft tissue', '400 / 40'), _createWwwcPreset(2, 'Lung', '1500 / -600'), _createWwwcPreset(3, 'Liver', '150 / 90'), _createWwwcPreset(4, 'Bone', '2500 / 480'), _createWwwcPreset(5, 'Brain', '80 / 40'), {
  id: 'WindowLevel',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-window-level',
    label: i18next__rspack_import_2["default"].t('Buttons:Window Level'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Window Level'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Length',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-length',
    label: i18next__rspack_import_2["default"].t('Buttons:Length'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Length Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Bidirectional',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-bidirectional',
    label: i18next__rspack_import_2["default"].t('Buttons:Bidirectional'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Bidirectional Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'ArrowAnnotate',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-annotate',
    label: i18next__rspack_import_2["default"].t('Buttons:Annotation'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Arrow Annotate'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'EllipticalROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-ellipse',
    label: i18next__rspack_import_2["default"].t('Buttons:Ellipse'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Ellipse ROI'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'CircleROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-circle',
    label: i18next__rspack_import_2["default"].t('Buttons:Circle'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Circle Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'PlanarFreehandROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-freehand-roi',
    label: i18next__rspack_import_2["default"].t('Buttons:Freehand ROI'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Freehand ROI'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'SplineROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-spline-roi',
    label: i18next__rspack_import_2["default"].t('Buttons:Spline ROI'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Spline ROI'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'LivewireContour',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-livewire',
    label: i18next__rspack_import_2["default"].t('Buttons:Livewire tool'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Livewire tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-zoom',
    label: i18next__rspack_import_2["default"].t('Buttons:Zoom'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Zoom'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Pan',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-move',
    label: i18next__rspack_import_2["default"].t('Buttons:Pan'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Pan'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'MPR',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-mpr',
    label: i18next__rspack_import_2["default"].t('Buttons:MPR'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:MPR'),
    commands: {
      commandName: 'toggleHangingProtocol',
      commandOptions: {
        protocolId: 'mpr'
      }
    },
    evaluate: 'evaluate.displaySetIsReconstructable'
  }
}, {
  id: 'TrackBallRotate',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-3d-rotate',
    label: i18next__rspack_import_2["default"].t('Buttons:3D Rotate'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:3D Rotate'),
    commands: setToolActiveToolbar
  }
}, {
  id: 'Capture',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-capture',
    label: i18next__rspack_import_2["default"].t('Buttons:Capture'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Capture'),
    commands: 'showDownloadViewportModal',
    evaluate: ['evaluate.action', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video', 'wholeSlide']
    }]
  }
}, {
  id: 'Layout',
  uiType: 'ohif.layoutSelector',
  props: {
    rows: 3,
    columns: 4,
    evaluate: 'evaluate.action',
    commands: 'setViewportGridLayout'
  }
}, {
  id: 'Crosshairs',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-crosshair',
    label: i18next__rspack_import_2["default"].t('Buttons:Crosshairs'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Crosshairs'),
    commands: {
      commandName: 'setToolActiveToolbar',
      commandOptions: {
        toolGroupIds: ['mpr']
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Reset',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-reset',
    label: i18next__rspack_import_2["default"].t('Buttons:Reset View'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Reset View'),
    commands: 'resetViewport',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'rotate-right',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rotate-right',
    label: i18next__rspack_import_2["default"].t('Buttons:Rotate Right'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Rotate +90'),
    commands: 'rotateViewportCW',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'flipHorizontal',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-flip-horizontal',
    label: i18next__rspack_import_2["default"].t('Buttons:Flip Horizontal'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Flip Horizontally'),
    commands: 'flipViewportHorizontal',
    evaluate: 'evaluate.viewportProperties.toggle'
  }
}, {
  id: 'ImageSliceSync',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'link',
    label: i18next__rspack_import_2["default"].t('Buttons:Image Slice Sync'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Enable position synchronization on stack viewports'),
    commands: {
      commandName: 'toggleSynchronizer',
      commandOptions: {
        type: 'imageSlice'
      }
    },
    listeners: {
      [_cornerstonejs_core__rspack_import_0.EVENTS.VIEWPORT_NEW_IMAGE_SET]: {
        commandName: 'toggleImageSliceSync',
        commandOptions: {
          toggledState: true
        }
      }
    },
    evaluate: 'evaluate.cornerstone.synchronizer'
  }
}, {
  id: 'ReferenceLines',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-referenceLines',
    label: i18next__rspack_import_2["default"].t('Buttons:Reference Lines'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Show Reference Lines'),
    commands: 'toggleEnabledDisabledToolbar',
    evaluate: 'evaluate.cornerstoneTool.toggle'
  }
}, {
  id: 'ImageOverlayViewer',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'toggle-dicom-overlay',
    label: i18next__rspack_import_2["default"].t('Buttons:Image Overlay'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Toggle Image Overlay'),
    commands: 'toggleEnabledDisabledToolbar',
    evaluate: 'evaluate.cornerstoneTool.toggle'
  }
}, {
  id: 'StackScroll',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-stack-scroll',
    label: i18next__rspack_import_2["default"].t('Buttons:Stack Scroll'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Stack Scroll'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'invert',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-invert',
    label: i18next__rspack_import_2["default"].t('Buttons:Invert'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Invert Colors'),
    commands: 'invertViewport',
    evaluate: 'evaluate.viewportProperties.toggle'
  }
}, {
  id: 'Probe',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-probe',
    label: i18next__rspack_import_2["default"].t('Buttons:Probe'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Probe'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Cine',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-cine',
    label: i18next__rspack_import_2["default"].t('Buttons:Cine'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Cine'),
    commands: 'toggleCine',
    evaluate: 'evaluate.cine'
  }
}, {
  id: 'Angle',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-angle',
    label: i18next__rspack_import_2["default"].t('Buttons:Angle'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Angle'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'CobbAngle',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-cobb-angle',
    label: i18next__rspack_import_2["default"].t('Buttons:Cobb Angle'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Cobb Angle'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Magnify',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-magnify',
    label: i18next__rspack_import_2["default"].t('Buttons:Zoom-in'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Zoom-in'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'RectangleROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rectangle',
    label: i18next__rspack_import_2["default"].t('Buttons:Rectangle'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Rectangle'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'CalibrationLine',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-calibration',
    label: i18next__rspack_import_2["default"].t('Buttons:Calibration'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Calibration Line'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'TagBrowser',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'dicom-tag-browser',
    label: i18next__rspack_import_2["default"].t('Buttons:Dicom Tag Browser'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Dicom Tag Browser'),
    commands: 'openDICOMTagViewer'
  }
}, {
  id: 'AdvancedMagnify',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-loupe',
    label: i18next__rspack_import_2["default"].t('Buttons:Magnify Probe'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Magnify Probe'),
    commands: 'toggleActiveDisabledToolbar',
    evaluate: 'evaluate.cornerstoneTool.toggle.ifStrictlyDisabled'
  }
}, {
  id: 'UltrasoundDirectionalTool',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-ultrasound-bidirectional',
    label: i18next__rspack_import_2["default"].t('Buttons:Ultrasound Directional'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Ultrasound Directional'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.modality.supported',
      supportedModalities: ['US']
    }]
  }
}, {
  id: 'WindowLevelRegion',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-window-region',
    label: i18next__rspack_import_2["default"].t('Buttons:Window Level Region'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Window Level Region'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}];
/* export default */ const __rspack_default_export = (toolbarButtons);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic-test-mode/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/mode-test","version":"3.14.0-beta.7","description":"Basic mode for testing","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-test.umd.js","module":"src/index.ts","engines":{"node":">=24"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:cornerstone":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/extension-cornerstone":"workspace:*","@ohif/extension-cornerstone-dicom-sr":"workspace:*","@ohif/extension-default":"workspace:*","@ohif/extension-dicom-pdf":"workspace:*","@ohif/extension-dicom-video":"workspace:*","@ohif/extension-measurement-tracking":"workspace:*","@ohif/extension-test":"workspace:*"},"dependencies":{"@babel/runtime":"7.29.7","@ohif/mode-basic":"workspace:*","i18next":"17.3.1"},"devDependencies":{"cross-env":"7.0.3","webpack-merge":"5.10.0"},"keywords":["ohif-mode"]}')

},

}]);
//# sourceMappingURL=modes_basic-test-mode_src_index_ts.js.map