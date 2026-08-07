"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_tmtv_src_index_tsx"], {
"../../../extensions/tmtv/src/Panels/PanelPetSUV.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (PanelPetSUV)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var prop_types__rspack_import_1 = __webpack_require__("../../../node_modules/prop-types/index.js");
/* import */ var prop_types__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(prop_types__rspack_import_1);
/* import */ var _ohif_core__rspack_import_2 = __webpack_require__("../../core/src/index.ts");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("../../../node_modules/react-i18next/dist/es/index.js");
/* import */ var _ohif_ui_next__rspack_import_4 = __webpack_require__("../../ui-next/src/index.ts");
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






const DEFAULT_MEATADATA = {
  PatientWeight: null,
  PatientSex: null,
  SeriesTime: null,
  RadiopharmaceuticalInformationSequence: {
    RadionuclideTotalDose: null,
    RadionuclideHalfLife: null,
    RadiopharmaceuticalStartTime: null
  }
};

/*
 * PETSUV panel enables the user to modify the patient related information, such as
 * patient sex, patientWeight. This is allowed since
 * sometimes these metadata are missing or wrong. By changing them
 * @param param0
 * @returns
 */

// InputRow compound component
const InputRow = ({
  children,
  className,
  ...props
}) => {
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", _extends({
    className: `flex flex-row items-center space-x-4 ${className || ''}`
  }, props), children);
};

// InputRow sub-components
_c = InputRow;
InputRow.Label = ({
  children,
  unit,
  className,
  ...props
}) => /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.Label, _extends({
  className: `min-w-32 flex-shrink-0 ${className || ''}`
}, props), children, unit && /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
  className: "text-muted-foreground"
}, " ", unit));
InputRow.Input = ({
  className,
  ...props
}) => /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.Input, _extends({
  className: `h-7 flex-1 ${className || ''}`
}, props));

// Set display names for better debugging
InputRow.Label.displayName = 'InputRow.Label';
InputRow.Input.displayName = 'InputRow.Input';
function PanelPetSUV() {
  _s();
  const {
    commandsManager,
    servicesManager
  } = (0,_ohif_core__rspack_import_2.useSystem)();
  const {
    t
  } = (0,react_i18next__rspack_import_3.useTranslation)('PanelSUV');
  const {
    displaySetService,
    hangingProtocolService
  } = servicesManager.services;
  const [metadata, setMetadata] = (0,react__rspack_import_0.useState)(DEFAULT_MEATADATA);
  const [ptDisplaySet, setPtDisplaySet] = (0,react__rspack_import_0.useState)(null);
  const handleMetadataChange = metadata => {
    setMetadata(prevState => {
      const newState = {
        ...prevState
      };
      Object.keys(metadata).forEach(key => {
        if (typeof metadata[key] === 'object') {
          newState[key] = {
            ...prevState[key],
            ...metadata[key]
          };
        } else {
          newState[key] = metadata[key];
        }
      });
      return newState;
    });
  };
  const getMatchingPTDisplaySet = viewportMatchDetails => {
    const ptDisplaySet = commandsManager.runCommand('getMatchingPTDisplaySet', {
      viewportMatchDetails
    });
    if (!ptDisplaySet) {
      return;
    }
    const metadata = commandsManager.runCommand('getPTMetadata', {
      ptDisplaySet
    });
    return {
      ptDisplaySet,
      metadata
    };
  };
  (0,react__rspack_import_0.useEffect)(() => {
    const displaySets = displaySetService.getActiveDisplaySets();
    const {
      viewportMatchDetails
    } = hangingProtocolService.getMatchDetails();
    if (!displaySets.length) {
      return;
    }
    const displaySetInfo = getMatchingPTDisplaySet(viewportMatchDetails);
    if (!displaySetInfo) {
      return;
    }
    const {
      ptDisplaySet,
      metadata
    } = displaySetInfo;
    setPtDisplaySet(ptDisplaySet);
    setMetadata(metadata);
  }, []);

  // get the patientMetadata from the StudyInstanceUIDs and update the state
  (0,react__rspack_import_0.useEffect)(() => {
    const {
      unsubscribe
    } = hangingProtocolService.subscribe(hangingProtocolService.EVENTS.PROTOCOL_CHANGED, ({
      viewportMatchDetails
    }) => {
      const displaySetInfo = getMatchingPTDisplaySet(viewportMatchDetails);
      if (!displaySetInfo) {
        return;
      }
      const {
        ptDisplaySet,
        metadata
      } = displaySetInfo;
      setPtDisplaySet(ptDisplaySet);
      setMetadata(metadata);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  function updateMetadata() {
    if (!ptDisplaySet) {
      throw new Error('No ptDisplaySet found');
    }

    // metadata should be dcmjs naturalized
    _ohif_core__rspack_import_2.DicomMetadataStore.updateMetadataForSeries(ptDisplaySet.StudyInstanceUID, ptDisplaySet.SeriesInstanceUID, metadata);

    // update the displaySets
    displaySetService.setDisplaySetMetadataInvalidated(ptDisplaySet.displaySetInstanceUID);

    // Crosshair position depends on the metadata values such as the positioning interaction
    // between series, so when the metadata is updated, the crosshairs need to be reset.
    setTimeout(() => {
      commandsManager.runCommand('resetCrosshairs');
    }, 0);
  }
  return /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Fragment), null, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "ohif-scrollbar flex min-h-0 flex-auto select-none flex-col justify-between overflow-auto"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex min-h-0 flex-1 flex-col bg-background text-base"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.PanelSection, {
    defaultOpen: true
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.PanelSection.Header, null, t('Patient Information')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.PanelSection.Content, null, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "bg-muted flex flex-col gap-3 p-2"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow, null, /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Label, null, t('Patient Sex')), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Input, {
    value: metadata.PatientSex || '',
    onChange: e => {
      handleMetadataChange({
        PatientSex: e.target.value
      });
    }
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow, null, /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Label, {
    unit: "kg"
  }, t('Weight')), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Input, {
    value: metadata.PatientWeight || '',
    onChange: e => {
      handleMetadataChange({
        PatientWeight: e.target.value
      });
    },
    id: "weight-input"
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow, null, /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Label, {
    unit: "bq"
  }, t('Total Dose')), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Input, {
    value: metadata.RadiopharmaceuticalInformationSequence.RadionuclideTotalDose || '',
    onChange: e => {
      handleMetadataChange({
        RadiopharmaceuticalInformationSequence: {
          RadionuclideTotalDose: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow, null, /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Label, {
    unit: "s"
  }, t('Half Life')), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Input, {
    value: metadata.RadiopharmaceuticalInformationSequence.RadionuclideHalfLife || '',
    onChange: e => {
      handleMetadataChange({
        RadiopharmaceuticalInformationSequence: {
          RadionuclideHalfLife: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow, null, /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Label, {
    unit: "s"
  }, t('Injection Time')), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Input, {
    value: metadata.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartTime || '',
    onChange: e => {
      handleMetadataChange({
        RadiopharmaceuticalInformationSequence: {
          RadiopharmaceuticalStartTime: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow, null, /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Label, {
    unit: "s"
  }, t('Acquisition Time')), /*#__PURE__*/react__rspack_import_0_default().createElement(InputRow.Input, {
    value: metadata.SeriesTime || '',
    onChange: () => {}
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.Button, {
    variant: "default",
    size: "sm",
    className: "self-end px-4",
    onClick: updateMetadata
  }, t('Reload Data'))))))));
}
_s(PanelPetSUV, "Q1NuMN+mHy1r1FE7KqV1y3pIK+0=", false, function () {
  return [_ohif_core__rspack_import_2.useSystem, react_i18next__rspack_import_3.useTranslation];
});
_c2 = PanelPetSUV;
PanelPetSUV.propTypes = {
  servicesManager: prop_types__rspack_import_1_default().shape({
    services: prop_types__rspack_import_1_default().shape({
      measurementService: prop_types__rspack_import_1_default().shape({
        getMeasurements: (prop_types__rspack_import_1_default().func.isRequired),
        subscribe: (prop_types__rspack_import_1_default().func.isRequired),
        EVENTS: (prop_types__rspack_import_1_default().object.isRequired),
        VALUE_TYPES: (prop_types__rspack_import_1_default().object.isRequired)
      }).isRequired
    }).isRequired
  }).isRequired
};
var _c, _c2;
$RefreshReg$(_c, "InputRow");
$RefreshReg$(_c2, "PanelPetSUV");
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (PanelRoiThresholdSegmentation)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_extension_cornerstone__rspack_import_1 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* import */ var _utils_handleROIThresholding__rspack_import_2 = __webpack_require__("../../../extensions/tmtv/src/utils/handleROIThresholding.ts");
/* import */ var _ohif_core_src_utils__rspack_import_3 = __webpack_require__("../../core/src/utils/index.ts");
/* import */ var _ohif_core_src__rspack_import_4 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_ui_next__rspack_import_5 = __webpack_require__("../../ui-next/src/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
var _s = $RefreshSig$();






function PanelRoiThresholdSegmentation() {
  _s();
  const {
    commandsManager,
    servicesManager
  } = (0,_ohif_core_src__rspack_import_4.useSystem)();
  const {
    segmentationService
  } = servicesManager.services;
  const {
    segmentationsWithRepresentations: segmentationsInfo
  } = (0,_ohif_extension_cornerstone__rspack_import_1.useActiveViewportSegmentationRepresentations)();
  const segmentationIds = segmentationsInfo?.map(info => info.segmentation.segmentationId) || [];
  const segmentations = segmentationsInfo?.map(info => info.segmentation) || [];
  (0,react__rspack_import_0.useEffect)(() => {
    const initialRun = async () => {
      for (const segmentationId of segmentationIds) {
        await (0,_utils_handleROIThresholding__rspack_import_2.handleROIThresholding)({
          segmentationId,
          commandsManager,
          segmentationService
        });
      }
    };
    initialRun();
  }, []);
  (0,react__rspack_import_0.useEffect)(() => {
    const debouncedHandleROIThresholding = (0,_ohif_core_src_utils__rspack_import_3.debounce)(async eventDetail => {
      const {
        segmentationId
      } = eventDetail;
      await (0,_utils_handleROIThresholding__rspack_import_2.handleROIThresholding)({
        segmentationId,
        commandsManager,
        segmentationService
      });
    }, 100);
    const dataModifiedCallback = eventDetail => {
      debouncedHandleROIThresholding(eventDetail);
    };
    const dataModifiedSubscription = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_DATA_MODIFIED, dataModifiedCallback);
    return () => {
      dataModifiedSubscription.unsubscribe();
    };
  }, [commandsManager, segmentationService]);

  // Find the first segmentation with a TMTV value since all of them have the same value
  const stats = segmentationService.getSegmentationGroupStats(segmentationIds);
  const tmtvValue = stats?.tmtv;
  const handleExportCSV = () => {
    if (!segmentations.length) {
      return;
    }
    commandsManager.runCommand('exportTMTVReportCSV', {
      segmentations,
      tmtv: tmtvValue,
      config: {}
    });
  };
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "mb-1 flex flex-col"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "invisible-scrollbar overflow-y-auto overflow-x-hidden"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "bg-popover flex items-baseline justify-between px-2 py-1"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "py-1"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "text-muted-foreground text-base font-bold uppercase"
  }, 'TMTV: '), /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "text-foreground"
  }, tmtvValue ? `${tmtvValue.toFixed(3)} mL` : '')), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_5.Button, {
    dataCY: "exportTmtvCsvReport",
    size: "sm",
    variant: "ghost",
    onClick: handleExportCSV
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "pl-1"
  }, "CSV"))))));
}
_s(PanelRoiThresholdSegmentation, "ewFqhyrrbGbH2S2gZLyAI+drn4Q=", false, function () {
  return [_ohif_core_src__rspack_import_4.useSystem, _ohif_extension_cornerstone__rspack_import_1.useActiveViewportSegmentationRepresentations];
});
_c = PanelRoiThresholdSegmentation;
var _c;
$RefreshReg$(_c, "PanelRoiThresholdSegmentation");
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/ROIThresholdConfiguration.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ROI_STAT: () => (ROI_STAT),
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_ui_next__rspack_import_1 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
var _s = $RefreshSig$();



