import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';
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
    return config.forceFit
    ? {
      forceFit: true,
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
        G2.registerInteraction('active-region', {
          start: [{ trigger: 'plot:mousemove', action: 'active-region:hide' }],
          end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
        });
        G2.registerInteraction('element-highlight', {
          start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
          end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
        });
        const chart = new G2.Chart(
          Object.assign({
            container: element,
          }, this.initConfig())
        )

        chart.source(data)

        chart.axis(axis && axis.type, axis && axis.option)
        chart.legend(legend && legend.type, legend && legend.option)
        if (active && !active.option) {
          // chart.removeInteraction(active.type);
        }
        
        if (column && column.color) {
          chart
          .interval()
          .position(column && column.position)
          .color(column && column.color, config.color || [])
        } else {
          chart
          .interval()
          .position(column && column.position)
        }
  
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
