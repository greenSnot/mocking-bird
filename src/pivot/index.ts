import { MockingFrogWrap } from '../wrap';
import { applyStyle } from '../util';
export let pivotBaseStyle = {
  width: '30px',
  height: '30px',
  position: 'absolute',
  border: '3px solid #fff',
  'border-radius': '18px',
  'z-index': 10,
};

export class Pivot {
  dom: HTMLElement;
  wrap: MockingFrogWrap;
  style = {};
  updateStyle() {
    applyStyle(this.dom, this.style);
  }
  init() {
    this.dom = document.createElement('div');
  }
  constructor(wrap: MockingFrogWrap) {
    this.wrap = wrap;
    this.init();
  }
}