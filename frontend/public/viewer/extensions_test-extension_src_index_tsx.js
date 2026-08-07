"use strict";
(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_test-extension_src_index_tsx"], {
"../../../extensions/test-extension/src/custom-attribute/maxNumImageFrames.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
/* export default */ const __rspack_default_export = ((study, extraData) => Math.max(...(extraData?.displaySets?.map?.(ds => ds.numImageFrames ?? 0) || [0])));
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/custom-attribute/numberOfDisplaySets.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
/* export default */ const __rspack_default_export = ((study, extraData) => extraData?.displaySets?.length);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/custom-attribute/sameAs.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* export default binding */ __rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
/**
 * This function extracts an attribute from the already matched display sets, and
 * compares it to the attribute in the current display set, and indicates if they match.
 * From 'this', it uses:
 *    `sameAttribute` as the attribute name to look for
 *    `sameDisplaySetId` as the display set id to look for
 * From `options`, it looks for
 */
/* export default */ function __rspack_default_export(displaySet, options) {
  const {
    sameAttribute,
    sameDisplaySetId
  } = this;
  if (!sameAttribute) {
    console.log('sameAttribute not defined in', this);
    return `sameAttribute not defined in ${this.id}`;
  }
  if (!sameDisplaySetId) {
    console.log('sameDisplaySetId not defined in', this);
    return `sameDisplaySetId not defined in ${this.id}`;
  }
  const {
    displaySetMatchDetails,
    displaySets
  } = options;
  const match = displaySetMatchDetails.get(sameDisplaySetId);
  if (!match) {
    console.log('No match for display set', sameDisplaySetId);
    return false;
  }
  const {
    displaySetInstanceUID
  } = match;
  const altDisplaySet = displaySets.find(it => it.displaySetInstanceUID == displaySetInstanceUID);
  if (!altDisplaySet) {
    console.log('No display set found with', displaySetInstanceUID, 'in', displaySets);
    return false;
  }
  const testValue = altDisplaySet[sameAttribute];
  return testValue === displaySet[sameAttribute];
}
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/custom-context-menu/codingValues.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
/**
 * Coding values is a map of simple string coding values to a set of
 * attributes associated with the coding value.
 *
 * The simple string is in the format `<codingSchemeDesignator>:<codingValue>`
 * That allows extracting the DICOM attributes from the designator/value, and
 * allows for passing around the simple string.
 * The additional attributes contained in the object include:
 *       * text - this is the coding scheme text display value, and may be language specific
 *       * type - this defines a named type, typically 'site'.  Different names can be used
 *                to allow setting different findingSites values in order to define a hierarchy.
 *       * color - used to apply annotation color
 * It is also possible to define additional attributes here, used by custom
 * extensions.
 *
 * See https://dicom.nema.org/medical/dicom/current/output/html/part16.html
 * for definitions of SCT and other code values.
 */
/* export default */ const __rspack_default_export = ({
  codingValues: {
    // Sites
    'SCT:69536005': {
      text: 'Head',
      type: 'site',
      style: {
        color: 'red'
      }
    },
    'SCT:45048000': {
      text: 'Neck',
      type: 'site',
      style: {
        color: 'blue'
      }
    },
    'SCT:818981001': {
      text: 'Abdomen',
      type: 'site',
      style: {
        color: 'orange'
      }
    },
    'SCT:816092008': {
      text: 'Pelvis',
      type: 'site',
      style: {
        color: 'cyan'
      }
    },
    // Findings
    'SCT:371861004': {
      text: 'Mild intimal coronary irregularities',
      style: {
        color: 'green'
      }
    },
    'SCT:194983005': {
      text: 'Aortic insufficiency',
      style: {
        color: 'darkred'
      }
    },
    'SCT:399232001': {
      text: '2-chamber'
    },
    'SCT:103340004': {
      text: 'SAX'
    },
    'SCT:91134007': {
      text: 'MV'
    },
    'SCT:122972007': {
      text: 'PV'
    },
    // Orientations
    'SCT:24422004': {
      text: 'Axial',
      color: '#000000',
      type: 'orientation'
    },
    'SCT:81654009': {
      text: 'Coronal',
      color: '#000000',
      type: 'orientation'
    },
    'SCT:30730003': {
      text: 'Sagittal',
      color: '#000000',
      type: 'orientation'
    }
  }
});
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
/* export default */ const __rspack_default_export = ({
  '@ohif/contextMenuAnnotationCode': {
    /** Applies the code value setup for this item */
    $transform: function (customizationService) {
      const {
        code: codeRef
      } = this;
      if (!codeRef) {
        throw new Error(`item ${this} has no code ref`);
      }
      const codingValues = customizationService.getCustomization('codingValues');
      const code = codingValues[codeRef];
      return {
        ...this,
        codeRef,
        code: {
          ref: codeRef,
          ...code
        },
        label: this.label || code.text || codeRef,
        commands: [{
          commandName: 'updateMeasurement'
        }]
      };
    }
  }
});
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
/* export default */ const __rspack_default_export = ({
  measurementsContextMenu: {
    $set: {
      inheritsFrom: 'ohif.contextMenu',
      menus: [{
        // selector restricts context menu to when there is nearbyToolData
        selector: ({
          nearbyToolData
        }) => !!nearbyToolData,
        items: [{
          label: 'Site',
          actionType: 'ShowSubMenu',
          subMenu: 'siteSelectionSubMenu'
        }, {
          label: 'Finding',
          actionType: 'ShowSubMenu',
          subMenu: 'findingSelectionSubMenu'
        }, {
          // inheritsFrom is implicit here in the configuration setup
          label: 'Delete Measurement',
          commands: [{
            commandName: 'removeMeasurement'
          }]
        }, {
          label: 'Add Label',
          commands: [{
            commandName: 'setMeasurementLabel'
          }]
        },
        // The example below shows how to include a delegating sub-menu,
        // Only available on the @ohif/mnGrid hanging protocol
        // To demonstrate, select the 3x1 layout from the protocol menu
        // and right click on a measurement.
        {
          label: 'IncludeSubMenu',
          selector: ({
            protocol
          }) => protocol?.id === '@ohif/mnGrid',
          delegating: true,
          subMenu: 'orientationSelectionSubMenu'
        }]
      }, {
        id: 'orientationSelectionSubMenu',
        selector: ({
          nearbyToolData
        }) => !!nearbyToolData,
        items: [{
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:24422004'
        }, {
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:81654009'
        }]
      }, {
        id: 'findingSelectionSubMenu',
        selector: ({
          nearbyToolData
        }) => !!nearbyToolData,
        items: [{
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:371861004'
        }, {
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:194983005'
        }]
      }, {
        id: 'siteSelectionSubMenu',
        selector: ({
          nearbyToolData
        }) => !!nearbyToolData,
        items: [{
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:69536005'
        }, {
          inheritsFrom: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:45048000'
        }]
      }]
    }
  }
});
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/custom-context-menu/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  codingValues: () => (/* reexport safe */ _codingValues__rspack_import_0["default"]),
  contextMenuCodeItem: () => (/* reexport safe */ _contextMenuCodeItem__rspack_import_1["default"]),
  findingsContextMenu: () => (/* reexport safe */ _findingsContextMenu__rspack_import_2["default"])
});
/* import */ var _codingValues__rspack_import_0 = __webpack_require__("../../../extensions/test-extension/src/custom-context-menu/codingValues.ts");
/* import */ var _contextMenuCodeItem__rspack_import_1 = __webpack_require__("../../../extensions/test-extension/src/custom-context-menu/contextMenuCodeItem.ts");
/* import */ var _findingsContextMenu__rspack_import_2 = __webpack_require__("../../../extensions/test-extension/src/custom-context-menu/findingsContextMenu.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };




function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/getCustomizationModule.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (getCustomizationModule)
});
/* import */ var _custom_context_menu__rspack_import_0 = __webpack_require__("../../../extensions/test-extension/src/custom-context-menu/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

function getCustomizationModule() {
  return [{
    name: 'custom-context-menu',
    value: {
      ..._custom_context_menu__rspack_import_0.codingValues,
      ..._custom_context_menu__rspack_import_0.contextMenuCodeItem,
      ..._custom_context_menu__rspack_import_0.findingsContextMenu
    }
  }, {
    name: 'contextMenuCodeItem',
    value: {
      ..._custom_context_menu__rspack_import_0.contextMenuCodeItem
    }
  }];
}
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/getPanelModule.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (getPanelModule)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_extension_cornerstone__rspack_import_1 = __webpack_require__("../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };


function getPanelModule({
  commandsManager,
  servicesManager,
  extensionManager
}) {
  const childProps = {
    commandsManager,
    servicesManager,
    extensionManager
  };
  const wrappedPanelMeasurementSeries = () => {
    return /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_cornerstone__rspack_import_1.PanelMeasurement, childProps, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_cornerstone__rspack_import_1.StudyMeasurements, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_cornerstone__rspack_import_1.SeriesMeasurements, null)));
  };
  return [{
    name: 'panelMeasurementSeries',
    iconName: 'tool-freehand-roi',
    iconLabel: 'Measure Series',
    label: 'Measurement Series',
    component: wrappedPanelMeasurementSeries
  }];
}
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/hpTestSwitch.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
const viewport0a = {
  viewportOptions: {
    viewportId: 'viewportA',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    id: 'defaultDisplaySetId'
  }]
};
const viewport1b = {
  viewportOptions: {
    viewportId: 'viewportB',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 1,
    id: 'defaultDisplaySetId'
  }]
};
const viewport2c = {
  viewportOptions: {
    viewportId: 'viewportC',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 2,
    id: 'defaultDisplaySetId'
  }]
};
const viewport3d = {
  viewportOptions: {
    viewportId: 'viewportD',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 3,
    id: 'defaultDisplaySetId'
  }]
};
const viewport4e = {
  viewportOptions: {
    viewportId: 'viewportE',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 4,
    id: 'defaultDisplaySetId'
  }]
};
const viewport5f = {
  viewportOptions: {
    viewportId: 'viewportF',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 5,
    id: 'defaultDisplaySetId'
  }]
};
const viewport3a = {
  viewportOptions: {
    viewportId: 'viewportA',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 3,
    id: 'defaultDisplaySetId'
  }]
};
const viewport2b = {
  viewportOptions: {
    viewportId: 'viewportB',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 2,
    id: 'defaultDisplaySetId'
  }]
};
const viewport1c = {
  viewportOptions: {
    viewportId: 'viewportC',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 1,
    id: 'defaultDisplaySetId'
  }]
};
const viewport0d = {
  viewportOptions: {
    viewportId: 'viewportD',
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [{
    matchedDisplaySetsIndex: 0,
    id: 'defaultDisplaySetId'
  }]
};
const viewportStructure = {
  layoutType: 'grid',
  properties: {
    rows: 2,
    columns: 2
  }
};
const viewportStructure32 = {
  layoutType: 'grid',
  properties: {
    rows: 2,
    columns: 3
  }
};

/**
 * This hanging protocol is a test hanging protocol used to apply various
 * layouts in different positions for display, re-using earlier names in
 * various orders.
 */
const hpTestSwitch = {
  hasUpdatedPriorsInformation: false,
  id: '@ohif/mnTestSwitch',
  description: 'Has various hanging protocol grid layouts',
  name: 'Test Switch',
  protocolMatchingRules: [{
    id: 'OneOrMoreSeries',
    weight: 25,
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 0
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        }
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 20,
        constraint: {
          equals: true
        }
      }]
    }
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [{
    name: '2x2 0a1b2c3d',
    viewportStructure,
    viewports: [viewport0a, viewport1b, viewport2c, viewport3d]
  }, {
    name: '3x2 0a1b4e2c3d5f',
    viewportStructure: viewportStructure32,
    // Note the following structure simply preserves the viewportId for
    // a given screen position
    viewports: [viewport0a, viewport1b, viewport4e, viewport2c, viewport3d, viewport5f]
  }, {
    name: '2x2 1c0d3a2b',
    viewportStructure,
    viewports: [viewport1c, viewport0d, viewport3a, viewport2b]
  }, {
    name: '2x2 3a2b1c0d',
    viewportStructure,
    viewports: [viewport3a, viewport2b, viewport1c, viewport0d]
  }],
  numberOfPriorsReferenced: -1
};
/* export default */ const __rspack_default_export = (hpTestSwitch);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/id.js"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  id: () => (id)
});
/* import */ var _package_json__rspack_import_0 = __webpack_require__("../../../extensions/test-extension/package.json");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };

