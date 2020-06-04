import React from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';

class App extends React.Component {

  state = {
    noData: true,
  }

  componentDidMount() {
    this.renderChart()
  }

  renderChart = () => {
    const { data, config } = this.props
    const initConfig = () => {
      return config.forceFit
      ? {
        forceFit: true,
        height: config.height,
      }
      : {
        width: config.width,
        height: config.height,
      }
    }

    if (data && data.length > 0) {
      this.setState({
        noData: false
      }, () => {

        const chart = new G2.Chart(
          Object.assign({
            container: 'c1',
          }, initConfig())         
        );

        chart.source(data)
        chart.scale('value', {
          alias: '手机数据',
        })
        chart.axis('value', {
          title: {},
          line: {},
        })
        chart.point().position('feature*value')
        chart.render()
      })
    }
  }

  render() {
    const { noData } = this.state
    return (
      <div>
        <div>g2 point</div>
        {
          noData
          ? <div>暂无数据</div>
          : <div id='c1'></div>
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
