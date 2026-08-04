"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["modes_tmtv_src_index_ts"], {
"../../../modes/tmtv/src/constants.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  MAX_SEGMENTATION_DRAWING_RADIUS: () => (MAX_SEGMENTATION_DRAWING_RADIUS),
  MIN_SEGMENTATION_DRAWING_RADIUS: () => (MIN_SEGMENTATION_DRAWING_RADIUS)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
const MIN_SEGMENTATION_DRAWING_RADIUS = 0.5;
const MAX_SEGMENTATION_DRAWING_RADIUS = 99.5;
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/tmtv/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../modes/tmtv/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/tmtv/src/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  cs3d: () => (cs3d),
  customizations: () => (customizations),
  "default": () => (__rspack_default_export),
  extensionDependencies: () => (extensionDependencies),
  initToolGroups: () => (/* reexport safe */ _initToolGroups_js__rspack_import_4["default"]),
  modeInstance: () => (modeInstance),
  ohif: () => (ohif),
  onModeEnter: () => (onModeEnter),
  tmtv: () => (tmtv),
  tmtvLayout: () => (tmtvLayout),
  tmtvRoute: () => (tmtvRoute)
});
/* import */ var _ohif_core__rspack_import_0 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_mode_basic__rspack_import_1 = __webpack_require__("../../../modes/basic/src/index.tsx");
/* import */ var i18next__rspack_import_2 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* import */ var _id_js__rspack_import_3 = __webpack_require__("../../../modes/tmtv/src/id.js");
/* import */ var _initToolGroups_js__rspack_import_4 = __webpack_require__("../../../modes/tmtv/src/initToolGroups.js");
/* import */ var _utils_setCrosshairsConfiguration_js__rspack_import_5 = __webpack_require__("../../../modes/tmtv/src/utils/setCrosshairsConfiguration.js");
/* import */ var _utils_setFusionActiveVolume_js__rspack_import_6 = __webpack_require__("../../../modes/tmtv/src/utils/setFusionActiveVolume.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");







const {
  MetadataProvider
} = _ohif_core__rspack_import_0.classes;
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList'
};
const cs3d = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
  segPanel: '@ohif/extension-cornerstone.panelModule.panelSegmentationNoHeader',
  measurements: '@ohif/extension-cornerstone.panelModule.measurements'
};
const tmtv = {
  hangingProtocol: '@ohif/extension-tmtv.hangingProtocolModule.ptCT',
  petSUV: '@ohif/extension-tmtv.panelModule.petSUV',
  tmtv: '@ohif/extension-tmtv.panelModule.tmtv'
};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-tmtv': '^3.0.0'
};

/**
 * Extends the basic mode enter (tool groups, toolbar, tool group additions)
 * with the TMTV specifics: the fusion viewport crosshairs/active-volume
 * configuration and the PT VOI hanging protocol attribute.
 */
