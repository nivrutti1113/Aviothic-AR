"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_cornerstone-dicom-seg_src_index_tsx"], {
"../../../extensions/cornerstone-dicom-seg/src/commandsModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var dcmjs__rspack_import_0 = __webpack_require__("../../../node_modules/dcmjs/build/dcmjs.es.js");
/* import */ var _cornerstonejs_core__rspack_import_1 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _cornerstonejs_tools__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* import */ var _cornerstonejs_adapters__rspack_import_3 = __webpack_require__("../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* import */ var _ohif_extension_default__rspack_import_4 = __webpack_require__("../../../extensions/default/src/index.ts");
/* import */ var _default_src_utils_shared_PROMPT_RESPONSES__rspack_import_5 = __webpack_require__("../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts");
/* import */ var _utils_segmentationConfig__rspack_import_6 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/utils/segmentationConfig.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");







const getTargetViewport = ({
  viewportId,
  viewportGridService
}) => {
  const {
    viewports,
    activeViewportId
  } = viewportGridService.getState();
  const targetViewportId = viewportId || activeViewportId;
  const viewport = viewports.get(targetViewportId);
  return viewport;
};
const {
  Cornerstone3D: {
    Segmentation: {
      generateSegmentation
    }
  }
} = _cornerstonejs_adapters__rspack_import_3.adaptersSEG;
const {
  Cornerstone3D: {
    RTSS: {
      generateRTSSFromRepresentation
    }
  }
} = _cornerstonejs_adapters__rspack_import_3.adaptersRT;
const commandsModule = ({
  servicesManager,
  extensionManager,
  commandsManager
}) => {
  const {
    segmentationService,
    displaySetService,
    viewportGridService,
    customizationService
  } = servicesManager.services;
  const actions = {
    /**
     * Loads segmentations for a specified viewport.
     * The function prepares the viewport for rendering, then loads the segmentation details.
     * Additionally, if the segmentation has scalar data, it is set for the corresponding label map volume.
     *
     * @param {Object} params - Parameters for the function.
     * @param params.segmentations - Array of segmentations to be loaded.
     * @param params.viewportId - the target viewport ID.
     *
     */
    loadSegmentationsForViewport: async ({
      segmentations,
      viewportId
    }) => {
      // Todo: handle adding more than one segmentation
      const viewport = getTargetViewport({
        viewportId,
        viewportGridService
      });
      const displaySetInstanceUID = viewport.displaySetInstanceUIDs[0];
      const segmentation = segmentations[0];
      const segmentationId = segmentation.segmentationId;
      const label = segmentation.config.label;
      const segments = segmentation.config.segments;
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      await segmentationService.createLabelmapForDisplaySet(displaySet, {
        segmentationId,
        segments,
        label
      });
      segmentationService.addOrUpdateSegmentation(segmentation);
      await segmentationService.addSegmentationRepresentation(viewport.viewportId, {
        segmentationId
      });
      return segmentationId;
    },
    /**
     * Generates a segmentation from a given segmentation ID.
     * This function retrieves the associated segmentation and
     * its referenced volume, extracts label maps from the
     * segmentation volume, and produces segmentation data
     * alongside associated metadata.
     *
     * @param {Object} params - Parameters for the function.
     * @param params.segmentationId - ID of the segmentation to be generated.
     * @param params.options - Optional configuration for the generation process.
     *
     * @returns Returns the generated segmentation data.
     */
    generateSegmentation: ({
      segmentationId,
      options = {}
    }) => {
      // `dataSource` (a data source name) is consumed here to resolve the store
      // overrides; it must not be forwarded to the adapter's generateSegmentation.
      const {
        dataSource: dataSourceName,
        ...generateOptions
      } = options;
      const segmentation = _cornerstonejs_tools__rspack_import_2.segmentation.state.getSegmentation(segmentationId);
      const predecessorImageId = generateOptions.predecessorImageId ?? segmentation.predecessorImageId;

      // A data source may override the app-wide `segmentation.store.*` defaults
      // via `configuration.segmentation.store` (different back ends support
      // different SEG encodings). Use the named target data source when storing,
      // otherwise the active one (e.g. download).
      const dataSourceDefinition = dataSourceName ? extensionManager.getDataSourceDefinition(dataSourceName) : extensionManager.getActiveDataSourceDefinition();
      const dataSourceStoreOverride = dataSourceDefinition?.configuration?.segmentation?.store;
      const labelmapData = segmentation.representationData.Labelmap;

      // Build a labelmap3D (one labelmaps2D entry per source slice) from a list of
      // derived labelmap image ids. When `referencedImageIds` is supplied (the
      // multi-layer/overlap path) each frame is indexed by its source slice so the
      // layers align to the same frames; otherwise frames are sequential (the legacy
      // single-layer behavior, kept byte-identical).
      const buildLabelmap3D = (segImageIds, metadata, referencedImageIds) => {
        const segImages = segImageIds.map(imageId => _cornerstonejs_core__rspack_import_1.cache.getImage(imageId));
        const labelmaps2D = [];

        // Map each source imageId to its frame index once (O(n)) so the per-slice lookup
        // below is O(1) — avoids the O(slices^2) indexOf scan on the multi-layer path.
        const referencedFrameIndexById = referencedImageIds ? new Map(referencedImageIds.map((imageId, index) => [imageId, index])) : undefined;
        let z = 0;
        for (const segImage of segImages) {
          const segmentsOnLabelmap = new Set();
          const pixelData = segImage.getPixelData();
          const {
            rows,
            columns
          } = segImage;

          // Use a single pass through the pixel data
          for (let i = 0; i < pixelData.length; i++) {
            const segment = pixelData[i];
            if (segment !== 0) {
              segmentsOnLabelmap.add(segment);
            }
          }
          const frameIndex = referencedFrameIndexById ? referencedFrameIndexById.get(segImage.referencedImageId) ?? -1 : z++;
          if (frameIndex < 0) {
            continue;
          }
          labelmaps2D[frameIndex] = {
            segmentsOnLabelmap: Array.from(segmentsOnLabelmap),
            pixelData,
            rows,
            columns
          };
        }
        const allSegmentsOnLabelmap = labelmaps2D.filter(Boolean).map(labelmap => labelmap.segmentsOnLabelmap);
        return {
          segmentsOnLabelmap: Array.from(new Set(allSegmentsOnLabelmap.flat())),
          metadata,
          labelmaps2D
        };
      };

      // Segment metadata (shared across all layers).
      const segmentationInOHIF = segmentationService.getSegmentation(segmentationId);
      const representations = segmentationService.getRepresentationsForSegmentation(segmentationId);
      const metadata = [];
      Object.entries(segmentationInOHIF.segments).forEach(([segmentIndex, segment]) => {
        // segmentation service already has a color for each segment
        if (!segment) {
          return;
        }
        const {
          label
        } = segment;
        const firstRepresentation = representations[0];
        const color = segmentationService.getSegmentColor(firstRepresentation.viewportId, segmentationId, segment.segmentIndex);
        const RecommendedDisplayCIELabValue = dcmjs__rspack_import_0["default"].data.Colors.rgb2DICOMLAB(color.slice(0, 3).map(value => value / 255)).map(value => Math.round(value));
        metadata[segmentIndex] = {
          SegmentNumber: segmentIndex.toString(),
          SegmentLabel: label,
          SegmentAlgorithmType: segment?.algorithmType || 'MANUAL',
          SegmentAlgorithmName: segment?.algorithmName || 'OHIF Brush',
          RecommendedDisplayCIELabValue,
          SegmentedPropertyCategoryCodeSequence: {
            CodeValue: 'T-D0050',
            CodingSchemeDesignator: 'SRT',
            CodeMeaning: 'Tissue'
          },
          SegmentedPropertyTypeCodeSequence: {
            CodeValue: 'T-D0050',
            CodingSchemeDesignator: 'SRT',
            CodeMeaning: 'Tissue'
          }
        };
      });

      // Multi-layer (overlapping) SEGs register one labelmap layer per conflict-free
      // group. Export each layer as its own labelmap3D against the UNIQUE referenced
      // source series, so cornerstone writes overlapping segments as separate frames
      // that reference the same source slice (the DICOM SEG overlap encoding). The
      // cs3D adapter's fillSegmentation accepts an array of labelmap3D for exactly
      // this. Single-layer SEGs keep the original single-labelmap3D path unchanged.
      const layers = labelmapData.labelmaps ? Object.values(labelmapData.labelmaps) : undefined;

      // The referenced source images must be fully loaded (in cache) before we can
      // build the SEG dataset against them; fail loudly rather than passing undefined
      // frames to the adapter.
      const resolveReferencedImage = (referencedImageId, sliceIndex) => {
        const referencedImage = _cornerstonejs_core__rspack_import_1.cache.getImage(referencedImageId);
        if (!referencedImage) {
          throw new Error(`Referenced source image not in cache for segmentation slice ${sliceIndex} ` + `(referencedImageId: ${referencedImageId}). Ensure the referenced series is fully loaded before storing.`);
        }
        return referencedImage;
      };
      let referencedImages;
      let labelmaps3D;
      if (layers && layers.length > 1) {
        const referencedImageIds = layers[0].referencedImageIds ?? labelmapData.referencedImageIds ?? [];
        referencedImages = referencedImageIds.map(resolveReferencedImage);
        labelmaps3D = layers.map(layer => buildLabelmap3D(layer.imageIds ?? [], metadata, referencedImageIds));
      } else {
        const {
          imageIds
        } = labelmapData;
        const segImages = imageIds.map(imageId => _cornerstonejs_core__rspack_import_1.cache.getImage(imageId));
        referencedImages = segImages.map((image, sliceIndex) => resolveReferencedImage(image.referencedImageId, sliceIndex));
        labelmaps3D = buildLabelmap3D(imageIds, metadata);
      }
      const saveOptions = {
        predecessorImageId,
        ...(0,_utils_segmentationConfig__rspack_import_6.getSegmentationSaveOptions)(customizationService, dataSourceStoreOverride),
        ...generateOptions
      };

      // A LABELMAP SEG frame stores a single label per voxel, so the labelmap
      // encoder cannot represent overlapping segments — it keeps only the last
      // layer written to each voxel. Overlapping segmentations arrive here as
      // multiple layers, so switch those to the binary SEG encoding, which
      // writes overlapping segments as separate frames referencing the same
      // source slice.
      const hasOverlappingLayers = Boolean(layers && layers.length > 1);
      if (hasOverlappingLayers && saveOptions.sopClassUID === _utils_segmentationConfig__rspack_import_6.LABELMAP_SEG_SOP_CLASS_UID) {
        console.warn('generateSegmentation: overlapping segments cannot be stored as a LABELMAP SEG; ' + 'switching to the binary SEG encoding for this store.');
        saveOptions.sopClassUID = _utils_segmentationConfig__rspack_import_6.BITMAP_SEG_SOP_CLASS_UID;
      }
      const generatedSegmentation = generateSegmentation(referencedImages, labelmaps3D, _cornerstonejs_core__rspack_import_1.metaData, saveOptions);
      return generatedSegmentation;
    },
    /**
     * Downloads a segmentation based on the provided segmentation ID.
     * This function retrieves the associated segmentation and
     * uses it to generate the corresponding DICOM dataset, which
     * is then downloaded with an appropriate filename.
     *
     * @param {Object} params - Parameters for the function.
     * @param params.segmentationId - ID of the segmentation to be downloaded.
     *
     */
    downloadSegmentation: ({
      segmentationId
    }) => {
      const segmentationInOHIF = segmentationService.getSegmentation(segmentationId);
      const generatedSegmentation = actions.generateSegmentation({
        segmentationId
      });
      const storeFn = commandsManager.runCommand('createStoreFunction', {
        dataSource: 'download',
        defaultFileName: `${segmentationInOHIF.label}.dcm`
      });
      storeFn(generatedSegmentation.dataset);
    },
    /**
     * Stores a segmentation based on the provided segmentationId into a specified data source.
     * The SeriesDescription is derived from user input or defaults to the segmentation label,
     * and in its absence, defaults to 'Research Derived Series'.
     *
     * @param {Object} params - Parameters for the function.
     * @param params.segmentationId - ID of the segmentation to be stored.
     * @param params.dataSource - Data source where the generated segmentation will be stored.
     *
     * @returns {Object|void} Returns the naturalized report if successfully stored,
     * otherwise throws an error.
     */
    storeSegmentation: async ({
      segmentationId,
      dataSource,
      modality = 'SEG'
    }) => {
      const segmentation = segmentationService.getSegmentation(segmentationId);
      if (!segmentation) {
        throw new Error('No segmentation found');
      }
      const {
        label,
        predecessorImageId
      } = segmentation;
      const {
        value: reportName,
        dataSourceName,
        series,
        priorSeriesNumber,
        action
      } = await (0,_ohif_extension_default__rspack_import_4.createReportDialogPrompt)({
        servicesManager,
        extensionManager,
        predecessorImageId,
        title: 'Store Segmentation',
        modality,
        enableDownload: true
      });
      if (action !== _default_src_utils_shared_PROMPT_RESPONSES__rspack_import_5["default"].CREATE_REPORT) {
        return;
      }
      const defaultFileName = modality === 'RTSTRUCT' ? `rtss-${segmentationId}.dcm` : `${label || 'segmentation'}.dcm`;
      const storeFn = commandsManager.runCommand('createStoreFunction', {
        dataSource: dataSourceName,
        defaultFileName
      });
      if (!storeFn) {
        throw new Error(`No valid store for dataSource: ${dataSourceName}`);
      }
      try {
        const args = {
          segmentationId,
          options: {
            // Resolve store overrides against the data source we are storing into.
            dataSource: dataSourceName,
            SeriesDescription: series ? undefined : reportName || label || 'Contour Series',
            SeriesNumber: series ? undefined : 1 + priorSeriesNumber,
            predecessorImageId: series
          }
        };
        const generatedDataAsync = modality === 'SEG' && actions.generateSegmentation(args) || modality === 'RTSTRUCT' && actions.generateContour(args);
        const generatedData = await generatedDataAsync;
        if (!generatedData?.dataset) {
          throw new Error('Error during segmentation generation');
        }
        const {
          dataset: naturalizedReport
        } = generatedData;

        // DCMJS assigns a dummy study id during creation, and this can cause problems, so clearing it out
        if (naturalizedReport.StudyID === 'No Study ID') {
          naturalizedReport.StudyID = '';
        }
        await storeFn(naturalizedReport, {});
        return naturalizedReport;
      } catch (error) {
        console.debug('Error storing segmentation:', error);
        throw error;
      }
    },
    generateContour: async args => {
      const {
        segmentationId,
        options
      } = args;
      // `dataSource` is only used by the SEG store path; keep it out of the RTSS options.
      const {
        dataSource: _dataSource,
        ...contourOptions
      } = options ?? {};
      const segmentations = segmentationService.getSegmentation(segmentationId);

      // inject colors to the segmentIndex
      const firstRepresentation = segmentationService.getRepresentationsForSegmentation(segmentationId)[0];
      Object.entries(segmentations.segments).forEach(([segmentIndex, segment]) => {
        segment.color = segmentationService.getSegmentColor(firstRepresentation.viewportId, segmentationId, Number(segmentIndex));
      });
      const predecessorImageId = contourOptions.predecessorImageId ?? segmentations.predecessorImageId;
      const dataset = await generateRTSSFromRepresentation(segmentations, {
        predecessorImageId,
        ...contourOptions
      });
      return {
        dataset
      };
    },
    /**
     * Downloads an RTSS instance from a segmentation or contour
     * representation.
     */
    downloadRTSS: async args => {
      const {
        dataset
      } = await actions.generateContour(args);
      const {
        InstanceNumber: instanceNumber = 1,
        SeriesInstanceUID: seriesUID
      } = dataset;
      const storeFn = commandsManager.runCommand('createStoreFunction', {
        dataSource: 'download',
        defaultFileName: `rtss-${seriesUID}-${instanceNumber}.dcm`
      });
      await storeFn(dataset);
    },
    toggleActiveSegmentationUtility: ({
      itemId: buttonId
    }) => {
      const {
        uiState,
        setUIState
      } = _ohif_extension_default__rspack_import_4.useUIStateStore.getState();
      const isButtonActive = uiState['activeSegmentationUtility'] === buttonId;
      console.log('toggleActiveSegmentationUtility', isButtonActive, buttonId);
      // if the button is active, clear the active segmentation utility
      if (isButtonActive) {
        setUIState('activeSegmentationUtility', null);
      } else {
        setUIState('activeSegmentationUtility', buttonId);
      }
    }
  };
  const definitions = {
    loadSegmentationsForViewport: actions.loadSegmentationsForViewport,
    generateSegmentation: actions.generateSegmentation,
    downloadSegmentation: actions.downloadSegmentation,
    storeSegmentation: actions.storeSegmentation,
    downloadRTSS: actions.downloadRTSS,
    toggleActiveSegmentationUtility: actions.toggleActiveSegmentationUtility
  };
  return {
    actions,
    definitions,
    defaultContext: 'SEGMENTATION'
  };
};
/* export default */ const __rspack_default_export = (commandsModule);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/components/LogicalContourOperationsOptions.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_core__rspack_import_1 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_extension_cornerstone__rspack_import_2 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* import */ var _ohif_ui_next__rspack_import_3 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _cornerstonejs_tools_utilities__rspack_import_4 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/index.js");
/* import */ var react_i18next__rspack_import_5 = __webpack_require__("../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$(),
  _s2 = $RefreshSig$();







const {
  LogicalOperation
} = _cornerstonejs_tools_utilities__rspack_import_4.contourSegmentation;
const options = [{
  value: 'merge',
  logicalOperation: LogicalOperation.Union,
  label: 'Merge',
  icon: 'actions-combine-merge',
  helperIcon: 'helper-combine-merge'
}, {
  value: 'intersect',
  logicalOperation: LogicalOperation.Intersect,
  label: 'Intersect',
  icon: 'actions-combine-intersect',
  helperIcon: 'helper-combine-intersect'
}, {
  value: 'subtract',
  logicalOperation: LogicalOperation.Subtract,
  label: 'Subtract',
  icon: 'actions-combine-subtract',
  helperIcon: 'helper-combine-subtract'
}];

// Shared component for segment selection
function SegmentSelector({
  label,
  value,
  onValueChange,
  segments,
  placeholder = 'Select a segment'
}) {
  _s();
  const {
    t
  } = (0,react_i18next__rspack_import_5.useTranslation)('SegmentationPanel');
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex justify-between gap-6"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", null, label), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.Select, {
    key: `select-segment-${label}`,
    onValueChange: onValueChange,
    value: value
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.SelectTrigger, {
    className: "overflow-hidden",
    "data-cy": `logical-contour-segment-${label.toLowerCase()}-trigger`
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.SelectValue, {
    placeholder: t(placeholder)
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.SelectContent, null, segments.map(segment => /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.SelectItem, {
    key: segment.segmentIndex,
    value: segment.segmentIndex.toString()
  }, segment.label)))));
}
_s(SegmentSelector, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function () {
  return [react_i18next__rspack_import_5.useTranslation];
});
_c = SegmentSelector;
function LogicalContourOperationOptions() {
  _s2();
  const {
    servicesManager
  } = (0,_ohif_core__rspack_import_1.useSystem)();
  const {
    segmentationService
  } = servicesManager.services;
  const {
    t
  } = (0,react_i18next__rspack_import_5.useTranslation)('SegmentationPanel');
  const {
    segmentationsWithRepresentations
  } = (0,_ohif_extension_cornerstone__rspack_import_2.useActiveViewportSegmentationRepresentations)();
  const activeRepresentation = segmentationsWithRepresentations?.find(({
    representation
  }) => representation?.active);
  const segments = activeRepresentation ? Object.values(activeRepresentation.segmentation.segments) : [];

  // Calculate the next available segment index
  const nextSegmentIndex = activeRepresentation ? segmentationService.getNextAvailableSegmentIndex(activeRepresentation.segmentation.segmentationId) : 1;
  const activeSegment = segments.find(segment => segment.active);
  const activeSegmentIndex = activeSegment?.segmentIndex || 0;
  const [operation, setOperation] = (0,react__rspack_import_0.useState)(options[0]);
  const [segmentA, setSegmentA] = (0,react__rspack_import_0.useState)(activeSegmentIndex?.toString() || '');
  const [segmentB, setSegmentB] = (0,react__rspack_import_0.useState)('');
  const [createNewSegment, setCreateNewSegment] = (0,react__rspack_import_0.useState)(false);
  const [newSegmentName, setNewSegmentName] = (0,react__rspack_import_0.useState)('');
  (0,react__rspack_import_0.useEffect)(() => {
    setSegmentA(activeSegmentIndex?.toString() || null);
  }, [activeSegmentIndex]);
  (0,react__rspack_import_0.useEffect)(() => {
    setNewSegmentName(`Segment ${nextSegmentIndex}`);
  }, [nextSegmentIndex]);
  const runCommand = (0,_ohif_core__rspack_import_1.useRunCommand)();
  const applyLogicalContourOperation = (0,react__rspack_import_0.useCallback)(() => {
    let resultSegmentIndex = segmentA;
    if (createNewSegment) {
      resultSegmentIndex = nextSegmentIndex.toString();
      runCommand('addSegment', {
        segmentationId: activeRepresentation.segmentation.segmentationId,
        config: {
          label: newSegmentName,
          segmentIndex: nextSegmentIndex
        }
      });
    }
    runCommand('applyLogicalContourOperation', {
      segmentAInfo: {
        segmentationId: activeRepresentation.segmentation.segmentationId,
        segmentIndex: parseInt(segmentA)
      },
      segmentBInfo: {
        segmentationId: activeRepresentation.segmentation.segmentationId,
        segmentIndex: parseInt(segmentB)
      },
      resultSegmentInfo: {
        segmentationId: activeRepresentation.segmentation.segmentationId,
        segmentIndex: parseInt(resultSegmentIndex)
      },
      logicalOperation: operation.logicalOperation
    });
  }, [activeRepresentation?.segmentation?.segmentationId, createNewSegment, newSegmentName, nextSegmentIndex, operation.logicalOperation, runCommand, segmentA, segmentB]);
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex w-[245px] flex-col gap-4"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex w-auto flex-col items-center gap-2 text-base font-normal leading-none"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.Tabs, {
    value: operation.value
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.TabsList, {
    className: "inline-flex space-x-1"
  }, options.map(option => {
    const {
      value,
      icon
    } = option;
    return /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.TabsTrigger, {
      value: value,
      key: `logical-contour-operation-${value}`,
      onClick: () => setOperation(option),
      "data-cy": `logical-contour-operation-${value}`
    }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.Icons.ByName, {
      name: icon
    }));
  }))), /*#__PURE__*/react__rspack_import_0_default().createElement("div", null, t(operation.label))), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "bg-muted flex h-[62px] w-[88px] items-center justify-center rounded-lg"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.Icons.ByName, {
    name: operation.helperIcon
  }))), /*#__PURE__*/react__rspack_import_0_default().createElement(SegmentSelector, {
    label: "A",
    value: segmentA,
    onValueChange: setSegmentA,
    segments: segments
  }), /*#__PURE__*/react__rspack_import_0_default().createElement(SegmentSelector, {
    label: "B",
    value: segmentB,
    onValueChange: setSegmentB,
    segments: segments
  }), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex justify-end pl-[34px]"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.Button, {
    "data-cy": "apply-logical-contour-operation",
    className: "border-primary/60 grow border",
    variant: "ghost",
    onClick: () => {
      applyLogicalContourOperation();
    }
  }, t(operation.label))), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.Separator, {
    className: "bg-input mt-2 h-[1px]"
  }), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex items-center justify-start gap-2"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.Switch, {
    id: "logical-contour-operations-create-new-segment-switch",
    "data-cy": "logical-contour-create-new-segment-switch",
    onCheckedChange: setCreateNewSegment
  }), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.Label, {
    htmlFor: "logical-contour-operations-create-new-segment-switch"
  }, t('Create a new segment'))), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "pl-9"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.Input, {
    className: (0,_ohif_ui_next__rspack_import_3.cn)(createNewSegment ? 'visible' : 'hidden'),
    disabled: !createNewSegment,
    id: "logical-contour-operations-create-new-segment-input",
    type: "text",
    placeholder: t('New segment name'),
    value: newSegmentName,
    onChange: e => setNewSegmentName(e.target.value)
  }))));
}
_s2(LogicalContourOperationOptions, "auOgNtiUgNuipRokP3KsWB2vWvc=", false, function () {
  return [_ohif_core__rspack_import_1.useSystem, react_i18next__rspack_import_5.useTranslation, _ohif_extension_cornerstone__rspack_import_2.useActiveViewportSegmentationRepresentations, _ohif_core__rspack_import_1.useRunCommand];
});
_c2 = LogicalContourOperationOptions;
/* export default */ const __rspack_default_export = (LogicalContourOperationOptions);
var _c, _c2;
$RefreshReg$(_c, "SegmentSelector");
$RefreshReg$(_c2, "LogicalContourOperationOptions");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/components/SimplifyContourOptions.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_ui_next__rspack_import_1 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _ohif_core__rspack_import_2 = __webpack_require__("../../core/src/index.ts");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();




