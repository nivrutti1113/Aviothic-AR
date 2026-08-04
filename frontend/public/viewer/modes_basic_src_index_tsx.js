"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["modes_basic_src_index_tsx"], {
"../../../modes/basic/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../modes/basic/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic/src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NON_IMAGE_MODALITIES: () => (NON_IMAGE_MODALITIES),
  addActivatePanelTriggers: () => (/* reexport safe */ _modeCustomization__rspack_import_3.addActivatePanelTriggers),
  applyToolGroupAdditions: () => (/* reexport safe */ _modeCustomization__rspack_import_3.applyToolGroupAdditions),
  basicLayout: () => (basicLayout),
  basicRoute: () => (basicRoute),
  cornerstone: () => (cornerstone),
  customizations: () => (customizations),
  "default": () => (__rspack_default_export),
  defaultActivatePanelTriggers: () => (defaultActivatePanelTriggers),
  dicomPmap: () => (dicomPmap),
  dicomRT: () => (dicomRT),
  dicomSeg: () => (dicomSeg),
  dicomecg: () => (dicomecg),
  dicompdf: () => (dicompdf),
  dicomsr: () => (dicomsr),
  dicomvideo: () => (dicomvideo),
  extensionDependencies: () => (extensionDependencies),
  initToolGroups: () => (/* reexport safe */ _initToolGroups__rspack_import_2["default"]),
  isValidMode: () => (isValidMode),
  layoutTemplate: () => (layoutTemplate),
  mode: () => (mode),
  modeFactory: () => (modeFactory),
  modeInstance: () => (modeInstance),
  ohif: () => (ohif),
  onModeEnter: () => (onModeEnter),
  onModeExit: () => (onModeExit),
  registerModeToolbar: () => (/* reexport safe */ _modeCustomization__rspack_import_3.registerModeToolbar),
  segmentation: () => (segmentation),
  sopClassHandlers: () => (sopClassHandlers)
});
/* import */ var immutability_helper__rspack_import_0 = __webpack_require__("../../../node_modules/immutability-helper/index.js");
/* import */ var immutability_helper__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(immutability_helper__rspack_import_0);
/* import */ var _ohif_core__rspack_import_1 = __webpack_require__("../../core/src/index.ts");
/* import */ var _initToolGroups__rspack_import_2 = __webpack_require__("../../../modes/basic/src/initToolGroups.ts");
/* import */ var _modeCustomization__rspack_import_3 = __webpack_require__("../../../modes/basic/src/modeCustomization.ts");
/* import */ var _id__rspack_import_4 = __webpack_require__("../../../modes/basic/src/id.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");





const {
  structuredCloneWithFunctions
} = _ohif_core__rspack_import_1.utils;

/**
 * Define non-imaging modalities.
 * This can be used to exclude modes which have only these modalities,
 * or it can be used to not display thumbnails for some of these.
 * This list used to include SM, for whole slide imaging, but this is now supported
 * by cornerstone.  Others of these may get added.
 */
