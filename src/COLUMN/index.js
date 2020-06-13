import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from '@antv/g2';
import IsEqual from 'lodash/isEqual';

class App extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      noData: true,
    }
    this.ELE = React.createRef()
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
    const { data, config } = this.props;
    const { column, axis, legend, active } = config;

    if (data && data.length > 0) {

      this.setState({
        noData: false
      }, () => {

        const element = this.ELE.current;

        const chart = new Chart(
          Object.assign({
            container: element,
          }, this.initConfig())
        )

        chart.data(data);

        chart.axis(axis && axis.type, axis && axis.option)
        chart.legend(legend && legend.type, legend && legend.option)

        chart.tooltip({
          showCrosshairs: true,
        });
        
        if (column && column.color) {
          chart
          .interval()
          .position(column && column.position)
          .color(column && column.color, config.color)
        } else {
          chart
          .interval()
          .position(column && column.position)
        }
        // chart.interaction('element-active')
  
        chart.render()

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

export default App
