import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addPackages } from "../../api/PackagesApi";
import { getAllTourGuides } from "../../api/AdminApi";
import { postSuccessToast } from "../../layouts/Toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
export default function AddPackages() {
  const [tourGuideList, setTourGuideList] = useState([]);
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên gói tour"),
    startDate: yup.string().required("Vui lòng nhập ngày bắt đầu"),
    endDate: yup.string().required("Vui lòng nhập ngày kết thúc"),
    description: yup.string().required("Vui lòng nhập mô tả"),
    tourGuidesId: yup
      .number()
      .typeError("Mã hướng dẫn viên phải là số")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .required("Vui lòng chọn hướng dẫn viên"),
    cost: yup
      .number()
      .typeError("Giá phải là số")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .required("Vui lòng nhập giá")
      .min(1, "Giá phải lớn hơn 0"),

    capacity: yup
      .number()
      .typeError("Số người phải là số")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .required("Vui lòng nhập số lượng người")
      .min(1, "Số người phải lớn hơn 0"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      capacity: data.capacity,
      cost: data.cost,
      startDate: data.startDate,
      endDate: data.endDate,
      description: data.description,
      tourGuidesDto: {
        id: data.tourGuidesId,
      },
    };

    const packagesRequest = await addPackages(formData);
    if (packagesRequest != null) {
      postSuccessToast("Thêm gói thành công!");
      setTimeout(() => {
        navigate("/admin/packages");
      }, 150);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const TourGuideList = async () => {
      const tmpTourGuideList = await getAllTourGuides();
      if (tmpTourGuideList === null) {
        navigate("/error404");
      }
      setTourGuideList(tmpTourGuideList);
    };
    TourGuideList();
  }, [navigate]);
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ overflowY: "auto" }}
    >
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/admin/packages"}>
                      Gói
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Thêm gói</li>
                </ol>
              </nav>
              <h1 className="page-header-title">Thêm gói</h1>
            </div>
          </div>
        </div>
        {/* End Page Header */}

        {/* Info */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-8">
              {/* <!-- Card --> */}
              <div className="card mb-3 mb-lg-5">
                {/* <!-- Header --> */}
                <div className="card-header">
                  <h4 className="card-header-title">Thông tin</h4>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Body --> */}
                <div className="card-body">
                  {/* <!-- Form Group --> */}
                  <div className="form-group">
                    <label htmlFor="nameLabel" className="input-label">
                      Tên
                    </label>
                    <input
                      type="text"
                      className={`form-control  ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="nameLabel"
                      placeholder="Nhập tên gói"
                      {...register("name")}
                    />
                    <div className="error-form-msg">{errors.name?.message}</div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  <div className="row">
                    <div className="col-sm-6">
                      {/* <!-- Form Group --> */}
                      <div className="form-group">
                        <label htmlFor="startLabel" className="input-label">
                          Ngày bắt đầu
                        </label>

                        <input
                          type="date"
                          className={`form-control  ${
                            errors.startDate ? "is-invalid" : ""
                          }`}
                          id="startLabel"
                          {...register("startDate")}
                        />
                        <div className="error-form-msg">
                          {errors.startDate?.message}
                        </div>
                      </div>
                      {/* <!-- End Form Group --> */}
                    </div>

                    <div className="col-sm-6">
                      {/* <!-- Form Group --> */}
                      <div className="form-group">
                        <label htmlFor="endLabel" className="input-label">
                          Ngày kết thúc
                        </label>

                        <input
                          type="date"
                          className={`form-control  ${
                            errors.endDate ? "is-invalid" : ""
                          }`}
                          id="endLabel"
                          {...register("endDate")}
                        />
                        <div className="error-form-msg">
                          {errors.endDate?.message}
                        </div>
                      </div>
                      {/* <!-- End Form Group --> */}
                    </div>
                  </div>
                  {/* <!-- End Row --> */}

                  {/* <!-- Form Group --> */}
                  <div className="form-group">
                    <label htmlFor="descriptionLabel" className="input-label">
                      Mô tả
                    </label>
                    <textarea
                      type="text"
                      className={`form-control  ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      id="descriptionLabel"
                      placeholder="Nhập mô tả gói"
                      style={{ minHeight: "8.9rem" }}
                      {...register("description")}
                    />
                    <div className="error-form-msg">
                      {errors.description?.message}
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}
                </div>
                {/* <!-- Body --> */}
              </div>
              {/* <!-- End Card --> */}
            </div>

            <div className="col-lg-4">
              {/* <!-- Card --> */}
              <div className="card mb-3 mb-lg-5">
                {/* <!-- Header --> */}
                <div className="card-header">
                  <h4 className="card-header-title">Giá</h4>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Body --> */}
                <div className="card-body">
                  {/* <!-- Form Group --> */}
                  <div className="form-group">
                    <label htmlFor="costLabel" className="input-label">
                      Giá
                    </label>

                    <div className="input-group input-group-merge">
                      <input
                        type="number"
                        className={`form-control  ${
                          errors.cost ? "is-invalid" : ""
                        }`}
                        id="costLabel"
                        placeholder="Nhập giá tour"
                        {...register("cost")}
                      />
                      <div className="error-form-msg">
                        {errors.cost?.message}
                      </div>
                      <div className="input-group-append">
                        <i className="custom-select">
                          <span>VNĐ</span>
                        </i>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="capacityLabel" className="input-label">
                      Số lượng người
                    </label>

                    <div className="input-group input-group-merge">
                      <input
                        type="number"
                        className={`form-control  ${
                          errors.capacity ? "is-invalid" : ""
                        }`}
                        id="capacityLabel"
                        placeholder="Nhập số lượng người"
                        {...register("capacity")}
                      />
                      <div className="error-form-msg">
                        {errors.capacity?.message}
                      </div>
                      <div className="input-group-append">
                        <i className="custom-select">
                          <span>Người</span>
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Body --> */}
              </div>
              {/* <!-- End Card --> */}
              <div className="card">
                <div className="card-header">
                  <h4 className="card-header-title">Hướng dẫn viên</h4>
                </div>

                <div className="card-body">
                  <div className="form-group">
                    <select
                      id="tourGuidesLabel"
                      className={`form-select custom-select ${
                        errors.tourGuidesId ? "is-invalid" : ""
                      }`}
                      {...register("tourGuidesId")}
                    >
                      <option value="">Chọn hướng dẫn viên</option>
                      {tourGuideList.map((tourguide) => (
                        <option key={tourguide.id} value={tourguide.id}>
                          {tourguide.ho} {tourguide.ten} {tourguide.phone}
                        </option>
                      ))}
                    </select>
                    <div className="error-form-msg">
                      {errors.tourGuidesId?.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* End Info */}

          {/* Edit box */}

          <div
            className="position-fixed bottom-0 content-centered-x w-100 z-index-99 mb-3"
            style={{ maxWidth: "40rem" }}
          >
            {/* <!-- Card --> */}
            <div className="card card-sm bg-dark border-dark mx-2">
              <div className="card-body">
                <div className="row justify-content-center justify-content-sm-between">
                  <div className="col">
                    <Link
                      type="button"
                      className="btn btn-ghost-danger"
                      to={"/admin/packages"}
                    >
                      Xoá
                    </Link>
                  </div>
                  <div className="col-auto">
                    <Link
                      type="button"
                      className="btn btn-ghost-light mr-2"
                      to={"/admin/packages"}
                    >
                      Huỷ
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Lưu
                    </button>
                  </div>
                </div>
                {/* <!-- End Row --> */}
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
        </form>
      </div>
    </main>
  );
}