const ROI_STAT = 'roi_stat';
const RANGE = 'range';
function ROIThresholdConfiguration({
  config,
  dispatch,
  runCommand
}) {
  _s();
  const {
    t
  } = (0,react_i18next__rspack_import_2.useTranslation)('ROIThresholdConfiguration');
  const options = [{
    value: ROI_STAT,
    label: t('Max'),
    placeHolder: t('Max')
  }, {
    value: RANGE,
    label: t('Range'),
    placeHolder: t('Range')
  }];
  const handlePercentageOfMaxSUVChange = e => {
    let value = e.target.value;
    if (value === '.') {
      value = '0.';
    }
    if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 1) {
      return;
    }
    dispatch({
      type: 'setWeight',
      payload: {
        weight: value
      }
    });
  };
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "bg-muted flex flex-col space-y-4 p-px"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex items-end space-x-3"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex min-w-0 flex-1 flex-col"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Select, {
    value: config.strategy,
    onValueChange: value => {
      dispatch({
        type: 'setStrategy',
        payload: {
          strategy: value
        }
      });
    }
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.SelectTrigger, {
    className: "w-full"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.SelectValue, {
    placeholder: options.find(option => option.value === config.strategy)?.placeHolder
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.SelectContent, {
    className: ""
  }, options.map(option => /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.SelectItem, {
    key: option.value,
    value: option.value
  }, option.label))))), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex-shrink-0"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex justify-end space-x-2"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Button, {
    variant: "secondary",
    onClick: () => runCommand('setStartSliceForROIThresholdTool')
  }, t('Start')), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Button, {
    variant: "secondary",
    onClick: () => runCommand('setEndSliceForROIThresholdTool')
  }, t('End'))))), config.strategy === ROI_STAT && /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "mr-0"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Label, null, t('Percentage of Max SUV'))), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Input, {
    "data-cy": "percentage-of-max-suv-input",
    className: "w-full",
    type: "text",
    value: config.weight,
    onChange: handlePercentageOfMaxSUVChange
  })), config.strategy !== ROI_STAT && /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "mr-2 text-sm"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex flex-col space-y-2"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Label, null, t('Lower & Upper Ranges')), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "w-10 text-left"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Label, null, "CT")), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex flex-1 space-x-2"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Input, {
    className: "w-full",
    type: "text",
    value: config.ctLower,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ctLower: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Input, {
    className: "w-full",
    type: "text",
    value: config.ctUpper,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ctUpper: e.target.value
        }
      });
    }
  })))), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "w-10 text-left"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Label, null, "PT")), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex flex-1 space-x-2"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Input, {
    className: "w-full",
    type: "text",
    value: config.ptLower,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ptLower: e.target.value
        }
      });
    }
  })), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Input, {
    className: "w-full",
    type: "text",
    value: config.ptUpper,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ptUpper: e.target.value
        }
      });
    }
  })))))));
}
_s(ROIThresholdConfiguration, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function () {
  return [react_i18next__rspack_import_2.useTranslation];
});
_c = ROIThresholdConfiguration;
/* export default */ const __rspack_default_export = (ROIThresholdConfiguration);
var _c;
$RefreshReg$(_c, "ROIThresholdConfiguration");
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _PanelROIThresholdExport__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

/* export default */ const __rspack_default_export = (_PanelROIThresholdExport__rspack_import_0["default"]);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/Panels/PanelTMTV.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (PanelTMTV)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_extension_cornerstone__rspack_import_1 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* import */ var _PanelROIThresholdSegmentation_PanelROIThresholdExport__rspack_import_2 = __webpack_require__("../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };



function PanelTMTV({
  configuration
}) {
  return /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Fragment), null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_cornerstone__rspack_import_1.PanelSegmentation, {
    configuration: configuration
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_PanelROIThresholdSegmentation_PanelROIThresholdExport__rspack_import_2["default"], null)));
}
_c = PanelTMTV;
var _c;
$RefreshReg$(_c, "PanelTMTV");
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/Panels/RectangleROIOptions.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_ui_next__rspack_import_1 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _PanelROIThresholdSegmentation_ROIThresholdConfiguration__rspack_import_2 = __webpack_require__("../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/ROIThresholdConfiguration.tsx");
/* import */ var _cornerstonejs_tools__rspack_import_3 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* import */ var _ohif_core__rspack_import_4 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_extension_cornerstone__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* import */ var react_i18next__rspack_import_6 = __webpack_require__("../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
var _s = $RefreshSig$();







const LOWER_CT_THRESHOLD_DEFAULT = -1024;
const UPPER_CT_THRESHOLD_DEFAULT = 1024;
const LOWER_PT_THRESHOLD_DEFAULT = 2.5;
const UPPER_PT_THRESHOLD_DEFAULT = 100;
const WEIGHT_DEFAULT = 0.41; // a default weight for suv max often used in the literature
const DEFAULT_STRATEGY = _PanelROIThresholdSegmentation_ROIThresholdConfiguration__rspack_import_2.ROI_STAT;
function reducer(state, action) {
  const {
    payload
  } = action;
  const {
    strategy,
    ctLower,
    ctUpper,
    ptLower,
    ptUpper,
    weight
  } = payload;
  switch (action.type) {
    case 'setStrategy':
      return {
        ...state,
        strategy
      };
    case 'setThreshold':
      return {
        ...state,
        ctLower: ctLower ? ctLower : state.ctLower,
        ctUpper: ctUpper ? ctUpper : state.ctUpper,
        ptLower: ptLower ? ptLower : state.ptLower,
        ptUpper: ptUpper ? ptUpper : state.ptUpper
      };
    case 'setWeight':
      return {
        ...state,
        weight
      };
    default:
      return state;
  }
}
function RectangleROIOptions() {
  _s();
  const {
    commandsManager
  } = (0,_ohif_core__rspack_import_4.useSystem)();
  const segmentations = (0,_ohif_extension_cornerstone__rspack_import_5.useSegmentations)();
  const activeSegmentation = segmentations[0];
  const {
    t
  } = (0,react_i18next__rspack_import_6.useTranslation)('ROIThresholdConfiguration');
  const runCommand = (0,react__rspack_import_0.useCallback)((commandName, commandOptions = {}) => {
    return commandsManager.runCommand(commandName, commandOptions);
  }, [commandsManager]);
  const [config, dispatch] = (0,react__rspack_import_0.useReducer)(reducer, {
    strategy: DEFAULT_STRATEGY,
    ctLower: LOWER_CT_THRESHOLD_DEFAULT,
    ctUpper: UPPER_CT_THRESHOLD_DEFAULT,
    ptLower: LOWER_PT_THRESHOLD_DEFAULT,
    ptUpper: UPPER_PT_THRESHOLD_DEFAULT,
    weight: WEIGHT_DEFAULT
  });
  const handleROIThresholding = (0,react__rspack_import_0.useCallback)(() => {
    if (!activeSegmentation) {
      return;
    }
    const segmentationId = activeSegmentation.segmentationId;
    const activeSegmentIndex = _cornerstonejs_tools__rspack_import_3.segmentation.segmentIndex.getActiveSegmentIndex(segmentationId);
    runCommand('thresholdSegmentationByRectangleROITool', {
      segmentationId,
      config,
      segmentIndex: activeSegmentIndex
    });
  }, [activeSegmentation, config]);
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "invisible-scrollbar mb-1 flex flex-col overflow-y-auto overflow-x-hidden"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_PanelROIThresholdSegmentation_ROIThresholdConfiguration__rspack_import_2["default"], {
    config: config,
    dispatch: dispatch,
    runCommand: runCommand
  }), activeSegmentation && /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.Button, {
    variant: "default",
    className: "my-3 mr-auto w-20",
    onClick: handleROIThresholding
  }, t('Run')));
}
_s(RectangleROIOptions, "NG5OJKWO2iK9umdBX9I0CrJWsZU=", false, function () {
  return [_ohif_core__rspack_import_4.useSystem, _ohif_extension_cornerstone__rspack_import_5.useSegmentations, react_i18next__rspack_import_6.useTranslation];
});
_c = RectangleROIOptions;
/* export default */ const __rspack_default_export = (RectangleROIOptions);
var _c;
$RefreshReg$(_c, "RectangleROIOptions");
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/Panels/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PanelPetSUV: () => (/* reexport safe */ _PanelPetSUV__rspack_import_0["default"]),
  PanelROIThresholdExport: () => (/* reexport safe */ _PanelROIThresholdSegmentation__rspack_import_1["default"])
});
/* import */ var _PanelPetSUV__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/Panels/PanelPetSUV.tsx");
/* import */ var _PanelROIThresholdSegmentation__rspack_import_1 = __webpack_require__("../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };



function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/commandsModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _ohif_core__rspack_import_0 = __webpack_require__("../../core/src/index.ts");
/* import */ var _cornerstonejs_core__rspack_import_1 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _cornerstonejs_tools__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* import */ var _ohif_i18n__rspack_import_3 = __webpack_require__("../../i18n/src/index.js");
/* import */ var _utils_getThresholdValue__rspack_import_4 = __webpack_require__("../../../extensions/tmtv/src/utils/getThresholdValue.ts");
/* import */ var _utils_createAndDownloadTMTVReport__rspack_import_5 = __webpack_require__("../../../extensions/tmtv/src/utils/createAndDownloadTMTVReport.js");
/* import */ var _utils_dicomRTAnnotationExport_RTStructureSet__rspack_import_6 = __webpack_require__("../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/index.js");
/* import */ var _ohif_extension_cornerstone__rspack_import_7 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };











