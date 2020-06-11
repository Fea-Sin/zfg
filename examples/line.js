import React from 'react';
import ReactDOM from 'react-dom';
import Testone, { LINE } from '../src';
import DATA from '../src/DATA/data';

const reactContainer = document.getElementById('__react-content');
const bodyContainer = document.getElementsByTagName('body')
bodyContainer[0].style.padding = '10px'
reactContainer.style.cssText = `
                                border: 1px solid #11d0bc;
                                padding: 10px;
                                margin-bottom: 10px;
                               `;

const config = {
  forceFit: true,
  padding: [100, 50, 50, 30],
  color: ['#FFD378', '#647BFC', '#DCE1FF', '#FF899D'],
  line: {
    position: 'feature*value',
    color: 'phone'
  },
  axis: {
    type: 'value',
    option: {
      // title: {},
      line: {},
    }
  },
  legend: {
    type: 'phone',
    option: {
      position: 'top-right',
      offsetY: -20,
    }
  },
  scale: {
    type: 'feature',
    option: {
      range: [0, 1]
    }
  }
}


function render(container) {
  ReactDOM.render(
    <div>
      <Testone />
      <div>
        <LINE data={DATA} config={config} />
      </div>
    </div>, container
  )
}

render(reactContainer)