const NON_IMAGE_MODALITIES = ['SEG', 'RTSTRUCT', 'RTPLAN', 'PR', 'SR'];
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
  wsiSopClassHandler: '@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler'
};
const cornerstone = {
  measurements: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
  labelMapSegmentationPanel: '@ohif/extension-cornerstone.panelModule.panelSegmentationWithToolsLabelMap',
  contourSegmentationPanel: '@ohif/extension-cornerstone.panelModule.panelSegmentationWithToolsContour',
  segmentation: '@ohif/extension-cornerstone.panelModule.panelSegmentation',
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone'
};
const dicomsr = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr',
  sopClassHandler3D: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr-3d',
  viewport: '@ohif/extension-cornerstone-dicom-sr.viewportModule.dicom-sr'
};
const dicomvideo = {
  sopClassHandler: '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video'
};
const dicomecg = {
  sopClassHandler: '@ohif/extension-cornerstone.sopClassHandlerModule.DicomEcgSopClassHandler'
};
const dicompdf = {
  sopClassHandler: '@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf',
  viewport: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf'
};
const dicomSeg = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-seg.sopClassHandlerModule.dicom-seg',
  viewport: '@ohif/extension-cornerstone-dicom-seg.viewportModule.dicom-seg'
};
const dicomPmap = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-pmap.sopClassHandlerModule.dicom-pmap',
  viewport: '@ohif/extension-cornerstone-dicom-pmap.viewportModule.dicom-pmap'
};
const dicomRT = {
  viewport: '@ohif/extension-cornerstone-dicom-rt.viewportModule.dicom-rt',
  sopClassHandler: '@ohif/extension-cornerstone-dicom-rt.sopClassHandlerModule.dicom-rt'
};
const segmentation = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-seg.sopClassHandlerModule.dicom-seg',
  viewport: '@ohif/extension-cornerstone-dicom-seg.viewportModule.dicom-seg'
};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-pmap': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-rt': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1'
};
const sopClassHandlers = [dicomvideo.sopClassHandler, dicomecg.sopClassHandler, dicomSeg.sopClassHandler, dicomPmap.sopClassHandler, ohif.sopClassHandler, ohif.wsiSopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler3D, dicomsr.sopClassHandler, dicomRT.sopClassHandler];

/**
 * Data-driven mode validity check, using these mode instance properties:
 *   - `excludedStudies`: a list of `{ attribute: value }` objects; a study
 *     matching every attribute of any entry is invalid.
 *   - `excludedModalities`: the study is invalid when it contains ANY of these.
 *   - `modeModalities`: the study is valid when it contains at least one entry;
 *     an array entry requires all of its modalities to be present (e.g.
 *     `[['PT', 'CT']]` requires both PT and CT).
 *   - otherwise `nonModeModalities`: the study is valid when it contains at
 *     least one modality NOT in this list.
 */
function isValidMode({
  modalities,
  study
}) {
  const modalities_list = modalities.split('\\');
  if (study && this.excludedStudies?.length) {
    const excluded = this.excludedStudies.find(exclusion => Object.entries(exclusion).every(([key, value]) => study[key] === value));
    if (excluded) {
      return {
        valid: false,
        description: `The mode excludes studies matching: ${JSON.stringify(excluded)}`
      };
    }
  }
  if (this.excludedModalities?.length) {
    const excluded = this.excludedModalities.find(modality => modalities_list.includes(modality));
    if (excluded) {
      return {
        valid: false,
        description: `The mode does not support studies containing the ${excluded} modality`
      };
    }
  }
  if (this.modeModalities?.length) {
    for (const modeModality of this.modeModalities) {
      if (Array.isArray(modeModality)) {
        if (modeModality.every(m => modalities_list.includes(m))) {
          return {
            valid: true,
            description: `Matches ${modeModality.join(', ')}`
          };
        }
      } else if (modalities_list.includes(modeModality)) {
        return {
          valid: true,
          description: `Matches ${modeModality}`
        };
      }
    }
    return {
      valid: false,
      description: `None of the mode modalities match: ${JSON.stringify(this.modeModalities)}`
    };
  }
  const nonModeModalities = this.nonModeModalities ?? [];
  return {
    valid: !!modalities_list.find(modality => !nonModeModalities.includes(modality)),
    description: `The mode does not support studies that ONLY include the following modalities: ${nonModeModalities.join(', ')}`
  };
}

/**
 * The panel activation triggers the basic family of modes historically shipped
 * (commented out): activate the segmentation/measurement panel when a
 * segmentation/measurement is added.  Not enabled by default; a mode or
 * customization can set them via the `activatePanelTriggers` instance
 * property.
 */
