import * as React from "react";
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { Component } from "react";
import Chart from "react-apexcharts";

const pcapStatsModelForFile = createSelector(
  state => state.data.statsModel,
  (_, fileId) => fileId,
  (statsModel, fileId) => statsModel[fileId] || {}
)

const TrafficBarChart = (props) =>{

    const data = useSelector(state => pcapStatsModelForFile(state, props.fileId))["trafficSummary"]
    const encrypted = [data["packets"]["encrypted"],data["conversations"]["encrypted"], data["bytes"]["encrypted"]]
    const pt = [data["packets"]["plaintext"],data["conversations"]["plaintext"], data["bytes"]["plaintext"]]
    const unk = [data["packets"]["unknown"],data["conversations"]["unknown"], data["bytes"]["unknown"]]
    const chartInfo = {
      seriesBar: [
        {
          name: "Encrypted",
          data: encrypted
        },
        {
          name: "Plaintext",
          data: pt
        },
        {
          name: "Unknown",
          data: unk
        }
      ],
      optionsBar: {
        chart: {
          stacked: true,
          stackType: "100%",
          fontFamily: "Lato, sans-serif",
          toolbar: {
            show: true
          }
        },
        theme: {
          mode: "light",
          palette: "palette6",
          monochrome: {
            enabled: false,
            color: "#255aee",
            shadeTo: "light",
            shadeIntensity: 0.65
          }
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "20px"
          },
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        title: {},
        yaxis: {
          labels: {
            style: {
              fontSize: "18px"
            }
          }
        },
        xaxis: {
          categories: ["Packets", "Conversations", "Bytes"],
          labels: {
            show: true,
            offsetY: 7,
            style: {
              fontSize: "18px"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: true
          }
        },

        tooltip: {
          style: {
            fontSize: "25px"
          }
        },

        fill: {
          opacity: 1,
          type: "solid",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.35,
            inverseColors: false
          }
        },

        legend: {
          position: "bottom",
          fontSize: "20px",
          fontWeight: 600,
          horizontalAlign: "left",
          offsetX: 100
        }
      }
    };

    return (
      <div className="percentage-chart">
        <Chart
          options={chartInfo.optionsBar}
          height={350}
          series={chartInfo.seriesBar}
          type="bar"
        />
      </div>
    );
}

export default TrafficBarChart;
