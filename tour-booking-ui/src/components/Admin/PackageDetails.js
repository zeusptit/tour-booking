import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MoneyFormat from "../Custom/MoneyFormat";
import {
  getPackagesById,
  addDayinPackage,
  deleteDayinPackage,
  addSchedule,
  deleteSchedule,
  getBookingListPackageById,
} from "../../api/PackagesApi";
import { getDesList } from "../../api/AdminApi";
import { Modal } from "react-bootstrap";
import EditPackage from "./EditPackage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
export default function AddPackages() {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [showAddDayModal, setShowAddModal] = useState(false);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [desList, setDesList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [packagesInfo, setPackagesInfo] = useState({
    name: "",
    capacity: null,
    cost: 0,
    startDate: "",
    endDate: "",
    description: "",
    tourGuidesDto: {
      id: null,
      ho: "",
      ten: "",
      dob: "",
      phone: "",
    },
    dayList: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesList = async () => {
      const tmpDesList = await getDesList(id);
      if (tmpDesList === null) {
        navigate("/error404");
      } else {
        setDesList(tmpDesList);
      }
    };

    const fetchBookingList = async () => {
      const tmpBookingList = await getBookingListPackageById(id);
      if (tmpBookingList === null) {
        return;
      } else {
        setBookingList(tmpBookingList);
      }
    };

    const fetchPackageInfo = async () => {
      const tmpPackageInfo = await getPackagesById(id);
      if (tmpPackageInfo === null) {
        navigate("/error404");
      } else {
        setPackagesInfo(tmpPackageInfo);
      }
    };
    fetchBookingList();
    fetchDesList();
    fetchPackageInfo();
  }, [id, navigate, editMode]);

  const addDaySchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên ngày"),
    // date: yup.string().required("Vui lòng nhập ngày"),
    date: yup
      .string()
      .required("Vui lòng nhập ngày")
      .test(
        "is-valid-range",
        "Ngày phải nằm trong ngày bắt đầu và ngày kết thúc",
        function (value) {
          const { startDate, endDate } = this.parent;
          return value >= startDate && value <= endDate;
        }
      ),
    startDate: yup.string().required("Yêu cầu ngày bắt đầu của tour"),
    endDate: yup.string().required("Yêu cầu ngày kết thúc của tour"),
  });

  const addScheduleSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên lịch trình"),
    startTime: yup.string().required("Vui lòng nhập giờ bắt đầu"),
    endTime: yup.string().notRequired(),
    description: yup.string().required("Vui lòng nhập mô tả"),
    daysId: yup.string().required("Vui lòng nhập ngày"),
    des: yup.object().shape({
      id: yup
        .number()
        .nullable()
        .transform((_, originalValue) =>
          originalValue === "" ? null : Number(originalValue)
        )
        .notRequired(),
    }),
  });

  const {
    register: registerAddDayForm,
    handleSubmit: handleSubmitAddDayForm,
    setValue: setValueAddDayForm,
    reset: resetAddDayForm,
    formState: { errors: errorsAddDayForm },
  } = useForm({
    resolver: yupResolver(addDaySchema),
  });

  const {
    register: registerAddScheduleForm,
    handleSubmit: handleSubmitAddScheduleForm,
    setValue: setValueAddScheduleForm,
    reset: resetAddScheduleForm,
    formState: { errors: errorsAddScheduleForm },
  } = useForm({
    resolver: yupResolver(addScheduleSchema),
  });

  const handleAdd = () => {
    setValueAddDayForm("startDate", packagesInfo.startDate);
    setValueAddDayForm("endDate", packagesInfo.endDate);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    resetAddDayForm();
  };

  const onAddDay = async (data) => {
    const request = await addDayinPackage(id, data);
    if (request != null) {
      setShowAddModal(false);
      resetAddDayForm();
    }
  };

  const handleDeleteDay = async (dId) => {
    await deleteDayinPackage(id, dId);
    // window.location.reload();
  };

  const handleAddSchedule = (dayId) => {
    setValueAddScheduleForm("daysId", dayId);
    setShowAddSchedule(true);
  };

  const handleCloseAddSchedule = () => {
    setShowAddSchedule(false);
    resetAddScheduleForm();
  };

  const onAddSchedule = async (data) => {
    const request = await addSchedule(id, data.daysId, data);
    if (request != null) {
      handleCloseAddSchedule();
    }
  };

  const handleDeleteSchedule = async (dId, sId) => {
    await deleteSchedule(id, dId, sId);
    // window.location.reload();
  };

  useEffect(() => {
    const fetchPackageInfo = async () => {
      const tmpPackageInfo = await getPackagesById(id);
      if (tmpPackageInfo === null) {
        navigate("/error404");
      } else {
        setPackagesInfo(tmpPackageInfo);
      }
    };
    fetchPackageInfo();
  }, [
    id,
    navigate,
    showAddDayModal,
    showAddSchedule,
    handleDeleteDay,
    handleDeleteSchedule,
  ]);

  return !editMode ? (
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
                    <Link className="breadcrumb-link" to={"/admin/packages"}>
                      Gói
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Thông tin gói
                  </li>
                </ol>
              </nav>

              <div className="d-sm-flex align-items-sm-center">
                <h1 className="page-header-title">Gói: {packagesInfo.name}</h1>
                <span
                  className={`badge   ml-sm-3 font-size-sm ${
                    packagesInfo.available > 0
                      ? "badge-soft-success"
                      : "badge-soft-danger"
                  }`}
                >
                  <span
                    className={`legend-indicator ${
                      packagesInfo.available > 0 ? "bg-success" : "bg-danger"
                    }`}
                  ></span>
                  Còn trống: {packagesInfo.available}
                </span>
              </div>

              <div className="mt-2">
                <span className="ml-1 ml-sm-1">
                  <i className="tio-date-range mr-2"></i>
                  {packagesInfo.startDate}{" "}
                  <i className="tio-arrow-forward mr-2"></i>{" "}
                  {packagesInfo.endDate}{" "}
                </span>

                <span className="ml-2 ml-sm-3">
                  <i className="tio-user-big mr-2"></i>
                  {packagesInfo.capacity}{" "}
                </span>

                <span className="ml-2 ml-sm-3">
                  <i className="tio-dollar-outlined mr-2"></i>
                  <MoneyFormat amount={packagesInfo.cost} />
                  VNĐ
                </span>
              </div>
            </div>
            <div className="col-sm-auto d-print-none">
              <Link className="mr-3" onClick={() => setEditMode(true)}>
                <i className="tio-edit mr-1 "></i> Sửa
              </Link>

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

        {/* Info */}
        <div className="row">
          <div className="col-lg-8">
            {/* <!-- Card --> */}
            <div className="card">
              {/* <!-- Header --> */}
              <div className="card-header">
                <h3 className="card-header-title">Lịch trình</h3>{" "}
                <Link className="mr-3" onClick={handleAdd}>
                  <i className="tio-add-event mr-1 "></i> Thêm Ngày
                </Link>
              </div>
              {/* <!-- End Header --> */}

              {/* <!-- Body --> */}
              <div className="card-body">
                {/* <!-- Step --> */}
                <div>
                  {packagesInfo.dayList.map((day, outerIndex) => (
                    <div key={outerIndex}>
                      <ul className="step step-icon-xs">
                        <li className="step-item">
                          <div className="step-content-wrapper">
                            <div className="font-size-md step-divider d-flex w-100">
                              <span className="text-start">{day.name}</span>
                              <span style={{ marginLeft: "auto" }}>
                                {day.date}{" "}
                                <Link
                                  className="mr-1 btn-ghost-danger"
                                  onClick={() => handleDeleteDay(day.id)}
                                >
                                  <i className="tio-add-to-trash mr-1 "></i>
                                </Link>
                                <Link
                                  className=""
                                  onClick={() => handleAddSchedule(day.id)}
                                >
                                  <i className="tio-add-event mr-1 "></i>
                                </Link>
                              </span>
                            </div>
                          </div>
                        </li>
                        {day.schedulesList.map((schedule, innerIndex) => (
                          <li key={innerIndex} className="step-item">
                            <div className="step-content-wrapper">
                              <span className="step-icon step-icon-info step-icon-pseudo"></span>
                              <div className="step-content">
                                <div className=" d-flex w-100">
                                  <h4 className="mb-1 text-dark text-start">
                                    {schedule.name}
                                  </h4>
                                  <p
                                    className="font-size-sm mb-0"
                                    style={{ marginLeft: "auto" }}
                                  >
                                    {schedule.startTime}{" "}
                                    {schedule.endTime && "-"} {schedule.endTime}{" "}
                                    <Link
                                      className="btn-ghost-danger"
                                      onClick={() =>
                                        handleDeleteSchedule(
                                          day.id,
                                          schedule.id
                                        )
                                      }
                                    >
                                      <i className="tio-add-to-trash mr-1 "></i>
                                    </Link>
                                  </p>
                                </div>
                                <p className="font-size-sm mb-0">
                                  {schedule.description}
                                </p>
                                {schedule.des &&
                                  schedule.des.destinationType &&
                                  schedule.des.id && (
                                    <Link
                                      className="font-size-sm"
                                      to={{
                                        pathname: {
                                          RESTAURANT: `/admin/restaurants/${schedule.des.id}`,
                                          HOTEL: `/admin/hotels/${schedule.des.id}`,
                                          PLACES_OF_VISIT: `/admin/places/${schedule.des.id}`,
                                        }[schedule.des.destinationType],
                                      }}
                                      target="_blank"
                                    >
                                      {schedule.des.name}
                                    </Link>
                                  )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* <!-- End Step --> */}
              </div>
              {/* <!-- End Body --> */}
            </div>

            {/* <!-- End Card --> */}
          </div>

          <div className="col-lg-4">
            <div className="card">
              {/* <!-- Header --> */}
              <div className="card-header">
                <h3 className="card-header-title">Hướng dẫn viên</h3>
              </div>
              {/* <!-- End Header --> */}

              {/* <!-- Body --> */}
              <div className="card-body">
                <Link
                  className="media align-items-center"
                  to={`/admin/tourguides/${packagesInfo.tourGuidesDto.id}`}
                  target="_blank"
                >
                  <div className="media-body">
                    <h3 className="text-body text-hover-primary">
                      {packagesInfo.tourGuidesDto.ho}{" "}
                      {packagesInfo.tourGuidesDto.ten}
                    </h3>
                  </div>
                  <div className="media-body text-right">
                    <i className="tio-chevron-right text-body"></i>
                  </div>
                </Link>
                <hr></hr>

                <div className="d-flex justify-content-between align-items-center">
                  <h3>Thông tin liên lạc</h3>
                </div>

                <ul className="list-unstyled list-unstyled-py-2">
                  <li>
                    <i className="tio-android-phone-vs mr-2"></i>
                    {packagesInfo.tourGuidesDto.phone}
                  </li>
                </ul>
              </div>
              {/* <!-- End Body --> */}
            </div>

            <div className="card mt-5">
              {/* <!-- Header --> */}
              <div className="card-header">
                <h3 className="card-header-title">Danh sách đặt tour</h3>
              </div>
              {/* <!-- End Header --> */}

              {/* <!-- Body --> */}
              <div className="card-body">
                {bookingList.map((booking) => (
                  <div key={booking.id}>
                    <Link
                      className="media align-items-center"
                      to={`/admin/bookings/${booking.id}`}
                      target="_blank"
                    >
                      <h5 className="text-hover-primary">{booking.code} </h5>
                      <div className="media-body text-right">
                        <i className="tio-chevron-right text-body"></i>
                      </div>
                    </Link>
                    <hr />
                  </div>
                ))}
              </div>
              {/* <!-- End Body --> */}
            </div>
          </div>
        </div>

        {/* End Info */}

        {/* Edit box */}
      </div>
      <Modal className="mt-5" show={showAddDayModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm ngày</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            {/* Form */}
            <form onSubmit={handleSubmitAddDayForm(onAddDay)}>
              {/* Form Group */}
              <div className="js-form-message form-group">
                <label className="input-label" htmlFor="nameDay">
                  <span className="d-flex justify-content-between align-items-center">
                    Tên
                  </span>
                </label>

                <input
                  className={`form-control form-control-lg ${
                    errorsAddDayForm.name ? "is-invalid" : ""
                  }`}
                  id="nameDay"
                  {...registerAddDayForm("name")}
                />
                <div className="error-form-msg">
                  {errorsAddDayForm.name?.message}
                </div>
              </div>
              {/* End Form Group */}

              {/* Form Group */}
              <div className="js-form-message form-group">
                <label className="input-label" htmlFor="dateDay">
                  <span className="d-flex justify-content-between align-items-center">
                    Ngày
                  </span>
                </label>

                <div className="input-group">
                  <input
                    type="date"
                    className={`form-control form-control-lg ${
                      errorsAddDayForm.date ? "is-invalid" : ""
                    }`}
                    id="dateDay"
                    {...registerAddDayForm("date")}
                  />
                  <div className="error-form-msg">
                    {errorsAddDayForm.date?.message}
                  </div>
                </div>
              </div>
              {/* End Form Group */}
              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
              >
                Thêm
              </button>
            </form>
            {/* End Form */}
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showAddSchedule} onHide={handleCloseAddSchedule}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body">
            <form onSubmit={handleSubmitAddScheduleForm(onAddSchedule)}>
              <div className="form-group">
                <label className="input-label" htmlFor="scheduleName">
                  <span className="d-flex justify-content-between align-items-center">
                    Tên
                  </span>
                </label>

                <input
                  className="form-control form-control-lg"
                  id="scheduleName"
                  {...registerAddScheduleForm("name")}
                />
                <div className="error-form-msg">
                  {errorsAddScheduleForm.name?.message}
                </div>
              </div>

              <div className="form-group">
                <label className="input-label" htmlFor="startTime">
                  <span className="d-flex justify-content-between align-items-center">
                    Thời gian bắt đầu
                  </span>
                </label>

                <div className="input-group">
                  <input
                    type="time"
                    className="form-control form-control-lg"
                    id="startTime"
                    {...registerAddScheduleForm("startTime")}
                  />
                  <div className="error-form-msg">
                    {errorsAddScheduleForm.startTime?.message}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="input-label" htmlFor="endTime">
                  <span className="d-flex justify-content-between align-items-center">
                    Thời gian kết thúc
                  </span>
                </label>

                <div className="input-group">
                  <input
                    type="time"
                    className="form-control form-control-lg"
                    id="endTime"
                    {...registerAddScheduleForm("endTime")}
                  />
                  <div className="error-form-msg">
                    {errorsAddScheduleForm.endTime?.message}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="input-label" htmlFor="descriptionLabel">
                  <span className="d-flex justify-content-between align-items-center">
                    Mô tả
                  </span>
                </label>

                <div className="input-group">
                  <textarea
                    className={`form-control ${
                      errorsAddScheduleForm.description ? "is-invalid" : ""
                    }`}
                    id="descriptionLabel"
                    placeholder="Nhập mô tả lịch trình"
                    style={{ minHeight: "8.9rem" }}
                    {...registerAddScheduleForm("description")}
                  />
                  <div className="error-form-msg">
                    {errorsAddScheduleForm.description?.message}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <select
                  id="desIdLabel"
                  className={`form-select custom-select ${
                    errorsAddScheduleForm.des?.id ? "is-invalid" : ""
                  }`}
                  {...registerAddScheduleForm("des.id")}
                >
                  <option value="">Chọn địa điểm</option>
                  {desList.map((des) => (
                    <option key={des.id} value={des.id}>
                      {des.name}
                    </option>
                  ))}
                </select>
                <div className="error-form-msg">
                  {errorsAddScheduleForm.des?.id?.message}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
              >
                Thêm
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  ) : (
    <EditPackage
      pack={packagesInfo}
      editMode={editMode}
      setEditMode={setEditMode}
    />
  );
}
