import { MockingFrogWrap } from '../wrap';
import { pivotBaseStyle, Pivot } from './';

export class ShapePivot extends Pivot {
  style = {
    ...pivotBaseStyle,
    left: '0',
    bottom: '0',
    background: '#CDDC39',
    transform: 'translateX(-50%) translateY(50%)',
  };
  constructor(wrap) {
    super(wrap);
    this.updateStyle();
    this.initEvents();
  }
  initEvents() {
    let lastW;
    let lastH;
    let downX, downY, isMoving;
    function onMouseDown(event) {
      event.preventDefault();
      event.stopPropagation();
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
      event.stopPropagation();
      if (!isMoving) {
        return;
      }
      const x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
      const y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
      this.wrap.style.width = lastW + (downX - x) / window.devicePixelRatio + 'px';
      this.wrap.style.height = lastH + (y - downY) / window.devicePixelRatio + 'px';
      this.wrap.updateStyle();
    }
    function onMouseUp(event) {
      event.preventDefault();
      event.stopPropagation();
      isMoving = false;
    }
    this.dom.addEventListener('mousedown', (e) => onMouseDown.bind(this)(e));
    this.dom.addEventListener('touchstart', (e) => onMouseDown.bind(this)(e));
    document.body.addEventListener('mousemove', (e) => onMouseMove.bind(this)(e));
    document.body.addEventListener('touchmove', (e) => onMouseMove.bind(this)(e));
    this.dom.addEventListener('mouseup', (e) => onMouseUp.bind(this)(e));
    this.dom.addEventListener('touchend', (e) => onMouseUp.bind(this)(e));
  }
}