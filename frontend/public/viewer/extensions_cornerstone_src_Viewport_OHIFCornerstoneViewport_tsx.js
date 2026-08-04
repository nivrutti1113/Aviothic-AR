(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_cornerstone_src_Viewport_OHIFCornerstoneViewport_tsx"], {
"../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0 = __webpack_require__("../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0);
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1 = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__rspack_import_1);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0_default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.viewport-wrapper {
  width: 100%;
  height: 100%; /* MUST have \`height\` to prevent resize infinite loop */
  position: relative;
  /* Prevent text selection on the entire viewport wrapper */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.cornerstone-viewport-element {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: black;

  /* Prevent the blue outline in Chrome when a viewport is selected */
  outline: 0 !important;

  /* Prevents the entire page from getting larger
     when the magnify tool is near the sides/corners of the page */
  overflow: hidden;
  
  /* Prevent text selection on the viewport element */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Prevent text selection on overlay elements */
.noselect {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Ensure all elements within viewport wrapper prevent text selection */
.viewport-wrapper * {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,YAAY,EAAE,uDAAuD;EACrE,kBAAkB;EAClB,0DAA0D;EAC1D,iBAAiB;EACjB,yBAAyB;EACzB,sBAAsB;EACtB,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,uBAAuB;;EAEvB,mEAAmE;EACnE,qBAAqB;;EAErB;kEACgE;EAChE,gBAAgB;;EAEhB,mDAAmD;EACnD,iBAAiB;EACjB,yBAAyB;EACzB,sBAAsB;EACtB,qBAAqB;AACvB;;AAEA,+CAA+C;AAC/C;EACE,iBAAiB;EACjB,yBAAyB;EACzB,sBAAsB;EACtB,qBAAqB;AACvB;;AAEA,uEAAuE;AACvE;EACE,iBAAiB;EACjB,yBAAyB;EACzB,sBAAsB;EACtB,qBAAqB;AACvB","sourcesContent":[".viewport-wrapper {\r\n  width: 100%;\r\n  height: 100%; /* MUST have `height` to prevent resize infinite loop */\r\n  position: relative;\r\n  /* Prevent text selection on the entire viewport wrapper */\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n}\r\n\r\n.cornerstone-viewport-element {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: relative;\r\n  background-color: black;\r\n\r\n  /* Prevent the blue outline in Chrome when a viewport is selected */\r\n  outline: 0 !important;\r\n\r\n  /* Prevents the entire page from getting larger\r\n     when the magnify tool is near the sides/corners of the page */\r\n  overflow: hidden;\r\n  \r\n  /* Prevent text selection on the viewport element */\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n}\r\n\r\n/* Prevent text selection on overlay elements */\r\n.noselect {\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n}\r\n\r\n/* Ensure all elements within viewport wrapper prevent text selection */\r\n.viewport-wrapper * {\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* export default */ const __rspack_default_export = (___CSS_LOADER_EXPORT___);


},
"../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0 = __webpack_require__("../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0);
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1 = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__rspack_import_1);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0_default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
custom overlay panels: top-left, top-right, bottom-left and bottom-right
If any text to be displayed on the overlay is too long to hold on a single
line, it will be truncated with ellipsis in the end.
*/
.viewport-overlay {
  max-width: 40%;
}
.viewport-overlay span {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.viewport-overlay.left-viewport {
  text-align: left;
}

.viewport-overlay.right-viewport-scrollbar {
  text-align: right;
}
.viewport-overlay.right-viewport-scrollbar .flex.flex-row {
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css"],"names":[],"mappings":"AAAA;;;;CAIC;AACD;EACE,cAAc;AAChB;AACA;EACE,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;AACnB;AACA;EACE,qBAAyB;MAAzB,kBAAyB;UAAzB,yBAAyB;AAC3B","sourcesContent":["/*\r\ncustom overlay panels: top-left, top-right, bottom-left and bottom-right\r\nIf any text to be displayed on the overlay is too long to hold on a single\r\nline, it will be truncated with ellipsis in the end.\r\n*/\r\n.viewport-overlay {\r\n  max-width: 40%;\r\n}\r\n.viewport-overlay span {\r\n  max-width: 100%;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n\r\n.viewport-overlay.left-viewport {\r\n  text-align: left;\r\n}\r\n\r\n.viewport-overlay.right-viewport-scrollbar {\r\n  text-align: right;\r\n}\r\n.viewport-overlay.right-viewport-scrollbar .flex.flex-row {\r\n  justify-content: flex-end;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* export default */ const __rspack_default_export = (___CSS_LOADER_EXPORT___);


},
"../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0 = __webpack_require__("../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0);
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1 = __webpack_require__("../../../node_modules/css-loader/dist/runtime/api.js");
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__rspack_import_1);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__rspack_import_0_default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ViewportOrientationMarkers {
  --marker-width: 100px;
  --marker-height: 100px;
  --scrollbar-width: 20px;
  pointer-events: none;
  line-height: 18px;
}
.ViewportOrientationMarkers .orientation-marker {
  position: absolute;
}
.ViewportOrientationMarkers .top-mid {
  top: 0.38rem;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
}
.ViewportOrientationMarkers .left-mid {
  top: 50%;
  left: 0.38rem;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}
.ViewportOrientationMarkers .right-mid {
  top: 50%;
  left: calc(100% - var(--marker-width) - var(--scrollbar-width));
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}
.ViewportOrientationMarkers .bottom-mid {
  top: calc(100% - var(--marker-height) - 0.6rem);
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
}
.ViewportOrientationMarkers .right-mid .orientation-marker-value {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  min-width: var(--marker-width);
}
.ViewportOrientationMarkers .bottom-mid .orientation-marker-value {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  min-height: var(--marker-height);
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
      -ms-flex-direction: column-reverse;
          flex-direction: column-reverse;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,uBAAuB;EACvB,oBAAoB;EACpB,iBAAiB;AACnB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,YAAY;EACZ,SAAS;EACT,mCAA2B;UAA3B,2BAA2B;AAC7B;AACA;EACE,QAAQ;EACR,aAAa;EACb,mCAA2B;UAA3B,2BAA2B;AAC7B;AACA;EACE,QAAQ;EACR,+DAA+D;EAC/D,mCAA2B;UAA3B,2BAA2B;AAC7B;AACA;EACE,+CAA+C;EAC/C,SAAS;EACT,mCAA2B;UAA3B,2BAA2B;AAC7B;AACA;EACE,oBAAa;EAAb,oBAAa;EAAb,aAAa;EACb,qBAAyB;MAAzB,kBAAyB;UAAzB,yBAAyB;EACzB,8BAA8B;AAChC;AACA;EACE,oBAAa;EAAb,oBAAa;EAAb,aAAa;EACb,uBAA2B;MAA3B,oBAA2B;UAA3B,2BAA2B;EAC3B,gCAAgC;EAChC,4BAA8B;EAA9B,8BAA8B;MAA9B,kCAA8B;UAA9B,8BAA8B;AAChC","sourcesContent":[".ViewportOrientationMarkers {\r\n  --marker-width: 100px;\r\n  --marker-height: 100px;\r\n  --scrollbar-width: 20px;\r\n  pointer-events: none;\r\n  line-height: 18px;\r\n}\r\n.ViewportOrientationMarkers .orientation-marker {\r\n  position: absolute;\r\n}\r\n.ViewportOrientationMarkers .top-mid {\r\n  top: 0.38rem;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n}\r\n.ViewportOrientationMarkers .left-mid {\r\n  top: 50%;\r\n  left: 0.38rem;\r\n  transform: translateY(-50%);\r\n}\r\n.ViewportOrientationMarkers .right-mid {\r\n  top: 50%;\r\n  left: calc(100% - var(--marker-width) - var(--scrollbar-width));\r\n  transform: translateY(-50%);\r\n}\r\n.ViewportOrientationMarkers .bottom-mid {\r\n  top: calc(100% - var(--marker-height) - 0.6rem);\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n}\r\n.ViewportOrientationMarkers .right-mid .orientation-marker-value {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  min-width: var(--marker-width);\r\n}\r\n.ViewportOrientationMarkers .bottom-mid .orientation-marker-value {\r\n  display: flex;\r\n  justify-content: flex-start;\r\n  min-height: var(--marker-height);\r\n  flex-direction: column-reverse;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* export default */ const __rspack_default_export = (___CSS_LOADER_EXPORT___);


},
"../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css"(module, __unused_rspack_exports, __webpack_require__) {
var api = __webpack_require__("../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css",
      function(__rspack_hmr_outdated) {
(function () {
        content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.id, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      })(__rspack_hmr_outdated); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

},
"../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css"(module, __unused_rspack_exports, __webpack_require__) {
var api = __webpack_require__("../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css",
      function(__rspack_hmr_outdated) {
(function () {
        content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.id, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      })(__rspack_hmr_outdated); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

},
"../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css"(module, __unused_rspack_exports, __webpack_require__) {
var api = __webpack_require__("../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css",
      function(__rspack_hmr_outdated) {
(function () {
        content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.id, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      })(__rspack_hmr_outdated); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

},
"../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _cornerstonejs_core__rspack_import_1 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _ohif_core__rspack_import_2 = __webpack_require__("../../core/src/index.ts");
/* import */ var _ohif_ui_next__rspack_import_3 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _state__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone/src/state.ts");
/* import */ var _OHIFCornerstoneViewport_css__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css");
/* import */ var _OHIFCornerstoneViewport_css__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(_OHIFCornerstoneViewport_css__rspack_import_5);
/* import */ var _Overlays_CornerstoneOverlays__rspack_import_6 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx");
/* import */ var _components_CinePlayer__rspack_import_7 = __webpack_require__("../../../extensions/cornerstone/src/components/CinePlayer/index.ts");
/* import */ var _components_OHIFViewportActionCorners__rspack_import_8 = __webpack_require__("../../../extensions/cornerstone/src/components/OHIFViewportActionCorners.tsx");
/* import */ var _utils_presentations_getViewportPresentations__rspack_import_9 = __webpack_require__("../../../extensions/cornerstone/src/utils/presentations/getViewportPresentations.ts");
/* import */ var _stores_useSynchronizersStore__rspack_import_10 = __webpack_require__("../../../extensions/cornerstone/src/stores/useSynchronizersStore.ts");
/* import */ var _utils_ActiveViewportBehavior__rspack_import_11 = __webpack_require__("../../../extensions/cornerstone/src/utils/ActiveViewportBehavior.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();












const STACK = 'stack';

// Cache for viewport dimensions, persists across component remounts
const viewportDimensions = new Map();

// Todo: This should be done with expose of internal API similar to react-vtkjs-viewport
// Then we don't need to worry about the re-renders if the props change.
const OHIFCornerstoneViewport = /*#__PURE__*/_s(/*#__PURE__*/react__rspack_import_0_default().memo(_c = _s(props => {
  _s();
  const {
    displaySets,
    dataSource,
    viewportOptions,
    displaySetOptions,
    servicesManager,
    onElementEnabled,
    // eslint-disable-next-line react/prop-types
    onElementDisabled,
    isJumpToMeasurementDisabled = false,
    // Note: you SHOULD NOT use the initialImageIdOrIndex for manipulation
    // of the imageData in the OHIFCornerstoneViewport. This prop is used
    // to set the initial state of the viewport's first image to render
    // eslint-disable-next-line react/prop-types
    initialImageIndex,
    // if the viewport is part of a hanging protocol layout
    // we should not really rely on the old synchronizers and
    // you see below we only rehydrate the synchronizers if the viewport
    // is not part of the hanging protocol layout. HPs should
    // define their own synchronizers. Since the synchronizers are
    // viewportId dependent and
    // eslint-disable-next-line react/prop-types
    isHangingProtocolLayout
  } = props;
  const viewportId = viewportOptions.viewportId;
  if (!viewportId) {
    throw new Error('Viewport ID is required');
  }

  // Make sure displaySetOptions has one object per displaySet
  while (displaySetOptions.length < displaySets.length) {
    displaySetOptions.push({});
  }

  // Since we only have support for dynamic data in volume viewports, we should
  // handle this case here and set the viewportType to volume if any of the
  // displaySets are dynamic volumes
  viewportOptions.viewportType = displaySets.some(ds => ds.isDynamicVolume && ds.isReconstructable) ? 'volume' : viewportOptions.viewportType;
  const [scrollbarHeight, setScrollbarHeight] = (0,react__rspack_import_0.useState)('100px');
  const [enabledVPElement, setEnabledVPElement] = (0,react__rspack_import_0.useState)(null);
  const elementRef = (0,react__rspack_import_0.useRef)();
  const viewportRef = (0,_ohif_core__rspack_import_2.useViewportRef)(viewportId);
  const {
    displaySetService,
    toolbarService,
    toolGroupService,
    syncGroupService,
    cornerstoneViewportService,
    segmentationService,
    cornerstoneCacheService,
    customizationService,
    measurementService
  } = servicesManager.services;
  const [viewportDialogState] = (0,_ohif_ui_next__rspack_import_3.useViewportDialog)();
  // useCallback for scroll bar height calculation
  const setImageScrollBarHeight = (0,react__rspack_import_0.useCallback)(() => {
    const scrollbarHeight = `${elementRef.current.clientHeight - 10}px`;
    setScrollbarHeight(scrollbarHeight);
  }, [elementRef]);

  // useCallback for onResize
  const onResize = (0,react__rspack_import_0.useCallback)(entries => {
    if (elementRef.current && entries?.length) {
      const entry = entries[0];
      const {
        width,
        height
      } = entry.contentRect;
      const prevDimensions = viewportDimensions.get(viewportId) || {
        width: 0,
        height: 0
      };

      // Check if dimensions actually changed and then only resize if they have changed
      const hasDimensionsChanged = prevDimensions.width !== width || prevDimensions.height !== height;
      if (width > 0 && height > 0 && hasDimensionsChanged) {
        viewportDimensions.set(viewportId, {
          width,
          height
        });
        // Perform resize operations
        cornerstoneViewportService.resize();
        setImageScrollBarHeight();
      }
    }
  }, [viewportId, elementRef, cornerstoneViewportService, setImageScrollBarHeight]);
  (0,react__rspack_import_0.useEffect)(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(element);

    // Cleanup function
    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [onResize]);
  const cleanUpServices = (0,react__rspack_import_0.useCallback)(viewportInfo => {
    const renderingEngineId = viewportInfo.getRenderingEngineId();
    const syncGroups = viewportInfo.getSyncGroups();
    toolGroupService.removeViewportFromToolGroup(viewportId, renderingEngineId);
    syncGroupService.removeViewportFromSyncGroup(viewportId, renderingEngineId, syncGroups);
    segmentationService.clearSegmentationRepresentations(viewportId);
  }, [viewportId, segmentationService, syncGroupService, toolGroupService]);
  const elementEnabledHandler = (0,react__rspack_import_0.useCallback)(evt => {
    // check this is this element reference and return early if doesn't match
    if (evt.detail.element !== elementRef.current) {
      return;
    }
    const {
      viewportId,
      element
    } = evt.detail;
    const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
    if (!viewportInfo) {
      return;
    }
    (0,_state__rspack_import_4.setEnabledElement)(viewportId, element);
    setEnabledVPElement(element);
    const renderingEngineId = viewportInfo.getRenderingEngineId();
    const toolGroupId = viewportInfo.getToolGroupId();
    const syncGroups = viewportInfo.getSyncGroups();
    toolGroupService.addViewportToToolGroup(viewportId, renderingEngineId, toolGroupId);
    syncGroupService.addViewportToSyncGroup(viewportId, renderingEngineId, syncGroups);

    // we don't need reactivity here so just use state
    const {
      synchronizersStore
    } = _stores_useSynchronizersStore__rspack_import_10.useSynchronizersStore.getState();
    if (synchronizersStore?.[viewportId]?.length && !isHangingProtocolLayout) {
      // If the viewport used to have a synchronizer, re apply it again
      _rehydrateSynchronizers(viewportId, syncGroupService);
    }
    if (onElementEnabled && typeof onElementEnabled === 'function') {
      onElementEnabled(evt);
    }
  }, [viewportId, onElementEnabled, toolGroupService]);

  // disable the element upon unmounting
  (0,react__rspack_import_0.useEffect)(() => {
    cornerstoneViewportService.enableViewport(viewportId, elementRef.current);
    _cornerstonejs_core__rspack_import_1.eventTarget.addEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.ELEMENT_ENABLED, elementEnabledHandler);
    setImageScrollBarHeight();
    return () => {
      const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
      if (!viewportInfo) {
        return;
      }
      cornerstoneViewportService.storePresentation({
        viewportId
      });

      // This should be done after the store presentation since synchronizers
      // will get cleaned up and they need the viewportInfo to be present
      cleanUpServices(viewportInfo);
      if (onElementDisabled && typeof onElementDisabled === 'function') {
        onElementDisabled(viewportInfo);
      }
      cornerstoneViewportService.disableElement(viewportId);
      viewportRef.unregister();
      _cornerstonejs_core__rspack_import_1.eventTarget.removeEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.ELEMENT_ENABLED, elementEnabledHandler);
    };
  }, []);

  // subscribe to displaySet metadata invalidation (updates)
  // Currently, if the metadata changes we need to re-render the display set
  // for it to take effect in the viewport. As we deal with scaling in the loading,
  // we need to remove the old volume from the cache, and let the
  // viewport to re-add it which will use the new metadata. Otherwise, the
  // viewport will use the cached volume and the new metadata will not be used.
  // Note: this approach does not actually end of sending network requests
  // and it uses the network cache
  (0,react__rspack_import_0.useEffect)(() => {
    const {
      unsubscribe
    } = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SET_SERIES_METADATA_INVALIDATED, async ({
      displaySetInstanceUID: invalidatedDisplaySetInstanceUID,
      invalidateData
    }) => {
      if (!invalidateData) {
        return;
      }
      const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
      if (viewportInfo.hasDisplaySet(invalidatedDisplaySetInstanceUID)) {
        const viewportData = viewportInfo.getViewportData();
        const newViewportData = await cornerstoneCacheService.invalidateViewportData(viewportData, invalidatedDisplaySetInstanceUID, dataSource, displaySetService);
        const keepCamera = true;
        cornerstoneViewportService.updateViewport(viewportId, newViewportData, keepCamera);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [viewportId]);
  (0,react__rspack_import_0.useEffect)(() => {
    // handle the default viewportType to be stack
    if (!viewportOptions.viewportType) {
      viewportOptions.viewportType = STACK;
    }
    const loadViewportData = async () => {
      const viewportData = await cornerstoneCacheService.createViewportData(displaySets, viewportOptions, dataSource, initialImageIndex);
      const presentations = (0,_utils_presentations_getViewportPresentations__rspack_import_9.getViewportPresentations)(viewportId, viewportOptions);

      // Note: This is a hack to get the grid to re-render the OHIFCornerstoneViewport component
      // Used for segmentation hydration right now, since the logic to decide whether
      // a viewport needs to render a segmentation lives inside the CornerstoneViewportService
      // so we need to re-render (force update via change of the needsRerendering) so that React
      // does the diffing and decides we should render this again (although the id and element has not changed)
      // so that the CornerstoneViewportService can decide whether to render the segmentation or not. Not that we reached here we can turn it off.
      if (viewportOptions.needsRerendering) {
        viewportOptions.needsRerendering = false;
      }
      cornerstoneViewportService.setViewportData(viewportId, viewportData, viewportOptions, displaySetOptions, presentations);
    };
    loadViewportData();
  }, [viewportOptions, displaySets, dataSource]);
  const Notification = customizationService.getCustomization('ui.notificationComponent');
  return /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Fragment), null, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "viewport-wrapper"
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "cornerstone-viewport-element",
    style: {
      height: '100%',
      width: '100%'
    },
    onContextMenu: e => e.preventDefault(),
    onMouseDown: e => e.preventDefault(),
    "data-viewportid": viewportId,
    ref: el => {
      elementRef.current = el;
      if (el) {
        viewportRef.register(el);
      }
    }
  }), /*#__PURE__*/react__rspack_import_0_default().createElement(_Overlays_CornerstoneOverlays__rspack_import_6["default"], {
    viewportId: viewportId,
    toolBarService: toolbarService,
    element: elementRef.current,
    scrollbarHeight: scrollbarHeight,
    servicesManager: servicesManager
  }), /*#__PURE__*/react__rspack_import_0_default().createElement(_components_CinePlayer__rspack_import_7["default"], {
    enabledVPElement: enabledVPElement,
    viewportId: viewportId,
    servicesManager: servicesManager
  }), /*#__PURE__*/react__rspack_import_0_default().createElement(_utils_ActiveViewportBehavior__rspack_import_11["default"], {
    viewportId: viewportId,
    servicesManager: servicesManager
  })), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "absolute top-[24px] w-full"
  }, viewportDialogState.viewportId === viewportId && /*#__PURE__*/react__rspack_import_0_default().createElement(Notification, {
    id: "viewport-notification",
    message: viewportDialogState.message,
    type: viewportDialogState.type,
    actions: viewportDialogState.actions,
    onSubmit: viewportDialogState.onSubmit,
    onOutsideClick: viewportDialogState.onOutsideClick,
    onKeyPress: viewportDialogState.onKeyPress
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_components_OHIFViewportActionCorners__rspack_import_8["default"], {
    viewportId: viewportId
  }));
}, "KrPInZ/QytTNd/nHUOW2R0b/yXw=", false, function () {
  return [_ohif_core__rspack_import_2.useViewportRef, _ohif_ui_next__rspack_import_3.useViewportDialog];
}), areEqual), "KrPInZ/QytTNd/nHUOW2R0b/yXw=", false, function () {
  return [_ohif_core__rspack_import_2.useViewportRef, _ohif_ui_next__rspack_import_3.useViewportDialog];
});
_c2 = OHIFCornerstoneViewport;
function _rehydrateSynchronizers(viewportId, syncGroupService) {
  const {
    synchronizersStore
  } = _stores_useSynchronizersStore__rspack_import_10.useSynchronizersStore.getState();
  const synchronizers = synchronizersStore[viewportId];
  if (!synchronizers) {
    return;
  }
  synchronizers.forEach(synchronizerObj => {
    if (!synchronizerObj.id) {
      return;
    }
    const {
      id,
      sourceViewports,
      targetViewports
    } = synchronizerObj;
    const synchronizer = syncGroupService.getSynchronizer(id);
    if (!synchronizer) {
      return;
    }
    const sourceViewportInfo = sourceViewports.find(sourceViewport => sourceViewport.viewportId === viewportId);
    const targetViewportInfo = targetViewports.find(targetViewport => targetViewport.viewportId === viewportId);
    const isSourceViewportInSynchronizer = synchronizer.getSourceViewports().find(sourceViewport => sourceViewport.viewportId === viewportId);
    const isTargetViewportInSynchronizer = synchronizer.getTargetViewports().find(targetViewport => targetViewport.viewportId === viewportId);

    // if the viewport was previously a source viewport, add it again
    if (sourceViewportInfo && !isSourceViewportInSynchronizer) {
      synchronizer.addSource({
        viewportId: sourceViewportInfo.viewportId,
        renderingEngineId: sourceViewportInfo.renderingEngineId
      });
    }

    // if the viewport was previously a target viewport, add it again
    if (targetViewportInfo && !isTargetViewportInSynchronizer) {
      synchronizer.addTarget({
        viewportId: targetViewportInfo.viewportId,
        renderingEngineId: targetViewportInfo.renderingEngineId
      });
    }
  });
}

// Component displayName
OHIFCornerstoneViewport.displayName = 'OHIFCornerstoneViewport';
function areEqual(prevProps, nextProps) {
  if (nextProps.needsRerendering) {
    return false;
  }
  if (prevProps.displaySets.length !== nextProps.displaySets.length) {
    return false;
  }
  if (prevProps.viewportOptions.orientation !== nextProps.viewportOptions.orientation) {
    return false;
  }
  if (prevProps.viewportOptions.toolGroupId !== nextProps.viewportOptions.toolGroupId) {
    return false;
  }
  if (nextProps.viewportOptions.viewportType && prevProps.viewportOptions.viewportType !== nextProps.viewportOptions.viewportType) {
    return false;
  }
  if (nextProps.viewportOptions.needsRerendering) {
    return false;
  }
  const prevDisplaySets = prevProps.displaySets;
  const nextDisplaySets = nextProps.displaySets;
  if (prevDisplaySets.length !== nextDisplaySets.length) {
    return false;
  }
  for (let i = 0; i < prevDisplaySets.length; i++) {
    const prevDisplaySet = prevDisplaySets[i];
    const foundDisplaySet = nextDisplaySets.find(nextDisplaySet => nextDisplaySet.displaySetInstanceUID === prevDisplaySet.displaySetInstanceUID);
    if (!foundDisplaySet) {
      return false;
    }

    // check they contain the same image
    if (foundDisplaySet.images?.length !== prevDisplaySet.images?.length) {
      return false;
    }

    // check if their imageIds are the same
    if (foundDisplaySet.images?.length) {
      for (let j = 0; j < foundDisplaySet.images.length; j++) {
        if (foundDisplaySet.images[j].imageId !== prevDisplaySet.images[j].imageId) {
          return false;
        }
      }
    }
  }
  return true;
}
/* export default */ const __rspack_default_export = (OHIFCornerstoneViewport);
var _c, _c2;
$RefreshReg$(_c, "OHIFCornerstoneViewport$React.memo");
$RefreshReg$(_c2, "OHIFCornerstoneViewport");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ViewportImageScrollbar__rspack_import_1 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx");
/* import */ var _ViewportSliceProgressScrollbar_ViewportSliceProgressScrollbar__rspack_import_2 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/ViewportSliceProgressScrollbar/ViewportSliceProgressScrollbar.tsx");
/* import */ var _CustomizableViewportOverlay__rspack_import_3 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
/* import */ var _ViewportOrientationMarkers__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx");
/* import */ var _ViewportImageSliceLoadingIndicator__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();






function CornerstoneOverlays(props) {
  _s();
  const {
    viewportId,
    element,
    scrollbarHeight,
    servicesManager
  } = props;
  const {
    cornerstoneViewportService,
    customizationService
  } = servicesManager.services;
  const [imageSliceData, setImageSliceData] = (0,react__rspack_import_0.useState)({
    imageIndex: 0,
    numberOfSlices: 0
  });
  const [viewportData, setViewportData] = (0,react__rspack_import_0.useState)(null);
  (0,react__rspack_import_0.useEffect)(() => {
    const {
      unsubscribe
    } = cornerstoneViewportService.subscribe(cornerstoneViewportService.EVENTS.VIEWPORT_DATA_CHANGED, props => {
      if (props.viewportId !== viewportId) {
        return;
      }
      setViewportData(props.viewportData);
    });
    return () => {
      unsubscribe();
    };
  }, [viewportId]);
  if (!element) {
    return null;
  }
  if (viewportData) {
    const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
    if (viewportInfo?.viewportOptions?.customViewportProps?.hideOverlays) {
      return null;
    }
  }
  const viewportScrollbarVariant = customizationService.getCustomization('viewportScrollbar.variant');
  const useProgressScrollbar = viewportScrollbarVariant !== 'legacy';
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "noselect"
  }, useProgressScrollbar ? /*#__PURE__*/react__rspack_import_0_default().createElement(_ViewportSliceProgressScrollbar_ViewportSliceProgressScrollbar__rspack_import_2["default"], {
    viewportId: viewportId,
    viewportData: viewportData,
    element: element,
    imageSliceData: imageSliceData,
    setImageSliceData: setImageSliceData,
    servicesManager: servicesManager
  }) : /*#__PURE__*/react__rspack_import_0_default().createElement(_ViewportImageScrollbar__rspack_import_1["default"], {
    viewportId: viewportId,
    viewportData: viewportData,
    element: element,
    imageSliceData: imageSliceData,
    setImageSliceData: setImageSliceData,
    scrollbarHeight: scrollbarHeight,
    servicesManager: servicesManager
  }), /*#__PURE__*/react__rspack_import_0_default().createElement(_CustomizableViewportOverlay__rspack_import_3["default"], {
    imageSliceData: imageSliceData,
    viewportData: viewportData,
    viewportId: viewportId,
    servicesManager: servicesManager,
    element: element
  }), /*#__PURE__*/react__rspack_import_0_default().createElement(_ViewportImageSliceLoadingIndicator__rspack_import_5["default"], {
    viewportData: viewportData,
    element: element
  }), /*#__PURE__*/react__rspack_import_0_default().createElement(_ViewportOrientationMarkers__rspack_import_4["default"], {
    imageSliceData: imageSliceData,
    element: element,
    viewportData: viewportData,
    servicesManager: servicesManager,
    viewportId: viewportId
  }));
}
_s(CornerstoneOverlays, "7y4R8Q5uzdtKJyb5WwOhOhBbbr0=");
_c = CornerstoneOverlays;
/* export default */ const __rspack_default_export = (CornerstoneOverlays);
var _c;
$RefreshReg$(_c, "CornerstoneOverlays");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CustomizableViewportOverlay: () => (CustomizableViewportOverlay),
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var gl_matrix__rspack_import_1 = __webpack_require__("../../../node_modules/gl-matrix/esm/index.js");
/* import */ var prop_types__rspack_import_2 = __webpack_require__("../../../node_modules/prop-types/index.js");
/* import */ var prop_types__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(prop_types__rspack_import_2);
/* import */ var _cornerstonejs_core__rspack_import_3 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _cornerstonejs_tools__rspack_import_4 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* import */ var _ohif_ui_next__rspack_import_5 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _utils__rspack_import_6 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/utils.ts");
/* import */ var _ohif_core__rspack_import_7 = __webpack_require__("../../core/src/index.ts");
/* import */ var _services_ViewportService_adapter__rspack_import_8 = __webpack_require__("../../../extensions/cornerstone/src/services/ViewportService/adapter/index.ts");
/* import */ var _utils_viewportDataShape__rspack_import_9 = __webpack_require__("../../../extensions/cornerstone/src/utils/viewportDataShape.ts");
/* import */ var _CustomizableViewportOverlay_css__rspack_import_10 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css");
/* import */ var _CustomizableViewportOverlay_css__rspack_import_10_default = /*#__PURE__*/__webpack_require__.n(_CustomizableViewportOverlay_css__rspack_import_10);
/* import */ var _hooks__rspack_import_11 = __webpack_require__("../../../extensions/cornerstone/src/hooks/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();












const EPSILON = 1e-4;
const {
  formatPN,
  formatValue
} = _ohif_core__rspack_import_7.utils;
const OverlayItemComponents = {
  'ohif.overlayItem': OverlayItem,
  'ohif.overlayItem.windowLevel': VOIOverlayItem,
  'ohif.overlayItem.zoomLevel': ZoomOverlayItem,
  'ohif.overlayItem.instanceNumber': InstanceNumberOverlayItem
};

/**
 * Customizable Viewport Overlay
 */
function CustomizableViewportOverlay({
  element,
  viewportData,
  imageSliceData,
  viewportId,
  servicesManager
}) {
  _s();
  const {
    cornerstoneViewportService,
    customizationService,
    toolGroupService,
    displaySetService
  } = servicesManager.services;
  const [scale, setScale] = (0,react__rspack_import_0.useState)(1);
  const [annotationState, setAnnotationState] = (0,react__rspack_import_0.useState)(0);
  const {
    isViewportBackgroundLight: isLight,
    windowLevel: voi
  } = (0,_hooks__rspack_import_11.useViewportRendering)(viewportId);
  const {
    imageIndex
  } = imageSliceData;

  // Historical usage defined the overlays as separate items due to lack of
  // append functionality.  This code enables the historical usage, but
  // the recommended functionality is to append to the default values in
  // cornerstoneOverlay rather than defining individual items.
  const topLeftCustomization = customizationService.getCustomization('viewportOverlay.topLeft');
  const topRightCustomization = customizationService.getCustomization('viewportOverlay.topRight');
  const bottomLeftCustomization = customizationService.getCustomization('viewportOverlay.bottomLeft');
  const bottomRightCustomization = customizationService.getCustomization('viewportOverlay.bottomRight');
  const instanceNumber = (0,react__rspack_import_0.useMemo)(() => viewportData ? getInstanceNumber(viewportData, viewportId, imageIndex, cornerstoneViewportService) : null, [viewportData, viewportId, imageIndex, cornerstoneViewportService]);
  const displaySetProps = (0,react__rspack_import_0.useMemo)(() => {
    const displaySets = getDisplaySets(viewportData, displaySetService);
    if (!displaySets) {
      return null;
    }
    const [displaySet] = displaySets;
    const {
      instances,
      instance: referenceInstance
    } = displaySet;
    return {
      displaySets,
      displaySet,
      instance: instances?.[imageIndex],
      instances,
      referenceInstance
    };
  }, [viewportData, viewportId, instanceNumber, cornerstoneViewportService]);
  const annotationModified = (0,react__rspack_import_0.useCallback)(evt => {
    if (evt.detail.annotation.metadata.toolName === _cornerstonejs_tools__rspack_import_4.UltrasoundPleuraBLineTool.toolName) {
      // Update the annotation state to trigger a re-render
      setAnnotationState(prevState => prevState + 1);
    }
  }, []);
  (0,react__rspack_import_0.useEffect)(() => {
    _cornerstonejs_core__rspack_import_3.eventTarget.addEventListener(_cornerstonejs_tools__rspack_import_4.Enums.Events.ANNOTATION_MODIFIED, annotationModified);
    return () => {
      _cornerstonejs_core__rspack_import_3.eventTarget.removeEventListener(_cornerstonejs_tools__rspack_import_4.Enums.Events.ANNOTATION_MODIFIED, annotationModified);
    };
  }, [annotationModified]);
  /**
   * Updating the scale when the viewport changes its zoom
   */
  (0,react__rspack_import_0.useEffect)(() => {
    const updateScale = eventDetail => {
      const {
        previousCamera,
        camera
      } = eventDetail.detail;
      if (previousCamera.parallelScale !== camera.parallelScale || previousCamera.scale !== camera.scale) {
        const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
        if (!viewport) {
          return;
        }
        const scale = viewport.getZoom();
        setScale(scale);
      }
    };
    element.addEventListener(_cornerstonejs_core__rspack_import_3.Enums.Events.CAMERA_MODIFIED, updateScale);
    return () => {
      element.removeEventListener(_cornerstonejs_core__rspack_import_3.Enums.Events.CAMERA_MODIFIED, updateScale);
    };
  }, [viewportId, viewportData, cornerstoneViewportService, element]);
  const _renderOverlayItem = (0,react__rspack_import_0.useCallback)((item, props) => {
    const overlayItemProps = {
      ...props,
      element,
      viewportData,
      imageSliceData,
      viewportId,
      servicesManager,
      customization: item,
      isLight,
      formatters: {
        formatPN,
        formatDate: _ohif_ui_next__rspack_import_5.formatDICOMDate,
        formatTime: _utils__rspack_import_6.formatDICOMTime,
        formatNumberPrecision: _utils__rspack_import_6.formatNumberPrecision
      }
    };
    if (!item) {
      return null;
    }
    const {
      inheritsFrom
    } = item;
    const OverlayItemComponent = OverlayItemComponents[inheritsFrom];
    if (OverlayItemComponent) {
      return /*#__PURE__*/react__rspack_import_0_default().createElement(OverlayItemComponent, overlayItemProps);
    } else {
      const renderItem = customizationService.transform(item);
      if (renderItem && typeof renderItem === 'object' && 'contentF' in renderItem && typeof renderItem.contentF === 'function') {
        return renderItem.contentF(overlayItemProps);
      }
    }
  }, [element, viewportData, imageSliceData, viewportId, servicesManager, customizationService, displaySetProps, voi, scale, instanceNumber, annotationState, isLight]);
  const getContent = (0,react__rspack_import_0.useCallback)((customization, keyPrefix) => {
    const props = {
      ...displaySetProps,
      formatters: {
        formatDate: _ohif_ui_next__rspack_import_5.formatDICOMDate
      },
      voi,
      scale,
      instanceNumber,
      viewportId,
      toolGroupService,
      isLight
    };
    return /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Fragment), null, customization.map((item, index) => /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
      key: `${keyPrefix}_${index}`
    }, (!item?.condition || item.condition(props)) && _renderOverlayItem(item, props) || null)));
  }, [_renderOverlayItem]);
  return /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_5.ViewportOverlay, {
    topLeft: getContent(topLeftCustomization, 'topLeftOverlayItem'),
    topRight: getContent(topRightCustomization, 'topRightOverlayItem'),
    bottomLeft: getContent(bottomLeftCustomization, 'bottomLeftOverlayItem'),
    bottomRight: getContent(bottomRightCustomization, 'bottomRightOverlayItem'),
    color: isLight ? 'text-neutral-dark' : 'text-neutral-light',
    shadowClass: isLight ? 'shadow-light' : 'shadow-dark'
  });
}

/**
 * Gets an array of display sets for the given viewport, based on the viewport data.
 * Returns null if none found.
 */
_s(CustomizableViewportOverlay, "FtA4v4+zNh87iUk2DLN4qPbiGCA=", false, function () {
  return [_hooks__rspack_import_11.useViewportRendering];
});
_c = CustomizableViewportOverlay;
function getDisplaySets(viewportData, displaySetService) {
  if (!viewportData?.data?.length) {
    return null;
  }
  const displaySets = viewportData.data.map(datum => displaySetService.getDisplaySetByUID(datum.displaySetInstanceUID)).filter(it => !!it);
  if (!displaySets.length) {
    return null;
  }
  return displaySets;
}
const getInstanceNumber = (viewportData, viewportId, imageIndex, cornerstoneViewportService) => {
  let instanceNumber;
  switch ((0,_utils_viewportDataShape__rspack_import_9.getViewportDataShapeType)(viewportData)) {
    case _cornerstonejs_core__rspack_import_3.Enums.ViewportType.STACK:
      instanceNumber = _getInstanceNumberFromStack(viewportData, imageIndex);
      break;
    case _cornerstonejs_core__rspack_import_3.Enums.ViewportType.ORTHOGRAPHIC:
      instanceNumber = _getInstanceNumberFromVolume(viewportData, viewportId, cornerstoneViewportService, imageIndex);
      break;
  }
  return instanceNumber ?? null;
};
function _getInstanceNumberFromStack(viewportData, imageIndex) {
  const imageIds = viewportData.data[0].imageIds;
  const imageId = imageIds[imageIndex];
  if (!imageId) {
    return;
  }
  const generalImageModule = _cornerstonejs_core__rspack_import_3.metaData.get('generalImageModule', imageId) || {};
  const {
    instanceNumber
  } = generalImageModule;
  const stackSize = imageIds.length;
  if (stackSize <= 1) {
    return;
  }
  return parseInt(instanceNumber);
}

// Since volume viewports can be in any view direction, they can render
// a reconstructed image which don't have imageIds; therefore, no instance and instanceNumber
// Here we check if viewport is in the acquisition direction and if so, we get the instanceNumber
function _getInstanceNumberFromVolume(viewportData, viewportId, cornerstoneViewportService, imageIndex) {
  const volumes = viewportData.data;
  if (!volumes) {
    return;
  }

  // Todo: support fusion of acquisition plane which has instanceNumber
  const {
    volume
  } = volumes[0];
  if (!volume) {
    return;
  }
  const {
    direction,
    imageIds
  } = volume;
  const cornerstoneViewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
  if (!cornerstoneViewport) {
    return;
  }
  const viewPlaneNormal = (0,_services_ViewportService_adapter__rspack_import_8.getViewportAdapter)(cornerstoneViewport).getViewPlaneNormal();
  if (!viewPlaneNormal) {
    return;
  }
  // checking if camera is looking at the acquisition plane (defined by the direction on the volume)

  const scanAxisNormal = direction.slice(6, 9);

  // check if viewPlaneNormal is parallel to scanAxisNormal
  const cross = gl_matrix__rspack_import_1.vec3.cross(gl_matrix__rspack_import_1.vec3.create(), viewPlaneNormal, scanAxisNormal);
  const isAcquisitionPlane = gl_matrix__rspack_import_1.vec3.length(cross) < EPSILON;
  if (isAcquisitionPlane) {
    const imageId = imageIds[imageIndex];
    if (!imageId) {
      // No image at this index (e.g. a single-image volume scrolled out of
      // range). Return undefined so the overlay falls back to the slice count
      // instead of rendering an empty object as "[object Object]".
      return;
    }
    const {
      instanceNumber
    } = _cornerstonejs_core__rspack_import_3.metaData.get('generalImageModule', imageId) || {};
    return parseInt(instanceNumber);
  }
}
function OverlayItem(props) {
  const {
    instance,
    customization = {}
  } = props;
  const {
    color,
    attribute,
    title,
    label,
    background
  } = customization;
  const value = customization.contentF?.(props, customization) ?? instance?.[attribute];
  const displayValue = formatValue(value);
  if (displayValue === null || displayValue === '') {
    return null;
  }
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color,
      background
    },
    title: title
  }, label ? /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "mr-1 shrink-0"
  }, label) : null, /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "ml-0 shrink-0"
  }, displayValue));
}

