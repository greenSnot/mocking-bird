"use strict";
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
            this.save();
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
            self.opt.stateListOnChange && self.opt.stateListOnChange(this.value);
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
