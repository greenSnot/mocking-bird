import { MockingBirdWrap } from '../wrap';
export let pivotBaseStyle = {
  width: '30px',
  height: '30px',
  position: 'absolute',
  border: '3px solid #fff',
  'border-radius': '18px',
  'box-shadow': '#ccc 0px 1px 4px 3px',
};

export class Pivot {
  dom: HTMLElement;
  wrap: MockingBirdWrap;
  style = {};
  updateStyle() {
    Object.keys(this.style).forEach(v => {
      this.dom.style[v] = this.style[v];
    });
  }
  init() {
    this.dom = document.createElement('div');
  }
  constructor(wrap: MockingBirdWrap) {
    this.wrap = wrap;
    this.init();
  }
}