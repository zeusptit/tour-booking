import React from "react";
import { Line } from "react-chartjs-2";

const BookingChart = ({ bookingData }) => {
  const chartData = {
    labels: Object.keys(bookingData),
    datasets: [
      {
        label: "Tổng Doanh Thu",
        yAxisID: "revenue",
        data: Object.values(bookingData).map((stats) => stats.totalRevenue),
        fill: false,
        borderColor: "rgb(255, 94, 31)",
        tension: 0.1,
      },
      {
        label: "Số Booking",
        yAxisID: "count",
        data: Object.values(bookingData).map((stats) => stats.bookingCount),
        fill: false,
        borderColor: "rgb(1, 148, 243)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {},
    scales: {
      revenue: {
        type: "linear",
        display: true,
        position: "left",
        scaleLabel: {
          display: true,
          labelString: "Doanh Thu",
        },
      },
      count: {
        type: "linear",
        display: true,
        position: "right",
        scaleLabel: {
          display: true,
          labelString: "Số Booking",
        },
      },
    },
  };

  return <Line className="p-3" data={chartData} options={options} />;
};

export default BookingChart;
