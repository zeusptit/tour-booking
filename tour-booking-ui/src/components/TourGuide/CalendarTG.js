import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getPackagesList } from "../../api/TourGuideApi";
export default function CalendarTG() {
  const navigate = useNavigate();
  const [packageList, setPackageList] = useState([]);
  useEffect(() => {
    const getPackageList = async () => {
      const tmpPackageList = await getPackagesList();
      if (tmpPackageList === null) {
        navigate("/login");
      }
      setPackageList(tmpPackageList);
    };
    getPackageList();
  }, [navigate]);

  const events = packageList.map((packageItem) => ({
    id: packageItem.id,
    title: packageItem.name,
    start: new Date(packageItem.startDate),
    end: new Date(packageItem.endDate),
    url: `/tourguide/events/${packageItem.id}`, // Thêm prop url để lưu đường dẫn của mỗi sự kiện
  }));
  const localizer = momentLocalizer(moment);
  moment.locale("vi");
  const messages = {
    today: "Hôm nay",
    previous: "Trước",
    next: "Tiếp",
    month: "Tháng",
    week: "Tuần",
    day: "Ngày",
    agenda: "Lịch sự kiện",
    date: "Ngày",
    time: "Thời gian",
    event: "Sự kiện",
  };

  return (
    <main id="content" role="main" className="main">
      {/* <!-- Content --> */}
      <div className="content container-fluid">
        {/* <!-- Page Header --> */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm mb-2 mb-sm-0">
              <h1 className="page-header-title">Lịch làm việc</h1>
            </div>
            <div className="col-sm-auto">
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

        {/* <!-- End Page Header --> */}

        <div className="card shadow">
          <div className="card-body">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              messages={messages}
            />
          </div>
        </div>
      </div>

      {/* <!-- End Content --> */}
    </main>
  );
}