function onModeEnter(ctx) {
  _ohif_mode_basic__rspack_import_1.onModeEnter.call(this, ctx);
  const {
    servicesManager,
    extensionManager,
    commandsManager
  } = ctx;
  const {
    toolGroupService,
    customizationService,
    hangingProtocolService,
    displaySetService
  } = servicesManager.services;
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames
  } = utilityModule.exports;
  const {
    unsubscribe
  } = toolGroupService.subscribe(toolGroupService.EVENTS.VIEWPORT_ADDED, () => {
    // For fusion toolGroup we need to add the volumeIds for the crosshairs
    // since in the fusion viewport we don't want both PT and CT to render MIP
    // when slabThickness is modified
    const {
      displaySetMatchDetails
    } = hangingProtocolService.getMatchDetails();
    (0,_utils_setCrosshairsConfiguration_js__rspack_import_5["default"])(displaySetMatchDetails, toolNames, toolGroupService, displaySetService);
    (0,_utils_setFusionActiveVolume_js__rspack_import_6["default"])(displaySetMatchDetails, toolNames, toolGroupService, displaySetService);
  });
  this._unsubscriptions.push(unsubscribe);

  // Function-valued customization; kept out of the registered
  // `tmtvModeCustomizations` block because it needs the mode's
  // commandsManager.  Written at mode scope, so a global-scope customization
  // still overrides it by scope precedence.
  customizationService.setCustomizations({
    'panelSegmentation.onSegmentationAdd': {
      $set: () => {
        commandsManager.run('createNewLabelmapFromPT');
      }
    }
  });

  // For the hanging protocol we need to decide on the window level
  // based on whether the SUV is corrected or not, hence we can't hard
  // code the window level in the hanging protocol but we add a custom
  // attribute to the hanging protocol that will be used to get the
  // window level based on the metadata
  hangingProtocolService.addCustomAttribute('getPTVOIRange', 'get PT VOI based on corrected or not', props => {
    const ptDisplaySet = props.find(imageSet => imageSet.Modality === 'PT');
    if (!ptDisplaySet) {
      return;
    }
    const {
      imageId
    } = ptDisplaySet.images[0];
    const imageIdScalingFactor = MetadataProvider.get('scalingModule', imageId);
    const isSUVAvailable = imageIdScalingFactor && imageIdScalingFactor.suvbw;
    if (isSUVAvailable) {
      return {
        windowWidth: 5,
        windowCenter: 2.5
      };
    }
    return;
  });
}
const tmtvLayout = {
  id: ohif.layout,
  props: {
    // Literal panel lists; the mode route seeds them into the standard
    // `leftPanels` / `rightPanels` customizations so `mode` phase
    // blocks and global customizations can modify them.
    leftPanels: [ohif.thumbnailList],
    leftPanelResizable: true,
    leftPanelClosed: true,
    rightPanels: [tmtv.tmtv, tmtv.petSUV],
    rightPanelResizable: true,
    viewports: [{
      namespace: cs3d.viewport,
      displaySetsToDisplay: [ohif.sopClassHandler]
    }]
  }
};
const tmtvRoute = {
  path: 'tmtv',
  layoutTemplate: _ohif_mode_basic__rspack_import_1.layoutTemplate,
  layoutInstance: tmtvLayout
};
const modeInstance = {
  // TODO: We're using this as a route segment
  // We should not be.
  id: _id_js__rspack_import_3.id,
  routeName: 'tmtv',
  displayName: i18next__rspack_import_2["default"].t('Modes:Total Metabolic Tumor Volume'),
  // Toolbar/tool-group composition: which capability packs this mode uses.
  // The mode route seeds these onto the Mode customization scope on enter, so
  // `?customization=` modules extend them through the `mode` phase. The tmtv
  // extension supplies the TMTV-specific button/section packs.
  toolbarButtons: [{
    $reference: 'tmtv.toolbarButtons'
  }],
  toolbarSections: [{
    $reference: 'tmtv.toolbarSections'
  }],
  toolGroupAdditions: {
    [_initToolGroups_js__rspack_import_4.toolGroupIds.CT]: [],
    [_initToolGroups_js__rspack_import_4.toolGroupIds.PT]: [],
    [_initToolGroups_js__rspack_import_4.toolGroupIds.Fusion]: [],
    [_initToolGroups_js__rspack_import_4.toolGroupIds.MIP]: [],
    [_initToolGroups_js__rspack_import_4.toolGroupIds["default"]]: []
  },
  // Tool group setup used by onModeEnter; extending modes can replace it.
  initToolGroups: _initToolGroups_js__rspack_import_4["default"],
  // The mode's own customizations, referenced by name: the block is registered
  // at default scope when the mode loads (see `customizations` below), and the
  // mode route applies it as the bottom layer of the mode scope on enter.
  modeCustomizations: 'tmtvModeCustomizations',
  activatePanelTriggers: [],
  /**
   * Lifecycle hooks
   */
  onModeEnter,
  onModeExit: _ohif_mode_basic__rspack_import_1.onModeExit,
  validationTags: {
    study: [],
    series: []
  },
  // Data-driven validity: requires both PT and CT, rejects SM, and excludes
  // the demo studies that belong to the preclinical 4D mode.  Until we have a
  // better way to identify 4D studies we use the mrn/StudyInstanceUID.
  isValidMode: _ohif_mode_basic__rspack_import_1.isValidMode,
  modeModalities: [['PT', 'CT']],
  excludedModalities: ['SM'],
  excludedStudies: [{
    mrn: 'M1'
  }, {
    studyInstanceUid: '1.3.6.1.4.1.12842.1.1.14.3.20220915.105557.468.2963630849'
  }],
  routes: [tmtvRoute],
  extensions: extensionDependencies,
  hangingProtocol: tmtv.hangingProtocol,
  sopClassHandlers: [ohif.sopClassHandler]
};

