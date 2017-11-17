"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var wrap_1 = require("./wrap");
var posPivot_1 = require("./pivot/posPivot");
var shapePivot_1 = require("./pivot/shapePivot");
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
        background: depth % 2 ? 'rgba(80, 80, 80, 1)' : 'rgba(50, 50, 50, 1)',
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
                '-webkit-box-align': 'end',
            });
            var btn = document.createElement('button');
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
                root.onChange();
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
                root.onChange();
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
                    root.onChange();
                });
            }
            i.addEventListener('change', function (e) {
                state.value = this.value;
                state.onChange && state.onChange(state);
                root.onChange();
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
                root.onChange();
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
                    root.onChange();
                }
            });
            i.addEventListener('change', function () {
                state.value = parseFloat(this.value);
                state.onChange && state.onChange(state);
                root.onChange();
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
var MockingFrog = /** @class */ (function () {
    function MockingFrog(defaultStateMap, opt) {
        var _this = this;
        this.state = {};
        this.curState = 'temp';
        this.stateList = [];
        this.stateIdToStr = {};
        util_1.initFunctionMap(defaultStateMap);
        this.scale = opt.scale || 1;
        this.wrap = new wrap_1.MockingFrogWrap(this.scale, opt.style);
        this.wrap.dom.className = 'mocking-frog';
        this.shapePivot = new shapePivot_1.ShapePivot(this.wrap);
        this.posPivot = new posPivot_1.PosPivot(this.wrap);
        this.wrap.dom.appendChild(this.shapePivot.dom);
        this.wrap.dom.appendChild(this.posPivot.dom);
        var css = document.createElement('style');
        css.type = 'text/css';
        css.appendChild(document.createTextNode("\n      .mocking-frog * {\n        font-size: " + 12 * opt.scale + "px;\n        color: #fff;\n        font-family: arial,sans-serif;\n      }\n      .mocking-frog[hide=\"1\"] {\n        border: none!important;\n        min-width: 0!important;\n        min-height: 0!important;\n        width: 0!important;\n        height: 0!important;\n      }\n      .mocking-frog[hide=\"1\"] .mocking-frog-panel {\n        visibility: hidden;\n      }\n      .mocking-frog[hide=\"1\"] .mocking-frog-shape-pivot {\n        visibility: hidden;\n      }\n      .mocking-frog input {\n        background: transparent;\n        border: 0;\n        height: 40px;\n      }\n      .mocking-frog input[type=input] {\n        width: 100%;\n        border-bottom: 1px solid #fff;\n      }\n      .mocking-frog select {\n        border: 1px solid #fff;\n        background: transparent;\n        border-radius: 0;\n        height: 35px;\n      }\n      .mocking-frog input[type=checkbox] {\n        width: 30px;\n        height: 30px;\n      }\n      \n      .mocking-frog input[type=range] {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        width: 200px;\n        transform: translate(-50%, -50%);\n      }\n      \n      .mocking-frog input[type=range]::-webkit-slider-runnable-track {\n        -webkit-appearance: none;\n        background: #fff;\n        height: 2px;\n      }\n      \n      .mocking-frog input[type=range]:focus {\n        outline: none;\n      }\n      \n      .mocking-frog input[type=range]::-webkit-slider-thumb {\n        -webkit-appearance: none;\n        border: 2px solid;\n        border-radius: 50%;\n        height: 25px;\n        width: 25px;\n        max-width: 80px;\n        position: relative;\n        bottom: 11px;\n        background-color: #bbb;\n        cursor: -webkit-grab;\n      }\n      \n      .mocking-frog input[type=range]::-webkit-slider-thumb:active {\n        cursor: -webkit-grabbing;\n      }\n    "));
        document.getElementsByTagName("head")[0].appendChild(css);
        document.body.appendChild(this.wrap.dom);
        try {
            this.stateList = JSON.parse(localStorage.getItem(util_1.STORAGE_STATE_LIST));
            this.curState = localStorage.getItem(util_1.STORAGE_CUR_STATE);
            this.stateList.forEach(function (k) {
                _this.stateIdToStr[k] = localStorage.getItem(util_1.STORAGE_STATE_PREFIX + k);
            });
            this.changeState(this.curState);
        }
        catch (e) {
            this.stateList = Object.keys(defaultStateMap);
            this.curState = opt.curState;
            this.initOrder(defaultStateMap[this.curState]);
            this.stateList.forEach(function (i) {
                _this.stateIdToStr[i] = util_1.toStr(defaultStateMap[i]);
            });
            this.changeState(this.curState);
            this.save();
        }
        this.initPanel();
    }
    MockingFrog.prototype.initOrder = function (state) {
        var _this = this;
        Object.keys(state).forEach(function (i, index) {
            var item = state[i];
            if (types_1.detect(item) === 'folder') {
                _this.initOrder(item.value);
            }
            item.order = item.order >= 0 ? item.order : index;
        });
    };
    MockingFrog.prototype.update = function () {
        var _this = this;
        this.wrap.content.innerHTML = '';
        Object.keys(this.state).sort(function (a, b) { return (_this.state[a].order > _this.state[b].order ? 1 : -1); }).forEach(function (k) {
            var item = _this.state[k];
            _this.wrap.content.appendChild(renderItem(item, k, _this.state, _this));
        });
    };
    MockingFrog.prototype.onChange = function () {
        this.save();
    };
    MockingFrog.prototype.changeState = function (id) {
        this.curState = id;
        this.state = eval('(function(){return ' + this.stateIdToStr[id] + ';})()');
        function restoreFunction(s) {
            Object.keys(s).forEach(function (k) {
                Object.keys(s[k]).forEach(function (i) {
                    if (typeof s[k][i] === 'string' && util_1.functionMap[s[k][i]]) {
                        s[k][i] = util_1.functionMap[s[k][i]];
                    }
                });
                if (types_1.detect(s[k]) === 'folder') {
                    restoreFunction(s[k].value);
                }
            });
        }
        restoreFunction(this.state);
        this.update();
    };
    MockingFrog.prototype.initPanel = function () {
        this.panel = document.createElement('div');
        this.panel.className = 'mocking-frog-panel';
        util_1.applyStyle(this.panel, {
            background: 'rgba(0, 0, 0, 0.9)',
            height: '50px',
            'margin-top': '5px',
            display: '-webkit-box',
            '-webkit-box-pack': 'end',
            '-webkit-box-align': 'center',
        });
        this.wrap.dom.appendChild(this.panel);
        this.initBtnClone();
        this.initBtnDel();
        this.initBtnReset();
        this.initStateList();
        this.panel.appendChild(this.selectStateList);
        this.panel.appendChild(this.btnClone);
        this.panel.appendChild(this.btnDel);
        this.panel.appendChild(this.btnRest);
    };
    MockingFrog.prototype.initStateList = function () {
        this.selectStateList = document.createElement('select');
        var self = this;
        this.selectStateList.addEventListener('change', function () {
            self.changeState(this.value);
            self.saveCurState();
        });
        this.updateStateList();
    };
    MockingFrog.prototype.updateStateList = function () {
        var _this = this;
        this.selectStateList.innerHTML = '';
        this.stateList.forEach(function (s) {
            var option = document.createElement('option');
            option.value = s;
            option.innerText = s;
            _this.selectStateList.appendChild(option);
        });
        this.selectStateList.value = this.curState;
    };
    MockingFrog.prototype.initBtnDel = function () {
        var _this = this;
        this.btnDel = document.createElement('button');
        this.btnDel.innerText = 'del';
        this.btnDel.addEventListener('click', function () {
            if (_this.stateList.length === 1) {
                return;
            }
            _this.stateList = _this.stateList.filter(function (i) { return i !== _this.curState; });
            _this.curState = _this.stateList[0];
            localStorage.removeItem(util_1.STORAGE_STATE_PREFIX + _this.curState);
            _this.changeState(_this.curState);
            _this.updateStateList();
        });
    };
    MockingFrog.prototype.initBtnClone = function () {
        var _this = this;
        this.btnClone = document.createElement('button');
        this.btnClone.innerText = 'clone';
        this.btnClone.addEventListener('click', function () {
            var id = prompt('state id?') || 'temp';
            _this.stateList.push(id);
            _this.curState = id;
            _this.stateIdToStr[id] = util_1.toStr(_this.state);
            _this.save();
            _this.updateStateList();
        });
    };
    MockingFrog.prototype.initBtnReset = function () {
        this.btnRest = document.createElement('button');
        this.btnRest.addEventListener('click', function () {
            localStorage.clear();
            location.reload();
        });
        this.btnRest.innerText = 'reset';
    };
    MockingFrog.prototype.save = function () {
        this.saveStateList();
        this.saveCurState();
        this.saveStateDetail();
    };
    MockingFrog.prototype.saveStateList = function () {
        localStorage.setItem(util_1.STORAGE_STATE_LIST, JSON.stringify(this.stateList));
    };
    MockingFrog.prototype.saveCurState = function () {
        localStorage.setItem(util_1.STORAGE_CUR_STATE, this.curState);
    };
    MockingFrog.prototype.saveStateDetail = function () {
        this.stateIdToStr[this.curState] = util_1.toStr(this.state);
        localStorage.setItem(util_1.STORAGE_STATE_PREFIX + this.curState, this.stateIdToStr[this.curState]);
    };
    return MockingFrog;
}());
exports.MockingFrog = MockingFrog;