const {
  SegmentationRepresentations
} = _cornerstonejs_tools__rspack_import_2.Enums;
const {
  formatPN
} = _ohif_core__rspack_import_0.utils;
const metadataProvider = _ohif_core__rspack_import_0.classes.MetadataProvider;
const ROI_THRESHOLD_MANUAL_TOOL_IDS = ['RectangleROIStartEndThreshold', 'RectangleROIThreshold', 'CircleROIStartEndThreshold'];
const commandsModule = ({
  servicesManager,
  commandsManager,
  extensionManager
}) => {
  const {
    viewportGridService,
    uiNotificationService,
    displaySetService,
    hangingProtocolService,
    toolGroupService,
    cornerstoneViewportService,
    segmentationService
  } = servicesManager.services;
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  const {
    getEnabledElement
  } = utilityModule.exports;
  function _getActiveViewportsEnabledElement() {
    const {
      activeViewportId
    } = viewportGridService.getState();
    const {
      element
    } = getEnabledElement(activeViewportId) || {};
    const enabledElement = _cornerstonejs_core__rspack_import_1.getEnabledElement(element);
    return enabledElement;
  }
  function _getAnnotationsSelectedByToolNames(toolNames) {
    return toolNames.reduce((allAnnotationUIDs, toolName) => {
      const annotationUIDs = _cornerstonejs_tools__rspack_import_2.annotation.selection.getAnnotationsSelectedByToolName(toolName);
      return allAnnotationUIDs.concat(annotationUIDs);
    }, []);
  }
  const actions = {
    getMatchingPTDisplaySet: ({
      viewportMatchDetails
    }) => {
      // Todo: this is assuming that the hanging protocol has successfully matched
      // the correct PT. For future, we should have a way to filter out the PTs
      // that are in the viewer layout (but then we have the problem of the attenuation
      // corrected PT vs the non-attenuation correct PT)

      let ptDisplaySet = null;
      for (const [, viewportDetails] of viewportMatchDetails) {
        const {
          displaySetsInfo
        } = viewportDetails;
        const displaySets = displaySetsInfo.map(({
          displaySetInstanceUID
        }) => displaySetService.getDisplaySetByUID(displaySetInstanceUID));
        if (!displaySets || displaySets.length === 0) {
          continue;
        }
        ptDisplaySet = displaySets.find(displaySet => displaySet.Modality === 'PT');
        if (ptDisplaySet) {
          break;
        }
      }
      return ptDisplaySet;
    },
    getPTMetadata: ({
      ptDisplaySet
    }) => {
      const dataSource = extensionManager.getDataSources()[0];
      const imageIds = dataSource.getImageIdsForDisplaySet(ptDisplaySet);
      const firstImageId = imageIds[0];
      const instance = metadataProvider.get('instance', firstImageId);
      if (instance.Modality !== 'PT') {
        return;
      }
      const metadata = {
        SeriesTime: instance.SeriesTime,
        Modality: instance.Modality,
        PatientSex: instance.PatientSex,
        PatientWeight: instance.PatientWeight,
        RadiopharmaceuticalInformationSequence: {
          RadionuclideTotalDose: instance.RadiopharmaceuticalInformationSequence[0].RadionuclideTotalDose,
          RadionuclideHalfLife: instance.RadiopharmaceuticalInformationSequence[0].RadionuclideHalfLife,
          RadiopharmaceuticalStartTime: instance.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartTime,
          RadiopharmaceuticalStartDateTime: instance.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartDateTime
        }
      };
      return metadata;
    },
    createNewLabelmapFromPT: async ({
      label
    }) => {
      // Create a segmentation of the same resolution as the source data
      // using volumeLoader.createAndCacheDerivedVolume.

      const {
        viewportMatchDetails
      } = hangingProtocolService.getMatchDetails();
      const ptDisplaySet = actions.getMatchingPTDisplaySet({
        viewportMatchDetails
      });
      let withPTViewportId = null;
      for (const [viewportId, {
        displaySetsInfo
      }] of viewportMatchDetails.entries()) {
        const isPT = displaySetsInfo.some(({
          displaySetInstanceUID
        }) => displaySetInstanceUID === ptDisplaySet.displaySetInstanceUID);
        if (isPT) {
          withPTViewportId = viewportId;
          break;
        }
      }
      if (!ptDisplaySet) {
        uiNotificationService.error('No matching PT display set found');
        return;
      }
      const currentSegmentations = segmentationService.getSegmentationRepresentations(withPTViewportId);
      const displaySet = displaySetService.getDisplaySetByUID(ptDisplaySet.displaySetInstanceUID);
      const segmentationId = await segmentationService.createLabelmapForDisplaySet(displaySet, {
        label: `Segmentation ${currentSegmentations.length + 1}`,
        segments: {
          1: {
            label: `${_ohif_i18n__rspack_import_3["default"].t('Segment')} 1`,
            active: true
          }
        }
      });
      segmentationService.addSegmentationRepresentation(withPTViewportId, {
        segmentationId
      });
      return segmentationId;
    },
    thresholdSegmentationByRectangleROITool: ({
      segmentationId,
      config,
      segmentIndex
    }) => {
      const segmentation = _cornerstonejs_tools__rspack_import_2.segmentation.state.getSegmentation(segmentationId);
      const {
        representationData
      } = segmentation;
      const {
        displaySetMatchDetails: matchDetails
      } = hangingProtocolService.getMatchDetails();
      const ctDisplaySetMatch = matchDetails.get('ctDisplaySet');
      const ptDisplaySetMatch = matchDetails.get('ptDisplaySet');
      const ctDisplaySet = displaySetService.getDisplaySetByUID(ctDisplaySetMatch.displaySetInstanceUID);
      const ptDisplaySet = displaySetService.getDisplaySetByUID(ptDisplaySetMatch.displaySetInstanceUID);
      const {
        volumeId: segVolumeId
      } = representationData[SegmentationRepresentations.Labelmap];
      const labelmapVolume = _cornerstonejs_core__rspack_import_1.cache.getVolume(segVolumeId);
      const annotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      if (annotationUIDs.length === 0) {
        uiNotificationService.show({
          title: 'Commands Module',
          message: 'No ROIThreshold Tool is Selected',
          type: 'error'
        });
        return;
      }
      const {
        ptLower,
        ptUpper,
        ctLower,
        ctUpper
      } = (0,_utils_getThresholdValue__rspack_import_4["default"])(annotationUIDs, ptDisplaySet, config);
      const {
        imageIds: ptImageIds
      } = ptDisplaySet;
      const ptVolumeInfo = _cornerstonejs_core__rspack_import_1.cache.getVolumeContainingImageId(ptImageIds[0]);
      if (!ptVolumeInfo) {
        uiNotificationService.error('No PT volume found');
        return;
      }
      const {
        imageIds: ctImageIds
      } = ctDisplaySet;
      const ctVolumeInfo = _cornerstonejs_core__rspack_import_1.cache.getVolumeContainingImageId(ctImageIds[0]);
      if (!ctVolumeInfo) {
        uiNotificationService.error('No CT volume found');
        return;
      }
      const ptVolume = ptVolumeInfo.volume;
      const ctVolume = ctVolumeInfo.volume;
      return _cornerstonejs_tools__rspack_import_2.utilities.segmentation.rectangleROIThresholdVolumeByRange(annotationUIDs, labelmapVolume, [{
        volume: ptVolume,
        lower: ptLower,
        upper: ptUpper
      }, {
        volume: ctVolume,
        lower: ctLower,
        upper: ctUpper
      }], {
        overwrite: true,
        segmentIndex,
        segmentationId
      });
    },
    calculateTMTV: async ({
      segmentations
    }) => {
      const segmentationIds = segmentations.map(segmentation => segmentation.segmentationId);
      const stats = await _cornerstonejs_tools__rspack_import_2.utilities.segmentation.computeMetabolicStats({
        segmentationIds,
        segmentIndex: 1
      });
      segmentationService.setSegmentationGroupStats(segmentationIds, stats);
      return stats;
    },
    exportTMTVReportCSV: async ({
      segmentations,
      tmtv,
      config,
      options
    }) => {
      const segReport = commandsManager.runCommand('getSegmentationCSVReport', {
        segmentations
      });
      let total_tlg = 0;
      for (const segmentationId in segReport) {
        const report = segReport[segmentationId];
        const tlg = report['namedStats_lesionGlycolysis'];
        total_tlg += tlg.value;
      }
      const additionalReportRows = [{
        key: 'Total Lesion Glycolysis',
        value: {
          tlg: total_tlg.toFixed(4)
        }
      }, {
        key: 'Threshold Configuration',
        value: {
          ...config
        }
      }];
      if (tmtv !== undefined) {
        additionalReportRows.unshift({
          key: 'Total Metabolic Tumor Volume',
          value: {
            tmtv
          }
        });
      }
      (0,_utils_createAndDownloadTMTVReport__rspack_import_5["default"])(segReport, additionalReportRows, options);
    },
    setStartSliceForROIThresholdTool: () => {
      const {
        viewport
      } = _getActiveViewportsEnabledElement();
      // Native ("next") viewports have no getCamera; the slice-center focal point
      // comes from the view reference. Bridged so both lanes work.
      const focalPoint = (0,_ohif_extension_cornerstone__rspack_import_7.getViewportFocalPoint)(viewport);

      // Native viewports may not resolve a focal point; writing undefined into the
      // annotation would invalidate its ROI-threshold coordinates.
      if (!focalPoint) {
        return;
      }
      const selectedAnnotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      const annotationUID = selectedAnnotationUIDs[0];
      const annotation = _cornerstonejs_tools__rspack_import_2.annotation.state.getAnnotation(annotationUID);

      // set the current focal point
      annotation.data.startCoordinate = focalPoint;
      // IMPORTANT: invalidate the toolData for the cached stat to get updated
      // and re-calculate the projection points
      annotation.invalidated = true;
      viewport.render();
    },
    setEndSliceForROIThresholdTool: () => {
      const {
        viewport
      } = _getActiveViewportsEnabledElement();
      const selectedAnnotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      const annotationUID = selectedAnnotationUIDs[0];
      const annotation = _cornerstonejs_tools__rspack_import_2.annotation.state.getAnnotation(annotationUID);

      // get the current focal point (bridged: native viewports use the view reference)
      const focalPointToEnd = (0,_ohif_extension_cornerstone__rspack_import_7.getViewportFocalPoint)(viewport);
      if (!focalPointToEnd) {
        return;
      }
      annotation.data.endCoordinate = focalPointToEnd;

      // IMPORTANT: invalidate the toolData for the cached stat to get updated
      // and re-calculate the projection points
      annotation.invalidated = true;
      viewport.render();
    },
    createTMTVRTReport: () => {
      // get all Rectangle ROI annotation
      const stateManager = _cornerstonejs_tools__rspack_import_2.annotation.state.getAnnotationManager();
      const annotations = [];
      Object.keys(stateManager.annotations).forEach(frameOfReferenceUID => {
        const forAnnotations = stateManager.annotations[frameOfReferenceUID];
        const ROIAnnotations = ROI_THRESHOLD_MANUAL_TOOL_IDS.reduce((annotations, toolName) => [...annotations, ...(forAnnotations[toolName] ?? [])], []);
        annotations.push(...ROIAnnotations);
      });
      commandsManager.runCommand('exportRTReportForAnnotations', {
        annotations
      });
    },
    getSegmentationCSVReport: ({
      segmentations
    }) => {
      if (!segmentations || !segmentations.length) {
        segmentations = segmentationService.getSegmentations();
      }
      const report = {};
      for (const segmentation of segmentations) {
        const {
          label,
          segmentationId,
          representationData
        } = segmentation;
        const id = segmentationId;
        const segReport = {
          id,
          label
        };
        if (!representationData) {
          report[id] = segReport;
          continue;
        }
        const {
          cachedStats
        } = segmentation.segments[1] || {}; // Assuming we want stats from the first segment

        if (cachedStats) {
          Object.entries(cachedStats).forEach(([key, value]) => {
            if (typeof value !== 'object') {
              segReport[key] = value;
            } else {
              Object.entries(value).forEach(([subKey, subValue]) => {
                const newKey = `${key}_${subKey}`;
                segReport[newKey] = subValue;
              });
            }
          });
        }
        const labelmapVolume = segmentation.representationData[SegmentationRepresentations.Labelmap];
        if (!labelmapVolume) {
          report[id] = segReport;
          continue;
        }
        const referencedVolume = _cornerstonejs_tools__rspack_import_2.utilities.segmentation.getReferenceVolumeForSegmentation(segmentationId);
        if (!referencedVolume) {
          report[id] = segReport;
          continue;
        }
        if (!referencedVolume.imageIds || !referencedVolume.imageIds.length) {
          report[id] = segReport;
          continue;
        }
        const firstImageId = referencedVolume.imageIds[0];
        const instance = _ohif_core__rspack_import_0["default"].classes.MetadataProvider.get('instance', firstImageId);
        if (!instance) {
          report[id] = segReport;
          continue;
        }
        report[id] = {
          ...segReport,
          PatientID: instance.PatientID ?? '000000',
          PatientName: formatPN(instance.PatientName),
          StudyInstanceUID: instance.StudyInstanceUID,
          SeriesInstanceUID: instance.SeriesInstanceUID,
          StudyDate: instance.StudyDate
        };
      }
      return report;
    },
    exportRTReportForAnnotations: ({
      annotations
    }) => {
      (0,_utils_dicomRTAnnotationExport_RTStructureSet__rspack_import_6["default"])(annotations);
    },
    setFusionPTColormap: ({
      toolGroupId,
      colormap
    }) => {
      const toolGroup = toolGroupService.getToolGroup(toolGroupId);
      if (!toolGroup) {
        return;
      }
      const {
        viewportMatchDetails
      } = hangingProtocolService.getMatchDetails();
      const ptDisplaySet = actions.getMatchingPTDisplaySet({
        viewportMatchDetails
      });
      if (!ptDisplaySet) {
        return;
      }
      const fusionViewportIds = toolGroup.getViewportIds();
      const viewports = [];
      fusionViewportIds.forEach(viewportId => {
        commandsManager.runCommand('setViewportColormap', {
          viewportId,
          displaySetInstanceUID: ptDisplaySet.displaySetInstanceUID,
          colormap: {
            name: colormap
          }
        });
        viewports.push(cornerstoneViewportService.getCornerstoneViewport(viewportId));
      });
      viewports.forEach(viewport => {
        viewport.render();
      });
    }
  };
  const definitions = {
    setEndSliceForROIThresholdTool: {
      commandFn: actions.setEndSliceForROIThresholdTool
    },
    setStartSliceForROIThresholdTool: {
      commandFn: actions.setStartSliceForROIThresholdTool
    },
    getMatchingPTDisplaySet: {
      commandFn: actions.getMatchingPTDisplaySet
    },
    getPTMetadata: {
      commandFn: actions.getPTMetadata
    },
    createNewLabelmapFromPT: {
      commandFn: actions.createNewLabelmapFromPT
    },
    thresholdSegmentationByRectangleROITool: {
      commandFn: actions.thresholdSegmentationByRectangleROITool
    },
    calculateTMTV: {
      commandFn: actions.calculateTMTV
    },
    exportTMTVReportCSV: {
      commandFn: actions.exportTMTVReportCSV
    },
    createTMTVRTReport: {
      commandFn: actions.createTMTVRTReport
    },
    getSegmentationCSVReport: {
      commandFn: actions.getSegmentationCSVReport
    },
    exportRTReportForAnnotations: {
      commandFn: actions.exportRTReportForAnnotations
    },
    setFusionPTColormap: {
      commandFn: actions.setFusionPTColormap
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'TMTV:CORNERSTONE'
  };
};
/* export default */ const __rspack_default_export = (commandsModule);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/customizations/toolbarCustomization.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  MAX_SEGMENTATION_DRAWING_RADIUS: () => (MAX_SEGMENTATION_DRAWING_RADIUS),
  MIN_SEGMENTATION_DRAWING_RADIUS: () => (MIN_SEGMENTATION_DRAWING_RADIUS),
  "default": () => (__rspack_default_export),
  toolbarButtons: () => (toolbarButtons),
  toolbarSections: () => (toolbarSections)
});
/* import */ var _ohif_core__rspack_import_0 = __webpack_require__("../../core/src/index.ts");
/* import */ var i18next__rspack_import_1 = __webpack_require__("../../../node_modules/i18next/dist/esm/i18next.js");
/* import */ var _toolGroupIds__rspack_import_2 = __webpack_require__("../../../extensions/tmtv/src/toolGroupIds.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };



const {
  TOOLBAR_SECTIONS
} = _ohif_core__rspack_import_0.ToolbarService;
const MIN_SEGMENTATION_DRAWING_RADIUS = 0.5;
const MAX_SEGMENTATION_DRAWING_RADIUS = 99.5;
const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: [_toolGroupIds__rspack_import_2.toolGroupIds.CT, _toolGroupIds__rspack_import_2.toolGroupIds.PT, _toolGroupIds__rspack_import_2.toolGroupIds.Fusion]
  }
};

