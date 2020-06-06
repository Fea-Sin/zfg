import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';
import { setCoordName } from '../utils/setChar';

class App extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      noData: true,
    }
    this.ELE = React.createRef()
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

      const coordNameArr = Object.keys(data[0])

      this.setState({
        noData: false
      }, () => {

        const element = this.ELE.current;
        const chart = new G2.Chart(
          Object.assign({
            container: element,
          }, pieConfig())
        )

        chart.source(data)
        chart.axis(coordNameArr[1], {
          title: {},
          line: {
            style: {
              stroke: 'red',
            }
          },
        })
        chart.legend(coordNameArr[0], {
          position: 'top-right',
        })
        chart
          .interval()
          .position(setCoordName( coordNameArr ))
          .color(coordNameArr[0])
  
        chart.render()

      })
    } 

  }

  render() {
    const { noData } = this.state
    return (
      <div>
        {
          noData
          ? <div>暂无数据</div>
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
