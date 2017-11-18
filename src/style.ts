export function initCommonStyle(scale) {
  const css = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(`
      .mocking-frog * {
        font-size: ${12 * scale}px;
        color: #fff;
        font-family: arial,sans-serif;
      }
      .mocking-frog[hide="1"] {
        border: none!important;
        min-width: 0!important;
        min-height: 0!important;
        width: 0!important;
        height: 0!important;
      }
      .mocking-frog[hide="1"] .mocking-frog-panel {
        visibility: hidden;
      }
      .mocking-frog[hide="1"] .mocking-frog-shape-pivot {
        visibility: hidden;
      }
      .mocking-frog input {
        background: transparent;
        border: 0;
        height: 40px;
      }
      .mocking-frog input[type=input] {
        width: 100%;
        display: block;
        border-bottom: 1px solid #fff;
      }
      .mocking-frog select {
        border: 1px solid #fff;
        background: transparent;
        border-radius: 0;
        height: 35px;
      }
      .mocking-frog input[type=checkbox] {
        width: 30px;
        height: 30px;
      }
      
      .mocking-frog input[type=range] {
        -webkit-appearance: none;
        -moz-appearance: none;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 200px;
        transform: translate(-50%, -50%);
      }
      
      .mocking-frog input[type=range]::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        background: #fff;
        height: 2px;
      }
      
      .mocking-frog input[type=range]:focus {
        outline: none;
      }
      
      .mocking-frog input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 2px solid;
        border-radius: 50%;
        height: 25px;
        width: 25px;
        max-width: 80px;
        position: relative;
        bottom: 11px;
        background-color: #bbb;
        cursor: -webkit-grab;
      }
      
      .mocking-frog input[type=range]::-webkit-slider-thumb:active {
        cursor: -webkit-grabbing;
      }
    `));
  document.getElementsByTagName("head")[0].appendChild(css);
}