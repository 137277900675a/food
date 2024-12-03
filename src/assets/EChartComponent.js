// EChartComponent.js
import * as echarts from "echarts";

export function createEChart(elementId, rankingData) {
  const chartDom = document.getElementById(elementId);
  const myChart = echarts.init(chartDom);

  const option = {
    title: {
      left: "center",
      top: "10px",
      textStyle: {
        fontSize: 24,
        color: "#333",
      },
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: rankingData.map((item) => item.name),
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: rankingData.map((item) => item.value),
        type: "bar",
        itemStyle: {
          normal: {
            color: (params) => {
              const colorList = [
                "#FF6347",
                "#FFA07A",
                "#FFD700",
                "#8A2BE2",
                "#7FFF00",
                "#00BFFF",
                "#FF1493",
              ];
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
        animationDuration: 1500,
      },
    ],
  };

  myChart.setOption(option);
  window.addEventListener("resize", () => myChart.resize());
}
