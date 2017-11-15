import { MockingBirdState } from './types';
import { MockingBirdWrap } from './wrap';
import { PosPivot } from './pivot/posPivot';
import { ShapePivot } from './pivot/shapePivot';

class MockingBird {
  state = {};
  wrap: MockingBirdWrap;
  posPivot: PosPivot;
  shapePivot: ShapePivot;
  constructor(state: MockingBirdState, opt = {}) {
    this.state = state;
    this.wrap = new MockingBirdWrap(opt);
    this.shapePivot = new ShapePivot(this.wrap);
    this.posPivot = new PosPivot(this.wrap);
    this.wrap.dom.appendChild(this.shapePivot.dom);
    this.wrap.dom.appendChild(this.posPivot.dom);
    document.body.appendChild(this.wrap.dom);
  }
}

(window as any).MockingBird = MockingBird;

const testState: MockingBirdState = {
  num: {
    value: 3,
    limit: {
      min: 0,
      max: 10,
      step: 0.1,
    },
  },
  select: {
    value: 'a',
    limit: ['a', 'b'],
  },
  input: {
    value: 'abs',
  },
  btn: {
    value: () => console.log('~'),
  },
  folder: {
    value: {
      num: {
        value: 3,
        limit: {
          min: 0,
          max: 10,
          step: 0.1,
        },
      },
    },
    active: false,
  },
};

new MockingBird(testState, {
  style: {},
})