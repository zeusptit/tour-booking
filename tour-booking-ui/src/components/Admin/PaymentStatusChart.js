import React from "react";
import { Doughnut } from "react-chartjs-2";

const PaymentStatusChart = ({ stats }) => {
  const customColors = [
    "rgb(255, 94, 31)",
    "rgb(255, 220, 0)",
    "rgb(1, 148, 243)",
  ];

  const chartData = {
    labels: ["Hết hạn", "Đang chờ", "Đã thanh toán"],
    datasets: [
      {
        label: "Bookings",
        backgroundColor: customColors,
        borderColor: customColors,
        borderWidth: 1,
        hoverBackgroundColor: customColors,
        hoverBorderColor: customColors,
        data: [
          stats?.expiredBookingsNumber || 0,
          stats?.pendingBookingsNumber || 0,
          stats?.paidBookingsNumber || 0,
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
        text: "Trạng thái thanh toán",
      },
    },
  };

  return (
    <div>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default PaymentStatusChart;
