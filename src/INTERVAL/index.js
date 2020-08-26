import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from '@antv/g2';
import IsEqual from 'lodash/isEqual';
import IsArray from 'lodash/isArray';

const ID = 'INTERVALID'


  // 设置度量
  function getTicks(scale) {
    const { min, max, tickCount=5 } = scale;
    const avg = (max - min) / tickCount;
    const ticks = [];
    if (max <= 5) {
      for(let i = 0; i <= 5; i += 1) {
        ticks.push(i);
      }
    } else {
      for ( let i = min; i <= max; i += Number(avg.toFixed(0)) ) {
        ticks.push(i);
      }
    }
    return ticks;
  }

class App extends React.Component {
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

  initConfig = () => {
    const { config } = this.props
    return config.autoFit
    ? {
      autoFit: true,
      height: config.height,
      padding: config.padding,
    }
    : {
      width: config.width,
      height: config.height,
      padding: config.padding,
    }
  }

  renderChart = () => {
    const { data, config, id=ID } = this.props
    const { interval, tooltip, legend, axis, scale } = config

    if (data && data.length > 0) {
      this.setState({
        noData: false
      }, () => {
        const element = this.ELE.current;
        const before = document.getElementById(id)

        // 清除节点
        if (before && before.parentNode && before.parentNode.removeChild) {
          before.parentNode.removeChild(before)
        }

        // 创建元素
        const dom = document.createElement('div')
        dom.id = id
        element.appendChild(dom)

        const chart = new Chart(
          Object.assign({
            container: id,
          }, this.initConfig())
        )
        chart.coordinate().transpose().scale(1, -1);
        chart.data(data);
        chart.legend(legend);
        chart.axis(axis);
        if (axis && IsArray(axis)) {
          axis.forEach(item => {
            chart.axis(item.type, item.option)
          })
        }
        if (scale) {
          chart.scale(scale)
        }
        chart.tooltip(tooltip);
        chart
        .interval()
        .position(interval && interval.position)
        .color(interval && interval.color, config.color)
        .label(
          interval && interval.label && interval.label.type,
          interval.label && interval.label.option
        )
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0.3,
          },
        ]);

        chart.interaction('active-region');
        chart.interaction('legend-highlight');
        chart.render();

      })
    } else {
      const before = document.getElementById(id)
      if (before && before.parentNode && before.parentNode.removeChild) {
        before.parentNode.removeChild(before)
      }

      this.setState({
        noData: true,
      })
    }
  }

  render() {
    const { noData } = this.state
    const { config } = this.props

    return (
      <div>
        {
          noData &&
            <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
              {
                config && config.empty
                ? config.empty
                : <span style={{lineHeight: '40px'}}>暂无数据</span>
              }
            </div>
        }
        <div ref={this.ELE} id='INTERVALBOX' style={{display: !noData ? 'block' : 'none'}}></div>
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
}
App.defaultProps = {
  data: [],
  config: {
    width: 600,
    height: 300,
  }
}

export default App;
