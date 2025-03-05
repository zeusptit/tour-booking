import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getHotelById, editHotels, deleteHotels } from "../../api/HotelApi";
import { getCityList } from "../../api/AdminApi";
import { uploadImage } from "../../api/FileApi";
import {
  postErrorToast,
  postSuccessToast,
  postWarningToast,
} from "../../layouts/Toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
export default function HotelDetails() {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên khách sạn"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    description: yup.string().required("Vui lòng nhập mô tả"),
    cityId: yup
      .number()
      .typeError("Mã tỉnh phải là số")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required("Vui lòng chọn tỉnh, thành phố"),
    price: yup
      .number()
      .typeError("Giá phải là số")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required("Vui lòng nhập giá")
      .min(1, "Giá phải lớn hơn 0"),
    rate: yup
      .number()
      .typeError("Hạng phải là số")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required("Vui lòng nhập hạng")
      .min(1, "Hạng phải lớn hơn 0")
      .max(5, "Hạng phải nhỏ hơn 5"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { id } = useParams();

  const [cityList, setCityList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [hotelInfo, setHotelInfo] = useState({
    id: id,
    name: "",
    description: "",
    address: "",
    destinationType: "",
    rate: "",
    price: "",
    image: [],
    cityId: "",
    cityName: "",
  });
  const [editMode, setEditMode] = useState(false);
  const handleCloseEdit = () => {
    setImageList(hotelInfo.image);
    reset(hotelInfo);
    setEditMode(false);
  };
  const handleShowEdit = () => {
    setEditMode(true);
  };

  const handleImageUpload = async (e) => {
    const uploadedImage = await uploadImage(e.target.files[0]);
    if (uploadedImage == null) {
      postErrorToast("Lỗi! Tải ảnh không thành công");
    } else {
      setImageList((prevImageList) => [...prevImageList, uploadedImage]);
    }
  };
  const removeImage = (imageNameToRemove) => {
    setImageList((prevState) =>
      prevState.filter((image) => image !== imageNameToRemove)
    );
  };
  const onSubmit = async (data) => {
    if (imageList.length === 0) {
      postWarningToast("Vui lòng thêm ảnh!");
      return;
    }
    const formData = {
      name: data.name,
      description: data.description,
      address: data.address,
      rate: data.rate,
      price: data.price,
      image: imageList,
      cityId: data.cityId,
    };
    const hotelRequest = await editHotels(id, formData);
    if (hotelRequest != null) {
      postSuccessToast("Sửa khách sạn thành công!");
      reset(hotelRequest);
      setImageList(hotelRequest.image);
      setTimeout(() => {
        setHotelInfo(hotelRequest);
        setEditMode(false);
      }, 10);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const HotelInfo = async () => {
      const tmpHotelInfo = await getHotelById(id);
      if (tmpHotelInfo === null) {
        navigate("/error404");
      }
      setHotelInfo(tmpHotelInfo);
      setImageList(tmpHotelInfo.image);
      reset(tmpHotelInfo);
    };
    const CityList = async () => {
      const tmpCityList = await getCityList();
      if (tmpCityList === null) {
        navigate("/error404");
      }
      setCityList(tmpCityList);
    };
    CityList();
    HotelInfo();
  }, [id, navigate]);
  const handleDelete = async () => {
    const request = await deleteHotels(id);
    postSuccessToast("Xoá khách sạn thành công!");
    navigate("/admin/hotels");
  };
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
                    <Link className="breadcrumb-link" to={"/admin/hotels"}>
                      Khách sạn
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Thông tin khách sạn
                  </li>
                </ol>
              </nav>
              <h1 className="page-header-title">Khách sạn: {hotelInfo.name}</h1>
            </div>

            <div className="col-sm-auto d-print-none">
              <Link
                className="mr-3"
                onClick={(e) => {
                  e.preventDefault();
                  window.print();
                }}
              >
                <i className="tio-print mr-1"></i> In
              </Link>
            </div>
            {!editMode && (
              <div className="col-sm-auto d-print-none">
                <button className="btn btn-primary" onClick={handleShowEdit}>
                  <i className="tio-draft mr-1"></i> Sửa
                </button>
              </div>
            )}
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
                      placeholder="Nhập tên khách sạn"
                      {...register("name")}
                      disabled={!editMode}
                    />
                    <div className="error-form-msg">{errors.name?.message}</div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  <div className="row">
                    <div className="col-sm-6">
                      {/* <!-- Form Group --> */}
                      <div className="form-group">
                        <label htmlFor="addressLabel" className="input-label">
                          Địa chỉ
                        </label>

                        <input
                          type="text"
                          className={`form-control  ${
                            errors.address ? "is-invalid" : ""
                          }`}
                          id="addressLabel"
                          placeholder="Nhập địa chỉ"
                          {...register("address")}
                          disabled={!editMode}
                        />
                        <div className="error-form-msg">
                          {errors.address?.message}
                        </div>
                      </div>
                      {/* <!-- End Form Group --> */}
                    </div>

                    <div className="col-sm-6">
                      {/* <!-- Form Group --> */}
                      <div className="form-group">
                        <label htmlFor="cityNameLabel" className="input-label">
                          Tỉnh(Tp)
                        </label>
                        <select
                          id="cityNameLabel"
                          className={`form-select custom-select ${
                            errors.cityId ? "is-invalid" : ""
                          }`}
                          {...register("cityId")}
                          disabled={!editMode}
                        >
                          <option value="">Chọn tỉnh (tp)</option>
                          {cityList.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
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
                      placeholder="Nhập mô tả khách sạn"
                      style={{ minHeight: "8rem" }}
                      {...register("description")}
                      disabled={!editMode}
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

              {/* <!-- Card --> */}
              <div className="card mb-3 mb-lg-5">
                {/* <!-- Header --> */}
                <div className="card-header">
                  <h4 className="card-header-title">Media</h4>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Body --> */}
                <div className="card-body">
                  {/* <!-- Gallery --> */}
                  <div
                    id="fancyboxGallery"
                    className="js-fancybox row justify-content-sm-left gx-2"
                  >
                    {imageList.map((imageName, index) => (
                      <div
                        key={index}
                        className="col-6 col-sm-4 col-md-3 mb-3 mb-lg-5"
                      >
                        <div className="card card-sm">
                          <img
                            className="card-img-top"
                            src={`http://localhost:8084/api/v1/FileUpload/files/${imageName}`}
                            alt={`Hotel ${index}`}
                          />

                          <div className="card-body">
                            <div className="row text-center">
                              <div className="col">
                                <a
                                  className="js-fancybox-item text-body"
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`http://localhost:8084/api/v1/FileUpload/files/${imageName}`}
                                >
                                  <i className="tio-visible-outlined"></i>
                                </a>
                              </div>

                              <div className="col column-divider">
                                <Link
                                  className="text-danger"
                                  style={{
                                    cursor: "pointer",
                                    opacity: !editMode ? 0.5 : 1,
                                    pointerEvents: !editMode ? "none" : "auto",
                                  }}
                                  onClick={(e) => removeImage(imageName)}
                                >
                                  <i className="tio-delete-outlined"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <!-- End Gallery --> */}

                  {/* <!-- Dropzone --> */}
                  {editMode && (
                    <div
                      id="attachFilesNewProjectLabel"
                      className="js-dropzone dropzone-custom custom-file-boxed dz-clickable"
                    >
                      <div className="dz-message custom-file-boxed-label">
                        <img
                          className="avatar avatar-xl avatar-4by3 mb-3"
                          src={
                            process.env.PUBLIC_URL +
                            "/svg/illustrations/browse.svg"
                          }
                          alt="Upload"
                        />
                        <h5 className="mb-1">Chọn ảnh để tải lên</h5>
                        <p className="mb-2"></p>

                        <label
                          htmlFor="fileInput"
                          className="btn btn-sm btn-primary"
                        >
                          Chọn ảnh
                        </label>
                        <input
                          id="fileInput"
                          type="file"
                          className="d-none"
                          onChange={(e) => handleImageUpload(e)}
                        />
                      </div>
                    </div>
                  )}
                  {/* <!-- End Dropzone --> */}
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
                    <label htmlFor="priceNameLabel" className="input-label">
                      Giá
                    </label>

                    <div className="input-group input-group-merge">
                      <input
                        type="number"
                        className={`form-control  ${
                          errors.price ? "is-invalid" : ""
                        }`}
                        id="priceNameLabel"
                        placeholder="Nhập giá khách sạn"
                        {...register("price")}
                        disabled={!editMode}
                      />
                      <div className="error-form-msg">
                        {errors.price?.message}
                      </div>
                      <div className="input-group-append">
                        <i className="custom-select">
                          <span>VNĐ</span>
                        </i>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="rateLabel" className="input-label">
                      Hạng
                    </label>

                    <div className="input-group input-group-merge">
                      <input
                        type="number"
                        className={`form-control  ${
                          errors.rate ? "is-invalid" : ""
                        }`}
                        id="rateLabel"
                        placeholder="Nhập hạng khách sạn"
                        {...register("rate")}
                        disabled={!editMode}
                      />
                      <div className="error-form-msg">
                        {errors.rate?.message}
                      </div>
                      <div className="input-group-append">
                        <i className="custom-select">
                          <i className="tio-star tio-lg text-warning mr-1"></i>
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Body --> */}
              </div>
              {/* <!-- End Card --> */}
            </div>
          </div>

          {/* End Info */}

          {/* Edit box */}
          {editMode && (
            <div
              className="position-fixed bottom-0 content-centered-x w-100 z-index-99 mb-3"
              style={{ maxWidth: "40rem" }}
            >
              {/* <!-- Card --> */}
              <div className="card card-sm bg-dark border-dark mx-2">
                <div className="card-body">
                  <div className="row justify-content-center justify-content-sm-between">
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-ghost-danger"
                        onClick={handleDelete}
                      >
                        Xoá
                      </button>
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-ghost-light mr-2"
                        onClick={handleCloseEdit}
                      >
                        Huỷ
                      </button>
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
          )}
        </form>
      </div>
    </main>
  );
}
