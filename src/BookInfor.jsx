import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar } from "@progress/kendo-react-dateinputs";
import { UserContext } from "./UserContext";
import { format } from "date-fns";

const BookInfor = (props) => {
  const [bookingDate, setBookingDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingTimes, setBookingTimes] = useState([]);
  const timeSlotCacheRef = useRef(new Map());
  const [slotTimes, setSlotTimes] = useState([]);
  const { courtId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [court, setCourt] = useState({
    courtName: "",
    openTime: "",
    closeTime: "",
    rules: "",
    image: "",
    title: "",
    priceAvr: "",
    number: "",
    startTime: "",
    endTime: "",
    amenityId: "",
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7088/api/Courts/${courtId}`)
      .then((response) => {
        const data = response.data;
        setCourt({
          courtName: data.courtName,
          openTime: data.openTime,
          closeTime: data.closeTime,
          rules: data.rules,
          image: data.image,
          title: data.title,
          priceAvr: data.priceAvr,
          number: data.number,
          startTime: data.startTime,
          endTime: data.endTime,
          amenityId: data.amenityId,
        });
        // Extract slot times for the sub courts
        const subCourtSlotTimes = data.subCourts.flatMap((subCourt) =>
          subCourt.slotTimes.map((slot) => ({
            slotId: slot.slotId,
            startTime: slot.startTime.trim(),
            endTime: slot.endTime.trim(),
          }))
        );
        setSlotTimes(subCourtSlotTimes);
      })
      .catch((error) => {
        console.error("Error fetching court data:", error);
      });
  }, [courtId]);

  useEffect(() => {
    // Bail out if there is no date selected
    if (!bookingDate) return;

    // Get time slots from cache
    let newBookingTimes = timeSlotCacheRef.current.get(
      bookingDate.toDateString()
    );

    // If we have no cached time slots then pick new ones
    if (!newBookingTimes) {
      newBookingTimes = slotTimes.map((slot) => ({
        slotId: slot.slotId,
        time: `${slot.startTime} - ${slot.endTime}`,
      }));
      // Update cache with new time slots for the selected date
      timeSlotCacheRef.current.set(bookingDate.toDateString(), newBookingTimes);
    }

    setBookingTimes(newBookingTimes);
  }, [bookingDate, slotTimes]);

  const onDateChange = (e) => {
    setSelectedTimeSlot(null);
    setBookingDate(e.value);
  };

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    handleUserBooking(timeSlot);
  };

  const handleUserBooking = (timeSlot) => {
    if (user && timeSlot) {
      console.log("courtId:", courtId);
      console.log("accountId:", user.accountId);
      console.log("selectedTimeSlot:", timeSlot.time);
      console.log("slotId:", timeSlot.slotId);
      console.log("bookingDate:", format(bookingDate, "dd/MM/yyyy"));

      navigate(`/UserBooking`, {
        state: {
          courtId,
          accountId: user.accountId,
          bookingDate: format(bookingDate, "dd/MM/yyyy"),
          selectedTimeSlot: timeSlot.time,
          priceAvr: court.priceAvr,
          slotId: timeSlot.slotId,
        },
      });
    }
  };

  useEffect(() => {
    document.title = "Thông tin sân chi tiết";
  }, []);

  const formattedBookingDate = bookingDate
    ? format(bookingDate, "dd/MM/yyyy")
    : "";

  return (
    <>
      <div className="court-name">{court.courtName}</div>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "50% 50%",
          margin: "0 112px",
        }}
      >
        <div className="book-image">
          <img src={court.image} alt="court" />
        </div>
        <div className="full-infor">
          <div className="court-con">THÔNG TIN SÂN</div>
          <div className="time">
            Thời gian: {court.openTime + " - " + court.closeTime}
          </div>
          <div className="priceavr">Giá: {court.priceAvr}VND</div>
        </div>
        <div className="choose-slot"></div>
        <div className="amenity"></div>
      </div>
      <div className="tooltip-container">
        <span className="tooltip">
          <span style={{ display: "flex", margin: "3px" }}>
            <strong className="available"></strong> : Available
            <strong className="unavailable"></strong> : Unavailable
          </span>
        </span>
        <span className="text">?</span>
      </div>
      <div>
        <div className="k-my-8">
          <div className="k-mb-4 k-font-weight-bold">Choose slot</div>

          <div className="k-flex k-display-flex k-mb-4">
            <Calendar value={bookingDate} onChange={onDateChange} />
            <div
              className="k-ml-4 k-display-flex k-flex-col"
              style={{ display: "block", width: "475px" }}
            >
              {bookingTimes.map((timeSlot) => (
                <button
                  key={timeSlot.slotId}
                  className="k-button k-mb-4 col-md-3"
                  onClick={() => handleTimeSlotClick(timeSlot)}
                >
                  {timeSlot.time}
                </button>
              ))}
            </div>
          </div>

          {bookingDate && selectedTimeSlot ? (
            <div>
              Selected slot: {formattedBookingDate} at {selectedTimeSlot.time}
            </div>
          ) : null}
        </div>
      </div>
      <div className="full-infor" style={{ margin: "63px 138px" }}>
        <div className="court-con">Quy định</div>
        <div className="rule" style={{ marginTop: "11px" }}>
          {court.rules}
        </div>
      </div>
    </>
  );
};

export default BookInfor;
