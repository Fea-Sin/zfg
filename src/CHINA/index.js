import React from 'react';
import PropTypes from 'prop-types';
import IsEqual from 'lodash/isEqual';
import { Scene } from '@antv/l7';
import { CountryLayer } from '@antv/l7-district';
import { Mapbox } from '@antv/l7-maps';

class ChinaMap extends React.Component {
  constructor(props) {
    super(props)
    this.ELE = React.createRef()
  }

  state = {
    noData: true,
  }


  componentDidMount() {
    this.renderChart()
  }

  componentDidUpdate(prevProps) {
    if (!IsEqual(prevProps.data, this.props.data) || !IsEqual(prevProps.config, this.props.config)) {
      this.renderChart()
    }
  }

  renderChart = () => {
    const { data, config } = this.props
    this.setState({
      noData: false
    }, () => {
      const element = this.ELE.current;
      const TYPE = config.china && config.china.type
      const max = Math.max(...data.map(item => item[TYPE]));

      const scene = new Scene({
        id: element,
        logoVisible: false,
        antialias: true,
        map: new Mapbox({
          center: [ 116.2825, 39.9 ],
          pitch: 0,
          style: 'blank',
          zoom: 3,
          minZoom: 3,
          maxZoom: 3,
        })
      });
      scene.setMapStatus({
        dragEnable: false,
      })
      scene.on('loaded', () => {
        new CountryLayer(scene, {
          data: data,
          joinBy: [ 'NAME_CHN', config.china && config.china.label ],
          depth: 1,
          autoFit: true,
          chinaNationalWidth: 1,
          chinaNationalStroke: '#dcdade',
          coastlineWidth: 1,
          coastlineStroke: '#dcdade',
          showBorder: true,
          provinceStroke: '#ccc9d5',
          fill: {
            color: '#f8f7ff',
          },
          bubble: {
            enable: config.bubble && config.bubble.enable,
            size: {
              field: TYPE,
              values: props => {
                return props > 0
                  ? Math.max( Math.floor( (props/max)*25 ), 8 )
                  : 0
              }
            },
            color: config.bubble && config.bubble.color,
            style: config.bubble && config.bubble.style,
          },
          popup: config.popup,
        });

      });
      
    })
  }

  render() {
    const { noData } = this.state
    const { config } = this.props
    const ABOx = {
      width: config.width,
      height: config.height,
      position: 'relative',
      overflow: 'hidden',
      margin: '0 auto',
    }
    const BBOX = {
      width: '100%',
      position: 'absolute',
      height: '130%',
      top: 0,
      left: 0,
    }

    return (
      <div style={ABOx}>
        {
          noData
          ? (
              <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
                {
                  config && config.empty
                  ? config.empty
                  : <span style={{lineHeight: '40px'}}>暂无数据</span>
                }
              </div>
            )
          : <div style={BBOX} ref={this.ELE}></div>
        }
      </div>
    )
  }
}

ChinaMap.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
}
ChinaMap.defaultProps = {
  data: [],
  config: {
    width: 600,
    height: 600,
  }
}


export default ChinaMap;
