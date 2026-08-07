"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_cornerstone-dicom-rt_src_viewports_OHIFCornerstoneRTViewport_tsx"], {
"../../../extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
function createRTToolGroupAndAddTools(ToolGroupService, customizationService, toolGroupId) {
  const tools = customizationService.getCustomization('cornerstone.overlayViewportTools');
  return ToolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
/* export default */ const __rspack_default_export = (createRTToolGroupAndAddTools);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _ohif_extension_cornerstone__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

function promptHydrateRT({
  servicesManager,
  rtDisplaySet,
  viewportId,
  preHydrateCallbacks,
  hydrateRTDisplaySet
}) {
  return _ohif_extension_cornerstone__rspack_import_0.utils.promptHydrationDialog({
    servicesManager,
    viewportId,
    displaySet: rtDisplaySet,
    preHydrateCallbacks,
    hydrateCallback: hydrateRTDisplaySet,
    type: 'RTSTRUCT'
  });
}
/* export default */ const __rspack_default_export = (promptHydrateRT);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone-dicom-rt/src/viewports/OHIFCornerstoneRTViewport.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var prop_types__rspack_import_1 = __webpack_require__("../../../node_modules/prop-types/index.js");
/* import */ var prop_types__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(prop_types__rspack_import_1);
/* import */ var _ohif_ui_next__rspack_import_2 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _ohif_extension_cornerstone__rspack_import_3 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* import */ var _utils_promptHydrateRT__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone-dicom-rt/src/utils/promptHydrateRT.ts");
/* import */ var _utils_initRTToolGroup__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone-dicom-rt/src/utils/initRTToolGroup.ts");
/* import */ var _ohif_core_src__rspack_import_6 = __webpack_require__("../../core/src/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
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







const RT_TOOLGROUP_BASE_NAME = 'RTToolGroup';
function OHIFCornerstoneRTViewport(props) {
  _s();
  const {
    servicesManager,
    commandsManager
  } = (0,_ohif_core_src__rspack_import_6.useSystem)();
  const {
    children,
    displaySets,
    viewportOptions
  } = props;
  const {
    displaySetService,
    toolGroupService,
    segmentationService,
    customizationService
  } = servicesManager.services;
  const viewportId = viewportOptions.viewportId;
  const toolGroupId = `${RT_TOOLGROUP_BASE_NAME}-${viewportId}`;

  // RT viewport will always have a single display set
  if (displaySets.length > 1) {
    throw new Error('RT viewport should only have a single display set');
  }
  const LoadingIndicatorTotalPercent = customizationService.getCustomization('ui.loadingIndicatorTotalPercent');
  const rtDisplaySet = displaySets[0];
  const [{
    viewports,
    activeViewportId
  }, viewportGridService] = (0,_ohif_ui_next__rspack_import_2.useViewportGrid)();

  // States
  const {
    setPositionPresentation
  } = (0,_ohif_extension_cornerstone__rspack_import_3.usePositionPresentationStore)();
  const [rtIsLoading, setRtIsLoading] = (0,react__rspack_import_0.useState)(!rtDisplaySet.isLoaded);
  const [processingProgress, setProcessingProgress] = (0,react__rspack_import_0.useState)({
    percentComplete: null,
    totalSegments: null
  });
  const referencedDisplaySetRef = (0,react__rspack_import_0.useRef)(null);
  const referencedDisplaySetInstanceUID = rtDisplaySet.referencedDisplaySetInstanceUID;
  // If the referencedDisplaySetInstanceUID is not found, it means the RTStruct series is being
  // launched without its corresponding referenced display set (e.g., the RTStruct series is launched using
  // series launch /mode?StudyInstanceUIDs=&SeriesInstanceUID).
  // In such cases, we attempt to handle this scenario gracefully by
  // invoking a custom handler. Ideally, if a user tries to launch a series that isn't viewable,
  // (eg.: we can prompt them with an explanation and provide a link to the full study).
  if (!referencedDisplaySetInstanceUID) {
    const missingReferenceDisplaySetHandler = customizationService.getCustomization('missingReferenceDisplaySetHandler');
    const {
      handled
    } = missingReferenceDisplaySetHandler();
    if (handled) {
      return;
    }
  }
  const referencedDisplaySet = displaySetService.getDisplaySetByUID(referencedDisplaySetInstanceUID);
  const referencedDisplaySetMetadata = _getReferencedDisplaySetMetadata(referencedDisplaySet);
  referencedDisplaySetRef.current = {
    displaySet: referencedDisplaySet,
    metadata: referencedDisplaySetMetadata
  };
  (0,react__rspack_import_0.useEffect)(() => {
    if (rtIsLoading) {
      return;
    }

    // if not active viewport, return
    if (viewportId !== activeViewportId) {
      return;
    }
    (0,_utils_promptHydrateRT__rspack_import_4["default"])({
      servicesManager,
      viewportId,
      rtDisplaySet,
      hydrateRTDisplaySet: async () => {
        return commandsManager.runCommand('hydrateSecondaryDisplaySet', {
          displaySet: rtDisplaySet,
          viewportId
        });
      }
    });
  }, [servicesManager, viewportId, rtDisplaySet, rtIsLoading, commandsManager, activeViewportId]);
  (0,react__rspack_import_0.useEffect)(() => {
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_LOADING_COMPLETE, evt => {
      if (evt.rtDisplaySet?.displaySetInstanceUID === rtDisplaySet.displaySetInstanceUID) {
        setRtIsLoading(false);
      }
      if (rtDisplaySet?.firstSegmentedSliceImageId && viewportOptions?.presentationIds) {
        const {
          firstSegmentedSliceImageId
        } = rtDisplaySet;
        const {
          presentationIds
        } = viewportOptions;
        setPositionPresentation(presentationIds.positionPresentationId, {
          viewportType: 'stack',
          viewReference: {
            referencedImageId: firstSegmentedSliceImageId
          },
          viewPresentation: {}
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [rtDisplaySet]);
  (0,react__rspack_import_0.useEffect)(() => {
    const segmentLoadingSubscription = segmentationService.subscribe(segmentationService.EVENTS.SEGMENT_LOADING_COMPLETE, ({
      percentComplete,
      numSegments
    }) => {
      setProcessingProgress({
        percentComplete,
        totalSegments: numSegments
      });
    });
    const displaySetsRemovedSubscription = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_REMOVED, ({
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
      segmentLoadingSubscription.unsubscribe();
      displaySetsRemovedSubscription.unsubscribe();
    };
  }, [rtDisplaySet, displaySetService, viewports, activeViewportId, viewportGridService]);
  (0,react__rspack_import_0.useEffect)(() => {
    let toolGroup = toolGroupService.getToolGroup(toolGroupId);
    if (toolGroup) {
      return;
    }
    toolGroup = (0,_utils_initRTToolGroup__rspack_import_5["default"])(toolGroupService, customizationService, toolGroupId);
    return () => {
      // remove the segmentation representations if seg displayset changed
      segmentationService.removeRepresentationsFromViewport(viewportId);
      referencedDisplaySetRef.current = null;
      toolGroupService.destroyToolGroup(toolGroupId);
    };
  }, []);
  const getCornerstoneViewport = (0,react__rspack_import_0.useCallback)(() => {
    const {
      displaySet: referencedDisplaySet
    } = referencedDisplaySetRef.current;

    // Todo: jump to the center of the first segment
    return /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_cornerstone__rspack_import_3.OHIFCornerstoneViewport, _extends({}, props, {
      displaySets: [referencedDisplaySet, rtDisplaySet],
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
  }, [viewportId, rtDisplaySet, toolGroupId]);
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
  }, rtIsLoading && /*#__PURE__*/react__rspack_import_0_default().createElement(LoadingIndicatorTotalPercent, {
    className: "h-full w-full",
    totalNumbers: processingProgress.totalSegments,
    percentComplete: processingProgress.percentComplete,
    loadingText: "Loading RTSTRUCT..."
  }), getCornerstoneViewport(), childrenWithProps));
}
_s(OHIFCornerstoneRTViewport, "zYhF9akmAgdDMmRtsKloRVlJLug=", false, function () {
  return [_ohif_core_src__rspack_import_6.useSystem, _ohif_ui_next__rspack_import_2.useViewportGrid, _ohif_extension_cornerstone__rspack_import_3.usePositionPresentationStore];
});
_c = OHIFCornerstoneRTViewport;
OHIFCornerstoneRTViewport.propTypes = {
  displaySets: prop_types__rspack_import_1_default().arrayOf((prop_types__rspack_import_1_default().object)),
  viewportId: (prop_types__rspack_import_1_default().string.isRequired),
  dataSource: (prop_types__rspack_import_1_default().object),
  children: (prop_types__rspack_import_1_default().node)
};
function _getReferencedDisplaySetMetadata(referencedDisplaySet) {
  const image0 = referencedDisplaySet.images[0];
  const referencedDisplaySetMetadata = {
    PatientID: image0.PatientID,
    PatientName: image0.PatientName,
    PatientSex: image0.PatientSex,
    PatientAge: image0.PatientAge,
    SliceThickness: image0.SliceThickness,
    StudyDate: image0.StudyDate,
    SeriesDescription: image0.SeriesDescription,
    SeriesInstanceUID: image0.SeriesInstanceUID,
    SeriesNumber: image0.SeriesNumber,
    ManufacturerModelName: image0.ManufacturerModelName,
    SpacingBetweenSlices: image0.SpacingBetweenSlices
  };
  return referencedDisplaySetMetadata;
}
/* export default */ const __rspack_default_export = (OHIFCornerstoneRTViewport);
var _c;
$RefreshReg$(_c, "OHIFCornerstoneRTViewport");
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-rt_src_viewports_OHIFCornerstoneRTViewport_tsx.js.map