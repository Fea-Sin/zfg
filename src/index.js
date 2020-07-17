import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import zfgPackage from '../package.json';
import PIE from './PIE';
import COLUMN from './COLUMN';
import POINT from './POINT';
import LINE from './LINE';
import AREA from './AREA';
import INTERVAL from './INTERVAL';
import CHINAMAP from './CHINA';

class ZFG extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  render () {
    
    return (
      <div>
        <div>{`ZFG version ${zfgPackage.version}`}</div>
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
  POINT,
  LINE,
  AREA,
  INTERVAL,
  CHINAMAP,
}

export default ZFG;
