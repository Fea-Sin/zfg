import React from 'react';
import ReactDOM from 'react-dom';
import Testone, { AREA } from '../src';
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
  // scale: {
  //   type: 'feature',
  //   option: {
  //     range: [0, 1],
  //   }
  // },
  scale: {
    feature: {
      range: [0, 1],
    },
    value: {
      nice: true,
      tickMethod: getTicks,
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
