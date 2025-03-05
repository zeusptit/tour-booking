import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addRestaurants } from "../../api/RestaurantApi";
import { uploadImage } from "../../api/FileApi";
import { getCityList } from "../../api/AdminApi";
import {
  postErrorToast,
  postSuccessToast,
  postWarningToast,
} from "../../layouts/Toast";
export default function AddRestaurant() {
  const [cityList, setCityList] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "",
    description: "",
    address: "",
    rate: "",
    price: "",
    image: [],
    cityId: "",
  });
  const onInputChange = (e) => {
    setRestaurantInfo({ ...restaurantInfo, [e.target.name]: e.target.value });
  };
  const onSubmit = async () => {
    if (
      !restaurantInfo.name ||
      !restaurantInfo.address ||
      !restaurantInfo.description ||
      restaurantInfo.price <= 0 ||
      !restaurantInfo.price ||
      restaurantInfo.rate <= 0 ||
      !restaurantInfo.rate ||
      !restaurantInfo.cityId ||
      !restaurantInfo.image
    ) {
      postWarningToast("Vui lòng nhập đủ thông tin!");
      return;
    }
    const restaurantRequest = await addRestaurants(restaurantInfo);
    if (restaurantRequest === null) {
      postErrorToast("Lỗi!");
    } else {
      postSuccessToast("Thêm nhà hàng thành công!");
      setTimeout(() => {
        navigate("/admin/restaurants");
      }, 150);
    }
  };
  const handleImageUpload = async (e) => {
    const uploadedImage = await uploadImage(e.target.files[0]);
    if (uploadedImage == null) {
      postErrorToast("Lỗi! Tải ảnh không thành công");
    } else {
      setRestaurantInfo((prevState) => ({
        ...prevState,
        image: [...prevState.image, uploadedImage],
      }));
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const CityList = async () => {
      const tmpCityList = await getCityList();
      if (tmpCityList === null) {
        navigate("/error404");
      }
      setCityList(tmpCityList);
    };
    CityList();
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
                    <Link className="breadcrumb-link" to={"/admin/restaurants"}>
                      Nhà hàng
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Thêm nhà hàng</li>
                </ol>
              </nav>
              <h1 className="page-header-title">Thêm nhà hàng</h1>
            </div>
          </div>
        </div>
        {/* End Page Header */}

        {/* Info */}
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
                    className="form-control"
                    name="name"
                    id="nameLabel"
                    placeholder="Nhập tên nhà hàng"
                    value={restaurantInfo.name}
                    onChange={(e) => onInputChange(e)}
                  />
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
                        className="form-control"
                        name="address"
                        id="addressLabel"
                        placeholder="Nhập địa chỉ"
                        value={restaurantInfo.address}
                        onChange={(e) => onInputChange(e)}
                      />
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
                        className="form-select custom-select"
                        value={restaurantInfo.cityId}
                        onChange={(e) =>
                          setRestaurantInfo({
                            ...restaurantInfo,
                            cityId: e.target.value,
                          })
                        }
                      >
                        <option value="">Chọn tỉnh(tp)</option>
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
                    className="form-control"
                    name="description"
                    id="descriptionLabel"
                    placeholder="Nhập mô tả nhà hàng"
                    style={{ minHeight: "8rem" }}
                    value={restaurantInfo.description}
                    onChange={(e) => onInputChange(e)}
                  />
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
                  {restaurantInfo.image.map((imageName, index) => (
                    <div
                      key={index}
                      className="col-6 col-sm-4 col-md-3 mb-3 mb-lg-5"
                    >
                      <div className="card card-sm">
                        <img
                          className="card-img"
                          src={`http://localhost:8084/api/v1/FileUpload/files/${imageName}`}
                          alt={`Restaurant ${index}`}
                          style={{ width: "200px", height: "200px" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* <!-- End Gallery --> */}

                {/* <!-- Dropzone --> */}

                <div
                  id="attachFilesNewProjectLabel"
                  className="js-dropzone dropzone-custom custom-file-boxed dz-clickable"
                >
                  <div className="dz-message custom-file-boxed-label">
                    <img
                      className="avatar avatar-xl avatar-4by3 mb-3"
                      src={
                        process.env.PUBLIC_URL + "/svg/illustrations/browse.svg"
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
                      type="text"
                      className="form-control"
                      name="price"
                      id="priceNameLabel"
                      placeholder="Nhập giá nhà hàng"
                      value={restaurantInfo.price}
                      onChange={(e) => onInputChange(e)}
                    />
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
                      type="text"
                      className="form-control"
                      name="rate"
                      id="rateLabel"
                      placeholder="Nhập hạng nhà hàng"
                      value={restaurantInfo.rate}
                      onChange={(e) => onInputChange(e)}
                    />
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
                    to={"/admin/restaurants"}
                  >
                    Xoá
                  </Link>
                </div>
                <div className="col-auto">
                  <Link
                    type="button"
                    className="btn btn-ghost-light mr-2"
                    to={"/admin/restaurants"}
                  >
                    Huỷ
                  </Link>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}
                  >
                    Lưu
                  </button>
                </div>
              </div>
              {/* <!-- End Row --> */}
            </div>
          </div>
          {/* <!-- End Card --> */}
        </div>
      </div>
    </main>
  );
}
