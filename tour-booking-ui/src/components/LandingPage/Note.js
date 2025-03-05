import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { Link } from "react-router-dom";

function Note() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  return (
    <div>
      <div>
        <h1 className="text-center mb-3 mt-3">Những thông tin cần lưu ý</h1>
      </div>
      <div className="row">
        <div className="col-lg-3 col-sm-12">
          {/* <!-- Card --> */}
          <div className="card">
            {/* <!-- Header --> */}
            <div className="card-header">
              <h4 className="card-header-title">Giá tour không bao gồm</h4>
              <Link onClick={() => setOpen1(!open1)} aria-expanded={open1}>
                <i className="tio-arrow-downward mr-1"></i>
              </Link>
            </div>
            {/* <!-- End Header --> */}
            <Collapse in={open1}>
              {/* <!-- Body --> */}
              <div className="card-body">
                <p>- Chi phí di chuyển tới điểm hẹn.</p>
                <p>- Phí phòng đơn (dành cho khách đi 1 mình)</p>
              </div>
              {/* <!-- End Body --> */}
            </Collapse>
          </div>
          {/* <!-- End Card --> */}
        </div>
        <div className="col-lg-3 col-sm-12">
          {/* <!-- Card --> */}
          <div className="card">
            {/* <!-- Header --> */}
            <div className="card-header">
              <h4 className="card-header-title">Đưa đón</h4>
              <Link onClick={() => setOpen4(!open4)} aria-expanded={open4}>
                <i className="tio-arrow-downward mr-1"></i>
              </Link>
            </div>
            {/* <!-- End Header --> */}
            <Collapse in={open4}>
              {/* <!-- Body --> */}
              <div className="card-body">
                <p>- Quý khách có thể tự di chuyển tới điểm hẹn.</p>
                <p>
                  - Nếu quý khách có nhu cầu đưa đón tận nơi, vui lòng tích chọn
                  "Yêu cầu đưa đón" khi thanh toán. Công ty sẽ hỗ trợ đưa đón
                  tới điểm hẹn (máy bay, tàu, ô tô). Chi phí sẽ được thông báo
                  sau khi thanh toán thành công 2 ngày làm việc.
                </p>
              </div>
              {/* <!-- End Body --> */}
            </Collapse>
          </div>
          {/* <!-- End Card --> */}
        </div>
        <div className="col-lg-3 col-sm-12">
          {/* <!-- Card --> */}
          <div className="card">
            {/* <!-- Header --> */}
            <div className="card-header">
              <h4 className="card-header-title">Huỷ tour</h4>
              <Link onClick={() => setOpen2(!open2)} aria-expanded={open2}>
                <i className="tio-arrow-downward mr-1"></i>
              </Link>
            </div>
            {/* <!-- End Header --> */}
            <Collapse in={open2}>
              {/* <!-- Body --> */}
              <div className="card-body">
                <p>- Phạt 10%: Ngay sau khi đăng ký</p>
                <p>- Phạt 50%: Trước 15 ngày khởi hành</p>
                <p>- Phạt 70%: trước 05 ngày khởi hành</p>
                <p>- Phạt 100%: Trước 02 ngày khởi hành</p>
              </div>
              {/* <!-- End Body --> */}
            </Collapse>
          </div>
          {/* <!-- End Card --> */}
        </div>
        <div className="col-lg-3 col-sm-12">
          {/* <!-- Card --> */}
          <div className="card">
            {/* <!-- Header --> */}
            <div className="card-header">
              <h4 className="card-header-title">Thanh toán</h4>
              <Link onClick={() => setOpen3(!open3)} aria-expanded={open3}>
                <i className="tio-arrow-downward mr-1"></i>
              </Link>
            </div>
            {/* <!-- End Header --> */}
            <Collapse in={open3}>
              {/* <!-- Body --> */}
              <div className="card-body">
                <p>
                  - Sau khi xác nhận thanh toán thành công, quý khách vui lòng
                  kiểm tra email xác nhận được gửi tới email đã đăng ký. Nếu
                  không nhận được email vui lòng liên hệ với công ty.
                </p>
                <p>
                  - Nếu quý khách muốn hủy tour, vui lòng đem theo email xác
                  nhận đến văn phòng của công ty để làm thủ tục hủy tour. Công
                  ty chỉ nhận khách báo hủy trực tiếp.
                </p>
              </div>
              {/* <!-- End Body --> */}
            </Collapse>
          </div>
          {/* <!-- End Card --> */}
        </div>
      </div>
    </div>
  );
}

export default Note;