/**
 * Window Level / Center Overlay item
 * //
 */
_c2 = OverlayItem;
function VOIOverlayItem({
  voi,
  customization
}) {
  const {
    windowWidth,
    windowCenter
  } = voi;
  const {
    title
  } = customization;
  if (typeof windowCenter !== 'number' || typeof windowWidth !== 'number') {
    return null;
  }
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color: customization?.color
    },
    title: title
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "mr-0.5 shrink-0 opacity-[0.70]"
  }, "W:"), /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "mr-2.5 shrink-0"
  }, windowWidth.toFixed(0)), /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "mr-0.5 shrink-0 opacity-[0.70]"
  }, "L:"), /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "shrink-0"
  }, windowCenter.toFixed(0)));
}

/**
 * Zoom Level Overlay item
 */
_c3 = VOIOverlayItem;
function ZoomOverlayItem({
  scale,
  customization
}) {
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color: customization && customization.color || undefined
    }
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "mr-0.5 shrink-0 opacity-[0.70]"
  }, "Zoom:"), /*#__PURE__*/react__rspack_import_0_default().createElement("span", null, scale.toFixed(2), "x"));
}

/**
 * Instance Number Overlay Item
 */
_c4 = ZoomOverlayItem;
function InstanceNumberOverlayItem({
  instanceNumber,
  imageSliceData,
  customization
}) {
  const {
    imageIndex,
    numberOfSlices
  } = imageSliceData;
  const {
    title
  } = customization;
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color: customization && customization.color || undefined
    },
    title: title
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("span", null, instanceNumber !== undefined && instanceNumber !== null ? /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Fragment), null, /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    className: "mr-0.5 shrink-0 opacity-[0.70]"
  }, "I:"), /*#__PURE__*/react__rspack_import_0_default().createElement("span", null, `${instanceNumber} (${imageIndex + 1}/${numberOfSlices})`)) : `${imageIndex + 1}/${numberOfSlices}`));
}
_c5 = InstanceNumberOverlayItem;
CustomizableViewportOverlay.propTypes = {
  viewportData: (prop_types__rspack_import_2_default().object),
  imageIndex: (prop_types__rspack_import_2_default().number),
  viewportId: (prop_types__rspack_import_2_default().string)
};
/* export default */ const __rspack_default_export = (CustomizableViewportOverlay);

