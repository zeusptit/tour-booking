import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
import { getCustomerInfo } from "../../api/CustomersApi";
import EditCustomer from "../../components/Customer/EditCustomer";

export default function CustomerInfo() {
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
    <div className="footer-offset footer-offset has-navbar-vertical-aside navbar-vertical-aside-show-xl">
      <Header customerInfo={customerInfo} />
      <Sidebar user="customer" />
      <EditCustomer customerInfo={customerInfo} />
    </div>
  );
}
