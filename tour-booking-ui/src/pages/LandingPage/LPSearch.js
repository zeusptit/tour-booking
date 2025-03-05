import React from "react";
import Navbars from "../../layouts/Navbars";

import Search from "../../components/LandingPage/Search";
import Footer from "../../layouts/Footer";

export default function LPSearch() {
  return (
    <div className="body footer-offset">
      <Navbars />
      <Search />
      <Footer />
    </div>
  );
}
