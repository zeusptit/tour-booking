import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
import { getCustomerInfo } from "../../api/CustomersApi";
import History from "../../components/Customer/History";

export default function CustomerOverview() {
  const [customerInfo, setCustomerInfo] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCutomerInfo = async () => {
      const tmpCustomerInfo = await getCustomerInfo();
      if (tmpCustomerInfo === null) {
        navigate("/login");
      }
      setCustomerInfo(tmpCustomerInfo);
    };
    fetchCutomerInfo();
  }, [navigate]);

  return (
    <div className="body footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl">
      <Header customerInfo={customerInfo} />
      <Sidebar user="customer" strActive="overview" />
      <History />
    </div>
  );
}
