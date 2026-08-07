(globalThis["rspackChunk"] = globalThis["rspackChunk"] || []).push([["extensions_dicom-microscopy_src_DicomMicroscopyViewport_tsx"], {
"../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css"(module, __webpack_exports__, __webpack_require__) {
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
___CSS_LOADER_EXPORT___.push([module.id, `.DicomMicroscopyViewer {
  --ol-partial-background-color: rgba(127, 127, 127, 0.7);
  --ol-foreground-color: #000000;
  --ol-subtle-foreground-color: #000;
  --ol-subtle-background-color: rgba(78, 78, 78, 0.5);
  
  /* Prevent text selection on the entire viewer to avoid interference with annotations */
  -webkit-user-select: none;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
}

.DicomMicroscopyViewer .ol-box {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border-radius: 2px;
  border: 1.5px solid var(--ol-background-color);
  background-color: var(--ol-partial-background-color);
}

.DicomMicroscopyViewer .ol-mouse-position {
  top: 8px;
  right: 8px;
  position: absolute;
}

.DicomMicroscopyViewer .ol-scale-line {
  background: var(--ol-partial-background-color);
  border-radius: 4px;
  bottom: 8px;
  left: 8px;
  padding: 2px;
  position: absolute;
}

.DicomMicroscopyViewer .ol-scale-line-inner {
  border: 1px solid var(--ol-subtle-foreground-color);
  border-top: none;
  color: var(--ol-foreground-color);
  font-size: 10px;
  text-align: center;
  margin: 1px;
  will-change: contents, width;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
}

.DicomMicroscopyViewer .ol-scale-bar {
  position: absolute;
  bottom: 8px;
  left: 8px;
}

.DicomMicroscopyViewer .ol-scale-bar-inner {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.DicomMicroscopyViewer .ol-scale-step-marker {
  width: 1px;
  height: 15px;
  background-color: var(--ol-foreground-color);
  float: right;
  z-index: 10;
}

.DicomMicroscopyViewer .ol-scale-step-text {
  position: absolute;
  bottom: -5px;
  font-size: 10px;
  z-index: 11;
  color: var(--ol-foreground-color);
  text-shadow:
    -1.5px 0 var(--ol-partial-background-color),
    0 1.5px var(--ol-partial-background-color),
    1.5px 0 var(--ol-partial-background-color),
    0 -1.5px var(--ol-partial-background-color);
}

.DicomMicroscopyViewer .ol-scale-text {
  position: absolute;
  font-size: 12px;
  text-align: center;
  bottom: 25px;
  color: var(--ol-foreground-color);
  text-shadow:
    -1.5px 0 var(--ol-partial-background-color),
    0 1.5px var(--ol-partial-background-color),
    1.5px 0 var(--ol-partial-background-color),
    0 -1.5px var(--ol-partial-background-color);
}

.DicomMicroscopyViewer .ol-scale-singlebar {
  position: relative;
  height: 10px;
  z-index: 9;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border: 1px solid var(--ol-foreground-color);
}

.DicomMicroscopyViewer .ol-scale-singlebar-even {
  background-color: var(--ol-subtle-foreground-color);
}

.DicomMicroscopyViewer .ol-scale-singlebar-odd {
  background-color: var(--ol-background-color);
}

.DicomMicroscopyViewer .ol-unsupported {
  display: none;
}

.DicomMicroscopyViewer .ol-viewport,
.DicomMicroscopyViewer .ol-unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.DicomMicroscopyViewer .ol-viewport canvas {
  all: unset;
}

.DicomMicroscopyViewer .ol-selectable {
  -webkit-touch-callout: default;
  -webkit-user-select: text;
  -moz-user-select: text;
   -ms-user-select: text;
       user-select: text;
}

.DicomMicroscopyViewer .ol-grabbing {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}

.DicomMicroscopyViewer .ol-grab {
  cursor: move;
  cursor: -webkit-grab;
  cursor: grab;
}

.DicomMicroscopyViewer .ol-control {
  position: absolute;
  background-color: var(--ol-subtle-background-color);
  border-radius: 4px;
}

.DicomMicroscopyViewer .ol-zoom {
  top: 0.5em;
  left: 0.5em;
}

.DicomMicroscopyViewer .ol-rotate {
  top: 0.5em;
  right: 0.5em;
  -webkit-transition:
    opacity 0.25s linear,
    visibility 0s linear;
  transition:
    opacity 0.25s linear,
    visibility 0s linear;
}

.DicomMicroscopyViewer .ol-rotate.ol-hidden {
  opacity: 0;
  visibility: hidden;
  -webkit-transition:
    opacity 0.25s linear,
    visibility 0s linear 0.25s;
  transition:
    opacity 0.25s linear,
    visibility 0s linear 0.25s;
}

.DicomMicroscopyViewer .ol-zoom-extent {
  top: 4.643em;
  left: 0.5em;
}

.DicomMicroscopyViewer .ol-full-screen {
  right: 0.5em;
  top: 0.5em;
}

.DicomMicroscopyViewer .ol-control button {
  display: block;
  margin: 1px;
  padding: 0;
  color: var(--ol-subtle-foreground-color);
  font-weight: bold;
  text-decoration: none;
  font-size: inherit;
  text-align: center;
  height: 1.375em;
  width: 1.375em;
  line-height: 0.4em;
  background-color: var(--ol-background-color);
  border: none;
  border-radius: 2px;
}

.DicomMicroscopyViewer .ol-control button::-moz-focus-inner {
  border: none;
  padding: 0;
}

.DicomMicroscopyViewer .ol-zoom-extent button {
  line-height: 1.4em;
}

.DicomMicroscopyViewer .ol-compass {
  display: block;
  font-weight: normal;
  will-change: transform;
}

.DicomMicroscopyViewer .ol-touch .ol-control button {
  font-size: 1.5em;
}

.DicomMicroscopyViewer .ol-touch .ol-zoom-extent {
  top: 5.5em;
}

.DicomMicroscopyViewer .ol-control button:hover,
.DicomMicroscopyViewer .ol-control button:focus {
  text-decoration: none;
  outline: 1px solid var(--ol-subtle-foreground-color);
  color: var(--ol-foreground-color);
}

.DicomMicroscopyViewer .ol-zoom .ol-zoom-in {
  border-radius: 2px 2px 0 0;
}

.DicomMicroscopyViewer .ol-zoom .ol-zoom-out {
  border-radius: 0 0 2px 2px;
}

.DicomMicroscopyViewer .ol-attribution {
  text-align: right;
  bottom: 0.5em;
  right: 0.5em;
  max-width: calc(100% - 1.3em);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
      -ms-flex-flow: row-reverse;
          flex-flow: row-reverse;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

.DicomMicroscopyViewer .ol-attribution a {
  color: var(--ol-subtle-foreground-color);
  text-decoration: none;
}

.DicomMicroscopyViewer .ol-attribution ul {
  margin: 0;
  padding: 1px 0.5em;
  color: var(--ol-foreground-color);
  text-shadow: 0 0 2px var(--ol-background-color);
  font-size: 12px;
}

.DicomMicroscopyViewer .ol-attribution li {
  display: inline;
  list-style: none;
}

.DicomMicroscopyViewer .ol-attribution li:not(:last-child):after {
  content: ' ';
}

.DicomMicroscopyViewer .ol-attribution img {
  max-height: 2em;
  max-width: inherit;
  vertical-align: middle;
}

.DicomMicroscopyViewer .ol-attribution button {
  -ms-flex-negative: 0;
      flex-shrink: 0;
}

.DicomMicroscopyViewer .ol-attribution.ol-collapsed ul {
  display: none;
}

.DicomMicroscopyViewer .ol-attribution:not(.ol-collapsed) {
  background: var(--ol-partial-background-color);
}

.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible {
  bottom: 0;
  right: 0;
  border-radius: 4px 0 0;
}

.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible img {
  margin-top: -0.2em;
  max-height: 1.6em;
}

.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible button {
  display: none;
}

.DicomMicroscopyViewer .ol-zoomslider {
  top: 4.5em;
  left: 0.5em;
  height: 200px;
}

.DicomMicroscopyViewer .ol-zoomslider button {
  position: relative;
  height: 10px;
}

.DicomMicroscopyViewer .ol-touch .ol-zoomslider {
  top: 5.5em;
}

.DicomMicroscopyViewer .ol-overviewmap {
  left: 0.5em;
  bottom: 0.5em;
}

.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible {
  bottom: 0;
  left: 0;
  border-radius: 0 4px 0 0;
}

.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map,
.DicomMicroscopyViewer .ol-overviewmap button {
  display: block;
}

.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map {
  border: 1px solid var(--ol-subtle-foreground-color);
  height: 150px;
  width: 150px;
}

.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) button {
  bottom: 0;
  left: 0;
  position: absolute;
}

.DicomMicroscopyViewer .ol-overviewmap.ol-collapsed .ol-overviewmap-map,
.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible button {
  display: none;
}

.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) {
  background: var(--ol-subtle-background-color);
}

.DicomMicroscopyViewer .ol-overviewmap-box {
  border: 0.5px dotted var(--ol-subtle-foreground-color);
}

.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-box:hover {
  cursor: move;
}

@layout-header-background: #007ea3;
@primary-color: #007ea3;
@processing-color: #8cb8c6;
@success-color: #3f9c35;
@warning-color: #eeaf30;
@error-color: #96172e;
@font-size-base: 14px;

.DicomMicroscopyViewer .ol-tooltip {
  font-size: 16px !important;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css"],"names":[],"mappings":"AAAA;EACE,uDAAuD;EACvD,8BAA8B;EAC9B,kCAAkC;EAClC,mDAAmD;;EAEnD,uFAAuF;EACvF,yBAAyB;EAGzB,sBAAiB;GAAjB,qBAAiB;OAAjB,iBAAiB;AACnB;;AAEA;EACE,8BAAsB;UAAtB,sBAAsB;EACtB,kBAAkB;EAClB,8CAA8C;EAC9C,oDAAoD;AACtD;;AAEA;EACE,QAAQ;EACR,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,8CAA8C;EAC9C,kBAAkB;EAClB,WAAW;EACX,SAAS;EACT,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,mDAAmD;EACnD,gBAAgB;EAChB,iCAAiC;EACjC,eAAe;EACf,kBAAkB;EAClB,WAAW;EACX,4BAA4B;EAC5B,6BAAqB;EAArB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,SAAS;AACX;;AAEA;EACE,oBAAa;EAAb,oBAAa;EAAb,aAAa;AACf;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,4CAA4C;EAC5C,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,WAAW;EACX,iCAAiC;EACjC;;;;+CAI6C;AAC/C;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,iCAAiC;EACjC;;;;+CAI6C;AAC/C;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,UAAU;EACV,8BAAsB;UAAtB,sBAAsB;EACtB,4CAA4C;AAC9C;;AAEA;EACE,mDAAmD;AACrD;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,2BAA2B;EAC3B,yBAAyB;EAEzB,sBAAiB;GAAjB,qBAAiB;OAAjB,iBAAiB;EACjB,wCAAwC;AAC1C;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,8BAA8B;EAC9B,yBAAyB;EAEzB,sBAAiB;GAAjB,qBAAiB;OAAjB,iBAAiB;AACnB;;AAEA;EAGE,wBAAgB;EAAhB,gBAAgB;AAClB;;AAEA;EACE,YAAY;EAGZ,oBAAY;EAAZ,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,mDAAmD;EACnD,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,WAAW;AACb;;AAEA;EACE,UAAU;EACV,YAAY;EACZ;;wBAEsB;EAFtB;;wBAEsB;AACxB;;AAEA;EACE,UAAU;EACV,kBAAkB;EAClB;;8BAE4B;EAF5B;;8BAE4B;AAC9B;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,cAAc;EACd,WAAW;EACX,UAAU;EACV,wCAAwC;EACxC,iBAAiB;EACjB,qBAAqB;EACrB,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,kBAAkB;EAClB,4CAA4C;EAC5C,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,UAAU;AACZ;;AAEA;;EAEE,qBAAqB;EACrB,oDAAoD;EACpD,iCAAiC;AACnC;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,YAAY;EACZ,6BAA6B;EAC7B,oBAAa;EAAb,oBAAa;EAAb,aAAa;EACb,8BAAsB;EAAtB,8BAAsB;MAAtB,0BAAsB;UAAtB,sBAAsB;EACtB,yBAAmB;MAAnB,sBAAmB;UAAnB,mBAAmB;AACrB;;AAEA;EACE,wCAAwC;EACxC,qBAAqB;AACvB;;AAEA;EACE,SAAS;EACT,kBAAkB;EAClB,iCAAiC;EACjC,+CAA+C;EAC/C,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,oBAAc;MAAd,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,8CAA8C;AAChD;;AAEA;EACE,SAAS;EACT,QAAQ;EACR,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,UAAU;EACV,WAAW;EACX,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,aAAa;AACf;;AAEA;EACE,SAAS;EACT,OAAO;EACP,wBAAwB;AAC1B;;AAEA;;EAEE,cAAc;AAChB;;AAEA;EACE,mDAAmD;EACnD,aAAa;EACb,YAAY;AACd;;AAEA;EACE,SAAS;EACT,OAAO;EACP,kBAAkB;AACpB;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,6CAA6C;AAC/C;;AAEA;EACE,sDAAsD;AACxD;;AAEA;EACE,YAAY;AACd;;AAEA,kCAAkC;AAClC,uBAAuB;AACvB,0BAA0B;AAC1B,uBAAuB;AACvB,uBAAuB;AACvB,qBAAqB;AACrB,qBAAqB;;AAErB;EACE,0BAA0B;AAC5B","sourcesContent":[".DicomMicroscopyViewer {\r\n  --ol-partial-background-color: rgba(127, 127, 127, 0.7);\r\n  --ol-foreground-color: #000000;\r\n  --ol-subtle-foreground-color: #000;\r\n  --ol-subtle-background-color: rgba(78, 78, 78, 0.5);\r\n  \r\n  /* Prevent text selection on the entire viewer to avoid interference with annotations */\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-box {\r\n  box-sizing: border-box;\r\n  border-radius: 2px;\r\n  border: 1.5px solid var(--ol-background-color);\r\n  background-color: var(--ol-partial-background-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-mouse-position {\r\n  top: 8px;\r\n  right: 8px;\r\n  position: absolute;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-line {\r\n  background: var(--ol-partial-background-color);\r\n  border-radius: 4px;\r\n  bottom: 8px;\r\n  left: 8px;\r\n  padding: 2px;\r\n  position: absolute;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-line-inner {\r\n  border: 1px solid var(--ol-subtle-foreground-color);\r\n  border-top: none;\r\n  color: var(--ol-foreground-color);\r\n  font-size: 10px;\r\n  text-align: center;\r\n  margin: 1px;\r\n  will-change: contents, width;\r\n  transition: all 0.25s;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-bar {\r\n  position: absolute;\r\n  bottom: 8px;\r\n  left: 8px;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-bar-inner {\r\n  display: flex;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-step-marker {\r\n  width: 1px;\r\n  height: 15px;\r\n  background-color: var(--ol-foreground-color);\r\n  float: right;\r\n  z-index: 10;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-step-text {\r\n  position: absolute;\r\n  bottom: -5px;\r\n  font-size: 10px;\r\n  z-index: 11;\r\n  color: var(--ol-foreground-color);\r\n  text-shadow:\r\n    -1.5px 0 var(--ol-partial-background-color),\r\n    0 1.5px var(--ol-partial-background-color),\r\n    1.5px 0 var(--ol-partial-background-color),\r\n    0 -1.5px var(--ol-partial-background-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-text {\r\n  position: absolute;\r\n  font-size: 12px;\r\n  text-align: center;\r\n  bottom: 25px;\r\n  color: var(--ol-foreground-color);\r\n  text-shadow:\r\n    -1.5px 0 var(--ol-partial-background-color),\r\n    0 1.5px var(--ol-partial-background-color),\r\n    1.5px 0 var(--ol-partial-background-color),\r\n    0 -1.5px var(--ol-partial-background-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-singlebar {\r\n  position: relative;\r\n  height: 10px;\r\n  z-index: 9;\r\n  box-sizing: border-box;\r\n  border: 1px solid var(--ol-foreground-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-singlebar-even {\r\n  background-color: var(--ol-subtle-foreground-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-scale-singlebar-odd {\r\n  background-color: var(--ol-background-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-unsupported {\r\n  display: none;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-viewport,\r\n.DicomMicroscopyViewer .ol-unselectable {\r\n  -webkit-touch-callout: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  user-select: none;\r\n  -webkit-tap-highlight-color: transparent;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-viewport canvas {\r\n  all: unset;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-selectable {\r\n  -webkit-touch-callout: default;\r\n  -webkit-user-select: text;\r\n  -moz-user-select: text;\r\n  user-select: text;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-grabbing {\r\n  cursor: -webkit-grabbing;\r\n  cursor: -moz-grabbing;\r\n  cursor: grabbing;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-grab {\r\n  cursor: move;\r\n  cursor: -webkit-grab;\r\n  cursor: -moz-grab;\r\n  cursor: grab;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-control {\r\n  position: absolute;\r\n  background-color: var(--ol-subtle-background-color);\r\n  border-radius: 4px;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-zoom {\r\n  top: 0.5em;\r\n  left: 0.5em;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-rotate {\r\n  top: 0.5em;\r\n  right: 0.5em;\r\n  transition:\r\n    opacity 0.25s linear,\r\n    visibility 0s linear;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-rotate.ol-hidden {\r\n  opacity: 0;\r\n  visibility: hidden;\r\n  transition:\r\n    opacity 0.25s linear,\r\n    visibility 0s linear 0.25s;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-zoom-extent {\r\n  top: 4.643em;\r\n  left: 0.5em;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-full-screen {\r\n  right: 0.5em;\r\n  top: 0.5em;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-control button {\r\n  display: block;\r\n  margin: 1px;\r\n  padding: 0;\r\n  color: var(--ol-subtle-foreground-color);\r\n  font-weight: bold;\r\n  text-decoration: none;\r\n  font-size: inherit;\r\n  text-align: center;\r\n  height: 1.375em;\r\n  width: 1.375em;\r\n  line-height: 0.4em;\r\n  background-color: var(--ol-background-color);\r\n  border: none;\r\n  border-radius: 2px;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-control button::-moz-focus-inner {\r\n  border: none;\r\n  padding: 0;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-zoom-extent button {\r\n  line-height: 1.4em;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-compass {\r\n  display: block;\r\n  font-weight: normal;\r\n  will-change: transform;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-touch .ol-control button {\r\n  font-size: 1.5em;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-touch .ol-zoom-extent {\r\n  top: 5.5em;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-control button:hover,\r\n.DicomMicroscopyViewer .ol-control button:focus {\r\n  text-decoration: none;\r\n  outline: 1px solid var(--ol-subtle-foreground-color);\r\n  color: var(--ol-foreground-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-zoom .ol-zoom-in {\r\n  border-radius: 2px 2px 0 0;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-zoom .ol-zoom-out {\r\n  border-radius: 0 0 2px 2px;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution {\r\n  text-align: right;\r\n  bottom: 0.5em;\r\n  right: 0.5em;\r\n  max-width: calc(100% - 1.3em);\r\n  display: flex;\r\n  flex-flow: row-reverse;\r\n  align-items: center;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution a {\r\n  color: var(--ol-subtle-foreground-color);\r\n  text-decoration: none;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution ul {\r\n  margin: 0;\r\n  padding: 1px 0.5em;\r\n  color: var(--ol-foreground-color);\r\n  text-shadow: 0 0 2px var(--ol-background-color);\r\n  font-size: 12px;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution li {\r\n  display: inline;\r\n  list-style: none;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution li:not(:last-child):after {\r\n  content: ' ';\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution img {\r\n  max-height: 2em;\r\n  max-width: inherit;\r\n  vertical-align: middle;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution button {\r\n  flex-shrink: 0;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution.ol-collapsed ul {\r\n  display: none;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution:not(.ol-collapsed) {\r\n  background: var(--ol-partial-background-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible {\r\n  bottom: 0;\r\n  right: 0;\r\n  border-radius: 4px 0 0;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible img {\r\n  margin-top: -0.2em;\r\n  max-height: 1.6em;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-attribution.ol-uncollapsible button {\r\n  display: none;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-zoomslider {\r\n  top: 4.5em;\r\n  left: 0.5em;\r\n  height: 200px;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-zoomslider button {\r\n  position: relative;\r\n  height: 10px;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-touch .ol-zoomslider {\r\n  top: 5.5em;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-overviewmap {\r\n  left: 0.5em;\r\n  bottom: 0.5em;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible {\r\n  bottom: 0;\r\n  left: 0;\r\n  border-radius: 0 4px 0 0;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map,\r\n.DicomMicroscopyViewer .ol-overviewmap button {\r\n  display: block;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-map {\r\n  border: 1px solid var(--ol-subtle-foreground-color);\r\n  height: 150px;\r\n  width: 150px;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) button {\r\n  bottom: 0;\r\n  left: 0;\r\n  position: absolute;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-overviewmap.ol-collapsed .ol-overviewmap-map,\r\n.DicomMicroscopyViewer .ol-overviewmap.ol-uncollapsible button {\r\n  display: none;\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-overviewmap:not(.ol-collapsed) {\r\n  background: var(--ol-subtle-background-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-overviewmap-box {\r\n  border: 0.5px dotted var(--ol-subtle-foreground-color);\r\n}\r\n\r\n.DicomMicroscopyViewer .ol-overviewmap .ol-overviewmap-box:hover {\r\n  cursor: move;\r\n}\r\n\r\n@layout-header-background: #007ea3;\r\n@primary-color: #007ea3;\r\n@processing-color: #8cb8c6;\r\n@success-color: #3f9c35;\r\n@warning-color: #eeaf30;\r\n@error-color: #96172e;\r\n@font-size-base: 14px;\r\n\r\n.DicomMicroscopyViewer .ol-tooltip {\r\n  font-size: 16px !important;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* export default */ const __rspack_default_export = (___CSS_LOADER_EXPORT___);


},
"../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css"(module, __webpack_exports__, __webpack_require__) {
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
___CSS_LOADER_EXPORT___.push([module.id, `.DicomMicroscopyViewer .OpenLayersOverlay {
  height: 100%;
  width: 100%;
  display: block !important;
  pointer-events: none !important;
}

.DicomMicroscopyViewer .text-highlight {
  font-size: 14px;
  color: yellow;
  font-weight: normal;
}

.DicomMicroscopyViewer .text-highlight span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 300px;
  /* text-shadow: 0px 1px 1px rgba(225, 225, 225, 0.6),
              0px 1px 1px rgba(225, 225, 225, 0.6),
              1px 1px 3px rgba(225, 225, 225, 0.9),
              1px 1px 3px rgba(225, 225, 225, 0.9),
              1px 1px 3px rgba(225, 225, 225, 0.9),
              1px 1px 3px rgba(225, 225, 225, 0.9); */
}

.DicomMicroscopyViewer .absolute {
  position: absolute;
}

.DicomMicroscopyViewer .flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.DicomMicroscopyViewer .flex-row {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
}

.DicomMicroscopyViewer .flex-col {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
}

.DicomMicroscopyViewer .pointer-events-none {
  pointer-events: none;
}

.DicomMicroscopyViewer .left-viewport-scrollbar {
  left: 0.5rem;
}

.DicomMicroscopyViewer .right-viewport-scrollbar {
  right: 1.3rem;
}

.DicomMicroscopyViewer .top-viewport {
  top: 0.5rem;
}

.DicomMicroscopyViewer .bottom-viewport {
  bottom: 0.5rem;
}

.DicomMicroscopyViewer .bottom-viewport.left-viewport {
  bottom: 0.5rem;
  left: calc(0.5rem + 250px);
}

.DicomMicroscopyViewer .right-viewport-scrollbar .flex {
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: end;
}

.DicomMicroscopyViewer .microscopy-viewport-overlay {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.5);
  max-width: 40%;
}

.DicomMicroscopyViewer .microscopy-viewport-overlay .flex {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.DicomMicroscopyViewer .top-viewport .flex span:not(.font-light) {
  -ms-flex-negative: 0;
      flex-shrink: 0;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,WAAW;EACX,yBAAyB;EACzB,+BAA+B;AACjC;;AAEA;EACE,eAAe;EACf,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,uBAAuB;EACvB,gBAAgB;EAChB;;;;;qDAKmD;AACrD;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,oBAAa;EAAb,oBAAa;EAAb,aAAa;AACf;;AAEA;EACE,8BAAmB;EAAnB,6BAAmB;MAAnB,uBAAmB;UAAnB,mBAAmB;AACrB;;AAEA;EACE,4BAAsB;EAAtB,6BAAsB;MAAtB,0BAAsB;UAAtB,sBAAsB;AACxB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,0BAA0B;AAC5B;;AAEA;EACE,qBAAoB;MAApB,kBAAoB;UAApB,oBAAoB;AACtB;;AAEA;EACE,oBAAoB;EACpB,8BAA8B;EAC9B,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,oBAAc;MAAd,cAAc;AAChB","sourcesContent":[".DicomMicroscopyViewer .OpenLayersOverlay {\r\n  height: 100%;\r\n  width: 100%;\r\n  display: block !important;\r\n  pointer-events: none !important;\r\n}\r\n\r\n.DicomMicroscopyViewer .text-highlight {\r\n  font-size: 14px;\r\n  color: yellow;\r\n  font-weight: normal;\r\n}\r\n\r\n.DicomMicroscopyViewer .text-highlight span {\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  max-width: 300px;\r\n  /* text-shadow: 0px 1px 1px rgba(225, 225, 225, 0.6),\r\n              0px 1px 1px rgba(225, 225, 225, 0.6),\r\n              1px 1px 3px rgba(225, 225, 225, 0.9),\r\n              1px 1px 3px rgba(225, 225, 225, 0.9),\r\n              1px 1px 3px rgba(225, 225, 225, 0.9),\r\n              1px 1px 3px rgba(225, 225, 225, 0.9); */\r\n}\r\n\r\n.DicomMicroscopyViewer .absolute {\r\n  position: absolute;\r\n}\r\n\r\n.DicomMicroscopyViewer .flex {\r\n  display: flex;\r\n}\r\n\r\n.DicomMicroscopyViewer .flex-row {\r\n  flex-direction: row;\r\n}\r\n\r\n.DicomMicroscopyViewer .flex-col {\r\n  flex-direction: column;\r\n}\r\n\r\n.DicomMicroscopyViewer .pointer-events-none {\r\n  pointer-events: none;\r\n}\r\n\r\n.DicomMicroscopyViewer .left-viewport-scrollbar {\r\n  left: 0.5rem;\r\n}\r\n\r\n.DicomMicroscopyViewer .right-viewport-scrollbar {\r\n  right: 1.3rem;\r\n}\r\n\r\n.DicomMicroscopyViewer .top-viewport {\r\n  top: 0.5rem;\r\n}\r\n\r\n.DicomMicroscopyViewer .bottom-viewport {\r\n  bottom: 0.5rem;\r\n}\r\n\r\n.DicomMicroscopyViewer .bottom-viewport.left-viewport {\r\n  bottom: 0.5rem;\r\n  left: calc(0.5rem + 250px);\r\n}\r\n\r\n.DicomMicroscopyViewer .right-viewport-scrollbar .flex {\r\n  justify-content: end;\r\n}\r\n\r\n.DicomMicroscopyViewer .microscopy-viewport-overlay {\r\n  padding: 0.5rem 1rem;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  max-width: 40%;\r\n}\r\n\r\n.DicomMicroscopyViewer .microscopy-viewport-overlay .flex {\r\n  max-width: 100%;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n\r\n.DicomMicroscopyViewer .top-viewport .flex span:not(.font-light) {\r\n  flex-shrink: 0;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* export default */ const __rspack_default_export = (___CSS_LOADER_EXPORT___);


},
"../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css"(module, __unused_rspack_exports, __webpack_require__) {
var api = __webpack_require__("../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css");

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
      "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css",
      function(__rspack_hmr_outdated) {
(function () {
        content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css");

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
"../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css"(module, __unused_rspack_exports, __webpack_require__) {
var api = __webpack_require__("../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css");

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
      "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css",
      function(__rspack_hmr_outdated) {
(function () {
        content = __webpack_require__("../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[6].use[2]!../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css");

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
"../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _ohif_extension_default__rspack_import_1 = __webpack_require__("../../../extensions/default/src/index.ts");
/* import */ var _DicomMicroscopyViewport_css__rspack_import_2 = __webpack_require__("../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.css");
/* import */ var _DicomMicroscopyViewport_css__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(_DicomMicroscopyViewport_css__rspack_import_2);
/* import */ var _components_ViewportOverlay__rspack_import_3 = __webpack_require__("../../../extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx");
/* import */ var _utils_dicomWebClient__rspack_import_4 = __webpack_require__("../../../extensions/dicom-microscopy/src/utils/dicomWebClient.ts");
/* import */ var dcmjs__rspack_import_5 = __webpack_require__("../../../node_modules/dcmjs/build/dcmjs.es.js");
/* import */ var _ohif_core__rspack_import_6 = __webpack_require__("../../core/src/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
var _s = $RefreshSig$();








// This component is wrapped with React.memo and uses a custom areEqual comparison
// function to prevent unnecessary re-renders when props are semantically identical
// (e.g. `displaySets` reference changes, but the content is the same).
// Note: If this component starts depending on additional props,
// update `areEqual` accordingly.
const DicomMicroscopyViewport = /*#__PURE__*/_s(/*#__PURE__*/react__rspack_import_0_default().memo(_c = _s(({
  activeViewportId,
  setViewportActive,
  displaySets,
  viewportId,
  dataSource,
  resizeRef
}) => {
  _s();
  const {
    servicesManager,
    extensionManager
  } = (0,_ohif_core__rspack_import_6.useSystem)();
  const [isLoaded, setIsLoaded] = (0,react__rspack_import_0.useState)(false);
  const [viewer, setViewer] = (0,react__rspack_import_0.useState)(null);
  const [managedViewer, setManagedViewer] = (0,react__rspack_import_0.useState)(null);
  const overlayElement = (0,react__rspack_import_0.useRef)();
  const container = (0,react__rspack_import_0.useRef)();
  const {
    microscopyService,
    customizationService
  } = servicesManager.services;
  const overlayData = customizationService.getCustomization('microscopyViewport.overlay');

  // install the microscopy renderer into the web page.
  // you should only do this once.
  const installOpenLayersRenderer = (0,react__rspack_import_0.useCallback)(async (container, displaySet) => {
    const loadViewer = async metadata => {
      const dicomMicroscopyModule = await microscopyService.importDicomMicroscopyViewer();
      const {
        viewer: DicomMicroscopyViewer,
        metadata: metadataUtils
      } = dicomMicroscopyModule;
      const microscopyViewer = DicomMicroscopyViewer.VolumeImageViewer;
      const client = (0,_utils_dicomWebClient__rspack_import_4["default"])({
        extensionManager,
        servicesManager
      });

      // Parse, format, and filter metadata
      const volumeImages = [];

      /**
       * This block of code is the original way of loading DICOM into dicom-microscopy-viewer
       * as in their documentation.
       * But we have the metadata already loaded by our loaders.
       * As the metadata for microscopy DIOM files tends to be big and we don't
       * want to double load it, below we have the mechanism to reconstruct the
       * DICOM JSON structure (denaturalized) from naturalized metadata.
       * (NOTE: Our loaders cache only naturalized metadata, not the denaturalized.)
       */
      // {
      //   const retrieveOptions = {
      //     studyInstanceUID: metadata[0].StudyInstanceUID,
      //     seriesInstanceUID: metadata[0].SeriesInstanceUID,
      //   };
      //   metadata = await client.retrieveSeriesMetadata(retrieveOptions);
      //   // Parse, format, and filter metadata
      //   metadata.forEach(m => {
      //     if (
      //       volumeImages.length > 0 &&
      //       m['00200052'].Value[0] != volumeImages[0].FrameOfReferenceUID
      //     ) {
      //       console.warn(
      //         'Expected FrameOfReferenceUID of difference instances within a series to be the same, found multiple different values',
      //         m['00200052'].Value[0]
      //       );
      //       m['00200052'].Value[0] = volumeImages[0].FrameOfReferenceUID;
      //     }
      //     NOTE: depending on different data source, image.ImageType sometimes
      //     is a string, not a string array.
      //     m['00080008'] = transformImageTypeUnnaturalized(m['00080008']);

      //     const image = new metadataUtils.VLWholeSlideMicroscopyImage({
      //       metadata: m,
      //     });
      //     const imageFlavor = image.ImageType[2];
      //     if (imageFlavor === 'VOLUME' || imageFlavor === 'THUMBNAIL') {
      //       volumeImages.push(image);
      //     }
      //   });
      // }

      metadata.forEach(m => {
        // NOTE: depending on different data source, image.ImageType sometimes
        //    is a string, not a string array.
        m.ImageType = typeof m.ImageType === 'string' ? m.ImageType.split('\\') : m.ImageType;
        const inst = (0,_ohif_extension_default__rspack_import_1.cleanDenaturalizedDataset)(dcmjs__rspack_import_5["default"].data.DicomMetaDictionary.denaturalizeDataset(m), {
          StudyInstanceUID: m.StudyInstanceUID,
          SeriesInstanceUID: m.SeriesInstanceUID,
          dataSourceConfig: dataSource.getConfig()
        });
        if (!inst['00480105']) {
          // Optical Path Sequence, no OpticalPathIdentifier?
          // NOTE: this is actually a not-well formatted DICOM VL Whole Slide Microscopy Image.
          inst['00480105'] = {
            vr: 'SQ',
            Value: [{
              '00480106': {
                vr: 'SH',
                Value: ['1']
              }
            }]
          };
        }
        const image = new metadataUtils.VLWholeSlideMicroscopyImage({
          metadata: inst
        });
        const imageFlavor = image.ImageType[2];
        if (imageFlavor === 'VOLUME' || imageFlavor === 'THUMBNAIL') {
          volumeImages.push(image);
        }
      });

      // format metadata for microscopy-viewer
      const options = {
        client,
        metadata: volumeImages,
        retrieveRendered: false,
        controls: ['overview', 'position']
      };
      const viewer = new microscopyViewer(options);
      if (overlayElement && overlayElement.current && viewer.addViewportOverlay) {
        viewer.addViewportOverlay({
          element: overlayElement.current,
          coordinates: [0, 0],
          // TODO: dicom-microscopy-viewer documentation says this can be false to be automatically, but it is not.
          navigate: true,
          className: 'OpenLayersOverlay'
        });
      }
      viewer.render({
        container
      });
      const {
        StudyInstanceUID,
        SeriesInstanceUID
      } = displaySet;
      const managedViewer = microscopyService.addViewer(viewer, viewportId, container, StudyInstanceUID, SeriesInstanceUID);
      managedViewer.addContextMenuCallback(event => {
        // TODO: refactor this after Bill's changes on ContextMenu feature get merged
        // const roiAnnotationNearBy = this.getNearbyROI(event);
      });
      setViewer(viewer);
      setManagedViewer(managedViewer);
    };
    microscopyService.clearAnnotations();
    let smDisplaySet = displaySet;
    if (displaySet.isOverlayDisplaySet) {
      // for SR displaySet, let's load the actual image displaySet
      smDisplaySet = displaySet.getSourceDisplaySet();
    }
    console.log('Loading viewer metadata', smDisplaySet);
    await loadViewer(smDisplaySet.others);
    if (displaySet.isOverlayDisplaySet && !displaySet.isLoaded && !displaySet.isLoading) {
      const referencedDisplaySet = displaySet.getSourceDisplaySet();
      displaySet.load(referencedDisplaySet);
    }
  }, [dataSource, extensionManager, microscopyService, servicesManager, viewportId]);
  (0,react__rspack_import_0.useEffect)(() => {
    if (!viewer) {
      const displaySet = displaySets[0];
      installOpenLayersRenderer(container.current, displaySet).then(() => {
        setIsLoaded(true);
      });
    }
    return () => {
      if (viewer) {
        microscopyService.removeViewer(viewer);
      }
    };
  }, [viewer]);
  (0,react__rspack_import_0.useEffect)(() => {
    const displaySet = displaySets[0];
    microscopyService.clearAnnotations();

    // loading SR - only if not already loaded and not currently loading
    if (displaySet.isOverlayDisplaySet && !displaySet.isLoaded && !displaySet.isLoading) {
      const referencedDisplaySet = displaySet.getSourceDisplaySet();
      displaySet.load(referencedDisplaySet);
    }
  }, [managedViewer, displaySets, microscopyService]);
  const style = {
    width: '100%',
    height: '100%'
  };
  const displaySet = displaySets[0];
  const firstInstance = displaySet.firstInstance || displaySet.instance;
  const LoadingIndicatorProgress = customizationService.getCustomization('ui.loadingIndicatorProgress');
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    className: 'DicomMicroscopyViewer',
    style: style,
    onClick: () => {
      if (viewportId !== activeViewportId) {
        setViewportActive(viewportId);
      }
    }
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    style: {
      ...style,
      display: 'none'
    }
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    style: {
      ...style
    },
    ref: overlayElement
  }, /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      width: '100%'
    }
  }, displaySet && firstInstance.imageId && /*#__PURE__*/react__rspack_import_0_default().createElement(_components_ViewportOverlay__rspack_import_3["default"], {
    overlayData: overlayData,
    displaySet: displaySet,
    instance: displaySet.instance,
    metadata: displaySet.metadata
  })))), /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    style: style,
    "data-viewportid": viewportId,
    ref: ref => {
      container.current = ref;
      resizeRef.current = ref;
    }
  }), isLoaded ? null : /*#__PURE__*/react__rspack_import_0_default().createElement(LoadingIndicatorProgress, {
    className: 'h-full w-full bg-black'
  }));
}, "hpxayOJizhXndjS5pWFZaN+is68=", false, function () {
  return [_ohif_core__rspack_import_6.useSystem];
}), areEqual), "hpxayOJizhXndjS5pWFZaN+is68=", false, function () {
  return [_ohif_core__rspack_import_6.useSystem];
});

// Check if the props are the same
_c2 = DicomMicroscopyViewport;
function areEqual(prevProps, nextProps) {
  if (prevProps.setViewportActive !== nextProps.setViewportActive) {
    return false;
  }
  if (prevProps.resizeRef !== nextProps.resizeRef) {
    return false;
  }
  if (prevProps.viewportId !== nextProps.viewportId) {
    return false;
  }
  if (prevProps.activeViewportId !== nextProps.activeViewportId) {
    return false;
  }
  if (prevProps.dataSource !== nextProps.dataSource) {
    return false;
  }
  const prevDisplaySets = prevProps.displaySets;
  const nextDisplaySets = nextProps.displaySets;
  if (prevDisplaySets.length !== nextDisplaySets.length) {
    return false;
  }

  // Check if the displaySets are the same
  for (let i = 0; i < prevDisplaySets.length; i++) {
    const prevDisplaySet = prevDisplaySets[i];
    const foundDisplaySet = nextDisplaySets.find(nextDisplaySet => nextDisplaySet.displaySetInstanceUID === prevDisplaySet.displaySetInstanceUID);
    if (!foundDisplaySet) {
      return false;
    }
    // Check if the displaySet's images are the same
    if (foundDisplaySet.images?.length !== prevDisplaySet.images?.length) {
      return false;
    }

    // Check if the displaySet's imageIds are the same
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
DicomMicroscopyViewport.displayName = 'DicomMicroscopyViewport';
/* export default */ const __rspack_default_export = (DicomMicroscopyViewport);
var _c, _c2;
$RefreshReg$(_c, "DicomMicroscopyViewport$React.memo");
$RefreshReg$(_c2, "DicomMicroscopyViewport");
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/dicom-microscopy/src/components/ViewportOverlay/index.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export),
  generateFromConfig: () => (generateFromConfig)
});
/* import */ var react__rspack_import_0 = __webpack_require__("../../../node_modules/react/index.js");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var classnames__rspack_import_1 = __webpack_require__("../../../node_modules/classnames/index.js");
/* import */ var classnames__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(classnames__rspack_import_1);
/* import */ var _listComponentGenerator__rspack_import_2 = __webpack_require__("../../../extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx");
/* import */ var _ViewportOverlay_css__rspack_import_3 = __webpack_require__("../../../extensions/dicom-microscopy/src/components/ViewportOverlay/ViewportOverlay.css");
/* import */ var _ViewportOverlay_css__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_ViewportOverlay_css__rspack_import_3);
/* import */ var _ohif_ui_next__rspack_import_4 = __webpack_require__("../../ui-next/src/index.ts");
/* import */ var _utils__rspack_import_5 = __webpack_require__("../../../extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts");
/* import */ var _ohif_core__rspack_import_6 = __webpack_require__("../../core/src/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };







const {
  formatPN
} = _ohif_core__rspack_import_6.utils;
/**
 *
 * @param {*} config is a configuration object that defines four lists of elements,
 * one topLeft, topRight, bottomLeft, bottomRight contents.
 * @param {*} extensionManager is used to load the image data.
 * @returns
 */
const generateFromConfig = ({
  config,
  overlayData,
  ...props
}) => {
  const {
    topLeft = [],
    topRight = [],
    bottomLeft = [],
    bottomRight = []
  } = overlayData ?? {};
  const topLeftClass = 'top-viewport left-viewport text-highlight';
  const topRightClass = 'top-viewport right-viewport-scrollbar text-highlight';
  const bottomRightClass = 'bottom-viewport right-viewport-scrollbar text-highlight';
  const bottomLeftClass = 'bottom-viewport left-viewport text-highlight';
  const overlay = 'absolute pointer-events-none microscopy-viewport-overlay';
  return /*#__PURE__*/react__rspack_import_0_default().createElement((react__rspack_import_0_default().Fragment), null, topLeft && topLeft.length > 0 && /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    "data-cy": 'viewport-overlay-top-left',
    className: classnames__rspack_import_1_default()(overlay, topLeftClass)
  }, (0,_listComponentGenerator__rspack_import_2["default"])({
    ...props,
    list: topLeft,
    itemGenerator
  })), topRight && topRight.length > 0 && /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    "data-cy": 'viewport-overlay-top-right',
    className: classnames__rspack_import_1_default()(overlay, topRightClass)
  }, (0,_listComponentGenerator__rspack_import_2["default"])({
    ...props,
    list: topRight,
    itemGenerator
  })), bottomRight && bottomRight.length > 0 && /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    "data-cy": 'viewport-overlay-bottom-right',
    className: classnames__rspack_import_1_default()(overlay, bottomRightClass)
  }, (0,_listComponentGenerator__rspack_import_2["default"])({
    ...props,
    list: bottomRight,
    itemGenerator
  })), bottomLeft && bottomLeft.length > 0 && /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    "data-cy": 'viewport-overlay-bottom-left',
    className: classnames__rspack_import_1_default()(overlay, bottomLeftClass)
  }, (0,_listComponentGenerator__rspack_import_2["default"])({
    ...props,
    list: bottomLeft,
    itemGenerator
  })));
};
const itemGenerator = props => {
  const {
    item
  } = props;
  const {
    title,
    value: valueFunc,
    condition,
    contents
  } = item;
  props.image = {
    ...props.image,
    ...props.metadata
  };
  props.formatDate = _ohif_ui_next__rspack_import_4.formatDICOMDate;
  props.formatTime = _utils__rspack_import_5.formatDICOMTime;
  props.formatPN = formatPN;
  props.formatNumberPrecision = _utils__rspack_import_5.formatNumberPrecision;
  if (condition && !condition(props)) {
    return null;
  }
  if (!contents && !valueFunc) {
    return null;
  }
  const value = valueFunc && valueFunc(props);
  const contentsValue = contents && contents(props) || [{
    className: 'mr-1',
    value: title
  }, {
    classname: 'mr-1 font-light',
    value
  }];
  return /*#__PURE__*/react__rspack_import_0_default().createElement("div", {
    key: item.id,
    className: "flex flex-row"
  }, contentsValue.map((content, idx) => /*#__PURE__*/react__rspack_import_0_default().createElement("span", {
    key: idx,
    className: content.className
  }, content.value)));
};
/* export default */ const __rspack_default_export = (generateFromConfig);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/dicom-microscopy/src/components/ViewportOverlay/listComponentGenerator.tsx"(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__rspack_default_export)
});
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };
const listComponentGenerator = props => {
  const {
    list,
    itemGenerator
  } = props;
  if (!list) {
    return;
  }
  return list.map(item => {
    if (!item) {
      return;
    }
    const generator = item.generator || itemGenerator;
    if (!generator) {
      throw new Error(`No generator for ${item}`);
    }
    return generator({
      ...props,
      item
    });
  });
};
/* export default */ const __rspack_default_export = (listComponentGenerator);
function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"../../../extensions/dicom-microscopy/src/components/ViewportOverlay/utils.ts"(module, __webpack_exports__, __webpack_require__) {
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
/* provided dependency */ var $ReactRefreshRuntime$ = { createSignatureFunctionForTransform: function() { return function(type) { return type; }; } };




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
function formatNumberPrecision(number, precision) {
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

function $RefreshSig$() { return function(type) { return type; }; }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=extensions_dicom-microscopy_src_DicomMicroscopyViewport_tsx.js.map