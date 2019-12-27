import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Testone from '..';
import '../assets/index.less';

const reactContainer = document.getElementById('__react-content');
const bodyContainer = document.getElementsByTagName('body')
bodyContainer[0].style.padding = '10px'
reactContainer.style.cssText = `
                                border: 1px solid #11d0bc;
                                padding: 10px;
                                margin-bottom: 10px;
                               `

function render(container) {
  ReactDOM.render(
    <div>
      <Testone />
    </div>, container
  )
}

render(reactContainer)
