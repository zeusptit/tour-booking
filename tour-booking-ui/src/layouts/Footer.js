import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <h1 className="font-size-lg mt-2 text-center">
        <img
          className="navbar-brand-logo"
          src={process.env.PUBLIC_URL + "/logo_rec.png"}
          alt="Logo"
        />{" "}
        Công ty du lịch Thanh Hương
      </h1>

      <div className="row justify-content-between align-items-center">
        <div className="col-lg-4">
          <h3>Liên hệ</h3>
          <p className="font-size-lg">
            Km10, Đường Nguyễn Trãi, Q.Hà Đông, Hà Nội
          </p>
          <p className="font-size-lg">callcenter@thanhhuongbooking.com</p>
          <p className="font-size-lg">1900 23 23 89 (Nhánh số 3)</p>
          <p className="font-size-lg">
            Đây là bài tập lớn của sinh viên. Mọi dữ liệu trong bài là mô phỏng,
            chỉ phục vụ mục đích học tập.
          </p>
        </div>
        <div className="col-lg-4">
          <h3>Chủ tài khoản</h3>
          <p className="font-size-lg">Công ty du lịch Thanh Hương</p>
          <p className="font-size-lg">
            Tài khoản ngân hàng số: 9386343368 (VND)
          </p>
          <p className="font-size-lg">
            Ngân hàng thương mại cổ phần Kỹ Thương Việt Nam (Techcombank)
          </p>
        </div>
      </div>
    </div>
  );
}
