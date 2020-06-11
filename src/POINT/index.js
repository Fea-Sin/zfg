import React from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';

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

  renderChart = () => {
    const { data, config } = this.props
    const initConfig = () => {
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

    if (data && data.length > 0) {
      this.setState({
        noData: false
      }, () => {

        const element = this.ELE.current;
        const chart = new G2.Chart(
          Object.assign({
            container: element,
          }, initConfig())         
        );

        chart.source(data)
        chart.scale('value', {
          alias: '手机数据',
        })
        chart.axis('value', {
          title: {},
          line: {
            style: {
              fill: '#873bf4',
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
