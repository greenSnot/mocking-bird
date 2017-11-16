"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocking_frog_1 = require("mocking-frog");
var testState = {
    num: {
        value: 3,
        limit: {
            min: 0,
            max: 10,
            step: 0.1,
        },
        onChange: function () { },
    },
    select: {
        value: 'b',
        limit: ['a', 'b'],
        onChange: function () { },
    },
    input: {
        value: 'abs',
        onChange: function () { },
    },
    btn: {
        value: function () { return console.log('~'); },
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
                onChange: function () { console.log('!'); },
            },
            c: {
                value: false,
                onChange: function () { console.log('#'); },
            },
        },
        active: false,
        onChange: function () { },
    },
    c: {
        value: true,
        onChange: function () { },
    },
};
new mocking_frog_1.MockingFrog({
    'default': testState
}, {
    curState: 'default',
    style: {
        width: '270px',
    },
});
