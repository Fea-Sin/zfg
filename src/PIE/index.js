import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import insertCss from 'insert-css';
import { setCoordName } from '../utils/setChar';

class App extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      noData: true
    }
  }

  dataInit = () => {
    const { data, config } = this.props
    const ds = new DataSet()

    /**
     * set config css
     */
    insertCss(config.style)

    // 创建 DataView
    const dv = ds.createView().source(data)

    // map 数据加工
    const mapObj = config.dictionaies
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


    // 字段重命名
    dv.transform({
      type: 'rename',
      map: {
        emotionType: 'item',
        count: 'count'
      }
    })

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

  componentDidMount() {
    const { config } = this.props
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
    
    const dv = this.dataInit()
    const data = dv.rows
    // console.log('data set is done', dv.rows)
    const coordNameArr = Object.keys(data[0])

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
              val = ( (val * 100).toFixed(2) ) + '%';
              return val;
            }
          }
        })

        chart.legend(config.legend)

        chart.coord('theta', {
          radius: 0.75,
          innerRadius: 0.6,
        })

        chart.tooltip({
          showTitle: false,
          itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        })

        chart.intervalStack()
          .position('percent')
          .color('item', config.color || [])
          .label('percent', {
            formatter: (val, item) => {
              return  val;
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
        
        chart.guide().html(config.guide.html);
  
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
