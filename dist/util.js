"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var md5 = require("md5");
function applyStyle(dom, style) {
    Object.keys(style).forEach(function (v) {
        dom.style[v] = style[v];
    });
}
exports.applyStyle = applyStyle;
var functionId = 0;
exports.functionMap = {};
function doToStr(json) {
    if (typeof json === 'object') {
        if (json.length) {
            return '[' + json.map(function (i) { return toStr(i); }).join(',') + ']';
        }
        return '{' + Object.keys(json).map(function (key) {
            return key + ':' + doToStr(json[key]);
        }).join(',') + '}';
    }
    if (typeof json === 'string') {
        return "'" + json + "'";
    }
    if (typeof json === 'function') {
        var id = json.id;
        return "'" + id + "'";
    }
    return json.toString();
}
exports.doToStr = doToStr;
function toStr(json) {
    functionId = 0;
    return doToStr(json);
}
exports.toStr = toStr;
function initFunctionMap(json) {
    functionId = 0;
    doInitFunctionMap(json);
}
exports.initFunctionMap = initFunctionMap;
function doInitFunctionMap(json) {
    if (typeof json === 'object') {
        Object.keys(json).forEach(function (i) { return doInitFunctionMap(json[i]); });
    }
    if (typeof json === 'function') {
        var id = functionId++;
        json.id = id;
        exports.functionMap[id] = json;
    }
}
exports.doInitFunctionMap = doInitFunctionMap;
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
exports.STORAGE_STATE_LIST = 'mockingfrog_state_list_' + md5(location.href);
exports.STORAGE_CUR_STATE = 'mockingfrog_cur_state_' + md5(location.href);
exports.STORAGE_STATE_PREFIX = 'mockingfrog_state_' + md5(location.href) + '_';
