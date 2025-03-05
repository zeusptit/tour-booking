import React from "react";
import { Pie } from "react-chartjs-2";

const PackagesStatusChart = ({ stats }) => {
  const customColors = [
    "rgb(255, 94, 31)",
    "rgb(255, 220, 0)",
    "rgb(1, 148, 243)",
  ];

  const chartData = {
    labels: ["Đã kết thúc", "Đang diễn ra", "Chưa diễn ra"],
    datasets: [
      {
        label: "Tour",
        backgroundColor: customColors,
        borderColor: customColors,
        borderWidth: 1,
        hoverBackgroundColor: customColors,
        hoverBorderColor: customColors,
        data: [
          stats?.finishedPackages || 0,
          stats?.ongoingPackages || 0,
          stats?.upcomingPackages || 0,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Trạng thái các tour",
      },
    },
  };

  return (
    <div>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PackagesStatusChart;
