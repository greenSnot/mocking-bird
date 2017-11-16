import { applyStyle } from './util';

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
  transform: 'scale(' + window.devicePixelRatio + ')',
};

export class MockingFrogWrap {
  dom: HTMLElement;
  content: HTMLElement;
  style = defaultStyle;
  constructor(style?) {
    this.dom = document.createElement('div');
    this.style = style ? {
      ...this.style,
      ...style,
    } : this.style;
    applyStyle(this.dom, {
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
    });
    this.content = document.createElement('div');
    applyStyle(this.content, {
      overflow: 'scroll',
      '-webkit-box-flex': 1,
    });
    this.dom.appendChild(this.content);
    this.updateStyle();
  }
  updateStyle() {
    Object.keys(this.style).forEach(v => {
      this.dom.style[v] = this.style[v];
    });
  }
}