import React from "react";

const UserBooking = () => {
  return (
    <div className="body-staff">
      <div className="check-in">VUI LÒNG NHẬP THÔNG TIN</div>
      <form className="check-input">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="outputCourtid"
            placeholder="Court id"
          ></input>
          <label htmlFor="outputCourtid" className="form-label">
            Loại hình đặt lịch
          </label>
        </div>
        <button>Quay lại</button>
        <button>Tiếp tục</button>
      </form>
    </div>
  );
};

export default UserBooking;
