### Usage:
```
import { MockingFrog } from 'mocking-frog';

const STATE_MAP = {
  case0: {

    // range
    num1: {
      value: 3,
      limit: {
        min: 0,
        max: 10,
        step: 0.1,
      },
      onChange: (state) => { // optional
        console.log(state.value);
        console.log(state.id); // 'num1'
      },
      // ext info(optional)
      id: 'num1',
      desc: 'fooooo',
    },

    // dropdown
    select: {
      value: 'b',
      limit: ['a', 'b'],
      onChange: () => {}, // optional
    },

    // input
    username: {
      value: 'immediatelyChange',
      immediatelyChange: true, // whether or not emit its onChange by 'input event'
      onChange: () => {}, // optional
    },

    // checkbox
    male: {
      value: false,
      onChange: () => {}, // optional
    },

    // button
    log: {
      value: () => { console.log('button on click')},
    },

    // folder
    test_folder: {
      value: { // widget map
        log: {
          value: () => { console.log('button on click')},
        },
      },
      active: false, // fold or not
      onChange: () => {}, // active onChange, optional
    },
  },
  case1: {
    //...
  }
};

let frog;
const CURRENT_STATE = 'case0';
const OPTIONS = {
  scale: 2, // optional
  wrapStyle: { // optional
    background: '#fff',
  },
  contentStyle: {}, // optional
  stateDropdownOnChange: () => {}, // optional
  onChange: (state) => { // optional
    console.log('global onChange');
    frog.save();
  },
}
frog = new MockingFrog(STATE_MAP, CURRENT_STATE, OPTIONS);
```