import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { addVouchers } from "../../api/VoucherApi";
import { postSuccessToast } from "../../layouts/Toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function AddVoucher() {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên"),
    startTime: yup.string().required("Vui lòng nhập ngày bắt đầu"),
    endTime: yup.string().required("Vui lòng nhập ngày kết thúc"),
    percent: yup
      .number()
      .typeError("Phần trăm phải là số")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .required("Vui lòng nhập phần trăm")
      .min(1, "Phần trăm phải lớn hơn 0")
      .max(100, "Phần trăm phải nhỏ hơn 100"),
    amount: yup
      .number()
      .typeError("Số lượng phải là số")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .required("Vui lòng nhập số lượng")
      .min(1, "Số lượng phải lớn hơn 0"),
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const voucherRequest = await addVouchers(data);
    if (voucherRequest != null) {
      postSuccessToast("Thêm voucher thành công!");
      setTimeout(() => {
        navigate("/admin/vouchers");
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
                    <Link className="breadcrumb-link" to={"/admin/vouchers"}>
                      Mã giảm giá
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Thêm Mã giảm giá</li>
                </ol>
              </nav>
              <h1 className="page-header-title">Thêm Mã giảm giá</h1>
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
                      htmlFor="nameLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Tên
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="text"
                        className={`form-control  ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập tên mã giảm giá"
                        id="nameLabel"
                        {...register("name")}
                      />

                      <div className="error-form-msg">
                        {errors.name?.message}
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="startTimeLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Bắt đầu
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="date"
                        className={`form-control  ${
                          errors.startTime ? "is-invalid" : ""
                        }`}
                        id="startTimeLabel"
                        {...register("startTime")}
                      />

                      <div className="error-form-msg">
                        {errors.startTime?.message}
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="endTimeLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Kết thúc
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="date"
                        className={`form-control  ${
                          errors.endTime ? "is-invalid" : ""
                        }`}
                        id="endTimeLabel"
                        {...register("endTime")}
                      />

                      <div className="error-form-msg">
                        {errors.endTime?.message}
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="percentLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Phần trăm
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="number"
                        className={`form-control  ${
                          errors.percent ? "is-invalid" : ""
                        }`}
                        id="percentLabel"
                        {...register("percent")}
                      />

                      <div className="error-form-msg">
                        {errors.percent?.message}
                      </div>
                    </div>
                  </div>

                  <div className="row form-group mb-1">
                    <label
                      htmlFor="amountLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Số lượng
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="number"
                        className={`form-control  ${
                          errors.amount ? "is-invalid" : ""
                        }`}
                        id="amountLabel"
                        {...register("amount")}
                      />

                      <div className="error-form-msg">
                        {errors.amount?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-end align-items-center">
                  <Link
                    className="btn btn-outline-danger mx-2"
                    to="/admin/vouchers"
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
