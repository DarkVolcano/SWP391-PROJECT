import React, { useState, useContext, Fragment } from "react";
import "./StyleDashboardAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./UserContext";

const FlexibleSchedule = () => {
  const [userId, setUserId] = useState("");
  const [courtId, setCourtId] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const { user, court } = useContext(UserContext);

  const handleSave = () => {
    const url = "https://localhost:7088/api/Bookings/Flexible";
    const data = {
      userId: userId,
      courtId: courtId,
      totalHours: totalHours,
    };

    axios
      .post(url, data)
      .then((result) => {
        clear();
        toast.success("Booking type successfully");
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  const clear = () => {
    setUserId("");
    setCourtId("");
    setTotalHours("");
  };

  return (
    <>
      <Fragment>
        <ToastContainer />
        <div className="check-in">VUI LÒNG NHẬP THÔNG TIN</div>
        <form className="check-input">
          <div className="form-floating mb-3" style={{ display: "none" }}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter userid"
              id="userid"
              value={user.accountId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <label htmlFor="userid" className="form-label">
              Nhập userId
            </label>
          </div>
          <div className="form-floating mb-3" style={{ display: "none" }}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter courtid"
              id="courtid"
              value={court.courtId}
              onChange={(e) => setCourtId(e.target.value)}
            />
            <label htmlFor="courtid" className="form-label">
              Nhập courtid
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter hours"
              id="hour"
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
            />
            <label htmlFor="hour" className="form-label">
              Tổng giờ chơi
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Tiếp tục
          </button>
        </form>
      </Fragment>
    </>
  );
};

export default FlexibleSchedule;
