import React from "react";
import Navbars from "../../layouts/Navbars";
import Footer from "../../layouts/Footer";
import Booking from "../../components/LandingPage/Booking";

export default function LPBooking() {
  return (
    <div className="body footer-offset">
      <Navbars />
      <Booking />
      <Footer />
    </div>
  );
}
