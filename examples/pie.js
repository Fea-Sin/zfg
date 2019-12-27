import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Testone, { PIE } from '..';
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
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 }
];

const config = {
  width: 400,
  height: 400,
  forceFit: true,
}

function render(container) {
  ReactDOM.render(
    <div>
      <Testone />
      <div>
        <PIE data={data} config={config} />
      </div>
    </div>, container
  )
}

render(reactContainer)
