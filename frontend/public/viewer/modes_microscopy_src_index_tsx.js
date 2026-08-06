"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["modes_microscopy_src_index_tsx"], {
"../../../modes/microscopy/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../modes/microscopy/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = 

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/microscopy/src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  cornerstone: () => (cornerstone),
  "default": () => (__rspack_default_export)
});
/* import */ var i18next__rspack_import_0 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* import */ var _id__rspack_import_1 = __webpack_require__("../../../modes/microscopy/src/id.js");
/* import */ var _toolbarButtons__rspack_import_2 = __webpack_require__("../../../modes/microscopy/src/toolbarButtons.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = 



const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  hangingProtocols: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-default.panelModule.seriesList',
  rightPanel: '@ohif/extension-dicom-microscopy.panelModule.measure'
};
const cornerstone = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone'
};
const dicomvideo = {
  sopClassHandler: '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video'
};
const dicompdf = {
  sopClassHandler: '@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf',
  viewport: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf'
};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1',
  '@ohif/extension-dicom-microscopy': '^3.0.0'
};
function modeFactory({
  modeConfiguration
}) {
  return {
    id: _id__rspack_import_1.id,
    routeName: 'microscopy',
    displayName: i18next__rspack_import_0["default"].t('Modes:Microscopy'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: ({
      servicesManager
    }) => {
      const {
        toolbarService
      } = servicesManager.services;
      toolbarService.register(_toolbarButtons__rspack_import_2["default"]);
      toolbarService.updateSection('primary', ['MeasurementTools', 'dragPan', 'TagBrowser']);
      toolbarService.updateSection('MeasurementTools', ['line', 'point', 'polygon', 'circle', 'box', 'freehandpolygon', 'freehandline']);
    },
    onModeExit: ({
      servicesManager
    }) => {
      const {
        toolbarService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      uiDialogService.hideAll();
      uiModalService.hide();
      toolbarService.reset();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: ({
      modalities
    }) => {
      const modalities_list = modalities.split('\\');
      return {
        valid: modalities_list.includes('SM'),
        description: 'Microscopy mode only supports the SM modality'
      };
    },
    routes: [{
      path: 'microscopy',
      layoutTemplate: ({
        location,
        servicesManager
      }) => {
        return {
          id: ohif.layout,
          props: {
            leftPanels: [ohif.leftPanel],
            leftPanelResizable: true,
            leftPanelClosed: true,
            // we have problem with rendering thumbnails for microscopy images
            // rightPanelClosed: true, // we do not have the save microscopy measurements yet
            rightPanels: [ohif.rightPanel],
            rightPanelResizable: true,
            viewports: [{
              namespace: '@ohif/extension-dicom-microscopy.viewportModule.microscopy-dicom',
              displaySetsToDisplay: [
              // Share the sop class handler with cornerstone version of it
              '@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler', '@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySRSopClassHandler', '@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopyANNSopClassHandler']
            }, {
              namespace: cornerstone.viewport,
              displaySetsToDisplay: [dicomvideo.sopClassHandler]
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
    sopClassHandlers: ['@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler', '@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySRSopClassHandler', '@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopyANNSopClassHandler', dicomvideo.sopClassHandler, dicompdf.sopClassHandler],
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
"../../../modes/microscopy/src/toolbarButtons.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  setToolActiveToolbar: () => (setToolActiveToolbar)
});
/* import */ var i18next__rspack_import_0 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var $ReactRefreshRuntime$ = 

const setToolActiveToolbar = {
  commandName: 'setToolActive',
  commandOptions: {
    toolName: 'line'
  },
  context: 'MICROSCOPY'
};
const toolbarButtons = [{
  id: 'MeasurementTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
}, {
  id: 'line',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-length',
    label: i18next__rspack_import_0["default"].t('Buttons:Line'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Line Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'point',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-point',
    label: i18next__rspack_import_0["default"].t('Buttons:Point'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Point Tool'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'point'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'polygon',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-polygon',
    label: i18next__rspack_import_0["default"].t('Buttons:Polygon'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Polygon Tool'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'polygon'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'circle',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-circle',
    label: i18next__rspack_import_0["default"].t('Buttons:Circle'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Circle Tool'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'circle'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'box',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-rectangle',
    label: i18next__rspack_import_0["default"].t('Buttons:Box'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Box Tool'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'box'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'freehandpolygon',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-freehand-polygon',
    label: i18next__rspack_import_0["default"].t('Buttons:Freehand Polygon'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Freehand Polygon Tool'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'freehandpolygon'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'freehandline',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-freehand-line',
    label: i18next__rspack_import_0["default"].t('Buttons:Freehand Line'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Freehand Line Tool'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'freehandline'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'dragPan',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-move',
    label: i18next__rspack_import_0["default"].t('Buttons:Pan'),
    commands: {
      ...setToolActiveToolbar,
      commandOptions: {
        toolName: 'dragPan'
      }
    },
    evaluate: 'evaluate.microscopyTool'
  }
}, {
  id: 'TagBrowser',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'dicom-tag-browser',
    label: i18next__rspack_import_0["default"].t('Buttons:Dicom Tag Browser'),
    tooltip: i18next__rspack_import_0["default"].t('Buttons:Dicom Tag Browser'),
    commands: 'openDICOMTagViewer',
    evaluate: 'evaluate.action'
  }
}];
/* export default */ const __rspack_default_export = (toolbarButtons);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/microscopy/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/mode-microscopy","version":"3.14.0-beta.7","description":"OHIF mode for DICOM microscopy","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-microscopy.umd.js","module":"src/index.tsx","engines":{"node":">=24"},"files":["dist/**","public/**","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:cornerstone":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/extension-dicom-microscopy":"workspace:*"},"dependencies":{"@babel/runtime":"7.29.7","i18next":"17.3.1"},"devDependencies":{"cross-env":"7.0.3","webpack-merge":"5.10.0"},"keywords":["ohif-mode"]}')

},

}]);
//# sourceMappingURL=modes_microscopy_src_index_tsx.js.map