/**
 * Customizations the mode registers (Default scope) when it loads — before
 * the bootstrap phase applies, so bootstrap / `?customization=` modules can
 * modify them before anything reads them.  Values are plain data.
 */
const customizations = {
  tmtvModeCustomizations: {
    'panelSegmentation.tableMode': 'expanded'
  }
};

/**
 * The mode uses the basic mode's `modeFactory`, which applies
 * immutability-helper commands from `modeConfiguration` onto `modeInstance`,
 * so a site can define a mode that extends this one.
 */
const mode = {
  id: _id_js__rspack_import_3.id,
  modeFactory: _ohif_mode_basic__rspack_import_1.modeFactory,
  modeInstance,
  extensionDependencies,
  customizations
};
/* export default */ const __rspack_default_export = (mode);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/tmtv/src/initToolGroups.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  toolGroupIds: () => (/* reexport safe */ _ohif_extension_tmtv__rspack_import_0.toolGroupIds)
});
/* import */ var _ohif_extension_tmtv__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/index.tsx");
/* import */ var _constants__rspack_import_1 = __webpack_require__("../../../modes/tmtv/src/constants.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");



function _initToolGroups(toolNames, Enums, toolGroupService, commandsManager) {
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
      toolName: toolNames.SegmentBidirectional
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
      toolName: 'CircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_CIRCLE',
        minRadius: _constants__rspack_import_1.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_1.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'CircularEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_CIRCLE',
        minRadius: _constants__rspack_import_1.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_1.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'SphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_SPHERE',
        minRadius: _constants__rspack_import_1.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_1.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'SphereEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_SPHERE',
        minRadius: _constants__rspack_import_1.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_1.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'ThresholdCircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_CIRCLE',
        minRadius: _constants__rspack_import_1.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_1.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'ThresholdSphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_SPHERE',
        minRadius: _constants__rspack_import_1.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_1.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }, {
      toolName: 'ThresholdCircularBrushDynamic',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_CIRCLE',
        // preview: {
        //   enabled: true,
        // },
        threshold: {
          isDynamic: true,
          dynamicRadius: 3
        },
        minRadius: _constants__rspack_import_1.MIN_SEGMENTATION_DRAWING_RADIUS,
        maxRadius: _constants__rspack_import_1.MAX_SEGMENTATION_DRAWING_RADIUS
      }
    }],
    enabled: [],
    disabled: [{
      toolName: toolNames.Crosshairs,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary,
        modifierKey: Enums.KeyboardBindings.Shift
      }],
      configuration: {
        disableOnPassive: true,
        autoPan: {
          enabled: false,
          panSize: 10
        }
      }
    }]
  };
  toolGroupService.createToolGroupAndAddTools(_ohif_extension_tmtv__rspack_import_0.toolGroupIds.CT, tools);
  toolGroupService.createToolGroupAndAddTools(_ohif_extension_tmtv__rspack_import_0.toolGroupIds.PT, {
    active: tools.active,
    passive: [...tools.passive, {
      toolName: 'RectangleROIStartEndThreshold'
    }],
    enabled: tools.enabled,
    disabled: tools.disabled
  });
  toolGroupService.createToolGroupAndAddTools(_ohif_extension_tmtv__rspack_import_0.toolGroupIds.Fusion, tools);
  toolGroupService.createToolGroupAndAddTools(_ohif_extension_tmtv__rspack_import_0.toolGroupIds["default"], tools);
  const mipTools = {
    active: [{
      toolName: toolNames.VolumeRotate,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }],
      configuration: {
        rotateIncrementDegrees: 5
      }
    }, {
      toolName: toolNames.MipJumpToClick,
      configuration: {
        toolGroupId: _ohif_extension_tmtv__rspack_import_0.toolGroupIds.PT
      },
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }],
    enabled: [{
      toolName: toolNames.OrientationMarker,
      configuration: {
        orientationWidget: {
          viewportCorner: 'BOTTOM_LEFT'
        }
      }
    }]
  };
  toolGroupService.createToolGroupAndAddTools(_ohif_extension_tmtv__rspack_import_0.toolGroupIds.MIP, mipTools);
}

