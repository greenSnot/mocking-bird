import { MockingFrogWrap } from '../wrap';
import { pivotBaseStyle, Pivot } from './';

export class ShapePivot extends Pivot {
  style = {
    ...pivotBaseStyle,
    left: '0',
    bottom: '0',
    background: '#bbb',
    transform: 'translateX(-50%) translateY(50%)',
  };
  constructor(wrap) {
    super(wrap);
    this.dom.className = 'mocking-frog-shape-pivot';
    this.updateStyle();
    this.initEvents();
  }
  initEvents() {
    let lastW;
    let lastH;
    let downX, downY, isMoving;
    function onMouseDown(event) {
      event.preventDefault();
      lastW = parseFloat(this.wrap.style.width);
      lastH = parseFloat(this.wrap.style.height);
      const x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
      const y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
      downX = x;
      downY = y;
      isMoving = true;
    }
    function onMouseMove(event) {
      event.preventDefault();
      if (!isMoving) {
        return;
      }
      const x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
      const y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
      this.wrap.style.width = lastW + (downX - x) / this.wrap.scale + 'px';
      this.wrap.style.height = lastH + (y - downY) / this.wrap.scale + 'px';
      this.wrap.updateStyle();
    }
    function onMouseUp(event) {
      event.preventDefault();
      isMoving = false;
    }
    this.dom.addEventListener('mousedown', (e) => onMouseDown.bind(this)(e));
    this.dom.addEventListener('touchstart', (e) => onMouseDown.bind(this)(e));
    this.dom.addEventListener('mousemove', (e) => onMouseMove.bind(this)(e));
    this.dom.addEventListener('touchmove', (e) => onMouseMove.bind(this)(e));
    this.dom.addEventListener('mouseup', (e) => onMouseUp.bind(this)(e));
    this.dom.addEventListener('touchend', (e) => onMouseUp.bind(this)(e));
  }
}