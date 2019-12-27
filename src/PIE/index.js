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

        chart.source(data, {
          percent: {
            formatter: val => {
              val = (val * 100) + '%';
              return val;
            }
          }
        })

        chart.coord('theta', {
          radius: 0.75
        })

        chart.tooltip({
          showTitle: false,
          itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        })

        chart.intervalStack()
          .position('percent')
          .color('item')
          .label('percent', {
            formatter: (val, item) => {
              return item.point.item + ': ' + val;
            }
          })
          .tooltip('item*percent', (item, percent) => {
            percent = percent * 100 + '%';
            return {
              name: item,
              value: percent
            }
          })
          .style({
            lineWidth: 1,
            stroke: '#fff',
          })
  
        chart.render()

      })
    } 

  }

  render() {
   
    return (
      <div>
        <div>pie</div>
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
