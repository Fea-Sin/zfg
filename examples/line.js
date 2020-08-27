import React from 'react';
import ReactDOM from 'react-dom';
import Testone, { LINE } from '../src';
import DATA from '../src/DATA/data2';

const reactContainer = document.getElementById('__react-content');
const bodyContainer = document.getElementsByTagName('body')
bodyContainer[0].style.padding = '10px'
reactContainer.style.cssText = `
                                border: 1px solid #11d0bc;
                                padding: 10px;
                                margin-bottom: 10px;
                               `;

function getTicks(scale) {
  const { min=0, max, tickCount=3 } = scale;
  const avg = (max - min) / tickCount;
  console.log('度量---min', min)
  console.log('度量---max', max)
  console.log('度量---tickCount', tickCount)
  const MIN = 0;
  const ticks = [];
  for ( let i = MIN; i <= max; i += Number(avg.toFixed(0)) ) {
    ticks.push(i);
  }
  console.log('度量---ticks', ticks)
  return ticks;
}

const config = {
  autoFit: true,
  height: 300,
  padding: [100, 50, 50, 30],
  color: ['#FFD378', '#647BFC', '#DCE1FF', '#FF899D'],
  line: {
    position: 'feature*value',
    color: 'phone',
  },
  axis: {
    type: 'value',
    option: {
      // title: {},
      line: {
        style: {
          stroke: '#d5d5d5',
        }
      },
    }
  },
  legend: {
    type: 'phone',
    option: {
      position: 'top-right',
      // offsetY: -20,
    }
  },
  scale: {
    feature: {
      range: [0, 1],
      nice: true,
    },
    value: {
      nice: true,
      tickMethod: getTicks,
    }
  },
}


function render(container) {
  ReactDOM.render(
    <div>
      <LINE data={DATA} config={config} />
    </div>, container
  )
}

render(reactContainer)