function SimplifyContourOptions() {
  _s();
  const [areaThreshold, setAreaThreshold] = (0,react__rspack_import_0.useState)(10);
  const runCommand = (0,_ohif_core__rspack_import_2.useRunCommand)();
  const {
    t
  } = (0,react_i18next__rspack_import_3.useTranslation)('SegmentationPanel');
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex w-auto w-[252px] flex-col gap-[8px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", null, t('Fill contour holes')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('removeContourHoles');
    }
  }, t('Fill Holes')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Separator, {
    className: "bg-input mt-[20px] h-[1px]"
  })), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", null, t('Remove Small Contours')), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex items-center gap-2 self-end"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Label, {
    htmlFor: "simplify-contour-options",
    className: "text-muted-foreground"
  }, t('Area Threshold')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Input, {
    id: "simplify-contour-options",
    className: "w-20",
    type: "number",
    value: areaThreshold,
    onChange: e => setAreaThreshold(Number(e.target.value))
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('removeSmallContours', {
        areaThreshold
      });
    }
  }, t('Remove Small Contours')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Separator, {
    className: "bg-input mt-[20px] h-[1px]"
  })), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", null, t('Create New Segment from Holes')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('convertContourHoles');
    }
  }, t('Create New Segment'))));
}
_s(SimplifyContourOptions, "xIrW2OewY/A48Wi4MAFSQ8pi9Rs=", false, function () {
  return [_ohif_core__rspack_import_2.useRunCommand, react_i18next__rspack_import_3.useTranslation];
});
_c = SimplifyContourOptions;
/* export default */ const __rspack_default_export = (SimplifyContourOptions);
var _c;
$RefreshReg$(_c, "SimplifyContourOptions");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/components/SmoothContoursOptions.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_ui_next__rspack_import_1 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _ohif_core__rspack_import_2 = __webpack_require__("../../core/src/index.ts");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();




