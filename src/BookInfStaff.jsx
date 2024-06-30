import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookInStaff = () => {
  const [bookingDetailId, setBookingDetailId] = useState("");
  const [subCourtId, setSubCourtId] = useState("");

  const handleSave = () => {
    const url = "https://localhost:7088/api/Bookings/CheckIn";
    const data = {
      bookingDetailId: bookingDetailId,
      subCourtId: subCourtId,
    };

    axios
      .post(url, data)
      .then((result) => {
        clear();
        toast.success("Check in successfully");
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  const clear = () => {
    setBookingDetailId("");
    setSubCourtId("");
  };

  return (
    <div className="body-staff">
      <ToastContainer />
      <div className="check-in">THÔNG TIN KHÁCH HÀNG</div>
      <form className="check-input" onSubmit={handleSave}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="outputCourtid"
            placeholder="Court id"
            value={bookingDetailId}
            onChange={(e) => setBookingDetailId(e.target.value)}
          ></input>
          <label htmlFor="outputCourtid" className="form-label">
            Booking id
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="outputBookingid"
            placeholder="Booking id"
            value={subCourtId}
            onChange={(e) => setSubCourtId(e.target.value)}
          ></input>
          <label htmlFor="outputBookingid" className="form-label">
            Subcourt id
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Tiếp tục
        </button>
      </form>
    </div>
  );
};

export default BookInStaff;
