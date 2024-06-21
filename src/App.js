import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Register";
import Profile from "./Profile";
import Sidebar from "./SideBar";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import HomeStaff from "./HomeStaff";
import BookInStaff from "./BookInfStaff";
import { USERS } from "./data";
import Users from "./User";
import Court from "./Court";
import Area from "./Area";
import About from "./AboutUS";
import Payment from "./Payment";
import "./App.css";
import Role from "./Role";
import "./StyleHome.css";
import HomeManager from "./HomeManager";
import { UserProvider } from "./UserContext";
import ComPay from "./ComPay";
import Verify from "./EmailVerify";
import OtpInputWithValidation from "./OTPVerify";
import NewPass from "./NewPassword";
import Book from "./BookPlay";
import BookInfor from "./BookInfor";

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
          <Route path="Login" element={<Login users={USERS} />}></Route>
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
            path="BookInfor"
            element={
              <>
                <Header />
                <BookInfor />
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
            path="HomeManager"
            element={
              <>
                <Header />
                <HomeManager />
                <Footer />
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