const id = _package_json__rspack_import_0.name;

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _id__rspack_import_0 = __webpack_require__("../../../extensions/test-extension/src/id.js");
/* import */ var _hpTestSwitch__rspack_import_1 = __webpack_require__("../../../extensions/test-extension/src/hpTestSwitch.ts");
/* import */ var _getCustomizationModule__rspack_import_2 = __webpack_require__("../../../extensions/test-extension/src/getCustomizationModule.ts");
/* import */ var _custom_attribute_sameAs__rspack_import_3 = __webpack_require__("../../../extensions/test-extension/src/custom-attribute/sameAs.ts");
/* import */ var _custom_attribute_numberOfDisplaySets__rspack_import_4 = __webpack_require__("../../../extensions/test-extension/src/custom-attribute/numberOfDisplaySets.ts");
/* import */ var _custom_attribute_maxNumImageFrames__rspack_import_5 = __webpack_require__("../../../extensions/test-extension/src/custom-attribute/maxNumImageFrames.ts");
/* import */ var _getPanelModule__rspack_import_6 = __webpack_require__("../../../extensions/test-extension/src/getPanelModule.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };








/**
 * The test extension provides additional behavior for testing various
 * customizations and settings for OHIF.
 */
const testExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__rspack_import_0.id,
  /**
   * Register additional behavior:
   *   * HP custom attribute seriesDescriptions to retrieve an array of all series descriptions
   *   * HP custom attribute numberOfDisplaySets to retrieve the number of display sets
   *   * HP custom attribute numberOfDisplaySetsWithImages to retrieve the number of display sets containing images
   *   * HP custom attribute to return a boolean true, when the attribute sameAttribute has the same
   *     value as another series description in an already matched display set selector named with the value
   *     in `sameDisplaySetId`
   */
  preRegistration: ({
    servicesManager
  }) => {
    const {
      hangingProtocolService
    } = servicesManager.services;
    hangingProtocolService.addCustomAttribute('numberOfDisplaySets', 'Number of displays sets', _custom_attribute_numberOfDisplaySets__rspack_import_4["default"]);
    hangingProtocolService.addCustomAttribute('maxNumImageFrames', 'Maximum of number of image frames', _custom_attribute_maxNumImageFrames__rspack_import_5["default"]);
    hangingProtocolService.addCustomAttribute('sameAs', 'Match an attribute in an existing display set', _custom_attribute_sameAs__rspack_import_3["default"]);
  },
  /** Registers some customizations */
  getCustomizationModule: _getCustomizationModule__rspack_import_2["default"],
  getPanelModule: _getPanelModule__rspack_import_6["default"],
  getHangingProtocolModule: () => {
    return [
    // Create a MxN hanging protocol available by default
    {
      name: _hpTestSwitch__rspack_import_1["default"].id,
      protocol: _hpTestSwitch__rspack_import_1["default"]
    }];
  }
};
/* export default */ const __rspack_default_export = (testExtension);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/test-extension/package.json"(module) {
module.exports = JSON.parse('{"name":"@ohif/extension-test","version":"3.14.0-beta.7","description":"OHIF extension used inside e2e testing","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-test.umd.js","module":"src/index.tsx","engines":{"node":">=24"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"pnpm run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development rspack build --config .webpack/webpack.dev.js --watch","build":"cross-env NODE_ENV=production rspack build --config .webpack/webpack.prod.js","build:package-1":"pnpm run build","start":"pnpm run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"workspace:*","@ohif/ui":"workspace:*","dcmjs":"0.52.0","dicom-parser":"1.8.21","hammerjs":"2.0.8","prop-types":"15.8.1","react":"18.3.1"},"dependencies":{"@babel/runtime":"7.29.7","classnames":"2.5.1"},"devDependencies":{"cross-env":"7.0.3"}}')

},

}]);
//# sourceMappingURL=extensions_test-extension_src_index_tsx.js.map