var _c, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "CustomizableViewportOverlay");
$RefreshReg$(_c2, "OverlayItem");
$RefreshReg$(_c3, "VOIOverlayItem");
$RefreshReg$(_c4, "ZoomOverlayItem");
$RefreshReg$(_c5, "InstanceNumberOverlayItem");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var prop_types__rspack_import_1 = __webpack_require__("../../../node_modules/prop-types/index.js");
/* import */ var prop_types__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(prop_types__rspack_import_1);
/* import */ var _cornerstonejs_core__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _ohif_ui_next__rspack_import_3 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _utils_getLegacyViewportType__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone/src/utils/getLegacyViewportType.ts");
/* import */ var _utils_viewportDataShape__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone/src/utils/viewportDataShape.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();






function CornerstoneImageScrollbar({
  viewportData,
  viewportId,
  element,
  imageSliceData,
  setImageSliceData,
  scrollbarHeight,
  servicesManager
}) {
  _s();
  const {
    cineService,
    cornerstoneViewportService
  } = servicesManager.services;
  const onImageScrollbarChange = (imageIndex, viewportId) => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    const {
      isCineEnabled
    } = cineService.getState();
    if (isCineEnabled) {
      // on image scrollbar change, stop the CINE if it is playing
      cineService.stopClip(element, {
        viewportId
      });
      cineService.setCine({
        id: viewportId,
        isPlaying: false
      });
    }
    _cornerstonejs_core__rspack_import_2.utilities.jumpToSlice(viewport.element, {
      imageIndex,
      debounceLoading: true
    });
  };
  (0,react__rspack_import_0.useEffect)(() => {
    if (!viewportData) {
      return;
    }
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!viewport || (0,_utils_getLegacyViewportType__rspack_import_4.isVolume3DViewportType)(viewport)) {
      return;
    }
    try {
      const imageIndex = viewport.getCurrentImageIdIndex();
      const numberOfSlices = (0,_utils_viewportDataShape__rspack_import_5.getViewportSliceCount)(viewportData, viewport);
      setImageSliceData({
        imageIndex,
        numberOfSlices
      });
    } catch (error) {
      console.warn(error);
    }
  }, [viewportId, viewportData]);
  (0,react__rspack_import_0.useEffect)(() => {
    if (!viewportData) {
      return;
    }
    const eventId = (0,_utils_viewportDataShape__rspack_import_5.getSliceEventName)(viewportData);
    const updateIndex = event => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      if (!viewport || (0,_utils_getLegacyViewportType__rspack_import_4.isVolume3DViewportType)(viewport)) {
        return;
      }
      const {
        imageIndex,
        newImageIdIndex = imageIndex,
        imageIdIndex
      } = event.detail;
      const numberOfSlices = viewport.getNumberOfSlices();
      // find the index of imageId in the imageIds
      setImageSliceData({
        imageIndex: newImageIdIndex ?? imageIdIndex,
        numberOfSlices
      });
    };
    element.addEventListener(eventId, updateIndex);
    return () => {
      element.removeEventListener(eventId, updateIndex);
    };
  }, [viewportData, element]);
  return /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_3.ImageScrollbar, {
    onChange: evt => onImageScrollbarChange(evt, viewportId),
    max: imageSliceData.numberOfSlices ? imageSliceData.numberOfSlices - 1 : 0,
    height: scrollbarHeight,
    value: imageSliceData.imageIndex || 0
  });
}
_s(CornerstoneImageScrollbar, "3ubReDTFssvu4DHeldAg55cW/CI=");
_c = CornerstoneImageScrollbar;
CornerstoneImageScrollbar.propTypes = {
  viewportData: (prop_types__rspack_import_1_default().object),
  viewportId: (prop_types__rspack_import_1_default().string.isRequired),
  element: prop_types__rspack_import_1_default().instanceOf(Element),
  scrollbarHeight: (prop_types__rspack_import_1_default().string),
  imageSliceData: (prop_types__rspack_import_1_default().object.isRequired),
  setImageSliceData: (prop_types__rspack_import_1_default().func.isRequired),
  servicesManager: (prop_types__rspack_import_1_default().object.isRequired)
};
/* export default */ const __rspack_default_export = (CornerstoneImageScrollbar);
var _c;
$RefreshReg$(_c, "CornerstoneImageScrollbar");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var prop_types__rspack_import_1 = __webpack_require__("../../../node_modules/prop-types/index.js");
/* import */ var prop_types__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(prop_types__rspack_import_1);
/* import */ var _cornerstonejs_core__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();



