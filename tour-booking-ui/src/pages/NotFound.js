import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main id="content" role="main" className="main">
      {/* <!-- Content --> */}
      <div className="container">
        <Link className="position-absolute top-0 left-0 right-0" to={"/login"}>
          <img
            className="avatar avatar-xl avatar-4by3 avatar-centered"
            src={process.env.PUBLIC_URL + "/logo_rec.png"}
            alt="logo"
          />
        </Link>

        <div className="footer-height-offset d-flex justify-content-center align-items-center flex-column">
          <div className="row align-items-sm-center w-100">
            <div className="col-sm-6">
              <div className="text-center text-sm-right mr-sm-4 mb-5 mb-sm-0">
                <img
                  className="w-60 w-sm-100 mx-auto"
                  src={process.env.PUBLIC_URL + "/svg/illustrations/think.svg"}
                  alt="Not found"
                  style={{ maxWidth: "15rem" }}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4 text-center text-sm-left">
              <h1 className="display-1 mb-0">404</h1>
              <p className="lead">
                Xin lỗi, trang bạn đang tìm không thể được tìm thấy.
              </p>
              <Link className="btn btn-primary" to={"/login"}>
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
