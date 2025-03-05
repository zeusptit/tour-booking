import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCustomerById, searchBookings } from "../../api/AdminApi";
import PaymentStatus from "../Custom/PaymentStatus";
import MoneyFormat from "../Custom/MoneyFormat";
import BookingDateFormat from "../Custom/BookingDateFormat";
export default function CustomerDetails() {
  const { id } = useParams();
  const [customerInfo, setCustomerInfo] = useState({
    ho: "",
    ten: "",
    dob: "",
    membership: "",
    phone: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const CustomerInfo = async () => {
      const tmpCustomerInfo = await getCustomerById(id);
      if (tmpCustomerInfo === null) {
        navigate("/error404");
        return;
      }
      setCustomerInfo(tmpCustomerInfo);
    };
    CustomerInfo();
  }, [id, navigate]);

  const [bookingsList, setBookingsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeywordBooking, setSearchKeywordBooking] = useState("");

  useEffect(() => {
    const getBookingsPage = async () => {
      const tmpBookingsPage = await searchBookings(
        "",
        id,
        searchKeywordBooking,
        currentPage
      );
      setBookingsList(tmpBookingsPage ? tmpBookingsPage.content : []);
      setTotalPages(tmpBookingsPage ? tmpBookingsPage.totalPages : 0);
      setTotalElements(tmpBookingsPage ? tmpBookingsPage.totalElements : 0);
    };
    getBookingsPage();
  }, [id, currentPage, searchKeywordBooking]);

  const handleNextPage = () => {
    setCurrentPage(
      currentPage + 1 < totalPages ? currentPage + 1 : currentPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
  };

  const handleSearchBookingChange = (event) => {
    setCurrentPage(0);
    setSearchKeywordBooking(event.target.value);
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
                    <Link className="breadcrumb-link" to={"/admin/customers"}>
                      Khách hàng
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Thông tin khách hàng
                  </li>
                </ol>
              </nav>
              <h1 className="page-header-title">
                Khách hàng: {customerInfo.ho} {customerInfo.ten}
              </h1>
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
          <div className="col-lg-8">
            {/* <!-- Card --> */}
            <div className="card mb-3 mb-lg-5">
              {/* <!-- Header --> */}
              <div className="card-header">
                <div className="row justify-content-between align-items-center flex-grow-1">
                  <div className="col-sm mb-3 mb-sm-0">
                    <h4 className="card-header-title">Lịch sử đặt tour</h4>
                  </div>
                </div>
                {/* <!-- End Row --> */}
              </div>
              {/* <!-- End Header --> */}

              {/* <!-- Body --> */}
              <div className="card-body">
                {/* <!-- Input Group --> */}
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="tio-search"></i>
                    </span>
                  </div>

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Tìm theo mã"
                    aria-label="Tìm theo mã"
                    value={searchKeywordBooking}
                    onChange={handleSearchBookingChange}
                  />
                </div>
                {/* <!-- End Input Group --> */}
              </div>
              {/* <!-- End Body --> */}

              {/* <!-- Table --> */}
              {/* <!-- Table --> */}
              <div
                className="table-responsive datatable-custom"
                style={{ overflowX: "auto" }}
              >
                <div
                  id="datatable_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <table
                    id="datatable"
                    className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table dataTable no-footer"
                    role="grid"
                    aria-describedby="datatable_info"
                  >
                    <thead className="thead-light">
                      <tr role="row">
                        <th
                          scope="col"
                          className="table-column-pr-0 sorting_disabled"
                          rowSpan="1"
                          colSpan="1"
                        ></th>
                        <th
                          className="table-column-pl-0"
                          rowSpan="1"
                          colSpan="1"
                        >
                          Mã
                        </th>

                        <th aria-controls="datatable" rowSpan="1" colSpan="1">
                          Ngày tạo
                        </th>
                        <th aria-controls="datatable" rowSpan="1" colSpan="1">
                          Trạng thái
                        </th>
                        <th aria-controls="datatable" rowSpan="1" colSpan="1">
                          Tổng cộng
                        </th>
                        <th
                          className="d-print-none"
                          rowSpan="1"
                          colSpan="1"
                          aria-label="Thao tác"
                        >
                          Thao tác
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {bookingsList &&
                        bookingsList.map((booking, index) => (
                          <tr
                            key={`T${booking.id}`}
                            role="row"
                            className={`${
                              index % 2 === 1 ? "even-row" : "odd-row"
                            }`}
                          >
                            <td key={index}>{index + 1}</td>
                            <td className="table-column-pl-0 h5">
                              {booking.code}
                            </td>

                            <td>
                              <BookingDateFormat createAt={booking.createAt} />
                            </td>
                            <td>
                              <PaymentStatus
                                paymentStatus={booking.paymentStatus}
                              />
                            </td>
                            <td>
                              <MoneyFormat amount={booking.total} />
                            </td>
                            <td className="d-print-none">
                              <Link
                                className="btn btn-primary"
                                to={`/admin/bookings/${booking.id}`}
                              >
                                Xem
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <!-- End Table --> */}
              {/* <!-- End Table --> */}

              {/* <!-- Footer --> */}
              <div className="card-footer">
                {/* <!-- Pagination --> */}
                <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
                  <div className="col-sm mb-2 mb-sm-0">
                    <div className="d-flex justify-content-center justify-content-sm-start align-items-center">
                      <span className="mr-2">
                        Hiển thị: {bookingsList ? bookingsList.length : 0} /{""}{" "}
                        {totalElements}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-auto">
                    <div className="d-flex justify-content-center justify-content-sm-end">
                      {/* <!-- Pagination --> */}
                      <nav
                        id="datatablePagination"
                        aria-label="Activity pagination"
                      >
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="datatable_paginate"
                        >
                          <ul
                            id="datatable_pagination"
                            className="pagination datatable-custom-pagination"
                          >
                            <li className="paginate_item page-item ">
                              <div
                                className="paginate_button previous page-link"
                                onClick={handlePrevPage}
                              >
                                <span aria-hidden="true">Trước</span>
                              </div>
                            </li>
                            <li className="paginate_item page-item disabled">
                              <div className="paginate_button page-link">
                                <span aria-hidden="true">
                                  {currentPage + 1} / {totalPages}
                                </span>
                              </div>
                            </li>

                            <li className="paginate_item page-item">
                              <div
                                className="paginate_button next page-link"
                                onClick={handleNextPage}
                              >
                                <span aria-hidden="true">Sau</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
                {/* <!-- End Pagination --> */}
              </div>
              {/* <!-- End Footer --> */}
            </div>
            {/* <!-- End Card --> */}
          </div>

          <div className="col-lg-4">
            {/* <!-- Card --> */}
            <div className="card mb-3 mb-lg-5">
              {/* <!-- Body --> */}
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Thông tin</h5>
                </div>

                <ul className="list-unstyled list-unstyled-py-2">
                  <li>
                    <i className="tio-online mr-2"></i>
                    {customerInfo.email}
                  </li>

                  <li>
                    <i className="tio-android-phone-vs mr-2"></i>
                    {customerInfo.phone}
                  </li>
                  <li>
                    <i className="tio-calendar-month mr-2"></i>
                    {customerInfo.dob}
                  </li>
                  <li>
                    <i className="tio-crown mr-2"></i>
                    {customerInfo.membership}
                  </li>
                </ul>
              </div>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}
          </div>
        </div>
      </div>
    </main>
  );
}
