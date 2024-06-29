import React, { useState, useContext, Fragment, useEffect } from "react";
import "./StyleDashboardAdmin.css";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./UserContext";

const FixedSchedule = () => {
  const [userId, setUserId] = useState("");
  const [slotTimeId, setSlotTimeId] = useState("");
  const [months, setMonths] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { slotId } = location.state || {};

  useEffect(() => {
    if (slotId) {
      setSlotTimeId(slotId);
    }
  }, [slotId]);

  const handleSave = () => {
    const url = "https://localhost:7088/api/Bookings/Fixed";
    const data = {
      userId: user.accountId,
      slotId: slotTimeId,
      months: months,
      note: note,
      date: date,
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
    setSlotTimeId("");
    setMonths("");
    setNote("");
    setDate("");
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
              placeholder="Enter slottimeid"
              id="slotTimeId"
              value={slotTimeId}
              onChange={(e) => setSlotTimeId(e.target.value)}
            />
            <label htmlFor="slotTimeId" className="form-label">
              Nhập slottimeid
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter months"
              id="month"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
            <label htmlFor="month" className="form-label">
              Tháng
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter note"
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <label htmlFor="note" className="form-label">
              Ghi chú
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="date" className="form-label">
              Ngày chơi
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

export default FixedSchedule;
