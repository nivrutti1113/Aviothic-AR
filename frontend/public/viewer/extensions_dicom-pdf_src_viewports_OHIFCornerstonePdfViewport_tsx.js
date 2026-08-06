(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_dicom-pdf_src_viewports_OHIFCornerstonePdfViewport_tsx"], {
"../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css"(module, __webpack_exports__, __webpack_require__) {
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
___CSS_LOADER_EXPORT___.push([module.id, `.pdf-no-click {
  pointer-events: none;
  height: 100%;
  width: 100%;
}

.pdf-yes-click {
  pointer-events: auto;
  height: 100%;
  width: 100%;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;EACpB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,oBAAoB;EACpB,YAAY;EACZ,WAAW;AACb","sourcesContent":[".pdf-no-click {\r\n  pointer-events: none;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.pdf-yes-click {\r\n  pointer-events: auto;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* export default */ const __rspack_default_export = (___CSS_LOADER_EXPORT___);


},
"../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css"(module, __unused_rspack_exports, __webpack_require__) {
var api = __webpack_require__("../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css");

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
      "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css",
      function(__rspack_hmr_outdated) {
(function () {
        content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css");

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
"../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var prop_types__rspack_import_1 = __webpack_require__("../../../node_modules/prop-types/index.js");
/* import */ var prop_types__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(prop_types__rspack_import_1);
/* import */ var _ohif_core__rspack_import_2 = __webpack_require__("../../core/src/index.ts");
/* import */ var _OHIFCornerstonePdfViewport_css__rspack_import_3 = __webpack_require__("../../../extensions/dicom-pdf/src/viewports/OHIFCornerstonePdfViewport.css");
/* import */ var _OHIFCornerstonePdfViewport_css__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_OHIFCornerstonePdfViewport_css__rspack_import_3);
/* provided dependency */ var $ReactRefreshRuntime$ = 
var _s = $RefreshSig$();




function OHIFCornerstonePdfViewport({
  displaySets,
  viewportId = 'pdf-viewport'
}) {
  _s();
  const [url, setUrl] = (0,react__rspack_import_0.useState)(null);
  const viewportElementRef = (0,react__rspack_import_0.useRef)(null);
  const viewportRef = (0,_ohif_core__rspack_import_2.useViewportRef)(viewportId);
  (0,react__rspack_import_0.useEffect)(() => {
    document.body.addEventListener('drag', makePdfDropTarget);
    return function cleanup() {
      document.body.removeEventListener('drag', makePdfDropTarget);
      viewportRef.unregister();
    };
  }, []);
  const [style, setStyle] = (0,react__rspack_import_0.useState)('pdf-yes-click');
  const makePdfScrollable = () => {
    setStyle('pdf-yes-click');
  };
  const makePdfDropTarget = () => {
    setStyle('pdf-no-click');
  };
  if (displaySets && displaySets.length > 1) {
    throw new Error('OHIFCornerstonePdfViewport: only one display set is supported for dicom pdf right now');
  }
  const {
    renderedUrl
  } = displaySets[0];
  const {
    getRenderedUrl
  } = displaySets[0];
  (0,react__rspack_import_0.useEffect)(() => {
    let isCancelled = false;
    let revokeUrl;
    const abortController = new AbortController();
    const load = async () => {
      try {
        const result = getRenderedUrl ? await getRenderedUrl({
          signal: abortController.signal
        }) : {
          url: await renderedUrl
        };
        if (isCancelled) {
          result?.revoke?.();
          return;
        }
        revokeUrl = result?.revoke;
        setUrl(result?.url || null);
      } catch (error) {
        console.warn('Failed to load PDF', error);
        if (!isCancelled) {
          setUrl(null);
        }
        return;
      }
    };
    load();
    return () => {
      isCancelled = true;
      abortController.abort();
      revokeUrl?.();
    };
  }, [renderedUrl, getRenderedUrl]);
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: "bg-primary-black text-foreground h-full w-full",
    onClick: makePdfScrollable,
    ref: el => {
      viewportElementRef.current = el;
      if (el) {
        viewportRef.register(el);
      }
    },
    "data-viewport-id": viewportId
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("object", {
    data: url,
    type: "application/pdf",
    className: style
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", null, "No online PDF viewer installed")));
}
_s(OHIFCornerstonePdfViewport, "OdpzEKeVU8Go9lzU9zthfLn7mEE=", false, function () {
  return [_ohif_core__rspack_import_2.useViewportRef];
});
_c = OHIFCornerstonePdfViewport;
OHIFCornerstonePdfViewport.propTypes = {
  displaySets: prop_types__rspack_import_1_default().arrayOf((prop_types__rspack_import_1_default().object)).isRequired,
  viewportId: (prop_types__rspack_import_1_default().string)
};
/* export default */ const __rspack_default_export = (OHIFCornerstonePdfViewport);
var _c;
$RefreshReg$(_c, "OHIFCornerstonePdfViewport");
function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=extensions_dicom-pdf_src_viewports_OHIFCornerstonePdfViewport_tsx.js.map