function SmoothContoursOptions() {
  _s();
  const runCommand = (0,_ohif_core__rspack_import_2.useRunCommand)();
  const {
    t
  } = (0,react_i18next__rspack_import_3.useTranslation)('SegmentationPanel');
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex w-auto w-[245px] flex-col gap-[8px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", null, t('Smooth all edges')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('smoothContours');
    }
  }, t('Smooth Edges')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Separator, {
    className: "bg-input mt-[20px] h-[1px]"
  })), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex w-auto flex-col gap-[10px] text-base font-normal leading-none"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", null, t('Remove extra points')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Button, {
    className: "border-primary/60 border",
    variant: "ghost",
    onClick: () => {
      runCommand('decimateContours');
    }
  }, t('Remove Points'))));
}
_s(SmoothContoursOptions, "k/rFL6J+xj1wG9hV0N+/Ek9elN4=", false, function () {
  return [_ohif_core__rspack_import_2.useRunCommand, react_i18next__rspack_import_3.useTranslation];
});
_c = SmoothContoursOptions;
/* export default */ const __rspack_default_export = (SmoothContoursOptions);
var _c;
$RefreshReg$(_c, "SmoothContoursOptions");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/customizations/segmentationCustomization.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _utils_segmentationConfig__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/utils/segmentationConfig.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

