/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pivot_posPivot__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pivot_shapePivot__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(6);





function renderItem(state, key, parent, root) {
    const dom = document.createElement('div');
    const content = document.createElement('div');
    const contentStyle = {
        display: '-webkit-box',
        '-webkit-box-flex': 1,
        '-webkit-box-orient': 'vertical',
        '-webkit-box-align': 'end',
    };
    Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(dom, {
        display: '-webkit-box',
        'margin-bottom': '5px',
        padding: '5px 10px 5px 10px',
        background: '#ffc107',
        color: '#fff',
    });
    Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(content, contentStyle);
    const name = document.createElement('div');
    const nameWrap = document.createElement('div');
    Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(nameWrap, {
        display: '-webkit-box',
        'margin-right': '10px',
        height: '40px',
        '-webkit-box-align': 'center',
    });
    const orderUp = document.createElement('div');
    const orderDown = document.createElement('div');
    const orderWrap = document.createElement('div');
    Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(orderWrap, {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        'margin-right': '5px',
    });
    Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(orderUp, {
        width: '0px',
        'border-bottom': '10px solid #fff',
        'border-left': '5px solid transparent',
        'border-right': '5px solid transparent',
        'margin-bottom': '2px',
    });
    Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(orderDown, {
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
    orderUp.addEventListener('click', () => {
        const closest = Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* findClosestState */])(parent, state, false);
        if (closest) {
            const order = closest.order;
            closest.order = state.order;
            state.order = order;
            root.update();
            root.save();
        }
    });
    orderDown.addEventListener('click', () => {
        const closest = Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* findClosestState */])(parent, state);
        if (closest) {
            const order = closest.order;
            closest.order = state.order;
            state.order = order;
            root.update();
            root.save();
        }
    });
    const map = {
        folder: () => {
            const i = document.createElement('div');
            Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(i, {
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-box-align': 'end',
            });
            const btn = document.createElement('button');
            btn.innerText = state.active ? '-' : '+';
            i.appendChild(btn);
            const wrap = new __WEBPACK_IMPORTED_MODULE_1__wrap__["a" /* MockingFrogWrap */](root.scale);
            wrap.content.style.display = state.active ? 'block' : 'none';
            Object.keys(state.value).sort((a, b) => state.value[a].order > state.value[b].order ? 1 : -1).forEach(k => {
                const item = state.value[k];
                wrap.content.appendChild(renderItem(item, k, state.value, root));
            });
            btn.addEventListener('click', () => {
                state.active = wrap.content.style.display === 'none';
                wrap.content.style.display = state.active ? 'block' : 'none';
                btn.innerText = state.active ? '-' : '+';
                state.onChange(state);
                root.onChange();
            });
            i.appendChild(wrap.content);
            return i;
        },
        select: () => {
            const select = document.createElement('select');
            state.limit.forEach(v => {
                const option = document.createElement('option');
                option.value = v;
                option.innerText = v;
                select.appendChild(option);
            });
            select.value = state.value;
            select.addEventListener('change', function (e) {
                state.value = this.value;
                state.onChange(state);
                root.onChange();
            });
            return select;
        },
        btn: () => {
            const i = document.createElement('button');
            i.innerText = 'btn';
            i.addEventListener('click', state.value);
            return i;
        },
        input: () => {
            const i = document.createElement('input');
            i.setAttribute('type', 'input');
            i.value = state.value;
            if (state.immediatelyChange) {
                i.addEventListener('input', function (e) {
                    state.value = this.value;
                    state.onChange(state);
                    root.onChange();
                });
            }
            i.addEventListener('change', function (e) {
                state.value = this.value;
                state.onChange(state);
                root.onChange();
            });
            return i;
        },
        check: () => {
            const i = document.createElement('input');
            i.setAttribute('type', 'checkbox');
            i.checked = state.value;
            i.addEventListener('change', function () {
                state.value = this.checked;
                state.onChange(state);
                root.onChange();
            });
            return i;
        },
        range: () => {
            const wrap = document.createElement('div');
            const rangeWrap = document.createElement('div');
            Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(wrap, {
                display: '-webkit-box',
                '-webkit-box-orient': 'horizontal',
                '-webkit-box-align': 'center',
                height: '40px',
                width: '100%',
            });
            Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(rangeWrap, {
                display: '-webkit-box',
                '-webkit-box-orient': 'horizontal',
                '-webkit-box-align': 'center',
                position: 'relative',
                '-webkit-box-flex': 1,
                'margin-right': '10px',
            });
            const num = document.createElement('div');
            Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(num, {
                'min-width': '40px',
            });
            const i = document.createElement('input');
            Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(i, {
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
                state.onChange(state);
                root.onChange();
            });
            num.innerText = state.value;
            rangeWrap.appendChild(i);
            wrap.appendChild(rangeWrap);
            wrap.appendChild(num);
            return wrap;
        },
    };
    content.appendChild(map[Object(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* detect */])(state)]());
    return dom;
}
class MockingFrog {
    constructor(defaultStateMap, opt) {
        this.state = {};
        this.curState = 'temp';
        this.stateList = [];
        this.stateIdToStr = {};
        Object(__WEBPACK_IMPORTED_MODULE_4__util__["d" /* initFunctionMap */])(defaultStateMap);
        this.scale = opt.scale || 1;
        this.wrap = new __WEBPACK_IMPORTED_MODULE_1__wrap__["a" /* MockingFrogWrap */](this.scale, opt.style);
        this.wrap.dom.className = 'mocking-frog';
        this.shapePivot = new __WEBPACK_IMPORTED_MODULE_3__pivot_shapePivot__["a" /* ShapePivot */](this.wrap);
        this.posPivot = new __WEBPACK_IMPORTED_MODULE_2__pivot_posPivot__["a" /* PosPivot */](this.wrap);
        this.wrap.dom.appendChild(this.shapePivot.dom);
        this.wrap.dom.appendChild(this.posPivot.dom);
        const css = document.createElement('style');
        css.type = 'text/css';
        css.appendChild(document.createTextNode(`
      .mocking-frog * {
        font-size: ${12 * opt.scale}px;
        color: #fff;
        font-family: arial,sans-serif;
      }
      .mocking-frog input {
        background: transparent;
        border: 0;
        height: 40px;
      }
      .mocking-frog input[type=input] {
        width: 100%;
        border-bottom: 1px solid #fff;
      }
      .mocking-frog select {
        border: 1px solid #fff;
        background: transparent;
        border-radius: 0;
        height: 35px;
      }
      .mocking-frog input[type=checkbox] {
        width: 30px;
        height: 30px;
      }
      
      .mocking-frog input[type=range] {
        -webkit-appearance: none;
        -moz-appearance: none;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 200px;
        transform: translate(-50%, -50%);
      }
      
      .mocking-frog input[type=range]::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        background: #fff;
        height: 2px;
      }
      
      .mocking-frog input[type=range]:focus {
        outline: none;
      }
      
      .mocking-frog input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 2px solid;
        border-radius: 50%;
        height: 25px;
        width: 25px;
        max-width: 80px;
        position: relative;
        bottom: 11px;
        background-color: #ff9632;
        cursor: -webkit-grab;
      }
      
      .mocking-frog input[type=range]::-webkit-slider-thumb:active {
        cursor: -webkit-grabbing;
      }
    `));
        document.getElementsByTagName("head")[0].appendChild(css);
        document.body.appendChild(this.wrap.dom);
        try {
            this.stateList = JSON.parse(localStorage.getItem('mockingfrog_state_list'));
            this.curState = localStorage.getItem('mockingfrog_cur_state');
            this.stateList.forEach(k => {
                this.stateIdToStr[k] = localStorage.getItem('mockingfrog_state_id_' + k);
            });
            this.changeState(this.curState);
        }
        catch (e) {
            this.stateList = Object.keys(defaultStateMap);
            this.curState = opt.curState;
            this.initOrder(defaultStateMap[this.curState]);
            this.stateList.forEach(i => {
                this.stateIdToStr[i] = Object(__WEBPACK_IMPORTED_MODULE_4__util__["e" /* toStr */])(defaultStateMap[i]);
            });
            this.changeState(this.curState);
            this.save();
        }
        this.initPanel();
    }
    initOrder(state) {
        Object.keys(state).forEach((i, index) => {
            const item = state[i];
            if (Object(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* detect */])(item) === 'folder') {
                this.initOrder(item.value);
            }
            item.order = item.order >= 0 ? item.order : index;
        });
    }
    update() {
        this.wrap.content.innerHTML = '';
        Object.keys(this.state).sort((a, b) => (this.state[a].order > this.state[b].order ? 1 : -1)).forEach(k => {
            const item = this.state[k];
            this.wrap.content.appendChild(renderItem(item, k, this.state, this));
        });
    }
    onChange() {
        this.save();
    }
    changeState(id) {
        this.curState = id;
        this.state = eval('(function(){return ' + this.stateIdToStr[id] + ';})()');
        function restoreFunction(s) {
            Object.keys(s).forEach(k => {
                Object.keys(s[k]).forEach(i => {
                    if (typeof s[k][i] === 'string' && __WEBPACK_IMPORTED_MODULE_4__util__["c" /* functionMap */][s[k][i]]) {
                        s[k][i] = __WEBPACK_IMPORTED_MODULE_4__util__["c" /* functionMap */][s[k][i]];
                    }
                });
                if (Object(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* detect */])(s[k]) === 'folder') {
                    restoreFunction(s[k].value);
                }
            });
        }
        restoreFunction(this.state);
        this.update();
    }
    initPanel() {
        this.panel = document.createElement('div');
        Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* applyStyle */])(this.panel, {
            background: '#ff9800',
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
    }
    initStateList() {
        this.selectStateList = document.createElement('select');
        const self = this;
        this.selectStateList.addEventListener('change', function () {
            self.changeState(this.value);
            self.saveCurState();
        });
        this.updateStateList();
    }
    updateStateList() {
        this.selectStateList.innerHTML = '';
        this.stateList.forEach(s => {
            const option = document.createElement('option');
            option.value = s;
            option.innerText = s;
            this.selectStateList.appendChild(option);
        });
        this.selectStateList.value = this.curState;
    }
    initBtnDel() {
        this.btnDel = document.createElement('button');
        this.btnDel.innerText = 'del';
        this.btnDel.addEventListener('click', () => {
            if (this.stateList.length === 1) {
                return;
            }
            this.stateList = this.stateList.filter(i => i !== this.curState);
            this.curState = this.stateList[0];
            localStorage.removeItem('mockingfrog_state_id_' + this.curState);
            this.changeState(this.curState);
            this.updateStateList();
        });
    }
    initBtnClone() {
        this.btnClone = document.createElement('button');
        this.btnClone.innerText = 'clone';
        this.btnClone.addEventListener('click', () => {
            const id = prompt('state id?') || 'temp';
            this.stateList.push(id);
            this.curState = id;
            this.stateIdToStr[id] = Object(__WEBPACK_IMPORTED_MODULE_4__util__["e" /* toStr */])(this.state);
            this.save();
            this.updateStateList();
        });
    }
    initBtnReset() {
        this.btnRest = document.createElement('button');
        this.btnRest.addEventListener('click', () => {
            localStorage.clear();
            location.reload();
        });
        this.btnRest.innerText = 'reset';
    }
    save() {
        this.saveStateList();
        this.saveCurState();
        this.saveStateDetail();
    }
    saveStateList() {
        localStorage.setItem('mockingfrog_state_list', JSON.stringify(this.stateList));
    }
    saveCurState() {
        localStorage.setItem('mockingfrog_cur_state', this.curState);
    }
    saveStateDetail() {
        this.stateIdToStr[this.curState] = Object(__WEBPACK_IMPORTED_MODULE_4__util__["e" /* toStr */])(this.state);
        localStorage.setItem('mockingfrog_state_id_' + this.curState, this.stateIdToStr[this.curState]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["MockingFrog"] = MockingFrog;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pivotBaseStyle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(6);

let pivotBaseStyle = {
    width: '30px',
    height: '30px',
    position: 'absolute',
    border: '3px solid #fff',
    'border-radius': '18px',
    'z-index': 10,
};
class Pivot {
    constructor(wrap) {
        this.style = {};
        this.wrap = wrap;
        this.init();
    }
    updateStyle() {
        Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* applyStyle */])(this.dom, this.style);
    }
    init() {
        this.dom = document.createElement('div');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pivot;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(6);

const defaultStyle = {
    width: '316px',
    'min-width': '316px',
    height: '250px',
    'min-height': '200px',
    border: '5px solid rgba(235, 235, 235, 0.54)',
    position: 'fixed',
    top: '20px',
    right: '20px',
    'transform-origin': '100% 0',
    transform: '',
};
class MockingFrogWrap {
    constructor(scale, style) {
        this.style = defaultStyle;
        this.dom = document.createElement('div');
        this.style = style ? Object.assign({}, this.style, style) : this.style;
        this.scale = scale;
        this.style.transform = 'scale(' + this.scale + ')';
        this.style.width = localStorage.getItem('mocking_frog_wrap_width') || this.style.width;
        this.style.height = localStorage.getItem('mocking_frog_wrap_height') || this.style.height;
        this.style.top = localStorage.getItem('mocking_frog_wrap_top') || this.style.top;
        this.style.right = localStorage.getItem('mocking_frog_wrap_right') || this.style.right;
        Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* applyStyle */])(this.dom, {
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
        });
        this.content = document.createElement('div');
        Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* applyStyle */])(this.content, {
            overflow: 'scroll',
            '-webkit-box-flex': 1,
        });
        this.dom.appendChild(this.content);
        this.updateStyle();
    }
    updateStyle() {
        localStorage.setItem('mocking_frog_wrap_width', this.style.width);
        localStorage.setItem('mocking_frog_wrap_height', this.style.height);
        localStorage.setItem('mocking_frog_wrap_top', this.style.top);
        localStorage.setItem('mocking_frog_wrap_right', this.style.right);
        Object.keys(this.style).forEach(v => {
            this.dom.style[v] = this.style[v];
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MockingFrogWrap;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

class PosPivot extends __WEBPACK_IMPORTED_MODULE_0____["a" /* Pivot */] {
    constructor(wrap) {
        super(wrap);
        this.style = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0____["b" /* pivotBaseStyle */], { right: '0', top: '0', background: '#03A9F4', transform: 'translateX(50%) translateY(-50%)' });
        this.updateStyle();
        this.initEvents();
    }
    initEvents() {
        let lastTop;
        let lastRight;
        let downX, downY, isMoving;
        function onMouseDown(event) {
            event.stopPropagation();
            lastTop = parseFloat(this.wrap.style.top);
            lastRight = parseFloat(this.wrap.style.right);
            const x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
            const y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
            downX = x;
            downY = y;
            isMoving = true;
        }
        function onMouseMove(event) {
            event.stopPropagation();
            if (!isMoving) {
                return;
            }
            const x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
            const y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
            this.wrap.style.right = lastRight + downX - x + 'px';
            this.wrap.style.top = lastTop + y - downY + 'px';
            this.wrap.updateStyle();
        }
        function onMouseUp(event) {
            event.stopPropagation();
            isMoving = false;
        }
        this.dom.addEventListener('mousedown', (e) => onMouseDown.bind(this)(e));
        this.dom.addEventListener('touchstart', (e) => onMouseDown.bind(this)(e));
        this.dom.addEventListener('mousemove', (e) => onMouseMove.bind(this)(e));
        this.dom.addEventListener('touchmove', (e) => onMouseMove.bind(this)(e));
        this.dom.addEventListener('mouseup', (e) => onMouseUp.bind(this)(e));
        this.dom.addEventListener('touchend', (e) => onMouseUp.bind(this)(e));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PosPivot;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

class ShapePivot extends __WEBPACK_IMPORTED_MODULE_0____["a" /* Pivot */] {
    constructor(wrap) {
        super(wrap);
        this.style = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0____["b" /* pivotBaseStyle */], { left: '0', bottom: '0', background: '#CDDC39', transform: 'translateX(-50%) translateY(50%)' });
        this.updateStyle();
        this.initEvents();
    }
    initEvents() {
        let lastW;
        let lastH;
        let downX, downY, isMoving;
        function onMouseDown(event) {
            event.stopPropagation();
            lastW = parseFloat(this.wrap.style.width);
            lastH = parseFloat(this.wrap.style.height);
            const x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
            const y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
            downX = x;
            downY = y;
            isMoving = true;
        }
        function onMouseMove(event) {
            event.stopPropagation();
            if (!isMoving) {
                return;
            }
            const x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
            const y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
            this.wrap.style.width = lastW + (downX - x) / this.wrap.scale + 'px';
            this.wrap.style.height = lastH + (y - downY) / this.wrap.scale + 'px';
            this.wrap.updateStyle();
        }
        function onMouseUp(event) {
            event.stopPropagation();
            isMoving = false;
        }
        this.dom.addEventListener('mousedown', (e) => onMouseDown.bind(this)(e));
        this.dom.addEventListener('touchstart', (e) => onMouseDown.bind(this)(e));
        document.body.addEventListener('mousemove', (e) => onMouseMove.bind(this)(e));
        document.body.addEventListener('touchmove', (e) => onMouseMove.bind(this)(e));
        this.dom.addEventListener('mouseup', (e) => onMouseUp.bind(this)(e));
        this.dom.addEventListener('touchend', (e) => onMouseUp.bind(this)(e));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ShapePivot;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = detect;
/* unused harmony export isRange */
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
function isRange(i) {
    return typeof i.value === 'string' && typeof i.limit === 'object';
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyStyle;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return functionMap; });
/* harmony export (immutable) */ __webpack_exports__["e"] = toStr;
/* harmony export (immutable) */ __webpack_exports__["d"] = initFunctionMap;
/* harmony export (immutable) */ __webpack_exports__["b"] = findClosestState;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_md5__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_md5__);

function applyStyle(dom, style) {
    Object.keys(style).forEach(v => {
        dom.style[v] = style[v];
    });
}
let functionId = 0;
let functionMap = {};
function toStr(json) {
    if (typeof json === 'object') {
        if (json.length) {
            return '[' + json.map(i => toStr(i)).join(',') + ']';
        }
        return '{' + Object.keys(json).map(key => {
            return key + ':' + toStr(json[key]);
        }).join(',') + '}';
    }
    if (typeof json === 'string') {
        return `'${json}'`;
    }
    if (typeof json === 'function') {
        const id = __WEBPACK_IMPORTED_MODULE_0_md5__(json.toString());
        return `'${id}'`;
    }
    return json.toString();
}
function initFunctionMap(json) {
    if (typeof json === 'object') {
        Object.keys(json).forEach(i => initFunctionMap(json[i]));
    }
    if (typeof json === 'function') {
        const id = __WEBPACK_IMPORTED_MODULE_0_md5__(json.toString());
        functionMap[id] = json;
    }
}
function findClosestState(state, stateItem, gt = true) {
    const order = stateItem.order;
    let ltState;
    let ltOrder = -1;
    let gtState;
    let gtOrder = 999;
    Object.keys(state).forEach(i => {
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


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(14),
      utf8 = __webpack_require__(12).utf8,
      isBuffer = __webpack_require__(15),
      bin = __webpack_require__(12).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),
/* 14 */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map