"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_cornerstone-dicom-pmap_src_index_tsx"], {
"../../../extensions/cornerstone-dicom-pmap/src/getSopClassHandlerModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _ohif_core__rspack_import_0 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_i18n__rspack_import_1 = __webpack_require__("../../i18n/src/index.js");
/* import */ var _cornerstonejs_core__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _cornerstonejs_adapters__rspack_import_3 = __webpack_require__("../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* import */ var _id__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone-dicom-pmap/src/id.js");
/* import */ var _ohif_extension_cornerstone__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");






const sopClassUids = ['1.2.840.10008.5.1.4.1.1.30'];
function _getDisplaySetsFromSeries(instances, servicesManager, extensionManager) {
  const instance = instances[0];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPClassUID,
    wadoRoot,
    wadoUri,
    wadoUriRoot
  } = instance;
  const displaySet = {
    // Parametric map use to have the same modality as its referenced volume but
    // "PMAP" is used in the viewer even though this is not a valid DICOM modality
    Modality: 'PMAP',
    isReconstructable: true,
    // by default for now
    displaySetInstanceUID: `pmap.${_ohif_core__rspack_import_0.utils.guid()}`,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: _id__rspack_import_4.SOPClassHandlerId,
    SOPClassUID,
    referencedImages: null,
    referencedSeriesInstanceUID: null,
    referencedDisplaySetInstanceUID: null,
    referencedVolumeURI: null,
    referencedVolumeId: null,
    isDerivedDisplaySet: true,
    loadStatus: {
      loading: false,
      loaded: false
    },
    sopClassUids,
    instance,
    instances: [instance],
    wadoRoot,
    wadoUriRoot,
    wadoUri,
    supportsWindowLevel: true,
    label: SeriesDescription || `${_ohif_i18n__rspack_import_1["default"].t('Series')} ${SeriesNumber} - ${_ohif_i18n__rspack_import_1["default"].t('PMAP')}`
  };
  const referencedSeriesSequence = instance.ReferencedSeriesSequence;
  if (!referencedSeriesSequence) {
    console.error('ReferencedSeriesSequence is missing for the parametric map');
    return;
  }
  const referencedSeries = referencedSeriesSequence[0] || referencedSeriesSequence;
  displaySet.referencedImages = instance.ReferencedSeriesSequence.ReferencedInstanceSequence;
  displaySet.referencedSeriesInstanceUID = referencedSeries.SeriesInstanceUID;

  // Does not get the referenced displaySet during parametric displaySet creation
  // because it is still not available (getDisplaySetByUID returns `undefined`).
  displaySet.getReferenceDisplaySet = () => {
    const {
      displaySetService
    } = servicesManager.services;
    if (displaySet.referencedDisplaySetInstanceUID) {
      return displaySetService.getDisplaySetByUID(displaySet.referencedDisplaySetInstanceUID);
    }
    const referencedDisplaySets = displaySetService.getDisplaySetsForSeries(displaySet.referencedSeriesInstanceUID);
    if (!referencedDisplaySets || referencedDisplaySets.length === 0) {
      throw new Error('Referenced displaySet is missing for the parametric map');
    }
    const referencedDisplaySet = referencedDisplaySets[0];
    displaySet.referencedDisplaySetInstanceUID = referencedDisplaySet.displaySetInstanceUID;
    return referencedDisplaySet;
  };

  // Does not get the referenced volumeId during parametric displaySet creation because the
  // referenced displaySet is still not available  (getDisplaySetByUID returns `undefined`).
  displaySet.getReferencedVolumeId = () => {
    if (displaySet.referencedVolumeId) {
      return displaySet.referencedVolumeId;
    }
    const referencedDisplaySet = displaySet.getReferenceDisplaySet();
    const referencedVolumeURI = referencedDisplaySet.displaySetInstanceUID;
    const referencedVolumeId = `${_ohif_extension_cornerstone__rspack_import_5.VOLUME_LOADER_SCHEME}:${referencedVolumeURI}`;
    displaySet.referencedVolumeURI = referencedVolumeURI;
    displaySet.referencedVolumeId = referencedVolumeId;
    return referencedVolumeId;
  };
  displaySet.load = async ({
    headers
  }) => await _load(displaySet, servicesManager, extensionManager, headers);
  return [displaySet];
}
const getRangeFromPixelData = pixelData => {
  let lowest = pixelData[0];
  let highest = pixelData[0];
  for (let i = 1; i < pixelData.length; i++) {
    if (pixelData[i] < lowest) {
      lowest = pixelData[i];
    }
    if (pixelData[i] > highest) {
      highest = pixelData[i];
    }
  }
  return [lowest, highest];
};
async function _load(displaySet, servicesManager, extensionManager, headers) {
  const volumeId = `${_ohif_extension_cornerstone__rspack_import_5.VOLUME_LOADER_SCHEME}:${displaySet.displaySetInstanceUID}`;
  const volumeLoadObject = _cornerstonejs_core__rspack_import_2.cache.getVolumeLoadObject(volumeId);
  if (volumeLoadObject) {
    return volumeLoadObject.promise;
  }
  displaySet.loading = true;
  displaySet.isLoaded = false;

  // We don't want to fire multiple loads, so we'll wait for the first to finish
  // and also return the same promise to any other callers.
  const promise = _loadParametricMap({
    extensionManager,
    displaySet,
    headers
  });
  _cornerstonejs_core__rspack_import_2.cache.putVolumeLoadObject(volumeId, {
    promise
  }).catch(err => {
    throw err;
  });
  promise.then(() => {
    displaySet.loading = false;
    displaySet.isLoaded = true;
    // Broadcast that loading is complete
    servicesManager.services.segmentationService._broadcastEvent(servicesManager.services.segmentationService.EVENTS.SEGMENTATION_LOADING_COMPLETE, {
      pmapDisplaySet: displaySet
    });
  }).catch(err => {
    displaySet.loading = false;
    displaySet.isLoaded = false;
    throw err;
  });
  return promise;
}
async function _loadParametricMap({
  displaySet,
  headers
}) {
  const arrayBuffer = await _ohif_extension_cornerstone__rspack_import_5.dicomLoaderService.findDicomDataPromise(displaySet, null, headers);
  const referencedVolumeId = displaySet.getReferencedVolumeId();
  const cachedReferencedVolume = _cornerstonejs_core__rspack_import_2.cache.getVolume(referencedVolumeId);

  // Parametric map can be loaded only if its referenced volume exists otherwise it will fail
  if (!cachedReferencedVolume) {
    throw new Error('Referenced Volume is missing for the PMAP, and stack viewport PMAP is not supported yet');
  }
  const {
    imageIds
  } = cachedReferencedVolume;
  const results = await _cornerstonejs_adapters__rspack_import_3.adaptersPMAP.Cornerstone3D.ParametricMap.generateToolState(imageIds, arrayBuffer, _cornerstonejs_core__rspack_import_2.metaData);
  const {
    pixelData
  } = results;
  const TypedArrayConstructor = pixelData.constructor;
  const paramMapId = displaySet.displaySetInstanceUID;
  const derivedVolume = await _cornerstonejs_core__rspack_import_2.volumeLoader.createAndCacheDerivedVolume(referencedVolumeId, {
    volumeId: paramMapId,
    targetBuffer: {
      type: TypedArrayConstructor.name
    }
  });
  const newPixelData = new TypedArrayConstructor(pixelData.length);
  for (let i = 0; i < pixelData.length; i++) {
    newPixelData[i] = pixelData[i] * 100;
  }
  derivedVolume.voxelManager.setCompleteScalarDataArray(newPixelData);
  const range = getRangeFromPixelData(newPixelData);
  const windowLevel = _cornerstonejs_core__rspack_import_2.utilities.windowLevel.toWindowLevel(range[0], range[1]);
  derivedVolume.metadata.voiLut = [windowLevel];
  derivedVolume.loadStatus = {
    loaded: true
  };
  return derivedVolume;
}
function getSopClassHandlerModule(params) {
  const {
    servicesManager,
    extensionManager
  } = params;
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return [{
    name: 'dicom-pmap',
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
/* export default */ const __rspack_default_export = (getSopClassHandlerModule);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-pmap/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SOPClassHandlerId: () => (SOPClassHandlerId),
  SOPClassHandlerName: () => (SOPClassHandlerName),
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone-dicom-pmap/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const id = _package_json__rspack_import_0.name;
const SOPClassHandlerName = 'dicom-pmap';
const SOPClassHandlerId = `${id}.sopClassHandlerModule.${SOPClassHandlerName}`;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-pmap/src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _id__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone-dicom-pmap/src/id.js");
/* import */ var react__rspack_import_1 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _getSopClassHandlerModule__rspack_import_2 = __webpack_require__("../../../extensions/cornerstone-dicom-pmap/src/getSopClassHandlerModule.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}



const Component = /*#__PURE__*/react__rspack_import_1_default().lazy(_c = () => {
  return __webpack_require__.e(/* import() */ "extensions_cornerstone-dicom-pmap_src_viewports_OHIFCornerstonePMAPViewport_tsx").then(__webpack_require__.bind(__webpack_require__, "../../../extensions/cornerstone-dicom-pmap/src/viewports/OHIFCornerstonePMAPViewport.tsx"));
});
_c2 = Component;
const OHIFCornerstonePMAPViewport = props => {
  return /*#__PURE__*/react__rspack_import_1_default().createElement((react__rspack_import_1_default().Suspense), {
    fallback: /*#__PURE__*/react__rspack_import_1_default().createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__rspack_import_1_default().createElement(Component, props));
};

/**
 * You can remove any of the following modules if you don't need them.
 */
_c3 = OHIFCornerstonePMAPViewport;
const extension = {
  id: _id__rspack_import_0.id,
  getViewportModule({
    servicesManager,
    extensionManager,
    commandsManager
  }) {
    const ExtendedOHIFCornerstonePMAPViewport = props => {
      return /*#__PURE__*/react__rspack_import_1_default().createElement(OHIFCornerstonePMAPViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager,
        commandsManager: commandsManager
      }, props));
    };
    return [{
      name: 'dicom-pmap',
      component: ExtendedOHIFCornerstonePMAPViewport
    }];
  },
  getSopClassHandlerModule: _getSopClassHandlerModule__rspack_import_2["default"]
};
/* export default */ const __rspack_default_export = (extension);
var _c, _c2, _c3;
$RefreshReg$(_c, "Component$React.lazy");
$RefreshReg$(_c2, "Component");
$RefreshReg$(_c3, "OHIFCornerstonePMAPViewport");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-pmap/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/extension-cornerstone-dicom-pmap","version":"3.14.0-beta.7","description":"DICOM Parametric Map read workflow","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-cornerstone-dicom-pmap.umd.js","module":"src/index.tsx","engines":{"node":">=24"},"files":["dist/**","public/**","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:dicom-pmap":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package-1":"pnpm run build","start":"pnpm run dev"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/extension-cornerstone":"workspace:*","@ohif/extension-default":"workspace:*","@ohif/i18n":"workspace:*","prop-types":"15.8.1","react":"18.3.1","react-dom":"18.3.1","react-i18next":"12.3.1","react-router":"6.30.3","react-router-dom":"6.30.3"},"dependencies":{"@babel/runtime":"7.29.7","@cornerstonejs/adapters":"5.6.8","@cornerstonejs/core":"5.6.8","@kitware/vtk.js":"36.4.1"},"devDependencies":{"cross-env":"7.0.3"},"keywords":["ohif-extension"]}')

},

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-pmap_src_index_tsx.js.map