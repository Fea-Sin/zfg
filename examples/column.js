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
  width: 450,
  height: 500,
  forceFit: true,
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
