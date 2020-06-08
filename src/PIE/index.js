import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import insertCss from 'insert-css';
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

    /**
     * set config css
     */
    if (config.style) {
      insertCss(config.style)
    }

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
    const { config } = this.props
    const dv = this.dataInit()
    const data = dv.rows
    if (data && data.length > 0) {

      this.setState({
        noData: false
      }, () => {

        const element = this.ELE.current;

        const chart = new G2.Chart(
          Object.assign({
            container: element,
          }, this.initConfig())
        )

        chart.source(data, {
          percent: {
            formatter: val => {
              val = ( (val * 100).toFixed(2) ) + '%';
              return val;
            }
          }
        })

        chart.legend(config.legend)

        chart.coord('theta', config.coord.theta)

        chart.tooltip({
          showTitle: false,
          itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        })

        chart.intervalStack()
          .position('percent')
          .color('item', config.color || [])
          .label('percent', {
            formatter: (val, item) => {
              return  `${item.point.item} ${item.point.count}个占 ${val}`;
            }
          })
          .tooltip('item*percent', (item, percent) => {
            percent = ( (percent * 100).toFixed(2) ) + '%';
            return {
              name: item,
              value: percent
            }
          })
          .style({
            lineWidth: 0,
            stroke: '#fff',
          })
        
        // guide 渲染
        if (config.guide && config.guide.html) {
          chart.guide().html(config.guide.html);
        }
  
        chart.render()

      })
    } 
  }

  render() {
   
    return (
      <div>
        {
          this.state.noData
          ? (<div>暂无数据</div>)
          : (<div ref={this.ELE}></div>)
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
