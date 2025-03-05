import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStats, getBookingStatsByDay } from "../../api/AdminApi";
import PaymentStatusChart from "./PaymentStatusChart";
import "chart.js/auto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingChart from "./BookingChart";
import PackagesStatusChart from "./PackagesStatusChart";
export default function Overview() {
  const navigate = useNavigate();
  const [stats, setStats] = useState();
  const [bookingData, setBookingData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    const fetchStats = async () => {
      const tmpStats = await getStats();
      if (tmpStats === null) {
        navigate("/login");
      }
      setStats(tmpStats);
    };
    fetchStats();
  }, [navigate]);
  useEffect(() => {
    const fetchBookingData = async (year, month) => {
      const tmpStats = await getBookingStatsByDay(year, month);
      if (tmpStats === null) {
        navigate("/login");
      }
      setBookingData(tmpStats);
    };
    fetchBookingData(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
  }, [selectedDate, navigate]);

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
              <h1 className="page-header-title">Tổng Quan</h1>
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
                  <i className="tio-user-big-outlined tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">Khách hàng</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">{stats && stats.customersNumber}</h3>
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
                  <i className="tio-explore-outlined tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">Hướng dẫn viên</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">
                        {stats && stats.tourguidesNumber}
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
                  <i className="tio-folder-labeled tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">Số tour</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">{stats && stats.packagesNumber}</h3>
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
                  <i className="tio-receipt-outlined tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">Giao dịch</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">{stats && stats.bookingsNumber}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
        </div>
        {/* <!-- End Stats --> */}
        <div className="row">
          <div className="col-lg-5 mb-3 mb-lg-5">
            {/* <!-- Card --> */}
            <a
              className="card card-hover-shadow mb-4"
              href="/admin/packages/add"
            >
              <div className="card-body">
                <div className="media align-items-center">
                  <img
                    className="avatar avatar-md mr-4"
                    src={process.env.PUBLIC_URL + "/svg/illustrations/tour.svg"}
                    alt="tour"
                  />

                  <div className="media-body">
                    <h3 className="text-hover-primary mb-1">Gói tour</h3>
                    <span className="text-body">Tạo gói tour mới</span>
                  </div>

                  <div className="ml-2 text-right">
                    <i className="tio-chevron-right tio-lg text-body text-hover-primary"></i>
                  </div>
                </div>
                {/* <!-- End Row --> */}
              </div>
            </a>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <a className="card card-hover-shadow mb-4" href="/admin/places/add">
              <div className="card-body">
                <div className="media align-items-center">
                  <img
                    className="avatar avatar-md mr-4"
                    src={
                      process.env.PUBLIC_URL + "/svg/illustrations/seo-map.svg"
                    }
                    alt="map"
                  />

                  <div className="media-body">
                    <h3 className="text-hover-primary mb-1">Địa điểm</h3>
                    <span className="text-body">Thêm địa điểm mới</span>
                  </div>

                  <div className="ml-2 text-right">
                    <i className="tio-chevron-right tio-lg text-body text-hover-primary"></i>
                  </div>
                </div>
                {/* <!-- End Row --> */}
              </div>
            </a>
            {/* <!-- End Card --> */}

            {/* <!-- Card --> */}
            <a className="card card-hover-shadow" href="/admin/vouchers/add">
              <div className="card-body">
                <div className="media align-items-center">
                  <img
                    className="avatar avatar-md mr-4"
                    src={
                      process.env.PUBLIC_URL + "/svg/illustrations/coupon.svg"
                    }
                    alt="coupon"
                  />

                  <div className="media-body">
                    <h3 className="text-hover-primary mb-1">Voucher</h3>
                    <span className="text-body">Tạo voucher mới</span>
                  </div>

                  <div className="ml-2 text-right">
                    <i className="tio-chevron-right tio-lg text-body text-hover-primary"></i>
                  </div>
                </div>
                {/* <!-- End Row --> */}
              </div>
            </a>
            {/* <!-- End Card --> */}
          </div>

          <div className="col-lg-7 mb-3 mb-lg-5">
            {/* <!-- Card --> */}
            <div className="card h-100">
              <div className="card-body">
                <div className="row d-flex justify-content-center">
                  {stats && <PackagesStatusChart stats={stats} />}
                  {stats && <PaymentStatusChart stats={stats} />}
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-3 mb-lg-5">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-header-title">Biểu đồ đặt tour</h4>
                <div className="d-flex align-items-center">
                  <i className="tio-date-range mr-1"></i>
                  <DatePicker
                    className="form-control form-control-sm"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                  />
                </div>
              </div>

              {/* <div className=""> */}
              {bookingData && <BookingChart bookingData={bookingData} />}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* Hết Table Bookings */}
    </main>
  );
}
