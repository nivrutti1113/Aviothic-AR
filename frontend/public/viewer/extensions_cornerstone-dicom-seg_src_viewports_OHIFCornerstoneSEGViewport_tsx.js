"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_cornerstone-dicom-seg_src_viewports_OHIFCornerstoneSEGViewport_tsx"], {
"../../../extensions/cornerstone-dicom-seg/src/utils/initSEGToolGroup.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
function createSEGToolGroupAndAddTools({
  commandsManager,
  toolGroupService,
  customizationService,
  toolGroupId
}) {
  const tools = customizationService.getCustomization('cornerstone.overlayViewportTools');
  const updatedTools = commandsManager.run('initializeSegmentLabelTool', {
    tools
  });
  return toolGroupService.createToolGroupAndAddTools(toolGroupId, updatedTools);
}
/* export default */ const __rspack_default_export = (createSEGToolGroupAndAddTools);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/utils/promptHydrateSEG.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _ohif_extension_cornerstone__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

function promptHydrateSEG({
  servicesManager,
  segDisplaySet,
  viewportId,
  preHydrateCallbacks,
  hydrateCallback
}) {
  return _ohif_extension_cornerstone__rspack_import_0.utils.promptHydrationDialog({
    servicesManager,
    viewportId,
    displaySet: segDisplaySet,
    preHydrateCallbacks,
    hydrateCallback,
    type: 'SEG'
  });
}
/* export default */ const __rspack_default_export = (promptHydrateSEG);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-seg/src/viewports/OHIFCornerstoneSEGViewport.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_ui_next__rspack_import_1 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _utils_initSEGToolGroup__rspack_import_2 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/utils/initSEGToolGroup.ts");
/* import */ var _utils_promptHydrateSEG__rspack_import_3 = __webpack_require__("../../../extensions/cornerstone-dicom-seg/src/utils/promptHydrateSEG.ts");
/* import */ var _ohif_extension_cornerstone__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* import */ var _cornerstonejs_tools_enums__rspack_import_5 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/enums/index.js");
/* import */ var _ohif_core_src_contextProviders_SystemProvider__rspack_import_6 = __webpack_require__("../../core/src/contextProviders/SystemProvider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}







const SEG_TOOLGROUP_BASE_NAME = 'SEGToolGroup';
function OHIFCornerstoneSEGViewport(props) {
  _s();
  const {
    servicesManager,
    commandsManager
  } = (0,_ohif_core_src_contextProviders_SystemProvider__rspack_import_6.useSystem)();
  const {
    children,
    displaySets,
    viewportOptions
  } = props;
  const viewportId = viewportOptions.viewportId;
  const {
    displaySetService,
    toolGroupService,
    segmentationService,
    customizationService
  } = servicesManager.services;
  const LoadingIndicatorTotalPercent = customizationService.getCustomization('ui.loadingIndicatorTotalPercent');
  const toolGroupId = `${SEG_TOOLGROUP_BASE_NAME}-${viewportId}`;

  // SEG viewport will always have a single display set
  if (displaySets.length > 1) {
    throw new Error('SEG viewport should only have a single display set');
  }
  const segDisplaySet = displaySets[0];
  const [viewportGrid, viewportGridService] = (0,_ohif_ui_next__rspack_import_1.useViewportGrid)();

  // States
  const {
    setPositionPresentation
  } = (0,_ohif_extension_cornerstone__rspack_import_4.usePositionPresentationStore)();

  // Hydration means that the SEG is opened and segments are loaded into the
  // segmentation panel, and SEG is also rendered on any viewport that is in the
  // same frameOfReferenceUID as the referencedSeriesUID of the SEG. However,
  // loading basically means SEG loading over network and bit unpacking of the
  // SEG data.
  const [segIsLoading, setSegIsLoading] = (0,react__rspack_import_0.useState)(!segDisplaySet.isLoaded);
  const [processingProgress, setProcessingProgress] = (0,react__rspack_import_0.useState)({
    percentComplete: null,
    totalSegments: null
  });

  // refs
  const referencedDisplaySetRef = (0,react__rspack_import_0.useRef)(null);
  const {
    viewports,
    activeViewportId
  } = viewportGrid;
  const referencedDisplaySetInstanceUID = segDisplaySet.referencedDisplaySetInstanceUID;
  // If the referencedDisplaySetInstanceUID is not found, it means the SEG series is being
  // launched without its corresponding referenced display set (e.g., the SEG series is launched using
  // series launch /mode?StudyInstanceUIDs=&SeriesInstanceUID).
  // In such cases, we attempt to handle this scenario gracefully by
  // invoking a custom handler. Ideally, if a user tries to launch a series that isn't viewable,
  // (eg.: we can prompt them with an explanation and provide a link to the full study).

  // Additional guard: If no customization handler is registered for missing
  // referenced display sets, skip SEG rendering to avoid a viewport crash.
  if (!referencedDisplaySetInstanceUID) {
    const missingReferenceDisplaySetHandler = customizationService.getCustomization('missingReferenceDisplaySetHandler');
    if (typeof missingReferenceDisplaySetHandler === 'function') {
      const {
        handled
      } = missingReferenceDisplaySetHandler();
      if (handled) {
        return;
      }
    } else {
      console.log("No customization 'missingReferenceDisplaySetHandler' registered. Skipping SEG rendering.");
      return;
    }
  }
  const referencedDisplaySet = displaySetService.getDisplaySetByUID(referencedDisplaySetInstanceUID);
  const referencedDisplaySetMetadata = _getReferencedDisplaySetMetadata(referencedDisplaySet, segDisplaySet);
  referencedDisplaySetRef.current = {
    displaySet: referencedDisplaySet,
    metadata: referencedDisplaySetMetadata
  };
  const getCornerstoneViewport = (0,react__rspack_import_0.useCallback)(() => {
    // Stack uses the referenced series (data[0]); SEG is applied as an overlay (data[1]).
    // Passing only the SEG display set leaves the stack with derived labelmap imageIds,
    // which are not displayable without the underlying grayscale series.
    return /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_cornerstone__rspack_import_4.OHIFCornerstoneViewport, _extends({}, props, {
      displaySets: [referencedDisplaySet, segDisplaySet],
      viewportOptions: {
        viewportType: viewportOptions.viewportType,
        toolGroupId: toolGroupId,
        orientation: viewportOptions.orientation,
        viewportId: viewportOptions.viewportId,
        presentationIds: viewportOptions.presentationIds
      },
      onElementEnabled: evt => {
        props.onElementEnabled?.(evt);
      }
    }));
  }, [viewportId, segDisplaySet, referencedDisplaySet, toolGroupId, props, viewportOptions]);
  (0,react__rspack_import_0.useEffect)(() => {
    if (segIsLoading) {
      return;
    }

    // if not active viewport, return
    if (viewportId !== activeViewportId) {
      return;
    }
    (0,_utils_promptHydrateSEG__rspack_import_3["default"])({
      servicesManager,
      viewportId,
      segDisplaySet,
      hydrateCallback: async () => {
        await commandsManager.runCommand('hydrateSecondaryDisplaySet', {
          displaySet: segDisplaySet,
          viewportId
        });
        return true;
      }
    });
  }, [servicesManager, viewportId, segDisplaySet, segIsLoading, commandsManager, activeViewportId]);
  (0,react__rspack_import_0.useEffect)(() => {
    // on new seg display set, remove all segmentations from all viewports
    segmentationService.clearSegmentationRepresentations(viewportId);
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_LOADING_COMPLETE, evt => {
      if (evt.segDisplaySet?.displaySetInstanceUID === segDisplaySet?.displaySetInstanceUID) {
        setSegIsLoading(false);
      }
      if (segDisplaySet?.firstSegmentedSliceImageId && viewportOptions?.presentationIds) {
        const {
          firstSegmentedSliceImageId
        } = segDisplaySet;
        const {
          presentationIds
        } = viewportOptions;
        setPositionPresentation(presentationIds.positionPresentationId, {
          viewReference: {
            referencedImageId: firstSegmentedSliceImageId
          }
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [segDisplaySet]);
  (0,react__rspack_import_0.useEffect)(() => {
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENT_LOADING_COMPLETE, ({
      percentComplete,
      numSegments
    }) => {
      setProcessingProgress({
        percentComplete,
        totalSegments: numSegments
      });
    });
    return () => {
      unsubscribe();
    };
  }, [segDisplaySet]);

  /**
   Cleanup the SEG viewport when the viewport is destroyed
   */
  (0,react__rspack_import_0.useEffect)(() => {
    const onDisplaySetsRemovedSubscription = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_REMOVED, ({
      displaySetInstanceUIDs
    }) => {
      const activeViewport = viewports.get(activeViewportId);
      if (displaySetInstanceUIDs.includes(activeViewport.displaySetInstanceUID)) {
        viewportGridService.setDisplaySetsForViewport({
          viewportId: activeViewportId,
          displaySetInstanceUIDs: []
        });
      }
    });
    return () => {
      onDisplaySetsRemovedSubscription.unsubscribe();
    };
  }, []);
  (0,react__rspack_import_0.useEffect)(() => {
    let toolGroup = toolGroupService.getToolGroup(toolGroupId);
    if (toolGroup) {
      return;
    }

    // keep the already stored segmentationPresentation for this viewport in memory
    // so that we can restore it after hydrating the SEG
    commandsManager.runCommand('updateStoredSegmentationPresentation', {
      displaySet: segDisplaySet,
      type: _cornerstonejs_tools_enums__rspack_import_5.SegmentationRepresentations.Labelmap
    });

    // always start fresh for this viewport since it is special type of viewport
    // that should only show one segmentation at a time.
    segmentationService.clearSegmentationRepresentations(viewportId);

    // This creates a custom tool group which has the lifetime of this view
    // only, and does NOT interfere with currently displayed segmentations.
    toolGroup = (0,_utils_initSEGToolGroup__rspack_import_2["default"])({
      commandsManager,
      toolGroupService,
      customizationService,
      toolGroupId
    });
    return () => {
      // remove the segmentation representations if seg displayset changed
      // e.g., another seg displayset is dragged into the viewport
      segmentationService.clearSegmentationRepresentations(viewportId);

      // Only destroy the viewport specific implementation
      toolGroupService.destroyToolGroup(toolGroupId);
    };
  }, []);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let childrenWithProps = null;
  if (!referencedDisplaySetRef.current || referencedDisplaySet.displaySetInstanceUID !== referencedDisplaySetRef.current.displaySet.displaySetInstanceUID) {
    return null;
  }
  if (children && children.length) {
    childrenWithProps = children.map((child, index) => {
      return child && /*#__PURE__*/react__rspack_import_0_default().cloneElement(child, {
        viewportId,
        key: index
      });
    });
  }
  return /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Fragment), null, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "relative flex h-full w-full flex-row overflow-hidden"
  }, segIsLoading && /*#__PURE__*/react__rspack_import_0_default().createElement(LoadingIndicatorTotalPercent, {
    className: "h-full w-full",
    totalNumbers: processingProgress.totalSegments,
    percentComplete: processingProgress.percentComplete,
    loadingText: "Loading SEG..."
  }), getCornerstoneViewport(), childrenWithProps));
}
_s(OHIFCornerstoneSEGViewport, "/NlgfjCOpqwGHmIeqD+ZM7fk7RM=", false, function () {
  return [_ohif_core_src_contextProviders_SystemProvider__rspack_import_6.useSystem, _ohif_ui_next__rspack_import_1.useViewportGrid, _ohif_extension_cornerstone__rspack_import_4.usePositionPresentationStore];
});
_c = OHIFCornerstoneSEGViewport;
function _getReferencedDisplaySetMetadata(referencedDisplaySet, segDisplaySet) {
  const {
    SharedFunctionalGroupsSequence
  } = segDisplaySet.instance;
  const SharedFunctionalGroup = Array.isArray(SharedFunctionalGroupsSequence) ? SharedFunctionalGroupsSequence[0] : SharedFunctionalGroupsSequence;
  const {
    PixelMeasuresSequence
  } = SharedFunctionalGroup;
  const PixelMeasures = Array.isArray(PixelMeasuresSequence) ? PixelMeasuresSequence[0] : PixelMeasuresSequence;
  const {
    SpacingBetweenSlices,
    SliceThickness
  } = PixelMeasures;
  const image0 = referencedDisplaySet.images[0];
  const referencedDisplaySetMetadata = {
    PatientID: image0.PatientID,
    PatientName: image0.PatientName,
    PatientSex: image0.PatientSex,
    PatientAge: image0.PatientAge,
    SliceThickness: image0.SliceThickness || SliceThickness,
    StudyDate: image0.StudyDate,
    SeriesDescription: image0.SeriesDescription,
    SeriesInstanceUID: image0.SeriesInstanceUID,
    SeriesNumber: image0.SeriesNumber,
    ManufacturerModelName: image0.ManufacturerModelName,
    SpacingBetweenSlices: image0.SpacingBetweenSlices || SpacingBetweenSlices
  };
  return referencedDisplaySetMetadata;
}
/* export default */ const __rspack_default_export = (OHIFCornerstoneSEGViewport);
var _c;
$RefreshReg$(_c, "OHIFCornerstoneSEGViewport");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-seg_src_viewports_OHIFCornerstoneSEGViewport_tsx.js.map