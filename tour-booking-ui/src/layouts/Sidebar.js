import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function Sidebar(props) {
  const { showSidebar, setShowSidebar } = props;
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <aside
      className={` ${
        showSidebar ? "amycss" : ""
      } js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered default navbar-vertical-aside-initialized`}
    >
      <div className="navbar-vertical-container">
        <div className="navbar-vertical-footer-offset">
          <div className="navbar-brand-wrapper justify-content-between">
            <Link to="/" className="navbar-brand">
              <img
                className="navbar-brand-logo"
                src={process.env.PUBLIC_URL + "/logo_rec.png"}
                alt="Logo"
              />
              <img
                className="navbar-brand-logo-mini"
                src={process.env.PUBLIC_URL + "/logo.png"}
                style={{
                  minWidth: "1rem",
                  maxWidth: "1rem",
                }}
                alt="Logo"
              />
            </Link>
            <button
              type="button"
              className="btn button-close-sidebar"
              onClick={toggleSidebar}
            >
              <i className="tio-clear tio-lg "></i>
            </button>
          </div>

          {/* Sidebar admin */}
          {props.user === "admin" && (
            <div className="navbar-vertical-content">
              <ul className="navbar-nav navbar-nav-lg nav-tabs flex-column">
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "overview" ? "active" : ""
                    }`}
                    to="/admin"
                  >
                    <i className="tio-home nav-icon"></i>
                    <span className="text-truncate">Tổng quan</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "customer" ? "active" : ""
                    }`}
                    to="/admin/customers"
                  >
                    <i className="tio-user nav-icon"></i>
                    <span className="text-truncate">Khách hàng</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "tourguide" ? "active" : ""
                    }`}
                    to="/admin/tourguides"
                  >
                    <i className="tio-explore nav-icon"></i>
                    <span className="text-truncate">Hướng dẫn viên</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "voucher" ? "active" : ""
                    }`}
                    to="/admin/vouchers"
                  >
                    <i className="tio-label nav-icon"></i>
                    <span className="text-truncate">Mã giảm giá</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "hotel" ? "active" : ""
                    }`}
                    to="/admin/hotels"
                  >
                    <i className="tio-hotel nav-icon"></i>
                    <span className="text-truncate">Khách sạn</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "restaurant" ? "active" : ""
                    }`}
                    to="/admin/restaurants"
                  >
                    <i className="tio-restaurant nav-icon"></i>
                    <span className="text-truncate">Nhà hàng</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "place" ? "active" : ""
                    }`}
                    to="/admin/places"
                  >
                    <i className="tio-map nav-icon"></i>
                    <span className="text-truncate">Điểm đến</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "package" ? "active" : ""
                    }`}
                    to="/admin/packages"
                  >
                    <i className="tio-folder nav-icon"></i>

                    <span className="text-truncate">Gói tour</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "booking" ? "active" : ""
                    }`}
                    to="/admin/bookings"
                  >
                    <i className="tio-receipt nav-icon"></i>
                    <span className="text-truncate">Lịch sử đặt tour</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {/* Hết Sidebar admin */}
          {/* Sidebar customer */}
          {props.user === "customer" && (
            <div className="navbar-vertical-content">
              <ul className="navbar-nav navbar-nav-lg nav-tabs flex-column">
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "overview" ? "active" : ""
                    }`}
                    to="/customer"
                  >
                    <i className="tio-home nav-icon"></i>
                    <span className="text-truncate">Lịch sử đặt tour</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {/* Hết Sidebar customer */}
          {/* Sidebar tourguide */}
          {props.user === "tourguide" && (
            <div className="navbar-vertical-content">
              <ul className="navbar-nav navbar-nav-lg nav-tabs flex-column">
                <li>
                  <Link
                    className={`js-navbar-vertical-aside-menu-link nav-link ${
                      props.strActive === "calendar" ? "active" : ""
                    }`}
                    to="/tourguide"
                  >
                    <i className="tio-calendar-month nav-icon"></i>
                    <span className="text-truncate">Lịch làm việc</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {/* Hết Sidebar customer */}
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  strActive: PropTypes.string,
  user: PropTypes.string,
  hiddenSidebar: PropTypes.bool,
};

export default Sidebar;
