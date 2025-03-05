import React, { useState } from "react";
import Footer from "../../layouts/Footer";
import { resetPassword } from "../../api/PublicApi";
import { Link } from "react-router-dom";
import { postErrorToast } from "../../layouts/Toast";
export default function ResetPassword() {
  const [sent, setSent] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSubmited(true);
    if (newPassword !== confirmPassword) {
      postErrorToast("Mật khẩu không khớp");
      setSubmited(false);
      return;
    }
    const token = new URLSearchParams(window.location.search).get("token");
    const response = await resetPassword(token, newPassword);
    if (response != null) {
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
                  <form className="js-validate" onSubmit={handleResetPassword}>
                    <div className="text-center mb-5">
                      <h1 className="display-4">Đặt lại mật khẩu?</h1>
                      <p>Nhập mật khẩu mới của bạn.</p>
                    </div>

                    <div className="divider"></div>
                    <br />

                    {/* Form Group */}
                    <div className="js-form-message form-group">
                      <label className="input-label" htmlFor="passwordInput">
                        <span className="d-flex justify-content-between align-items-center">
                          Mật khẩu
                        </span>
                      </label>

                      <input
                        id="passwordInput"
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    {/* End Form Group */}
                    {/* Form Group */}
                    <div className="js-form-message form-group">
                      <label className="input-label" htmlFor="repasswordInput">
                        <span className="d-flex justify-content-between align-items-center">
                          Nhập lại mật khẩu
                        </span>
                      </label>

                      <input
                        id="repasswordInput"
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
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
                    <h1 className="display-4">Đặt lại mật khẩu thành công</h1>

                    <div className="mt-4 mb-3">
                      <a className="btn btn-primary btn-wide" href="/home">
                        Quay lại trang chủ
                      </a>
                    </div>
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
