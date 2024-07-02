import React, { useState, useContext, Fragment, useEffect } from "react";
import "./StyleDashboardAdmin.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./UserContext";
import { format } from "date-fns";

const FixedSchedule = () => {
  const [userId, setUserId] = useState("");
  const [slotTimeId, setSlotTimeId] = useState("");
  const [months, setMonths] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { slotId, bookingDate } = location.state || {};
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (slotId) {
      setSlotTimeId(slotId);
    }
    if (bookingDate) {
      setDate(bookingDate); // Set bookingDate to date state
    }
  }, [slotId, bookingDate]);

  const handleSave = () => {
    console.log("userId: ", user.accountId);
    console.log("slotTimeId: ", slotTimeId);
    console.log("months: ", months);
    console.log("note: ", note);
    console.log("date: ", date);

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
        // const bookingId = result.data.bookingId;
        // toast.success("Booking type successfully");
        // handlePayment(bookingId);
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

  useEffect(() => {
    document.title = "Fixed Schedule";
  }, []);

  // const handlePayment = (bookingId) => {

  //   const url = `https://localhost:7088/api/Payments/create-payment?bookingId=${bookingId}`;

  //   axios
  //     .post(url)
  //     .then((response) => {
  //       console.log("Payment result:", response.data.uri);
  //       toast.success("Search successfully");
  //       navigate(response.data.uri);
  //       window.open(response.data.uri, '_blank');
  //     })
  //     .catch((error) => {
  //       console.error("Error searching:", error);
  //       toast.error("Failed to search courts");
  //     });
  // };

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
              Số tháng chơi
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
              type="date"
              className="form-control mb-3"
              placeholder="dd/mm/yyyy"
              id="date"
              dateformat="dd/mm/yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="date" className="form-label">
              Ngày chơi
            </label>
          </div>
          <Button variant="primary" onClick={handleSave}>
            Tiếp tục
          </Button>
        </form>
      </Fragment>
      {url && <NavLink to={url.uri}></NavLink>}
    </>
  );
};

export default FixedSchedule;
