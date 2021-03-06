"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var ShapePivot = /** @class */ (function (_super) {
    __extends(ShapePivot, _super);
    function ShapePivot(wrap) {
        var _this = _super.call(this, wrap) || this;
        _this.style = __assign({}, _1.pivotBaseStyle, { left: '0', bottom: '0', background: '#bbb', transform: 'translateX(-50%) translateY(50%)' });
        _this.dom.className = 'mocking-frog-shape-pivot';
        _this.updateStyle();
        _this.initEvents();
        return _this;
    }
    ShapePivot.prototype.initEvents = function () {
        var _this = this;
        var lastW;
        var lastH;
        var downX, downY, isMoving;
        function onMouseDown(event) {
            event.preventDefault();
            lastW = parseFloat(this.wrap.style.width);
            lastH = parseFloat(this.wrap.style.height);
            var x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
            var y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
            downX = x;
            downY = y;
            isMoving = true;
        }
        function onMouseMove(event) {
            event.preventDefault();
            if (!isMoving) {
                return;
            }
            var x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
            var y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
            this.wrap.style.width = lastW + (downX - x) / this.wrap.scale + 'px';
            this.wrap.style.height = lastH + (y - downY) / this.wrap.scale + 'px';
            this.wrap.updateStyle();
        }
        function onMouseUp(event) {
            event.preventDefault();
            isMoving = false;
        }
        this.dom.addEventListener('mousedown', function (e) { return onMouseDown.bind(_this)(e); });
        this.dom.addEventListener('touchstart', function (e) { return onMouseDown.bind(_this)(e); });
        this.dom.addEventListener('mousemove', function (e) { return onMouseMove.bind(_this)(e); });
        this.dom.addEventListener('touchmove', function (e) { return onMouseMove.bind(_this)(e); });
        this.dom.addEventListener('mouseup', function (e) { return onMouseUp.bind(_this)(e); });
        this.dom.addEventListener('touchend', function (e) { return onMouseUp.bind(_this)(e); });
    };
    return ShapePivot;
}(_1.Pivot));
exports.ShapePivot = ShapePivot;