const defaultActivatePanelTriggers = [{
  panelId: cornerstone.segmentation,
  sourceServiceName: 'segmentationService',
  sourceEvents: ['SEGMENTATION_ADDED']
}, {
  panelId: cornerstone.measurements,
  sourceServiceName: 'measurementService',
  sourceEvents: ['MEASUREMENT_ADDED', 'RAW_MEASUREMENT_ADDED']
}];
function onModeEnter({
  servicesManager,
  extensionManager,
  commandsManager
}) {
  const {
    measurementService,
    toolbarService,
    toolGroupService,
    customizationService
  } = servicesManager.services;
  measurementService.clearMeasurements();

  // Subscriptions the mode creates are tracked as unsubscribe functions on the
  // instance; the shared onModeExit cleans them up.  Extending modes push
  // their own unsubscribe functions here after calling this function.
  this._unsubscriptions = [];

  // Init the mode's tool groups.  The function is a mode instance property so
  // extending modes can substitute their own tool group setup.
  this.initToolGroups?.({
    extensionManager,
    toolGroupService,
    commandsManager,
    servicesManager
  });

  // Toolbar buttons and layout come from the mode's composition, which the
  // mode route seeded onto the Mode customization scope on enter (the plain
  // `toolbarButtons` / `toolbarSections` keys) and the app config / URL `mode`
  // phase then layered on top. Reading them here — after that layering — lets
  // `?customization=` modules extend the toolbar without the mode restating it.
  (0,_modeCustomization__rspack_import_3.registerModeToolbar)({
    toolbarService
  }, {
    toolbarButtons: customizationService.getCustomization('toolbarButtons'),
    toolbarSections: customizationService.getCustomization('toolbarSections')
  });

  // Extra tools (e.g. segmentation editing tools added by a customization) are
  // layered onto the tool groups created above, from the resolved
  // `toolGroupAdditions` composition (seeded on enter, refined by the `mode`
  // phase).
  (0,_modeCustomization__rspack_import_3.applyToolGroupAdditions)({
    toolGroupService
  }, customizationService.getCustomization('toolGroupAdditions'));

  // Note: the mode's `modeCustomizations` are NOT applied here — the mode
  // route applies them right after the mode scope is reset, before the app
  // config / URL `mode` phase blocks, so the final value of every key is
  // decided purely by customization scope precedence and application order.

  // ActivatePanel event triggers (e.g. activating the segmentation panel when
  // a segmentation is added).  Off by default; supplied as data so extending
  // modes and customizations can point at their own panels.
  this._unsubscriptions.push(...(0,_modeCustomization__rspack_import_3.addActivatePanelTriggers)({
    servicesManager
  }, this.activatePanelTriggers));
}
function onModeExit({
  servicesManager
}) {
  const {
    toolGroupService,
    syncGroupService,
    segmentationService,
    cornerstoneViewportService,
    uiDialogService,
    uiModalService
  } = servicesManager.services;
  this._unsubscriptions?.forEach(unsubscribe => unsubscribe());
  this._unsubscriptions = [];
  uiDialogService.hideAll();
  uiModalService.hide();
  toolGroupService.destroy();
  syncGroupService.destroy();
  segmentationService.destroy();
  cornerstoneViewportService.destroy();
}
const basicLayout = {
  id: ohif.layout,
  props: {
    // Literal panel lists. The mode route seeds these into the standard
    // `leftPanels` / `rightPanels` customizations at the bottom of
    // the mode scope, so `mode` phase blocks and global customizations can
    // modify them (e.g. swap in the segmentation panels with editing tools)
    // before the sidebars resolve.
    leftPanels: [ohif.thumbnailList],
    leftPanelResizable: true,
    rightPanels: [cornerstone.segmentation, cornerstone.measurements],
    rightPanelClosed: true,
    rightPanelResizable: true,
    viewports: [{
      namespace: cornerstone.viewport,
      displaySetsToDisplay: [ohif.sopClassHandler, dicomvideo.sopClassHandler, ohif.wsiSopClassHandler, dicomecg.sopClassHandler]
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
    }, {
      namespace: dicomRT.viewport,
      displaySetsToDisplay: [dicomRT.sopClassHandler]
    }]
  }
};
function layoutTemplate() {
  return structuredCloneWithFunctions(this.layoutInstance);
}
const basicRoute = {
  path: 'basic',
  layoutTemplate,
  layoutInstance: basicLayout
};
const modeInstance = {
  // TODO: We're using this as a route segment
  // We should not be.
  id: _id__rspack_import_4.id,
  routeName: 'basic',
  // Don't hide this by default - see the registration later to hide the basic
  // instance by default.
  hide: false,
  displayName: 'Non-Longitudinal Basic',
  // Toolbar/tool-group composition: which capability packs this mode uses,
  // named with `{ $reference }` markers the customization service expands at
  // read time. The mode route seeds these onto the Mode customization scope on
  // enter (as the plain `toolbarButtons` / `toolbarSections` /
  // `toolGroupAdditions` keys), so `?customization=` modules extend them
  // through the `mode` phase (e.g.
  // `mode.basic.toolbarButtons: { $push: [{ $reference: '...' }] }`).
  toolbarSections: [{
    $reference: 'cornerstone.toolbarSections'
  }],
  toolGroupAdditions: {
    default: [],
    mpr: [],
    SRToolGroup: [],
    volume3d: []
  },
  // Tool group setup used by onModeEnter; extending modes can replace it.
  initToolGroups: _initToolGroups__rspack_import_2["default"],
  // The mode's own customizations, referenced by name: the block is registered
  // at default scope when the mode loads (see `customizations` below), and the
  // mode route applies it as the bottom layer of the mode scope on enter.
  // Later layers — the app config / URL `mode` phase blocks and any global
  // customization (e.g. `segmentationEditing`) — override it purely by
  // application order and scope precedence.
  modeCustomizations: 'basicModeCustomizations',
  // ActivatePanel event triggers, applied on mode enter.  Empty by default so
  // the state the user left the UI in is respected; extending modes or
  // customizations can push `defaultActivatePanelTriggers` entries.
  activatePanelTriggers: [],
  /**
   * Lifecycle hooks
   */
  onModeEnter,
  onModeExit,
  validationTags: {
    study: [],
    series: []
  },
  isValidMode,
  routes: [basicRoute],
  extensions: extensionDependencies,
  // Default protocol gets self-registered by default in the init
  hangingProtocol: 'default',
  // Order is important in sop class handlers when two handlers both use
  // the same sop class under different situations.  In that case, the more
  // general handler needs to come last.  For this case, the dicomvideo must
  // come first to remove video transfer syntax before ohif uses images
  sopClassHandlers,
  toolbarButtons: [{
    $reference: 'cornerstone.toolbarButtons'
  }],
  nonModeModalities: NON_IMAGE_MODALITIES
};

