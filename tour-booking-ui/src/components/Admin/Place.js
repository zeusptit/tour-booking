import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchPlaces, getPlaceStats } from "../../api/AdminApi";
import MoneyFormat from "../Custom/MoneyFormat";
import { CSVLink } from "react-csv";
export default function Place() {
  const [placeList, setPlaceList] = useState([]);
  const [placeStats, setPlaceStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [searchKeywordPlace, setSearchKeywordPlace] = useState("");

  useEffect(() => {
    const getPlacesPage = async () => {
      const tmpPlacesPage = await searchPlaces(searchKeywordPlace, currentPage);
      setPlaceList(tmpPlacesPage ? tmpPlacesPage.content : []);
      setTotalPages(tmpPlacesPage ? tmpPlacesPage.totalPages : 0);
      setTotalElements(tmpPlacesPage ? tmpPlacesPage.totalElements : 0);
    };
    getPlacesPage();
  }, [currentPage, searchKeywordPlace]);

  useEffect(() => {
    const fetchPlacesStats = async () => {
      const tmpPlacesStats = await getPlaceStats();
      setPlaceStats(tmpPlacesStats);
    };
    fetchPlacesStats();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(
      currentPage + 1 < totalPages ? currentPage + 1 : currentPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
  };

  const handleSearchPlaceChange = (event) => {
    setCurrentPage(0);
    setSearchKeywordPlace(event.target.value);
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
              <h1 className="page-header-title">Địa điểm</h1>
            </div>
            <div className="col-sm-auto">
              <Link className="btn btn-primary" to={"/admin/places/add"}>
                <i className="tio-file-add mr-1"></i> Thêm địa điểm
              </Link>
            </div>
          </div>
        </div>
        {/* End Page Header */}

        {/* <!-- Stats --> */}
        <div className="row gx-2 gx-lg-3">
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            {/* <!-- Card --> */}
            <div className="card card-hover-shadow h-100">
              <div className="card-body">
                <div className="media align-items-center">
                  <i className="tio-map-outlined tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">Địa điểm</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">
                        {placeStats ? placeStats.count : 0}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            {/* <!-- Card --> */}
            <div className="card card-hover-shadow h-100">
              <div className="card-body">
                <div className="media align-items-center">
                  <i className="tio-diamond-outlined tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">Xếp hạng 5 sao</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">
                        {placeStats ? placeStats.fivestar : 0}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            {/* <!-- Card --> */}
            <div className="card card-hover-shadow h-100">
              <div className="card-body">
                <div className="media align-items-center">
                  <i className="tio-diamond tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">Xếp hạng 4 sao</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">
                        {placeStats ? placeStats.fourstar : 0}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            {/* <!-- Card --> */}
            <div className="card card-hover-shadow h-100">
              <div className="card-body">
                <div className="media align-items-center">
                  <i className="tio-ticket tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">
                      Địa điểm miễn phí
                    </span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">
                        {placeStats ? placeStats.free : 0}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
        </div>
        {/* <!-- End Stats --> */}

        {/* Table Place */}
        <div className="card mb-3 mb-lg-5">
          {/* <!-- Header --> */}
          <div className="card-header">
            <div className="row justify-content-between align-items-center flex-grow-1">
              <div className="col-12 col-md">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-header-title">Địa điểm</h4>
                </div>
              </div>

              <div className="col-auto">
                {/* <!-- Filter --> */}
                <div className="row align-items-sm-center">
                  <div className="col-md">
                    <CSVLink
                      data={placeList.map(
                        ({ slug, city, image, ...rest }) => rest
                      )}
                      filename={"dia_diem.csv"}
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
                placeholder="Tìm địa điểm"
                value={searchKeywordPlace}
                onChange={handleSearchPlaceChange}
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
                    <th
                      scope="col"
                      className="table-column-pr-0 sorting_disabled"
                      rowSpan="1"
                      colSpan="1"
                      aria-label=""
                    ></th>
                    <th
                      className="table-column-pl-0"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Tên"
                    >
                      Tên
                    </th>
                    <th
                      className=""
                      tabIndex="0"
                      aria-controls="datatable"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Địa chỉ"
                    >
                      Địa chỉ
                    </th>
                    <th
                      className=""
                      tabIndex="0"
                      aria-controls="datatable"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Tỉnh"
                    >
                      Tỉnh(Tp)
                    </th>
                    <th
                      className="sorting_disabled"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Hạng"
                    >
                      Hạng
                    </th>
                    <th
                      className=""
                      tabIndex="0"
                      aria-controls="datatable"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Giá"
                    >
                      Giá(vnđ)
                    </th>
                    <th
                      className=""
                      tabIndex="0"
                      aria-controls="datatable"
                      rowSpan="1"
                      colSpan="1"
                      aria-label=""
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {placeList &&
                    placeList.map((place, index) => (
                      <tr
                        role="row"
                        key={`P${place.id}`}
                        className={`${
                          index % 2 === 1 ? "even-row" : "odd-row"
                        }`}
                      >
                        <td key={index}>{index + 1}</td>
                        <td className="table-column-pl-0 h5">{place.name}</td>

                        <td>{place.address}</td>
                        <td>{place.city.name}</td>
                        <td>
                          {place.rate}
                          <i className="tio-star text-warning mr-1"></i>
                        </td>
                        <td>
                          <MoneyFormat amount={place.price} />
                        </td>
                        <td>
                          <Link
                            className="btn btn-primary mx-2"
                            to={`/admin/places/${place.id}`}
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
                    Hiển thị: {placeList ? placeList.length : 0} /{""}{" "}
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

        {/* Hết Table Places */}
      </div>
    </main>
  );
}
