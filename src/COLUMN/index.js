import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';

class App extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      noData: true
    }
  }

  componentDidMount() {
    const { data, config } = this.props
    const pieConfig = () => {
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
          }, pieConfig())
        )

        chart.source(data)

        chart
          .interval()
          .position('genre*sold')
          .color('genre')
  
        chart.render()

      })
    } 

  }

  render() {
   
    return (
      <div>
        <div>column</div>
        {
          this.state.noData
          ? (<div>暂无数据</div>)
          : (<div id='c1'></div>)
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
