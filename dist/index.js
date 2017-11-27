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
var posPivot_1 = require("./pivot/posPivot");
var shapePivot_1 = require("./pivot/shapePivot");
var util_1 = require("./util");
var renderer_1 = require("./renderer");
var style_1 = require("./style");
var MockingFrog = /** @class */ (function () {
    function MockingFrog(defaultStateMap, curState, opt) {
        this.state = {};
        this.curState = 'temp';
        this.stateList = [];
        this.stateIdToStr = {};
        this.panelBtnStyle = {
            height: '35px',
            display: '-webkit-box',
            '-webkit-box-align': 'center',
            '-webkit-box-pack': 'center',
            margin: '0 0 0 5px',
            cursor: 'pointer',
            padding: '0 5px 0 5px',
            background: 'rgb(0, 150, 136)',
        };
        this.opt = opt || {};
        util_1.initFunctionMap(defaultStateMap);
        this.scale = this.opt.scale || 1;
        style_1.initCommonStyle(this.scale);
        this.initWrap();
        this.initState(defaultStateMap, curState);
        this.initPanel();
    }
    MockingFrog.prototype.initWrap = function () {
        this.wrap = new wrap_1.MockingFrogWrap(this.scale, {
            wrapStyle: this.opt.wrapStyle,
            contentStyle: this.opt.contentStyle,
        });
        this.wrap.dom.className = 'mocking-frog';
        this.shapePivot = new shapePivot_1.ShapePivot(this.wrap);
        this.posPivot = new posPivot_1.PosPivot(this.wrap);
        this.wrap.dom.appendChild(this.shapePivot.dom);
        this.wrap.dom.appendChild(this.posPivot.dom);
        document.body.appendChild(this.wrap.dom);
    };
    MockingFrog.prototype.initState = function (defaultStateMap, curState) {
        var _this = this;
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
            this.curState = curState;
            this.initOrder(defaultStateMap[this.curState]);
            this.stateList.forEach(function (i) {
                _this.stateIdToStr[i] = util_1.toStr(defaultStateMap[i]);
            });
            this.changeState(this.curState);
            this.saveStateList();
            this.saveCurState();
            this.stateList.forEach(function (s) {
                localStorage.setItem(util_1.STORAGE_STATE_PREFIX + s, _this.stateIdToStr[s]);
            });
        }
    };
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
            _this.wrap.content.appendChild(renderer_1.renderItem(item, k, _this.state, _this));
        });
    };
    MockingFrog.prototype.onChange = function (state) {
        if (this.opt.onChange) {
            this.opt.onChange(state);
        }
        else {
            this.save();
        }
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
            background: 'rgba(0, 0, 0, 0.5)',
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
        this.panel.appendChild(this.selectStateDropdown);
        this.panel.appendChild(this.btnClone);
        this.panel.appendChild(this.btnDel);
        this.panel.appendChild(this.btnReset);
    };
    MockingFrog.prototype.initStateList = function () {
        this.selectStateDropdown = document.createElement('select');
        var self = this;
        this.selectStateDropdown.addEventListener('change', function () {
            self.changeState(this.value);
            self.saveCurState();
            self.opt.stateDropdownOnChange && self.opt.stateDropdownOnChange(this.value);
        });
        this.updateStateList();
    };
    MockingFrog.prototype.updateStateList = function () {
        var _this = this;
        this.selectStateDropdown.innerHTML = '';
        this.stateList.forEach(function (s) {
            var option = document.createElement('option');
            option.value = s;
            option.innerText = s;
            _this.selectStateDropdown.appendChild(option);
        });
        this.selectStateDropdown.value = this.curState;
    };
    MockingFrog.prototype.initBtnDel = function () {
        var _this = this;
        this.btnDel = document.createElement('div');
        util_1.applyStyle(this.btnDel, this.panelBtnStyle);
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
        this.btnClone = document.createElement('div');
        util_1.applyStyle(this.btnClone, this.panelBtnStyle);
        this.btnClone.innerText = 'clone';
        this.btnClone.addEventListener('click', function () {
            var id = prompt('state id?') || 'temp';
            _this.stateList.push(id);
            _this.curState = id;
            _this.save();
            _this.updateStateList();
        });
    };
    MockingFrog.prototype.initBtnReset = function () {
        this.btnReset = document.createElement('div');
        util_1.applyStyle(this.btnReset, __assign({}, this.panelBtnStyle, { margin: '0 5px 0 5px' }));
        this.btnReset.addEventListener('click', function () {
            localStorage.clear();
            location.reload();
        });
        this.btnReset.innerText = 'reset';
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
