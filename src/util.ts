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
  return json.toString();
}