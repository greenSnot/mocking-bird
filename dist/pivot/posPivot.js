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
var PosPivot = /** @class */ (function (_super) {
    __extends(PosPivot, _super);
    function PosPivot(wrap) {
        var _this = _super.call(this, wrap) || this;
        _this.style = __assign({}, _1.pivotBaseStyle, { right: '0', top: '0', background: '#03A9F4', transform: 'translateX(50%) translateY(-50%)' });
        _this.updateStyle();
        _this.initEvents();
        return _this;
    }
    PosPivot.prototype.initEvents = function () {
        var _this = this;
        var lastTop;
        var lastRight;
        var downX, downY, isMoving;
        function onMouseDown(event) {
            lastTop = parseFloat(this.wrap.style.top);
            lastRight = parseFloat(this.wrap.style.right);
            var x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
            var y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
            downX = x;
            downY = y;
            isMoving = true;
        }
        function onMouseMove(event) {
            if (!isMoving) {
                return;
            }
            var x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].pageX);
            var y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].pageY);
            this.wrap.style.right = lastRight + downX - x + 'px';
            this.wrap.style.top = lastTop + y - downY + 'px';
            this.wrap.updateStyle();
        }
        function onMouseUp(event) {
            isMoving = false;
        }
        this.dom.addEventListener('mousedown', function (e) { return onMouseDown.bind(_this)(e); });
        this.dom.addEventListener('touchstart', function (e) { return onMouseDown.bind(_this)(e); });
        document.body.addEventListener('mousemove', function (e) { return onMouseMove.bind(_this)(e); });
        document.body.addEventListener('touchmove', function (e) { return onMouseMove.bind(_this)(e); });
        this.dom.addEventListener('mouseup', function (e) { return onMouseUp.bind(_this)(e); });
        this.dom.addEventListener('touchend', function (e) { return onMouseUp.bind(_this)(e); });
    };
    return PosPivot;
}(_1.Pivot));
exports.PosPivot = PosPivot;
