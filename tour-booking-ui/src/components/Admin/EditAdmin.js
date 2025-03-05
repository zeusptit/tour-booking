import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { editAdminInfo } from "../../api/AdminApi";
import "react-toastify/dist/ReactToastify.css";
import { postSuccessToast } from "../../layouts/Toast";
import { useForm } from "react-hook-form";
function EditAdmin(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoad, setIsLoad] = useState(false);

  if (isLoad === false && props.adminInfo) {
    setIsLoad(true);
    reset(props.adminInfo);
  }

  const onSubmit = async (data) => {
    const res = await editAdminInfo(data);
    if (res != null) postSuccessToast("Lưu thành công!");
  };

  return (
    <main id="content" role="main" className="main">
      <div className="content container-fluid">
        <div className="row justify-content-lg-center">
          <div className="col-lg-8">
            <div id="addUserStepProfile" className="card card-lg active">
              <div className="card-header">
                <h1 className="card-header-title">Thông tin</h1>
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
                        disabled
                        {...register("email")}
                      />
                    </div>
                  </div>

                  <div className="row form-group">
                    <label
                      htmlFor="membershipLabel"
                      className="col-sm-3 col-form-label input-label"
                    >
                      Chức vụ
                    </label>

                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="membershipLabel"
                        name="membership"
                        disabled
                        {...register("title")}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-end align-items-center">
                  <Link className="btn btn-outline-danger mx-2" to="/admin">
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
EditAdmin.propTypes = {
  adminInfo: PropTypes.shape({
    id: PropTypes.number,
    ho: PropTypes.string,
    ten: PropTypes.string,
    title: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default EditAdmin;
