import React from 'react';
import ReactDOM from 'react-dom';
import Testone, { PIE } from 'zfg';
import '../assets/index.less';

const reactContainer = document.getElementById('__react-content');
const bodyContainer = document.getElementsByTagName('body')
bodyContainer[0].style.padding = '10px'
reactContainer.style.cssText = `
                                border: 1px solid #11d0bc;
                                padding: 10px;
                                margin-bottom: 10px;
                               `;

const data =  [{
  "id": null,
  "hot": null,
  "emotionType": null,
  "category": null,
  "categoryType": null,
  "source": "今日头条",
  "title": null,
  "publishTime": null,
  "newsTags": null,
  "count": 21
}, {
  "id": null,
  "hot": null,
  "emotionType": null,
  "category": null,
  "categoryType": null,
  "source": "网易号",
  "title": null,
  "publishTime": null,
  "newsTags": null,
  "count": 11
}, {
  "id": null,
  "hot": null,
  "emotionType": null,
  "category": null,
  "categoryType": null,
  "source": "一点资讯",
  "title": null,
  "publishTime": null,
  "newsTags": null,
  "count": 3
}, {
  "id": null,
  "hot": null,
  "emotionType": null,
  "category": null,
  "categoryType": null,
  "source": "人民日报",
  "title": null,
  "publishTime": null,
  "newsTags": null,
  "count": 3
}, {
  "id": null,
  "hot": null,
  "emotionType": null,
  "category": null,
  "categoryType": null,
  "source": "中华网",
  "title": null,
  "publishTime": null,
  "newsTags": null,
  "count": 2
}];

const dataConfig = {
  // 1. 数据 map 处理

  /**
   * 2. 字段重命名
   * 饼形图、环形图，字段有两个 item*count
   * 如果数据字段不匹配，请配置完成
   */ 
  rename: {
    source: 'item',
  },
}

function render(container) {
  let sum = 33

  const config = {
    autoFit: true,
    height: 400,
    color: ['#8798ff', '#adb9ff', '#8584ff', '#ffdebc', '#fcb44a'],
    legend: {
      position: 'right-center',
      offsetX: -100,
      clickable: false  
    },
    legend: {
      type: 'item',
      option: {
        position: 'right',
      }
    },
    coord: {
      theta: {
        radius: 0.75,
        innerRadius: 0.6,
      }
    },
    guide: {
      topText: {
        position: ['50%', '50%'],
        content: sum,
        style: {
          fontSize: 32,
          fill: 'l(90) 0:#5B74FF 1:#E4E8FF',
          textAlign: 'center',
        },
        offsetY: -20,     
      },
      downText: {
        position: ['50%', '50%'],
        content: '总计',
        style: {
          fontSize: 14,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetY: 15,
      }      
    }
  }

  ReactDOM.render(
    <div>
      <Testone />
      <div>
        <PIE data={data} dataConfig={dataConfig} config={config} />
      </div>
    </div>, container
  )
}

render(reactContainer)
