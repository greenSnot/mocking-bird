import { MockingFrogState, MockingFrogItem, detect } from './types';
import { MockingFrogWrap } from './wrap';
import { PosPivot } from './pivot/posPivot';
import { ShapePivot } from './pivot/shapePivot';
import {
  STORAGE_CUR_STATE,
  STORAGE_STATE_LIST,
  STORAGE_STATE_PREFIX,
  applyStyle,
  toStr,
  findClosestState,
  functionMap,
  initFunctionMap
} from './util';

function renderItem(state, key, parent, root) {
  const dom = document.createElement('div');
  const content = document.createElement('div');
  const contentStyle = {
    display: '-webkit-box',
    '-webkit-box-flex': 1,
    '-webkit-box-orient': 'vertical',
    '-webkit-box-align': 'end',
  };
  applyStyle(dom, {
    display: '-webkit-box',
    'margin-bottom': '5px',
    padding: '5px 10px 5px 10px',
    background: '#ffc107',
    color: '#fff',
  });
  applyStyle(content, contentStyle);

  const name = document.createElement('div');
  const nameWrap = document.createElement('div');
  applyStyle(nameWrap, {
    display: '-webkit-box',
    'margin-right': '10px',
    height: '40px',
    '-webkit-box-align': 'center',
  });
  const orderUp = document.createElement('div');
  const orderDown = document.createElement('div');
  const orderWrap = document.createElement('div');
  applyStyle(orderWrap, {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    'margin-right': '5px',
  });
  applyStyle(orderUp, {
    width: '0px',
    'border-bottom': '10px solid #fff',
    'border-left': '5px solid transparent',
    'border-right': '5px solid transparent',
    'margin-bottom': '2px',
  });
  applyStyle(orderDown, {
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
    const closest = findClosestState(parent, state, false);
    if (closest) {
      const order = closest.order;
      closest.order = state.order;
      state.order = order;
      root.update();
      root.save();
    }
  });
  orderDown.addEventListener('click', () => {
    const closest = findClosestState(parent, state);
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
      applyStyle(i, {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-box-align': 'end',
      });
      const btn = document.createElement('button');
      btn.innerText = state.active ? '-' : '+';
      i.appendChild(btn);
      const wrap = new MockingFrogWrap(root.scale);
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
      select.addEventListener('change', function(e) {
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
      i.addEventListener('change', function() {
        state.value = this.checked;
        state.onChange(state);
        root.onChange();
      });
      return i;
    },
    range: () => {
      const wrap = document.createElement('div');
      const rangeWrap = document.createElement('div');
      applyStyle(wrap, {
        display: '-webkit-box',
        '-webkit-box-orient': 'horizontal',
        '-webkit-box-align': 'center',
        height: '40px',
        width: '100%',
      });
      applyStyle(rangeWrap, {
        display: '-webkit-box',
        '-webkit-box-orient': 'horizontal',
        '-webkit-box-align': 'center',
        position: 'relative',
        '-webkit-box-flex': 1,
        'margin-right': '10px',
      });
      const num = document.createElement('div');
      applyStyle(num, {
        'min-width': '40px',
      });
      const i = document.createElement('input');
      applyStyle(i, {
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
      i.addEventListener('change', function() {
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
  }

  content.appendChild(map[detect(state)]());
  return dom;
}
export class MockingFrog {
  state = {};
  wrap: MockingFrogWrap;
  posPivot: PosPivot;
  shapePivot: ShapePivot;

  curState = 'temp';
  panel;
  stateList: string[] = [];
  stateIdToStr = {};
  selectStateList;
  btnClone;
  btnDel;
  btnRest;
  
  scale: number;

  constructor(defaultStateMap: {[key: string]: MockingFrogState}, opt: {
    curState: string,
    scale: number,
    style: any,
  }) {
    initFunctionMap(defaultStateMap);
    this.scale = opt.scale || 1;
    this.wrap = new MockingFrogWrap(this.scale, opt.style);
    this.wrap.dom.className = 'mocking-frog';
    this.shapePivot = new ShapePivot(this.wrap);
    this.posPivot = new PosPivot(this.wrap);
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
      this.stateList = JSON.parse(localStorage.getItem(STORAGE_STATE_LIST));
      this.curState = localStorage.getItem(STORAGE_CUR_STATE);
      this.stateList.forEach(k => {
        this.stateIdToStr[k] = localStorage.getItem(STORAGE_STATE_PREFIX + k);
      });
      this.changeState(this.curState);
    } catch (e) {
      this.stateList = Object.keys(defaultStateMap);
      this.curState = opt.curState;
      this.initOrder(defaultStateMap[this.curState]);
      this.stateList.forEach(i => {
        this.stateIdToStr[i] = toStr(defaultStateMap[i]);
      });
      this.changeState(this.curState);
      this.save();
    }
    this.initPanel();
  }
  initOrder(state: MockingFrogState) {
    Object.keys(state).forEach((i, index) => {
      const item = state[i];
      if (detect(item) === 'folder') {
        this.initOrder(item.value as MockingFrogState);
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
          if (typeof s[k][i] === 'string' && functionMap[s[k][i]]) {
            s[k][i] = functionMap[s[k][i]];
          }
        });
        if (detect(s[k]) === 'folder') {
          restoreFunction(s[k].value);
        }
      });
    }
    restoreFunction(this.state);
    this.update();
  }
  initPanel() {
    this.panel = document.createElement('div');
    applyStyle(this.panel, {
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
    this.selectStateList.addEventListener('change', function() {
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
      localStorage.removeItem(STORAGE_STATE_PREFIX + this.curState);
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
      this.stateIdToStr[id] = toStr(this.state);
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
    localStorage.setItem(STORAGE_STATE_LIST, JSON.stringify(this.stateList));
  }
  saveCurState() {
    localStorage.setItem(STORAGE_CUR_STATE, this.curState);
  }
  saveStateDetail() {
    this.stateIdToStr[this.curState] = toStr(this.state);
    localStorage.setItem(STORAGE_STATE_PREFIX + this.curState, this.stateIdToStr[this.curState]);
  }
}