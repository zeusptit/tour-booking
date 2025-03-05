import React from "react";
import { Link } from "react-router-dom";
import MoneyFormat from "../Custom/MoneyFormat";
function CardDestination(props) {
  const renderStarRating = (rate) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rate); i++) {
      stars.push(
        <i key={`full-star-${i}`} className="tio-star tio-lg text-warning"></i>
      );
    }

    if (rate - Math.floor(rate) > 0.5) {
      stars.push(<i className=" tio-star-half tio-lg text-warning"></i>);
    }
    return stars;
  };
  const { des } = props;
  return (
    <div className="row justify-content-lg-center">
      <div
        className="card mb-3"
        //   style="max-width: 540px;"
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              className="img-fluid img-lp"
              src={`http://localhost:8084/api/v1/FileUpload/files/${des.image[0]}`}
              style={{ maxHeight: "220px" }}
              alt="Card cap"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              {des.destinationType === "PLACES_OF_VISIT" ? (
                <Link
                  className="text-dark card-title h3"
                  to={`/places/${des.slug}`}
                >
                  {des.name}
                </Link>
              ) : (
                <Link
                  className="text-dark card-title h3"
                  to={`/hotels/${des.slug}`}
                >
                  {des.name}
                </Link>
              )}

              <p
                className="card-text"
                style={{ maxHeight: "50px", overflow: "hidden" }}
              >
                {des.description}
              </p>
              <p className="card-text">
                <span className="ml-1 text-dark font-weight-bold"></span>
                {renderStarRating(des.rate)}
              </p>
              <div className="row justify-content-between align-items-center">
                <div className="col-auto py-1">
                  <span className="font-size-md text-success-lp">
                    <i className="tio-poi"></i>
                    <span className="ml-1 text-dark font-weight-bold">
                      {des.address}, {des.cityName}
                    </span>
                  </span>
                </div>

                <div className="col-auto py-1">
                  <span className="font-size-lg text-cost-lp text-cap">
                    {des.price === 0 ? (
                      "Miễn phí"
                    ) : (
                      <MoneyFormat amount={des.price} />
                    )}
                    {des.price !== 0 && "vnđ"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardDestination;
