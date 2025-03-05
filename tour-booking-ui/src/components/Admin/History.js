import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchBookings } from "../../api/AdminApi";
import MoneyFormat from "../Custom/MoneyFormat";
import PaymentStatus from "../Custom/PaymentStatus";
import BookingDateFormat from "../Custom/BookingDateFormat";
import { CSVLink } from "react-csv";
export default function History() {
  const [bookingsList, setBookingsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeywordBooking, setSearchKeywordBooking] = useState("");

  useEffect(() => {
    const getBookingsPage = async () => {
      const tmpBookingsPage = await searchBookings(
        "",
        "",
        searchKeywordBooking,
        currentPage
      );
      setBookingsList(tmpBookingsPage ? tmpBookingsPage.content : []);
      setTotalPages(tmpBookingsPage ? tmpBookingsPage.totalPages : 0);
      setTotalElements(tmpBookingsPage ? tmpBookingsPage.totalElements : 0);
    };
    getBookingsPage();
  }, [currentPage, searchKeywordBooking]);

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
        {/* Table Booking */}
        <div className="card mb-3 mb-lg-5">
          {/* <!-- Header --> */}
          <div className="card-header">
            <div className="row justify-content-between align-items-center flex-grow-1">
              <div className="col-12 col-md">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-header-title">Lịch sử đặt tour</h4>
                </div>
              </div>

              <div className="col-auto">
                {/* <!-- Filter --> */}
                <div className="row align-items-sm-center">
                  <div className="col-md">
                    <CSVLink
                      data={bookingsList.map(
                        ({
                          id,
                          note,
                          updateAt,
                          customers,
                          packages,
                          vouchers,
                          ...rest
                        }) => rest
                      )}
                      filename={"lich_su_dat_tour.csv"}
                      className="btn btn-sm btn-primary"
                    >
                      Xuất CSV
                      <i className="tio-open-in-new ml-2"></i>
                    </CSVLink>
                  </div>
                </div>
                {/* <!-- End Filter --> */}
              </div>
            </div>
          </div>
          {/* <!-- End Header --> */}
          <div className="card-body">
            {/* <!-- Input Group --> */}
            <div className="input-group input-group-merge">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="tio-search"></i>
                </span>
              </div>
              <input
                id="datatableSearch"
                type="search"
                className="form-control"
                placeholder="Tìm theo mã"
                value={searchKeywordBooking}
                onChange={handleSearchBookingChange}
              />
            </div>
            {/* <!-- End Input Group --> */}
          </div>
          {/* <!-- Table --> */}
          <div className="table-responsive datatable-custom">
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
                    <th scope="col" className="table-column-pr-0 "></th>
                    <th className="table-column-pl-0 ">Mã</th>
                    <th className="">Số người</th>
                    <th className="">Tổng tiền</th>
                    <th className="">Trạng thái</th>
                    <th className="">Thời gian</th>
                    <th className="">Khách hàng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {bookingsList &&
                    bookingsList.map((booking, index) => (
                      <tr
                        role="row"
                        key={`B${booking.id}`}
                        className={`${
                          index % 2 === 1 ? "even-row" : "odd-row"
                        }`}
                      >
                        <td key={`Booking${index}`}>{index + 1}</td>
                        <td className="table-column-pl-0 h5">{booking.code}</td>
                        <td>{booking.numberOfPeople}</td>
                        <td>
                          <MoneyFormat amount={booking.total} />
                        </td>
                        <td>
                          <PaymentStatus
                            paymentStatus={booking.paymentStatus}
                          />
                        </td>
                        <td>
                          <BookingDateFormat createAt={booking.createAt} />
                        </td>
                        <td>
                          {booking.customers.ho} {booking.customers.ten}
                        </td>
                        <td>
                          <Link
                            className="btn btn-primary mx-2"
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

          {/* <!-- Footer --> */}
          <div className="card-footer">
            {/* <!-- Pagination --> */}
            <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
              <div className="col-sm mb-2 mb-sm-0">
                <div className="d-flex justify-content-center justify-content-sm-start align-items-center">
                  <span className="text-secondary mr-2">
                    Hiển thị: {bookingsList ? bookingsList.length : 0} /{""}{" "}
                    {totalElements}
                    {}
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
      </div>
      {/* Hết Table Bookings */}
    </main>
  );
}
