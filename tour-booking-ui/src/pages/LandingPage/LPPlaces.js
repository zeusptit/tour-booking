import React from "react";
import Navbars from "../../layouts/Navbars";
import Footer from "../../layouts/Footer";
import Places from "../../components/LandingPage/Places";

export default function LPPlaces() {
  return (
    <div className="body footer-offset">
      <Navbars />
      <Places />
      <Footer />
    </div>
  );
}
