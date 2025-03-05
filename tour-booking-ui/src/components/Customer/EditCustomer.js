import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { editCustomerInfo } from "../../api/CustomersApi";
import "react-toastify/dist/ReactToastify.css";
import { postSuccessToast } from "../../layouts/Toast";
import { useForm } from "react-hook-form";
function EditCustomer(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoad, setIsLoad] = useState(false);

  if (isLoad === false && props.customerInfo) {
    reset(props.customerInfo);
    setIsLoad(true);
  }
  const onSubmit = async (data) => {
    const res = await editCustomerInfo(data);
    if (res != null) postSuccessToast("Lưu thành công!");
  };
  return (
    <main id="content" role="main" className="main">
      <div className="content container-fluid">
        <div className="row justify-content-lg-center">
          <div className="col-lg-8">
            <div id="addUserStepProfile" className="card card-lg active">
              <div className="card-header">
                <h4 className="card-header-title">Thông tin</h4>
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
                            errors.ho ? "is-invalid" : ""
                          }`}
                          id="lastNameLabel"
                          placeholder="Nhập họ"
                          {...register("ho", {
                            required: "Vui lòng nhập họ",
                          })}
                        />
                        <input
                          type="text"
                          className={`form-control ${
                            errors.ten ? "is-invalid" : ""
                          }`}
                          id="firstNameLabel"
                          placeholder="Nhập tên"
                          {...register("ten", {
                            required: "Vui lòng nhập tên",
                          })}
                        />
                      </div>
                      <div className="error-form-msg">{errors.ho?.message}</div>

                      <div className="error-form-msg">
                        {errors.ten?.message}
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
                        className="form-control"
                        id="emailLabel"
                        {...register("email")}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="phoneLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Số điện thoại
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        id="phoneLabel"
                        {...register("phone", {
                          required: "Vui lòng nhập số điện thoại",
                        })}
                      />
                      <div className="error-form-msg">
                        {errors.phone?.message}
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="dobLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Ngày sinh
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="date"
                        className={`form-control ${
                          errors.dob ? "is-invalid" : ""
                        }`}
                        id="dobLabel"
                        {...register("dob", {
                          required: "Vui lòng nhập ngày sinh",
                        })}
                      />
                      <div className="error-form-msg">
                        {errors.dob?.message}
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <label
                      htmlFor="membershipLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Hạng thành viên
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="membershipLabel"
                        name="membership"
                        {...register("membership")}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-end align-items-center">
                  <Link className="btn btn-outline-danger mx-2" to="/customer">
                    Cancel <i className="tio-appointment-cancelled"></i>
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
EditCustomer.propTypes = {
  customerInfo: PropTypes.shape({
    id: PropTypes.number,
    ho: PropTypes.string,
    ten: PropTypes.string,
    dob: PropTypes.string,
    membership: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default EditCustomer;