function ViewportImageSliceLoadingIndicator({
  viewportData,
  element
}) {
  _s();
  const [loading, setLoading] = (0,react__rspack_import_0.useState)(false);
  const [error, setError] = (0,react__rspack_import_0.useState)(false);
  const loadIndicatorRef = (0,react__rspack_import_0.useRef)(null);
  const imageIdToBeLoaded = (0,react__rspack_import_0.useRef)(null);
  const setLoadingState = evt => {
    clearTimeout(loadIndicatorRef.current);
    loadIndicatorRef.current = setTimeout(() => {
      setLoading(true);
    }, 50);
  };
  const setFinishLoadingState = evt => {
    clearTimeout(loadIndicatorRef.current);
    setLoading(false);
  };
  const setErrorState = evt => {
    clearTimeout(loadIndicatorRef.current);
    if (imageIdToBeLoaded.current === evt.detail.imageId) {
      setError(evt.detail.error);
      imageIdToBeLoaded.current = null;
    }
  };
  (0,react__rspack_import_0.useEffect)(() => {
    element.addEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.STACK_VIEWPORT_SCROLL, setLoadingState);
    element.addEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.IMAGE_LOAD_ERROR, setErrorState);
    element.addEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.STACK_NEW_IMAGE, setFinishLoadingState);
    return () => {
      element.removeEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.STACK_VIEWPORT_SCROLL, setLoadingState);
      element.removeEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.STACK_NEW_IMAGE, setFinishLoadingState);
      element.removeEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.IMAGE_LOAD_ERROR, setErrorState);
    };
  }, [element, viewportData]);
  if (error) {
    return /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Fragment), null, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
      className: "absolute top-0 left-0 h-full w-full bg-black opacity-50"
    }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
      className: "transparent flex h-full w-full items-center justify-center"
    }, /*#__PURE__*/react__rspack_import_0_default().createElement("p", {
      className: "text-highlight text-xl font-light"
    }, /*#__PURE__*/react__rspack_import_0_default().createElement("h4", null, "Error Loading Image"), /*#__PURE__*/react__rspack_import_0_default().createElement("p", null, "An error has occurred."), /*#__PURE__*/react__rspack_import_0_default().createElement("p", null, error)))));
  }
  if (loading) {
    return (/*#__PURE__*/
      // IMPORTANT: we need to use the pointer-events-none class to prevent the loading indicator from
      // interacting with the mouse, since scrolling should propagate to the viewport underneath
      react__rspack_import_0_default().createElement("div", {
        className: "pointer-events-none absolute top-0 left-0 h-full w-full bg-black opacity-50"
      }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
        className: "transparent flex h-full w-full items-center justify-center"
      }, /*#__PURE__*/react__rspack_import_0_default().createElement("p", {
        className: "text-highlight text-xl font-light"
      }, "Loading...")))
    );
  }
  return null;
}
_s(ViewportImageSliceLoadingIndicator, "wmzvmDz6U27GCrinWCqhxix/R8w=");
_c = ViewportImageSliceLoadingIndicator;
ViewportImageSliceLoadingIndicator.propTypes = {
  error: (prop_types__rspack_import_1_default().object),
  element: (prop_types__rspack_import_1_default().object)
};
/* export default */ const __rspack_default_export = (ViewportImageSliceLoadingIndicator);
var _c;
$RefreshReg$(_c, "ViewportImageSliceLoadingIndicator");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var classnames__rspack_import_1 = __webpack_require__("../../../node_modules/classnames/index.js");
/* import */ var classnames__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(classnames__rspack_import_1);
/* import */ var _cornerstonejs_core__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _cornerstonejs_tools__rspack_import_3 = __webpack_require__("../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* import */ var gl_matrix__rspack_import_4 = __webpack_require__("../../../node_modules/gl-matrix/esm/index.js");
/* import */ var _ViewportOrientationMarkers_css__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css");
/* import */ var _ViewportOrientationMarkers_css__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(_ViewportOrientationMarkers_css__rspack_import_5);
/* import */ var _hooks__rspack_import_6 = __webpack_require__("../../../extensions/cornerstone/src/hooks/index.ts");
/* import */ var _utils_viewportDataShape__rspack_import_7 = __webpack_require__("../../../extensions/cornerstone/src/utils/viewportDataShape.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();








const {
  getOrientationStringLPS,
  invertOrientationStringLPS
} = _cornerstonejs_tools__rspack_import_3.utilities.orientation;
function ViewportOrientationMarkers({
  element,
  viewportData,
  imageSliceData,
  viewportId,
  servicesManager,
  orientationMarkers = ['top', 'left']
}) {
  _s();
  const [cameraModifiedTime, setCameraModifiedTime] = (0,react__rspack_import_0.useState)(0);
  const {
    isViewportBackgroundLight: isLight
  } = (0,_hooks__rspack_import_6.useViewportRendering)(viewportId);
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  (0,react__rspack_import_0.useEffect)(() => {
    const cameraModifiedListener = () => setCameraModifiedTime(Date.now());
    element.addEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.CAMERA_MODIFIED, cameraModifiedListener);
    return () => {
      element.removeEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.CAMERA_MODIFIED, cameraModifiedListener);
    };
  }, [element]);
  const markers = (0,react__rspack_import_0.useMemo)(() => {
    if (!viewportData || cameraModifiedTime === 0) {
      return '';
    }
    if (!element || !(0,_cornerstonejs_core__rspack_import_2.getEnabledElement)(element)) {
      console.log(`ViewportOrientationMarkers :: Viewport element not enabled (${viewportId})`);
      return '';
    }
    const ohifViewport = cornerstoneViewportService.getViewportInfo(viewportId);
    if (!ohifViewport) {
      console.log(`ViewportOrientationMarkers :: No viewport (${viewportId})`);
      return '';
    }

    // Use the persisted data shape, not viewportType: a native stack reports
    // PLANAR_NEXT, which would skip this synthetic-IOP default-cosine guard.
    if ((0,_utils_viewportDataShape__rspack_import_7.getViewportDataShapeType)(viewportData) === _cornerstonejs_core__rspack_import_2.Enums.ViewportType.STACK) {
      const imageIndex = imageSliceData.imageIndex;
      const imageId = viewportData.data[0].imageIds?.[imageIndex];

      // Workaround for below TODO stub
      if (!imageId) {
        return false;
      }
      const {
        isDefaultValueSetForRowCosine,
        isDefaultValueSetForColumnCosine
      } = _cornerstonejs_core__rspack_import_2.metaData.get('imagePlaneModule', imageId) || {};
      if (isDefaultValueSetForColumnCosine || isDefaultValueSetForRowCosine) {
        return '';
      }
    }
    const {
      viewport
    } = (0,_cornerstonejs_core__rspack_import_2.getEnabledElement)(element);
    const p00 = viewport.canvasToWorld([0, 0]);
    const p10 = viewport.canvasToWorld([1, 0]);
    const p01 = viewport.canvasToWorld([0, 1]);
    const rowCosines = gl_matrix__rspack_import_4.vec3.sub(gl_matrix__rspack_import_4.vec3.create(), p10, p00);
    const columnCosines = gl_matrix__rspack_import_4.vec3.sub(gl_matrix__rspack_import_4.vec3.create(), p01, p00);
    gl_matrix__rspack_import_4.vec3.normalize(rowCosines, rowCosines);
    gl_matrix__rspack_import_4.vec3.normalize(columnCosines, columnCosines);
    const markers = _getOrientationMarkers(rowCosines, columnCosines);
    return orientationMarkers.map((m, index) => /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
      className: classnames__rspack_import_1_default()('overlay-text', `${m}-mid orientation-marker`, isLight ? 'text-neutral-dark/70' : 'text-neutral-light/70', isLight ? 'shadow-light' : 'shadow-dark', 'text-base', 'leading-5'),
      key: `${m}-mid orientation-marker`
    }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
      className: "orientation-marker-value"
    }, markers[m])));
  }, [viewportData, imageSliceData, cameraModifiedTime, orientationMarkers, element, isLight]);
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "ViewportOrientationMarkers select-none"
  }, markers);
}

