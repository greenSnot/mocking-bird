import { applyStyle } from './util';

const defaultStyle = {
  width: '250px',
  'min-width': '250px',
  height: '250px',
  'min-height': '200px',
  background: 'rgb(255, 255, 255)',
  'box-shadow': '0px 3px 12px 4px #eee',
  position: 'fixed',
  border: '5px solid #fff',
  top: '20px',
  right: '20px',
};

export class MockingBirdWrap {
  dom: HTMLElement;
  content: HTMLElement;
  style = defaultStyle;
  constructor() {
    this.dom = document.createElement('div');
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