import React from "react";
import Navbars from "../../layouts/Navbars";
import Footer from "../../layouts/Footer";
import Contact from "../../components/LandingPage/Contact";

export default function LPContact() {
  return (
    <div className="body footer-offset">
      <Navbars />
      <Contact />
      <Footer />
    </div>
  );
}
