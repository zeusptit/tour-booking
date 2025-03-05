import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";

import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
import { getAdminInfo } from "../../api/AdminApi";
import RestaurantDetails from "../../components/Admin/RestaurantDetails";
export default function AdminRestaurantDetails() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [adminInfo, setAdminInfo] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const AdminInfo = async () => {
      const tmpAdminInfo = await getAdminInfo();
      if (tmpAdminInfo === null) {
        navigate("/login");
      }
      setAdminInfo(tmpAdminInfo);
    };
    AdminInfo();
  }, [navigate]);

  return (
    <div className="body footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl">
      <Header
        adminInfo={adminInfo}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Sidebar
        user="admin"
        strActive="restaurant"
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <RestaurantDetails />
    </div>
  );
}