/**
 * Default toolbar buttons for the TMTV mode, registered as the
 * `tmtv.toolbarButtons` customization so `?customization=` modules can extend
 * or replace them.
 */
const toolbarButtons = [{
  id: 'MeasurementTools',
  uiType: 'ohif.toolButtonList',
  props: {
    buttonSection: true
  }
}, {
  id: 'SegmentationTools',
  uiType: 'ohif.toolBoxButton',
  props: {
    buttonSection: true
  }
}, {
  id: 'BrushTools',
  uiType: 'ohif.toolBoxButtonGroup',
  props: {
    buttonSection: true
  }
}, {
  id: 'AdvancedRenderingControls',
  uiType: 'ohif.advancedRenderingControls',
  props: {
    buttonSection: true
  }
}, {
  id: 'modalityLoadBadge',
  uiType: 'ohif.modalityLoadBadge',
  props: {
    icon: 'Status',
    label: i18next__rspack_import_1["default"].t('Buttons:Status'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Status'),
    evaluate: {
      name: 'evaluate.modalityLoadBadge',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'Colorbar',
  uiType: 'ohif.colorbar',
  props: {
    type: 'tool',
    label: i18next__rspack_import_1["default"].t('Buttons:Colorbar')
  }
}, {
  id: 'navigationComponent',
  uiType: 'ohif.navigationComponent',
  props: {
    icon: 'Navigation',
    label: i18next__rspack_import_1["default"].t('Buttons:Navigation'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Navigate between segments/measurements and manage their visibility'),
    evaluate: {
      name: 'evaluate.navigationComponent',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'windowLevelMenuEmbedded',
  uiType: 'ohif.windowLevelMenuEmbedded',
  props: {
    icon: 'WindowLevel',
    label: i18next__rspack_import_1["default"].t('Buttons:Window Level'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Adjust window/level presets and customize image contrast settings'),
    evaluate: {
      name: 'evaluate.windowLevelMenuEmbedded',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'trackingStatus',
  uiType: 'ohif.trackingStatus',
  props: {
    icon: 'TrackingStatus',
    label: i18next__rspack_import_1["default"].t('Buttons:Tracking Status'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:View and manage tracking status of measurements and annotations'),
    evaluate: {
      name: 'evaluate.trackingStatus',
      hideWhenDisabled: true
    }
  }
}, {
  id: 'Length',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-length',
    label: i18next__rspack_import_1["default"].t('Buttons:Length'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Length Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Bidirectional',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-bidirectional',
    label: i18next__rspack_import_1["default"].t('Buttons:Bidirectional'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Bidirectional Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'ArrowAnnotate',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-annotate',
    label: i18next__rspack_import_1["default"].t('Buttons:Arrow Annotate'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Arrow Annotate Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'EllipticalROI',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-ellipse',
    label: i18next__rspack_import_1["default"].t('Buttons:Ellipse'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Ellipse Tool'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-zoom',
    label: i18next__rspack_import_1["default"].t('Buttons:Zoom'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'WindowLevel',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-window-level',
    label: i18next__rspack_import_1["default"].t('Buttons:Window Level'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Crosshairs',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-crosshair',
    label: i18next__rspack_import_1["default"].t('Buttons:Crosshairs'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Pan',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'tool-move',
    label: i18next__rspack_import_1["default"].t('Buttons:Pan'),
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'RectangleROIStartEndThreshold',
  uiType: 'ohif.toolBoxButton',
  props: {
    icon: 'tool-create-threshold',
    label: i18next__rspack_import_1["default"].t('Buttons:Rectangle ROI Threshold'),
    commands: setToolActiveToolbar,
    evaluate: ['evaluate.cornerstone.segmentation', {
      name: 'evaluate.cornerstoneTool',
      disabledText: i18next__rspack_import_1["default"].t('Buttons:Select the PT Axial to enable this tool')
    }],
    options: 'tmtv.RectangleROIThresholdOptions'
  }
}, {
  id: 'Brush',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-brush',
    label: i18next__rspack_import_1["default"].t('Buttons:Brush'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['CircularBrush', 'SphereBrush'],
      disabledText: i18next__rspack_import_1["default"].t('Buttons:Create new segmentation to enable this tool.')
    }, {
      name: 'evaluate.cornerstone.segmentation.synchronizeDrawingRadius',
      radiusOptionId: 'brush-radius'
    }],
    options: [{
      name: i18next__rspack_import_1["default"].t('Buttons:Radius (mm)'),
      id: 'brush-radius',
      type: 'range',
      explicitRunOnly: true,
      min: MIN_SEGMENTATION_DRAWING_RADIUS,
      max: MAX_SEGMENTATION_DRAWING_RADIUS,
      step: 0.5,
      value: 25,
      commands: {
        commandName: 'setBrushSize',
        commandOptions: {
          toolNames: ['CircularBrush', 'SphereBrush']
        }
      }
    }, {
      name: i18next__rspack_import_1["default"].t('Buttons:Shape'),
      type: 'radio',
      id: 'brush-mode',
      value: 'CircularBrush',
      values: [{
        value: 'CircularBrush',
        label: i18next__rspack_import_1["default"].t('Buttons:Circle')
      }, {
        value: 'SphereBrush',
        label: i18next__rspack_import_1["default"].t('Buttons:Sphere')
      }],
      commands: 'setToolActiveToolbar'
    }]
  }
}, {
  id: 'Eraser',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-eraser',
    label: i18next__rspack_import_1["default"].t('Buttons:Eraser'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['CircularEraser', 'SphereEraser']
    }, {
      name: 'evaluate.cornerstone.segmentation.synchronizeDrawingRadius',
      radiusOptionId: 'eraser-radius'
    }],
    options: [{
      name: i18next__rspack_import_1["default"].t('Buttons:Radius (mm)'),
      id: 'eraser-radius',
      type: 'range',
      explicitRunOnly: true,
      min: MIN_SEGMENTATION_DRAWING_RADIUS,
      max: MAX_SEGMENTATION_DRAWING_RADIUS,
      step: 0.5,
      value: 25,
      commands: {
        commandName: 'setBrushSize',
        commandOptions: {
          toolNames: ['CircularEraser', 'SphereEraser']
        }
      }
    }, {
      name: i18next__rspack_import_1["default"].t('Buttons:Shape'),
      type: 'radio',
      id: 'eraser-mode',
      value: 'CircularEraser',
      values: [{
        value: 'CircularEraser',
        label: i18next__rspack_import_1["default"].t('Buttons:Circle')
      }, {
        value: 'SphereEraser',
        label: i18next__rspack_import_1["default"].t('Buttons:Sphere')
      }],
      commands: 'setToolActiveToolbar'
    }]
  }
}, {
  id: 'Threshold',
  uiType: 'ohif.toolButton',
  props: {
    icon: 'icon-tool-threshold',
    label: i18next__rspack_import_1["default"].t('Buttons:Threshold Tool'),
    evaluate: [{
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush', 'ThresholdCircularBrushDynamic']
    }, {
      name: 'evaluate.cornerstone.segmentation.synchronizeDrawingRadius',
      radiusOptionId: 'threshold-radius'
    }],
    options: [{
      name: i18next__rspack_import_1["default"].t('Buttons:Radius (mm)'),
      id: 'threshold-radius',
      type: 'range',
      explicitRunOnly: true,
      min: MIN_SEGMENTATION_DRAWING_RADIUS,
      max: MAX_SEGMENTATION_DRAWING_RADIUS,
      step: 0.5,
      value: 25,
      commands: {
        commandName: 'setBrushSize',
        commandOptions: {
          toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush', 'ThresholdCircularBrushDynamic']
        }
      }
    }, {
      name: i18next__rspack_import_1["default"].t('Buttons:Threshold'),
      type: 'radio',
      id: 'dynamic-mode',
      value: 'ThresholdRange',
      values: [{
        value: 'ThresholdDynamic',
        label: i18next__rspack_import_1["default"].t('Buttons:Dynamic')
      }, {
        value: 'ThresholdRange',
        label: i18next__rspack_import_1["default"].t('Buttons:Range')
      }],
      commands: ({
        value,
        commandsManager
      }) => {
        if (value === 'ThresholdDynamic') {
          commandsManager.run('setToolActive', {
            toolName: 'ThresholdCircularBrushDynamic'
          });
        } else {
          commandsManager.run('setToolActive', {
            toolName: 'ThresholdCircularBrush'
          });
        }
      }
    }, {
      name: i18next__rspack_import_1["default"].t('Buttons:Shape'),
      type: 'radio',
      id: 'eraser-mode',
      value: 'ThresholdCircularBrush',
      values: [{
        value: 'ThresholdCircularBrush',
        label: i18next__rspack_import_1["default"].t('Buttons:Circle')
      }, {
        value: 'ThresholdSphereBrush',
        label: i18next__rspack_import_1["default"].t('Buttons:Sphere')
      }],
      condition: ({
        options
      }) => options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
      commands: 'setToolActiveToolbar'
    }, {
      name: i18next__rspack_import_1["default"].t('ROIThresholdConfiguration:ThresholdRange'),
      type: 'double-range',
      id: 'threshold-range',
      min: 0,
      max: 50,
      step: 0.5,
      value: [2.5, 50],
      condition: ({
        options
      }) => options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
      commands: {
        commandName: 'setThresholdRange',
        commandOptions: {
          toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush']
        }
      }
    }]
  }
}, {
  id: 'dataOverlayMenu',
  uiType: 'ohif.dataOverlayMenu',
  props: {
    icon: 'ViewportViews',
    label: i18next__rspack_import_1["default"].t('Buttons:Data Overlay'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Configure data overlay options and manage foreground/background display sets'),
    evaluate: 'evaluate.dataOverlayMenu'
  }
}, {
  id: 'orientationMenu',
  uiType: 'ohif.orientationMenu',
  props: {
    icon: 'OrientationSwitch',
    label: i18next__rspack_import_1["default"].t('Buttons:Orientation'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Change viewport orientation between axial, sagittal, coronal and reformat planes'),
    evaluate: {
      name: 'evaluate.orientationMenu'
      // hideWhenDisabled: true,
    }
  }
}, {
  id: 'windowLevelMenu',
  uiType: 'ohif.windowLevelMenu',
  props: {
    icon: 'WindowLevel',
    label: i18next__rspack_import_1["default"].t('Buttons:Window Level'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Adjust window/level presets and customize image contrast settings'),
    evaluate: 'evaluate.windowLevelMenu'
  }
}, {
  id: 'voiManualControlMenu',
  uiType: 'ohif.voiManualControlMenu',
  props: {
    icon: 'WindowLevelAdvanced',
    label: i18next__rspack_import_1["default"].t('Buttons:Advanced Window Level'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Advanced window/level settings with manual controls and presets'),
    evaluate: 'evaluate.voiManualControlMenu'
  }
}, {
  id: 'thresholdMenu',
  uiType: 'ohif.thresholdMenu',
  props: {
    icon: 'Threshold',
    label: i18next__rspack_import_1["default"].t('Buttons:Threshold'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Image threshold settings'),
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
    label: i18next__rspack_import_1["default"].t('Buttons:Opacity'),
    tooltip: i18next__rspack_import_1["default"].t('Buttons:Image opacity settings'),
    evaluate: {
      name: 'evaluate.opacityMenu',
      hideWhenDisabled: true
    }
  }
}];

/**
 * Default toolbar layout for the TMTV mode, registered as the
 * `tmtv.toolbarSections` customization.
 */
const toolbarSections = {
  [TOOLBAR_SECTIONS.primary]: ['MeasurementTools', 'Zoom', 'Pan', 'WindowLevel', 'Crosshairs'],
  [TOOLBAR_SECTIONS.viewportActionMenu.topLeft]: ['orientationMenu', 'dataOverlayMenu'],
  [TOOLBAR_SECTIONS.viewportActionMenu.bottomMiddle]: ['AdvancedRenderingControls'],
  AdvancedRenderingControls: ['windowLevelMenuEmbedded', 'voiManualControlMenu', 'Colorbar', 'opacityMenu', 'thresholdMenu'],
  [TOOLBAR_SECTIONS.viewportActionMenu.topRight]: ['modalityLoadBadge', 'trackingStatus', 'navigationComponent'],
  [TOOLBAR_SECTIONS.viewportActionMenu.bottomLeft]: ['windowLevelMenu'],
  MeasurementTools: ['Length', 'Bidirectional', 'ArrowAnnotate', 'EllipticalROI'],
  ROIThresholdToolbox: ['SegmentationTools'],
  SegmentationTools: ['RectangleROIStartEndThreshold', 'BrushTools'],
  BrushTools: ['Brush', 'Eraser', 'Threshold']
};

/**
 * TMTV-specific capability packs registered (at default scope) by the tmtv
 * extension. These are the TMTV mode's specialized toolbar buttons and layout;
 * the TMTV mode composes them by name in its own `toolbarButtons` /
 * `toolbarSections` instance arrays, and `?customization=` modules extend the
 * result through the `mode` phase.
 */
const toolbarCustomization = {
  'tmtv.toolbarButtons': toolbarButtons,
  'tmtv.toolbarSections': toolbarSections
};

/* export default */ const __rspack_default_export = (toolbarCustomization);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/getCustomizationModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (getCustomizationModule)
});
/* import */ var _customizations_toolbarCustomization__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/customizations/toolbarCustomization.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };


/**
 * Registers the TMTV-specific capability packs (toolbar buttons and section
 * layout) so the TMTV mode can compose them by name and `?customization=`
 * modules can extend the result through the `mode` phase.
 */
function getCustomizationModule() {
  return [{
    name: 'default',
    value: {
      ..._customizations_toolbarCustomization__rspack_import_0["default"]
    }
  }];
}
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/getHangingProtocolModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _ohif_extension_cornerstone__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* import */ var _utils_hpViewports__rspack_import_1 = __webpack_require__("../../../extensions/tmtv/src/utils/hpViewports.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };



/**
 * represents a 3x4 viewport layout configuration. The layout displays CT axial, sagittal, and coronal
 * images in the first row, PT axial, sagittal, and coronal images in the second row, and fusion axial,
 * sagittal, and coronal images in the third row. The fourth column is fully spanned by a MIP sagittal
 * image, covering all three rows. It has synchronizers for windowLevel for all CT and PT images, and
 * also camera synchronizer for each orientation
 */
const stage1 = {
  name: 'default',
  id: 'default',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 3,
      columns: 4,
      layoutOptions: [{
        x: 0,
        y: 0,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 1 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 2 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 0,
        y: 1 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 1 / 4,
        y: 1 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 2 / 4,
        y: 1 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 0,
        y: 2 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 1 / 4,
        y: 2 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 2 / 4,
        y: 2 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 3 / 4,
        y: 0,
        width: 1 / 4,
        height: 1
      }]
    }
  },
  viewports: [_utils_hpViewports__rspack_import_1.ctAXIAL, _utils_hpViewports__rspack_import_1.ctSAGITTAL, _utils_hpViewports__rspack_import_1.ctCORONAL, _utils_hpViewports__rspack_import_1.ptAXIAL, _utils_hpViewports__rspack_import_1.ptSAGITTAL, _utils_hpViewports__rspack_import_1.ptCORONAL, _utils_hpViewports__rspack_import_1.fusionAXIAL, _utils_hpViewports__rspack_import_1.fusionSAGITTAL, _utils_hpViewports__rspack_import_1.fusionCORONAL, _utils_hpViewports__rspack_import_1.mipSAGITTAL],
  createdDate: '2021-02-23T18:32:42.850Z'
};

/**
 * The layout displays CT axial image in the top-left viewport, fusion axial image
 * in the top-right viewport, PT axial image in the bottom-left viewport, and MIP
 * sagittal image in the bottom-right viewport. The layout follows a simple grid
 * pattern with 2 rows and 2 columns. It includes synchronizers as well.
 */
const stage2 = {
  name: 'Fusion 2x2',
  id: 'Fusion-2x2',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 2
    }
  },
  viewports: [_utils_hpViewports__rspack_import_1.ctAXIAL, _utils_hpViewports__rspack_import_1.fusionAXIAL, _utils_hpViewports__rspack_import_1.ptAXIAL, _utils_hpViewports__rspack_import_1.mipSAGITTAL]
};

/**
 * The top row displays CT images in axial, sagittal, and coronal orientations from
 * left to right, respectively. The bottom row displays PT images in axial, sagittal,
 * and coronal orientations from left to right, respectively.
 * The layout follows a simple grid pattern with 2 rows and 3 columns.
 * It includes synchronizers as well.
 */
const stage3 = {
  name: '2x3-layout',
  id: '2x3-layout',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 3
    }
  },
  viewports: [_utils_hpViewports__rspack_import_1.ctAXIAL, _utils_hpViewports__rspack_import_1.ctSAGITTAL, _utils_hpViewports__rspack_import_1.ctCORONAL, _utils_hpViewports__rspack_import_1.ptAXIAL, _utils_hpViewports__rspack_import_1.ptSAGITTAL, _utils_hpViewports__rspack_import_1.ptCORONAL]
};

/**
 * In this layout, the top row displays PT images in coronal, sagittal, and axial
 * orientations from left to right, respectively, followed by a MIP sagittal image
 * that spans both rows on the rightmost side. The bottom row displays fusion images
 * in coronal, sagittal, and axial orientations from left to right, respectively.
 * There is no viewport in the bottom row's rightmost position, as the MIP sagittal viewport
 * from the top row spans the full height of both rows.
 * It includes synchronizers as well.
 */
const stage4 = {
  name: '2x4-layout',
  id: '2x4-layout',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 4,
      layoutOptions: [{
        x: 0,
        y: 0,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 1 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 2 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 3 / 4,
        y: 0,
        width: 1 / 4,
        height: 1
      }, {
        x: 0,
        y: 1 / 2,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 1 / 4,
        y: 1 / 2,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 2 / 4,
        y: 1 / 2,
        width: 1 / 4,
        height: 1 / 2
      }]
    }
  },
  viewports: [_utils_hpViewports__rspack_import_1.ptCORONAL, _utils_hpViewports__rspack_import_1.ptSAGITTAL, _utils_hpViewports__rspack_import_1.ptAXIAL, _utils_hpViewports__rspack_import_1.mipSAGITTAL, _utils_hpViewports__rspack_import_1.fusionCORONAL, _utils_hpViewports__rspack_import_1.fusionSAGITTAL, _utils_hpViewports__rspack_import_1.fusionAXIAL]
};

/**
 * This layout displays three fusion viewports: axial, sagittal, and coronal.
 * It follows a simple grid pattern with 1 row and 3 columns.
 */
// const stage0: AppTypes.HangingProtocol.ProtocolStage = {
//   name: 'Fusion 1x3',
//   viewportStructure: {
//     layoutType: 'grid',
//     properties: {
//       rows: 1,
//       columns: 3,
//     },
//   },
//   viewports: [fusionAXIAL, fusionSAGITTAL, fusionCORONAL],
// };

const ptCT = {
  id: '@ohif/extension-tmtv.hangingProtocolModule.ptCT',
  locked: true,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2022-10-04T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  imageLoadStrategy: 'interleaveTopToBottom',
  // "default" , "interleaveTopToBottom",  "interleaveCenter"
  protocolMatchingRules: [{
    attribute: 'ModalitiesInStudy',
    constraint: {
      contains: ['CT', 'PT']
    }
  }, {
    attribute: 'StudyDescription',
    constraint: {
      contains: 'PETCT'
    }
  }, {
    attribute: 'StudyDescription',
    constraint: {
      contains: 'PET/CT'
    }
  }],
  displaySetSelectors: {
    ctDisplaySet: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: {
            value: 'CT'
          }
        },
        required: true
      }, {
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }, {
        attribute: 'SeriesDescription',
        constraint: {
          contains: 'CT'
        }
      }, {
        attribute: 'SeriesDescription',
        constraint: {
          contains: 'CT WB'
        }
      }]
    },
    ptDisplaySet: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: 'PT'
        },
        required: true
      }, {
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }, {
        attribute: 'SeriesDescription',
        constraint: {
          contains: 'Corrected'
        }
      }, {
        weight: 2,
        attribute: 'SeriesDescription',
        constraint: {
          doesNotContain: {
            value: 'Uncorrected'
          }
        }
      }]
    }
  },
  stages: [stage1, stage2, stage3, stage4],
  numberOfPriorsReferenced: -1
};
function getHangingProtocolModule() {
  // Replace the fusion PT opacity ramp with a flat scalar for the native ("next")
  // path only, leaving the legacy ramp in hpViewports untouched. Done here (not at
  // module load) because the useNextViewports flag is set during cornerstone
  // preRegistration, which runs before this module is gathered.
  if ((0,_ohif_extension_cornerstone__rspack_import_0.isNextViewportsEnabled)()) {
    [_utils_hpViewports__rspack_import_1.fusionAXIAL, _utils_hpViewports__rspack_import_1.fusionSAGITTAL, _utils_hpViewports__rspack_import_1.fusionCORONAL].forEach(viewport => {
      const ptDisplaySet = viewport.displaySets?.find(ds => ds.id === 'ptDisplaySet');
      const colormap = ptDisplaySet?.options?.colormap;
      if (colormap) {
        colormap.opacity = _ohif_extension_cornerstone__rspack_import_0.NEXT_FUSION_PT_OPACITY;
      }
    });
  }
  return [{
    name: ptCT.id,
    protocol: ptCT
  }];
}
/* export default */ const __rspack_default_export = (getHangingProtocolModule);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/getPanelModule.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Panels__rspack_import_1 = __webpack_require__("../../../extensions/tmtv/src/Panels/index.tsx");
/* import */ var _ohif_extension_default__rspack_import_2 = __webpack_require__("../../../extensions/default/src/index.ts");
/* import */ var _Panels_PanelTMTV__rspack_import_3 = __webpack_require__("../../../extensions/tmtv/src/Panels/PanelTMTV.tsx");
/* import */ var _ohif_i18n__rspack_import_4 = __webpack_require__("../../i18n/src/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };





function getPanelModule({
  commandsManager,
  extensionManager,
  servicesManager
}) {
  const {
    toolbarService
  } = servicesManager.services;
  const wrappedPanelPetSuv = () => {
    return /*#__PURE__*/react__rspack_import_0_default().createElement(_Panels__rspack_import_1.PanelPetSUV, null);
  };
  const wrappedROIThresholdToolbox = () => {
    return /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default__rspack_import_2.Toolbox, {
      buttonSectionId: toolbarService.sections.roiThresholdToolbox,
      title: _ohif_i18n__rspack_import_4["default"].t('ROIThresholdConfiguration:Threshold Tools')
    });
  };
  const wrappedROIThresholdExport = () => {
    return /*#__PURE__*/react__rspack_import_0_default().createElement(_Panels__rspack_import_1.PanelROIThresholdExport, null);
  };
  const wrappedPanelTMTV = () => {
    return /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Fragment), null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default__rspack_import_2.Toolbox, {
      buttonSectionId: toolbarService.sections.roiThresholdToolbox,
      title: _ohif_i18n__rspack_import_4["default"].t('ROIThresholdConfiguration:Threshold Tools')
    }), /*#__PURE__*/react__rspack_import_0_default().createElement(_Panels_PanelTMTV__rspack_import_3["default"], {
      commandsManager: commandsManager,
      servicesManager: servicesManager
    }));
  };
  return [{
    name: 'petSUV',
    iconName: 'tab-patient-info',
    iconLabel: 'Patient Info',
    label: 'Patient Info',
    component: wrappedPanelPetSuv
  }, {
    name: 'tmtv',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    component: wrappedPanelTMTV
  }, {
    name: 'tmtvBox',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation Toolbox',
    component: wrappedROIThresholdToolbox
  }, {
    name: 'tmtvExport',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation Export',
    component: wrappedROIThresholdExport
  }];
}
/* export default */ const __rspack_default_export = (getPanelModule);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/getToolbarModule.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (getToolbarModule)
});
/* import */ var _Panels_RectangleROIOptions__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/Panels/RectangleROIOptions.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

