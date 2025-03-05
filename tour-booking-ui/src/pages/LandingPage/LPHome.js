import React from "react";
import Navbars from "../../layouts/Navbars";
import Home from "../../components/LandingPage/Home";
import Footer from "../../layouts/Footer";

export default function LPHome() {
  return (
    <div className="body footer-offset">
      <Navbars />
      <Home />
      <Footer />
    </div>
  );
}
