import React from 'react';
import ReactDOM from 'react-dom';
import Testone, { INTERVAL } from '../src';
import DATA from '../src/DATA/data-interval2';

const reactContainer = document.getElementById('__react-content');
const bodyContainer = document.getElementsByTagName('body')
bodyContainer[0].style.padding = '10px'
reactContainer.style.cssText = `
                                border: 1px solid #11d0bc;
                                padding: 10px;
                                margin-bottom: 10px;
                               `;

// 设置度量
function getTicks(scale) {
  const { min, max, tickCount=5 } = scale;
  const avg = (max - min) / tickCount;
  const ticks = [];
  if (max <= 5) {
    for(let i = 0; i <= 5; i += 1) {
      ticks.push(i);
    }
  } else {
    for ( let i = min; i <= max; i += Number(avg.toFixed(0)) ) {
      ticks.push(i);
    }
  }
  return ticks;
}

const config = {
  autoFit: true,
  height: 450,
  padding: [20, 80, 50, 60],
  color: ['#FF798C', '#647BFC', '#FECA5C'],
  interval: {
    position: 'city*value',
    color: 'type',
    label: {
      type: 'value',
      option: {
        style: {
          fill: '##333333',
          fontSize: 14,
        },
        offset: 10,
      }
    },
  },
  scale: {
    value: {
      nice: true,
      tickMethod: getTicks,
    }
  },
  axis: [
    {
      type: 'city',
      option: {
        label: {
          style: {
            fill: '#333333',
            fontSize: 14,
          },
        },
        tickLine: null,
        title: null,
      }
    }, {
      type: 'value',
      option: {
        label: {
          style: {
            fill: '#333333',
            fontSize: 14,
          },
          offset: 15,
        },
        line: {
          style: {
            stroke: '#d5d5d5',
          }
        },
        position: 'right',
      }
    }
  ],
  legend: false,
  tooltip: {
    shared: true,
    showMarkers: false,
  },
  empty: <div style={{color: 'green', fontSize: 30}}>no data</div>
}


function render(container) {
  ReactDOM.render(
    <div>
      <INTERVAL data={DATA} config={config} id='ONE' />
      {/* <INTERVAL /> */}
    </div>, container
  )
}

render(reactContainer)
