export function applyStyle(dom, style) {
  Object.keys(style).forEach(v => {
    dom.style[v] = style[v];
  });
}

export function toStr(json) {
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
  return json.toString();
}

export function findClosestState(state, stateItem, gt = true) {
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