import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const UserBooking = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { courtId, accountId } = location.state || {};
  const [bookingTypeId, setBookingTypeId] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get("https://localhost:7088/api/BookingTypes");
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleContinue = () => {
    if (bookingTypeId === "1") {
      navigate("/FixedSchedule");
    } else if (bookingTypeId === "2") {
      navigate("/OneTimeSchedule");
    } else {
      navigate("/FlexibleSchedule");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="body-staff">
      <div className="check-in">VUI LÒNG NHẬP THÔNG TIN</div>
      <form className="check-input">
        <div className="form-floating mb-3">
          <select
            className="form-control mb-3"
            value={bookingTypeId}
            onChange={(e) => setBookingTypeId(e.target.value)}
          >
            <option value="">Select bookingType</option>
            {data.map((bookingType) => (
              <option
                key={bookingType.bookingTypeId}
                value={bookingType.bookingTypeId.toString()}
              >
                {bookingType.description}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleGoBack}
        >
          Quay lại
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleContinue}
          style={{ float: "right" }}
        >
          Tiếp tục
        </button>
      </form>
    </div>
  );
};

export default UserBooking;
