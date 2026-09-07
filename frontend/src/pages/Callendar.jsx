import { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/classic";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import clsx from "clsx";
import { orderApi } from "../api/order";
import Modal from "../components/Modal";
import generateTimeSlots from "../utils/generateTimeSlots";
// import adaptivePlugin from "@fullcalendar/react-scheduler/adaptive";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import "../fc.css";

function Calendar() {
  const slots = generateTimeSlots(7, 18, 30);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    title: "",
    order_date: "",
    start_at: slots[0],
    end_at: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDateSelect = (selectInfo) => {
    if (selectInfo.view.type === "dayGridMonth") {
      setIsModalOpen(true);
      setForm((prev) => ({
        ...prev,
        order_date: selectInfo.startStr.slice(0, 10),
      }));
    } else {
      return true;
    }
  };

  const fetchOrders = async () => {
    try {
      const orders = await orderApi.getAll();
      // console.log(orders);
      setOrders(orders);
    } catch (err) {
      console.log(err);
    }
  };

  const renderEventContent = (eventInfo) => {
    // console.log(eventInfo);
    return (
      <div className="flex flex-col gap-1 px-2 py-1 whitespace-normal break-words w-full">
        <p className="text-[16px] font-medium">
          {eventInfo.timeText} - {eventInfo.event.title}
        </p>
        {eventInfo.view.type === "timeGridDay" && (
          <p className="truncate">
            Other description Other description Other description
          </p>
        )}
      </div>
    );
  };

  const updateEvent = (info) => {
    console.log(
      info.event.title + " was dropped on " + info.event.start.toISOString(),
    );
    // console.log(eventInfo.date);
  };

  const addOrder = async (e) => {
    e.preventDefault();
    try {
      const order = {
        ...form,
        start_at: form.order_date + " " + form.start_at,
        end_at: form.order_date + " " + form.end_at,
      };

      const newOrder = await orderApi.create(order);
      // console.log(newOrder);
      setOrders((prev) => [...prev, ...newOrder]);
      setForm({
        title: "",
        order_date: "",
        start_at: slots[0],
        end_at: "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-[16px] h-full overflow-hidden">
      {/* <button onClick={() => setIsModalOpen(true)}>Open modal</button> */}
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          themePlugin,
          interactionPlugin,
        ]}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false, // Force 24-hour format so 10 PM becomes 22:00
        }}
        hiddenDays={[0]}
        // expandRows={false}
        // dayMaxEvents={true}
        // eventMaxStack={1}
        editable={false}
        selectable={true}
        selectMirror={false}
        select={handleDateSelect}
        slotMinHeight={60} // Time slots height
        initialView="dayGridMonth" //dayGridMonth,timeGridWeek
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="100%"
        eventDisplay="block"
        eventContent={renderEventContent}
        eventDrop={updateEvent}
        // rowEventClass="bg-red-100 border rounded-lg"
        // rowEventTitleClass="text-[16px] text-red-500 bg-red-100 flex-1 px-[4px]"
        views={{
          dayGrid: {
            eventClass: (data) => clsx("p-[4px] pl-[8px] items-center"),
          },
          timeGrid: {
            rowEventClass: "bg-gray-500",
          },
        }}
        // dayCellClass={(data) => clsx(`${data.isToday && "my-cell-today"}`)}
        // eventClass={(data) => clsx(data.isStart && "my-event-start")}
        // eventInnerClass="bg-gray-500"
        // columnEventClass="bg-red-500"
        // columnEventInnerClass="bg-red-500 text-[18px] text-white"
        columnEventTimeClass="my-time-text text-white"
        columnEventTitleClass="my-time-text text-white"
        eventTitleClass="text-[18px] text-white"
        eventTimeClass="text-[18px] text-white"
        events={orders}
      />

      <Modal
        title="My modal"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={addOrder}>
          <div className="mb-2">
            <p className="text-lg">Date : {form.order_date}</p>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="title">Title</label>
            <input
              className="border border-gray-300 flex-1 rounded-sm px-[8px] py-[4px]"
              type="text"
              placeholder="title"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="start">Start At</label>
            <select
              className="border border-gray-300 flex-1 rounded-sm px-[8px] py-[4px]"
              name="start"
              id="start"
              value={form.start_at}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  start_at: e.target.value,
                }))
              }
            >
              {slots.map((slot) => {
                return (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="end">End At</label>
            <select
              className="border border-gray-300 flex-1 rounded-sm px-[8px] py-[4px]"
              name="end"
              id="end"
              value={form.end_at}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  end_at: e.target.value,
                }))
              }
            >
              {slots
                .filter((slot) => slot > form.start_at)
                .map((slot) => {
                  return (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 px-[16px] py-[8px] text-white rounded-sm w-full"
            >
              Add New Order
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Calendar;
