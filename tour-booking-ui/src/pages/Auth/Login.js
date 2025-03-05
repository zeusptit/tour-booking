import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { postErrorToast, postSuccessToast } from "../../layouts/Toast";
import Footer from "../../layouts/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function Login() {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .matches(/^\S+@\S+\.\S+$/, "Địa chỉ email không đúng định dạng"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  });
  const registerSchema = yup.object().shape({
    lastName: yup.string().required("Vui lòng nhập họ"),
    firstName: yup.string().required("Vui lòng nhập tên"),
    signupEmail: yup
      .string()
      .required("Vui lòng nhập email")
      .matches(/^\S+@\S+\.\S+$/, "Địa chỉ email không đúng định dạng"),
    signupPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu dài tối thiểu 8 ký tự"),
  });

  const {
    register: registerRegisterForm,
    handleSubmit: handleSubmitRegisterForm,
    formState: { errors: errorsRegisterForm },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const {
    register: registerLoginForm,
    handleSubmit: handleSubmitLoginForm,
    formState: { errors: errorsLoginForm },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const swapForm = (e) => {
    setIsLogin(!isLogin);
  };

  const onSignup = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8084/api/v1/auth/register",
        {
          ten: data.firstName,
          ho: data.lastName,
          email: data.signupEmail,
          password: data.signupPassword,
          role: "TOURGUIDE",
        }
      );

      const result = response.data;

      if (result.status === "error") {
        postErrorToast(result.message);
      } else {
        postSuccessToast(result.message);
        localStorage.setItem("accessToken", result.data);
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onLogin = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8084/api/v1/auth/authenticate",
        data
      );

      const result = response.data;
      console.log(result)
      if (result.status === "error") {
        postErrorToast(result.message);
      } else {
        postSuccessToast(result.message);
        localStorage.setItem("accessToken", result.data.token);
        if (result.data.role === "ADMIN") {
          navigate("/admin");
          console.log(1)
        } else if (result.data.role === "CUSTOMER") {
          navigate("/customer");
          console.log(2)
        } else if (result.data.role === "TOURGUIDE") {
          navigate("/tourguide");
          console.log(3)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center min-h-100 h-100">
        {/* HEADER */}
        <header className="position-absolute top-0 left-0 right-0 mt-3 mx-3">
          <div className="d-flex d-lg-none justify-content-between">
            <a href="index.html">
              <img
                className="w-100"
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt=""
                style={{ minWidth: "2.5rem", maxWidth: "2.5rem" }}
              />
            </a>
          </div>
        </header>
        {/* END HEADER */}

        {/* MAIN CONTENT */}
        <main
          id="content"
          role="main"
          className="main pt-0"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Content */}
          <div className="container-fluid px-3">
            <div className="row">
              {/* Cover */}
              <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative px-0">
                {/* Logo & Language */}
                <div className="position-absolute top-0 left-0 right-0 mt-3 mx-3">
                  <div className="d-none d-lg-flex justify-content-between">
                    <Link to={"/"}>
                      <img
                        className="w-100"
                        alt="logo"
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        style={{
                          minWidth: "12rem",
                          maxWidth: "12rem",
                          filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1))",
                        }}
                      />
                    </Link>
                  </div>
                </div>
                {/* End Logo & Language */}
              </div>
              {/* End Cover */}
              {/* Dang nhap */}

              {isLogin && (
                <div className="col-lg-6 d-flex justify-content-center align-items-center min-vh-lg-100">
                  <div
                    className="w-100 pb-5 card card-lg"
                    style={{ maxWidth: "25rem" }}
                  >
                    <div className="card-body">
                      {/* Form */}
                      <form onSubmit={handleSubmitLoginForm(onLogin)}>
                        <div className="text-center mb-5">
                          <h1 className="display-4">Đăng nhập</h1>
                          <p>
                            Chưa có tài khoản?{" "}
                            <Link onClick={swapForm}>Đăng ký</Link>
                          </p>
                        </div>

                        <div className="divider"></div>
                        <br />

                        {/* Form Group */}
                        <div className="form-group">
                          <label className="input-label" htmlFor="loginEmail">
                            <span className="d-flex justify-content-between align-items-center">
                              Email
                            </span>
                          </label>
                          <div className="input-group">
                            <input
                              type="email"
                              className={`form-control form-control-lg ${
                                errorsLoginForm.email ? "is-invalid" : ""
                              }`}
                              id="loginEmail"
                              placeholder="Booking@thanhhuong.com"
                              {...registerLoginForm("email")}
                            />
                          </div>

                          <div className="error-form-msg">
                            {errorsLoginForm.email?.message}
                          </div>
                        </div>
                        {/* End Form Group */}

                        {/* Form Group */}
                        <div className="form-group mb-1">
                          <label
                            className="input-label"
                            htmlFor="loginPassword"
                          >
                            <span className="d-flex justify-content-between align-items-center">
                              Password
                              <Link
                                className="input-label-secondary"
                                to={"/forgotPassword"}
                                tabIndex={-1}
                              >
                                Quên mật khẩu?
                              </Link>
                            </span>
                          </label>

                          <div className="input-group">
                            <input
                              type="password"
                              className={`form-control form-control-lg ${
                                errorsLoginForm.password ? "is-invalid" : ""
                              }`}
                              id="loginPassword"
                              placeholder="Nhập Mật khẩu"
                              {...registerLoginForm("password")}
                            />
                          </div>
                          <div className="error-form-msg">
                            {errorsLoginForm.password?.message}
                          </div>
                        </div>
                        {/* End Form Group */}

                        {/* Checkbox */}
                        <div className="form-group">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="termsCheckbox"
                              name="termsCheckbox"
                            />
                            <label
                              className="custom-control-label text-muted"
                              htmlFor="termsCheckbox"
                            >
                              Lưu đăng nhập
                            </label>
                          </div>
                        </div>
                        {/* End Checkbox */}

                        <button
                          type="submit"
                          className="btn btn-lg btn-block btn-primary"
                        >
                          Đăng nhập
                        </button>
                      </form>
                      {/* End Form */}
                    </div>
                  </div>
                </div>
              )}
              {/* Dang ky */}
              {!isLogin && (
                <div className="col-lg-6 d-flex justify-content-center align-items-center min-vh-lg-100">
                  <div
                    className="w-100 pt-10 pt-lg-1 pb-1 card card-lg mb-2"
                    style={{ maxWidth: "25rem" }}
                  >
                    <div className="card-body">
                      {/* Form */}
                      <form onSubmit={handleSubmitRegisterForm(onSignup)}>
                        <div className="text-center mb-1">
                          <h1 className="display-4">Đăng ký</h1>
                          <p>
                            Đã có tài khoản?{" "}
                            <Link onClick={swapForm}>Đăng nhập</Link>
                          </p>
                        </div>

                        <div className="divider"></div>
                        <br />
                        {/* Form Group */}
                        <div className="form-group mb-2">
                          <label className="input-label" htmlFor="lastName">
                            <span className="d-flex justify-content-between align-items-center">
                              Họ
                            </span>
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className={`form-control form-control-md ${
                                errorsRegisterForm.lastName ? "is-invalid" : ""
                              }`}
                              id="lastName"
                              placeholder="Nhập họ"
                              {...registerRegisterForm("lastName")}
                            />
                          </div>

                          <div className="error-form-msg">
                            {errorsRegisterForm.lastName?.message}
                          </div>
                        </div>
                        {/* End Form Group */}
                        {/* Form Group */}
                        <div className="form-group mb-2">
                          <label className="input-label" htmlFor="firstName">
                            <span className="d-flex justify-content-between align-items-center">
                              Tên
                            </span>
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className={`form-control form-control-md ${
                                errorsRegisterForm.firstName ? "is-invalid" : ""
                              }`}
                              id="firstName"
                              placeholder="Nhập tên"
                              {...registerRegisterForm("firstName")}
                            />
                          </div>

                          <div className="error-form-msg">
                            {errorsRegisterForm.firstName?.message}
                          </div>
                        </div>
                        {/* End Form Group */}

                        {/* Form Group */}
                        <div className="form-group mb-2">
                          <label className="input-label" htmlFor="signupEmail">
                            <span className="d-flex justify-content-between align-items-center">
                              Email
                            </span>
                          </label>
                          <div className="input-group">
                            <input
                              type="email"
                              className={`form-control form-control-md ${
                                errorsRegisterForm.signupEmail
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="signupEmail"
                              placeholder="Nhập email"
                              {...registerRegisterForm("signupEmail")}
                            />
                          </div>

                          <div className="error-form-msg">
                            {errorsRegisterForm.signupEmail?.message}
                          </div>
                        </div>
                        {/* End Form Group */}

                        {/* Form Group */}
                        <div className="form-group">
                          <label
                            className="input-label"
                            htmlFor="signupPassword"
                          >
                            <span className="d-flex justify-content-between align-items-center">
                              Password
                            </span>
                          </label>

                          <div className="input-group">
                            <input
                              type="password"
                              className={`form-control form-control-md ${
                                errorsRegisterForm.signupPassword
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="signupPassword"
                              placeholder="Nhập mật khẩu"
                              {...registerRegisterForm("signupPassword")}
                            />
                          </div>

                          <div className="error-form-msg">
                            {errorsRegisterForm.signupPassword?.message}
                          </div>
                        </div>
                        {/* End Form Group */}

                        {/* Checkbox */}
                        {/* <div className="form-group">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="termsCheckbox"
                              name="termsCheckbox"
                            />
                            <label
                              className="custom-control-label text-muted"
                              htmlFor="termsCheckbox"
                            >
                              Đồng ý với các điều khoản
                            </label>
                          </div>
                        </div> */}
                        {/* End Checkbox */}

                        <button
                          type="submit"
                          className="btn btn-md btn-block btn-primary"
                        >
                          Đăng ký
                        </button>
                      </form>
                      {/* End Form */}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* End Row */}
          </div>
          {/* End Content */}
        </main>
        {/* END MAIN CONTENT */}
      </div>
      <Footer />
    </div>
  );
}
