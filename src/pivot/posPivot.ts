import { MockingBirdWrap } from '../wrap';
import { pivotBaseStyle, Pivot } from './';

export class PosPivot extends Pivot {
  style = {
    ...pivotBaseStyle,
    right: '0',
    top: '0',
    background: '#03A9F4',
    transform: 'translateX(50%) translateY(-50%)',
  };
  constructor(wrap) {
    super(wrap);
    this.updateStyle();
    this.initEvents();
  }
  initEvents() {
    let lastTop;
    let lastRight;
    let downX, downY, isMoving;
    function onMouseDown(event) {
      lastTop = parseFloat(this.wrap.style.top);
      lastRight = parseFloat(this.wrap.style.right);
      const x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].clientX);
      const y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].clientY);
      downX = x;
      downY = y;
      isMoving = true;
    }
    function onMouseMove(event) {
      if (!isMoving) {
        return;
      }
      const x = Math.floor(event.clientX >= 0 ? event.clientX : event.touches[event.touches.length - 1].pageX);
      const y = Math.floor(event.clientY >= 0 ? event.clientY : event.touches[event.touches.length - 1].pageY);
      this.wrap.style.right = lastRight + downX - x + 'px';
      this.wrap.style.top = lastTop + y - downY + 'px';
      this.wrap.updateStyle();
    }
    function onMouseUp(event) {
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