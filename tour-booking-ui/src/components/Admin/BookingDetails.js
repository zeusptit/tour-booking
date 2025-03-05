import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getBookingById } from "../../api/BookingApi";
import PaymentStatus from "../Custom/PaymentStatus";
import MoneyFormat from "../Custom/MoneyFormat";
export default function BookingDetails(props) {
  const { id } = useParams();
  const { isAdmin } = props;
  const navigate = useNavigate();
  const [bookingInfo, setBookingInfo] = useState();
  useEffect(() => {
    const fetchBookingData = async () => {
      const tmpBookingInfo = await getBookingById(id);
      if (tmpBookingInfo === null) {
        navigate("/error404");
      }

      setBookingInfo(tmpBookingInfo);
    };
    fetchBookingData();
  }, [id, navigate]);

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ overflowY: "auto" }}
    >
      {bookingInfo && (
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-sm mb-2 mb-sm-0">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumb-no-gutter">
                    <li className="breadcrumb-item">
                      {isAdmin ? (
                        <Link
                          className="breadcrumb-link"
                          to={"/admin/bookings"}
                        >
                          Lịch sử đặt tour
                        </Link>
                      ) : (
                        <Link className="breadcrumb-link" to={"/customer"}>
                          Lịch sử đặt tour
                        </Link>
                      )}
                    </li>
                    <li className="breadcrumb-item active">
                      Chi tiết đơn hàng
                    </li>
                  </ol>
                </nav>
                <div className="d-sm-flex align-items-sm-center">
                  <h1 className="page-header-title mr-2">
                    Đơn hàng: {bookingInfo.code}
                  </h1>
                  <PaymentStatus paymentStatus={bookingInfo.paymentStatus} />
                  {bookingInfo.pickup && (
                    <span className="badge badge-soft-success ml-sm-3">
                      <span className="legend-indicator bg-success"></span>Đưa
                      đón
                    </span>
                  )}
                  {/* <span className="ml-2 ml-sm-3">
                    <i className="tio-date-range"></i>{" "}
                    {bookingInfo && bookingInfo.createAt}
                  </span> */}
                </div>
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
            </div>
          </div>
          {/* End Page Header */}
          <div className="row">
            <div className="col-lg-8 mb-3 mb-lg-0">
              {/* <!-- Card --> */}
              <div className="card mb-3 mb-lg-5">
                {/* <!-- Header --> */}
                <div className="card-header">
                  <h4 className="card-header-title">
                    Chi tiết đơn hàng
                    <span className="badge badge-soft-dark rounded-circle ml-1">
                      1
                    </span>
                  </h4>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Body --> */}
                <div className="card-body">
                  {/* <!-- Media --> */}
                  <div className="media">
                    <div className="avatar avatar-xl mr-3">
                      <img
                        className="img-fluid"
                        src={`http://localhost:8084/api/v1/FileUpload/files/${bookingInfo.packages.image1}`}
                        alt="Booking"
                      />
                    </div>

                    <div className="media-body">
                      <div className="row">
                        <div className="col-md-8 mb-3 mb-md-0">
                          {isAdmin ? (
                            <Link
                              className="h5 d-block"
                              to={`/admin/packages/${bookingInfo.packages.id}`}
                            >
                              {bookingInfo.packages.name}
                            </Link>
                          ) : (
                            <Link
                              className="h5 d-block"
                              to={`/packages/${bookingInfo.packages.slug}`}
                            >
                              {bookingInfo.packages.name}
                            </Link>
                          )}
                          <div className="font-size-sm text-body">
                            <span>Khởi hành:</span>
                            <span className="font-weight-bold">
                              {" "}
                              {bookingInfo.packages.startDate}
                            </span>
                          </div>
                          <div className="font-size-sm text-body">
                            <span>Kết thúc:</span>
                            <span className="font-weight-bold">
                              {" "}
                              {bookingInfo.packages.endDate}
                            </span>
                          </div>
                          {bookingInfo.note && (
                            <div className="font-size-sm text-body">
                              <span>Ghi chú:</span>
                              <span className="font-weight-bold">
                                {" "}
                                {bookingInfo.note}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="col col-md-2 align-self-center">
                          <h5>
                            <MoneyFormat amount={bookingInfo.packages.cost} />
                          </h5>{" "}
                          VNĐ
                        </div>

                        <div className="col col-md-2 align-self-center">
                          <h5>{bookingInfo.numberOfPeople}</h5> Người
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Media --> */}

                  <div className="row justify-content-md-end mb-3">
                    <div className="col-md-6 col-lg-6">
                      <dl className="row text-sm-right">
                        <dt className="col-sm-6">Tạm tính:</dt>
                        <dd className="col-sm-6">
                          {" "}
                          <MoneyFormat
                            amount={
                              bookingInfo.packages.cost *
                              bookingInfo.numberOfPeople
                            }
                          />
                        </dd>
                        <dt className="col-sm-6">Hạng thành viên:</dt>
                        <dd className="col-sm-6">
                          - <MoneyFormat amount={bookingInfo.member} />
                        </dd>
                        <dt className="col-sm-6">Voucher:</dt>
                        <dd className="col-sm-6">- {bookingInfo.voucher} % </dd>
                        <dt className="col-sm-6">Thành tiền:</dt>
                        <dd className="col-sm-6">
                          <MoneyFormat amount={bookingInfo.total} />
                        </dd>
                      </dl>
                      {/* <!-- End Row --> */}
                    </div>
                  </div>
                  {/* <!-- End Row --> */}
                </div>
                {/* <!-- End Body --> */}
              </div>
              {/* <!-- End Card --> */}

              {/* <!-- Card --> */}
              <div className="card">
                {/* <!-- Header --> */}
                <div className="card-header">
                  <h4 className="card-header-title">Hoạt động chi tiết</h4>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Body --> */}
                <div className="card-body">
                  {/* <!-- Step --> */}
                  <ul className="step step-icon-xs">
                    {/* <!-- Step Item --> */}
                    <li className="step-item">
                      <div className="step-content-wrapper">
                        <span className="step-icon step-icon-info step-icon-pseudo"></span>

                        <div className="step-content">
                          <h5 className="mb-1">
                            <span className="text-dark">Tạo đơn hàng</span>
                          </h5>

                          <p className="font-size-sm mb-0">
                            {" "}
                            {bookingInfo.createAt}
                          </p>
                        </div>
                      </div>
                    </li>
                    {/* <!-- End Step Item --> */}

                    {/* <!-- Step Item --> */}
                    {bookingInfo.createAt !== bookingInfo.updateAt && (
                      <li className="step-item">
                        <div className="step-content-wrapper">
                          <span className="step-icon step-icon-info step-icon-pseudo"></span>

                          <div className="step-content">
                            <h5 className="mb-1">
                              <span className="text-dark">
                                {" "}
                                {bookingInfo.paymentStatus === "PAID"
                                  ? "Thanh toán đơn hàng"
                                  : bookingInfo.paymentStatus === "PENDING"
                                  ? "Chưa thanh toán"
                                  : "Đóng đơn hàng"}
                              </span>
                            </h5>

                            <p className="font-size-sm mb-0">
                              {bookingInfo.updateAt}
                            </p>
                          </div>
                        </div>
                      </li>
                    )}

                    {/* <!-- End Step Item --> */}
                  </ul>
                  {/* <!-- End Step --> */}
                </div>
                {/* <!-- End Body --> */}
              </div>
              {/* <!-- End Card --> */}
            </div>
            <div className="col-lg-4">
              {/* <!-- Card --> */}
              <div className="card">
                {/* <!-- Header --> */}
                <div className="card-header">
                  <h4 className="card-header-title">Khách hàng</h4>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Body --> */}
                <div className="card-body">
                  <div className="media align-items-center hidden">
                    <div className="media-body">
                      <span className="text-body text-hover-primary">
                        {bookingInfo.customers.ho} {bookingInfo.customers.ten}
                      </span>
                    </div>
                    {isAdmin && (
                      <Link
                        className="media-body text-right"
                        to={`/admin/customers/${bookingInfo.customers.id}`}
                      >
                        <i className="tio-chevron-right text-body"></i>
                      </Link>
                    )}
                  </div>

                  <hr />

                  <div className="media align-items-center">
                    <div className="icon icon-soft-info icon-circle mr-3">
                      <i className="tio-shopping-basket-outlined"></i>
                    </div>
                    <div className="media-body">
                      <span className="text-body text-hover-primary">
                        {bookingInfo.customers.membership}
                      </span>
                    </div>
                  </div>

                  {/* <!-- End Body --> */}
                </div>
                {/* <!-- End Card --> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
