import React, { useState } from "react";
import Footer from "../../layouts/Footer";
import { forgotPassword } from "../../api/PublicApi";
import { Link } from "react-router-dom";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submited, setSubmited] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setSubmited(true);
    if ((await forgotPassword(email)) != null) {
      setSent(true);
    }
    setSubmited(false);
  };
  return (
    <main id="content" role="main" className="main">
      <div className="container py-5 py-sm-7">
        <Link className="position-absolute top-0 left-0 right-0" to={"/"}>
          <img
            className="avatar avatar-xl avatar-4by3 avatar-centered"
            src={process.env.PUBLIC_URL + "/logo_rec.png"}
            alt="logo"
          />
        </Link>

        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card card-lg mt-5">
              <div className="card-body">
                {!sent ? (
                  <form className="js-validate" onSubmit={handleForgotPassword}>
                    <div className="text-center mb-5">
                      <h1 className="display-4">Đặt lại mật khẩu?</h1>
                      <p>Nhập email của bạn.</p>
                    </div>

                    <div className="divider"></div>
                    <br />

                    {/* Form Group */}
                    <div className="js-form-message form-group">
                      <label className="input-label" htmlFor="loginEmail">
                        <span className="d-flex justify-content-between align-items-center">
                          Email
                        </span>
                      </label>

                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        id="loginEmail"
                        placeholder="Booking@thanhhuong.com"
                        aria-label="Booking@thanhhuong.com"
                        required="Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    {/* End Form Group */}

                    <button
                      type="submit"
                      className={`btn btn-lg btn-block btn-primary ${
                        !submited ? "" : "disabled"
                      }`}
                    >
                      Gửi
                    </button>
                  </form>
                ) : (
                  <div className="card-body text-center">
                    <h1 className="display-4">Kiểm tra hòm thư của bạn</h1>

                    <p className="mb-1">
                      Chúng tôi đã gửi đường dẫn đặt lại mật khẩu tới:
                    </p>

                    <span className="d-block text-dark font-weight-bold mb-1">
                      {email}
                    </span>

                    <div className="mt-4 mb-3">
                      <a className="btn btn-primary btn-wide" href="/home">
                        Quay lại trang chủ
                      </a>
                    </div>

                    <p>
                      Không nhận được email?{" "}
                      <Link onClick={handleForgotPassword}>Gửi lại</Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
