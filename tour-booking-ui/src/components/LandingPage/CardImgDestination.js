import React from "react";
import { Link } from "react-router-dom";
function CardImgDestination(props) {
  const { des } = props;
  return (
    <div className="col mb-3 mb-lg-5">
      {/* <!-- Card --> */}
      <div className="card">
        <img
          className="card-img card-img-top"
          src={`http://localhost:8084/api/v1/FileUpload/files/${des.image[0]}`}
          style={{
            objectFit: "cover",
            height: "220px",
            filter: "brightness(80%)",
          }}
          alt="Card cap"
        />
        <div className="card-img-overlay">
          {des.destinationType === "PLACES_OF_VISIT" ? (
            <Link
              className="text-white card-title h3"
              to={`/places/${des.slug}`}
            >
              {des.name}
            </Link>
          ) : (
            <Link
              className="text-white card-title h3"
              to={`/hotels/${des.slug}`}
            >
              {des.name}
            </Link>
          )}
        </div>
        {/* <!-- End Card --> */}
      </div>
    </div>
  );
}
export default CardImgDestination;
