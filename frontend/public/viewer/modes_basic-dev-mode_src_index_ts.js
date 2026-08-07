"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["modes_basic-dev-mode_src_index_ts"], {
"../../../modes/basic-dev-mode/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../modes/basic-dev-mode/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic-dev-mode/src/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _toolbarButtons__rspack_import_0 = __webpack_require__("../../../modes/basic-dev-mode/src/toolbarButtons.ts");
/* import */ var _id__rspack_import_1 = __webpack_require__("../../../modes/basic-dev-mode/src/id.js");
/* import */ var i18next__rspack_import_2 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };



const configs = {
  Length: {}
  //
};
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  measurements: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList'
};
const cs3d = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone'
};
const dicomsr = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr',
  viewport: '@ohif/extension-cornerstone-dicom-sr.viewportModule.dicom-sr'
};
const dicomvideo = {
  sopClassHandler: '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video'
};
const dicompdf = {
  sopClassHandler: '@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf',
  viewport: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf'
};
const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1'
};
function modeFactory({
  modeConfiguration
}) {
  return {
    id: _id__rspack_import_1.id,
    routeName: 'dev',
    displayName: i18next__rspack_import_2["default"].t('Modes:Basic Dev Viewer'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: ({
      servicesManager,
      extensionManager
    }) => {
      const {
        toolbarService,
        toolGroupService
      } = servicesManager.services;
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
          toolName: toolNames.Bidirectional
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
          toolName: toolNames.CalibrationLine
        }],
        // enabled
        enabled: [{
          toolName: toolNames.ImageOverlayViewer
        }]
        // disabled
      };
      toolGroupService.createToolGroupAndAddTools('default', tools);
      toolbarService.register(_toolbarButtons__rspack_import_0["default"]);
      toolbarService.updateSection('primary', ['MeasurementTools', 'Zoom', 'WindowLevel', 'Pan', 'Layout', 'MoreTools']);
    },
    onModeExit: ({
      servicesManager
    }) => {
      const {
        toolGroupService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: ({
      modalities
    }) => {
      const modalities_list = modalities.split('\\');

      // Slide Microscopy modality not supported by basic mode yet
      return {
        valid: !modalities_list.includes('SM'),
        description: 'The mode does not support the following modalities: SM'
      };
    },
    routes: [{
      path: 'viewer-cs3d',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: ({
        location,
        servicesManager
      }) => {
        return {
          id: ohif.layout,
          props: {
            // TODO: Should be optional, or required to pass empty array for slots?
            leftPanels: [ohif.thumbnailList],
            leftPanelResizable: true,
            rightPanels: [ohif.measurements],
            rightPanelResizable: true,
            viewports: [{
              namespace: cs3d.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler, dicomvideo.sopClassHandler]
            }, {
              namespace: dicompdf.viewport,
              displaySetsToDisplay: [dicompdf.sopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    hangingProtocol: 'default',
    sopClassHandlers: [dicomvideo.sopClassHandler, ohif.sopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler]
  };
}
const mode = {
  id: _id__rspack_import_1.id,
  modeFactory,
  extensionDependencies
};
/* export default */ const __rspack_default_export = (mode);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic-dev-mode/src/toolbarButtons.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  setToolActiveToolbar: () => (setToolActiveToolbar)
});
/* import */ var i18next__rspack_import_0 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

const setToolActiveToolbar = {
  commandName: 'setToolActive',
  commandOptions: {
    toolGroupIds: ['default', 'mpr']
  },
  context: 'CORNERSTONE'
};
const toolbarButtons = [
// sections
{
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
},
// tool defs
{
  id: 'Length',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-length',
    label: i18next__rspack_import_0["default"].t('Buttons:Length'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Length Tool'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'Length'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Bidirectional',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-bidirectional',
    label: i18next__rspack_import_0["default"].t('Buttons:Bidirectional'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Bidirectional Tool'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'Bidirectional'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'EllipticalROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-ellipse',
    label: i18next__rspack_import_0["default"].t('Buttons:Ellipse'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Ellipse ROI'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'EllipticalROI'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'CircleROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-circle',
    label: i18next__rspack_import_0["default"].t('Buttons:Circle'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Circle Tool'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'CircleROI'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-zoom',
    label: i18next__rspack_import_0["default"].t('Buttons:Zoom'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Zoom'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'Zoom'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Pan',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-move',
    label: i18next__rspack_import_0["default"].t('Buttons:Pan'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Pan'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'Pan'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Capture',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-capture',
    label: i18next__rspack_import_0["default"].t('Buttons:Capture'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Capture'),
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
  id: 'Reset',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-reset',
    label: i18next__rspack_import_0["default"].t('Buttons:Reset View'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Reset View'),
    commands: 'resetViewport',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'RotateRight',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rotate-right',
    label: i18next__rspack_import_0["default"].t('Buttons:Rotate Right'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Rotate Right +90'),
    commands: 'rotateViewportCW',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'FlipHorizontal',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-flip-horizontal',
    label: i18next__rspack_import_0["default"].t('Buttons:Flip Horizontally'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Flip Horizontally'),
    commands: 'flipViewportHorizontal',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'StackScroll',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-stack-scroll',
    label: i18next__rspack_import_0["default"].t('Buttons:Stack Scroll'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Stack Scroll'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'StackScroll'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Invert',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-invert',
    label: i18next__rspack_import_0["default"].t('Buttons:Invert Colors'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Invert Colors'),
    commands: 'invertViewport',
    evaluate: 'evaluate.action'
  }
}, {
  id: 'CalibrationLine',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-calibration',
    label: i18next__rspack_import_0["default"].t('Buttons:Calibration Line'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Calibration Line'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        ...setToolActiveToolbar.commandOptions,
        toolName: 'CalibrationLine'
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}];
/* export default */ const __rspack_default_export = (toolbarButtons);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/basic-dev-mode/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/mode-basic-dev-mode","version":"3.14.0-beta.7","description":"Basic OHIF Viewer Using Cornerstone","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-basic-dev-mode.umd.js","module":"src/index.ts","engines":{"node":">=24"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:cornerstone":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/extension-cornerstone":"workspace:*","@ohif/extension-cornerstone-dicom-sr":"workspace:*","@ohif/extension-default":"workspace:*","@ohif/extension-dicom-pdf":"workspace:*","@ohif/extension-dicom-video":"workspace:*"},"dependencies":{"@babel/runtime":"7.29.7","i18next":"17.3.1"},"devDependencies":{"cross-env":"7.0.3","webpack-merge":"5.10.0"}}')

},

}]);
//# sourceMappingURL=modes_basic-dev-mode_src_index_ts.js.map