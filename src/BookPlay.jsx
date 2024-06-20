import React from "react";
import { NavLink } from "react-router-dom";

const Book = () => {
  return (
    <div className="body-book">
      <div className="book-fil">
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="chooseday"
            placeholder="Choose date"
          />
          <label htmlFor="chooseday" className="form-label">
            Choose day
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="chooseplace"
            placeholder="Choose place"
          />
          <label htmlFor="chooseplace" className="form-label">
            Choose place
          </label>
        </div>
      </div>
      <div className="tooltip-container">
        <span className="tooltip">
          <span className="reject">Reject; Not Check In/Out Yet</span>
          <span>Main Task :</span>
          <span>Extra Work/Change Location</span>
        </span>
        <span clasName="text">?</span>
      </div>
      <div className="book-box">
        <div className="book-infor">
          <div className="book-text">
            <div className="book-place">Sân cầu lông A</div>
            <div className="book-slot">18:00 - 20:00</div>
            <div className="book-price">Giá tham khảo:120K - 150K</div>
            <div className="book-con">Tiêu chuẩn sân: Tiêu chuẩn quốc tế</div>
          </div>
          <div className="book-image">
            <img src="https://klgccwebsecurestoreprd01.blob.core.windows.net/klgccweb-prod/node/club-facility/images/2021-08/Badminton%20Court.jpg" />
          </div>
        </div>
      </div>
      <NavLink to="/BookInfor">Go to calendar</NavLink>
    </div>
  );
};

export default Book;
