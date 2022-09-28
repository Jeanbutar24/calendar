import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DATE from "../../date.json";
import { data } from "../../newData";
import moment from "moment/moment";
const Calendar = () => {
  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      });
      // add to data base
      console.log(selectInfo.startStr);
      const date = new Date(selectInfo.endStr);
      let newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1
      );
      const end = moment(newDate).format("YYYY-MM-DD");
      console.log(end); // format date will send to database
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
      //remove to database event
    }
  };

  return (
    <>
      <div className="right"></div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          timeZone={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={600}
          contentHeight={600}
          editable={true}
          select={handleDateSelect}
          selectable={true}
          eventClick={handleEventClick}
          selectMirror={true}
          dayMaxEvents={true}
          displayEventTime={false}
          events={data}
        />
      </div>
    </>
  );
};

export default Calendar;