/** Extension-registered defaults: Label Map SEG + RLE Lossless. */
const segmentationCustomization = {
  'segmentation.store.defaultMode': _utils_segmentationConfig__rspack_import_0.DEFAULT_SEG_STORE_MODE,
  'segmentation.store.transferSyntaxUID': _utils_segmentationConfig__rspack_import_0.DEFAULT_SEG_STORE_TRANSFER_SYNTAX_UID,
  'segmentation.segmentLabel': {
    enabledByDefault: false,
    hoverTimeout: 1
  }
};
/* export default */ const __rspack_default_export = (segmentationCustomization);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/getCustomizationModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (getCustomizationModule)
});
/* import */ var _customizations_segmentationCustomization__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/customizations/segmentationCustomization.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

function getCustomizationModule() {
  return [{
    name: 'default',
    value: _customizations_segmentationCustomization__rspack_import_0["default"]
  }];
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  segProtocol: () => (segProtocol)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
const segProtocol = {
  id: '@ohif/seg',
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  name: 'Segmentations',
  // Just apply this one when specifically listed
  protocolMatchingRules: [],
  toolGroupIds: ['default'],
  // -1 would be used to indicate active only, whereas other values are
  // the number of required priors referenced - so 0 means active with
  // 0 or more priors.
  numberOfPriorsReferenced: 0,
  // Default viewport is used to define the viewport when
  // additional viewports are added using the layout tool
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true,
      syncGroups: [{
        type: 'hydrateseg',
        id: 'sameFORId',
        source: true,
        target: true
        // options: {
        //   matchingRules: ['sameFOR'],
        // },
      }]
    },
    displaySets: [{
      id: 'segDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  displaySetSelectors: {
    segDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: 'SEG'
        }
      }]
    }
  },
  stages: [{
    name: 'Segmentations',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        allowUnmatchedView: true,
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true
          // options: {
          //   matchingRules: ['sameFOR'],
          // },
        }]
      },
      displaySets: [{
        id: 'segDisplaySetId'
      }]
    }]
  }]
};
function getHangingProtocolModule() {
  return [{
    name: segProtocol.id,
    protocol: segProtocol
  }];
}
/* export default */ const __rspack_default_export = (getHangingProtocolModule);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _ohif_core__rspack_import_0 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_i18n__rspack_import_1 = __webpack_require__("../../i18n/src/index.js");
/* import */ var _cornerstonejs_core__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _cornerstonejs_tools__rspack_import_3 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* import */ var _cornerstonejs_adapters__rspack_import_4 = __webpack_require__("../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* import */ var _id__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/id.js");
/* import */ var _utils_dicomlabToRGB__rspack_import_6 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/utils/dicomlabToRGB.ts");
/* import */ var _utils_segmentationConfig__rspack_import_7 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/utils/segmentationConfig.ts");
/* import */ var _utils_segLocalImageIds__rspack_import_8 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/utils/segLocalImageIds.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");









const sopClassUids = ['1.2.840.10008.5.1.4.1.1.66.4', '1.2.840.10008.5.1.4.1.1.66.7'];
const LABELMAP_SEG_SOP_CLASS_UID = '1.2.840.10008.5.1.4.1.1.66.7';
const loadPromises = {};
const SEG_LOAD_LOG_PREFIX = '[SEG load]';

// Max number of SEG frames fetched/decoded concurrently by the segmentation
// loader. Hard-coded to 16 for now; intended to become configurable (and to
// pair with the full-instance prefetch capability) in a follow-up.
const SEG_FRAME_DECODE_CONCURRENCY = 16;
function _normalizeImageId(imageId) {
  if (imageId == null) {
    return undefined;
  }
  return Array.isArray(imageId) ? imageId[0] : imageId;
}

