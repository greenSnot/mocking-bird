import { MockingFrog } from 'mocking-frog';

const testState = {
  num: {
    value: 3,
    limit: {
      min: 0,
      max: 10,
      step: 0.1,
    },
    onChange: () => {},
  },
  select: {
    value: 'b',
    limit: ['a', 'b'],
    onChange: () => {},
  },
  input: {
    value: 'abs',
    onChange: () => {},
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
        onChange: () => { console.log('!'); },
      },
      c: {
        value: false,
        onChange: () => { console.log('#'); },
      },
    },
    active: false,
    onChange: () => {},
  },
  c: {
    value: true,
    onChange: () => {},
  },
};

new MockingFrog({
  'default': testState
}, {
  curState: 'default',
  style: {
    width: '270px',
  },
});