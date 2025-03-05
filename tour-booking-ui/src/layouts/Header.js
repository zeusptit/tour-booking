import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Greeting from "./Greeting";
function Header(props) {
  const { showSidebar, setShowSidebar } = props;
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const [isOpen, setIsOpen] = useState(false); // State để theo dõi trạng thái hiển thị của dropdown
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isTourguide, setIsTourguide] = useState(false);
  const [user, setUser] = useState();
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Khi click, đảo ngược trạng thái hiển thị
  };
  const [adminInfo, setAdminInfo] = useState({
    ho: "",
    ten: "",
    title: "",
  });
  const [customerInfo, setCustomerInfo] = useState({
    ho: "",
    ten: "",
    dob: "",
    membership: "",
    phone: "",
  });
  const [tourguideInfo, setTourguideInfo] = useState({
    ho: "",
    ten: "",
    dob: "",
    salary: 0,
    phone: "",
  });
  if (isAdmin === false && props.adminInfo) {
    setAdminInfo(props.adminInfo);
    setUser(props.adminInfo);
    setIsAdmin(true);
  }
  if (isAdmin === false && isCustomer === false && props.customerInfo) {
    setCustomerInfo(props.customerInfo);
    setUser(props.customerInfo);
    setIsCustomer(true);
  }
  if (
    isAdmin === false &&
    isCustomer === false &&
    isTourguide === false &&
    props.tourguideInfo
  ) {
    setTourguideInfo(props.tourguideInfo);
    setUser(props.tourguideInfo);
    setIsTourguide(true);
  }
  const logout = () => {
    // localStorage.removeItem("accessToken");
  };

  return (
    <header
      id="header"
      className="navbar navbar-expand-lg navbar-fixed navbar-height navbar-flush navbar-container navbar-bordered"
    >
      <div className="navbar-nav-wrap">
        <div className="navbar-brand-wrapper">
          <div className="navbar-brand">
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
          </div>
        </div>
        <div className="navbar-nav-wrap-content-left">
          {/* <!-- Navbar Vertical Toggle --> */}
          <button
            type="button"
            className="close mr-3 button-show-sidebar"
            onClick={toggleSidebar}
          >
            <i className="tio-last-page"></i>
          </button>
          <Greeting user={user} />
        </div>

        <div className="navbar-nav-wrap-content-right">
          <ul className="navbar-nav align-items-center flex-row">
            <li className="nav-item">
              <div className="hs-unfold">
                <div
                  className="js-hs-unfold-invoker navbar-dropdown-account-wrapper"
                  onClick={toggleDropdown}
                >
                  <div className="avatar avatar-sm avatar-circle">
                    <img
                      className="avatar-img"
                      src={process.env.PUBLIC_URL + "/Avatar.png"}
                      alt="Avatar"
                    />
                    <span className="avatar-status avatar-sm-status avatar-status-success"></span>
                  </div>
                </div>
                <div
                  id="accountNavbarDropdown"
                  className={`hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account hs-unfold-content-initialized hs-unfold-css-animation animated ${
                    isOpen ? "slideInUp" : ""
                  } ${isOpen ? "" : "hs-unfold-hidden"}`}
                  style={{ width: "11rem", animationDuration: "300ms" }}
                >
                  {isAdmin && (
                    <div>
                      <div className="dropdown-item-text">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <span className="card-title h5">
                              {adminInfo.ho} {adminInfo.ten}
                            </span>
                            <span className="card-text">{adminInfo.title}</span>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/adminInfo">
                        <span
                          className="text-truncate pr-2"
                          title="Sửa thông tin"
                        >
                          Thông tin
                        </span>
                      </Link>
                    </div>
                  )}
                  {isCustomer && (
                    <div>
                      <div className="dropdown-item-text">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <span className="card-title h5">
                              {customerInfo.ho} {customerInfo.ten}
                            </span>
                            <span className="card-text">
                              {customerInfo.membership}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/customerInfo">
                        <span
                          className="text-truncate pr-2"
                          title="Sửa thông tin"
                        >
                          Thông tin
                        </span>
                      </Link>
                    </div>
                  )}
                  {isTourguide && (
                    <div>
                      <div className="dropdown-item-text">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <span className="card-title h5">
                              {tourguideInfo.ho} {tourguideInfo.ten}
                            </span>
                            <span className="card-text">
                              {"Hướng dẫn viên"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/tourguideInfo">
                        <span
                          className="text-truncate pr-2"
                          title="Sửa thông tin"
                        >
                          Thông tin
                        </span>
                      </Link>
                    </div>
                  )}
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" onClick={logout} to="/login">
                    <span className="text-truncate pr-2" title="Thoát">
                      Đăng xuất
                    </span>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  adminInfo: PropTypes.shape({
    ho: PropTypes.string,
    ten: PropTypes.string,
    title: PropTypes.string,
    email: PropTypes.string,
  }),
  customnerInfo: PropTypes.shape({
    ho: PropTypes.string,
    ten: PropTypes.string,
    dob: PropTypes.string,
    membership: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  tourguideInfo: PropTypes.shape({
    ho: PropTypes.string,
    ten: PropTypes.string,
    dob: PropTypes.string,
    salary: PropTypes.number,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Header;
