import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPackageDetailsBySlug } from "../../api/PublicApi";
import Note from "./Note";
import { getCustomerInfo } from "../../api/CustomersApi";
import { postWarningToast } from "../../layouts/Toast";
import MoneyFormat from "../Custom/MoneyFormat";
const PackageDetails = () => {
  const { slug } = useParams();
  const [packagesInfo, setPackagesInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const PackagesInfo = async () => {
      const tmpPackageInfo = await getPackageDetailsBySlug(slug);
      if (tmpPackageInfo === null) {
        navigate("/error404");
      }
      setPackagesInfo(tmpPackageInfo);
    };

    PackagesInfo();
  }, [slug, navigate]);
  const handleOrder = async () => {
    const tmpCustomerInfo = await getCustomerInfo();
    if (tmpCustomerInfo === null) {
      postWarningToast("Vui lòng đăng nhập trước khi đặt!");
    } else {
      navigate(`/packages/${packagesInfo.id}/booking`);
    }
  };
  const sliderSettings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    // arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <main id="content" role="main" className="main">
      {packagesInfo && (
        <div className="content container-fluid w-95">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-sm mb-2 mb-sm-0">
                <h1 className="page-header-title">{packagesInfo.name}</h1>
              </div>
              <div className="col-sm-auto row">
                <span className="font-size-lg text-cost-lp text-cap">
                  <MoneyFormat amount={packagesInfo.cost} /> vnđ/Khách
                </span>

                <Link
                  className="btn btn-warning-lp ml-4 "
                  onClick={handleOrder}
                >
                  <i className="tio-shopping-cart mr-1"></i> Đặt ngay
                </Link>
              </div>
            </div>
          </div>
          {/* End Page Header */}
          {/* Container Image */}
          <div className="row justify-content-lg-center">
            <div className="col-lg-7 col-md-12 col-sm-12 mb-2">
              <img
                //  src={`http://localhost:8084/api/v1/FileUpload/files/${packagesInfo.imageList ? packagesInfo.imageList[0] : ""}`}
                src={`http://localhost:8084/api/v1/FileUpload/files/${packagesInfo.imageList[0]}`}
                className="img-fluid img-lp"
                alt={`Packges`}
                style={{ height: "560px" }}
              />
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-12 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      {packagesInfo.imageList.length > 1 && (
                        <img
                          src={`http://localhost:8084/api/v1/FileUpload/files/${packagesInfo.imageList[1]}`}
                          className="img-fluid img-lp"
                          alt={`Packges 1`}
                          style={{ height: "180px" }}
                        />
                      )}
                    </div>
                    <div className="col-6">
                      {packagesInfo.imageList.length > 2 && (
                        <img
                          src={`http://localhost:8084/api/v1/FileUpload/files/${packagesInfo.imageList[2]}`}
                          className="img-fluid img-lp"
                          alt={`Packges 2`}
                          style={{ height: "180px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-12">
                  {packagesInfo.imageList.length > 3 && (
                    <img
                      src={`http://localhost:8084/api/v1/FileUpload/files/${packagesInfo.imageList[3]}`}
                      className="img-fluid img-lp"
                      alt={`Packges 3`}
                      style={{ height: "364px" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* End Container Image */}
          <div className="row mt-2">
            <div className="col-lg-4">
              <div className="card mb-3 mb-lg-5">
                <div className="card-header">
                  <h5 className="card-header-title">Thông tin chung</h5>
                </div>

                <div className="card-body">
                  <p>
                    Khởi hành:{" "}
                    <span className="text-dark font-weight-bold">
                      {packagesInfo.startDate}
                    </span>
                  </p>
                  <p>
                    Kết thúc:{" "}
                    <span className="text-dark font-weight-bold">
                      {packagesInfo.endDate}
                    </span>
                  </p>
                  <p>
                    Tổng:{" "}
                    <span className="text-dark font-weight-bold">
                      {packagesInfo.capacity}
                    </span>{" "}
                    người
                  </p>
                  <p>
                    Còn trống:{" "}
                    <span className="text-dark font-weight-bold">
                      {packagesInfo.available}
                    </span>{" "}
                  </p>
                  <p>
                    Hướng dẫn viên:{" "}
                    <span className="text-dark font-weight-bold">
                      {packagesInfo.tourGuidesDto.ho}{" "}
                      {packagesInfo.tourGuidesDto.ten}
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card mb-3 mb-lg-5">
                <div className="card-header">
                  <h5 className="card-header-title">Mô tả</h5>
                </div>

                <div
                  className="card-body card-body-height"
                  style={{ height: "15.6rem" }}
                >
                  <p>{packagesInfo.description}</p>
                </div>
              </div>
            </div>
          </div>
          {/* End Info */}
          {/* Image Place */}
          <div>
            <h1 className="text-center mb-3">Những địa điểm tham quan</h1>
            <Slider {...sliderSettings}>
              {packagesInfo.imageList.map((image, index) => (
                <div key={`Place${index}`} className="col-12 mb-3 mb-lg-5">
                  <div className="card card-sm">
                    <img
                      className="img-fluid img-lp"
                      style={{ height: "250px" }}
                      src={`http://localhost:8084/api/v1/FileUpload/files/${image}`}
                      alt={`Hình ảnh địa điểm ${index}`}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* End Image Place */}
          {/* Image Hotel */}
          <div>
            <h1 className="text-center mb-3">Khách sạn</h1>
            <Slider {...sliderSettings}>
              {packagesInfo.imageHotelList.map((image, index) => (
                <div key={`Hotel${index}`} className="col-12 mb-3 mb-lg-5">
                  <div className="card card-sm">
                    <img
                      className="img-fluid img-lp"
                      style={{ height: "250px" }}
                      src={`http://localhost:8084/api/v1/FileUpload/files/${image}`}
                      alt={`Hình ảnh khách hạn ${index}`}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* End Image Hotel */}
          {/* Lich trinh */}
          <div>
            <h1 className="text-center mb-3">Lịch trình</h1>
          </div>
          <div className="row">
            <div className="col">
              {/* <!-- Card --> */}
              <div className="card">
                {/* <!-- Header --> */}

                {/* <!-- End Header --> */}

                {/* <!-- Body --> */}
                <div className="card-body">
                  {/* <!-- Step --> */}
                  <div>
                    {packagesInfo.dayList.map((day, outerIndex) => (
                      <div key={outerIndex}>
                        <ul className="step step-icon-xs">
                          <li className="step-item">
                            <div className="step-content-wrapper">
                              <div className="font-size-md step-divider d-flex w-100">
                                <span className="text-start">{day.name}</span>
                                <span style={{ marginLeft: "auto" }}>
                                  {day.date}
                                </span>
                              </div>
                            </div>
                          </li>
                          {day.schedulesList.map((schedule, innerIndex) => (
                            <li key={innerIndex} className="step-item">
                              <div className="step-content-wrapper">
                                <span className="step-icon step-icon-info step-icon-pseudo"></span>
                                <div className="step-content">
                                  <div className=" d-flex w-100">
                                    <h5 className="mb-1 text-dark text-start">
                                      {schedule.name}
                                    </h5>
                                    <p
                                      className="font-size-md mb-0"
                                      style={{ marginLeft: "auto" }}
                                    >
                                      {schedule.startTime}{" "}
                                      {schedule.endTime && "-"}{" "}
                                      {schedule.endTime}
                                    </p>
                                  </div>
                                  <p className="font-size-md mb-0">
                                    {schedule.description}
                                  </p>
                                  {schedule.des &&
                                    schedule.des.destinationType &&
                                    schedule.des.id && (
                                      <Link
                                        className="font-size-sm"
                                        to={{
                                          pathname: {
                                            HOTEL: `/hotels/${schedule.des.slug}`,
                                            PLACES_OF_VISIT: `/places/${schedule.des.slug}`,
                                          }[schedule.des.destinationType],
                                        }}
                                        target="_blank"
                                      >
                                        {schedule.des.name}
                                      </Link>
                                    )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* <!-- End Step --> */}
                </div>
                {/* <!-- End Body --> */}
              </div>

              {/* <!-- End Card --> */}
            </div>
          </div>
          {/* End Lich trinh */}
          {/* Lưu ý */}
          <Note />
          {/* End Lưu ý */}

          {/* Bottom */}
          <div
            className="col position-fixed bottom-0 content-centered-x w-100 z-index-99 mb-1"
            style={{
              maxWidth: "60rem",
              maxHeight: "10rem",
            }}
          >
            {/* <!-- Card --> */}
            <div className="card card-sm bg-bottom-lp border-bottom-lp">
              <div className="card-body">
                <div className="row justify-content-center justify-content-sm-between">
                  <div className="col-lg-7 col-md-6 col-sm-6">
                    <div className="font-size-md text-bottom-lp">
                      {packagesInfo.name}
                    </div>
                    <div>
                      <small className="text-muted">
                        Chỉ còn trống {packagesInfo.available} chỗ
                      </small>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="font-size-sm text-cost-lp text-cap">
                      <MoneyFormat amount={packagesInfo.cost} /> vnđ/Khách
                    </div>
                  </div>
                  <div className="col-auto">
                    <Link
                      className="btn btn-warning-lp ml-4 mr-2"
                      onClick={handleOrder}
                    >
                      <i className="tio-shopping-cart mr-1"></i> Đặt ngay
                    </Link>
                  </div>
                </div>
                {/* <!-- End Row --> */}
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
          {/* End Bottom */}
        </div>
      )}
      {/* End Content */}
      {/* Footer */}
      {/* <Footer /> */}
      {/* End Footer */}
    </main>
  );
};

export default PackageDetails;
