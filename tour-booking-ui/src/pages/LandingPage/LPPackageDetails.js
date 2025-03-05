import React from "react";
import Navbars from "../../layouts/Navbars";
import PackageDetails from "../../components/LandingPage/PackageDetails";
import Footer from "../../layouts/Footer";

export default function LPPackageDetails() {
  return (
    <div className="body footer-offset">
      <Navbars />
      <PackageDetails />
      <Footer />
    </div>
  );
}