/**
 * Expands a WADO-RS frame imageId (…/frames/1) into one imageId per frame.
 * Multiframe SEG is stored as separate /frames/N resources on the server.
 */
function getFrameImageIds(segImageId, numberOfFrames) {
  const frameMatch = segImageId.match(/(.*\/frames\/)(\d+)(.*)$/);
  if (!frameMatch || numberOfFrames <= 1) {
    return [segImageId];
  }
  const prefix = frameMatch[1];
  const suffix = frameMatch[3] || '';
  const frameImageIds = [];
  for (let frameNumber = 1; frameNumber <= numberOfFrames; frameNumber++) {
    frameImageIds.push(`${prefix}${frameNumber}${suffix}`);
  }
  return frameImageIds;
}
function _getSegNumberOfFrames(instance) {
  const fromTag = Number(instance.NumberOfFrames);
  if (fromTag > 0) {
    return fromTag;
  }
  const perFrame = instance.PerFrameFunctionalGroupsSequence;
  if (Array.isArray(perFrame) && perFrame.length > 0) {
    return perFrame.length;
  }
  return 1;
}
function _ensureSegImageIdMetadataRegistered(imageId, instance) {
  if (!imageId) {
    return;
  }
  const metadataProvider = _ohif_core__rspack_import_0.classes.MetadataProvider;
  const StudyInstanceUID = instance.StudyInstanceUID;
  const SeriesInstanceUID = instance.SeriesInstanceUID;
  const SOPInstanceUID = instance.SOPInstanceUID || instance.SopInstanceUID;
  if (!StudyInstanceUID || !SeriesInstanceUID || !SOPInstanceUID) {
    return;
  }
  metadataProvider.addImageIdToUIDs(imageId, {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    frameNumber: (0,_utils_segLocalImageIds__rspack_import_8.getFrameIndexFromImageId)(imageId)
  });
}

