"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["modes_usAnnotation_src_index_ts"], {
"../../../extensions/usAnnotation/src/PleuraBlinePercentage.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  setShowPercentage: () => (setShowPercentage),
  showPercentage: () => (showPercentage)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
// Global state to control whether to show the percentage in the overlay
let showPercentage = true;

/**
 * Sets whether to show the pleura percentage in the viewport overlay
 * @param value - Boolean indicating whether to show the percentage
 */
function setShowPercentage(value) {
  showPercentage = value;
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/usAnnotation/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../modes/usAnnotation/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/usAnnotation/src/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  initToolGroups: () => (/* reexport safe */ _initToolGroups__rspack_import_2["default"]),
  toolbarButtons: () => (/* reexport safe */ _toolbarButtons__rspack_import_3["default"])
});
/* import */ var i18next__rspack_import_0 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* import */ var _id__rspack_import_1 = __webpack_require__("../../../modes/usAnnotation/src/id.js");
/* import */ var _initToolGroups__rspack_import_2 = __webpack_require__("../../../modes/usAnnotation/src/initToolGroups.js");
/* import */ var _toolbarButtons__rspack_import_3 = __webpack_require__("../../../modes/usAnnotation/src/toolbarButtons.ts");
/* import */ var _cornerstonejs_tools__rspack_import_4 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* import */ var _extensions_usAnnotation_src_PleuraBlinePercentage__rspack_import_5 = __webpack_require__("../../../extensions/usAnnotation/src/PleuraBlinePercentage.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");






