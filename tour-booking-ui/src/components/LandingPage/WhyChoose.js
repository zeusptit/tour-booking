import React from "react";

export default function WhyChoose() {
  return (
    <div className="mt-5">
      <div className="row gx-2 gx-lg-3">
        <div className="col-sm-6 col-lg-4 mb-3 mb-lg-5">
          {/* <!-- Card --> */}
          <div className="card" style={{ border: "none" }}>
            <img
              className="card-img-top mr-4"
              style={{ maxHeight: "6rem" }}
              src={
                process.env.PUBLIC_URL + "/svg/illustrations/online-shop.svg"
              }
              alt="online shop"
            />

            <div className="card-body">
              <h3 className="text-center">
                Giá rẻ mỗi ngày với ưu đãi đặc biệt
              </h3>
              <p className="card-text text-center">
                Đặt phòng qua website để nhận giá tốt nhất với các khuyến mãi
                tuyệt vời!
              </p>
            </div>

            {/* <!-- End Card --> */}
          </div>
        </div>

        <div className="col-sm-6 col-lg-4 mb-3 mb-lg-5">
          {/* <!-- Card --> */}
          <div className="card" style={{ border: "none" }}>
            <img
              className="card-img-top mr-4"
              style={{ maxHeight: "6rem" }}
              src={process.env.PUBLIC_URL + "/svg/illustrations/vnpay.svg"}
              alt="vnpay"
            />

            <div className="card-body">
              <h3 className="text-center">Thanh toán an toàn với VNPAY</h3>
              <p className="card-text text-center">
                Giao dịch trực tuyến an toàn với VNPAY, không tính phí giao
                dịch.
              </p>
            </div>

            {/* <!-- End Card --> */}
          </div>
        </div>

        <div className="col-sm-6 col-lg-4 mb-3 mb-lg-5">
          {/* <!-- Card --> */}
          <div className="card" style={{ border: "none" }}>
            <img
              className="card-img-top mr-4"
              style={{ maxHeight: "6rem" }}
              src={
                process.env.PUBLIC_URL +
                "/svg/illustrations/7-24-customer-support.svg"
              }
              alt="247 support"
            />
            <div className="card-body">
              <h3 className="text-center">Hỗ trợ khách hàng 24/7</h3>
              <p className="card-text text-center">
                Đội ngũ nhân viên hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn
              </p>
            </div>

            {/* <!-- End Card --> */}
          </div>
        </div>
      </div>
    </div>
  );
}
