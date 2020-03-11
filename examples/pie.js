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
  "emotionType": 1,
  "category": null,
  "categoryType": null,
  "source": null,
  "title": null,
  "publishTime": null,
  "newsTags": null,
  "count": 5
}, {
  "id": null,
  "hot": null,
  "emotionType": 2,
  "category": null,
  "categoryType": null,
  "source": null,
  "title": null,
  "publishTime": null,
  "newsTags": null,
  "count": 17
}, {
  "id": null,
  "hot": null,
  "emotionType": 3,
  "category": null,
  "categoryType": null,
  "source": null,
  "title": null,
  "publishTime": null,
  "newsTags": null,
  "count": 41
}];

const dataConfig = {
  // 1. 数据 map 处理
  dictionaies: {
    emotionType: {
      1: '积极',
      2: '中立',
      3: '消极',
    },
  },
  /**
   * 2. 字段重命名
   * 饼形图、环形图，字段有两个 item*count
   * 如果数据字段不匹配，请配置完成
   */ 
  rename: {
    emotionType: 'item',
  },
}

const sum = 80

const config = {
  width: 400,
  height: 400,
  forceFit: true,
  color: ['#8798ff', '#ffd481', '#ff90a2'],
  legend: false,
  coord: {
    theta: {
      radius: 0.75,
      innerRadius: 0.6,
    }
  },
  guide: {
    html: {
      position: [ '50%', '50%' ],
      html: `<div class="g2-guide-html"><p class="title">${sum}</p><p class="value">总计</p></div>`
    }
  },
  style: `
    .g2-guide-html {
        width: 100px;
        height: 80px;
        vertical-align: middle;
        text-align: center;
        line-height: 0.2;
    }

    .g2-guide-html .title {
        font-size: 32px;
        color: #000;
        font-weight: bold;
    }

    .g2-guide-html .value {
        font-size: 12px;
        color: #8c8c8c;
        font-weight: 300;
    }    
  `
}

function render(container) {
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
