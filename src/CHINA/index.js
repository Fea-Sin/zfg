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
    this.SCENE = null;
    this.LAYER = null;
  }

  state = {
    noData: true,
  }


  componentDidMount() {
    console.log('china map mount 渲染')
    this.renderChart()
  }

  componentDidUpdate(prevProps) {
    console.log('china map --更新')
    if (!IsEqual(prevProps.data, this.props.data) || !IsEqual(prevProps.config, this.props.config)) {
      this.renderChart();
    }
  }

  componentWillUnmount() {
    console.log('china map 卸载---')
    this.SCENE.destroy();
    this.LAYER.destroy();
    this.SCENE = null;
    this.LAYER = null;
  }


  renderChart = () => {
    const { data, config } = this.props
    if (data && data.length > 0) {
      this.setState({
        noData: false
      }, () => {
      
        const element = this.ELE.current;
        const { china } = config;
        const TYPE = china && china.type;
        const max = Math.max(...data.map(item => item[TYPE]));
        const MAXSIZE = ( china && china.bubbleMaxSize ) || 20;
        const MINSIZE = ( china && china.bubbleMinSize ) || 5;
        console.log('china chart 构建--------')

        this.SCENE = new Scene({
          id: element,
          logoVisible: false,
          antialias: true,
          map: new Mapbox({
            center: [ 116.2825, 39.9 ],
            pitch: 0,
            style: 'blank',
            zoom: china && china.zoom,
            minZoom: china && china.zoom,
            maxZoom: china && china.zoom,
          })
        });

        this.SCENE.setMapStatus({
          dragEnable: false,
        })

        this.SCENE.on('loaded', () => {
          this.LAYER =  new CountryLayer(this.SCENE, {
            data: data,
            joinBy: [ 'NAME_CHN', china && china.label ],
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
                    ? Math.max( Math.floor( (props/max)*MAXSIZE ), MINSIZE )
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
    } else {
      const element = this.ELE.current;
      if (element) {
        element.parentNode.removeChild(element)
      }
      if (this.SCENE) {
        this.SCENE.destroy();
      }
      if (this.LAYER) {
        this.LAYER.destroy();
      }
      this.SCENE = null;
      this.LAYER = null;

      this.setState({
        noData: true
      })
    }
    
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
          : <div style={BBOX} ref={this.ELE} className='CHINAMAP'></div>
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
    height: 200,
  }
}


export default ChinaMap;
