"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["modes_segmentation_src_index_tsx"], {
"../../../modes/segmentation/src/constants.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  MAX_SEGMENTATION_DRAWING_RADIUS: () => (MAX_SEGMENTATION_DRAWING_RADIUS),
  MIN_SEGMENTATION_DRAWING_RADIUS: () => (MIN_SEGMENTATION_DRAWING_RADIUS)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
const MIN_SEGMENTATION_DRAWING_RADIUS = 0.5;
const MAX_SEGMENTATION_DRAWING_RADIUS = 99.5;
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/segmentation/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../modes/segmentation/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/segmentation/src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  customizations: () => (customizations),
  "default": () => (__rspack_default_export),
  initToolGroups: () => (/* reexport safe */ _initToolGroups__rspack_import_1["default"]),
  modeInstance: () => (modeInstance),
  onModeEnter: () => (onModeEnter),
  segmentationLayout: () => (segmentationLayout),
  segmentationRoute: () => (segmentationRoute)
});
/* import */ var _id__rspack_import_0 = __webpack_require__("../../../modes/segmentation/src/id.js");
/* import */ var _initToolGroups__rspack_import_1 = __webpack_require__("../../../modes/segmentation/src/initToolGroups.ts");
/* import */ var _utils_setUpAutoTabSwitchHandler__rspack_import_2 = __webpack_require__("../../../modes/segmentation/src/utils/setUpAutoTabSwitchHandler.ts");
/* import */ var _ohif_mode_basic__rspack_import_3 = __webpack_require__("../../../modes/basic/src/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };





/**
 * Extends the basic mode enter with the segmentation panel auto tab switch
 * handling (switching between labelmap/contour panels as segmentations of the
 * relevant type become active).
 */
function onModeEnter(ctx) {
  _ohif_mode_basic__rspack_import_3.onModeEnter.call(this, ctx);
  const {
    segmentationService,
    viewportGridService,
    panelService
  } = ctx.servicesManager.services;
  const {
    unsubscribeAutoTabSwitchEvents
  } = (0,_utils_setUpAutoTabSwitchHandler__rspack_import_2["default"])({
    segmentationService,
    viewportGridService,
    panelService
  });
  this._unsubscriptions.push(...unsubscribeAutoTabSwitchEvents);
}
const segmentationLayout = {
  id: _ohif_mode_basic__rspack_import_3.ohif.layout,
  props: {
    // Literal panel lists; the mode route seeds them into the standard
    // `leftPanels` / `rightPanels` customizations so `mode` phase
    // blocks and global customizations can modify them.
    leftPanels: [_ohif_mode_basic__rspack_import_3.ohif.thumbnailList],
    leftPanelResizable: true,
    rightPanels: [_ohif_mode_basic__rspack_import_3.cornerstone.labelMapSegmentationPanel, _ohif_mode_basic__rspack_import_3.cornerstone.contourSegmentationPanel],
    rightPanelResizable: true,
    viewports: [{
      namespace: _ohif_mode_basic__rspack_import_3.cornerstone.viewport,
      displaySetsToDisplay: [_ohif_mode_basic__rspack_import_3.ohif.sopClassHandler]
    }, {
      namespace: _ohif_mode_basic__rspack_import_3.segmentation.viewport,
      displaySetsToDisplay: [_ohif_mode_basic__rspack_import_3.segmentation.sopClassHandler]
    }, {
      namespace: _ohif_mode_basic__rspack_import_3.dicomRT.viewport,
      displaySetsToDisplay: [_ohif_mode_basic__rspack_import_3.dicomRT.sopClassHandler]
    }]
  }
};
const segmentationRoute = {
  path: 'template',
  layoutTemplate: _ohif_mode_basic__rspack_import_3.layoutTemplate,
  layoutInstance: segmentationLayout
};
const modeInstance = {
  id: _id__rspack_import_0.id,
  routeName: 'segmentation',
  displayName: 'Segmentation',
  // Toolbar/tool-group composition: which capability packs this mode uses.
  // The mode route seeds these onto the Mode customization scope on enter, so
  // `?customization=` modules extend them through the `mode` phase (e.g. add
  // the annotation tools/buttons). Pack names are resolved when the toolbar is
  // registered.
  toolbarButtons: [{
    $reference: 'cornerstone.toolbarButtons'
  }, {
    $reference: 'cornerstone.segmentationToolbarButtons'
  }],
  toolbarSections: [{
    $reference: 'cornerstone.segmentationModeToolbarSections'
  }, {
    $reference: 'cornerstone.segmentationToolbarSections'
  }],
  toolGroupAdditions: {
    default: [],
    mpr: [],
    volume3d: []
  },
  // Tool group setup used by onModeEnter; extending modes can replace it.
  initToolGroups: _initToolGroups__rspack_import_1["default"],
  // The mode's own customizations, applied by the mode route as the bottom
  // layer of the mode scope.  Unlike basic, the registered block is empty (no
  // `panelSegmentation.disableEditing`): the segmentation panel is editable.
  modeCustomizations: 'segmentationModeCustomizations',
  activatePanelTriggers: [],
  /**
   * Lifecycle hooks
   */
  onModeEnter,
  onModeExit: _ohif_mode_basic__rspack_import_3.onModeExit,
  validationTags: {
    study: [],
    series: []
  },
  // Data-driven validity: valid unless the study ONLY contains modalities that
  // segmentation cannot be performed on.
  isValidMode: _ohif_mode_basic__rspack_import_3.isValidMode,
  nonModeModalities: ['SM', 'ECG', 'OT', 'DOC'],
  routes: [segmentationRoute],
  extensions: _ohif_mode_basic__rspack_import_3.extensionDependencies,
  // Prefer the grid layout hanging protocol when applicable.
  hangingProtocol: ['@ohif/mnGrid'],
  sopClassHandlers: [_ohif_mode_basic__rspack_import_3.ohif.sopClassHandler, _ohif_mode_basic__rspack_import_3.segmentation.sopClassHandler, _ohif_mode_basic__rspack_import_3.dicomRT.sopClassHandler]
};

/**
 * Customizations the mode registers (Default scope) when it loads.  The mode's
 * own block is empty — the segmentation panel is editable in this mode — but
 * it is registered so bootstrap / `?customization=` modules can add
 * mode-scoped values to it.
 */
const customizations = {
  segmentationModeCustomizations: {}
};

/**
 * The mode uses the basic mode's `modeFactory`, which applies
 * immutability-helper commands from `modeConfiguration` onto `modeInstance`,
 * so a site can define a `mySegmentation` mode that extends this one.
 */
const mode = {
  id: _id__rspack_import_0.id,
  modeFactory: _ohif_mode_basic__rspack_import_3.modeFactory,
  modeInstance,
  extensionDependencies: _ohif_mode_basic__rspack_import_3.extensionDependencies,
  customizations
};
/* export default */ const __rspack_default_export = (mode);

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/segmentation/src/initToolGroups.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _constants__rspack_import_0 = __webpack_require__("../../../modes/segmentation/src/constants.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

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
function createTools({
  utilityModule,
  commandsManager
}) {
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
      toolName: 'CircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_CIRCLE',
        minRadius: _constants__rspack_import_0.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_0.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: toolNames.LabelmapSlicePropagation
    }, {
      toolName: toolNames.MarkerLabelmap
    }, {
      toolName: toolNames.ClickSegment
    }, {
      toolName: 'CircularEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_CIRCLE',
        minRadius: _constants__rspack_import_0.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_0.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'SphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_SPHERE',
        minRadius: _constants__rspack_import_0.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_0.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'SphereEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_SPHERE',
        minRadius: _constants__rspack_import_0.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_0.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'ThresholdCircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_CIRCLE',
        minRadius: _constants__rspack_import_0.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_0.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'ThresholdSphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_SPHERE',
        minRadius: _constants__rspack_import_0.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_0.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'ThresholdCircularBrushDynamic',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_CIRCLE',
        minRadius: _constants__rspack_import_0.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_0.MAX_SEGMENTATION_DRAWING_RADIUS,
        threshold: {
          isDynamic: true,
          dynamicRadius: 3
        }
      }
    }, {
      toolName: toolNames.SegmentBidirectional
    }, {
      toolName: toolNames.SegmentSelect
    }, {
      toolName: 'ThresholdSphereBrushDynamic',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_SPHERE',
        minRadius: _constants__rspack_import_0.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_0.MAX_SEGMENTATION_DRAWING_RADIUS,
        threshold: {
          isDynamic: true,
          dynamicRadius: 3
        }
      }
    }, {
      toolName: toolNames.LabelMapEditWithContourTool
    }, {
      toolName: toolNames.CircleScissors
    }, {
      toolName: toolNames.RectangleScissors
    }, {
      toolName: toolNames.SphereScissors
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Magnify
    }, {
      toolName: toolNames.WindowLevelRegion
    }, {
      toolName: toolNames.UltrasoundDirectional
    }, {
      toolName: toolNames.PlanarFreehandContourSegmentation
    }, {
      toolName: toolNames.LivewireContourSegmentation
    }, {
      toolName: toolNames.SculptorTool
    }, {
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: 'CatmullRomSplineROI',
      parentTool: toolNames.SplineContourSegmentation,
      configuration: {
        spline: {
          type: 'CATMULLROM',
          enableTwoPointPreview: true
        }
      }
    }, {
      toolName: 'LinearSplineROI',
      parentTool: toolNames.SplineContourSegmentation,
      configuration: {
        spline: {
          type: 'LINEAR',
          enableTwoPointPreview: true
        }
      }
    }, {
      toolName: 'BSplineROI',
      parentTool: toolNames.SplineContourSegmentation,
      configuration: {
        spline: {
          type: 'BSPLINE',
          enableTwoPointPreview: true
        }
      }
    }],
    disabled: [{
      toolName: toolNames.ReferenceLines
    }, {
      toolName: toolNames.AdvancedMagnify
    }]
  };
  const updatedTools = commandsManager.run('initializeSegmentLabelTool', {
    tools
  });
  return updatedTools;
}
function initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, toolGroupId) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const tools = createTools({
    commandsManager,
    utilityModule
  });
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
function initMPRToolGroup(extensionManager, toolGroupService, commandsManager) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const servicesManager = extensionManager._servicesManager;
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const tools = createTools({
    commandsManager,
    utilityModule
  });
  tools.disabled.push({
    toolName: utilityModule.exports.toolNames.Crosshairs,
    // Bind Crosshairs to Primary+Shift (matching the longitudinal/tmtv modes)
    // so it lives on its own mouse binding. Without a binding it activates on
    // plain Primary and, being `disableOnPassive`, gets disabled the moment
    // another Primary tool (brush/zoom/pan, all in this `mpr` group) is
    // activated from the toolbar — making Crosshairs mutually exclusive with
    // them. On its own binding it stays active alongside those tools.
    bindings: [{
      mouseButton: utilityModule.exports.Enums.MouseBindings.Primary,
      modifierKey: utilityModule.exports.Enums.KeyboardBindings.Shift
    }],
    configuration: {
      viewportIndicators: true,
      viewportIndicatorsConfig: {
        circleRadius: 5,
        xOffset: 0.95,
        yOffset: 0.05
      },
      disableOnPassive: true,
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
    toolName: utilityModule.exports.toolNames.ReferenceLines
  });
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
  initMPRToolGroup(extensionManager, toolGroupService, commandsManager);
  initVolume3DToolGroup(extensionManager, toolGroupService);
}
/* export default */ const __rspack_default_export = (initToolGroups);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/segmentation/src/utils/setUpAutoTabSwitchHandler.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (setUpAutoTabSwitchHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
/**
 * Sets up auto tab switching for when the first segmentation is added into the viewer.
 */
function setUpAutoTabSwitchHandler({
  segmentationService,
  viewportGridService,
  panelService
}) {
  const autoTabSwitchEvents = [segmentationService.EVENTS.SEGMENTATION_MODIFIED, segmentationService.EVENTS.SEGMENTATION_REPRESENTATION_MODIFIED];

  // Initially there are no segmentations, so we should switch the tab whenever the first segmentation is added.
  let shouldSwitchTab = true;
  const unsubscribeAutoTabSwitchEvents = autoTabSwitchEvents.map(eventName => segmentationService.subscribe(eventName, () => {
    const segmentations = segmentationService.getSegmentations();
    if (!segmentations.length) {
      // If all the segmentations are removed, then the next time a segmentation is added, we should switch the tab.
      shouldSwitchTab = true;
      return;
    }
    const activeViewportId = viewportGridService.getActiveViewportId();
    const activeRepresentation = segmentationService.getSegmentationRepresentations(activeViewportId)?.find(representation => representation.active);
    if (activeRepresentation && shouldSwitchTab) {
      shouldSwitchTab = false;
      switch (activeRepresentation.type) {
        case 'Labelmap':
          panelService.activatePanel('@ohif/extension-cornerstone.panelModule.panelSegmentationWithToolsLabelMap', true);
          break;
        case 'Contour':
          panelService.activatePanel('@ohif/extension-cornerstone.panelModule.panelSegmentationWithToolsContour', true);
          break;
      }
    }
  })).map(subscription => subscription.unsubscribe);
  return {
    unsubscribeAutoTabSwitchEvents
  };
}
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/segmentation/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/mode-segmentation","version":"3.14.0-beta.7","description":"OHIF segmentation mode which enables labelmap segmentation read/edit/export","author":"@ohif","license":"MIT","repository":"OHIF/Viewers","main":"dist/umd/@ohif/mode-segmentation/index.umd.js","module":"src/index.tsx","engines":{"node":">=24"},"files":["dist/**","public/**","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:cornerstone":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/extension-cornerstone":"workspace:*","@ohif/extension-cornerstone-dicom-rt":"workspace:*","@ohif/extension-cornerstone-dicom-seg":"workspace:*","@ohif/extension-cornerstone-dicom-sr":"workspace:*","@ohif/extension-default":"workspace:*","@ohif/extension-dicom-pdf":"workspace:*","@ohif/extension-dicom-video":"workspace:*","@ohif/mode-basic":"workspace:*"},"dependencies":{"@babel/runtime":"7.29.7","i18next":"17.3.1"},"devDependencies":{"@babel/core":"7.29.7","@babel/plugin-syntax-dynamic-import":"7.8.3","@babel/plugin-transform-arrow-functions":"7.29.7","@babel/plugin-transform-class-properties":"7.29.7","@babel/plugin-transform-object-rest-spread":"7.29.7","@babel/plugin-transform-private-methods":"7.29.7","@babel/plugin-transform-regenerator":"7.29.7","@babel/plugin-transform-runtime":"7.29.7","@babel/plugin-transform-typescript":"7.29.7","@babel/preset-env":"7.29.7","@babel/preset-react":"7.29.7","@babel/preset-typescript":"7.29.7","@svgr/webpack":"8.1.0","babel-loader":"8.4.1","cross-env":"7.0.3","dotenv":"8.6.0","webpack-merge":"5.10.0"},"keywords":["ohif-mode"]}')

},

}]);
//# sourceMappingURL=modes_segmentation_src_index_tsx.js.map