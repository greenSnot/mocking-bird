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
var types_1 = require("./types");
var wrap_1 = require("./wrap");
var util_1 = require("./util");
function renderItem(state, key, parent, root, depth) {
    if (depth === void 0) { depth = 1; }
    var dom = document.createElement('div');
    var content = document.createElement('div');
    var contentStyle = {
        display: '-webkit-box',
        '-webkit-box-flex': 1,
        '-webkit-box-orient': 'vertical',
        '-webkit-box-align': 'end',
    };
    util_1.applyStyle(dom, {
        display: '-webkit-box',
        'margin-bottom': '5px',
        padding: '5px 10px 5px 10px',
        background: depth % 2 ? 'rgba(80, 80, 80, 0.8)' : 'rgba(170, 170, 170, 0.8)',
        color: '#fff',
    });
    util_1.applyStyle(content, contentStyle);
    var name = document.createElement('div');
    var nameWrap = document.createElement('div');
    util_1.applyStyle(nameWrap, {
        display: '-webkit-box',
        'margin-right': '10px',
        height: '40px',
        '-webkit-box-align': 'center',
    });
    var orderUp = document.createElement('div');
    var orderDown = document.createElement('div');
    var orderWrap = document.createElement('div');
    util_1.applyStyle(orderWrap, {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        'margin-right': '5px',
    });
    util_1.applyStyle(orderUp, {
        width: '0px',
        'border-bottom': '10px solid #fff',
        'border-left': '5px solid transparent',
        'border-right': '5px solid transparent',
        'margin-bottom': '2px',
    });
    util_1.applyStyle(orderDown, {
        width: '0px',
        'border-top': '10px solid #fff',
        'border-left': '5px solid transparent',
        'border-right': '5px solid transparent',
    });
    dom.appendChild(nameWrap);
    dom.appendChild(content);
    name.innerText = key;
    orderWrap.appendChild(orderUp);
    orderWrap.appendChild(orderDown);
    nameWrap.appendChild(orderWrap);
    nameWrap.appendChild(name);
    orderUp.addEventListener('click', function () {
        var closest = util_1.findClosestState(parent, state, false);
        if (closest) {
            var order = closest.order;
            closest.order = state.order;
            state.order = order;
            root.update();
            root.save();
        }
    });
    orderDown.addEventListener('click', function () {
        var closest = util_1.findClosestState(parent, state);
        if (closest) {
            var order = closest.order;
            closest.order = state.order;
            state.order = order;
            root.update();
            root.save();
        }
    });
    var map = {
        folder: function () {
            var i = document.createElement('div');
            util_1.applyStyle(i, {
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                width: '100%',
                '-webkit-box-align': 'end',
            });
            var btn = document.createElement('div');
            util_1.applyStyle(btn, __assign({}, root.panelBtnStyle, { width: '30px', 'margin-bottom': '5px' }));
            btn.innerText = state.active ? '-' : '+';
            i.appendChild(btn);
            var wrap = new wrap_1.MockingFrogWrap(root.scale);
            wrap.content.style.display = state.active ? 'block' : 'none';
            Object.keys(state.value).sort(function (a, b) { return state.value[a].order > state.value[b].order ? 1 : -1; }).forEach(function (k) {
                var item = state.value[k];
                wrap.content.appendChild(renderItem(item, k, state.value, root, depth + 1));
            });
            btn.addEventListener('click', function () {
                state.active = wrap.content.style.display === 'none';
                wrap.content.style.display = state.active ? 'block' : 'none';
                btn.innerText = state.active ? '-' : '+';
                state.onChange && state.onChange(state);
                root.onChange(state);
            });
            i.appendChild(wrap.content);
            return i;
        },
        select: function () {
            var select = document.createElement('select');
            state.limit.forEach(function (v) {
                var option = document.createElement('option');
                option.value = v;
                option.innerText = v;
                select.appendChild(option);
            });
            select.value = state.value;
            select.addEventListener('change', function (e) {
                state.value = this.value;
                state.onChange && state.onChange(state);
                root.onChange(state);
            });
            return select;
        },
        btn: function () {
            var i = document.createElement('div');
            util_1.applyStyle(i, {
                width: '100%',
                height: '40px',
            });
            i.addEventListener('click', state.value);
            return i;
        },
        input: function () {
            var i = document.createElement('input');
            i.setAttribute('type', 'input');
            i.value = state.value;
            if (state.immediatelyChange) {
                i.addEventListener('input', function (e) {
                    state.value = this.value;
                    state.onChange && state.onChange(state);
                    root.onChange(state);
                });
            }
            i.addEventListener('change', function (e) {
                state.value = this.value;
                state.onChange && state.onChange(state);
                root.onChange(state);
            });
            return i;
        },
        check: function () {
            var i = document.createElement('input');
            i.setAttribute('type', 'checkbox');
            i.checked = state.value;
            i.addEventListener('change', function () {
                state.value = this.checked;
                state.onChange && state.onChange(state);
                root.onChange(state);
            });
            return i;
        },
        range: function () {
            var wrap = document.createElement('div');
            var rangeWrap = document.createElement('div');
            util_1.applyStyle(wrap, {
                display: '-webkit-box',
                '-webkit-box-orient': 'horizontal',
                '-webkit-box-align': 'center',
                height: '40px',
                width: '100%',
                'min-width': '100px',
            });
            util_1.applyStyle(rangeWrap, {
                display: '-webkit-box',
                '-webkit-box-orient': 'horizontal',
                '-webkit-box-align': 'center',
                position: 'relative',
                '-webkit-box-flex': 1,
                'margin-right': '10px',
            });
            var num = document.createElement('div');
            util_1.applyStyle(num, {
                'min-width': '40px',
            });
            var i = document.createElement('input');
            util_1.applyStyle(i, {
                width: '100%',
            });
            i.setAttribute('type', 'range');
            i.setAttribute('min', state.limit.min);
            i.setAttribute('max', state.limit.max);
            i.setAttribute('step', state.limit.step);
            i.value = state.value;
            i.addEventListener('input', function () {
                num.innerText = this.value;
                state.value = parseFloat(this.value);
                if (state.immediatelyChange) {
                    root.onChange(state);
                }
            });
            i.addEventListener('change', function () {
                state.value = parseFloat(this.value);
                state.onChange && state.onChange(state);
                root.onChange(state);
            });
            num.innerText = state.value;
            rangeWrap.appendChild(i);
            wrap.appendChild(rangeWrap);
            wrap.appendChild(num);
            return wrap;
        },
    };
    content.appendChild(map[types_1.detect(state)]());
    return dom;
}
exports.renderItem = renderItem;
