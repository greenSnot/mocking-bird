import { detect } from './types';
import { MockingFrogWrap } from './wrap';
import {
  applyStyle,
  toStr,
  findClosestState,
} from './util';

export function renderItem(state, key, parent, root, depth = 1) {
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
    background: depth % 2 ? 'rgba(80, 80, 80, 0.8)' : 'rgba(170, 170, 170, 0.8)',
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
        width: '100%',
        '-webkit-box-align': 'end',
      });
      const btn = document.createElement('div');
      applyStyle(btn, {
        ...root.panelBtnStyle,
        width: '30px',
        'margin-bottom': '5px',
      });
      btn.innerText = state.active ? '-' : '+';
      i.appendChild(btn);
      const wrap = new MockingFrogWrap(root.scale);
      wrap.content.style.display = state.active ? 'block' : 'none';
      Object.keys(state.value).sort((a, b) => state.value[a].order > state.value[b].order ? 1 : -1).forEach(k => {
        const item = state.value[k];
        wrap.content.appendChild(renderItem(item, k, state.value, root, depth + 1));
      });
      btn.addEventListener('click', () => {
        state.active = wrap.content.style.display === 'none';
        wrap.content.style.display = state.active ? 'block' : 'none';
        btn.innerText = state.active ? '-' : '+';
        state.onChange && state.onChange(state);
        root.onChange(state);
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
        state.onChange && state.onChange(state);
        root.onChange(state);
      });
      return select;
    },
    btn: () => {
      const i = document.createElement('div');
      applyStyle(i, {
        width: '100%',
        height: '40px',
      });
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
    check: () => {
      const i = document.createElement('input');
      i.setAttribute('type', 'checkbox');
      i.checked = state.value;
      i.addEventListener('change', function() {
        state.value = this.checked;
        state.onChange && state.onChange(state);
        root.onChange(state);
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
        'min-width': '100px',
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
          root.onChange(state);
        }
      });
      i.addEventListener('change', function() {
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
  }

  content.appendChild(map[detect(state)]());
  return dom;
}