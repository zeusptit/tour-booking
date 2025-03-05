import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { postErrorToast, postSuccessToast } from "../layouts/Toast";
import { getCustomerInfo } from "../api/CustomersApi";
import { Navbar, Nav, NavDropdown, Container, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
function Navbars() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .matches(/^\S+@\S+\.\S+$/, "Địa chỉ email không đúng định dạng"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [isLogined, setIsLogined] = useState(false);
  const [customerInfo, setCustomerInfo] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();
  const fetchCustomerInfo = async () => {
    const tmpCustomerInfo = await getCustomerInfo();
    if (tmpCustomerInfo === null) {
      setIsLogined(false);
    } else {
      setIsLogined(true);
      setCustomerInfo(tmpCustomerInfo);
    }
  };
  useEffect(() => {
    fetchCustomerInfo();
  }, []);

  const logout = () => {
    // localStorage.removeItem("accessToken");
    setIsLogined(false);
    setCustomerInfo(null);
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  const onLogin = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8084/api/v1/auth/authenticate",
        data
      );

      const result = response.data;

      if (result.status === "error") {
        postErrorToast(result.message);
      } else {
        postSuccessToast(result.message);
        localStorage.setItem("accessToken", result.data.token);
        if (result.data.role === "ADMIN") {
          navigate("/admin");
        } else if (result.data.role === "CUSTOMER") {
          setIsLogined(true);
          fetchCustomerInfo();
          setShowLoginModal(false);
        } else if (result.data.role === "TOURGUIDE") {
          navigate("/tourguide");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar
        style={{ position: "sticky" }}
        fixed="top"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              className="navbar-brand-logo"
              src={process.env.PUBLIC_URL + "/logo_rec.png"}
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Trang chủ</Nav.Link>
              <Nav.Link href="/places">Điểm đến</Nav.Link>
              <Nav.Link href="/hotels">Khách sạn</Nav.Link>
              <Nav.Link href="/contact">Liên hệ</Nav.Link>
              {/* <NavDropdown title="To be continue" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav className="ml-auto">
              {isLogined ? (
                <>
                  <NavDropdown
                    title={`Xin chào, ${customerInfo?.ho} ${customerInfo?.ten}`}
                  >
                    <NavDropdown.Item href="/customer">
                      Thông tin
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                      Đăng xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link className="nav-link" onClick={handleLogin}>
                    Đăng nhập
                  </Nav.Link>
                  <Link to="/login" className="nav-link">
                    Đăng ký
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal đăng nhập */}
      <Modal show={showLoginModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Đăng nhập</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            {/* Form */}
            <form onSubmit={handleSubmit(onLogin)}>
              {/* Form Group */}
              <div className="form-group">
                <label className="input-label" htmlFor="loginEmail">
                  <span className="d-flex justify-content-between align-items-center">
                    Email
                  </span>
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="loginEmail"
                    placeholder="Booking@thanhhuong.com"
                    {...register("email")}
                  />
                </div>

                <div className="error-form-msg">{errors.email?.message}</div>
              </div>
              {/* End Form Group */}

              {/* Form Group */}
              <div className="js-form-message form-group">
                <label className="input-label" htmlFor="loginPassword">
                  <span className="d-flex justify-content-between align-items-center">
                    Password
                    {/* <Link className="input-label-secondary" tabIndex={-1}>
                      Quên mật khẩu?
                    </Link> */}
                    <Link
                      className="input-label-secondary"
                      to={"/forgotPassword"}
                      tabIndex={-1}
                    >
                      Quên mật khẩu?
                    </Link>
                  </span>
                </label>

                <div className="input-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="loginPassword"
                    placeholder="Nhập Mật khẩu"
                    {...register("password")}
                  />
                </div>

                <div className="error-form-msg">{errors.password?.message}</div>
              </div>
              {/* End Form Group */}

              {/* Checkbox */}
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="termsCheckbox"
                    name="termsCheckbox"
                  />
                  <label
                    className="custom-control-label text-muted"
                    htmlFor="termsCheckbox"
                  >
                    Lưu đăng nhập
                  </label>
                </div>
              </div>
              {/* End Checkbox */}

              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
              >
                Đăng nhập
              </button>
            </form>
            {/* End Form */}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default Navbars;
