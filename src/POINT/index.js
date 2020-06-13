import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from '@antv/g2';

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

    if (data && data.length > 0) {
      this.setState({
        noData: false
      }, () => {

        const element = this.ELE.current;
        const chart = new Chart(
          Object.assign({
            container: element,
          }, this.initConfig())         
        );

        chart.data(data);

        chart.scale('value', {
          alias: '手机数据',
        })
        chart.axis('value', {
          title: {},
          line: {
            style: {
              stroke: '#d5d5d5',
            }
          },
        })

        chart.point().position('feature*value')
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

export default App;
