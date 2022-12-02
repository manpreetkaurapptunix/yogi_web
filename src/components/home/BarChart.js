import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

function Barchart(props) {
  const graphValue = props?.graphData;

  const temp = useSelector((state) => state.commonReducer.tempData);

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Bar
          data={{
            labels: temp?.graphData?.arr,
            datasets: [
              {
                data: temp?.graphData?.val,
                backgroundColor: "#e6bef0",
                borderColor: "#e6bef0",
                hoverBackgroundColor: "#d075e4",
                borderRadius: 24,
                borderSkipped: false,
              },
            ],
          }}
          height={280}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              "x-axis-1": {
                display: true,
                grid: {
                  drawBorder: false,
                  display: false,
                },
                ticks: {
                  autoSkip: false,
                  maxRotation: 40,
                  // minRotation: 150,
                },
              },
              "y-axis-1": {
                type: "linear",
                display: true,
                position: "left",
                grid: {
                  drawBorder: false,
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
export default Barchart;