/**
 * Mode tool group setup, sharing the options-object signature used by all
 * modes so implementations are interchangeable via the `initToolGroups` mode
 * instance property.
 */
function initToolGroups({
  extensionManager,
  toolGroupService,
  commandsManager
}) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  _initToolGroups(toolNames, Enums, toolGroupService, commandsManager);
}
/* export default */ const __rspack_default_export = (initToolGroups);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/tmtv/src/utils/setCrosshairsConfiguration.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (setCrosshairsConfiguration)
});
/* import */ var _initToolGroups__rspack_import_0 = __webpack_require__("../../../modes/tmtv/src/initToolGroups.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

function setCrosshairsConfiguration(matches, toolNames, toolGroupService, displaySetService) {
  const matchDetails = matches.get('ctDisplaySet');
  if (!matchDetails) {
    return;
  }
  const {
    SeriesInstanceUID
  } = matchDetails;
  const displaySets = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
  const toolConfig = toolGroupService.getToolConfiguration(_initToolGroups__rspack_import_0.toolGroupIds.Fusion, toolNames.Crosshairs);
  const crosshairsConfig = {
    ...toolConfig,
    filterActorUIDsToSetSlabThickness: [displaySets[0].displaySetInstanceUID]
  };
  toolGroupService.setToolConfiguration(_initToolGroups__rspack_import_0.toolGroupIds.Fusion, toolNames.Crosshairs, crosshairsConfig);
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/tmtv/src/utils/setFusionActiveVolume.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (setFusionActiveVolume)
});
/* import */ var _initToolGroups__rspack_import_0 = __webpack_require__("../../../modes/tmtv/src/initToolGroups.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

function setFusionActiveVolume(matches, toolNames, toolGroupService, displaySetService) {
  const matchDetails = matches.get('ptDisplaySet');
  const matchDetails2 = matches.get('ctDisplaySet');
  if (!matchDetails) {
    return;
  }
  const {
    SeriesInstanceUID
  } = matchDetails;
  const displaySets = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
  if (!displaySets || displaySets.length === 0) {
    return;
  }
  const wlToolConfig = toolGroupService.getToolConfiguration(_initToolGroups__rspack_import_0.toolGroupIds.Fusion, toolNames.WindowLevel);
  const ellipticalToolConfig = toolGroupService.getToolConfiguration(_initToolGroups__rspack_import_0.toolGroupIds.Fusion, toolNames.EllipticalROI);

  // Todo: this should not take into account the loader id
  const volumeId = `cornerstoneStreamingImageVolume:${displaySets[0].displaySetInstanceUID}`;
  const {
    SeriesInstanceUID: SeriesInstanceUID2
  } = matchDetails2;
  const ctDisplaySets = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID2);
  const ctVolumeId = `cornerstoneStreamingImageVolume:${ctDisplaySets[0].displaySetInstanceUID}`;
  const windowLevelConfig = {
    ...wlToolConfig,
    volumeId: ctVolumeId
  };
  const ellipticalROIConfig = {
    ...ellipticalToolConfig,
    volumeId
  };
  toolGroupService.setToolConfiguration(_initToolGroups__rspack_import_0.toolGroupIds.Fusion, toolNames.WindowLevel, windowLevelConfig);
  toolGroupService.setToolConfiguration(_initToolGroups__rspack_import_0.toolGroupIds.Fusion, toolNames.EllipticalROI, ellipticalROIConfig);
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/tmtv/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/mode-tmtv","version":"3.14.0-beta.7","description":"Total Metabolic Tumor Volume Workflow","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-tmtv.umd.js","module":"src/index.ts","engines":{"node":">=24"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:cornerstone":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/extension-cornerstone":"workspace:*","@ohif/extension-cornerstone-dicom-sr":"workspace:*","@ohif/extension-default":"workspace:*","@ohif/extension-dicom-pdf":"workspace:*","@ohif/extension-dicom-video":"workspace:*","@ohif/extension-measurement-tracking":"workspace:*","@ohif/extension-tmtv":"workspace:*","@ohif/mode-basic":"workspace:*"},"dependencies":{"@babel/runtime":"7.29.7","i18next":"17.3.1"},"devDependencies":{"cross-env":"7.0.3","webpack-merge":"5.10.0"},"keywords":["ohif-mode"]}')

},

}]);
//# sourceMappingURL=modes_tmtv_src_index_ts.js.map