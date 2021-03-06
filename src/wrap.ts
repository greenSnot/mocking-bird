import { applyStyle } from './util';

const defaultStyle = {
  width: '316px',
  'min-width': '316px',
  height: '250px',
  'min-height': '200px',
  padding: '5px',
  background: 'rgba(170, 170, 170, 0.5)',
  position: 'fixed',
  'z-index': 1000,
  top: '20px',
  right: '20px',
  'transform-origin': '100% 0',
  'box-sizing': 'border-box',
  transform: '',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
};

export class MockingFrogWrap {
  dom: HTMLElement;
  content: HTMLElement;
  style;
  scale: number;
  show = true;
  constructor(scale, styles?: {
    wrapStyle?: any,
    contentStyle?: any,
  }) {
    this.dom = document.createElement('div');
    this.style = {
      ...defaultStyle,
      ...(styles && styles.wrapStyle ? styles.wrapStyle : {}),
    };
    this.scale = scale;
    this.style.transform = 'scale(' + this.scale + ')';
    this.style.width = localStorage.getItem('mocking_frog_wrap_width') || this.style.width;
    this.style.height = localStorage.getItem('mocking_frog_wrap_height') || this.style.height;
    this.style.top = localStorage.getItem('mocking_frog_wrap_top') || this.style.top;
    this.style.right = localStorage.getItem('mocking_frog_wrap_right') || this.style.right;
    this.content = document.createElement('div');
    applyStyle(this.content, {
      overflow: 'scroll',
      '-webkit-box-flex': 1,
      width: '100%',
      ...(styles && styles.contentStyle ? styles.contentStyle : {}),
    });
    this.dom.appendChild(this.content);
    this.updateStyle();
  }
  setVisibility(show) {
    this.show = show;
    this.dom.setAttribute('hide', show ? '0' : '1');
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