import React from 'react';
import PropTypes from 'prop-types';
import { Chart, registerInteraction } from '@antv/g2';
import IsEqual from 'lodash/isEqual';

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
    const { data, config } = this.props
    const { area, axis, scale, legend } = config
    
    if (data && data.length > 0) {
      this.setState({
        noData: false
      }, () => {
        const element = this.ELE.current;

        registerInteraction('tooltip', {
          start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
          end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
        });
        registerInteraction('element-highlight', {
          start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
          end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
        });
  
        const chart = new Chart(
          Object.assign({
            container: element,
          }, this.initConfig())
        )
        chart.data(data);

        chart.axis(axis && axis.type, axis && axis.option)
        // chart.scale(scale && scale.type, scale && scale.option)
        if (legend && legend.type) {
          chart.legend(legend.type, legend.option)
        }
        if (scale) {
          chart.scale(scale)
        }

        chart.tooltip({
          showCrosshairs: true,
          shared: true,
        });

        chart
        .area()
        .position(area && area.position)
        .color(area && area.color, config.color)
        .shape('smooth')
        .style({
          // stroke: 'l(90) 0:#5B74FF 1:#E4E8FF',
          fillOpacity: 0.85,
        })
        
        // chart.interaction('element-range-active');
        // chart.interaction('tooltip');
        // chart.interaction('element-highlight');
        // chart.interaction('element-active');

        chart.render();
      })

    }
  }

  render() {
    const { noData } = this.state
    const { config } = this.props
    return (
      <div>
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
          : <div ref={this.ELE}></div>
        }
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
