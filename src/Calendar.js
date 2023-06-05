import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
function Calendar() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data);
  };
  const handleDateClick = async (arg) => {
    const title = prompt("Enter event title:");
    if (title) {
      const start = arg.date;
      const end = new Date(arg.date.getTime() + 60 * 60 * 1000);
      const event = { title, start, end };
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
      });
      const data = await response.json();
      setEvents([...events, data]);
    }
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
    />
  );
}