/**
 *
 * Computes the orientation labels on a Cornerstone-enabled Viewport element
 * when the viewport settings change (e.g. when a horizontal flip or a rotation occurs)
 *
 * @param {*} rowCosines
 * @param {*} columnCosines
 */
_s(ViewportOrientationMarkers, "CKyC2dhMU8P6ypqtvPdvDeAY1cY=", false, function () {
  return [_hooks__rspack_import_6.useViewportRendering];
});
_c = ViewportOrientationMarkers;
function _getOrientationMarkers(rowCosines, columnCosines) {
  const rowString = getOrientationStringLPS(rowCosines);
  const columnString = getOrientationStringLPS(columnCosines);
  const oppositeRowString = invertOrientationStringLPS(rowString);
  const oppositeColumnString = invertOrientationStringLPS(columnString);
  const markers = {
    top: oppositeColumnString,
    left: oppositeRowString,
    right: rowString,
    bottom: columnString
  };
  return markers;
}
/* export default */ const __rspack_default_export = (ViewportOrientationMarkers);
var _c;
$RefreshReg$(_c, "ViewportOrientationMarkers");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/Viewport/Overlays/ViewportSliceProgressScrollbar/ViewportSliceProgressScrollbar.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var prop_types__rspack_import_1 = __webpack_require__("../../../node_modules/prop-types/index.js");
/* import */ var prop_types__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(prop_types__rspack_import_1);
/* import */ var _cornerstonejs_core__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _utils_getLegacyViewportType__rspack_import_3 = __webpack_require__("../../../extensions/cornerstone/src/utils/getLegacyViewportType.ts");
/* import */ var _ohif_ui_next__rspack_import_4 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _helpers__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/ViewportSliceProgressScrollbar/helpers.ts");
/* import */ var _hooks__rspack_import_6 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/ViewportSliceProgressScrollbar/hooks.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();







function ViewportSliceProgressScrollbar({
  viewportData,
  viewportId,
  element,
  imageSliceData,
  setImageSliceData,
  servicesManager
}) {
  _s();
  const {
    cineService,
    cornerstoneViewportService,
    customizationService,
    viewedDataService
  } = servicesManager.services;
  const showLoadedEndpoints = customizationService.getCustomization('viewportScrollbar.showLoadedEndpoints') !== false;
  const showLoadedFill = customizationService.getCustomization('viewportScrollbar.showLoadedFill') !== false;
  const showViewedFill = customizationService.getCustomization('viewportScrollbar.showViewedFill') !== false;
  const showLoadingPattern = customizationService.getCustomization('viewportScrollbar.showLoadingPattern') !== false;
  const viewedDwellMsRaw = customizationService.getCustomization('viewportScrollbar.viewedDwellMs');
  const loadedBatchIntervalMsRaw = customizationService.getCustomization('viewportScrollbar.loadedBatchIntervalMs');
  const viewedDwellMs = typeof viewedDwellMsRaw === 'number' && viewedDwellMsRaw >= 0 ? viewedDwellMsRaw : 0;
  const loadedBatchIntervalMs = typeof loadedBatchIntervalMsRaw === 'number' && loadedBatchIntervalMsRaw >= 0 ? loadedBatchIntervalMsRaw : 200;
  const {
    numberOfSlices,
    imageIndex
  } = imageSliceData;
  const imageIds = (0,react__rspack_import_0.useMemo)(() => (0,_helpers__rspack_import_5.getViewportImageIds)(viewportData), [viewportData]);
  const imageIdToIndex = (0,react__rspack_import_0.useMemo)(() => {
    const map = new Map();
    for (let i = 0; i < imageIds.length; i++) {
      const imageId = imageIds[i];
      if (imageId) {
        map.set(imageId, i);
      }
    }
    return map;
  }, [imageIds]);
  const isFullMode = (0,_hooks__rspack_import_6.useProgressScrollbarMode)({
    viewportData,
    viewportId,
    element,
    cornerstoneViewportService
  });
  (0,_hooks__rspack_import_6.useViewportSliceSync)({
    viewportData,
    viewportId,
    element,
    cornerstoneViewportService,
    setImageSliceData
  });
  const {
    bytes: loadedBytes,
    version: loadedVersion,
    isFull: isFullyLoaded
  } = (0,_hooks__rspack_import_6.useLoadedSliceBytes)({
    isFullMode,
    numberOfSlices,
    viewportData,
    imageIds,
    imageIdToIndex,
    loadedBatchIntervalMs
  });
  const {
    bytes: viewedBytes,
    version: viewedVersion
  } = (0,_hooks__rspack_import_6.useViewedSliceBytes)({
    isFullMode,
    numberOfSlices,
    imageIndex,
    imageIds,
    imageIdToIndex,
    viewedDwellMs,
    viewedDataService
  });
  const onScrollbarValueChange = targetImageIndex => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!viewport || (0,_utils_getLegacyViewportType__rspack_import_3.isVolume3DViewportType)(viewport)) {
      return;
    }
    const {
      isCineEnabled
    } = cineService.getState();
    if (isCineEnabled) {
      cineService.stopClip(element, {
        viewportId
      });
      cineService.setCine({
        id: viewportId,
        frameRate: undefined,
        isPlaying: false
      });
    }
    _cornerstonejs_core__rspack_import_2.utilities.jumpToSlice(viewport.element, {
      imageIndex: targetImageIndex,
      debounceLoading: true
    });
  };
  const isLoading = isFullMode && showLoadingPattern ? !isFullyLoaded : false;
  if (!numberOfSlices || numberOfSlices <= 1) {
    return null;
  }
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      padding: '8px 5px',
      zIndex: 10
    }
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      width: '11px'
    }
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.SmartScrollbar, {
    className: "absolute inset-0",
    value: imageIndex || 0,
    total: numberOfSlices,
    onValueChange: onScrollbarValueChange,
    isLoading: isLoading,
    enableKeyboardNavigation: false,
    "aria-label": "Image navigation scrollbar",
    indicator: customizationService.getCustomization('viewportScrollbar.indicator')
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.SmartScrollbarTrack, null, isFullMode && showLoadedFill && /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.SmartScrollbarFill, {
    marked: loadedBytes,
    version: loadedVersion,
    className: "bg-neutral/25",
    loadingClassName: "bg-neutral/50"
  }), isFullMode && showViewedFill && /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.SmartScrollbarFill, {
    marked: viewedBytes,
    version: viewedVersion,
    className: "bg-primary/35",
    loadingClassName: "bg-primary/35"
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.SmartScrollbarIndicator, null), isFullMode && showLoadedEndpoints && /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_4.SmartScrollbarEndpoints, {
    marked: loadedBytes,
    version: loadedVersion
  }))));
}
_s(ViewportSliceProgressScrollbar, "zMo2vO5Pgt46xf5M+ZtBZEsxsQM=", false, function () {
  return [_hooks__rspack_import_6.useProgressScrollbarMode, _hooks__rspack_import_6.useViewportSliceSync, _hooks__rspack_import_6.useLoadedSliceBytes, _hooks__rspack_import_6.useViewedSliceBytes];
});
_c = ViewportSliceProgressScrollbar;
ViewportSliceProgressScrollbar.propTypes = {
  viewportData: (prop_types__rspack_import_1_default().object),
  viewportId: (prop_types__rspack_import_1_default().string.isRequired),
  element: prop_types__rspack_import_1_default().instanceOf(Element),
  imageSliceData: (prop_types__rspack_import_1_default().object.isRequired),
  setImageSliceData: (prop_types__rspack_import_1_default().func.isRequired),
  servicesManager: (prop_types__rspack_import_1_default().object.isRequired)
};
/* export default */ const __rspack_default_export = (ViewportSliceProgressScrollbar);
var _c;
$RefreshReg$(_c, "ViewportSliceProgressScrollbar");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/Viewport/Overlays/ViewportSliceProgressScrollbar/helpers.ts"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getImageIdFromCacheEvent: () => (getImageIdFromCacheEvent),
  getImageIndexFromEvent: () => (getImageIndexFromEvent),
  getViewportImageIds: () => (getViewportImageIds),
  isProgressFullMode: () => (isProgressFullMode)
});
/* import */ var _utils_getLegacyViewportType__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone/src/utils/getLegacyViewportType.ts");
/* import */ var _services_ViewportService_adapter__rspack_import_1 = __webpack_require__("../../../extensions/cornerstone/src/services/ViewportService/adapter/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");


