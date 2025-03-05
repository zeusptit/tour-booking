import React from "react";

function Contact() {
  return (
    <div className="content container-fluid">
      <div className="row justify-content-lg-center">
        <div className="card mt-5 mb-5">
          <div className="card-header">
            <h1>Liên hệ</h1>
          </div>

          <div className="card-body">
            <h2>Trụ sở chính</h2>
            <p className="card-text">
              <i className="tio-poi mr-2"></i>Km10, Đường Nguyễn Trãi, Q.Hà
              Đông, Hà Nội
            </p>
            <p className="card-text">
              <i className="tio-call-talking mr-2"></i>1900 23 23 89 (Nhánh số
              3)
            </p>
            <p className="card-text">
              <i className="tio-email mr-2"></i>callcenter@thanhhuongbooking.com
            </p>
          </div>
          <div className="card-body">
            <h2>Chi nhánh Hải Phòng</h2>
            <p className="card-text">
              <i className="tio-poi mr-2"></i>Trần Hưng Đạo, P. Hoàng Văn Thụ,
              Q.Hồng Bàng, TP. Hải Phòng
            </p>
            <p className="card-text">
              <i className="tio-call-talking mr-2"></i>1900 23 23 89 (Nhánh số
              6)
            </p>
          </div>
          <div className="card-body">
            <h2>Chi nhánh Nam Định</h2>
            <p className="card-text">
              <i className="tio-poi mr-2"></i>Giao Thuỷ, Tỉnh Nam Định
            </p>
            <p className="card-text">
              <i className="tio-call-talking mr-2"></i>1900 23 23 89 (Nhánh số
              8)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