/**
 * Creates a mode on this object, using immutability-helper to apply changes
 * from modeConfiguration into the modeInstance.
 */
function modeFactory({
  modeConfiguration
}) {
  let modeInstance = this.modeInstance;
  if (modeConfiguration) {
    modeInstance = immutability_helper__rspack_import_0_default()(modeInstance, modeConfiguration);
  }
  return modeInstance;
}

/**
 * Customizations the mode registers with the customization service (Default
 * scope) when it loads — before the bootstrap phase applies, so bootstrap and
 * `?customization=` modules can modify them before anything reads them.
 * Values are plain data (registered customization values never carry `$`
 * commands — commands are how later customizations modify them).
 */
const customizations = {
  // The mode's own mode-scope block, applied by the mode route as the bottom
  // layer of the mode scope on mode enter (see `modeCustomizations` above).
  basicModeCustomizations: {
    // Segmentation panel editing is off in the basic modes; e.g. the
    // `segmentationEditing` customization overrides this at global scope.
    'panelSegmentation.disableEditing': true
  }
};
const mode = {
  id: _id__rspack_import_4.id,
  modeFactory,
  modeInstance: {
    ...modeInstance,
    hide: true
  },
  extensionDependencies,
  customizations
};
/* export default */ const __rspack_default_export = (mode);


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic/src/initToolGroups.ts"(module, __webpack_exports__, __webpack_require__) {
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
        getTextCallback: (callback, eventDetails) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            eventDetails
          });
        },
        changeTextCallback: (data, eventDetails, callback) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            data,
            eventDetails
          });
        }
      }
    }, {
      toolName: toolNames.SegmentBidirectional
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
      toolName: toolNames.PlanarRotate
    }, {
      toolName: toolNames.CalibrationLine
    }, {
      toolName: toolNames.PlanarFreehandContourSegmentation,
      configuration: {
        displayOnePointAsCrosshairs: true
      }
    }, {
      toolName: toolNames.UltrasoundDirectional
    }, {
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: toolNames.SplineROI
    }, {
      toolName: toolNames.LivewireContour
    }, {
      toolName: toolNames.WindowLevelRegion
    }],
    enabled: [{
      toolName: toolNames.ImageOverlayViewer
    }, {
      toolName: toolNames.ReferenceLines
    }],
    disabled: [{
      toolName: toolNames.AdvancedMagnify
    }]
  };
  const updatedTools = commandsManager.run('initializeSegmentLabelTool', {
    tools
  });
  toolGroupService.createToolGroupAndAddTools(toolGroupId, updatedTools);
}
function initSRToolGroup(extensionManager, toolGroupService) {
  const SRUtilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone-dicom-sr.utilityModule.tools');
  if (!SRUtilityModule) {
    return;
  }
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
      toolName: SRToolNames.SRPlanarFreehandROI
    }, {
      toolName: SRToolNames.SRRectangleROI
    }, {
      toolName: toolNames.WindowLevelRegion
    }],
    enabled: [{
      toolName: SRToolNames.DICOMSRDisplay
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
        getTextCallback: (callback, eventDetails) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            eventDetails
          });
        },
        changeTextCallback: (data, eventDetails, callback) => {
          commandsManager.runCommand('arrowTextCallback', {
            callback,
            data,
            eventDetails
          });
        }
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
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: toolNames.SplineROI
    }, {
      toolName: toolNames.LivewireContour
    }, {
      toolName: toolNames.WindowLevelRegion
    }, {
      toolName: toolNames.PlanarFreehandContourSegmentation,
      configuration: {
        displayOnePointAsCrosshairs: true
      }
    }],
    disabled: [{
      toolName: toolNames.Crosshairs,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary,
        modifierKey: Enums.KeyboardBindings.Shift
      }],
      configuration: {
        viewportIndicators: true,
        viewportIndicatorsConfig: {
          circleRadius: 5,
          xOffset: 0.95,
          yOffset: 0.05
        },
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
      toolName: toolNames.AdvancedMagnify
    }, {
      toolName: toolNames.ReferenceLines
    }]
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

