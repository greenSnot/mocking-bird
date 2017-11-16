"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var defaultStyle = {
    width: '200px',
    'min-width': '200px',
    height: '250px',
    'min-height': '200px',
    background: 'rgb(255, 255, 255)',
    position: 'fixed',
    border: '5px solid #fff',
    top: '20px',
    right: '20px',
};
var MockingFrogWrap = /** @class */ (function () {
    function MockingFrogWrap(style) {
        this.style = defaultStyle;
        this.dom = document.createElement('div');
        this.style = style ? __assign({}, this.style, style) : this.style;
        util_1.applyStyle(this.dom, {
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
        });
        this.content = document.createElement('div');
        util_1.applyStyle(this.content, {
            overflow: 'scroll',
            '-webkit-box-flex': 1,
        });
        this.dom.appendChild(this.content);
        this.updateStyle();
    }
    MockingFrogWrap.prototype.updateStyle = function () {
        var _this = this;
        Object.keys(this.style).forEach(function (v) {
            _this.dom.style[v] = _this.style[v];
        });
    };
    return MockingFrogWrap;
}());
exports.MockingFrogWrap = MockingFrogWrap;
