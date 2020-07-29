import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from '@antv/g2';
import IsEqual from 'lodash/isEqual';
import IsArray from 'lodash/isArray';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.ELE = React.createRef()
    this.CHART = null;
  }

  state = {
    noData: true,
  }

  componentDidMount() {
    console.log('interval mount 渲染----')
    this.renderChart()
  }
  componentDidUpdate(prevProps) {
    console.log('interval 更新---')
    if (!IsEqual(prevProps.data, this.props.data) || !IsEqual(prevProps.config, this.props.config)) {
      this.renderChart()
    }
  }

  componentWillUnmount() {
    console.log('interval 卸载----')
    this.CHART = null;
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
    const { interval, tooltip, legend, axis } = config

    if (data && data.length > 0) {
      this.setState({
        noData: false
      }, () => {
        const element = this.ELE.current;
        // element.innerHTML = '';
        // element.parentNode.removeChild(element)

        this.CHART = new Chart(
          Object.assign({
            container: element,
          }, this.initConfig())
        )
        this.CHART.coordinate().transpose().scale(1, -1);
        this.CHART.data(data);
        this.CHART.legend(legend);
        this.CHART.axis(axis);
        if (axis && IsArray(axis)) {
          axis.forEach(item => {
            this.CHART.axis(item.type, item.option)
          })
        }
        this.CHART.tooltip(tooltip);
        this.CHART
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

        this.CHART.interaction('active-region');
        this.CHART.interaction('legend-highlight');
        this.CHART.render();

      })
    } else {
      const element = this.ELE.current;
      if (element) {
        element.parentNode.removeChild(element)
      }
      this.CHART = null;
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
          : <div ref={this.ELE} className='INTERVALCHART'></div>
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
