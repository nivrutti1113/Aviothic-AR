"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_dicom-pdf_src_index_tsx"], {
"../../../extensions/dicom-pdf/src/getSopClassHandlerModule.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (getSopClassHandlerModule)
});
/* import */ var _id__rspack_import_0 = __webpack_require__("../../../extensions/dicom-pdf/src/id.js");
/* import */ var _ohif_core__rspack_import_1 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_i18n__rspack_import_2 = __webpack_require__("../../i18n/src/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");



const SOP_CLASS_UIDS = {
  ENCAPSULATED_PDF: '1.2.840.10008.5.1.4.1.1.104.1'
};
const sopClassUids = Object.values(SOP_CLASS_UIDS);
const _getDisplaySetsFromSeries = (instances, servicesManager, extensionManager) => {
  const dataSource = extensionManager.getActiveDataSource()[0];
  return instances.map(instance => {
    const {
      Modality,
      SOPInstanceUID
    } = instance;
    const {
      SeriesDescription = 'PDF',
      MIMETypeOfEncapsulatedDocument
    } = instance;
    const {
      SeriesNumber,
      SeriesDate,
      SeriesInstanceUID,
      StudyInstanceUID,
      SOPClassUID
    } = instance;
    const renderedUrlParams = {
      instance,
      tag: 'EncapsulatedDocument',
      defaultType: MIMETypeOfEncapsulatedDocument || 'application/pdf',
      singlepart: 'pdf'
    };
    const renderedUrl = dataSource.retrieve.directURL(renderedUrlParams);
    const getRenderedUrl = dataSource.retrieve.renderedURL ? options => dataSource.retrieve.renderedURL({
      ...renderedUrlParams,
      url: renderedUrl
    }, options) : undefined;
    const displaySet = {
      //plugin: id,
      Modality,
      displaySetInstanceUID: _ohif_core__rspack_import_1.utils.guid(),
      SeriesDescription,
      SeriesNumber,
      SeriesDate,
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID,
      SOPClassHandlerId: _id__rspack_import_0.SOPClassHandlerId,
      SOPClassUID,
      referencedImages: null,
      measurements: null,
      renderedUrl: renderedUrl,
      getRenderedUrl,
      instances: [instance],
      thumbnailSrc: null,
      isDerivedDisplaySet: true,
      isLoaded: false,
      sopClassUids,
      numImageFrames: 0,
      numInstances: 1,
      instance,
      supportsWindowLevel: true,
      label: SeriesDescription || `${_ohif_i18n__rspack_import_2["default"].t('Series')} ${SeriesNumber} - ${_ohif_i18n__rspack_import_2["default"].t(Modality)}`
    };
    return displaySet;
  });
};
function getSopClassHandlerModule(params) {
  const {
    servicesManager,
    extensionManager
  } = params;
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return [{
    name: 'dicom-pdf',
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/dicom-pdf/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SOPClassHandlerId: () => (SOPClassHandlerId),
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../extensions/dicom-pdf/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const id = _package_json__rspack_import_0.name;
const SOPClassHandlerId = `${id}.sopClassHandlerModule.dicom-pdf`;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/dicom-pdf/src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _getSopClassHandlerModule__rspack_import_1 = __webpack_require__("../../../extensions/dicom-pdf/src/getSopClassHandlerModule.js");
/* import */ var _id_js__rspack_import_2 = __webpack_require__("../../../extensions/dicom-pdf/src/id.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");



const Component = /*#__PURE__*/react__rspack_import_0_default().lazy(_c = () => {
  return __webpack_require__.e(/* import() */ "extensions_dicom-pdf_src_viewports_OHIFCornerstonePdfViewport_tsx").then(__webpack_require__.bind(__webpack_require__, "../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.tsx"));
});
_c2 = Component;
const OHIFCornerstonePdfViewport = props => {
  return /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Suspense), {
    fallback: /*#__PURE__*/react__rspack_import_0_default().createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(Component, props));
};

/**
 *
 */
_c3 = OHIFCornerstonePdfViewport;
const dicomPDFExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id_js__rspack_import_2.id,
  /**
   *
   *
   * @param {object} [configuration={}]
   * @param {object|array} [configuration.csToolsConfig] - Passed directly to `initCornerstoneTools`
   */
  getViewportModule() {
    const ExtendedOHIFCornerstonePdfViewport = props => {
      return /*#__PURE__*/react__rspack_import_0_default().createElement(OHIFCornerstonePdfViewport, props);
    };
    return [{
      name: 'dicom-pdf',
      component: ExtendedOHIFCornerstonePdfViewport
    }];
  },
  getSopClassHandlerModule: _getSopClassHandlerModule__rspack_import_1["default"]
};
/* export default */ const __rspack_default_export = (dicomPDFExtension);
var _c, _c2, _c3;
$RefreshReg$(_c, "Component$React.lazy");
$RefreshReg$(_c2, "Component");
$RefreshReg$(_c3, "OHIFCornerstonePdfViewport");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/dicom-pdf/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/extension-dicom-pdf","version":"3.14.0-beta.7","description":"OHIF extension for PDF display","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-dicom-pdf.umd.js","module":"src/index.tsx","engines":{"node":">=24"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package-1":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/ui":"workspace:*","dcmjs":"0.52.0","dicom-parser":"1.8.21","hammerjs":"2.0.8","prop-types":"15.8.1","react":"18.3.1"},"dependencies":{"@babel/runtime":"7.29.7","classnames":"2.5.1"},"devDependencies":{"cross-env":"7.0.3"}}')

},

}]);
//# sourceMappingURL=extensions_dicom-pdf_src_index_tsx.js.map