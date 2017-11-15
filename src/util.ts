export function applyStyle(dom, style) {
  Object.keys(style).forEach(v => {
    dom.style[v] = style[v];
  });
}