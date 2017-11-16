"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function detect(i) {
    if (typeof i.value === 'string') {
        if (typeof i.limit === 'object') {
            return 'select';
        }
        return 'input';
    }
    if (typeof i.value === 'number') {
        if (typeof i.limit === 'object') {
            return 'range';
        }
        return 'input';
    }
    if (typeof i.active === 'boolean') {
        return 'folder';
    }
    if (typeof i.value === 'function') {
        return 'btn';
    }
    if (typeof i.value === 'boolean') {
        return 'check';
    }
}
exports.detect = detect;
function isRange(i) {
    return typeof i.value === 'string' && typeof i.limit === 'object';
}
exports.isRange = isRange;
