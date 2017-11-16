"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
exports.pivotBaseStyle = {
    width: '30px',
    height: '30px',
    position: 'absolute',
    border: '3px solid #fff',
    'border-radius': '18px',
    'box-shadow': '#ccc 0px 1px 4px 3px',
    'z-index': 10,
};
var Pivot = /** @class */ (function () {
    function Pivot(wrap) {
        this.style = {};
        this.wrap = wrap;
        this.init();
    }
    Pivot.prototype.updateStyle = function () {
        util_1.applyStyle(this.dom, this.style);
    };
    Pivot.prototype.init = function () {
        this.dom = document.createElement('div');
    };
    return Pivot;
}());
exports.Pivot = Pivot;
