import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPackageDetails } from "../../api/PublicApi";
import {
  getCustomerInfo,
  checkVoucher,
  addBooking,
} from "../../api/CustomersApi";
import { postErrorToast, postSuccessToast } from "../../layouts/Toast";
import MoneyFormat from "../Custom/MoneyFormat";
export default function Booking() {
  const { id } = useParams();
  const [subTotal, setSubTotal] = useState(0);
  const [member, setMember] = useState(0);
  const navigate = useNavigate();
  const [bookingInfo, setBookingInfo] = useState({
    numberOfPeople: 1,
    total: 0,
    note: "",
    pickup: false,
    customers: {
      id: null,
    },
    packages: {
      id: id,
    },
    vouchers: {
      code: "",
      percent: 0,
    },
  });
  const handleChangeBookingInfo = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setBookingInfo((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (name === "numberOfPeople") {
      calculateTotal();
    }
  };

  const calculateTotal = () => {
    const newSubTotal =
      bookingInfo.numberOfPeople * packagesInfo.cost -
      member * bookingInfo.numberOfPeople;
    const newTotal = (newSubTotal * (100 - bookingInfo.vouchers.percent)) / 100;
    setSubTotal(newSubTotal);
    setBookingInfo((prevState) => ({ ...prevState, total: newTotal }));
  };

  const handleCheckVoucher = async () => {
    const pc = await checkVoucher(bookingInfo.vouchers);
    if (pc != null) {
      setBookingInfo((prevState) => ({
        ...prevState,
        vouchers: { ...prevState.vouchers, percent: pc },
      }));
      postSuccessToast("Voucher khả dụng");
    } else {
      postErrorToast("Voucher hết hạn");
      setBookingInfo((prevState) => ({
        ...prevState,
        vouchers: { ...prevState.vouchers, percent: 0 },
      }));
    }
    calculateTotal();
  };
  const onVoucherInputChange = (e) => {
    setBookingInfo((prevState) => ({
      ...prevState,
      vouchers: { ...prevState.vouchers, [e.target.name]: e.target.value },
    }));
  };

  const handleConfirm = async () => {
    const tmpBooking = await addBooking(bookingInfo);
    if (tmpBooking == null) {
      return;
    }
    window.location.replace(tmpBooking.paymentUrl);
    // navigate(tmpBooking.paymentUrl, { replace: true });
  };

  const [packagesInfo, setPackagesInfo] = useState(null);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      const tmpCustomerInfo = await getCustomerInfo();
      if (tmpCustomerInfo === null) {
        navigate("/login");
      } else {
        if (tmpCustomerInfo.membership === "PREMIUM") setMember(100000);
        setBookingInfo((prevState) => ({
          ...prevState,
          customers: { ...prevState.customers, id: tmpCustomerInfo.id },
        }));
      }
    };
    const PackagesInfo = async () => {
      const tmpPackageInfo = await getPackageDetails(id);
      if (tmpPackageInfo === null) {
        navigate("/error404");
      }
      setPackagesInfo(tmpPackageInfo);
      setSubTotal(tmpPackageInfo.cost);
      setBookingInfo((prevState) => ({
        ...prevState,
        total: tmpPackageInfo.cost,
      }));
    };
    PackagesInfo();
    fetchCustomerInfo();
  }, [id, navigate]);

  useEffect(() => {
    const calculateTotal = () => {
      const newSubTotal =
        bookingInfo.numberOfPeople * packagesInfo.cost -
        member * bookingInfo.numberOfPeople;
      const newTotal =
        (newSubTotal * (100 - bookingInfo.vouchers.percent)) / 100;
      setSubTotal(newSubTotal);
      setBookingInfo((prevState) => ({ ...prevState, total: newTotal }));
    };
    if (packagesInfo != null) calculateTotal();
  }, [
    bookingInfo.numberOfPeople,
    bookingInfo.vouchers.percent,
    member,
    packagesInfo,
  ]);

  return (
    <main id="content" role="main" className="main">
      <div className="content container-fluid">
        <div className="w-md-75 mx-md-auto">
          {/* <!-- Step --> */}
          <ul className="step step-sm step-icon-sm step-inline step-item-between mb-7">
            <li className={`step-item active focus}`}>
              <Link className="step-content-wrapper">
                <span className="step-icon step-icon-soft-dark">1</span>
                <div className="step-content">
                  <span className="step-title">Thông tin</span>
                </div>
              </Link>
            </li>

            <li className={`step-item active focus}`}>
              <Link className="step-content-wrapper">
                <span className="step-icon step-icon-soft-dark">2</span>
                <div className="step-content">
                  <span className="step-title">Thanh toán</span>
                </div>
              </Link>
            </li>
          </ul>
          {/* <!-- End Step --> */}
        </div>
        {packagesInfo && (
          <div className="row justify-content-lg-center">
            <div
              className="card mb-3"
              //   style="max-width: 540px;"
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    className="img-fluid img-lp"
                    src={`http://localhost:8084/api/v1/FileUpload/files/${packagesInfo.imageList[0]}`}
                    style={{ maxHeight: "200px" }}
                    alt="Card cap"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h3 className="card-title">{packagesInfo.name}</h3>
                    <p
                      className="card-text"
                      style={{ maxHeight: "50px", overflow: "hidden" }}
                    >
                      {packagesInfo.description}
                    </p>
                    <p className="card-text">
                      Khởi hành:{" "}
                      <span className="ml-1 text-dark font-weight-bold mr-5">
                        {packagesInfo.startDate}
                      </span>
                      Kết thúc:{" "}
                      <span className="ml-1 text-dark font-weight-bold">
                        {packagesInfo.endDate}
                      </span>
                    </p>
                    <p className="card-text">
                      Còn trống:{" "}
                      <span className="ml-1 text-dark font-weight-bold mr-5">
                        {packagesInfo.available}
                      </span>
                      Giá:{" "}
                      <span className="ml-1 text-dark font-weight-bold">
                        <MoneyFormat amount={packagesInfo.cost} /> vnđ
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {packagesInfo && (
          <div className="content container-fluid">
            <div className="row justify-content-lg-center">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h3>Lưu ý</h3>
                  </div>
                  <div className="card-body">
                    <p>
                      - Tất cả khách hàng đi tour phải có CMND/CCCD còn thời
                      hạn, Giấy khai sinh đối với trẻ em dưới 14 tuổi
                    </p>
                    <p>
                      - Trong trường hợp bất khả kháng do thời tiết, thiên tai,
                      bạo động, chiến tranh, dịch bệnh, chuyến bay bị trì hoãn
                      hay bị hủy do thời tiết hoặc do kỹ thuật… dẫn đến tour
                      không thể tiếp tục được, công ty sẽ hoàn trả lại tiền tour
                      cho quý khách sau khi đã trừ các khoản chi phí dịch vụ đã
                      thực hiện và không chịu trách nhiệm bồi thường thêm bất kỳ
                      chi phí nào khác.
                    </p>
                    <p>
                      - Khi đăng ký tour du lịch, Quý khách vui lòng đọc kỹ
                      chương trình, giá tour, các điều khoản.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h3>Đặt tour</h3>
                  </div>
                  <div className="card-body">
                    {/* <!-- Input Group --> */}
                    <div className="media">
                      <div className="media-body">
                        <h6 className="card-subtitle">Số người</h6>
                        <input
                          type="number"
                          className="form-control"
                          name="numberOfPeople"
                          placeholder="Số lượng người"
                          aria-label="Số lượng người"
                          value={bookingInfo.numberOfPeople}
                          onChange={handleChangeBookingInfo}
                        />
                      </div>
                    </div>
                    <br className="my-1" />
                    <div className="media">
                      <div className="media-body">
                        <h6 className="card-subtitle">Ghi chú</h6>
                        <input
                          type="text"
                          className="form-control"
                          name="note"
                          placeholder="Nhập ghi chú"
                          aria-label="Nhập ghi chú"
                          value={bookingInfo.note}
                          onChange={handleChangeBookingInfo}
                        />
                      </div>
                    </div>
                    <br className="my-1" />
                    <div>
                      <input
                        type="checkbox"
                        checked={bookingInfo.pickup}
                        onChange={handleChangeBookingInfo}
                        name="pickup"
                        id="pickup"
                      />
                      <label htmlFor="pickup" className="ml-2">
                        Yêu cầu đưa đón tận nơi
                      </label>
                    </div>
                    {/* <!-- End Input Group --> */}
                    <br className="my-4" />
                    <div className="row align-items-center mb-3">
                      <span className="col-6">Hạng thành viên:</span>
                      <h4 className="col-6 text-right text-dark mb-0">
                        -{" "}
                        <MoneyFormat
                          amount={member * bookingInfo.numberOfPeople}
                        />{" "}
                        VNĐ
                      </h4>
                    </div>

                    <div className="row align-items-center mb-3">
                      <span className="col-6">Tạm tính:</span>
                      <h4 className="col-6 text-right text-dark mb-0">
                        <MoneyFormat amount={subTotal} /> VNĐ
                      </h4>
                    </div>
                    {/* <!-- End Row --> */}

                    {/* <!-- End Row --> */}

                    <hr className="my-4" />
                    {/* <!-- Input Group --> */}
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        className="form-control"
                        name="code"
                        value={bookingInfo.vouchers.code}
                        onChange={onVoucherInputChange}
                        placeholder="Nhập mã giảm giá"
                        aria-label="vouchers"
                      />
                      <div className="input-group-append">
                        <button
                          type="submit"
                          className="btn btn-block btn-primary"
                          onClick={handleCheckVoucher}
                        >
                          Áp dụng
                        </button>
                      </div>
                    </div>
                    {/* <!-- End Input Group --> */}
                    <hr className="my-4" />

                    <div className="row align-items-center">
                      <span className="col-6 text-dark font-weight-bold">
                        Tổng cộng:
                      </span>
                      <h3 className="col-6 text-right text-dark mb-0">
                        <MoneyFormat amount={bookingInfo.total} /> VNĐ
                      </h3>
                    </div>
                    {/* <!-- End Row --> */}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-2"
                  onClick={handleConfirm}
                >
                  Tiếp theo <i className="tio-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
