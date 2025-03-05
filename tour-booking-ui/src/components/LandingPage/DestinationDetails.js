import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDestinationDetails } from "../../api/PublicApi";

import MoneyFormat from "../Custom/MoneyFormat";
const DestinationDetails = () => {
  const { slug } = useParams();
  const [desInfo, setDesInfo] = useState(null);
  const navigate = useNavigate();
  const renderStarRating = (rate) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rate); i++) {
      stars.push(<i className="tio-star tio-lg text-warning"></i>);
    }

    if (rate - Math.floor(rate) > 0.5) {
      stars.push(<i className=" tio-star-half tio-lg text-warning"></i>);
    }
    return stars;
  };
  useEffect(() => {
    const fetchDesInfo = async () => {
      const tmpDes = await getDestinationDetails(slug);
      if (tmpDes === null) {
        navigate("/error404");
      }
      setDesInfo(tmpDes);
    };

    fetchDesInfo();
  }, [slug, navigate]);

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
      {desInfo && (
        <div className="content container-fluid w-95">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-sm mb-2 mb-sm-0">
                <h1 className="page-header-title">{desInfo.name}</h1>
              </div>
              <div className="col-sm-auto row">
                <span className="font-size-lg text-cost-lp text-cap">
                  {desInfo.price === 0 ? (
                    "Miễn phí"
                  ) : (
                    <MoneyFormat amount={desInfo.price} />
                  )}
                  {desInfo.price !== 0 && "vnđ/Khách"}
                </span>
                {/* <span className="font-size-lg text-cost-lp text-cap">
                  <MoneyFormat amount={desInfo.price} /> vnđ/Khách
                </span> */}
              </div>
            </div>
          </div>
          {/* End Page Header */}
          {/* Container Image */}
          <div className="row justify-content-lg-center">
            <div className="col-lg-7 col-md-12 col-sm-12 mb-2">
              <img
                //  src={`http://localhost:8084/api/v1/FileUpload/files/${packagesInfo.imageList ? packagesInfo.imageList[0] : ""}`}
                src={`http://localhost:8084/api/v1/FileUpload/files/${desInfo.image[0]}`}
                className="img-fluid img-lp"
                alt="desinfo0"
                style={{ height: "560px" }}
              />
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-12 col-12">
                  <div className="row mb-3">
                    <div className="col-6">
                      {desInfo.image.length > 1 && (
                        <img
                          src={`http://localhost:8084/api/v1/FileUpload/files/${desInfo.image[1]}`}
                          className="img-fluid img-lp"
                          alt="desinfo1"
                          style={{ height: "180px" }}
                        />
                      )}
                    </div>
                    <div className="col-6">
                      {desInfo.image.length > 2 && (
                        <img
                          src={`http://localhost:8084/api/v1/FileUpload/files/${desInfo.image[2]}`}
                          className="img-fluid img-lp"
                          alt="desinfo2"
                          style={{ height: "180px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-12">
                  {desInfo.image.length > 3 && (
                    <img
                      src={`http://localhost:8084/api/v1/FileUpload/files/${desInfo.image[3]}`}
                      className="img-fluid img-lp"
                      alt="desinfo3"
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
                    Địa chỉ:{" "}
                    <span className="text-dark font-weight-bold">
                      {desInfo.address}, {desInfo.cityName}
                    </span>
                  </p>
                  <p>
                    Đánh giá:{" "}
                    <span className="ml-1 text-dark font-weight-bold"></span>
                    {renderStarRating(desInfo.rate)}
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
                  style={{ height: "10rem" }}
                >
                  <p>{desInfo.description}</p>
                </div>
              </div>
            </div>
          </div>
          {/* End Info */}

          {/* Image Hotel */}
          <div>
            <h1 className="text-center mb-3">Hình ảnh</h1>
            <Slider {...sliderSettings}>
              {desInfo.image.map((image, index) => (
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
        </div>
      )}
      {/* End Content */}
    </main>
  );
};

export default DestinationDetails;
