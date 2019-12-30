import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import zfgPackage from '../package.json';
import G2 from '@antv/g2';
import PIE from './PIE';
import COLUMN from './COLUMN';

class ZFG extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('component up date', prevState)
  }

  render () {
    
    return (
      <div>
        <div>{`ZFG version ${zfgPackage.version}`}</div>
        <div>{`G2 version ${G2.version}`}</div>
      </div>
    )
  }
}

ZFG.propTypes = {
}
ZFG.defaultProps = {
}

export {
  PIE,
  COLUMN,
}

export default ZFG
