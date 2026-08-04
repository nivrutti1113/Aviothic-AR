"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_dicom-video_src_index_tsx"], {
"../../../extensions/dicom-video/src/getSopClassHandlerModule.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (getSopClassHandlerModule)
});
/* import */ var _id__rspack_import_0 = __webpack_require__("../../../extensions/dicom-video/src/id.js");
/* import */ var _ohif_core__rspack_import_1 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_i18n__rspack_import_2 = __webpack_require__("../../i18n/src/index.js");
/* import */ var _cornerstonejs_core__rspack_import_3 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");




const SOP_CLASS_UIDS = {
  VIDEO_MICROSCOPIC_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.2.1',
  VIDEO_PHOTOGRAPHIC_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.4.1',
  VIDEO_ENDOSCOPIC_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.1.1',
  /** Need to use fallback, could be video or image */
  SECONDARY_CAPTURE_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.7',
  MULTIFRAME_TRUE_COLOR_SECONDARY_CAPTURE_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.7.4'
};
const sopClassUids = Object.values(SOP_CLASS_UIDS);
const secondaryCaptureSopClassUids = [SOP_CLASS_UIDS.SECONDARY_CAPTURE_IMAGE_STORAGE, SOP_CLASS_UIDS.MULTIFRAME_TRUE_COLOR_SECONDARY_CAPTURE_IMAGE_STORAGE];
const SupportedTransferSyntaxes = {
  MPEG4_AVC_264_HIGH_PROFILE: '1.2.840.10008.1.2.4.102',
  MPEG4_AVC_264_BD_COMPATIBLE_HIGH_PROFILE: '1.2.840.10008.1.2.4.103',
  MPEG4_AVC_264_HIGH_PROFILE_FOR_2D_VIDEO: '1.2.840.10008.1.2.4.104',
  MPEG4_AVC_264_HIGH_PROFILE_FOR_3D_VIDEO: '1.2.840.10008.1.2.4.105',
  MPEG4_AVC_264_STEREO_HIGH_PROFILE: '1.2.840.10008.1.2.4.106',
  HEVC_265_MAIN_PROFILE: '1.2.840.10008.1.2.4.107',
  HEVC_265_MAIN_10_PROFILE: '1.2.840.10008.1.2.4.108'
};
const supportedTransferSyntaxUIDs = Object.values(SupportedTransferSyntaxes);
const _getDisplaySetsFromSeries = (instances, servicesManager, extensionManager) => {
  const dataSource = extensionManager.getActiveDataSource()[0];
  const thumbnailSrc = null;
  console.warn('dataSource=', dataSource);
  return instances.filter(metadata => {
    const tsuid = metadata.AvailableTransferSyntaxUID || metadata.TransferSyntaxUID || metadata['00083002'];
    if (supportedTransferSyntaxUIDs.includes(tsuid)) {
      return true;
    }
    if (metadata.SOPClassUID === SOP_CLASS_UIDS.VIDEO_PHOTOGRAPHIC_IMAGE_STORAGE) {
      return true;
    }

    // Assume that an instance with one of the secondary capture SOPClassUIDs and
    // with at least 90 frames (i.e. typically 3 seconds of video) is indeed a video.
    return secondaryCaptureSopClassUids.includes(metadata.SOPClassUID) && metadata.NumberOfFrames >= 90;
  }).map(instance => {
    const {
      Modality,
      SOPInstanceUID,
      SeriesDescription = 'VIDEO',
      imageId
    } = instance;
    const {
      SeriesNumber,
      SeriesDate,
      SeriesInstanceUID,
      StudyInstanceUID,
      NumberOfFrames,
      url
    } = instance;
    const videoUrlParams = {
      instance,
      singlepart: 'video',
      tag: 'PixelData',
      url
    };
    const videoUrl = dataSource.retrieve.directURL(videoUrlParams);
    const getVideoUrl = dataSource.retrieve.renderedURL ? options => dataSource.retrieve.renderedURL({
      ...videoUrlParams,
      url: videoUrl
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
      referencedImages: null,
      measurements: null,
      videoUrl,
      getVideoUrl,
      viewportType: _cornerstonejs_core__rspack_import_3.Enums.ViewportType.VIDEO,
      instances: [instance],
      getThumbnailSrc: dataSource.retrieve.getGetThumbnailSrc?.(instance),
      thumbnailSrc,
      imageIds: [imageId],
      isDerivedDisplaySet: true,
      isLoaded: false,
      sopClassUids,
      numImageFrames: NumberOfFrames,
      instance,
      supportsWindowLevel: true,
      label: SeriesDescription || `${_ohif_i18n__rspack_import_2["default"].t('Series')} ${SeriesNumber} - ${_ohif_i18n__rspack_import_2["default"].t(Modality)}`
    };
    _cornerstonejs_core__rspack_import_3.utilities.genericMetadataProvider.add(imageId, {
      type: 'imageUrlModule',
      metadata: {
        rendered: videoUrl
      }
    });
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
    name: 'dicom-video',
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/dicom-video/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SOPClassHandlerId: () => (SOPClassHandlerId),
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../extensions/dicom-video/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const id = _package_json__rspack_import_0.name;
const SOPClassHandlerId = `${id}.sopClassHandlerModule.dicom-video`;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/dicom-video/src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _getSopClassHandlerModule__rspack_import_0 = __webpack_require__("../../../extensions/dicom-video/src/getSopClassHandlerModule.js");
/* import */ var _id__rspack_import_1 = __webpack_require__("../../../extensions/dicom-video/src/id.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");



/**
 *
 */
const dicomVideoExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__rspack_import_1.id,
  getSopClassHandlerModule: _getSopClassHandlerModule__rspack_import_0["default"]
};
/* export default */ const __rspack_default_export = (dicomVideoExtension);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/dicom-video/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/extension-dicom-video","version":"3.14.0-beta.7","description":"OHIF extension for video display","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-dicom-video.umd.js","module":"src/index.tsx","engines":{"node":">=24"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package-1":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/ui":"workspace:*","dcmjs":"0.52.0","dicom-parser":"1.8.21","hammerjs":"2.0.8","prop-types":"15.8.1","react":"18.3.1"},"dependencies":{"@babel/runtime":"7.29.7","classnames":"2.5.1"},"devDependencies":{"cross-env":"7.0.3"}}')

},

}]);
//# sourceMappingURL=extensions_dicom-video_src_index_tsx.js.map