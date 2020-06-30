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
  forceFit: true,
  padding: [100, 50, 50, 30],
  color: ['l(90) 0:#5B74FF 1:#E4E8FF', 'l(90) 0:#FACC14 1:#FFF1D0', 'l(90) 0:#F5506C 1:#FFEEEE'],

  area: {
    position: 'feature*value',
    color: 'phone',
  },
  axis: {
    type: 'value',
    option: {
      title: {},
      line: {},
    }
  },
  scale: {
    type: 'feature',
    option: {
      range: [0, 1]
    }
  },
  legend: {
    type: 'phone',
    option: {
      position: 'top-right',
      offsetY: -20,
      marker: 'circle',
      items: [
        {
          value: 'iPhone',
          marker: {
            symbol: 'circle',
            fill: '#7F92FF'
          }
        }, {
          value: 'Samsung',
          marker: {
            symbol: 'circle',
            fill: '#FFD378'
          }
        }, {
          value: 'Nokia Smartphone',
          marker: {
            symbol: 'circle',
            fill: '#FF899D'
          }
        }
      ]
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
