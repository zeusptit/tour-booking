import React from "react";

export default function PaymentStatus(props) {
  const { paymentStatus } = props;
  const statusColors = {
    PAID: "success",
    PENDING: "warning",
    EXPIRED: "danger",
  };
  return (
    <span className={`badge badge-soft-${statusColors[paymentStatus]}`}>
      <span
        className={`legend-indicator bg-${statusColors[paymentStatus]}`}
      ></span>{" "}
      {paymentStatus === "PAID"
        ? "Đã thanh toán"
        : paymentStatus === "PENDING"
        ? "Chưa thanh toán"
        : "Hết hạn"}
    </span>
  );
}
