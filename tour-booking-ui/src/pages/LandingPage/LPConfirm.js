import React from "react";
import Navbars from "../../layouts/Navbars";
import Footer from "../../layouts/Footer";
import ConfirmBooking from "../../components/LandingPage/ConfirmBooking";

export default function LPConfirm() {
  return (
    <div className="body footer-offset">
      <Navbars />
      <ConfirmBooking />
      <Footer />
    </div>
  );
}
