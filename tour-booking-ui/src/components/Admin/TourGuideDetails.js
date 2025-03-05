import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTourGuideById, searchPackages } from "../../api/AdminApi";
import { editTourGuideSalary } from "../../api/AdminApi";
import Modal from "react-bootstrap/Modal";
import { postErrorToast, postSuccessToast } from "../../layouts/Toast";
import { useForm } from "react-hook-form";
export default function TourGuideDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [tourguideInfo, setTourguideInfo] = useState({
    ho: "",
    ten: "",
    dob: "",
    salary: "",
    phone: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => {
    reset(tourguideInfo);
    setShow(true);
  };

  const onSubmit = async (data) => {
    const tourguideRequest = await editTourGuideSalary(data);
    if (tourguideRequest === null) {
      postErrorToast("Lỗi!");
    } else {
      postSuccessToast("Sửa hướng dẫn viên thành công!");
      setTourguideInfo(tourguideRequest);
      setTimeout(() => {
        handleClose();
      }, 10);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const TourguideInfo = async () => {
      const tmpTourguideInfo = await getTourGuideById(id);
      if (tmpTourguideInfo === null) {
        navigate("/error404");
      }
      setTourguideInfo(tmpTourguideInfo);
    };
    TourguideInfo();
  }, [id, navigate]);

  const [packageList, setPackageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeywordPackage, setSearchKeywordPackage] = useState("");
  useEffect(() => {
    const getPackagesPage = async () => {
      const tmpPackagesPage = await searchPackages(
        id,
        searchKeywordPackage,
        currentPage
      );
      setPackageList(tmpPackagesPage ? tmpPackagesPage.content : []);
      setTotalPages(tmpPackagesPage ? tmpPackagesPage.totalPages : 0);
      setTotalElements(tmpPackagesPage ? tmpPackagesPage.totalElements : 0);
    };
    getPackagesPage();
  }, [id, currentPage, searchKeywordPackage]);
  const handleNextPage = () => {
    setCurrentPage(
      currentPage + 1 < totalPages ? currentPage + 1 : currentPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
  };

  const handleSearchPackageChange = (event) => {
    setCurrentPage(0);
    setSearchKeywordPackage(event.target.value);
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
                    <Link className="breadcrumb-link" to={"/admin/tourguides"}>
                      Hướng dẫn viên
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Thông tin hướng dẫn viên
                  </li>
                </ol>
              </nav>
              <h1 className="page-header-title">
                Hướng dẫn viên: {tourguideInfo.ho} {tourguideInfo.ten}
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
                    <h4 className="card-header-title">Lịch sử dẫn tour</h4>
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
                    placeholder="Tìm tour"
                    aria-label="Tìm tour"
                    value={searchKeywordPackage}
                    onChange={handleSearchPackageChange}
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
                          Tên tour
                        </th>
                        <th
                          className=""
                          aria-controls="datatable"
                          rowSpan="1"
                          colSpan="1"
                        >
                          Ngày khởi hành
                        </th>
                        <th aria-controls="datatable" rowSpan="1" colSpan="1">
                          Ngày kết thúc
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
                      {packageList &&
                        packageList.map((pack, index) => (
                          <tr
                            key={`T${pack.id}`}
                            role="row"
                            className={`${
                              index % 2 === 1 ? "even-row" : "odd-row"
                            }`}
                          >
                            <td key={index}>{index + 1}</td>
                            <td className="table-column-pl-0 h5">
                              {pack.name}
                            </td>

                            <td>{pack.startDate}</td>
                            <td>{pack.endDate}</td>

                            <td className="d-print-none">
                              <Link
                                className="btn btn-primary mx-2"
                                to={`/admin/packages/${pack.id}`}
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
                        Hiển thị: {packageList ? packageList.length : 0} /{""}{" "}
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
                  <Link className="link" onClick={handleShow}>
                    Sửa
                  </Link>
                </div>

                <ul className="list-unstyled list-unstyled-py-2">
                  <li>
                    <i className="tio-online mr-2"></i>
                    {tourguideInfo.email}
                  </li>

                  <li>
                    <i className="tio-android-phone-vs mr-2"></i>
                    {tourguideInfo.phone}
                  </li>
                  <li>
                    <i className="tio-calendar-month mr-2"></i>
                    {tourguideInfo.dob}
                  </li>
                  <li>
                    <i className="tio-money-vs mr-2"></i>
                    {tourguideInfo.salary}
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
          <Modal.Title>Sửa thông tin hướng dẫn viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="row form-group">
                <label
                  htmlFor="firstNameLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Họ và tên{" "}
                </label>

                <div className="col-sm-9">
                  <div className="input-group input-group-sm-down-break">
                    <input
                      type="text"
                      className="form-control"
                      id="lastNameLabel"
                      {...register("ho")}
                      disabled
                    />
                    <input
                      type="text"
                      className="form-control"
                      id="firstNameLabel"
                      {...register("ten")}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row form-group">
                <label
                  htmlFor="emailLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Email
                </label>

                <div className="col-sm-9">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    id="emailLabel"
                    {...register("email")}
                    disabled
                  />
                </div>
              </div>
              <div className="row form-group">
                <label
                  htmlFor="phoneLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Số điện thoại
                </label>

                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneTimeLabel"
                    {...register("phone")}
                    disabled
                  />
                </div>
              </div>
              <div className="row form-group">
                <label
                  htmlFor="dobLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Ngày sinh
                </label>

                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control"
                    id="dobLabel"
                    {...register("dob")}
                    disabled
                  />
                </div>
              </div>
              <div className="row form-group">
                <label
                  htmlFor="salaryLabel"
                  className="col-sm-3 col-form-label input-label"
                >
                  Lương
                </label>

                <div className="col-sm-9">
                  <input
                    type="text"
                    className={`form-control  ${
                      errors.salary ? "is-invalid" : ""
                    }`}
                    id="salaryLabel"
                    {...register("salary", {
                      required: "Vui lòng nhập lương",
                      min: { value: 0, message: "Lương phải lớn hơn 0" },
                    })}
                  />
                  <div className="error-form-msg">{errors.salary?.message}</div>
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
