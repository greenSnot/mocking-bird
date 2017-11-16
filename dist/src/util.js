"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyStyle(dom, style) {
    Object.keys(style).forEach(function (v) {
        dom.style[v] = style[v];
    });
}
exports.applyStyle = applyStyle;
function toStr(json) {
    if (typeof json === 'object') {
        if (json.length) {
            return '[' + json.map(function (i) { return toStr(i); }).join(',') + ']';
        }
        return '{' + Object.keys(json).map(function (key) {
            return key + ':' + toStr(json[key]);
        }).join(',') + '}';
    }
    if (typeof json === 'string') {
        return "'" + json + "'";
    }
    return json.toString();
}
exports.toStr = toStr;
function findClosestState(state, stateItem, gt) {
    if (gt === void 0) { gt = true; }
    var order = stateItem.order;
    var ltState;
    var ltOrder = -1;
    var gtState;
    var gtOrder = 999;
    Object.keys(state).forEach(function (i) {
        if (state[i].order < order && state[i].order > ltOrder) {
            ltOrder = state[i].order;
            ltState = state[i];
        }
        if (state[i].order > order && state[i].order < gtOrder) {
            gtOrder = state[i].order;
            gtState = state[i];
        }
    });
    return gt ? gtState : ltState;
}
exports.findClosestState = findClosestState;
