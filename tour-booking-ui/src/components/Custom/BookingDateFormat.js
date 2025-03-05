import React from "react";

export default function BookingDateFormat(props) {
  const { createAt } = props;
  const [date, time] = createAt.split(" ");
  return (
    <div>
      <div>{date}</div>
      <div className="ml-2">{time}</div>
    </div>
  );
}
