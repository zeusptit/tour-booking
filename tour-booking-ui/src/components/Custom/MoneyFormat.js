import React from "react";

export default function MoneyFormat(props) {
  const { amount } = props;
  // Chia số thành phần nguyên và phần thập phân
  const parts = amount.toFixed(1).toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Thêm dấu chấm phẩy sau mỗi 3 chữ số từ phải qua trái ở phần nguyên
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // Kiểm tra phần thập phân có khác 0 không
  const formattedDecimalPart = decimalPart !== "0" ? `,${decimalPart}` : "";

  // Kết hợp phần nguyên và phần thập phân với dấu phẩy
  const formattedAmount = `${formattedIntegerPart}${formattedDecimalPart}`;

  return <span>{formattedAmount} </span>;
}