/** Ensures metadataProvider.get('instance', imageId) resolves for frame-qualified local SEG ids. */
function _ensureSegInstanceMetadataAvailable(imageId, instance) {
  if (!imageId) {
    return;
  }
  _ensureSegImageIdMetadataRegistered(imageId, instance);
  if (_cornerstonejs_core__rspack_import_2.metaData.get('instance', imageId)) {
    return;
  }
  const StudyInstanceUID = instance.StudyInstanceUID;
  const SeriesInstanceUID = instance.SeriesInstanceUID;
  const SOPInstanceUID = instance.SOPInstanceUID || instance.SopInstanceUID;
  const storedInstance = StudyInstanceUID && SeriesInstanceUID && SOPInstanceUID ? _ohif_core__rspack_import_0.DicomMetadataStore.getInstance(StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID) : undefined;
  _ohif_core__rspack_import_0.classes.MetadataProvider.addCustomMetadata(imageId, 'instance', storedInstance || instance);
}
function _getSegDataSource(extensionManager, instance) {
  const StudyInstanceUID = instance.StudyInstanceUID;
  const SeriesInstanceUID = instance.SeriesInstanceUID;
  const SOPInstanceUID = instance.SOPInstanceUID || instance.SopInstanceUID;
  let localUrl;
  if (StudyInstanceUID && SeriesInstanceUID && SOPInstanceUID) {
    const storedInstance = _ohif_core__rspack_import_0.DicomMetadataStore.getInstance(StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID);
    localUrl = storedInstance?.url;
  }
  localUrl = localUrl || instance.url;
  if (localUrl && (0,_utils_segLocalImageIds__rspack_import_8.isLocalSchemeImageId)(localUrl)) {
    const dicomLocal = extensionManager.getDataSources('dicomlocal');
    if (dicomLocal?.[0]) {
      return dicomLocal[0];
    }
  }
  return extensionManager.getActiveDataSource()[0];
}
function _getSegImageIdFromInstance(instance, dataSource) {
  const numberOfFrames = _getSegNumberOfFrames(instance);
  const frame = numberOfFrames > 1 ? 1 : undefined;
  return _normalizeImageId(dataSource.getImageIdsForInstance?.({
    instance,
    frame
  }));
}
function _resolveFrameImageIds(segImageIdStr, instance, dataSource) {
  const numberOfFrames = _getSegNumberOfFrames(instance);
  const fromFrameUrl = getFrameImageIds(segImageIdStr, numberOfFrames);
  if (fromFrameUrl.length > 1) {
    return fromFrameUrl;
  }
  if (numberOfFrames <= 1) {
    return [segImageIdStr];
  }
  const frameImageIds = [];
  for (let frame = 1; frame <= numberOfFrames; frame++) {
    const frameImageId = _normalizeImageId(dataSource.getImageIdsForInstance?.({
      instance,
      frame
    }));
    if (frameImageId) {
      frameImageIds.push(frameImageId);
    }
  }
  return frameImageIds.length ? frameImageIds : [segImageIdStr];
}
function _logSegImageIds({
  segDisplaySet,
  segImageIdStr,
  frameImageIds,
  referencedImageIds
}) {
  const instance = segDisplaySet.instance;
  const numberOfFrames = Number(instance?.NumberOfFrames) || 1;
  _ohif_core__rspack_import_0.log.debug(SEG_LOAD_LOG_PREFIX, 'Loading SEG pixel data', {
    SOPInstanceUID: segDisplaySet.SOPInstanceUID,
    SeriesInstanceUID: segDisplaySet.SeriesInstanceUID,
    SOPClassUID: segDisplaySet.SOPClassUID,
    NumberOfFrames: numberOfFrames,
    segmentCount: Object.keys(segDisplaySet.segments || {}).length,
    referencedDisplaySetInstanceUID: segDisplaySet.referencedDisplaySetInstanceUID,
    referencedImageIdCount: referencedImageIds.length,
    referencedImageIds,
    segImageIdForMetadata: segImageIdStr,
    frameImageIds,
    loadSegFramesIndividually: frameImageIds.length > 1
  });
}
function _getDisplaySetsFromSeries(instances, servicesManager, extensionManager) {
  _ohif_core__rspack_import_0.utils.sortStudyInstances(instances);

  // Choose the LAST instance in the list as the most recently created one.
  const instance = instances[instances.length - 1];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription = '',
    SeriesNumber,
    SeriesDate,
    StructureSetDate,
    SOPClassUID,
    FrameOfReferenceUID,
    wadoRoot,
    wadoUri,
    wadoUriRoot,
    imageId: predecessorImageId
  } = instance;
  const displaySet = {
    Modality: 'SEG',
    loading: false,
    isReconstructable: false,
    displaySetInstanceUID: _ohif_core__rspack_import_0.utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate: SeriesDate || StructureSetDate || '',
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: _id__rspack_import_5.SOPClassHandlerId,
    SOPClassUID,
    FrameOfReferenceUID,
    referencedImages: null,
    referencedSeriesInstanceUID: null,
    referencedDisplaySetInstanceUID: null,
    isDerivedDisplaySet: true,
    isLoaded: false,
    isHydrated: false,
    segments: {},
    sopClassUids,
    instance,
    predecessorImageId,
    instances: [instance],
    wadoRoot,
    wadoUriRoot,
    wadoUri,
    isOverlayDisplaySet: true,
    label: SeriesDescription || `${_ohif_i18n__rspack_import_1["default"].t('Series')} ${SeriesNumber} - ${_ohif_i18n__rspack_import_1["default"].t('SEG')}`
  };
  const referencedSeriesSequence = instance.ReferencedSeriesSequence;
  if (!referencedSeriesSequence) {
    console.error('ReferencedSeriesSequence is missing for the SEG');
    return;
  }
  const referencedSeries = referencedSeriesSequence[0] || referencedSeriesSequence;
  displaySet.referencedImages = instance.ReferencedSeriesSequence.ReferencedInstanceSequence;
  displaySet.referencedSeriesInstanceUID = referencedSeries.SeriesInstanceUID;
  const {
    displaySetService
  } = servicesManager.services;
  const referencedDisplaySets = displaySetService.getDisplaySetsForReferences(instance.ReferencedSeriesSequence);
  if (referencedDisplaySets?.length > 1) {
    console.warn('Segmentation does not currently handle references to multiple series, defaulting to first series');
  }
  const referencedDisplaySet = referencedDisplaySets[0];
  if (!referencedDisplaySet) {
    // subscribe to display sets added which means at some point it will be available
    const {
      unsubscribe
    } = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, ({
      displaySetsAdded
    }) => {
      // here we can also do a little bit of search, since sometimes DICOM SEG
      // does not contain the referenced display set uid , and we can just
      // see which of the display sets added is more similar and assign it
      // to the referencedDisplaySet
      const addedDisplaySet = displaySetsAdded[0];
      if (addedDisplaySet.SeriesInstanceUID === displaySet.referencedSeriesInstanceUID) {
        displaySet.referencedDisplaySetInstanceUID = addedDisplaySet.displaySetInstanceUID;
        displaySet.isReconstructable = addedDisplaySet.isReconstructable;
        displaySet.FrameOfReferenceUID = addedDisplaySet.FrameOfReferenceUID;
        unsubscribe();
      }
    });
  } else {
    displaySet.referencedDisplaySetInstanceUID = referencedDisplaySet.displaySetInstanceUID;
    displaySet.isReconstructable = referencedDisplaySet.isReconstructable;
    displaySet.FrameOfReferenceUID = referencedDisplaySet.FrameOfReferenceUID;
  }
  displaySet.load = async ({
    headers
  }) => await _load(displaySet, servicesManager, extensionManager, headers);
  return [displaySet];
}
function _load(segDisplaySet, servicesManager, extensionManager, headers) {
  const {
    SOPInstanceUID
  } = segDisplaySet;
  const {
    segmentationService
  } = servicesManager.services;
  if ((segDisplaySet.loading || segDisplaySet.isLoaded) && loadPromises[SOPInstanceUID] && _segmentationExists(segDisplaySet)) {
    return loadPromises[SOPInstanceUID];
  }
  segDisplaySet.loading = true;

  // We don't want to fire multiple loads, so we'll wait for the first to finish
  // and also return the same promise to any other callers.
  loadPromises[SOPInstanceUID] = new Promise(async (resolve, reject) => {
    if (!segDisplaySet.segments || Object.keys(segDisplaySet.segments).length === 0) {
      try {
        await _loadSegments({
          extensionManager,
          servicesManager,
          segDisplaySet,
          headers
        });
      } catch (e) {
        segDisplaySet.loading = false;
        return reject(e);
      }
    }
    segmentationService.createSegmentationForSEGDisplaySet(segDisplaySet).then(() => {
      segDisplaySet.loading = false;
      resolve();
    }).catch(error => {
      segDisplaySet.loading = false;
      reject(error);
    });
  });

  // Expose the in-flight load promise so observers (e.g. the viewport service
  // waiting to attach the representation) can react to a load failure without
  // re-invoking load().
  segDisplaySet.loadingPromise = loadPromises[SOPInstanceUID];
  return loadPromises[SOPInstanceUID];
}
async function _loadSegments({
  extensionManager,
  servicesManager,
  segDisplaySet
}) {
  const {
    segmentationService,
    uiNotificationService,
    customizationService
  } = servicesManager.services;
  const instance = segDisplaySet.instance;
  const dataSource = _getSegDataSource(extensionManager, instance);
  const segImageIdStr = _getSegImageIdFromInstance(instance, dataSource);
  if (!segImageIdStr) {
    throw new Error('Could not get imageId for SEG instance (no local wadouri url and getImageIdsForInstance returned nothing).');
  }
  const referencedDisplaySet = servicesManager.services.displaySetService.getDisplaySetByUID(segDisplaySet.referencedDisplaySetInstanceUID);
  if (!referencedDisplaySet) {
    throw new Error('referencedDisplaySet is missing for SEG');
  }

  // Prefer cached stack imageIds (multiframe SEG fix #4890), then data source expansion.
  let {
    imageIds
  } = referencedDisplaySet;
  if (!imageIds?.length) {
    imageIds = dataSource.getImageIdsForDisplaySet?.(referencedDisplaySet);
  }
  if (!imageIds?.length) {
    imageIds = referencedDisplaySet.images?.map(img => img.imageId);
  }
  if (!imageIds?.length) {
    throw new Error('referencedDisplaySet has no imageIds');
  }
  segDisplaySet.referencedImageIds = imageIds;
  if (!referencedDisplaySet.imageIds?.length) {
    referencedDisplaySet.imageIds = imageIds;
  }
  const frameImageIds = _resolveFrameImageIds(segImageIdStr, segDisplaySet.instance, dataSource);
  const segImageIdForMetadata = (0,_utils_segLocalImageIds__rspack_import_8.isLocalSchemeImageId)(segImageIdStr) ? (0,_utils_segLocalImageIds__rspack_import_8.stripFrameFromImageId)(segImageIdStr) : segImageIdStr;
  _logSegImageIds({
    segDisplaySet,
    segImageIdStr: segImageIdForMetadata,
    frameImageIds,
    referencedImageIds: imageIds
  });
  _ensureSegInstanceMetadataAvailable(segImageIdForMetadata, instance);
  frameImageIds.forEach(id => _ensureSegInstanceMetadataAvailable(id, instance));
  const tolerance = 0.001;
  const onProgress = evt => {
    const {
      percentComplete
    } = evt.detail;
    segmentationService._broadcastEvent(segmentationService.EVENTS.SEGMENT_LOADING_COMPLETE, {
      percentComplete
    });
  };
  _cornerstonejs_core__rspack_import_2.eventTarget.addEventListener(_cornerstonejs_adapters__rspack_import_4.Enums.Events.SEGMENTATION_LOAD_PROGRESS, onProgress);

  // Fetch the whole SEG instance as a single Part 10 object and register its
  // per-frame compressed pixels into the Cornerstone3D frame registry, so the
  // per-frame loads below are served locally instead of one network request
  // per frame: SEG frames are so small and numerous that one bulk fetch beats
  // hundreds of tiny requests. Enabled by default; per-frame loading is the
  // exception (loadMultiframeAsPart10: false in the data source config, or the
  // cornerstone.segmentation.loadMultiframeAsPart10 customization). The
  // prefetch is awaited until it completes OR fails — deliberately no timeout:
  // a failed/unsupported instance fetch resolves quickly and falls back to
  // per-frame, while a slow large fetch is still the fastest way to all frames.
  const loadMultiframeAsPart10 = dataSource?.getConfig?.()?.loadMultiframeAsPart10 ?? customizationService?.getCustomization?.('cornerstone.segmentation.loadMultiframeAsPart10') ?? true;
  let prefetch;
  if (loadMultiframeAsPart10) {
    prefetch = dataSource.retrieve?.prefetchInstanceFrames?.({
      instance,
      imageId: segImageIdForMetadata
    });
    if (prefetch?.done) {
      await prefetch.done;
    }
  }
  let results;
  try {
    results = await _cornerstonejs_adapters__rspack_import_4.adaptersSEG.Cornerstone3D.Segmentation.createFromDicomSegImageId(imageIds, segImageIdForMetadata, {
      metadataProvider: _cornerstonejs_core__rspack_import_2.metaData,
      tolerance,
      parserType: (0,_utils_segmentationConfig__rspack_import_7.getSegmentationParserType)(segDisplaySet.SOPClassUID, customizationService),
      frameImageIds,
      concurrency: SEG_FRAME_DECODE_CONCURRENCY
    });
  } finally {
    _cornerstonejs_core__rspack_import_2.eventTarget.removeEventListener(_cornerstonejs_adapters__rspack_import_4.Enums.Events.SEGMENTATION_LOAD_PROGRESS, onProgress);
    prefetch?.cancel?.();
  }
  let usedRecommendedDisplayCIELabValue = true;
  const resultsTyped = results;
  resultsTyped.segMetadata.data.forEach((data, i) => {
    if (i > 0) {
      data.rgba = data.RecommendedDisplayCIELabValue;
      if (data.rgba) {
        data.rgba = (0,_utils_dicomlabToRGB__rspack_import_6.dicomlabToRGB)(data.rgba);
      } else {
        usedRecommendedDisplayCIELabValue = false;
        data.rgba = _cornerstonejs_tools__rspack_import_3.CONSTANTS.COLOR_LUT[i % _cornerstonejs_tools__rspack_import_3.CONSTANTS.COLOR_LUT.length];
      }
    }
  });
  if (!usedRecommendedDisplayCIELabValue) {
    // Display a notification about the non-utilization of RecommendedDisplayCIELabValue
    uiNotificationService.show({
      title: 'DICOM SEG import',
      message: 'RecommendedDisplayCIELabValue not found for one or more segments. The default color was used instead.',
      type: 'warning',
      duration: 5000
    });
  }
  Object.assign(segDisplaySet, results);
  const labelMapImageIds = results.labelMapImages?.flat().map(image => image.imageId);
  _ohif_core__rspack_import_0.log.debug(SEG_LOAD_LOG_PREFIX, 'SEG parse complete', {
    SOPInstanceUID: segDisplaySet.SOPInstanceUID,
    labelMapImageCount: labelMapImageIds?.length ?? 0,
    labelMapImageIds,
    segmentIndices: Object.keys(segDisplaySet.segments || {})
  });
}
function _segmentationExists(segDisplaySet) {
  return _cornerstonejs_tools__rspack_import_3.segmentation.state.getSegmentation(segDisplaySet.displaySetInstanceUID);
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
    name: 'dicom-seg',
    sopClassUids,
    getDisplaySetsFromSeries
  }];
}
/* export default */ const __rspack_default_export = (getSopClassHandlerModule);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/getToolbarModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getToolbarModule: () => (getToolbarModule)
});
/* import */ var _cornerstonejs_tools__rspack_import_0 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* import */ var _ohif_i18n__rspack_import_1 = __webpack_require__("../../i18n/src/index.js");
/* import */ var _ohif_extension_default__rspack_import_2 = __webpack_require__("../../../extensions/default/src/index.ts");
/* import */ var _components_LogicalContourOperationsOptions__rspack_import_3 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/components/LogicalContourOperationsOptions.tsx");
/* import */ var _components_SimplifyContourOptions__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/components/SimplifyContourOptions.tsx");
/* import */ var _components_SmoothContoursOptions__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/components/SmoothContoursOptions.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");