function getImageIndexFromEvent(event) {
  const {
    imageIndex,
    newImageIdIndex = imageIndex,
    imageIdIndex
  } = event.detail;
  return newImageIdIndex ?? imageIdIndex;
}
function getViewportImageIds(viewportData) {
  if (!viewportData?.data?.length) {
    return [];
  }
  const firstData = viewportData.data[0];
  const volumeImageIds = firstData.volume?.imageIds;
  const datumImageIds = firstData.imageIds;
  return volumeImageIds || datumImageIds || [];
}
function isProgressFullMode(viewportData, viewport) {
  if (!viewportData || !viewport || (0,_utils_getLegacyViewportType__rspack_import_0.isVolume3DViewportType)(viewport)) {
    return false;
  }

  // A stack renders the full progress UI; an acquisition-plane volume is the
  // volume-mode equivalent. The adapter classifies both lanes (legacy by
  // viewport type / isInAcquisitionPlane; native by content mode + view-state
  // orientation, since PLANAR_NEXT collapses the runtime type).
  const adapter = (0,_services_ViewportService_adapter__rspack_import_1.getViewportAdapter)(viewport);
  const shape = adapter.getShape();
  if (shape === 'stack') {
    return true;
  }
  if (shape === 'volume') {
    return adapter.isInAcquisitionPlane();
  }
  return false;
}
function getImageIdFromCacheEvent(event) {
  const detail = event?.detail;
  return detail?.imageId || detail?.image?.imageId || detail?.cachedImage?.imageId;
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/Viewport/Overlays/ViewportSliceProgressScrollbar/hooks.ts"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLoadedSliceBytes: () => (useLoadedSliceBytes),
  useProgressScrollbarMode: () => (useProgressScrollbarMode),
  useViewedSliceBytes: () => (useViewedSliceBytes),
  useViewportSliceSync: () => (useViewportSliceSync)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _cornerstonejs_core__rspack_import_1 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _ohif_ui_next__rspack_import_2 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _utils_getLegacyViewportType__rspack_import_3 = __webpack_require__("../../../extensions/cornerstone/src/utils/getLegacyViewportType.ts");
/* import */ var _utils_viewportDataShape__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone/src/utils/viewportDataShape.ts");
/* import */ var _helpers__rspack_import_5 = __webpack_require__("../../../extensions/cornerstone/src/Viewport/Overlays/ViewportSliceProgressScrollbar/helpers.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$(),
  _s2 = $RefreshSig$(),
  _s3 = $RefreshSig$(),
  _s4 = $RefreshSig$();






function useProgressScrollbarMode({
  viewportData,
  viewportId,
  element,
  cornerstoneViewportService
}) {
  _s();
  const [isFullMode, setIsFullMode] = (0,react__rspack_import_0.useState)(false);
  const lastViewPlaneNormalRef = (0,react__rspack_import_0.useRef)(null);

  /**
   * Tracks whether this viewport should render full progress UI (stack or acquisition-plane
   * orthographic volume) versus minimal UI. We compute once on setup and recompute on each
   * CAMERA_MODIFIED event so stack->MPR transitions and acquisition-plane changes are reflected
   * immediately.
   */
  (0,react__rspack_import_0.useEffect)(() => {
    if (!viewportData) {
      return;
    }
    const updateMode = () => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      const viewportImageData = viewport?.getImageData?.();
      const nextViewPlaneNormal = viewport?.getCamera?.()?.viewPlaneNormal;
      // Do not update the lastViewPlaneNormalRef until we have a valid viewportImageData.
      // Without viewportImageData, the viewport is not fully initialized and the isAcquisitionPlane
      // check will not be accurate.
      if (viewportImageData && nextViewPlaneNormal) {
        lastViewPlaneNormalRef.current = [...nextViewPlaneNormal];
      }
      const nextMode = (0,_helpers__rspack_import_5.isProgressFullMode)(viewportData, viewport);
      setIsFullMode(prevMode => prevMode === nextMode ? prevMode : nextMode);
    };
    updateMode();
    const onCameraModified = () => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      const nextViewPlaneNormal = viewport?.getCamera?.()?.viewPlaneNormal;
      const previousViewPlaneNormal = lastViewPlaneNormalRef.current;

      // Ignore camera updates that keep the same orientation (pan/zoom/scroll).
      if (nextViewPlaneNormal && previousViewPlaneNormal) {
        if (_cornerstonejs_core__rspack_import_1.utilities.isEqual(nextViewPlaneNormal, previousViewPlaneNormal)) {
          return;
        }
      }
      updateMode();
    };
    element.addEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.CAMERA_MODIFIED, onCameraModified);
    return () => {
      element.removeEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.CAMERA_MODIFIED, onCameraModified);
    };
  }, [viewportData, viewportId, cornerstoneViewportService, element]);
  return isFullMode;
}
_s(useProgressScrollbarMode, "XisvLMeuZvhjuhcmW6IEcnPJyGM=");
function useViewportSliceSync({
  viewportData,
  viewportId,
  element,
  cornerstoneViewportService,
  setImageSliceData
}) {
  _s2();
  /**
   * Keeps shared slice state in sync: first initialize from the live viewport snapshot, then
   * subscribe to navigation/render events for incremental updates while users scroll.
   */
  (0,react__rspack_import_0.useEffect)(() => {
    if (!viewportData) {
      return;
    }

    // Last values we pushed, so re-seeding on camera changes does not churn React
    // state on pure pan/zoom (which keep the slice geometry unchanged).
    const lastSlice = {
      imageIndex: -1,
      numberOfSlices: -1
    };
    const pushSliceData = (imageIndex, numberOfSlices) => {
      if (imageIndex === lastSlice.imageIndex && numberOfSlices === lastSlice.numberOfSlices) {
        return;
      }
      lastSlice.imageIndex = imageIndex;
      lastSlice.numberOfSlices = numberOfSlices;
      setImageSliceData({
        imageIndex,
        numberOfSlices
      });
    };

    // Seeds the shared slice state from the live viewport. Re-run on the initial
    // effect and on camera/orientation changes (below).
    const syncFromViewport = () => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      if (!viewport || (0,_utils_getLegacyViewportType__rspack_import_3.isVolume3DViewportType)(viewport)) {
        return;
      }
      try {
        const currentImageIndex = viewport.getCurrentImageIdIndex();
        const currentNumberOfSlices = (0,_utils_viewportDataShape__rspack_import_4.getViewportSliceCount)(viewportData, viewport);
        pushSliceData(currentImageIndex, currentNumberOfSlices);
      } catch (error) {
        console.warn(error);
      }
    };
    syncFromViewport();

    // A post-mount camera carry (e.g. the layout-selector MPR protocol restoring
    // the prior stack slice onto the freshly-mounted volume viewport) moves the
    // camera and fires its slice events synchronously during the mount — before
    // these listeners attach and around the initial seed above — so the scrollbar
    // can latch the mount-time index instead of the carried slice. Re-seed once on
    // the next frame, after the mount+carry settles; pushSliceData makes it a
    // no-op when nothing changed (no churn/flicker).
    const reseedRaf = requestAnimationFrame(syncFromViewport);
    const eventId = (0,_utils_viewportDataShape__rspack_import_4.getSliceEventName)(viewportData);
    const updateIndex = event => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      if (!viewport || (0,_utils_getLegacyViewportType__rspack_import_3.isVolume3DViewportType)(viewport)) {
        return;
      }
      const nextImageIndex = (0,_helpers__rspack_import_5.getImageIndexFromEvent)(event);
      if (nextImageIndex == null) {
        return;
      }
      const nextNumberOfSlices = viewport.getNumberOfSlices();
      pushSliceData(nextImageIndex, nextNumberOfSlices);
    };
    element.addEventListener(eventId, updateIndex);
    // Native ("next") viewports keep the same viewportData across a stack->volume
    // transition or an orientation change, so this effect does not re-run and the
    // slice-navigation event above may not fire until the first scroll, leaving the
    // scrollbar unseeded (or stale, with a now-wrong slice count). CAMERA_MODIFIED
    // fires on those orientation/geometry changes, so re-seed from the viewport
    // then; the pushSliceData guard makes pan/zoom (same geometry) a no-op.
    element.addEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.CAMERA_MODIFIED, syncFromViewport);
    return () => {
      cancelAnimationFrame(reseedRaf);
      element.removeEventListener(eventId, updateIndex);
      element.removeEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.CAMERA_MODIFIED, syncFromViewport);
    };
  }, [viewportData, element, viewportId, cornerstoneViewportService, setImageSliceData]);
}
_s2(useViewportSliceSync, "OD7bBpZva5O2jO+Puf00hKivP7c=");
function useLoadedSliceBytes({
  isFullMode,
  numberOfSlices,
  viewportData,
  imageIds,
  imageIdToIndex,
  loadedBatchIntervalMs
}) {
  _s3();
  const loadedState = (0,_ohif_ui_next__rspack_import_2.useByteArray)(numberOfSlices || 0, loadedBatchIntervalMs);
  const {
    resetWith: resetLoaded,
    setByte: setLoadedByte,
    clearByte: clearLoadedByte
  } = loadedState;

  /**
   * Keeps the loaded byte array in sync with Cornerstone cache: seed from cache whenever stack /
   * mode / slice count changes, then subscribe so cache add/remove updates stay incremental.
   * Seeding runs immediately before registering listeners in the same effect.
   */
  (0,react__rspack_import_0.useEffect)(() => {
    if (isFullMode && numberOfSlices) {
      resetLoaded(bytes => {
        for (let i = 0; i < bytes.length; i++) {
          const imageId = imageIds[i];
          if (imageId && _cornerstonejs_core__rspack_import_1.cache.isLoaded(imageId)) {
            bytes[i] = 1;
          }
        }
      });
    }
    if (!isFullMode || !viewportData) {
      return;
    }
    const markLoaded = event => {
      const imageId = (0,_helpers__rspack_import_5.getImageIdFromCacheEvent)(event);
      if (!imageId) {
        return;
      }
      const index = imageIdToIndex.get(imageId);
      if (index !== undefined) {
        setLoadedByte(index);
      }
    };
    const markRemoved = event => {
      const imageId = (0,_helpers__rspack_import_5.getImageIdFromCacheEvent)(event);
      if (!imageId) {
        return;
      }
      const index = imageIdToIndex.get(imageId);
      if (index !== undefined) {
        clearLoadedByte(index);
      }
    };
    _cornerstonejs_core__rspack_import_1.eventTarget.addEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.IMAGE_CACHE_IMAGE_ADDED, markLoaded);
    _cornerstonejs_core__rspack_import_1.eventTarget.addEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.IMAGE_CACHE_IMAGE_REMOVED, markRemoved);
    return () => {
      _cornerstonejs_core__rspack_import_1.eventTarget.removeEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.IMAGE_CACHE_IMAGE_ADDED, markLoaded);
      _cornerstonejs_core__rspack_import_1.eventTarget.removeEventListener(_cornerstonejs_core__rspack_import_1.Enums.Events.IMAGE_CACHE_IMAGE_REMOVED, markRemoved);
    };
  }, [imageIds, isFullMode, numberOfSlices, viewportData, imageIdToIndex, resetLoaded, setLoadedByte, clearLoadedByte]);
  return loadedState;
}
_s3(useLoadedSliceBytes, "jS25yjuqdeiMCD9Yq1QD96hY9kQ=", false, function () {
  return [_ohif_ui_next__rspack_import_2.useByteArray];
});
function useViewedSliceBytes({
  isFullMode,
  numberOfSlices,
  imageIndex,
  imageIds,
  imageIdToIndex,
  viewedDwellMs,
  viewedDataService
}) {
  _s4();
  const viewedState = (0,_ohif_ui_next__rspack_import_2.useByteArray)(numberOfSlices || 0);
  const {
    resetWith: resetViewed,
    setByte: setViewedByte
  } = viewedState;

  /**
   * Keeps the viewed byte array in sync with the global viewed-data store: seed from the store
   * whenever stack / mode / slice count changes, then subscribe so `markDataViewed` updates stay
   * incremental. Seeding runs immediately before registering the listener in the same effect.
   */
  (0,react__rspack_import_0.useEffect)(() => {
    if (isFullMode && numberOfSlices) {
      resetViewed(bytes => {
        for (let i = 0; i < bytes.length; i++) {
          const imageId = imageIds[i];
          if (imageId && viewedDataService?.isDataViewed(imageId)) {
            bytes[i] = 1;
          }
        }
      });
    }
    if (!viewedDataService) {
      return;
    }
    const subscription = viewedDataService.subscribeViewedDataChanges(({
      viewedDataId,
      viewedDataCleared
    }) => {
      if (!isFullMode || !numberOfSlices) {
        return;
      }
      if (viewedDataCleared) {
        resetViewed(bytes => {
          bytes.fill(0);
        });
        return;
      }
      const index = imageIdToIndex.get(viewedDataId);
      if (index !== undefined) {
        setViewedByte(index);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [imageIds, isFullMode, numberOfSlices, imageIdToIndex, resetViewed, setViewedByte, viewedDataService]);

  /**
   * Marks slices as viewed in full mode. With `viewedDwellMs === 0`, marking is immediate on
   * index change; otherwise a dwell timer is used and cleaned up on subsequent changes/unmount.
   */
  (0,react__rspack_import_0.useEffect)(() => {
    if (!isFullMode || !numberOfSlices) {
      return;
    }
    const markViewed = targetIndex => {
      setViewedByte(targetIndex);
      const imageId = imageIds[targetIndex];
      if (imageId) {
        viewedDataService?.markDataViewed(imageId);
      }
    };
    if (viewedDwellMs === 0) {
      markViewed(imageIndex || 0);
      return;
    }
    const timerId = window.setTimeout(() => {
      markViewed(imageIndex || 0);
    }, viewedDwellMs);
    return () => {
      window.clearTimeout(timerId);
    };
  }, [isFullMode, numberOfSlices, imageIndex, imageIds, setViewedByte, viewedDwellMs, viewedDataService]);
  return viewedState;
}
_s4(useViewedSliceBytes, "ZP3sxzlY2c9jE83eUDOceWiqgGs=", false, function () {
  return [_ohif_ui_next__rspack_import_2.useByteArray];
});
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/Viewport/Overlays/utils.ts"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatDICOMDate: () => (/* reexport safe */ _ohif_ui_next__rspack_import_2.formatDICOMDate),
  formatDICOMTime: () => (formatDICOMTime),
  formatNumberPrecision: () => (formatNumberPrecision),
  getCompression: () => (getCompression),
  isValidNumber: () => (isValidNumber)
});
/* import */ var moment__rspack_import_0 = __webpack_require__("../../../node_modules/moment/moment.js");
/* import */ var moment__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(moment__rspack_import_0);
/* import */ var _cornerstonejs_core__rspack_import_1 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _ohif_ui_next__rspack_import_2 = __webpack_require__("../../ui-next/src/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");




/**
 * Checks if value is valid.
 *
 * @param {number} value
 * @returns {boolean} is valid.
 */
function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Formats number precision.
 *
 * @param {number} number
 * @param {number} precision
 * @returns {number} formatted number.
 */
function formatNumberPrecision(number, precision = 0) {
  if (number !== null) {
    return parseFloat(number).toFixed(precision);
  }
}

/**
 *    DICOM Time is stored as HHmmss.SSS, where:
 *      HH 24 hour time:
 *        m mm        0..59   Minutes
 *        s ss        0..59   Seconds
 *        S SS SSS    0..999  Fractional seconds
 *
 *        Goal: '24:12:12'
 *
 * @param {*} time
 * @param {string} strFormat
 * @returns {string} formatted name.
 */
function formatDICOMTime(time, strFormat = 'HH:mm:ss') {
  return moment__rspack_import_0_default()(time, 'HH:mm:ss').format(strFormat);
}

/**
 * Gets compression type
 *
 * @param {number} imageId
 * @returns {string} compression type.
 */
function getCompression(imageId) {
  const generalImageModule = _cornerstonejs_core__rspack_import_1.metaData.get('generalImageModule', imageId) || {};
  const {
    lossyImageCompression,
    lossyImageCompressionRatio,
    lossyImageCompressionMethod
  } = generalImageModule;
  if (lossyImageCompression === '01' && lossyImageCompressionRatio !== '') {
    const compressionMethod = lossyImageCompressionMethod || 'Lossy: ';
    const compressionRatio = formatNumberPrecision(lossyImageCompressionRatio, 2);
    return compressionMethod + compressionRatio + ' : 1';
  }
  return 'Lossless / Uncompressed';
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/components/CinePlayer/CinePlayer.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_ui_next__rspack_import_1 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _cornerstonejs_core__rspack_import_2 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* import */ var _state__rspack_import_3 = __webpack_require__("./state/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$(),
  _s2 = $RefreshSig$();




function WrappedCinePlayer({
  enabledVPElement,
  viewportId,
  servicesManager
}) {
  _s();
  const {
    customizationService,
    displaySetService,
    viewportGridService
  } = servicesManager.services;
  const [{
    isCineEnabled,
    cines
  }, cineService] = (0,_ohif_ui_next__rspack_import_1.useCine)();
  const [newStackFrameRate, setNewStackFrameRate] = (0,react__rspack_import_0.useState)(24);
  const [dynamicInfo, setDynamicInfo] = (0,react__rspack_import_0.useState)(null);
  const [appConfig] = (0,_state__rspack_import_3.useAppConfig)();
  const isMountedRef = (0,react__rspack_import_0.useRef)(null);
  const cineHandler = () => {
    if (!cines?.[viewportId] || !enabledVPElement) {
      return;
    }
    const {
      isPlaying = false,
      frameRate = 24
    } = cines[viewportId];
    const validFrameRate = Math.max(frameRate, 1);
    return isPlaying ? cineService.playClip(enabledVPElement, {
      framesPerSecond: validFrameRate,
      viewportId
    }) : cineService.stopClip(enabledVPElement);
  };
  const newDisplaySetHandler = (0,react__rspack_import_0.useCallback)(() => {
    if (!enabledVPElement || !isCineEnabled) {
      return;
    }
    const {
      viewports
    } = viewportGridService.getState();
    const {
      displaySetInstanceUIDs
    } = viewports.get(viewportId);
    let frameRate = 24;
    let isPlaying = cines[viewportId]?.isPlaying || false;
    displaySetInstanceUIDs.forEach(displaySetInstanceUID => {
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      if (displaySet.FrameRate) {
        // displaySet.FrameRate corresponds to DICOM tag (0018,1063) which is defined as the the frame time in milliseconds
        // So a bit of math to get the actual frame rate.
        frameRate = Math.round(1000 / displaySet.FrameRate);
        isPlaying ||= !!appConfig.autoPlayCine;
      }

      // check if the displaySet is dynamic and set the dynamic info
      if (displaySet.isDynamicVolume) {
        const {
          dynamicVolumeInfo
        } = displaySet;
        const numDimensionGroups = dynamicVolumeInfo.timePoints.length;
        const label = dynamicVolumeInfo.splittingTag;
        const dimensionGroupNumber = dynamicVolumeInfo.dimensionGroupNumber || 1;
        setDynamicInfo({
          volumeId: displaySet.displaySetInstanceUID,
          dimensionGroupNumber,
          numDimensionGroups,
          label
        });
      } else {
        setDynamicInfo(null);
      }
    });
    if (isPlaying) {
      cineService.setIsCineEnabled(isPlaying);
    }
    cineService.setCine({
      id: viewportId,
      isPlaying,
      frameRate
    });
    setNewStackFrameRate(frameRate);
  }, [displaySetService, viewportId, viewportGridService, cines, isCineEnabled, enabledVPElement]);
  (0,react__rspack_import_0.useEffect)(() => {
    isMountedRef.current = true;
    newDisplaySetHandler();
    return () => {
      isMountedRef.current = false;
    };
  }, [isCineEnabled, newDisplaySetHandler]);
  (0,react__rspack_import_0.useEffect)(() => {
    if (!isCineEnabled) {
      return;
    }
    cineHandler();
  }, [isCineEnabled, cineHandler, enabledVPElement]);

  /**
   * Use effect for handling new display set
   */
  (0,react__rspack_import_0.useEffect)(() => {
    if (!enabledVPElement) {
      return;
    }
    enabledVPElement.addEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.VIEWPORT_NEW_IMAGE_SET, newDisplaySetHandler);
    // this doesn't makes sense that we are listening to this event on viewport element
    enabledVPElement.addEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, newDisplaySetHandler);
    return () => {
      cineService.setCine({
        id: viewportId,
        isPlaying: false
      });
      enabledVPElement.removeEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.VIEWPORT_NEW_IMAGE_SET, newDisplaySetHandler);
      enabledVPElement.removeEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, newDisplaySetHandler);
    };
  }, [enabledVPElement, newDisplaySetHandler, viewportId]);
  (0,react__rspack_import_0.useEffect)(() => {
    if (!cines || !cines[viewportId] || !enabledVPElement || !isMountedRef.current) {
      return;
    }
    cineHandler();
    return () => {
      cineService.stopClip(enabledVPElement, {
        viewportId
      });
    };
  }, [cines, viewportId, cineService, enabledVPElement, cineHandler]);
  if (!isCineEnabled) {
    return null;
  }
  const cine = cines[viewportId];
  const isPlaying = cine?.isPlaying || false;
  return /*#__PURE__*/react__rspack_import_0_default().createElement(RenderCinePlayer, {
    viewportId: viewportId,
    cineService: cineService,
    newStackFrameRate: newStackFrameRate,
    isPlaying: isPlaying,
    dynamicInfo: dynamicInfo,
    customizationService: customizationService
  });
}
_s(WrappedCinePlayer, "KDnWruUt0OxNbkaov1IuXj9K31k=", false, function () {
  return [_ohif_ui_next__rspack_import_1.useCine, _state__rspack_import_3.useAppConfig];
});
_c = WrappedCinePlayer;
function RenderCinePlayer({
  viewportId,
  cineService,
  newStackFrameRate,
  isPlaying,
  dynamicInfo: dynamicInfoProp,
  customizationService
}) {
  _s2();
  const CinePlayerComponent = customizationService.getCustomization('cinePlayer');
  const [dynamicInfo, setDynamicInfo] = (0,react__rspack_import_0.useState)(dynamicInfoProp);
  (0,react__rspack_import_0.useEffect)(() => {
    setDynamicInfo(dynamicInfoProp);
  }, [dynamicInfoProp]);

  /**
   * Use effect for handling 4D time index changed
   */
  (0,react__rspack_import_0.useEffect)(() => {
    if (!dynamicInfo) {
      return;
    }
    const handleDimensionGroupChange = evt => {
      const {
        volumeId,
        dimensionGroupNumber,
        numDimensionGroups,
        splittingTag
      } = evt.detail;
      setDynamicInfo({
        volumeId,
        dimensionGroupNumber,
        numDimensionGroups,
        label: splittingTag
      });
    };
    _cornerstonejs_core__rspack_import_2.eventTarget.addEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.DYNAMIC_VOLUME_DIMENSION_GROUP_CHANGED, handleDimensionGroupChange);
    return () => {
      _cornerstonejs_core__rspack_import_2.eventTarget.removeEventListener(_cornerstonejs_core__rspack_import_2.Enums.Events.DYNAMIC_VOLUME_DIMENSION_GROUP_CHANGED, handleDimensionGroupChange);
    };
  }, [dynamicInfo]);
  (0,react__rspack_import_0.useEffect)(() => {
    if (!dynamicInfo) {
      return;
    }
    const {
      volumeId,
      dimensionGroupNumber,
      numDimensionGroups,
      splittingTag
    } = dynamicInfo || {};
    const volume = _cornerstonejs_core__rspack_import_2.cache.getVolume(volumeId, true);
    volume.dimensionGroupNumber = dimensionGroupNumber;
    setDynamicInfo({
      volumeId,
      dimensionGroupNumber,
      numDimensionGroups,
      label: splittingTag
    });
  }, []);
  const updateDynamicInfo = (0,react__rspack_import_0.useCallback)(props => {
    const {
      volumeId,
      dimensionGroupNumber
    } = props;
    const volume = _cornerstonejs_core__rspack_import_2.cache.getVolume(volumeId, true);
    volume.dimensionGroupNumber = dimensionGroupNumber;
  }, []);
  return /*#__PURE__*/react__rspack_import_0_default().createElement(CinePlayerComponent, {
    className: "absolute left-1/2 bottom-3 -translate-x-1/2",
    frameRate: newStackFrameRate,
    isPlaying: isPlaying,
    onClose: () => {
      // also stop the clip
      cineService.setCine({
        id: viewportId,
        isPlaying: false
      });
      cineService.setIsCineEnabled(false);
      cineService.setViewportCineClosed(viewportId);
    },
    onPlayPauseChange: isPlaying => {
      cineService.setCine({
        id: viewportId,
        isPlaying
      });
    },
    onFrameRateChange: frameRate => cineService.setCine({
      id: viewportId,
      frameRate
    }),
    dynamicInfo: dynamicInfo,
    updateDynamicInfo: updateDynamicInfo
  });
}
_s2(RenderCinePlayer, "JKVqxBuKJePknzpHlw0z+0z0gWQ=");
_c2 = RenderCinePlayer;
/* export default */ const __rspack_default_export = (WrappedCinePlayer);
var _c, _c2;
$RefreshReg$(_c, "WrappedCinePlayer");
$RefreshReg$(_c2, "RenderCinePlayer");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/components/CinePlayer/index.ts"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var _CinePlayer__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone/src/components/CinePlayer/CinePlayer.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

