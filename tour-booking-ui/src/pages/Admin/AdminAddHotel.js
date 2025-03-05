import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
import { getAdminInfo } from "../../api/AdminApi";
import AddHotel from "../../components/Admin/AddHotel";
export default function AdminAddHotel() {
  const [adminInfo, setAdminInfo] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
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
    <div className="footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl">
      <Header
        adminInfo={adminInfo}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Sidebar
        user="admin"
        strActive="hotel"
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <AddHotel />
    </div>
  );
}
