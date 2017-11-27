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
  functionMap,
  initFunctionMap
} from './util';
import { renderItem } from './renderer';
import { initCommonStyle } from './style';

export class MockingFrog {
  state = {};
  wrap: MockingFrogWrap;
  posPivot: PosPivot;
  shapePivot: ShapePivot;

  curState = 'temp';
  panel;
  stateList: string[] = [];
  stateIdToStr = {};
  selectStateDropdown;
  btnClone;
  btnDel;
  btnReset;
  panelBtnStyle = {
    height: '35px',
    display: '-webkit-box',
    '-webkit-box-align': 'center',
    '-webkit-box-pack': 'center',
    margin: '0 0 0 5px',
    cursor: 'pointer',
    padding: '0 5px 0 5px',
    background: 'rgb(0, 150, 136)',
  }
  
  scale: number;

  opt: any;

  constructor(defaultStateMap: {[key: string]: MockingFrogState}, curState: string, opt?: {
    scale?: number,
    wrapStyle?: any,
    contentStyle?: any,
    onChange?: Function,
    stateDropdownOnChange?: Function,
  }) {
    this.opt = opt || {};
    initFunctionMap(defaultStateMap);
    this.scale = this.opt.scale || 1;

    initCommonStyle(this.scale);
    this.initWrap();
    this.initState(defaultStateMap, curState);
    this.initPanel();
  }
  initWrap() {
    this.wrap = new MockingFrogWrap(this.scale, {
      wrapStyle: this.opt.wrapStyle,
      contentStyle: this.opt.contentStyle,
    });
    this.wrap.dom.className = 'mocking-frog';
    this.shapePivot = new ShapePivot(this.wrap);
    this.posPivot = new PosPivot(this.wrap);
    this.wrap.dom.appendChild(this.shapePivot.dom);
    this.wrap.dom.appendChild(this.posPivot.dom);
    document.body.appendChild(this.wrap.dom);
  }
  initState(defaultStateMap, curState) {
    try {
      this.stateList = JSON.parse(localStorage.getItem(STORAGE_STATE_LIST));
      this.curState = localStorage.getItem(STORAGE_CUR_STATE);
      this.stateList.forEach(k => {
        this.stateIdToStr[k] = localStorage.getItem(STORAGE_STATE_PREFIX + k);
      });
      this.changeState(this.curState);
    } catch (e) {
      this.stateList = Object.keys(defaultStateMap);
      this.curState = curState;
      this.initOrder(defaultStateMap[this.curState]);
      this.stateList.forEach(i => {
        this.stateIdToStr[i] = toStr(defaultStateMap[i]);
      });
      this.changeState(this.curState);
      this.saveStateList();
      this.saveCurState();
      this.stateList.forEach(s => {
        localStorage.setItem(STORAGE_STATE_PREFIX + s, this.stateIdToStr[s]);
      });
    }
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
  onChange(state) {
    if (this.opt.onChange) {
      this.opt.onChange(state);
    } else {
      this.save();
    }
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
    this.panel.className = 'mocking-frog-panel';
    applyStyle(this.panel, {
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
  }
  initStateList() {
    this.selectStateDropdown = document.createElement('select');
    const self = this;
    this.selectStateDropdown.addEventListener('change', function() {
      self.changeState(this.value);
      self.saveCurState();
      self.opt.stateDropdownOnChange && self.opt.stateDropdownOnChange(this.value);
    });
    this.updateStateList();
  }
  updateStateList() {
    this.selectStateDropdown.innerHTML = '';
    this.stateList.forEach(s => {
      const option = document.createElement('option');
      option.value = s;
      option.innerText = s;
      this.selectStateDropdown.appendChild(option);
    });
    this.selectStateDropdown.value = this.curState;
  }
  initBtnDel() {
    this.btnDel = document.createElement('div');
    applyStyle(this.btnDel, this.panelBtnStyle);
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
    this.btnClone = document.createElement('div');
    applyStyle(this.btnClone, this.panelBtnStyle);
    this.btnClone.innerText = 'clone';
    this.btnClone.addEventListener('click', () => {
      const id = prompt('state id?') || 'temp';
      this.stateList.push(id);
      this.curState = id;
      this.save();
      this.updateStateList();
    });
  }
  initBtnReset() {
    this.btnReset = document.createElement('div');
    applyStyle(this.btnReset, {
      ...this.panelBtnStyle,
      margin: '0 5px 0 5px',
    });
    this.btnReset.addEventListener('click', () => {
      localStorage.clear();
      location.reload();
    });
    this.btnReset.innerText = 'reset';
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