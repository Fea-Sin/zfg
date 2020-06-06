import React from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';
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

  renderChart = () => {
    const { data, config } = this.props

    const area = config && config.area;
    const axis = config && config.axis;

    if (data && data.length > 0) {
      this.setState({
        noData: false
      }, () => {
        const element = this.ELE.current;
        const chart = new G2.Chart(
          Object.assign({
            container: element,
          }, this.initConfig())         
        );

        chart.source(data)

        chart.axis(axis && axis.type, axis && axis.option)

        chart
          .area()
          .position(area && area.position)
          .color(area && area.color)

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

export default App;
