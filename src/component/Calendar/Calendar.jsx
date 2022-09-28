import React, { useState } from "react";
import "./Calendar.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DATE from "../../date.json";
import { data } from "../../newData";
import moment from "moment/moment";
import {
  Button,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

///////////////////////////////////////////////////
const Calendar = () => {
  const [event, setEvent] = useState();
  const [calenderApi, setCalenderApi] = useState();
  const [remove, setRemove] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [param, setParams] = useState();
  const [type, setType] = useState();
  const handleClick = () => {
    calenderApi.addEvent({
      title: event,
      start: param.startStr,
      end: param.endStr,
      color: "#D2001A",
      textColor: "white",
      borderColor: "gray",
    });

    // Add To database
    console.log(param.startStr);
    const date = new Date(param.endStr);
    let newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );
    const end = moment(newDate).format("YYYY-MM-DD");
    console.log(end); // format will send to the database
    onClose();
    setEvent();
  };
  const handleDateSelect = (selectInfo) => {
    onOpen();
    setType(true);
    setParams(selectInfo);
    setCalenderApi(selectInfo.view.calendar);
  };

  const handleEventClick = (clickInfo) => {
    setType(false);
    onOpen();
    setRemove(clickInfo);
  };
  const handleClose = () => {
    if (type === false) {
      console.log(remove.event.remove());
      //remove to database event
    }
    onClose();
  };

  return (
    <>
      <div className="fullCalendar">
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
          height={700}
          editable={false}
          select={handleDateSelect}
          selectable={true}
          eventClick={handleEventClick}
          aspectRatio={3}
          selectMirror={true}
          dayMaxEvents={true}
          displayEventTime={false}
          events={DATE}
        />
      </div>
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {type ? "Please Enter Your Event" : "Are you Sure To delete?"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {type && (
                <InputGroup>
                  <Input
                    placeholder="Enter Your Event"
                    onChange={(e) => setEvent(e.target.value)}
                    size="md"
                  />
                </InputGroup>
              )}
            </ModalBody>

            <ModalFooter>
              {type ? (
                <>
                  <Button colorScheme="blue" mr={3} onClick={handleClick}>
                    OKE
                  </Button>
                </>
              ) : (
                <Button colorScheme="red" mr={3} onClick={handleClose}>
                  DELETE
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Calendar;
