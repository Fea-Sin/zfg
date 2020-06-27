import React from 'react';
import ReactDOM from 'react-dom';
import Testone, { AREA } from '../src';
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
  autoFit: true,
  height: 300,
  padding: [50, 50, 50, 60],
  color: ['l(90) 0:#5B74FF 1:#E4E8FF', 'l(90) 0:#FACC14 1:#FFF1D0', 'l(90) 0:#F5506C 1:#FFEEEE'],
  area: {
    position: 'feature*value',
    color: 'phone',
  },
  axis: {
    type: 'value',
    option: {
      title: {},
      line: {
        style: {
          stroke: '#d5d5d5',
        }
      },
    }
  },
  scale: {
    type: 'feature',
    option: {
      range: [0, 1],
    }
  },
  legend: {
    type: 'phone',
    option: {
      position: 'top-right',
      // offsetY: -20,
    },
  },
  empty: <div style={{color: 'green', fontSize: 30}}>no data</div>
}


function render(container) {
  ReactDOM.render(
    <div>
      <Testone />
      <div>
        <AREA data={DATA} config={config} />
      </div>
    </div>, container
  )
}

render(reactContainer)
