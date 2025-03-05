import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCityList, getCityById, searchPacakges } from "../../api/PublicApi";
import Select from "react-select";
import CardPackage from "./CardPackage";
const Search = () => {
  const location = useLocation();
  const [cityList, setCityList] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [city, setCity] = useState({
    id: 0,
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const cityId = searchParams.get("city");
      const date = searchParams.get("date");
      const person = searchParams.get("person");
      const priceRange = searchParams.get("priceRange") ?? 0;

      const tmpCity = await getCityById(cityId);
      const tmpPackage = await searchPacakges(cityId, date, person, priceRange);
      setCity(tmpCity);
      if (tmpPackage != null) setPackagesList(tmpPackage);
    };

    const CityList = async () => {
      const tmpCityList = await getCityList();
      if (tmpCityList === null) {
        // navigate("/error404");
      }
      setCityList(tmpCityList);
    };
    fetchData();
    CityList();
  }, [location.search]);

  const cities = cityList.map((city) => ({
    value: city.id,
    label: city.name,
  }));
  cities.unshift({ value: 0, label: "Bạn muốn đi đâu..." });

  return (
    <main id="content" role="main" className="main">
      <div className="content container-fluid">
        <div className="row">
          <div className="col-lg-3">
            {/* <!-- Sticky Block Start Point --> */}

            {/* <!-- Card --> */}
            <div className="js-sticky-block card mb-3 mb-lg-5">
              {/* <!-- Header --> */}
              <div className="card-header">
                <h3 className="card-header-title">Bộ lọc</h3>
              </div>
              {/* <!-- End Header --> */}

              {/* <!-- Body --> */}

              <form className="card-body" action="/search">
                <div className="mb-3">
                  <div className="media mb-3">
                    <div className="media-body">
                      <h6 className="card-subtitle">Địa điểm</h6>
                      <Select
                        name="city"
                        isLoading={true}
                        defaultValue={cities[0]}
                        options={cities}
                      />
                    </div>
                  </div>
                  <div className="media mb-3">
                    <div className="media-body">
                      <h6 className="card-subtitle">Ngày đi</h6>
                      <input type="date" name="date" className="form-control" />
                    </div>
                  </div>
                  <div className="media mb-3">
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
                  <div className="media mb-3">
                    <div className="media-body">
                      <h6 className="card-subtitle">Mức giá/người</h6>
                      <div>
                        <input
                          type="radio"
                          name="priceRange"
                          value="1"
                          id="priceRange1"
                        />
                        <label htmlFor="priceRange1" className="ml-2">
                          0 - 1,000,000
                        </label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="priceRange"
                          value="2"
                          id="priceRange2"
                        />
                        <label htmlFor="priceRange2" className="ml-2">
                          1,000,000 - 2,000,000
                        </label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="priceRange"
                          value="3"
                          id="priceRange3"
                        />
                        <label htmlFor="priceRange3" className="ml-2">
                          2,000,000+
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="media">
                    <div className="media-body ">
                      <button
                        type="submit"
                        className="btn btn-md btn-block btn-primary"
                      >
                        <i className="ml-2 tio-departure"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}
          </div>

          <div className="col-lg-9">
            {city && (
              <div className="card">
                <div className="text-center">
                  <h1 className="text-cap pt-2">Du lịch {city.name}</h1>
                </div>
                <span className="divider"></span>
                <div className="card-body">
                  <p>{city.description}</p>
                </div>
              </div>
            )}
            <span className="divider mt-3"></span>

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
        </div>
      </div>
    </main>
  );
};

export default Search;
