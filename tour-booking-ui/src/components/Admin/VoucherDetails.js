import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getVoucherById, deleteVouchers } from "../../api/VoucherApi";
import { searchBookings } from "../../api/AdminApi";
import Modal from "react-bootstrap/Modal";
import { editVouchers } from "../../api/VoucherApi";
import { postSuccessToast } from "../../layouts/Toast";
import MoneyFormat from "../Custom/MoneyFormat";
import PaymentStatus from "../Custom/PaymentStatus";
import BookingDateFormat from "../Custom/BookingDateFormat";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function VoucherDetails() {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên"),
    startTime: yup.string().required("Vui lòng nhập ngày bắt đầu"),
    endTime: yup.string().required("Vui lòng nhập ngày kết thúc"),
    percent: yup
      .number()
      .typeError("Phần trăm phải là số")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required("Vui lòng nhập phần trăm")
      .min(1, "Phần trăm phải lớn hơn 0")
      .max(100, "Phần trăm phải nhỏ hơn 100"),
    amount: yup
      .number()
      .typeError("Số lượng phải là số")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required("Vui lòng nhập số lượng")
      .min(1, "Số lượng phải lớn hơn 0"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [voucherInfo, setVoucherInfo] = useState({
    id: "",
    name: "",
    code: "",
    startTime: "",
    endTime: "",
    amount: "",
    percent: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => {
    reset(voucherInfo);
    setShow(true);
  };

  const onSubmit = async (data) => {
    const voucherRequest = await editVouchers(id, data);
    if (voucherRequest != null) {
      setVoucherInfo(voucherRequest);
      postSuccessToast("Sửa mã giảm giá thành công!");
      setTimeout(() => {
        handleClose();
      }, 10);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const VoucherInfo = async () => {
      const tmpVoucherInfo = await getVoucherById(id);
      if (tmpVoucherInfo === null) {
        navigate("/error404");
      }
      setVoucherInfo(tmpVoucherInfo);
    };
    VoucherInfo();
  }, [id, navigate]);

  const handleDelete = async () => {
    const voucherRequest = await deleteVouchers(id);
    navigate("/admin/vouchers");
  };

  const [bookingsList, setBookingsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeywordBooking, setSearchKeywordBooking] = useState("");

  useEffect(() => {
    const getBookingsPage = async () => {
      const tmpBookingsPage = await searchBookings(
        id,
        "",
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
                    <Link className="breadcrumb-link" to={"/admin/vouchers"}>
                      Voucher
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Thông tin voucher</li>
                </ol>
              </nav>
              <h1 className="page-header-title">Voucher: {voucherInfo.name}</h1>
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
                    <h4 className="card-header-title">Lịch sử sử dụng</h4>
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
                        <th
                          className=""
                          aria-controls="datatable"
                          rowSpan="1"
                          colSpan="1"
                        >
                          Ngày tạo
                        </th>
                        <th aria-controls="datatable" rowSpan="1" colSpan="1">
                          Tổng
                        </th>
                        <th aria-controls="datatable" rowSpan="1" colSpan="1">
                          Trạng thái
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
                            key={`B${booking.id}`}
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
                              <MoneyFormat amount={booking.total} />
                            </td>
                            <td>
                              <PaymentStatus
                                paymentStatus={booking.paymentStatus}
                              />
                            </td>
                            <td className="d-print-none">
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
                  <div>
                    <Link className="link mr-5" onClick={handleShow}>
                      Sửa
                    </Link>
                    <Link
                      className="link btn-ghost-danger"
                      onClick={handleDelete}
                    >
                      Xoá
                    </Link>
                  </div>
                </div>

                <ul className="list-unstyled list-unstyled-py-2">
                  <li>
                    <i className="tio-barcode mr-2"></i>
                    {voucherInfo.code}
                  </li>
                  <li>
                    <i className="tio-all-done mr-2"></i>
                    {voucherInfo.percent}%
                  </li>

                  <li>
                    <i className="tio-time mr-2"></i>
                    {voucherInfo.startTime}
                  </li>
                  <li>
                    <i className="tio-timer-off mr-2"></i>
                    {voucherInfo.endTime}
                  </li>
                  <li>
                    <i className="tio-tabs mr-2"></i>
                    {voucherInfo.amount}
                  </li>
                </ul>
              </div>
              {/* <!-- End Body --> */}
            </div>
            {/* <!-- End Card --> */}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="row form-group">
                <label
                  htmlFor="nameLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Tên
                </label>

                <div className="col-sm-9">
                  <input
                    type="text"
                    className={`form-control  ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Nhập tên voucher"
                    id="nameLabel"
                    {...register("name")}
                  />
                  <div className="error-form-msg">{errors.name?.message}</div>
                </div>
              </div>
              <div className="row form-group">
                <label
                  htmlFor="startTimeLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Bắt đầu
                </label>

                <div className="col-sm-9">
                  <input
                    type="date"
                    className={`form-control  ${
                      errors.startTime ? "is-invalid" : ""
                    }`}
                    id="startTimeLabel"
                    {...register("startTime")}
                  />
                  <div className="error-form-msg">
                    {errors.startTime?.message}
                  </div>
                </div>
              </div>
              <div className="row form-group">
                <label
                  htmlFor="endTimeLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Kết thúc
                </label>

                <div className="col-sm-9">
                  <input
                    type="date"
                    className={`form-control  ${
                      errors.endTime ? "is-invalid" : ""
                    }`}
                    id="endTimeLabel"
                    {...register("endTime")}
                  />
                  <div className="error-form-msg">
                    {errors.endTime?.message}
                  </div>
                </div>
              </div>
              <div className="row form-group">
                <label
                  htmlFor="percentLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Phần trăm
                </label>

                <div className="col-sm-9">
                  <input
                    type="number"
                    className={`form-control  ${
                      errors.percent ? "is-invalid" : ""
                    }`}
                    id="percentLabel"
                    {...register("percent")}
                  />
                  <div className="error-form-msg">
                    {errors.percent?.message}
                  </div>
                </div>
              </div>

              <div className="row form-group">
                <label
                  htmlFor="amountLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Số lượng
                </label>

                <div className="col-sm-9">
                  <input
                    type="number"
                    className={`form-control  ${
                      errors.amount ? "is-invalid" : ""
                    }`}
                    id="amountLabel"
                    {...register("amount")}
                  />
                  <div className="error-form-msg">{errors.amount?.message}</div>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-end align-items-center">
              <button type="submit" className="btn btn-primary">
                Lưu <i className="tio-save"></i>
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </main>
  );
}
