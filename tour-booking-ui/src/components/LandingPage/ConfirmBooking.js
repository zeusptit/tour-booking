import React, { useEffect, useState } from "react";
import { checkBooking } from "../../api/CustomersApi";
import { Link } from "react-router-dom";
function ConfirmBooking() {
  const [status, setStatus] = useState("PENDING");
  const [isQueried, setIsQueried] = useState(false);
  useEffect(() => {
    const checkB = async () => {
      const currentUrl = window.location.href;
      const queryString = currentUrl.split("?")[1];
      const params1 = new URLSearchParams(queryString);
      const paramMap = {};

      for (let [key, value] of params1.entries()) {
        paramMap[key] = value;
      }
      if (!isQueried && Object.keys(paramMap).length >= 10) {
        console.log("gọi checkB");
        const ps = await checkBooking(paramMap);
        setStatus(ps);
        setIsQueried(true);
      }
    };
    if (isQueried === false) checkB();
  }, []);
  return (
    <main id="content" role="main" className="main">
      {/* <!-- Content --> */}
      <div className="container">
        <div className="footer-height-offset d-flex justify-content-center align-items-center flex-column">
          <div className="row align-items-sm-center w-100">
            <div className="col-sm-6">
              <div className="text-center text-sm-right mr-sm-4 mb-5 mb-sm-0">
                {status == null && (
                  <img
                    className="w-50 w-sm-100 mx-auto"
                    src={
                      process.env.PUBLIC_URL + "/svg/illustrations/error404.svg"
                    }
                    alt="error404"
                    style={{ maxWidth: "15rem" }}
                  />
                )}
                {status != null && status === "PAID" && (
                  <img
                    className="w-50 w-sm-100 mx-auto"
                    src={
                      process.env.PUBLIC_URL + "/svg/illustrations/confirm.svg"
                    }
                    alt="confirm"
                    style={{ maxWidth: "15rem" }}
                  />
                )}
                {status != null && status === "PENDING" && (
                  <img
                    className="w-50 w-sm-100 mx-auto"
                    src={
                      process.env.PUBLIC_URL +
                      "/svg/illustrations/processing.svg"
                    }
                    alt="processing"
                    style={{ maxWidth: "15rem" }}
                  />
                )}
                {status != null && status === "EXPIRED" && (
                  <img
                    className="w-50 w-sm-100 mx-auto"
                    src={
                      process.env.PUBLIC_URL +
                      "/svg/illustrations/error-payment.svg"
                    }
                    alt="error-payment"
                    style={{ maxWidth: "15rem" }}
                  />
                )}
              </div>
            </div>

            <div className="col-sm-6 col-md-5 text-center text-sm-left">
              {status == null && (
                <div>
                  <h1 className="display-1 mb-0">Lỗi!</h1>
                  <p className="lead">Đơn hàng không tồn tại.</p>
                </div>
              )}
              {status != null && status === "PAID" && (
                <div>
                  <h1 className="display-1 mb-0">Thank you!</h1>
                  <p className="lead">
                    Cảm ơn bạn đã sử dụng dịch vụ tại Thanh Hương Booking. Chúng
                    tôi đã gửi email xác nhận đơn hàng cho bạn.
                  </p>
                </div>
              )}
              {status != null && status === "PENDING" && (
                <div>
                  <h1 className="display-1 mb-0">Thank you!</h1>
                  <p className="lead">
                    Cảm ơn bạn đã sử dụng dịch vụ tại Thanh Hương Booking. Chúng
                    tôi đang xử lí đơn hàng của bạn.
                  </p>
                </div>
              )}
              {status != null && status === "EXPIRED" && (
                <div>
                  <h1 className="display-1 mb-0">Thank you!</h1>
                  <p className="lead">
                    Cảm ơn bạn đã sử dụng dịch vụ tại Thanh Hương Booking.{" "}
                    <br />
                    Đơn hàng của bạn đã bị huỷ.
                  </p>
                </div>
              )}
              <Link className="btn btn-primary" to={"/"}>
                Quay trở lại
              </Link>
            </div>
          </div>
          {/* <!-- End Row --> */}
        </div>
      </div>
      {/* <!-- End Content --> */}

      {/* <!-- Footer --> */}

      {/* <!-- End Footer --> */}
    </main>
  );
}

export default ConfirmBooking;