function getToolbarModule() {
  return [{
    name: 'tmtv.RectangleROIThresholdOptions',
    defaultComponent: _Panels_RectangleROIOptions__rspack_import_0["default"]
  }];
}
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  toolGroupIds: () => (/* reexport safe */ _toolGroupIds__rspack_import_7.toolGroupIds)
});
/* import */ var _id__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/id.js");
/* import */ var _getHangingProtocolModule__rspack_import_1 = __webpack_require__("../../../extensions/tmtv/src/getHangingProtocolModule.ts");
/* import */ var _getPanelModule__rspack_import_2 = __webpack_require__("../../../extensions/tmtv/src/getPanelModule.tsx");
/* import */ var _init__rspack_import_3 = __webpack_require__("../../../extensions/tmtv/src/init.js");
/* import */ var _commandsModule__rspack_import_4 = __webpack_require__("../../../extensions/tmtv/src/commandsModule.ts");
/* import */ var _getToolbarModule__rspack_import_5 = __webpack_require__("../../../extensions/tmtv/src/getToolbarModule.tsx");
/* import */ var _getCustomizationModule__rspack_import_6 = __webpack_require__("../../../extensions/tmtv/src/getCustomizationModule.ts");
/* import */ var _toolGroupIds__rspack_import_7 = __webpack_require__("../../../extensions/tmtv/src/toolGroupIds.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };









/**
 *
 */
const tmtvExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__rspack_import_0.id,
  preRegistration({
    servicesManager,
    commandsManager,
    extensionManager,
    configuration = {}
  }) {
    (0,_init__rspack_import_3["default"])({
      servicesManager,
      commandsManager,
      extensionManager,
      configuration
    });
  },
  getToolbarModule: _getToolbarModule__rspack_import_5["default"],
  getPanelModule: _getPanelModule__rspack_import_2["default"],
  getHangingProtocolModule: _getHangingProtocolModule__rspack_import_1["default"],
  getCustomizationModule: _getCustomizationModule__rspack_import_6["default"],
  getCommandsModule({
    servicesManager,
    commandsManager,
    extensionManager
  }) {
    return (0,_commandsModule__rspack_import_4["default"])({
      servicesManager,
      commandsManager,
      extensionManager
    });
  }
};
/* export default */ const __rspack_default_export = (tmtvExtension);

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/init.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (init)
});
/* import */ var _cornerstonejs_tools__rspack_import_0 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* import */ var _ohif_extension_cornerstone__rspack_import_1 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* import */ var _utils_measurementServiceMappings_measurementServiceMappingsFactory__rspack_import_2 = __webpack_require__("../../../extensions/tmtv/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };



const {
  CORNERSTONE_3D_TOOLS_SOURCE_NAME,
  CORNERSTONE_3D_TOOLS_SOURCE_VERSION
} = _ohif_extension_cornerstone__rspack_import_1.Enums;

/**
 *
 * @param {Object} servicesManager
 * @param {Object} configuration
 * @param {Object|Array} configuration.csToolsConfig
 */
function init({
  servicesManager
}) {
  const {
    measurementService,
    displaySetService,
    cornerstoneViewportService
  } = servicesManager.services;
  (0,_cornerstonejs_tools__rspack_import_0.addTool)(_cornerstonejs_tools__rspack_import_0.RectangleROIStartEndThresholdTool);
  (0,_cornerstonejs_tools__rspack_import_0.addTool)(_cornerstonejs_tools__rspack_import_0.CircleROIStartEndThresholdTool);
  const {
    RectangleROIStartEndThreshold,
    CircleROIStartEndThreshold
  } = (0,_utils_measurementServiceMappings_measurementServiceMappingsFactory__rspack_import_2["default"])(measurementService, displaySetService, cornerstoneViewportService);
  const csTools3DVer1MeasurementSource = measurementService.getSource(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'RectangleROIStartEndThreshold', RectangleROIStartEndThreshold.matchingCriteria, RectangleROIStartEndThreshold.toAnnotation, RectangleROIStartEndThreshold.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'CircleROIStartEndThreshold', CircleROIStartEndThreshold.matchingCriteria, CircleROIStartEndThreshold.toAnnotation, CircleROIStartEndThreshold.toMeasurement);
}
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/toolGroupIds.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  toolGroupIds: () => (toolGroupIds)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
/**
 * The tool group ids used by the TMTV hanging protocols and mode. Defined in
 * the extension so both the extension (hanging protocol viewports, toolbar
 * buttons) and the mode (tool group creation) share one definition.
 */
const toolGroupIds = {
  CT: 'ctToolGroup',
  PT: 'ptToolGroup',
  Fusion: 'fusionToolGroup',
  MIP: 'mipToolGroup',
  default: 'default'
};
/* export default */ const __rspack_default_export = (toolGroupIds);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/createAndDownloadTMTVReport.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (createAndDownloadTMTVReport)
});
/* import */ var _ohif_core__rspack_import_0 = __webpack_require__("../../core/src/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

const {
  downloadCsv
} = _ohif_core__rspack_import_0.utils;
function createAndDownloadTMTVReport(segReport, additionalReportRows, options = {}) {
  const firstReport = segReport[Object.keys(segReport)[0]];
  const columns = Object.keys(firstReport);
  const csv = [columns.map(column => column.toLowerCase().startsWith('namedstats_') ? column.substring(11) : column).join(',')];
  Object.values(segReport).forEach(segmentation => {
    const row = [];
    columns.forEach(column => {
      // if it is array then we need to replace , with space to avoid csv parsing error
      row.push(segmentation[column] && typeof segmentation[column] === 'object' ? Array.isArray(segmentation[column]) ? segmentation[column].join(' ') : segmentation[column].value && Array.isArray(segmentation[column].value) ? segmentation[column].value.join(' ') : segmentation[column].value ?? segmentation[column] : segmentation[column]);
    });
    csv.push(row.join(','));
  });
  csv.push('');
  csv.push('');
  csv.push('');
  csv.push(`Patient ID,${firstReport.PatientID}`);
  csv.push(`Study Date,${firstReport.StudyDate}`);
  csv.push('');
  additionalReportRows.forEach(({
    key,
    value: values
  }) => {
    const temp = [];
    temp.push(`${key}`);
    Object.keys(values).forEach(k => {
      temp.push(`${k}`);
      temp.push(`${values[k]}`);
    });
    csv.push(temp.join(','));
  });
  downloadCsv(csv.join('\n'), {
    filename: options.filename ?? `${firstReport.PatientID}_tmtv.csv`
  });
}
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/dicomRTAnnotationExport.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (dicomRTAnnotationExport)
});
/* import */ var dcmjs__rspack_import_0 = __webpack_require__("../../../node_modules/dcmjs/build/dcmjs.es.js");
/* import */ var _ohif_core__rspack_import_1 = __webpack_require__("../../core/src/index.ts");
/* import */ var _cornerstonejs_adapters__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };



