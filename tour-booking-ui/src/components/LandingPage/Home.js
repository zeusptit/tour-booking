import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCityList, getThreeNearestPackage } from "../../api/PublicApi";
import CardPackage from "./CardPackage";
import Select from "react-select";
import WhyChoose from "./WhyChoose";
import SuggestedDestination from "./SuggestedDestination";

const Home = () => {
  const [cityList, setCityList] = useState([]);
  const [packagesList, setPackagesList] = useState([]);

  useEffect(() => {
    const fetch3Package = async () => {
      const tmpPackage = await getThreeNearestPackage();

      if (tmpPackage != null) setPackagesList(tmpPackage);
    };
    const fetchCityList = async () => {
      const tmpCityList = await getCityList();
      if (tmpCityList === null) {
        // navigate("/error404");
      }
      setCityList(tmpCityList);
    };
    fetchCityList();
    fetch3Package();
  }, []);

  const cities =
    cityList &&
    cityList.map((city) => ({
      value: city.id,
      label: city.name,
    }));
  cityList && cities.unshift({ value: 0, label: "Bạn muốn đi đâu..." });

  const sliderSettings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  const sliderVoucherSettings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <main id="content" role="main" className="main">
      <div className="right-0 left-0 bg-img-hero">
        <Slider {...sliderSettings}>
          <div>
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + "/landingpage/img1.jpg"}
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + "/landingpage/img3.jpg"}
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + "/landingpage/img4.jpg"}
              alt="Slide 3"
            />
          </div>
        </Slider>
      </div>
      {/* Searchbox */}
      <div className="content container-fluid w-90">
        <div className="container search-box z-index-2">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8">
              <form className="card card-body mb-3 mb-lg-5" action="/search">
                <div className="row gx-lg-4 gl-md-4 gm-sm-4">
                  <div className="col-sm-12 col-lg-12 mb-3">
                    <div className="media">
                      <div className="media-body">
                        <h6 className="card-subtitle">Địa điểm</h6>
                        {cityList && (
                          <Select
                            name="city"
                            isLoading={true}
                            defaultValue={cities[0]}
                            options={cities}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4 col-lg-4">
                    <div className="media">
                      <div className="media-body">
                        <h6 className="card-subtitle">Ngày đi</h6>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-lg-4 column-divider-sm">
                    <div className="media">
                      <div className="media-body">
                        <h6 className="card-subtitle">Số người</h6>
                        <input
                          type="number"
                          className="form-control"
                          min={1}
                          defaultValue={1}
                          name="person"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4 col-lg-4 col-md-4 column-divider-sm">
                    <div className="media">
                      <div className="media-body ">
                        <button
                          type="submit"
                          className="btn btn-md btn-block btn-primary mt-4"
                        >
                          Tìm kiếm
                          <i className="ml-2 tio-departure"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* EndSearchbox */}
        {/* Voucher */}
        <div>
          <h1 className="text-center mb-3 font-size-lg">Mã giảm giá</h1>

          <Slider {...sliderVoucherSettings}>
            <div className="col-12 mb-3 mb-lg-5">
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid"
                  style={{
                    height: "250px",
                    width: "500px",
                    objectFit: "contain",
                  }}
                  src={process.env.PUBLIC_URL + "/voucher/voucher1.jpg"}
                  alt={`voucher1`}
                />
              </div>
            </div>
            <div className="col-12 mb-3 mb-lg-5">
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid"
                  style={{
                    height: "250px",
                    width: "500px",
                    objectFit: "contain",
                  }}
                  src={process.env.PUBLIC_URL + "/voucher/voucher2.jpg"}
                  alt={`voucher2`}
                />
              </div>
            </div>
            <div className="col-12 mb-3 mb-lg-5">
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid"
                  style={{
                    height: "250px",
                    width: "500px",
                    objectFit: "contain",
                  }}
                  src={process.env.PUBLIC_URL + "/voucher/voucher3.jpg"}
                  alt={`voucher3`}
                />
              </div>
            </div>
            <div className="col-12 mb-3 mb-lg-5">
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid"
                  style={{
                    height: "250px",
                    width: "500px",
                    objectFit: "contain",
                  }}
                  src={process.env.PUBLIC_URL + "/voucher/voucher4.jpg"}
                  alt={`voucher4`}
                />
              </div>
            </div>
            <div className="col-12 mb-3 mb-lg-5">
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid"
                  style={{
                    height: "250px",
                    width: "500px",
                    objectFit: "contain",
                  }}
                  src={process.env.PUBLIC_URL + "/voucher/voucher5.jpg"}
                  alt={`voucher5`}
                />
              </div>
            </div>
            <div className="col-12 mb-3 mb-lg-5">
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid"
                  style={{
                    height: "250px",
                    width: "500px",
                    objectFit: "contain",
                  }}
                  src={process.env.PUBLIC_URL + "/voucher/voucher6.jpg"}
                  alt={`voucher6`}
                />
              </div>
            </div>
          </Slider>
        </div>
        {/* End Voucher */}

        {/* List Package */}
        <div className="mb-5">
          <h1 className="text-center mb-3 font-size-lg">Gợi ý cho bạn</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 mt-3">
            {/* Thẻ package */}
            {packagesList.map((pack, index) => (
              <div key={index}>
                <CardPackage pack={pack} />
              </div>
            ))}
            {/* Thẻ package */}
          </div>
        </div>
        {/* End List Package */}

        {/* Suggested Destination */}
        <div className="mb-5">
          <h1 className="text-center mb-3 font-size-lg">
            Điểm đến do Thanh Hương Booking đề xuất
          </h1>
          <SuggestedDestination />
        </div>
        {/* End Suggested Destination */}

        {/* Why Choose */}
        <div>
          <h1 className="text-center mb-3 font-size-lg">
            Tại sao nên đặt tour với Thanh Hương Booking?
          </h1>
          <WhyChoose />
        </div>
        {/* End Why Choose */}
      </div>

      {/* End Content */}
    </main>
  );
};

export default Home;
