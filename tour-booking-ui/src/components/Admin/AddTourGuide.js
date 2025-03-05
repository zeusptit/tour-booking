import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as addTourGuide } from "../../api/auth";
import { postSuccessToast } from "../../layouts/Toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function AddTourGuide() {
  const schema = yup.object().shape({
    lastName: yup.string().required("Vui lòng nhập họ"),
    firstName: yup.string().required("Vui lòng nhập tên"),
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .matches(/^\S+@\S+\.\S+$/, "Địa chỉ email không đúng định dạng"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu dài tối thiểu 8 ký tự"),
    salary: yup
      .number()
      .typeError("Lương phải là số")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .required("Vui lòng nhập lương")
      .min(1, "Lương phải lớn hơn 0"),
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = {
      ho: data.lastName,
      ten: data.firstName,
      salary: data.salary,
      email: data.email,
      password: data.password,
      role: "TOURGUIDE",
    };
    const registerRequest = await addTourGuide(formData);
    if (registerRequest != null) {
      postSuccessToast("Thêm hướng dẫn viên thành công!");

      setTimeout(() => {
        navigate("/admin/tourguides");
      }, 200);
    }
  };
  return (
    <main id="content" role="main" className="main">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/admin/tourguides"}>
                      Hướng Dẫn Viên
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Thêm Hướng Dẫn Viên
                  </li>
                </ol>
              </nav>
              <h1 className="page-header-title">Thêm Hướng Dẫn Viên</h1>
            </div>
          </div>
        </div>
        {/* End Page Header */}

        <div className="row justify-content-lg-center">
          <div className="col-lg-8">
            <div id="addUserStepProfile" className="card card-lg active">
              <div className="card-header">
                <h4 className="card-header-title">Thông Tin</h4>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                  <div className="row form-group">
                    <label
                      htmlFor="firstNameLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Họ và tên{" "}
                    </label>

                    <div className="col-sm-9">
                      <div className="input-group input-group-sm-down-break">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.lastName ? "is-invalid" : ""
                          }`}
                          id="lastNameLabel"
                          placeholder="Nhập họ"
                          {...register("lastName")}
                        />
                        <input
                          type="text"
                          className={`form-control  ${
                            errors.firstName ? "is-invalid" : ""
                          }`}
                          id="firstNameLabel"
                          placeholder="Nhập tên"
                          {...register("firstName")}
                        />
                      </div>

                      <div className="error-form-msg">
                        {errors.lastName?.message}
                      </div>

                      <div className="error-form-msg">
                        {errors.firstName?.message}
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="emailLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Email
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="email"
                        className={`form-control  ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập email"
                        id="emailLabel"
                        {...register("email")}
                      />

                      <div className="error-form-msg">
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="passwordLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Mật khẩu
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="password"
                        className={`form-control  ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        id="passwordLabel"
                        placeholder="Nhập mật khẩu"
                        {...register("password")}
                      />

                      <div className="error-form-msg">
                        {errors.password?.message}
                      </div>
                    </div>
                  </div>

                  <div className="row form-group mb-2">
                    <label
                      htmlFor="salaryLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Lương
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="number"
                        className={`form-control  ${
                          errors.salary ? "is-invalid" : ""
                        }`}
                        id="salaryLabel"
                        placeholder="Nhập lương"
                        {...register("salary")}
                      />

                      <div className="error-form-msg">
                        {errors.salary?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-end align-items-center">
                  <Link
                    className="btn btn-outline-danger mx-2"
                    to="/admin/tourguides"
                  >
                    Huỷ <i className="tio-appointment-cancelled"></i>
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Lưu <i className="tio-save"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