function getToolbarModule({
  servicesManager
}) {
  const {
    segmentationService,
    toolbarService,
    toolGroupService
  } = servicesManager.services;
  return [{
    name: 'cornerstone.SimplifyContourOptions',
    defaultComponent: _components_SimplifyContourOptions__rspack_import_4["default"]
  }, {
    name: 'cornerstone.LogicalContourOperationsOptions',
    defaultComponent: _components_LogicalContourOperationsOptions__rspack_import_3["default"]
  }, {
    name: 'cornerstone.SmoothContoursOptions',
    defaultComponent: _components_SmoothContoursOptions__rspack_import_5["default"]
  }, {
    name: 'cornerstone.isActiveSegmentationUtility',
    evaluate: ({
      button
    }) => {
      const {
        uiState
      } = _ohif_extension_default__rspack_import_2.useUIStateStore.getState();
      return {
        isActive: uiState[`activeSegmentationUtility`] === button.id
      };
    }
  }, {
    name: 'evaluate.cornerstone.hasSegmentation',
    evaluate: ({
      viewportId
    }) => {
      const segmentations = segmentationService.getSegmentationRepresentations(viewportId);
      return {
        disabled: !segmentations?.length
      };
    }
  }, {
    name: 'evaluate.cornerstone.hasSegmentationOfType',
    evaluate: ({
      viewportId,
      segmentationRepresentationType
    }) => {
      const segmentations = segmentationService.getSegmentationRepresentations(viewportId);
      if (!segmentations?.length) {
        return {
          disabled: true,
          disabledText: _ohif_i18n__rspack_import_1["default"].t('SegmentationPanel:No segmentations available')
        };
      }
      if (!segmentations.some(segmentation => Boolean(segmentation.type === segmentationRepresentationType))) {
        return {
          disabled: true,
          disabledText: `No ${segmentationRepresentationType} segmentations available`
        };
      }
    }
  }, {
    name: 'evaluate.cornerstone.segmentation',
    evaluate: ({
      viewportId,
      button,
      toolNames,
      disabledText
    }) => {
      // Todo: we need to pass in the button section Id since we are kind of
      // forcing the button to have black background since initially
      // it is designed for the toolbox not the toolbar on top
      // we should then branch the buttonSectionId to have different styles
      const segmentations = segmentationService.getSegmentationRepresentations(viewportId);
      if (!segmentations?.length) {
        return {
          disabled: true,
          disabledText: disabledText ?? _ohif_i18n__rspack_import_1["default"].t('SegmentationPanel:No segmentations available')
        };
      }
      const activeSegmentation = segmentationService.getActiveSegmentation(viewportId);
      if (!Object.keys(activeSegmentation.segments).length) {
        return {
          disabled: true,
          disabledText: _ohif_i18n__rspack_import_1["default"].t('SegmentationPanel:Add segment to enable this tool')
        };
      }
      const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
      if (!toolGroup) {
        return {
          disabled: true,
          disabledText: disabledText ?? _ohif_i18n__rspack_import_1["default"].t('SegmentationPanel:Not available on the current viewport')
        };
      }
      if (!toolNames) {
        return {
          disabled: false
          // isActive: false,
        };
      }
      const toolName = toolbarService.getToolNameForButton(button);
      if (!toolGroup.hasTool(toolName) && !toolNames) {
        return {
          disabled: true,
          disabledText: disabledText ?? _ohif_i18n__rspack_import_1["default"].t('SegmentationPanel:Not available on the current viewport')
        };
      }
      const isPrimaryActive = toolNames ? toolNames.includes(toolGroup.getActivePrimaryMouseButtonTool()) : toolGroup.getActivePrimaryMouseButtonTool() === toolName;
      return {
        disabled: false,
        isActive: isPrimaryActive
      };
    }
  }, {
    name: 'evaluate.cornerstone.segmentation.synchronizeDrawingRadius',
    evaluate: ({
      button,
      radiusOptionId
    }) => {
      const toolGroupIds = toolGroupService.getToolGroupIds();
      if (!toolGroupIds?.length) {
        return;
      }
      for (const toolGroupId of toolGroupIds) {
        const brushSize = _cornerstonejs_tools__rspack_import_0.utilities.segmentation.getBrushSizeForToolGroup(toolGroupId);
        if (brushSize) {
          const option = toolbarService.getOptionById(button, radiusOptionId);
          option.value = brushSize;
        }
      }
    }
  }];
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SOPClassHandlerId: () => (SOPClassHandlerId),
  SOPClassHandlerName: () => (SOPClassHandlerName),
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const id = _package_json__rspack_import_0.name;
const SOPClassHandlerName = 'dicom-seg';
const SOPClassHandlerId = `${id}.sopClassHandlerModule.${SOPClassHandlerName}`;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _id__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/id.js");
/* import */ var react__rspack_import_1 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _getSopClassHandlerModule__rspack_import_2 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/getSopClassHandlerModule.ts");
/* import */ var _getHangingProtocolModule__rspack_import_3 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/getHangingProtocolModule.ts");
/* import */ var _commandsModule__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/commandsModule.ts");
/* import */ var _getCustomizationModule__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/getCustomizationModule.ts");
/* import */ var _getToolbarModule__rspack_import_6 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/getToolbarModule.ts");
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
  return __webpack_require__.e(/* import() */ "extensions_cornerstone-dicom-seg_src_viewports_OHIFCornerstoneSEGViewport_tsx").then(__webpack_require__.bind(__webpack_require__, "../../../extensions/cornerstone-dicom-seg/src/viewports/OHIFCornerstoneSEGViewport.tsx"));
});
_c2 = Component;
const OHIFCornerstoneSEGViewport = props => {
  return /*#__PURE__*/react__rspack_import_1_default().createElement((react__rspack_import_1_default().Suspense), {
    fallback: /*#__PURE__*/react__rspack_import_1_default().createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__rspack_import_1_default().createElement(Component, props));
};

/**
 * You can remove any of the following modules if you don't need them.
 */
_c3 = OHIFCornerstoneSEGViewport;
const extension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id: _id__rspack_import_0.id,
  getCommandsModule: _commandsModule__rspack_import_4["default"],
  getCustomizationModule: _getCustomizationModule__rspack_import_5["default"],
  getToolbarModule: _getToolbarModule__rspack_import_6.getToolbarModule,
  getViewportModule({
    servicesManager,
    extensionManager,
    commandsManager
  }) {
    const ExtendedOHIFCornerstoneSEGViewport = props => {
      return /*#__PURE__*/react__rspack_import_1_default().createElement(OHIFCornerstoneSEGViewport, _extends({
        servicesManager: servicesManager,
        extensionManager: extensionManager,
        commandsManager: commandsManager
      }, props));
    };
    return [{
      name: 'dicom-seg',
      component: ExtendedOHIFCornerstoneSEGViewport
    }];
  },
  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule: _getSopClassHandlerModule__rspack_import_2["default"],
  getHangingProtocolModule: _getHangingProtocolModule__rspack_import_3["default"]
};
/* export default */ const __rspack_default_export = (extension);
var _c, _c2, _c3;
$RefreshReg$(_c, "Component$React.lazy");
$RefreshReg$(_c2, "Component");
$RefreshReg$(_c3, "OHIFCornerstoneSEGViewport");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/utils/dicomlabToRGB.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  dicomlabToRGB: () => (dicomlabToRGB)
});
/* import */ var dcmjs__rspack_import_0 = __webpack_require__("../../../node_modules/dcmjs/build/dcmjs.es.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");