/**
 * Mode tool group setup.  All modes share this options-object signature so a
 * mode (or a `modeConfiguration`) can substitute any other mode's
 * implementation via the `initToolGroups` instance property.
 */
function initToolGroups({
  extensionManager,
  toolGroupService,
  commandsManager
}) {
  initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, 'default');
  initSRToolGroup(extensionManager, toolGroupService);
  initMPRToolGroup(extensionManager, toolGroupService, commandsManager);
  initVolume3DToolGroup(extensionManager, toolGroupService);
}
/* export default */ const __rspack_default_export = (initToolGroups);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic/src/modeCustomization.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addActivatePanelTriggers: () => (addActivatePanelTriggers),
  applyToolGroupAdditions: () => (applyToolGroupAdditions),
  registerModeToolbar: () => (registerModeToolbar)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * Helpers for applying a mode's toolbar / tool-group composition.
 *
 * The composition values (`toolbarButtons`, `toolbarSections`,
 * `toolGroupAdditions`) are ordinary customizations resolved through the
 * customization service. A mode lists the capability packs it uses with
 * `{ $reference: '<name>' }` markers; the service expands those at read time
 * (packs that are arrays are flattened into the surrounding list), and a site
 * `?customization=` module extends or replaces them with immutability-helper
 * commands (`$push` another `{ $reference }`, `$set` a hard-coded value, ...).
 * By the time these helpers run, the values passed in are already fully
 * resolved — so they only need to shape/register them.
 */