const {
  datasetToBlob
} = dcmjs__rspack_import_0["default"].data;
const metadataProvider = _ohif_core__rspack_import_1.classes.MetadataProvider;
function dicomRTAnnotationExport(annotations) {
  const dataset = _cornerstonejs_adapters__rspack_import_2.adaptersRT.Cornerstone3D.RTSS.generateRTSSFromAnnotations(annotations, metadataProvider, _ohif_core__rspack_import_1.DicomMetadataStore);
  const reportBlob = datasetToBlob(dataset);

  //Create a URL for the binary.
  var objectUrl = URL.createObjectURL(reportBlob);
  window.location.assign(objectUrl);
}
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/index.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _dicomRTAnnotationExport__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/dicomRTAnnotationExport.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

/* export default */ const __rspack_default_export = (_dicomRTAnnotationExport__rspack_import_0["default"]);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/getThresholdValue.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _cornerstonejs_core__rspack_import_0 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _cornerstonejs_tools__rspack_import_1 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };


function getRoiStats(displaySet, annotations) {
  const {
    imageIds
  } = displaySet;
  const ptVolumeInfo = _cornerstonejs_core__rspack_import_0.cache.getVolumeContainingImageId(imageIds[0]);
  if (!ptVolumeInfo) {
    throw new Error('No volume found for display set');
  }
  const {
    volume
  } = ptVolumeInfo;
  const {
    voxelManager
  } = volume;

  // Todo: add support for other strategies
  const {
    fn,
    baseValue
  } = _getStrategyFn('max');
  let value = baseValue;
  const boundsIJK = _cornerstonejs_tools__rspack_import_1.utilities.rectangleROITool.getBoundsIJKFromRectangleAnnotations(annotations, volume);

  // Use the voxelManager's forEach method to iterate over the bounds
  voxelManager.forEach(({
    value: voxelValue
  }) => {
    value = fn(voxelValue, value);
  }, {
    boundsIJK
  });
  return value;
}
function getThresholdValues(annotationUIDs, ptDisplaySet, config) {
  if (config.strategy === 'range') {
    return {
      ptLower: Number(config.ptLower),
      ptUpper: Number(config.ptUpper),
      ctLower: Number(config.ctLower),
      ctUpper: Number(config.ctUpper)
    };
  }
  const {
    weight
  } = config;
  const annotations = annotationUIDs.map(annotationUID => _cornerstonejs_tools__rspack_import_1.annotation.state.getAnnotation(annotationUID));
  const ptValue = getRoiStats(ptDisplaySet, annotations);
  return {
    ctLower: -Infinity,
    ctUpper: +Infinity,
    ptLower: weight * ptValue,
    ptUpper: +Infinity
  };
}
function _getStrategyFn(statistic) {
  const baseValue = -Infinity;
  const fn = (number, maxValue) => {
    if (number > maxValue) {
      maxValue = number;
    }
    return maxValue;
  };
  return {
    fn,
    baseValue
  };
}
/* export default */ const __rspack_default_export = (getThresholdValues);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/handleROIThresholding.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  handleROIThresholding: () => (handleROIThresholding)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
const handleROIThresholding = async ({
  commandsManager,
  segmentationService
}) => {
  const segmentations = segmentationService.getSegmentations();
  const tmtv = await commandsManager.run('calculateTMTV', {
    segmentations
  });

  // add the tmtv to all the segment cachedStats, although it is a global
  // value but we don't have any other way to display it for now
  // Update all segmentations with the calculated TMTV
  segmentations.forEach(segmentation => {
    segmentation.cachedStats = {
      ...segmentation.cachedStats,
      tmtv
    };
    segmentationService.addOrUpdateSegmentation(segmentation);
  });
};
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/hpViewports.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ctAXIAL: () => (ctAXIAL),
  ctCORONAL: () => (ctCORONAL),
  ctSAGITTAL: () => (ctSAGITTAL),
  fusionAXIAL: () => (fusionAXIAL),
  fusionCORONAL: () => (fusionCORONAL),
  fusionSAGITTAL: () => (fusionSAGITTAL),
  mipSAGITTAL: () => (mipSAGITTAL),
  ptAXIAL: () => (ptAXIAL),
  ptCORONAL: () => (ptCORONAL),
  ptSAGITTAL: () => (ptSAGITTAL)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