/**
 * Converts a CIELAB color to an RGB color using the dcmjs library.
 * @param cielab - The CIELAB color to convert.
 * @returns The RGB color as an array of three integers between 0 and 255.
 */
function dicomlabToRGB(cielab) {
  const rgb = dcmjs__rspack_import_0["default"].data.Colors.dicomlab2RGB(cielab).map(x => Math.round(x * 255));
  return rgb;
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/utils/segLocalImageIds.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  appendFrameToImageId: () => (appendFrameToImageId),
  getFrameIndexFromImageId: () => (getFrameIndexFromImageId),
  isLocalSchemeImageId: () => (isLocalSchemeImageId),
  stripFrameFromImageId: () => (stripFrameFromImageId)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
function isLocalSchemeImageId(imageId) {
  return /^(wadouri:|dicomfile:|dicomweb:)/.test(imageId);
}
function stripFrameFromImageId(imageId) {
  const queryIndex = imageId.indexOf('?');
  if (queryIndex === -1) {
    return imageId;
  }
  const basePath = imageId.slice(0, queryIndex);
  const rebuiltQuery = imageId.slice(queryIndex + 1).split('&').filter(param => param.split('=')[0] !== 'frame').join('&');
  return rebuiltQuery ? `${basePath}?${rebuiltQuery}` : basePath;
}
function appendFrameToImageId(baseImageId, frame) {
  const withoutFrame = stripFrameFromImageId(baseImageId);
  const separator = withoutFrame.includes('?') ? '&' : '?';
  return `${withoutFrame}${separator}frame=${frame}`;
}
function getFrameIndexFromImageId(imageId) {
  const frameMatch = imageId.match(/(?:&|\?)frame=(\d+)/);
  return frameMatch ? Number(frameMatch[1]) : 1;
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/utils/segmentationConfig.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BITMAP_SEG_SOP_CLASS_UID: () => (BITMAP_SEG_SOP_CLASS_UID),
  DEFAULT_SEG_STORE_MODE: () => (DEFAULT_SEG_STORE_MODE),
  DEFAULT_SEG_STORE_TRANSFER_SYNTAX_UID: () => (DEFAULT_SEG_STORE_TRANSFER_SYNTAX_UID),
  LABELMAP_SEG_SOP_CLASS_UID: () => (LABELMAP_SEG_SOP_CLASS_UID),
  getSegmentationParserType: () => (getSegmentationParserType),
  getSegmentationSaveOptions: () => (getSegmentationSaveOptions)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
const LABELMAP_SEG_SOP_CLASS_UID = '1.2.840.10008.5.1.4.1.1.66.7';
const BITMAP_SEG_SOP_CLASS_UID = '1.2.840.10008.5.1.4.1.1.66.4';
/** RLE Lossless — OHIF default SEG store transfer syntax. */
const DEFAULT_SEG_STORE_TRANSFER_SYNTAX_UID = '1.2.840.10008.1.2.5';
/** OHIF default SEG store mode (Label Map Segmentation SOP Class). */
const DEFAULT_SEG_STORE_MODE = 'labelmap';

/**
 * Per-data-source overrides for the SEG store defaults. A data source may set
 * these under `configuration.segmentation.store` to override the values coming
 * from the `segmentation.store.*` customizations. Different back ends support
 * different SEG encodings, so the data source is allowed to win over the
 * app-wide customization default.
 */

function getStoreDefaultMode(customizationService, override) {
  const mode = override?.defaultMode ?? customizationService?.getCustomization('segmentation.store.defaultMode') ?? DEFAULT_SEG_STORE_MODE;
  return mode === 'bitmap' ? 'bitmap' : 'labelmap';
}
function getStoreTransferSyntaxUID(customizationService, override) {
  return override?.transferSyntaxUID ?? customizationService?.getCustomization('segmentation.store.transferSyntaxUID') ?? DEFAULT_SEG_STORE_TRANSFER_SYNTAX_UID;
}

/**
 * Resolves the parser type for loading a DICOM SEG instance.
 * Uses the instance SOP Class UID when it is a known SEG class; otherwise falls back to store defaultMode.
 */
function getSegmentationParserType(sopClassUID, customizationService) {
  if (sopClassUID === LABELMAP_SEG_SOP_CLASS_UID) {
    return 'labelmap';
  }
  if (sopClassUID === BITMAP_SEG_SOP_CLASS_UID) {
    return 'bitmap';
  }
  return getStoreDefaultMode(customizationService);
}

/**
 * Options passed to @cornerstonejs/adapters generateSegmentation when exporting or storing SEG.
 *
 * Defaults to **Label Map + RLE Lossless**. Customizations (or per-data-source
 * `configuration.segmentation.store`) are only needed to opt into bitmap and/or
 * uncompressed Explicit VR Little Endian.
 */
function getSegmentationSaveOptions(customizationService, override) {
  const defaultMode = getStoreDefaultMode(customizationService, override);
  const sopClassUID = defaultMode === 'bitmap' ? BITMAP_SEG_SOP_CLASS_UID : LABELMAP_SEG_SOP_CLASS_UID;
  const transferSyntaxUID = getStoreTransferSyntaxUID(customizationService, override);
  return {
    sopClassUID,
    transferSyntaxUID,
    transferSyntaxUid: transferSyntaxUID
  };
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/extension-cornerstone-dicom-seg","version":"3.14.0-beta.7","description":"DICOM SEG read workflow","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-cornerstone-dicom-seg.umd.js","module":"src/index.tsx","engines":{"node":">=24"},"files":["dist/**","public/**","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","dev:dicom-seg":"pnpm run dev","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package-1":"pnpm run build","start":"pnpm run dev"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/extension-cornerstone":"workspace:*","@ohif/extension-default":"workspace:*","@ohif/i18n":"workspace:*","prop-types":"15.8.1","react":"18.3.1","react-dom":"18.3.1","react-i18next":"12.3.1","react-router":"6.30.3","react-router-dom":"6.30.3"},"dependencies":{"@babel/runtime":"7.29.7","@cornerstonejs/adapters":"5.6.8","@cornerstonejs/core":"5.6.8","@kitware/vtk.js":"36.4.1"},"devDependencies":{"cross-env":"7.0.3"},"keywords":["ohif-extension"]}')

},

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-seg_src_index_tsx.js.map