import { MockingBirdState, detect } from './types';
import { MockingBirdWrap } from './wrap';
import { PosPivot } from './pivot/posPivot';
import { ShapePivot } from './pivot/shapePivot';
import { applyStyle } from './util';

function renderItem(state, key) {
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
    background: '#eee',
  });
  applyStyle(content, contentStyle);

  const name = document.createElement('div');
  dom.appendChild(name);
  dom.appendChild(content);
  name.innerText = key;

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
      Object.keys(state.value).forEach(k => {
        const item = state.value[k];
        wrap.content.appendChild(renderItem(item, k));
      });
      btn.addEventListener('click', () => {
        state.active = wrap.content.style.display === 'none';
        wrap.content.style.display = state.active ? 'block' : 'none';
        btn.innerText = state.active ? '-' : '+';
        state.onChange(state);
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
        state.value = this.value;
      });
      i.addEventListener('change', function() {
        state.value = this.value;
        state.onChange(state);
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
  constructor(state: MockingBirdState, opt = {}) {
    this.state = state;
    this.wrap = new MockingBirdWrap();
    this.shapePivot = new ShapePivot(this.wrap);
    this.posPivot = new PosPivot(this.wrap);
    this.wrap.dom.appendChild(this.shapePivot.dom);
    this.wrap.dom.appendChild(this.posPivot.dom);
    document.body.appendChild(this.wrap.dom);
    this.update();
  }
  update() {
    Object.keys(this.state).forEach(k => {
      const item = this.state[k];
      this.wrap.content.appendChild(renderItem(item, k));
    });
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