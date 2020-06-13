import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import IsEqual from 'lodash/isEqual';

class App extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      noData: true
    }
    this.ELE = React.createRef()
  }

  componentDidMount() {
    this.renderChart()
  }
  componentDidUpdate(prevProps) {
    if (
      !IsEqual(prevProps.data, this.props.data) ||
      !IsEqual(prevProps.config, this.props.config) ||
      !IsEqual(prevProps.dataConfig, this.props.dataConfig)
    ) {
      this.renderChart()
    }
  }

  dataInit = () => {
    const { data, config, dataConfig } = this.props
    const ds = new DataSet()

    // 创建 DataView
    const dv = ds.createView().source(data)

    if (dataConfig.dictionaies) {

      // map 数据加工
      const mapObj = dataConfig.dictionaies
      const objKey = Object.keys(mapObj)      

      dv.transform({
        type: 'map',
        callback(row) {
          objKey.forEach((item) => {
            const itemKey = Object.keys(mapObj[item])
            const itemValue = Object.values(mapObj[item])
            for(let i=0; i<itemKey.length; i++) {
              if ( row[item] == itemKey[i] ) {
                row[item] = itemValue[i]
              }
            }
          })
          return row
        }
      })
      // console.log('map 数据加工', dv.rows)
    }

    if (dataConfig.rename) {
      // 字段重命名
      dv.transform({
        type: 'rename',
        map: dataConfig.rename
      })
    }

    // 字段过滤
    dv.transform({
      type: 'pick',
      fields: ['item', 'count'],
    })

    // 数据比例
    dv.transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    })

    return dv
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
    const { config } = this.props
    const { legend, coord, guide } = config
    const dv = this.dataInit()
    const data = dv.rows

    if (data && data.length > 0) {
      this.setState({
        noData: false
      }, () => {

        const element = this.ELE.current;
        
        element.innerHTML = '';
        const chart = new Chart(
          Object.assign({
            container: element,
          }, this.initConfig())
        )

        chart.data(data)

        chart.scale('percent', {
          formatter: (val) => {
            val = (val * 100).toFixed(2) + '%';
            return val;
          },
        });

        chart.legend(legend && legend.type, legend && legend.option)
        chart.coordinate('theta', coord && coord.theta);

        chart.tooltip({
          showTitle: false,
          showMarkers: false,
          itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
        });

        // 辅助文本
        if (guide) {
          chart
          .annotation()
          .text(guide && guide.topText)
          .text(guide && guide.downText)
        }

        chart
          .interval()
          .adjust('stack')
          .position('percent')
          .color('item', config.color)
          .label('percent', (percent) => {
            return {
              content: (data) => {
                return `${data.item} ${data.count}个占 ${(percent * 100).toFixed(2)}%`;
              },
            }
          })
          .tooltip('item*percent', (item, percent) => {
            percent = (percent * 100).toFixed(2) + '%';
            return {
              name: item,
              value: percent
            }
          })
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
    color: ['#8798ff', '#ffd481', '#ff90a2'],
    coord: {
      theta: {
        radius: 0.75,
      }
    },
  }
}

export default App
