import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useParams } from "react-router-dom";
import "moment/locale/vi";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

const styles = `
  .start {
    background-color: rgb(86, 202, 112) !important;
    color: white;
  }
  .end {
    background-color: rgb(187, 0, 0) !important;
    color: white;
  }
  .start-time {
    display: inline-block;
    font-weight: bold;
  }
  .end-time {
    display: inline-block;
    font-weight: bold;
  }
  .rbc-event .rbc-event-label {
    display: none;
  }
  .rbc-event{
    background-color: rgb(0, 170, 187);
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const generateEvents = () => {
  const events = [];
  const startHour = 7; // start at 7:00 AM
  const endHour = 21; // end at 9:00 PM
  const interval = 2; // every 2 hours

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const dayStart = moment().startOf("week").add(dayOffset, "days"); // start from the beginning of the week
    for (let hour = startHour; hour < endHour; hour += interval) {
      const start = moment(dayStart).add(hour, "hours").toDate();
      const end = moment(start).add(1, "hour").toDate();

      events.push({
        id: dayOffset * 100 + hour,
        title: `Event ${hour}:00`,
        start,
        end,
      });
    }
  }

  return events;
};
const Event = ({ event }) => {
  const startTime = moment(event.start).format("HH:mm");
  const endTime = moment(event.end).format("HH:mm");
  return (
    <div>
      <div className="rbc-event-label-time">
        <div className="start-time" style={{ display: "none" }}>
          {startTime}
        </div>
        <div className="end-time" style={{ display: "none" }}>
          {endTime}
        </div>
      </div>
      <div className="rbc-event-content">{event.title}</div>
    </div>
  );
};

const BookInfor = () => {
  moment.locale("vi");
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState(generateEvents());

  const handleEventDrop = ({ event, start, end, allDay }) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setEvents(nextEvents);
  };

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
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [courtId]);

  const handleEventResize = ({ event, start, end, allDay }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
  };

  const eventPropGetter = (event, start, end, isSelected) => {
    const className = `${moment(start).hour() === 7 ? "start" : ""} ${
      moment(end).hour() === 20 ? "end" : ""
    }`.trim();
    return {
      className,
    };
  };

  return (
    <>
      <div className="court-name">{court.courtName}</div>
      <Calendar
        localizer={localizer}
        events={events}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        resizable
        selectable
        defaultView={Views.WEEK}
        views={[Views.WEEK]}
        style={{ height: "600px", width: "600px", margin: "110px" }}
        eventPropGetter={eventPropGetter}
        components={{
          event: Event,
        }}
      />
      <div className="book-image">
        <img src={court.image} alt="court" />
      </div>
      <div className="full-infor">
        <div className="time">{court.openTime + " - " + court.closeTime}</div>
        <div className="priceavr">{court.priceAvr}VND</div>
      </div>
      <div className="choose-slot"></div>
      <div className="amenity"></div>
    </>
  );
};

export default BookInfor;
