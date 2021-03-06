import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Testone, { COLUMN } from 'zfg';
import '../assets/index.less';

const reactContainer = document.getElementById('__react-content');
const bodyContainer = document.getElementsByTagName('body')
bodyContainer[0].style.padding = '10px'
reactContainer.style.cssText = `
                                border: 1px solid #11d0bc;
                                padding: 10px;
                                margin-bottom: 10px;
                               `;

const data = [
  { hello: '运动', world: 25 },
  { hello: '休闲', world: 115 },
]

const config = {
  autoFit: true,
  height: 500,
  padding: [100, 50, 80, 60],
  color: ['#FFD378', '#647BFC', '#DCE1FF', '#FF899D'],
  column: {
    position: 'hello*world',
    color: 'hello'
  },
  axis: {
    type: 'world',
    option: {
      title: {},
      line: {
        style: {
          stroke: '#d5d5d5',
        }
      },
    }
  },
  active: {
    type: 'active-region',
    option: false,
  }
}

function render(container) {
  ReactDOM.render(
    <div>
      <Testone />
      <div style={{height: 500}}>
        <COLUMN data={data} config={config} />
      </div>
    </div>, container
  )
}

render(reactContainer)
