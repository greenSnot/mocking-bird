import { applyStyle } from './util';

const defaultStyle = {
  width: '316px',
  'min-width': '316px',
  height: '250px',
  'min-height': '200px',
  border: '5px solid rgba(235, 235, 235, 0.54)',
  position: 'fixed',
  'z-index': 1000,
  top: '20px',
  right: '20px',
  'transform-origin': '100% 0',
  transform: '',
};

export class MockingFrogWrap {
  dom: HTMLElement;
  content: HTMLElement;
  style = defaultStyle;
  scale: number;
  constructor(scale, style?) {
    this.dom = document.createElement('div');
    this.style = style ? {
      ...this.style,
      ...style,
    } : this.style;
    this.scale = scale;
    this.style.transform = 'scale(' + this.scale + ')';
    this.style.width = localStorage.getItem('mocking_frog_wrap_width') || this.style.width;
    this.style.height = localStorage.getItem('mocking_frog_wrap_height') || this.style.height;
    this.style.top = localStorage.getItem('mocking_frog_wrap_top') || this.style.top;
    this.style.right = localStorage.getItem('mocking_frog_wrap_right') || this.style.right;
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
    localStorage.setItem('mocking_frog_wrap_width', this.style.width);
    localStorage.setItem('mocking_frog_wrap_height', this.style.height);
    localStorage.setItem('mocking_frog_wrap_top', this.style.top);
    localStorage.setItem('mocking_frog_wrap_right', this.style.right);
    Object.keys(this.style).forEach(v => {
      this.dom.style[v] = this.style[v];
    });
  }
}