// Common sync group configurations
const cameraPositionSync = id => ({
  type: 'cameraPosition',
  id,
  source: true,
  target: true
});
const hydrateSegSync = {
  type: 'hydrateseg',
  id: 'sameFORId',
  source: true,
  target: true,
  options: {
    matchingRules: ['sameFOR']
  }
};
const ctAXIAL = {
  viewportOptions: {
    viewportId: 'ctAXIAL',
    viewportType: 'volume',
    orientation: 'axial',
    toolGroupId: 'ctToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first' // 'first', 'last', 'middle'
    },
    syncGroups: [cameraPositionSync('axialSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }]
};
const ctSAGITTAL = {
  viewportOptions: {
    viewportId: 'ctSAGITTAL',
    viewportType: 'volume',
    orientation: 'sagittal',
    toolGroupId: 'ctToolGroup',
    syncGroups: [cameraPositionSync('sagittalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }]
};
const ctCORONAL = {
  viewportOptions: {
    viewportId: 'ctCORONAL',
    viewportType: 'volume',
    orientation: 'coronal',
    toolGroupId: 'ctToolGroup',
    syncGroups: [cameraPositionSync('coronalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }]
};
const ptAXIAL = {
  viewportOptions: {
    viewportId: 'ptAXIAL',
    viewportType: 'volume',
    background: [1, 1, 1],
    orientation: 'axial',
    toolGroupId: 'ptToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first' // 'first', 'last', 'middle'
    },
    syncGroups: [cameraPositionSync('axialSync'), {
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    options: {
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};
const ptSAGITTAL = {
  viewportOptions: {
    viewportId: 'ptSAGITTAL',
    viewportType: 'volume',
    orientation: 'sagittal',
    background: [1, 1, 1],
    toolGroupId: 'ptToolGroup',
    syncGroups: [cameraPositionSync('sagittalSync'), {
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    options: {
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};
const ptCORONAL = {
  viewportOptions: {
    viewportId: 'ptCORONAL',
    viewportType: 'volume',
    orientation: 'coronal',
    background: [1, 1, 1],
    toolGroupId: 'ptToolGroup',
    syncGroups: [cameraPositionSync('coronalSync'), {
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    options: {
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};
const fusionAXIAL = {
  viewportOptions: {
    viewportId: 'fusionAXIAL',
    viewportType: 'volume',
    orientation: 'axial',
    toolGroupId: 'fusionToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first' // 'first', 'last', 'middle'
    },
    syncGroups: [cameraPositionSync('axialSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: false,
      target: true
    }, {
      type: 'voi',
      id: 'fusionWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: false,
      target: true,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }, {
    id: 'ptDisplaySet',
    options: {
      colormap: {
        name: 'hsv',
        // Legacy fusion PT opacity ramp (unchanged): low PT values stay mostly
        // transparent so the CT shows through. Do NOT flatten this to a scalar —
        // the legacy viewport renders this ramp and depends on it. The native
        // ("next") viewport would apply the ramp literally (keeping the
        // background transparent and preventing the 100% opacity slider from
        // fully covering the CT), so the next path replaces this ramp with a
        // flat scalar in getHangingProtocolModule instead of changing it here.
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.1,
          opacity: 0.8
        }, {
          value: 1,
          opacity: 0.9
        }]
      },
      voi: {
        custom: 'getPTVOIRange'
      }
    }
  }]
};
const fusionSAGITTAL = {
  viewportOptions: {
    viewportId: 'fusionSAGITTAL',
    viewportType: 'volume',
    orientation: 'sagittal',
    toolGroupId: 'fusionToolGroup',
    // initialImageOptions: {
    //   index: 180,
    //   preset: 'middle', // 'first', 'last', 'middle'
    // },
    syncGroups: [cameraPositionSync('sagittalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: false,
      target: true
    }, {
      type: 'voi',
      id: 'fusionWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: false,
      target: true,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }, {
    id: 'ptDisplaySet',
    options: {
      colormap: {
        name: 'hsv',
        // Legacy fusion PT opacity ramp (unchanged): low PT values stay mostly
        // transparent so the CT shows through. Do NOT flatten this to a scalar —
        // the legacy viewport renders this ramp and depends on it. The native
        // ("next") viewport would apply the ramp literally (keeping the
        // background transparent and preventing the 100% opacity slider from
        // fully covering the CT), so the next path replaces this ramp with a
        // flat scalar in getHangingProtocolModule instead of changing it here.
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.1,
          opacity: 0.8
        }, {
          value: 1,
          opacity: 0.9
        }]
      },
      voi: {
        custom: 'getPTVOIRange'
      }
    }
  }]
};
const fusionCORONAL = {
  viewportOptions: {
    viewportId: 'fusionCoronal',
    viewportType: 'volume',
    orientation: 'coronal',
    toolGroupId: 'fusionToolGroup',
    // initialImageOptions: {
    //   index: 180,
    //   preset: 'middle', // 'first', 'last', 'middle'
    // },
    syncGroups: [cameraPositionSync('coronalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: false,
      target: true
    }, {
      type: 'voi',
      id: 'fusionWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: false,
      target: true,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }, {
    id: 'ptDisplaySet',
    options: {
      colormap: {
        name: 'hsv',
        // Legacy fusion PT opacity ramp (unchanged): low PT values stay mostly
        // transparent so the CT shows through. Do NOT flatten this to a scalar —
        // the legacy viewport renders this ramp and depends on it. The native
        // ("next") viewport would apply the ramp literally (keeping the
        // background transparent and preventing the 100% opacity slider from
        // fully covering the CT), so the next path replaces this ramp with a
        // flat scalar in getHangingProtocolModule instead of changing it here.
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.1,
          opacity: 0.8
        }, {
          value: 1,
          opacity: 0.9
        }]
      },
      voi: {
        custom: 'getPTVOIRange'
      }
    }
  }]
};
const mipSAGITTAL = {
  viewportOptions: {
    viewportId: 'mipSagittal',
    viewportType: 'volume',
    orientation: 'sagittal',
    background: [1, 1, 1],
    toolGroupId: 'mipToolGroup',
    syncGroups: [{
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync],
    // Custom props can be used to set custom properties which extensions
    // can react on.
    customViewportProps: {
      // We use viewportDisplay to filter the viewports which are displayed
      // in mip and we set the scrollbar according to their rotation index
      // in the cornerstone extension.
      hideOverlays: true
    }
  },
  displaySets: [{
    options: {
      blendMode: 'MIP',
      slabThickness: 'fullVolume',
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/measurementServiceMappings/CircleROIStartEndThreshold.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _constants_supportedTools__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* import */ var _ohif_extension_cornerstone__rspack_import_1 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };


const CircleROIStartEndThreshold = {
  toAnnotation: (measurement, definition) => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__rspack_import_0["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_ohif_extension_cornerstone__rspack_import_1.getSOPInstanceAttributes)(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      cachedStats
    } = data;
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      // points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: metadata.label,
      // displayText: displayText,
      data: data.cachedStats,
      type: 'CircleROIStartEndThreshold'
      // getReport,
    };
  }
};
/* export default */ const __rspack_default_export = (CircleROIStartEndThreshold);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/measurementServiceMappings/RectangleROIStartEndThreshold.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _constants_supportedTools__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* import */ var _ohif_extension_cornerstone__rspack_import_1 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };


const RectangleROIStartEndThreshold = {
  toAnnotation: (measurement, definition) => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__rspack_import_0["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_ohif_extension_cornerstone__rspack_import_1.getSOPInstanceAttributes)(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      // points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: metadata.label,
      data: data.cachedStats,
      type: 'RectangleROIStartEndThreshold'
    };
  }
};
/* export default */ const __rspack_default_export = (RectangleROIStartEndThreshold);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
/* export default */ const __rspack_default_export = (['RectangleROIStartEndThreshold', 'CircleROIStartEndThreshold']);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _RectangleROIStartEndThreshold__rspack_import_0 = __webpack_require__("../../../extensions/tmtv/src/utils/measurementServiceMappings/RectangleROIStartEndThreshold.js");
/* import */ var _CircleROIStartEndThreshold__rspack_import_1 = __webpack_require__("../../../extensions/tmtv/src/utils/measurementServiceMappings/CircleROIStartEndThreshold.js");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };


const measurementServiceMappingsFactory = (measurementService, displaySetService, cornerstoneViewportService) => {
  return {
    RectangleROIStartEndThreshold: {
      toAnnotation: _RectangleROIStartEndThreshold__rspack_import_0["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _RectangleROIStartEndThreshold__rspack_import_0["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService),
      matchingCriteria: [{
        valueType: measurementService.VALUE_TYPES.ROI_THRESHOLD_MANUAL
      }]
    },
    CircleROIStartEndThreshold: {
      toAnnotation: _CircleROIStartEndThreshold__rspack_import_1["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _CircleROIStartEndThreshold__rspack_import_1["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService),
      matchingCriteria: [{
        valueType: measurementService.VALUE_TYPES.ROI_THRESHOLD_MANUAL
      }]
    }
  };
};
/* export default */ const __rspack_default_export = (measurementServiceMappingsFactory);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/tmtv/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/extension-tmtv","version":"3.14.0-beta.7","description":"OHIF extension for Total Metabolic Tumor Volume","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-tmtv.umd.js","module":"src/index.tsx","engines":{"node":">=24"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/ui":"workspace:*","dcmjs":"0.52.0","dicom-parser":"1.8.21","hammerjs":"2.0.8","prop-types":"15.8.1","react":"18.3.1"},"dependencies":{"@babel/runtime":"7.29.7","classnames":"2.5.1"},"devDependencies":{"cross-env":"7.0.3"}}')

},

}]);
//# sourceMappingURL=extensions_tmtv_src_index_tsx.js.map