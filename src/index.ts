const defaultStyle = {
  width: '200px',
  height: '400px',
  background: 'rgb(255, 255, 255)',
  'box-shadow': '0px 3px 12px 4px #eee',
  position: 'fixed',
  top: '20px',
  right: '20px',
};

const defaultState = {

};

const pivotStyle = {
  width: '30px',
  height: '30px',
  position: 'absolute',
  border: '3px solid #fff',
  'border-radius': '18px',
  'box-shadow': '#ccc 0px 1px 4px 3px',
};

const scalePivotStyle = {
  ...pivotStyle,
  right: '0',
  top: '0',
  background: '#03A9F4',
  transform: 'translateX(50%) translateY(-50%)',
};

const positionPivotStyle = {
  ...pivotStyle,
  left: '0',
  bottom: '0',
  background: '#CDDC39',
  transform: 'translateX(-50%) translateY(50%)',
};

class MockingBird {
  dom: HTMLElement;
  positionPivot: HTMLElement;
  scalePivot: HTMLElement;
  constructor(opt) {
    this.initDom(opt);
    document.body.appendChild(this.dom);
  }
  initDom(opt) {
    this.dom = document.createElement('div');
    const style = {
      ...defaultStyle,
      ...opt.style,
    };
    Object.keys(style).forEach(v => {
      this.dom.style[v] = style[v];
    });
    this.initScalePivot();
    this.initPositionPivot();
    this.dom.appendChild(this.positionPivot);
    this.dom.appendChild(this.scalePivot);
  }
  initPositionPivot() {
    this.positionPivot = document.createElement('div');
    Object.keys(positionPivotStyle).forEach(v => {
      this.positionPivot.style[v] = positionPivotStyle[v];
    });
  }
  initScalePivot() {
    this.scalePivot = document.createElement('div');
    Object.keys(scalePivotStyle).forEach(v => {
      this.scalePivot.style[v] = scalePivotStyle[v];
    });
  }
}

(window as any).MockingBird = MockingBird;

new MockingBird({
  style: {},
})