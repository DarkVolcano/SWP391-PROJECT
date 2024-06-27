// import { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Calendar } from "@progress/kendo-react-dateinputs";

// const times = [
//   "08:00 - 10:00",
//   "10:00 - 12:00",
//   "12:00 - 14:00",
//   "14:00 - 16:00",
//   "16:00 - 18:00",
//   "18:00 - 20:00",
// ];

// const getRandomNumInRange = (min, max) => {
//   return Math.floor(Math.random() * (max - min) + min);
// };

// const pickSlotTimes = (times) => {
//   // Get a random number that will indicate how many time slots we pick
//   const timesToPick = getRandomNumInRange(0, times.length);

//   // If the random picked is the maximum possible then return all times
//   if (timesToPick === times.length - 1) {
//     return times;
//   }

//   let timesPicked = [];

//   // Loop until we have picked specified number of times
//   while (timesToPick !== timesPicked.length - 1) {
//     // Get a new index and time
//     const index = getRandomNumInRange(0, times.length);
//     const selectedTime = times[index];
//     // If we already picked that time we continue
//     // as we don't want duplicated
//     if (timesPicked.includes(selectedTime)) continue;
//     // Keep the time
//     timesPicked.push(selectedTime);
//   }

//   // We need to sort the times, as they may not be in a correct order
//   return timesPicked.sort();
// };

// const BookInfor = (props) => {
//   const [bookingDate, setBookingDate] = useState(null);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [bookingTimes, setBookingTimes] = useState([]);
//   const timeSlotCacheRef = useRef(new Map());

//   useEffect(() => {
//     // Bail out if there is no date selected
//     if (!bookingDate) return;

//     // Get time slots from cache
//     let newBookingTimes = timeSlotCacheRef.current.get(
//       bookingDate.toDateString()
//     );

//     // If we have no cached time slots then pick new ones
//     if (!newBookingTimes) {
//       newBookingTimes = pickSlotTimes(times);
//       // Update cache with new time slots for the selected date
//       timeSlotCacheRef.current.set(bookingDate.toDateString(), newBookingTimes);
//     }

//     setBookingTimes(newBookingTimes);
//   }, [bookingDate]);

//   const onDateChange = (e) => {
//     setSelectedTimeSlot(null);
//     setBookingDate(e.value);
//   };

//   const { courtId } = useParams();

//   const [court, setCourt] = useState({
//     courtName: "",
//     openTime: "",
//     closeTime: "",
//     rules: "",
//     image: "",
//     title: "",
//     priceAvr: "",
//     number: "",
//     startTime: "",
//     endTime: "",
//     amenityId: "",
//   });

//   useEffect(() => {
//     axios
//       .get(`https://localhost:7088/api/Courts/${courtId}`)
//       .then((response) => {
//         const data = response.data;
//         setCourt({
//           courtName: data.courtName,
//           openTime: data.openTime,
//           closeTime: data.closeTime,
//           rules: data.rules,
//           image: data.image,
//           title: data.title,
//           priceAvr: data.priceAvr,
//           number: data.number,
//           startTime: data.startTime,
//           endTime: data.endTime,
//           amenityId: data.amenityId,
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [courtId]);

//   return (
//     <>
//       <div className="court-name">{court.courtName}</div>
//       <div
//         style={{
//           display: "grid",
//           justifyContent: "center",
//           gridTemplateColumns: "50% 50%",
//           margin: "0 112px",
//         }}
//       >
//         <div className="book-image">
//           <img src={court.image} alt="court" />
//         </div>
//         <div className="full-infor">
//           <div className="court-con">THÔNG TIN SÂN</div>
//           <div className="time">
//             Thời gian: {court.openTime + " - " + court.closeTime}
//           </div>
//           <div className="priceavr">Giá: {court.priceAvr}VND</div>
//         </div>
//         <div className="choose-slot"></div>
//         <div className="amenity"></div>
//       </div>
//       <div>
//         <div className="k-my-8">
//           <div className="k-mb-4 k-font-weight-bold">Choose slot</div>

//           <div className="k-flex k-display-flex k-mb-4">
//             <Calendar value={bookingDate} onChange={onDateChange} />
//             <div
//               className="k-ml-4 k-display-flex k-flex-col"
//               style={{ display: "block" }}
//             >
//               {bookingTimes.map((time) => {
//                 return (
//                   <button
//                     key={time}
//                     className="k-button k-mb-4"
//                     onClick={(e) => setSelectedTimeSlot(time)}
//                   >
//                     {time}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {bookingDate && selectedTimeSlot ? (
//             <div>
//               Selected slot: {bookingDate.toDateString()} at {selectedTimeSlot}
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookInfor;
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Calendar } from "@progress/kendo-react-dateinputs";

const getRandomNumInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const pickSlotTimes = (times) => {
  // Get a random number that will indicate how many time slots we pick
  const timesToPick = getRandomNumInRange(0, times.length);

  // If the random picked is the maximum possible then return all times
  if (timesToPick === times.length - 1) {
    return times;
  }

  let timesPicked = [];

  // Loop until we have picked specified number of times
  while (timesToPick !== timesPicked.length - 1) {
    // Get a new index and time
    const index = getRandomNumInRange(0, times.length);
    const selectedTime = times[index];
    // If we already picked that time we continue
    // as we don't want duplicated
    if (timesPicked.includes(selectedTime)) continue;
    // Keep the time
    timesPicked.push(selectedTime);
  }

  // We need to sort the times, as they may not be in a correct order
  return timesPicked.sort();
};

const BookInfor = (props) => {
  const [bookingDate, setBookingDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingTimes, setBookingTimes] = useState([]);
  const timeSlotCacheRef = useRef(new Map());
  const [slotTimes, setSlotTimes] = useState([]);
  const { courtId } = useParams();

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
      newBookingTimes = slotTimes.map(
        (slot) => `${slot.startTime} - ${slot.endTime}`
      );
      // Update cache with new time slots for the selected date
      timeSlotCacheRef.current.set(bookingDate.toDateString(), newBookingTimes);
    }

    setBookingTimes(newBookingTimes);
  }, [bookingDate, slotTimes]);

  const onDateChange = (e) => {
    setSelectedTimeSlot(null);
    setBookingDate(e.value);
  };

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
      <div>
        <div className="k-my-8">
          <div className="k-mb-4 k-font-weight-bold">Choose slot</div>

          <div className="k-flex k-display-flex k-mb-4">
            <Calendar value={bookingDate} onChange={onDateChange} />
            <div
              className="k-ml-4 k-display-flex k-flex-col"
              style={{ display: "block", width: "475px" }}
            >
              {bookingTimes.map((time) => {
                return (
                  <button
                    key={time}
                    className="k-button k-mb-4"
                    onClick={(e) => setSelectedTimeSlot(time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {bookingDate && selectedTimeSlot ? (
            <div>
              Selected slot: {bookingDate.toDateString()} at {selectedTimeSlot}
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
