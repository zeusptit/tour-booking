import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
import { getTourGuideInfo } from "../../api/TourGuideApi";
import Overview from "../../components/TourGuide/Overview";

export default function TourGuideOverview() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [tourguideInfo, setTourguideInfo] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTourguideInfo = async () => {
      const tmpTourguideInfo = await getTourGuideInfo();
      if (tmpTourguideInfo === null) {
        navigate("/login");
      }
      setTourguideInfo(tmpTourguideInfo);
    };
    fetchTourguideInfo();
  }, [navigate]);

  return (
    <div className="body footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl">
      <Header
        tourguideInfo={tourguideInfo}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Sidebar
        user="tourguide"
        strActive="overview"
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Overview />
    </div>
  );
}
