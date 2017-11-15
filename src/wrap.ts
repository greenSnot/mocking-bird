const defaultStyle = {
  width: '200px',
  height: '400px',
  background: 'rgb(255, 255, 255)',
  'box-shadow': '0px 3px 12px 4px #eee',
  position: 'fixed',
  top: '20px',
  right: '20px',
};

export class MockingBirdWrap {
  dom: HTMLElement;
  style = defaultStyle;
  constructor(opt) {
    this.dom = document.createElement('div');
    this.style = {
      ...this.style,
      ...opt.style,
    };
    this.updateStyle();
  }
  updateStyle() {
    Object.keys(this.style).forEach(v => {
      this.dom.style[v] = this.style[v];
    });
  }
}