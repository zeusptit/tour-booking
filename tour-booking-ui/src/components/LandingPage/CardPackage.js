import React from "react";
import { Link } from "react-router-dom";
import MoneyFormat from "../Custom/MoneyFormat";
function CardPackage(props) {
  const { pack } = props;
  return (
    <div className="col mb-3 mb-lg-5">
      {/* <!-- Card --> */}
      <div className="card h-100">
        <div>
          <img
            className="card-img-top"
            src={`http://localhost:8084/api/v1/FileUpload/files/${pack.image1}`}
            alt={`Package`}
            style={{ objectFit: "cover", height: "180px" }}
          />
        </div>

        {/* <!-- Body --> */}
        <div className="card-body">
          <h3 className="mb-1">
            <Link className="text-dark" to={`/packages/${pack.slug}`}>
              {pack.name}
            </Link>
          </h3>

          <div className="mb-1">
            <i className="tio-time mr-1"></i>
            <span>Khởi hành: {pack.startDate} </span>
          </div>
          <div className="mb-1">
            <i className="tio-timer-off mr-1"></i>
            <span>Kết thúc: {pack.endDate}</span>
          </div>
        </div>
        {/* <!-- End Body --> */}

        {/* <!-- Footer --> */}
        <div className="card-footer">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto py-1">
              <span className="font-size-md text-success-lp">
                Chỉ còn {pack.available} chỗ!
              </span>
            </div>

            <div className="col-auto py-1">
              <span className="font-size-lg text-cost-lp text-cap">
                <MoneyFormat amount={pack.cost} />
                vnđ
              </span>
            </div>
          </div>
        </div>
        {/* <!-- End Footer --> */}
      </div>
      {/* <!-- End Card --> */}
    </div>
  );
}
export default CardPackage;
