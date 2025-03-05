import React from "react";

export default function Overview() {
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
                    <span className="d-block font-size-md">Hướng dẫn viên</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">34,413</h3>
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
                  <i className="tio-user-big-outlined tio-xl text-primary mr-3 ml-3"></i>

                  <div className="media-body ml-2">
                    <span className="d-block font-size-md">Hướng dẫn viên</span>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">34,413</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Card --> */}
          </div>
        </div>
        {/* <!-- End Stats --> */}

        {/* Table Hướng dẫn viên */}

        {/* Hết Table Hướng dẫn viên */}

        {/* Table Khách hàng */}

        {/* Hết Table Khách Hàng */}
      </div>
    </main>
  );
}
