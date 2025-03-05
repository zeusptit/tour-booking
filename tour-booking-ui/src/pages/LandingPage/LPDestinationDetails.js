import React from "react";
import Navbars from "../../layouts/Navbars";
import Footer from "../../layouts/Footer";
import DestinationDetails from "../../components/LandingPage/DestinationDetails";

export default function LPDestinationDetails() {
  return (
    <div className="body footer-offset">
      <Navbars />
      <DestinationDetails />
      <Footer />
    </div>
  );
}
