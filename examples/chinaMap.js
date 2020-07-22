import React from 'react';
import ReactDOM from 'react-dom';
import Testone, { CHINAMAP } from '../src';
import DATA from '../src/DATA/data-china';

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
  height: 550,
  width: 800,
  china: {
    type: 'customer',
    label: 'name',
    zoom: 3,
    bubbleMaxSize: 25,
    bubbleMinSize: 8,
  },
  bubble: {
    enable: true,
    color: '#FF94A3',
    style: {
      opacity: 0.5,
      strokeWidth: 1,
    },
  },
  popup: {
    enable: true,
    Html: props => {
      return `
        <div style="text-align: center; color: #647BFC;">
          <div style="padding-bottom: 15px; font-size: 16px;">${props.NAME_CHN}</div>
          <div style="background-color: #F8F9FB; padding: 10px 0; color: #333;">
            <span>供应商：</span><span>${props.supply}</span>
            <span style="padding: 0 8px;">|</span>
            <span>客户：</span><span>${props.customer}</span>
          </div>
        </div>
      `;
    },
  },
  empty: <div style={{color: 'green', fontSize: 30}}>no data</div>
}


function render(container) {
  ReactDOM.render(
    <div>
      <CHINAMAP data={DATA} config={config} />
      {/* <CHINAMAP config={config} /> */}
    </div>, container
  )
}

render(reactContainer)
