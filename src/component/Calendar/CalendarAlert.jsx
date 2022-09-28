import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DATE from "../../date.json";
import { data } from "../../newData";
import moment from "moment/moment";
import Swal from "sweetalert2";
import BasicUsage from "../Modal/Modal";

/////////////////////////////////////////
const CalendarAlert = () => {
  const handleDateSelect = (selectInfo) => {
    Swal.fire({
      title: "Enter your Event",
      input: "text",
      inputLabel: "Your Event",
      width: 600,
      padding: "3em",
      color: "#075583",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    }).then((res) => {
      if (res.value) {
        calendarApi.addEvent({
          title: res.value,
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
        console.log(end); // format will send to the database
      }
    });
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  };

  const handleEventClick = (clickInfo) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        clickInfo.event.remove();
        //remove to database event
      }
    });
  };

  return (
    <>
      <div className="right"></div>
      <div style={{ padding: "50px 0 50px 50px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          timeZone={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
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
          events={DATE}
        />
      </div>
      <BasicUsage />
    </>
  );
};

export default CalendarAlert;
