import { MockingBirdState, MockingBirdItem, detect } from './types';
import { MockingBirdWrap } from './wrap';
import { PosPivot } from './pivot/posPivot';
import { ShapePivot } from './pivot/shapePivot';
import { applyStyle, toStr, findClosestState } from './util';

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
      const wrap = new MockingBirdWrap();
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
      i.value = state.value;
      i.addEventListener('input', function(e) {
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
      applyStyle(wrap, {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-box-align': 'center',
      });
      const num = document.createElement('div');
      const i = document.createElement('input');
      i.setAttribute('type', 'range');
      i.setAttribute('min', state.limit.min);
      i.setAttribute('max', state.limit.max);
      i.setAttribute('step', state.limit.step);
      i.value = state.value;
      i.addEventListener('input', function() {
        num.innerText = this.value;
        state.value = parseFloat(this.value);
      });
      i.addEventListener('change', function() {
        state.value = parseFloat(this.value);
        state.onChange(state);
        root.onChange();
      });
      num.innerText = state.value;
      wrap.appendChild(i);
      wrap.appendChild(num);
      return wrap;
    },
  }

  content.appendChild(map[detect(state)]());
  return dom;
}
class MockingBird {
  state = {};
  wrap: MockingBirdWrap;
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

  constructor(defaultState: MockingBirdState, opt = {}) {
    this.wrap = new MockingBirdWrap();
    this.shapePivot = new ShapePivot(this.wrap);
    this.posPivot = new PosPivot(this.wrap);
    this.wrap.dom.appendChild(this.shapePivot.dom);
    this.wrap.dom.appendChild(this.posPivot.dom);
    document.body.appendChild(this.wrap.dom);
    try {
      this.stateList = JSON.parse(localStorage.getItem('mockingbird_state_list'));
      this.curState = localStorage.getItem('mockingbird_cur_state');
      this.stateList.forEach(k => {
        this.stateIdToStr[k] = localStorage.getItem('mockingbird_state_id_' + k);
      });
      this.changeState(this.curState);
    } catch (e) {
      this.stateList = ['temp'];
      this.curState = 'temp';
      this.initOrder(defaultState);
      console.log(defaultState);
      this.stateIdToStr['temp'] = toStr(defaultState);
      this.changeState(this.curState);
      this.save();
    }
    this.initPanel(defaultState);
  }
  initOrder(state: MockingBirdState) {
    Object.keys(state).forEach((i, index) => {
      const item = state[i];
      if (detect(item) === 'folder') {
        this.initOrder(item.value as MockingBirdState);
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
    this.state = eval('(() => (' + this.stateIdToStr[id] + '))()');
    this.update();
  }
  initPanel(defaultState) {
    this.panel = document.createElement('div');
    applyStyle(this.panel, {
      background: '#ff9800',
      height: '30px',
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
      localStorage.removeItem('mockingbird_state_id_' + this.curState);
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
    localStorage.setItem('mockingbird_state_list', JSON.stringify(this.stateList));
  }
  saveCurState() {
    localStorage.setItem('mockingbird_cur_state', this.curState);
  }
  saveStateDetail() {
    this.stateIdToStr[this.curState] = toStr(this.state);
    localStorage.setItem('mockingbird_state_id_' + this.curState, this.stateIdToStr[this.curState]);
  }
}

(window as any).MockingBird = MockingBird;

const testState: MockingBirdState = {
  num: {
    value: 3,
    limit: {
      min: 0,
      max: 10,
      step: 0.1,
    },
    onChange: () => {},
  },
  select: {
    value: 'b',
    limit: ['a', 'b'],
    onChange: () => {},
  },
  input: {
    value: 'abs',
    onChange: () => {},
  },
  btn: {
    value: () => console.log('~'),
  },
  folder: {
    value: {
      num: {
        value: 3,
        limit: {
          min: 0,
          max: 10,
          step: 0.1,
        },
        onChange: () => { console.log('!'); },
      },
      c: {
        value: false,
        onChange: () => { console.log('#'); },
      },
    },
    active: false,
    onChange: () => {},
  },
  c: {
    value: true,
    onChange: () => {},
  },
};

new MockingBird(testState, {
  style: {},
});