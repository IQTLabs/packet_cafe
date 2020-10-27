import * as React from "react";
import { Component } from "react";
import Chart from "react-apexcharts";

class Trafficbarchart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seriesBar: [
        {
          name: "Encrypted",
          data: [1344, 939, 28750]
        },
        {
          name: "Plaintext",
          data: [380, 419, 11921]
        },
        {
          name: "Unknown",
          data: [477, 867, 6500]
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
  }

  render() {
    return (
      <div className="percentage-chart">
        <Chart
          options={this.state.optionsBar}
          height={350}
          series={this.state.seriesBar}
          type="bar"
        />
      </div>
    );
  }
}

export default Trafficbarchart;
