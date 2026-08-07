"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["modes_longitudinal_src_index_ts"], {
"../../../modes/longitudinal/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../modes/longitudinal/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/longitudinal/src/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  extensionDependencies: () => (extensionDependencies),
  initToolGroups: () => (/* reexport safe */ _ohif_mode_basic__rspack_import_2.initToolGroups),
  longitudinalInstance: () => (longitudinalInstance),
  longitudinalRoute: () => (longitudinalRoute),
  modeInstance: () => (modeInstance),
  tracked: () => (tracked)
});
/* import */ var i18next__rspack_import_0 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* import */ var _id__rspack_import_1 = __webpack_require__("../../../modes/longitudinal/src/id.js");
/* import */ var _ohif_mode_basic__rspack_import_2 = __webpack_require__("../../../modes/basic/src/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };



const tracked = {
  measurements: '@ohif/extension-measurement-tracking.panelModule.trackedMeasurements',
  thumbnailList: '@ohif/extension-measurement-tracking.panelModule.seriesList',
  viewport: '@ohif/extension-measurement-tracking.viewportModule.cornerstone-tracked'
};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  ..._ohif_mode_basic__rspack_import_2.extensionDependencies,
  '@ohif/extension-measurement-tracking': '^3.0.0'
};
const longitudinalInstance = {
  ..._ohif_mode_basic__rspack_import_2.basicLayout,
  id: _ohif_mode_basic__rspack_import_2.ohif.layout,
  props: {
    ..._ohif_mode_basic__rspack_import_2.basicLayout.props,
    // Literal panel lists; the mode route seeds them into the standard
    // `leftPanels` / `rightPanels` customizations so `mode` phase
    // blocks and global customizations can modify them.
    leftPanels: [tracked.thumbnailList],
    rightPanels: [_ohif_mode_basic__rspack_import_2.cornerstone.segmentation, tracked.measurements],
    viewports: [{
      namespace: tracked.viewport,
      // Re-use the display sets from basic
      displaySetsToDisplay: _ohif_mode_basic__rspack_import_2.basicLayout.props.viewports["0"].displaySetsToDisplay
    }, ..._ohif_mode_basic__rspack_import_2.basicLayout.props.viewports]
  }
};
const longitudinalRoute = {
  ..._ohif_mode_basic__rspack_import_2.basicRoute,
  path: 'longitudinal',
  /*init: ({ servicesManager, extensionManager }) => {
          //defaultViewerRouteInit
        },*/
  layoutInstance: longitudinalInstance
};
const modeInstance = {
  ..._ohif_mode_basic__rspack_import_2.modeInstance,
  // TODO: We're using this as a route segment
  // We should not be.
  id: _id__rspack_import_1.id,
  routeName: 'viewer',
  displayName: i18next__rspack_import_0["default"].t('Modes:Basic Viewer'),
  routes: [longitudinalRoute],
  extensions: extensionDependencies
};
const mode = {
  ..._ohif_mode_basic__rspack_import_2.mode,
  id: _id__rspack_import_1.id,
  modeInstance,
  extensionDependencies
};
/* export default */ const __rspack_default_export = (mode);

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../modes/longitudinal/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/mode-longitudinal","version":"3.14.0-beta.7","description":"Longitudinal Workflow","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-longitudinal.js","module":"src/index.ts","engines":{"node":">=24"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:cornerstone":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/extension-cornerstone":"workspace:*","@ohif/extension-cornerstone-dicom-rt":"workspace:*","@ohif/extension-cornerstone-dicom-seg":"workspace:*","@ohif/extension-cornerstone-dicom-sr":"workspace:*","@ohif/extension-default":"workspace:*","@ohif/extension-dicom-pdf":"workspace:*","@ohif/extension-dicom-video":"workspace:*","@ohif/extension-measurement-tracking":"workspace:*","@ohif/mode-basic":"workspace:*"},"dependencies":{"@babel/runtime":"7.29.7","i18next":"17.3.1"},"devDependencies":{"cross-env":"7.0.3","webpack-merge":"5.10.0"},"keywords":["ohif-mode"]}')

},

}]);
//# sourceMappingURL=modes_longitudinal_src_index_ts.js.map