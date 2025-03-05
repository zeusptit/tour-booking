import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRestaurants } from "../../api/AdminApi";

export default function Restaurant() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(restaurantList);

  const [searchKeywordRestaurant, setSearchKeywordRestaurant] = useState("");
  const handleSearchRestaurantChange = (event) => {
    setSearchKeywordRestaurant(event.target.value);
    if (event.target.value === "") {
      setFilteredRestaurants(restaurantList);
      return;
    }
    const filteredRestaurants = restaurantList.filter((restaurant) => {
      const nameMatch = restaurant.name
        .toLowerCase()
        .includes(searchKeywordRestaurant.toLowerCase());
      const cityMatch = restaurant.cityName
        .toLowerCase()
        .includes(searchKeywordRestaurant.toLowerCase());
      return nameMatch || cityMatch;
    });
    setFilteredRestaurants(filteredRestaurants);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const getRestaurantList = async () => {
      const tmpRestaurantList = await getAllRestaurants();
      if (tmpRestaurantList === null) {
        navigate("/login");
      }
      setRestaurantList(tmpRestaurantList);
      setFilteredRestaurants(tmpRestaurantList);
    };
    getRestaurantList();
  }, [navigate]);

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
              <h1 className="page-header-title">Nhà hàng</h1>
            </div>
            <div className="col-sm-auto">
              <Link
                className="btn btn-primary"
                to={"/admin/restaurants/addRestaurant"}
              >
                <i className="tio-file-add mr-1"></i> Thêm nhà hàng
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
                  <i className="tio-label-outlined tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">Nhà hàng</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">{restaurantList.length}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
        </div>
        {/* <!-- End Stats --> */}

        {/* Table Hotel */}
        <div className="card mb-3 mb-lg-5">
          {/* <!-- Header --> */}
          <div className="card-header">
            <div className="row justify-content-between align-items-center flex-grow-1">
              <div className="col-12 col-md">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-header-title">Nhà hàng</h4>
                </div>
              </div>

              <div className="col-auto">
                {/* <!-- Filter --> */}
                <div className="row align-items-sm-center">
                  <div className="col-md">
                    <form>
                      {/* <!-- Search --> */}
                      <div className="input-group input-group-merge input-group-flush">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="tio-search"></i>
                          </div>
                        </div>
                        <input
                          id="datatableSearch"
                          type="search"
                          className="form-control"
                          placeholder="Tìm nhà hàng"
                          value={searchKeywordRestaurant}
                          onChange={handleSearchRestaurantChange}
                        />
                      </div>
                      {/* <!-- End Search --> */}
                    </form>
                  </div>
                </div>
                {/* <!-- End Filter --> */}
              </div>
            </div>
          </div>
          {/* <!-- End Header --> */}

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
                      rowspan="1"
                      colspan="1"
                      aria-label=""
                    ></th>
                    <th
                      className="table-column-pl-0"
                      rowspan="1"
                      colspan="1"
                      aria-label="Tên"
                    >
                      Tên
                    </th>
                    <th
                      className=""
                      tabindex="0"
                      aria-controls="datatable"
                      rowspan="1"
                      colspan="1"
                      aria-label="Địa chỉ"
                    >
                      Địa chỉ
                    </th>
                    <th
                      className=""
                      tabindex="0"
                      aria-controls="datatable"
                      rowspan="1"
                      colspan="1"
                      aria-label="Tỉnh"
                    >
                      Tỉnh(Tp)
                    </th>
                    <th
                      className="sorting_disabled"
                      rowspan="1"
                      colspan="1"
                      aria-label="Hạng"
                    >
                      Hạng
                    </th>
                    <th
                      className=""
                      tabindex="0"
                      aria-controls="datatable"
                      rowspan="1"
                      colspan="1"
                      aria-label="Giá"
                    >
                      Giá(vnđ)
                    </th>
                    <th
                      className=""
                      tabindex="0"
                      aria-controls="datatable"
                      rowspan="1"
                      colspan="1"
                      aria-label=""
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRestaurants.map((restaurant, index) => (
                    <tr role="row" className="odd">
                      <td key={index}>{index + 1}</td>
                      <td className="table-column-pl-0 h5">
                        {restaurant.name}
                      </td>

                      <td>{restaurant.address}</td>
                      <td>{restaurant.cityName}</td>
                      <td>
                        {restaurant.rate}
                        <i className="tio-star text-warning mr-1"></i>
                      </td>
                      <td>{restaurant.price}</td>
                      <td>
                        <Link
                          className="btn btn-primary mx-2"
                          to={`/admin/restaurants/${restaurant.id}`}
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
                    Tổng: {filteredRestaurants.length}
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
                        <li className="paginate_item page-item disabled">
                          <div
                            className="paginate_button previous page-link"
                            aria-controls="datatable"
                            data-dt-idx="0"
                            tabindex="0"
                            id="datatable_previous"
                          >
                            <span aria-hidden="true">Trước</span>
                          </div>
                        </li>

                        <li className="paginate_item page-item">
                          <div
                            className="paginate_button next page-link"
                            aria-controls="datatable"
                            data-dt-idx="4"
                            tabindex="0"
                            id="datatable_next"
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

        {/* Hết Table Hotels */}
      </div>
    </main>
  );
}