/* export default */ const __rspack_default_export = (_CinePlayer__rspack_import_0["default"]);
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/components/OHIFViewportActionCorners.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_ui_next__rspack_import_1 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _ohif_extension_default_src_Toolbar_Toolbar__rspack_import_2 = __webpack_require__("../../../extensions/default/src/Toolbar/Toolbar.tsx");
/* import */ var _ohif_core_src_services_ToolBarService_ToolbarService__rspack_import_3 = __webpack_require__("../../core/src/services/ToolBarService/ToolbarService.ts");
/* import */ var _hooks__rspack_import_4 = __webpack_require__("../../../extensions/cornerstone/src/hooks/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();





function OHIFViewportActionCornersComponent({
  viewportId
}) {
  _s();
  // Use the viewport hover hook to track if viewport is hovered or active
  const {
    isHovered,
    isActive
  } = (0,_hooks__rspack_import_4.useViewportHover)(viewportId);
  const shouldShowCorners = isHovered || isActive;
  if (!shouldShowCorners) {
    return null;
  }
  return /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.IconPresentationProvider, {
    size: "medium",
    IconContainer: _ohif_ui_next__rspack_import_1.ToolButton,
    containerProps: {
      size: 'tiny',
      className: 'font-normal text-primary hover:bg-primary/25'
    }
  }, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.ViewportActionCorners.Container, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.ViewportActionCorners.TopLeft, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default_src_Toolbar_Toolbar__rspack_import_2.Toolbar, {
    buttonSection: "viewportActionMenu.topLeft",
    viewportId: viewportId,
    location: _ohif_core_src_services_ToolBarService_ToolbarService__rspack_import_3.ButtonLocation.TopLeft
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.ViewportActionCorners.TopMiddle, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default_src_Toolbar_Toolbar__rspack_import_2.Toolbar, {
    buttonSection: "viewportActionMenu.topMiddle",
    viewportId: viewportId,
    location: _ohif_core_src_services_ToolBarService_ToolbarService__rspack_import_3.ButtonLocation.TopMiddle
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.ViewportActionCorners.TopRight, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default_src_Toolbar_Toolbar__rspack_import_2.Toolbar, {
    buttonSection: "viewportActionMenu.topRight",
    viewportId: viewportId,
    location: _ohif_core_src_services_ToolBarService_ToolbarService__rspack_import_3.ButtonLocation.TopRight
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.ViewportActionCorners.LeftMiddle, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default_src_Toolbar_Toolbar__rspack_import_2.Toolbar, {
    buttonSection: "viewportActionMenu.leftMiddle",
    viewportId: viewportId,
    location: _ohif_core_src_services_ToolBarService_ToolbarService__rspack_import_3.ButtonLocation.LeftMiddle
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.ViewportActionCorners.RightMiddle, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default_src_Toolbar_Toolbar__rspack_import_2.Toolbar, {
    buttonSection: "viewportActionMenu.rightMiddle",
    viewportId: viewportId,
    location: _ohif_core_src_services_ToolBarService_ToolbarService__rspack_import_3.ButtonLocation.RightMiddle
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.ViewportActionCorners.BottomLeft, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default_src_Toolbar_Toolbar__rspack_import_2.Toolbar, {
    buttonSection: "viewportActionMenu.bottomLeft",
    viewportId: viewportId,
    location: _ohif_core_src_services_ToolBarService_ToolbarService__rspack_import_3.ButtonLocation.BottomLeft
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.ViewportActionCorners.BottomMiddle, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default_src_Toolbar_Toolbar__rspack_import_2.Toolbar, {
    buttonSection: "viewportActionMenu.bottomMiddle",
    viewportId: viewportId,
    location: _ohif_core_src_services_ToolBarService_ToolbarService__rspack_import_3.ButtonLocation.BottomMiddle
  })), /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_ui_next__rspack_import_1.ViewportActionCorners.BottomRight, null, /*#__PURE__*/react__rspack_import_0_default().createElement(_ohif_extension_default_src_Toolbar_Toolbar__rspack_import_2.Toolbar, {
    buttonSection: "viewportActionMenu.bottomRight",
    viewportId: viewportId,
    location: _ohif_core_src_services_ToolBarService_ToolbarService__rspack_import_3.ButtonLocation.BottomRight
  }))));
}
_s(OHIFViewportActionCornersComponent, "eKWYW/pSr/1zijALe7WQmHOnuRU=", false, function () {
  return [_hooks__rspack_import_4.useViewportHover];
});
_c = OHIFViewportActionCornersComponent;
const OHIFViewportActionCorners = /*#__PURE__*/(0,react__rspack_import_0.memo)(OHIFViewportActionCornersComponent);
_c2 = OHIFViewportActionCorners;
/* export default */ const __rspack_default_export = (OHIFViewportActionCorners);
var _c, _c2;
$RefreshReg$(_c, "OHIFViewportActionCornersComponent");
$RefreshReg$(_c2, "OHIFViewportActionCorners");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/utils/ActiveViewportBehavior.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();

const ActiveViewportBehavior = /*#__PURE__*/_s(/*#__PURE__*/(0,react__rspack_import_0.memo)(_c = _s(({
  servicesManager,
  viewportId
}) => {
  _s();
  const {
    displaySetService,
    cineService,
    viewportGridService,
    customizationService,
    cornerstoneViewportService
  } = servicesManager.services;
  const [activeViewportId, setActiveViewportId] = (0,react__rspack_import_0.useState)(viewportId);
  const handleCineEnable = (0,react__rspack_import_0.useCallback)(() => {
    if (cineService.isViewportCineClosed(activeViewportId)) {
      return;
    }
    const displaySetInstanceUIDs = viewportGridService.getDisplaySetsUIDsForViewport(activeViewportId);
    if (!displaySetInstanceUIDs) {
      return;
    }
    const displaySets = displaySetInstanceUIDs.map(uid => displaySetService.getDisplaySetByUID(uid));
    if (!displaySets.length) {
      return;
    }
    const modalities = displaySets.map(displaySet => displaySet?.Modality);
    const isDynamicVolume = displaySets.some(displaySet => displaySet?.isDynamicVolume);
    const sourceModalities = customizationService.getCustomization('autoCineModalities');
    const requiresCine = modalities.some(modality => sourceModalities.includes(modality));
    if ((requiresCine || isDynamicVolume) && !cineService.getState().isCineEnabled) {
      cineService.setIsCineEnabled(true);
    }
  }, [activeViewportId, cineService, viewportGridService, displaySetService, customizationService]);
  (0,react__rspack_import_0.useEffect)(() => {
    const subscription = viewportGridService.subscribe(viewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED, ({
      viewportId
    }) => setActiveViewportId(viewportId));
    return () => subscription.unsubscribe();
  }, [viewportId, viewportGridService]);
  (0,react__rspack_import_0.useEffect)(() => {
    const subscription = cornerstoneViewportService.subscribe(cornerstoneViewportService.EVENTS.VIEWPORT_DATA_CHANGED, () => {
      const activeViewportId = viewportGridService.getActiveViewportId();
      setActiveViewportId(activeViewportId);
      handleCineEnable();
    });
    return () => subscription.unsubscribe();
  }, [viewportId, cornerstoneViewportService, viewportGridService, handleCineEnable]);
  (0,react__rspack_import_0.useEffect)(() => {
    handleCineEnable();
  }, [handleCineEnable]);
  return null;
}, "BpCofdEZ7S5rfxI0xcVkVPdo4S4="), arePropsEqual), "BpCofdEZ7S5rfxI0xcVkVPdo4S4=");
_c2 = ActiveViewportBehavior;
ActiveViewportBehavior.displayName = 'ActiveViewportBehavior';
function arePropsEqual(prevProps, nextProps) {
  return prevProps.viewportId === nextProps.viewportId && prevProps.servicesManager === nextProps.servicesManager;
}
/* export default */ const __rspack_default_export = (ActiveViewportBehavior);
var _c, _c2;
$RefreshReg$(_c, "ActiveViewportBehavior$memo");
$RefreshReg$(_c2, "ActiveViewportBehavior");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/utils/presentations/getViewportPresentations.ts"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getViewportPresentations: () => (getViewportPresentations)
});
/* import */ var _stores_usePositionPresentationStore__rspack_import_0 = __webpack_require__("../../../extensions/cornerstone/src/stores/usePositionPresentationStore.ts");
/* import */ var _stores_useLutPresentationStore__rspack_import_1 = __webpack_require__("../../../extensions/cornerstone/src/stores/useLutPresentationStore.ts");
/* import */ var _stores_useSegmentationPresentationStore__rspack_import_2 = __webpack_require__("../../../extensions/cornerstone/src/stores/useSegmentationPresentationStore.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");



