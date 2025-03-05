import React from "react";
import Navbars from "../../layouts/Navbars";
import Footer from "../../layouts/Footer";
import Hotels from "../../components/LandingPage/Hotels";

export default function LPHotels() {
  return (
    <div className="body footer-offset">
      <Navbars />
      <Hotels />
      <Footer />
    </div>
  );
}
