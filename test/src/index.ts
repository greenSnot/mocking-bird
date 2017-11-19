import { MockingFrog } from 'mocking-frog';

const testState = {
  num1: {
    value: 3,
    limit: {
      min: 0,
      max: 10,
      step: 0.1,
    },
    onChange: () => console.log(MockingFrog),
  },
  num2: {
    value: 3,
    limit: {
      min: 0,
      max: 10,
      step: 0.1,
    },
    immediatelyChange: true,
    onChange: () => console.log('num2'),
  },
  select: {
    value: 'b',
    limit: ['a', 'b'],
    onChange: () => {},
  },
  input1: {
    value: 'noImmediatelyChange',
    onChange: () => console.log('!'),
  },
  input2: {
    value: 'immediatelyChange',
    immediatelyChange: true,
    onChange: () => console.log('!'),
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
          folder: {
            value: {
              c: {
                value: false,
                onChange: () => { console.log('#'); },
              },
            },
            active: false,
            onChange: () => { },
          },
        },
        active: false,
        onChange: () => { },
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

const ins = new MockingFrog({
  'default': testState
}, 'default', {
  scale: 2,
  onChange: () => {
    console.log('onChange');
    ins.save();
  },
});