function getViewportPresentations(viewportId, viewportOptions) {
  const {
    lutPresentationStore
  } = _stores_useLutPresentationStore__rspack_import_1.useLutPresentationStore.getState();
  const {
    positionPresentationStore
  } = _stores_usePositionPresentationStore__rspack_import_0.usePositionPresentationStore.getState();
  const {
    segmentationPresentationStore
  } = _stores_useSegmentationPresentationStore__rspack_import_2.useSegmentationPresentationStore.getState();

  // NOTE: this is the new viewport state, we should not get the presentationIds from the cornerstoneViewportService
  // since that has the old viewport state
  const {
    presentationIds
  } = viewportOptions;
  if (!presentationIds) {
    return {
      positionPresentation: null,
      lutPresentation: null,
      segmentationPresentation: null
    };
  }
  const {
    lutPresentationId,
    positionPresentationId,
    segmentationPresentationId
  } = presentationIds;
  const positionPresentation = positionPresentationStore[positionPresentationId];
  const lutPresentation = lutPresentationStore[lutPresentationId];
  const segmentationPresentation = segmentationPresentationStore[segmentationPresentationId];
  return {
    positionPresentation,
    lutPresentation,
    segmentationPresentation
  };
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/cornerstone/src/utils/viewportDataShape.ts"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getPrimaryViewportDatum: () => (getPrimaryViewportDatum),
  getSliceEventName: () => (getSliceEventName),
  getViewportDataShapeType: () => (getViewportDataShapeType),
  getViewportSliceCount: () => (getViewportSliceCount),
  isVolumeViewportData: () => (isVolumeViewportData)
});
/* import */ var _cornerstonejs_core__rspack_import_0 = __webpack_require__("../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("../../../node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");


/**
 * Pre-mount classification of a viewport's bound data (viewportData from
 * CornerstoneCacheService), for code that runs before — or independently of —
 * a live viewport instance (overlays, scrollbars). Native ("next") viewports
 * collapse stack/volume onto a single PLANAR_NEXT viewportType, so these
 * helpers classify by the persisted dataShapeType and the data shape itself
 * (imageIds = stack, volume/volumeId = volume) instead of the runtime type.
 *
 * For classification of a LIVE viewport instance, use
 * `getViewportAdapter(viewport).getShape()` instead.
 */

/** The primary (non-overlay) datum of a viewportData. */
function getPrimaryViewportDatum(viewportData) {
  return Array.isArray(viewportData?.data) ? viewportData.data[0] : viewportData?.data;
}

/** True when the primary datum is volume-shaped (volume/volumeId present). */
function isVolumeViewportData(viewportData) {
  const firstData = getPrimaryViewportDatum(viewportData);
  return !!(firstData && (firstData.volume || firstData.volumeId));
}

/**
 * The stack/volume shape a viewportData was built for, transparent across the
 * native type collapse: the persisted dataShapeType when present (set by
 * CornerstoneCacheService on the native path), else the legacy viewportType.
 */
function getViewportDataShapeType(viewportData) {
  return viewportData?.dataShapeType ?? viewportData?.viewportType;
}

/**
 * The slice-navigation event for this viewport's content. Resolved from the
 * legacy viewportType when it is meaningful, else from the bound data shape —
 * which is known immediately, unlike a runtime content-mode check that may not
 * be ready while a native viewport is still binding. Native viewports emit the
 * same STACK_NEW_IMAGE / VOLUME_NEW_IMAGE events as legacy.
 */
function getSliceEventName(viewportData) {
  const {
    viewportType
  } = viewportData;
  const firstData = getPrimaryViewportDatum(viewportData);
  return viewportType === _cornerstonejs_core__rspack_import_0.Enums.ViewportType.STACK && _cornerstonejs_core__rspack_import_0.Enums.Events.STACK_NEW_IMAGE || viewportType === _cornerstonejs_core__rspack_import_0.Enums.ViewportType.ORTHOGRAPHIC && _cornerstonejs_core__rspack_import_0.Enums.Events.VOLUME_NEW_IMAGE || isVolumeViewportData(viewportData) && _cornerstonejs_core__rspack_import_0.Enums.Events.VOLUME_NEW_IMAGE || firstData?.imageIds && _cornerstonejs_core__rspack_import_0.Enums.Events.STACK_NEW_IMAGE || _cornerstonejs_core__rspack_import_0.Enums.Events.IMAGE_RENDERED;
}

/**
 * The slice count for a viewport. `viewport.getNumberOfSlices()` can be
 * premature while a native viewport is still binding its data (it returns 1
 * until then). For an image stack the count is known from the bound data, so
 * prefer that and only fall back to the viewport for volume/MPR (where the
 * count depends on orientation).
 */
function getViewportSliceCount(viewportData, viewport) {
  const firstData = getPrimaryViewportDatum(viewportData);
  return !isVolumeViewportData(viewportData) && firstData?.imageIds?.length || viewport.getNumberOfSlices();
}
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=extensions_cornerstone_src_Viewport_OHIFCornerstoneViewport_tsx.js.map