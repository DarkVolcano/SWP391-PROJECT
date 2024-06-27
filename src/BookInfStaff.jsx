import React from "react";

const BookInStaff = () => {
  return (
    <div className="body-staff">
      <div className="check-in">THÔNG TIN KHÁCH HÀNG</div>
      <form className="check-input">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="outputCourtid"
            placeholder="Court id"
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
          ></input>
          <label htmlFor="outputBookingid" className="form-label">
            Subcourt id
          </label>
        </div>
        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  );
};

export default BookInStaff;
