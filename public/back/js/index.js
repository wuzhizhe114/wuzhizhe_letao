/**
 * Created by Administrator on 2017/11/9.
 */

//柱狀圖
// 基于准备好的dom，初始化echarts实例
var histogram = echarts.init(document.querySelector('.main_content .pull-left'));

// 指定图表的配置项和数据
var histogramOption = {
  title: {
    text: '2017年註冊人數'
  },
  tooltip: {},
  legend: {
    data: ['人數']
  },
  xAxis: {
    data: ["壹月", "贰月", "叁月", "肆月", "伍月", "陆月"]
  },
  yAxis: {},
  series: [{
    name: '人數',
    type: 'bar',
    data: [2100, 4508, 2320, 3632, 3640, 4212]
  }]
};

// 使用刚指定的配置项和数据显示图表。
histogram.setOption(histogramOption);


//餅狀圖
var rightContent = $('.main_content .pull-right')[0];
var pieChart = echarts.init(rightContent)

var pieChartOption = {
  title: {
    text: '熱門品牌銷售',
    subtext: '2017年06月',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['安踏', '耐克', '阿迪達斯', '回力', '李寧']
  },
  series: [
    {
      name: '銷售額',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 335, name: '安踏'},
        {value: 310, name: '耐克'},
        {value: 234, name: '阿迪達斯'},
        {value: 135, name: '回力'},
        {value: 1548, name: '李寧'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

pieChart.setOption(pieChartOption);