/** Normalizes a value to an array (wrapping a single object, dropping nullish). */
function toArray(value) {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

/**
 * Registers a mode's toolbar from its resolved composition.
 *
 * `toolbarButtons` is a flat list of button definitions registered with the
 * toolbar service.  `toolbarSections` is one or more
 * `{ sectionKey: buttonIds[] }` objects shallow-merged in order (later values
 * win per section) and applied with `updateSection`.
 */
function registerModeToolbar({
  toolbarService
}, {
  toolbarButtons,
  toolbarSections
}) {
  toolbarService.register(toArray(toolbarButtons));
  const sections = Object.assign({}, ...toArray(toolbarSections));
  for (const [key, section] of Object.entries(sections)) {
    toolbarService.updateSection(key, section);
  }
}

/**
 * Adds extra tools to the tool groups a mode has already created.
 *
 * `toolGroupAdditions` is a resolved object mapping a tool group id to a list
 * of tool blocks (each a `{ active/passive/enabled/disabled }` object). Tool
 * groups the mode did not create are skipped, so a single additions object can
 * be shared between modes with different tool group sets.
 */
function applyToolGroupAdditions({
  toolGroupService
}, toolGroupAdditions) {
  if (!toolGroupAdditions) {
    return;
  }
  for (const additions of toArray(toolGroupAdditions)) {
    for (const [toolGroupId, toolBlocks] of Object.entries(additions)) {
      if (!toolGroupService.getToolGroup(toolGroupId)) {
        continue;
      }
      for (const tools of toArray(toolBlocks)) {
        toolGroupService.addToolsToToolGroup(toolGroupId, tools);
      }
    }
  }
}

/**
 * Wires up a mode's ActivatePanel event triggers from data.
 *
 * `activatePanelTriggers` is a list of
 * `{ panelId, sourceServiceName, sourceEvents, forceActive? }` entries;
 * `sourceEvents` names are looked up in the source service's `EVENTS` map
 * (falling back to the raw value) so the whole entry is JSON-serializable and
 * can be supplied by a `?customization=` module or an extending mode.
 *
 * Returns the unsubscribe functions for the subscriptions created.
 */
function addActivatePanelTriggers({
  servicesManager
}, activatePanelTriggers) {
  const {
    panelService
  } = servicesManager.services;
  const unsubscriptions = [];
  for (const trigger of activatePanelTriggers ?? []) {
    const {
      panelId,
      sourceServiceName,
      sourceEvents,
      forceActive = true
    } = trigger;
    const sourcePubSubService = servicesManager.services[sourceServiceName];
    if (!sourcePubSubService) {
      console.warn(`addActivatePanelTriggers: no service registered for "${sourceServiceName}"`);
      continue;
    }
    const subscriptions = panelService.addActivatePanelTriggers(panelId, [{
      sourcePubSubService,
      sourceEvents: sourceEvents.map(name => sourcePubSubService.EVENTS?.[name] ?? name)
    }], forceActive);
    unsubscriptions.push(...subscriptions.map(subscription => () => subscription.unsubscribe()));
  }
  return unsubscriptions;
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/mode-basic","version":"3.14.0-beta.7","description":"A basic mode used to build other modes on top of","author":"OHIF Contributors","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-basic.js","module":"src/index.tsx","engines":{"node":">=24"},"files":["dist/**","public/**","README.md"],"scripts":{"dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:cornerstone":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/extension-cornerstone":"workspace:*","@ohif/extension-cornerstone-dicom-rt":"workspace:*","@ohif/extension-cornerstone-dicom-seg":"workspace:*","@ohif/extension-cornerstone-dicom-sr":"workspace:*","@ohif/extension-default":"workspace:*","@ohif/extension-dicom-pdf":"workspace:*","@ohif/extension-dicom-video":"workspace:*"},"dependencies":{"@babel/runtime":"7.29.7"},"devDependencies":{"cross-env":"7.0.3","webpack-merge":"5.10.0"},"keywords":["ohif-mode"]}')

},

}]);
//# sourceMappingURL=modes_basic_src_index_tsx.js.map