const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList',
  wsiSopClassHandler: '@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler'
};
const cornerstone = {
  measurements: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
  segmentation: '@ohif/extension-cornerstone.panelModule.panelSegmentation'
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
const dicomPmap = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-pmap.sopClassHandlerModule.dicom-pmap',
  viewport: '@ohif/extension-cornerstone-dicom-pmap.viewportModule.dicom-pmap'
};
const dicomRT = {
  viewport: '@ohif/extension-cornerstone-dicom-rt.viewportModule.dicom-rt',
  sopClassHandler: '@ohif/extension-cornerstone-dicom-rt.sopClassHandlerModule.dicom-rt'
};
const usAnnotation = {
  panel: '@ohif/extension-ultrasound-pleura-bline.panelModule.USAnnotationPanel'
};
let settingsSaved = {};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-measurement-tracking': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-pmap': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-rt': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1',
  '@ohif/extension-ultrasound-pleura-bline': '^3.0.0'
};
function modeFactory({
  modeConfiguration
}) {
  let _activatePanelTriggersSubscriptions = [];
  return {
    // TODO: We're using this as a route segment
    // We should not be.
    id: _id__rspack_import_1.id,
    routeName: 'usAnnotation',
    displayName: i18next__rspack_import_0["default"].t('US Pleura B-line Annotations'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: function ({
      servicesManager,
      extensionManager,
      commandsManager,
      appConfig
    }) {
      settingsSaved = {
        disableConfirmationPrompts: appConfig?.disableConfirmationPrompts,
        measurementTrackingMode: appConfig?.measurementTrackingMode
      };
      appConfig.disableConfirmationPrompts = true;
      appConfig.measurementTrackingMode = 'simplified';
      const {
        measurementService,
        toolbarService,
        toolGroupService,
        customizationService
      } = servicesManager.services;
      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      (0,_initToolGroups__rspack_import_2["default"])(extensionManager, toolGroupService, commandsManager);
      toolbarService.register(_toolbarButtons__rspack_import_3["default"]);
      toolbarService.updateSection(toolbarService.sections.primary, ['MeasurementTools', 'Zoom', 'Pan', 'TrackballRotate', 'WindowLevel', 'Capture', 'Layout', 'Crosshairs', 'MoreTools']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.topLeft, ['orientationMenu', 'dataOverlayMenu']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.bottomMiddle, ['AdvancedRenderingControls']);
      toolbarService.updateSection(toolbarService.sections.advancedRenderingControlsSection, ['windowLevelMenuEmbedded', 'voiManualControlMenu', 'Colorbar', 'opacityMenu', 'thresholdMenu']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.topRight, ['modalityLoadBadge', 'trackingStatus', 'navigationComponent']);
      toolbarService.updateSection(toolbarService.sections.viewportActionMenu.bottomLeft, ['windowLevelMenu']);
      toolbarService.updateSection(toolbarService.sections.measurementSection, ['Length', 'Bidirectional', 'ArrowAnnotate', 'EllipticalROI', 'RectangleROI', 'CircleROI', 'PlanarFreehandROI', 'SplineROI', 'LivewireContour']);
      toolbarService.updateSection(toolbarService.sections.moreToolsSection, ['Reset', 'rotate-right', 'flipHorizontal', 'ImageSliceSync', 'ReferenceLines', 'ImageOverlayViewer', 'StackScroll', 'invert', 'Probe', 'Cine', 'Angle', 'CobbAngle', 'Magnify', 'CalibrationLine', 'TagBrowser', 'AdvancedMagnify', 'UltrasoundDirectionalTool', 'UltrasoundPleuraBLineTool', 'WindowLevelRegion']);
      customizationService.setCustomizations({
        'panelSegmentation.disableEditing': {
          $set: true
        },
        autoCineModalities: {
          $set: []
        },
        'ohif.hotkeyBindings': {
          $push: [{
            commandName: 'switchUSAnnotationToPleuraLine',
            label: 'Add new pleura line',
            keys: ['W']
          }, {
            commandName: 'switchUSAnnotationToBLine',
            label: 'Add new B-line',
            keys: ['S']
          }, {
            commandName: 'deleteLastPleuraAnnotation',
            label: 'Delete last pleura line',
            keys: ['E']
          }, {
            commandName: 'deleteLastBLineAnnotation',
            label: 'Delete last B-line',
            keys: ['D']
          }, {
            commandName: 'toggleDisplayFanAnnotation',
            label: 'Toggle overlay',
            keys: ['O']
          }]
        },
        measurementsContextMenu: {
          inheritsFrom: 'ohif.contextMenu',
          menus: [
          // Get the items from the UI Customization for the menu name (and have a custom name)
          {
            id: 'forExistingMeasurement',
            selector: ({
              nearbyToolData
            }) => !!nearbyToolData,
            items: [{
              label: 'Delete annotation',
              commands: 'removeMeasurement'
            }]
          }]
        },
        'viewportOverlay.topLeft': [{
          id: 'BLinePleuraPercentage',
          inheritsFrom: 'ohif.overlayItem',
          label: '',
          title: 'BLinePleuraPercentage',
          condition: ({
            referenceInstance
          }) => referenceInstance?.Modality.includes('US') && _extensions_usAnnotation_src_PleuraBlinePercentage__rspack_import_5.showPercentage,
          contentF: () => {
            const {
              viewportGridService,
              toolGroupService,
              cornerstoneViewportService
            } = servicesManager.services;
            const activeViewportId = viewportGridService.getActiveViewportId();
            const toolGroup = toolGroupService.getToolGroupForViewport(activeViewportId);
            if (!toolGroup) {
              return 'B-Line/Pleura : N/A';
            }
            const usAnnotation = toolGroup.getToolInstance(_cornerstonejs_tools__rspack_import_4.UltrasoundPleuraBLineTool.toolName);
            if (usAnnotation) {
              const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
              const percentage = usAnnotation.calculateBLinePleuraPercentage(viewport);
              if (percentage !== undefined) {
                return `B-Line/Pleura : ${percentage.toFixed(2)} %`;
              } else {
                return 'B-Line/Pleura : N/A';
              }
            }
            return 'B-Line/Pleura : N/A';
          }
        }]
      });
    },
    onModeExit: ({
      servicesManager
    }) => {
      appConfig.disableConfirmationPrompts = settingsSaved.disableConfirmationPrompts;
      appConfig.measurementTrackingMode = settingsSaved.measurementTrackingMode;
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      _activatePanelTriggersSubscriptions.forEach(sub => sub.unsubscribe());
      _activatePanelTriggersSubscriptions = [];
      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: function ({
      modalities
    }) {
      const modalities_list = modalities.split('\\');
      return {
        valid: modalities_list.includes('US'),
        description: 'Pleura b-lines annotation mode when the study involves US modality series'
      };
    },
    routes: [{
      path: 'longitudinal',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: () => {
        return {
          id: ohif.layout,
          props: {
            leftPanels: [tracked.thumbnailList],
            leftPanelResizable: true,
            rightPanels: [usAnnotation.panel, cornerstone.segmentation, tracked.measurements],
            rightPanelResizable: true,
            viewports: [{
              namespace: tracked.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler, dicomvideo.sopClassHandler, dicomsr.sopClassHandler3D, ohif.wsiSopClassHandler]
            }, {
              namespace: dicomsr.viewport,
              displaySetsToDisplay: [dicomsr.sopClassHandler]
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
      }
    }],
    extensions: extensionDependencies,
    // Default protocol gets self-registered by default in the init
    hangingProtocol: 'default',
    // Order is important in sop class handlers when two handlers both use
    // the same sop class under different situations.  In that case, the more
    // general handler needs to come last.  For this case, the dicomvideo must
    // come first to remove video transfer syntax before ohif uses images
    sopClassHandlers: [dicomvideo.sopClassHandler, dicomSeg.sopClassHandler, dicomPmap.sopClassHandler, ohif.sopClassHandler, ohif.wsiSopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler3D, dicomsr.sopClassHandler, dicomRT.sopClassHandler],
    ...modeConfiguration
  };
}
const mode = {
  id: _id__rspack_import_1.id,
  modeFactory,
  extensionDependencies
};
/* export default */ const __rspack_default_export = (mode);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/usAnnotation/src/initToolGroups.js"(module, __webpack_exports__, __webpack_require__) {
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
      toolName: toolNames.UltrasoundAnnotation,
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
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
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
      toolName: toolNames.CalibrationLine
    }, {
      toolName: toolNames.PlanarFreehandContourSegmentation,
      configuration: {
        displayOnePointAsCrosshairs: true
      }
    }, {
      toolName: toolNames.UltrasoundDirectional
    }, {
      toolName: toolNames.WindowLevel
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
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
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
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
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
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
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
      // Bind Crosshairs to Primary+Shift (matching the longitudinal/tmtv
      // modes) so it has its own mouse binding. Without a binding it activates
      // on plain Primary and, being `disableOnPassive`, gets disabled the
      // moment another Primary tool (brush/zoom/pan in the same group) is
      // activated from the toolbar, making them mutually exclusive.
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
function initToolGroups(extensionManager, toolGroupService, commandsManager) {
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
"../../../modes/usAnnotation/src/toolbarButtons.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  setToolActiveToolbar: () => (setToolActiveToolbar)
});
/* import */ var _cornerstonejs_core__rspack_import_0 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _ohif_core__rspack_import_1 = __webpack_require__("../../core/src/index.ts");
/* import */ var i18next__rspack_import_2 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");



const callbacks = toolName => [{
  commandName: 'setViewportForToolConfiguration',
  commandOptions: {
    toolName
  }
}];
const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: ['default', 'mpr', 'SRToolGroup', 'volume3d']
  }
};
const toolbarButtons = [
// sections
{
  id: 'MeasurementTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: 'measurementSection'
  }
}, {
  id: 'MoreTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: 'moreToolsSection'
  }
}, {
  id: 'AdvancedRenderingControls',
  uiType: 'ohif.advancedRenderingControls',
  props: {
    buttonSection: 'advancedRenderingControlsSection'
  }
},
// tool defs
{
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
      // hideWhenDisabled: true,
    }
  }
}, {
  id: 'windowLevelMenuEmbedded',
  uiType: 'ohif.windowLevelMenuEmbedded',
  props: {
    icon: 'WindowLevel',
    label: i18next__rspack_import_2["default"].t('Buttons:Window Level'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Adjust window/level presets and customize image contrast settings'),
    evaluate: {
      name: 'evaluate.windowLevelMenuEmbedded',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'windowLevelMenu',
  uiType: 'ohif.windowLevelMenu',
  props: {
    icon: 'WindowLevel',
    label: i18next__rspack_import_2["default"].t('Buttons:Window Level'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Adjust window/level presets and customize image contrast settings'),
    evaluate: {
      name: 'evaluate.windowLevelMenu'
    }
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
    evaluate: ['evaluate.action', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'flipHorizontal',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-flip-horizontal',
    label: i18next__rspack_import_2["default"].t('Buttons:Flip Horizontal'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Flip Horizontally'),
    commands: 'flipViewportHorizontal',
    evaluate: ['evaluate.viewportProperties.toggle', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video', 'volume3d']
    }]
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
    evaluate: ['evaluate.cornerstone.synchronizer', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video', 'volume3d']
    }]
  }
}, {
  id: 'ReferenceLines',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-referenceLines',
    label: i18next__rspack_import_2["default"].t('Buttons:Reference Lines'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Show Reference Lines'),
    commands: 'toggleEnabledDisabledToolbar',
    listeners: {
      [_ohif_core__rspack_import_1.ViewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: callbacks('ReferenceLines'),
      [_ohif_core__rspack_import_1.ViewportGridService.EVENTS.VIEWPORTS_READY]: callbacks('ReferenceLines')
    },
    evaluate: ['evaluate.cornerstoneTool.toggle', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'ImageOverlayViewer',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'toggle-dicom-overlay',
    label: i18next__rspack_import_2["default"].t('Buttons:Image Overlay'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Toggle Image Overlay'),
    commands: 'toggleEnabledDisabledToolbar',
    evaluate: ['evaluate.cornerstoneTool.toggle', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
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
    evaluate: ['evaluate.viewportProperties.toggle', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
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
    evaluate: ['evaluate.cine', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['volume3d']
    }]
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
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
  }
}, {
  id: 'CalibrationLine',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-calibration',
    label: i18next__rspack_import_2["default"].t('Buttons:Calibration'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Calibration Line'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
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
    evaluate: ['evaluate.cornerstoneTool.toggle.ifStrictlyDisabled', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
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
  id: 'UltrasoundPleuraBLineTool',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-ultrasound-bidirectional',
    label: i18next__rspack_import_2["default"].t('Buttons:US Pleura B-line Annotation'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:US Pleura B-line Annotation'),
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
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video']
    }]
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
  id: 'RectangleROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rectangle',
    label: i18next__rspack_import_2["default"].t('Buttons:Rectangle'),
    tooltip: i18next__rspack_import_2["default"].t('Buttons:Rectangle ROI'),
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
},
// Window Level
{
  id: 'WindowLevel',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-window-level',
    label: i18next__rspack_import_2["default"].t('Buttons:Window Level'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstoneTool', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['wholeSlide']
    }]
  }
}, {
  id: 'Pan',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-move',
    label: i18next__rspack_import_2["default"].t('Buttons:Pan'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-zoom',
    label: i18next__rspack_import_2["default"].t('Buttons:Zoom'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'TrackballRotate',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-3d-rotate',
    label: i18next__rspack_import_2["default"].t('Buttons:3D Rotate'),
    commands: setToolActiveToolbar,
    evaluate: {
      name: 'evaluate.cornerstoneTool',
      disabledText: i18next__rspack_import_2["default"].t('Buttons:Select a 3D viewport to enable this tool')
    }
  }
}, {
  id: 'Capture',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-capture',
    label: i18next__rspack_import_2["default"].t('Buttons:Capture'),
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
    evaluate: 'evaluate.action'
  }
}, {
  id: 'Crosshairs',
  uiType: 'ohif.toolButton',
  props: {
    type: 'tool',
    icon: 'tool-crosshair',
    label: i18next__rspack_import_2["default"].t('Buttons:Crosshairs'),
    commands: {
      commandName: 'setToolActiveToolbar',
      commandOptions: {
        toolGroupIds: ['mpr']
      }
    },
    evaluate: {
      name: 'evaluate.cornerstoneTool',
      disabledText: i18next__rspack_import_2["default"].t('Buttons:Select an MPR viewport to enable this tool')
    }
  }
}
// {
//   id: 'Undo',
//   uiType: 'ohif.toolButton',
//   props: {
//     type: 'tool',
//     icon: 'prev-arrow',
//     label: 'Undo',
//     commands: {
//       commandName: 'undo',
//     },
//     evaluate: 'evaluate.action',
//   },
// },
// {
//   id: 'Redo',
//   uiType: 'ohif.toolButton',
//   props: {
//     type: 'tool',
//     icon: 'next-arrow',
//     label: 'Redo',
//     commands: {
//       commandName: 'redo',
//     },
//     evaluate: 'evaluate.action',
//   },
// },
];
/* export default */ const __rspack_default_export = (toolbarButtons);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/usAnnotation/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/mode-ultrasound-pleura-bline","version":"3.14.0-beta.7","description":"Allows users to annotate ultrasound images with pleura B-line annotations.","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-ultrasound-pleura-bline.umd.js","module":"src/index.ts","engines":{"node":">=24"},"files":["dist/**","public/**","README.md"],"publishConfig":{"access":"public"},"scripts":{"dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:cornerstone":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"dependencies":{"@babel/runtime":"7.29.7","@cornerstonejs/core":"5.6.8","@cornerstonejs/tools":"5.6.8","@ohif/core":"workspace:*","@ohif/extension-cornerstone-dicom-sr":"workspace:*","@ohif/extension-ultrasound-pleura-bline":"workspace:*","i18next":"17.3.1"},"devDependencies":{"@babel/core":"7.29.7","@babel/plugin-syntax-dynamic-import":"7.8.3","@babel/plugin-transform-arrow-functions":"7.29.7","@babel/plugin-transform-class-properties":"7.29.7","@babel/plugin-transform-object-rest-spread":"7.29.7","@babel/plugin-transform-private-methods":"7.29.7","@babel/plugin-transform-regenerator":"7.29.7","@babel/plugin-transform-runtime":"7.29.7","@babel/plugin-transform-typescript":"7.29.7","@babel/preset-env":"7.29.7","@babel/preset-react":"7.29.7","@babel/preset-typescript":"7.29.7","@svgr/webpack":"8.1.0","babel-loader":"8.4.1","cross-env":"7.0.3","dotenv":"8.6.0","webpack-merge":"5.10.0"},"keywords":["ohif-mode"]}')

},

}]);
//# sourceMappingURL=modes_usAnnotation_src_index_ts.js.map