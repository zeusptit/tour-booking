import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import "./assets/css/vendor.min.css";
import "./assets/vendor/icon-set/style.css";
import "./assets/css/theme.min.css";
import AdminOverview from "./pages/Admin/AdminOverview";
import CustomerOverview from "./pages/Customer/CustomerOverview";
import CustomerInfo from "./pages/Customer/CustomerInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminInfo from "./pages/Admin/AdminInfo";
import TourGuideInfo from "./pages/TourGuide/TourGuideInfo";
import AdminTourGuide from "./pages/Admin/AdminTourGuide";
import AdminAddTourGuide from "./pages/Admin/AdminAddTourGuide";
import NotFound from "./pages/NotFound";
import AdminCustomer from "./pages/Admin/AdminCustomer";
import AdminCustomerDetails from "./pages/Admin/AdminCustomerDetails";
import AdminTourGuideDetails from "./pages/Admin/AdminTourGuideDetails";
import AdminVouchers from "./pages/Admin/AdminVouchers";
import AdminVoucherDetails from "./pages/Admin/AdminVoucherDetails";
import AdminAddVoucher from "./pages/Admin/AdminAddVoucher";
import AdminHotels from "./pages/Admin/AdminHotels";
import AdminHotelDetails from "./pages/Admin/AdminHotelDetails";
import AdminAddHotel from "./pages/Admin/AdminAddHotel";
import AdminRestaurants from "./pages/Admin/AdminRestaurants";
import AdminAddRestaurant from "./pages/Admin/AdminAddRestaurant";
import AdminRestaurantDetails from "./pages/Admin/AdminRestaurantDetails";
import AdminPlaces from "./pages/Admin/AdminPlaces";
import AdminAddPlace from "./pages/Admin/AdminAddPlace";
import AdminPlaceDetails from "./pages/Admin/AdminPlaceDetails";
import AdminPackages from "./pages/Admin/AdminPackages";
import AdminAddPackage from "./pages/Admin/AdminAddPackage";
import AdminPackageDetails from "./pages/Admin/AdminPackageDetails";
import TourGuideCalendar from "./pages/TourGuide/TourGuideCalendar";
import LPHome from "./pages/LandingPage/LPHome";
import LPSearch from "./pages/LandingPage/LPSearch";
import LPPackageDetails from "./pages/LandingPage/LPPackageDetails";
import LPBooking from "./pages/LandingPage/LPBooking";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import LPHotels from "./pages/LandingPage/LPHotels";
import LPPlaces from "./pages/LandingPage/LPPlaces";
import LPDestinationDetails from "./pages/LandingPage/LPDestinationDetails";
import LPContact from "./pages/LandingPage/LPContact";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminBookingDetails from "./pages/Admin/AdminBookingDetails";
import CustomerBookingDetails from "./pages/Customer/CustomerBookingDetails";
import LPConfirm from "./pages/LandingPage/LPConfirm";
function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <ToastContainer />
        <Routes>
          {/* LandingPage */}
          <Route exact path="/" element={<LPHome />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/resetPassword" element={<ResetPassword />} />
          <Route exact path="/search" element={<LPSearch />} />
          <Route exact path="/home" element={<LPHome />} />
          <Route exact path="/packages/:slug" element={<LPPackageDetails />} />
          <Route exact path="/packages/:id/booking" element={<LPBooking />} />
          <Route exact path="/confirmBooking" element={<LPConfirm />} />
          <Route exact path="/hotels" element={<LPHotels />} />
          <Route exact path="/places" element={<LPPlaces />} />
          <Route
            exact
            path="/places/:slug"
            element={<LPDestinationDetails />}
          />{" "}
          <Route
            exact
            path="/hotels/:slug"
            element={<LPDestinationDetails />}
          />
          <Route exact path="/contact" element={<LPContact />} />
          {/* Admin */}
          <Route exact path="/admin" element={<AdminOverview />} />
          <Route exact path="/adminInfo" element={<AdminInfo />} />
          <Route exact path="/admin/tourguides" element={<AdminTourGuide />} />
          <Route
            exact
            path="/admin/tourguides/:id"
            element={<AdminTourGuideDetails />}
          />
          <Route
            exact
            path="/admin/tourguides/add"
            element={<AdminAddTourGuide />}
          />
          <Route exact path="/admin/customers" element={<AdminCustomer />} />
          <Route
            exact
            path="/admin/customers/:id"
            element={<AdminCustomerDetails />}
          />
          {/* Voucher */}
          <Route exact path="/admin/vouchers" element={<AdminVouchers />} />
          <Route
            exact
            path="/admin/vouchers/add"
            element={<AdminAddVoucher />}
          />
          <Route
            exact
            path="/admin/vouchers/:id"
            element={<AdminVoucherDetails />}
          />
          {/* Hotel */}
          <Route exact path="/admin/hotels" element={<AdminHotels />} />
          <Route exact path="/admin/hotels/add" element={<AdminAddHotel />} />
          <Route
            exact
            path="/admin/hotels/:id"
            element={<AdminHotelDetails />}
          />
          {/* Restaurant */}
          <Route
            exact
            path="/admin/restaurants"
            element={<AdminRestaurants />}
          />
          <Route
            exact
            path="/admin/restaurants/add"
            element={<AdminAddRestaurant />}
          />
          <Route
            exact
            path="/admin/restaurants/:id"
            element={<AdminRestaurantDetails />}
          />
          {/* Place */}
          <Route exact path="/admin/places" element={<AdminPlaces />} />
          <Route exact path="/admin/places/add" element={<AdminAddPlace />} />
          <Route
            exact
            path="/admin/places/:id"
            element={<AdminPlaceDetails />}
          />
          {/* Package */}
          <Route exact path="/admin/packages" element={<AdminPackages />} />
          <Route
            exact
            path="/admin/packages/add"
            element={<AdminAddPackage />}
          />
          <Route
            exact
            path="/admin/packages/:id"
            element={<AdminPackageDetails />}
          />
          {/* Booking */}
          <Route exact path="/admin/bookings" element={<AdminBookings />} />
          <Route
            exact
            path="/admin/bookings/:id"
            element={<AdminBookingDetails />}
          />
          {/* Customer */}
          <Route exact path="/customer" element={<CustomerOverview />} />
          <Route exact path="/customerInfo" element={<CustomerInfo />} />
          <Route
            exact
            path="/customer/bookings/:id"
            element={<CustomerBookingDetails />}
          />
          {/* Tourguide */}
          <Route exact path="/tourguide" element={<TourGuideCalendar />} />
          <Route exact path="/tourguideInfo" element={<TourGuideInfo />} />
          <Route
            exact
            path="/tourguide/calendar"
            element={<TourGuideCalendar />}
          />
          {/* error404 */}
          <Route path="*" element={<NotFound />} />
          <Route path="/error404" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
