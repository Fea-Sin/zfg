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

const sum = 100

const config1 = {
  width: 400,
  height: 400,
  forceFit: true,
  color: ['#8798ff', '#adb9ff', '#8584ff', '#ffdebc', '#fcb44a'],
  legend: {
    position: 'right-center',
    offsetX: -100,
    clickable: false  
  },
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
  let sum = 33

  const config = {
    width: 400,
    height: 400,
    forceFit: true,
    color: ['#8798ff', '#adb9ff', '#8584ff', '#ffdebc', '#fcb44a'],
    legend: {
      position: 'right-center',
      offsetX: -100,
      clickable: false  
    },
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
