import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Register";
import Profile from "./Profile";
import Sidebar from "./SideBar";
import SidebarM from "./SideBarM";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import HomeStaff from "./HomeStaff";
import BookInStaff from "./BookInfStaff";
import Users from "./User";
import Court from "./Court";
import Area from "./Area";
import About from "./AboutUS";
import Payment from "./Payment";
import "./App.css";
import Role from "./Role";
import "./StyleHome.css";
import { UserProvider } from "./UserContext";
import ComPay from "./ComPay";
import Verify from "./EmailVerify";
import OtpInputWithValidation from "./OTPVerify";
import NewPass from "./NewPassword";
import Book from "./BookPlay";
import BookInfor from "./BookInfor";
import BookingType from "./BookingType";
import DashboardManager from "./DashboardManager";
import Amenity from "./Amenity";
import AmenityCourt from "./AmenityCourt";
import UserBooking from "./UserBooking";
import "@progress/kendo-theme-default/dist/all.css";
import UserBooking from "./UserBooking";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route path="Login" element={<Login />}></Route>
          <Route
            path="Dashboard"
            element={
              <>
                <Sidebar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="User"
            element={
              <>
                <Sidebar />
                <Users />
              </>
            }
          />
          <Route
            path="Role"
            element={
              <>
                <Sidebar />
                <Role />
              </>
            }
          />
          <Route
            path="Court"
            element={
              <>
                <Sidebar />
                <Court />
              </>
            }
          />
          <Route
            path="Area"
            element={
              <>
                <Sidebar />
                <Area />
              </>
            }
          />
          <Route
            path="BookingType"
            element={
              <>
                <Sidebar />
                <BookingType />
              </>
            }
          />
          <Route
            path="Home"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="AboutUS"
            element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="Payment"
            element={
              <>
                <Header />
                <Payment />
                <Footer />
              </>
            }
          />
          <Route
            path="ComPay"
            element={
              <>
                <Header />
                <ComPay />
                <Footer />
              </>
            }
          />
          <Route
            path="BookPlay"
            element={
              <>
                <Header />
                <Book />
                <Footer />
              </>
            }
          />
          <Route
            path="BookInfor/:courtId"
            element={
              <>
                <Header />
                <BookInfor />
                <Footer />
              </>
            }
          />
          <Route
            path="UserBooking"
            element={
              <>
                <Header />
                <UserBooking />
                <Footer />
              </>
            }
          />
          <Route
            path="HomeStaff"
            element={
              <>
                <Header />
                <HomeStaff />
                <Footer />
              </>
            }
          />
          <Route
            path="BookInStaff"
            element={
              <>
                <Header />
                <BookInStaff />
                <Footer />
              </>
            }
          />
          <Route
            path="DashboardManager"
            element={
              <>
                <SidebarM />
                <DashboardManager />
              </>
            }
          />
          <Route
            path="Amenity"
            element={
              <>
                <SidebarM />
                <Amenity />
              </>
            }
          />
          <Route
            path="AmenityCourt"
            element={
              <>
                <SidebarM />
                <AmenityCourt />
              </>
            }
          />
          <Route path="EmailVerify" element={<Verify />} />
          <Route
            path="OTPVerify"
            element={<OtpInputWithValidation numberOfDigits={6} />}
          ></Route>
          <Route path="NewPassword" element={<NewPass />}></Route>
          <Route path="Profile/:accountId" element={<Profile />}></Route>
          <Route path="Register" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
