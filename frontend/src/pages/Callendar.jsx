// Full Calendar
import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/classic";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import clsx from "clsx";
// React
import { useState } from "react";
import Modal from "../components/Modal";
import { useOrder } from "../hooks/useOrder";
import Trash from "../assets/trash.svg";
// utils
import generateTimeSlots from "../utils/generateTimeSlots";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import "../fc.css";

function Calendar() {
  const { orders, addOrder, updateOrder, deleteOrder, error } = useOrder();
  const slots = generateTimeSlots(7, 18, 30);
  const [form, setForm] = useState({
    title: "",
    order_date: "",
    start_at: slots[0],
    end_at: slots[1],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const dayEvents = selectedDate
    ? orders
        .filter((order) => order.date === selectedDate)
        .sort((a, b) => new Date(a.start) - new Date(b.start))
    : [];
  const handleDateSelect = (selectInfo) => {
    if (selectInfo.view.type === "dayGridMonth") {
      setIsModalOpen(true);
      setForm((prev) => ({
        ...prev,
        order_date: selectInfo.startStr.slice(0, 10),
      }));
    } else {
      return false;
    }
  };

  const renderEventContent = (eventInfo) => {
    // console.log(eventInfo.event.extendedProps);
    return (
      <div className="flex items-center justify-between px-2 py-1 whitespace-normal break-words w-full">
        <div>
          <p className="text-[16px] font-medium">
            {eventInfo.timeText} - {eventInfo.event.title}
          </p>
          {eventInfo.view.type === "timeGridDay" && (
            <p className="truncate">
              {eventInfo.event.extendedProps.description}
            </p>
          )}
        </div>
        <button
          className="delete-event text-white  rounded-full grid place-content-center"
          onClick={() => onOrderDelete(eventInfo.event.id)}
        >
          <img src={Trash} />
        </button>
      </div>
    );
  };

  const updateEvent = (info) => {
    console.log(
      info.event.title + " was dropped on " + info.event.start.toISOString(),
    );
    // console.log(eventInfo.date);
  };

  const resetForm = () => {
    setForm({
      title: "",
      order_date: "",
      start_at: slots[0],
      end_at: slots[1],
    });
  };

  const updatingOrder = ({ id, title, date, startTime, endTime }) => {
    // console.log(`${startDate} ${startTime} - ${endTime}`);
    setForm({
      title: title,
      order_date: date,
      start_at: startTime,
      end_at: endTime,
    });
    setOrderId(id);
    setIsModalOpen(true);
    setIsUpdating(true);
  };

  const onOrderCreate = async (e) => {
    e.preventDefault();
    const order = {
      ...form,
      start_at: form.order_date + " " + form.start_at,
      end_at: form.order_date + " " + form.end_at,
    };
    await addOrder(order);
    resetForm();
    setIsModalOpen(false);
  };

  const onOrderUpdate = async (e, orderId) => {
    e.preventDefault();
    const payload = {
      ...form,
      start_at: form.order_date + " " + form.start_at,
      end_at: form.order_date + " " + form.end_at,
    };
    await updateOrder(orderId, payload);
    setIsModalOpen(false);
  };

  const onOrderDelete = async (orderId) => {
    const confirm = window.confirm("Are you sure to delete this order?");
    if (confirm) {
      await deleteOrder(orderId);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex h-full">
      {error && <p>{error}</p>}
      <div className="flex-1 p-[16px] overflow-auto">
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
          // eventColor="red"
          hiddenDays={[0]} // 0 -> Sunday
          eventClick={(info) => {
            if (info.jsEvent.target.closest(".delete-event")) {
              return;
            }
            const { id, title, startStr, endStr } = info.event;
            const date = startStr.slice(0, 10); // "2026-09-08"
            const startTime = startStr.slice(11, 16); // "10:00"
            const endTime = endStr.slice(11, 16); // "13:00"
            updatingOrder({ id, title, date, startTime, endTime });
          }}
          moreLinkClick={(info) => {
            setSelectedDate(formatDate(info.date));
            setIsSidebarOpen(true);
            return "dayGridMonth";
          }}
          datesSet={(info) => {
            console.log(info.view.type);
          }}
          // expandRows={false}
          dayMaxEvents={true}
          eventMaxStack={2}
          editable={false}
          selectable={true}
          selectMirror={false}
          select={handleDateSelect}
          slotMinHeight={60} // Time slots height
          slotEventOverlap={false}
          initialView="dayGridMonth" //dayGridMonth,timeGridWeek
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="100%"
          eventDisplay="block"
          eventContent={renderEventContent}
          moreLinkClass="text-[16px] w-full p-[8px]"
          // eventDrop={updateEvent}
          // rowEventClass="bg-red-100 border rounded-lg"
          // rowEventTitleClass="text-[16px] text-red-500 bg-red-100 flex-1 px-[4px]"
          views={{
            dayGrid: {
              eventClass: (data) => clsx("items-center"),
            },
            timeGrid: {
              rowEventClass: "bg-gray-500",
            },
          }}
          // dayCellClass={(data) => clsx(`${data.isToday && "my-cell-today"}`)}
          // eventClass={(data) => clsx(data.isStart && "my-event-start")}
          // eventClass="my-event-bg"
          // columnEventClass="bg-red-500"
          // columnEventInnerClass="bg-red-500 text-[18px] text-white"
          columnEventTimeClass="my-time-text text-white"
          columnEventTitleClass="my-time-text text-white"
          eventTitleClass="text-[18px] text-white"
          eventTimeClass="text-[18px] text-white"
          events={orders}
        />
      </div>
      {isSidebarOpen && (
        <div className="w-[250px] border border-gray-200 max-h-screen flex flex-col">
          <div className="bg-blue-100 p-[8px]">
            <button onClick={() => setIsSidebarOpen(false)}>Close</button>
          </div>
          <div className="overflow-y-auto">
            <ul className="">
              {dayEvents &&
                dayEvents.map((event) => (
                  <li key={event.id} className="border-b border-gray-200">
                    <div className="p-[8px] mb-[8px]">
                      <div className="flex justify-between">
                        <div>{event.date}</div>
                        <div>
                          {event.start.slice(11, 16)}-{event.end.slice(11, 16)}
                        </div>
                      </div>
                      <div className="my-[16px]">
                        <p>{event.title}</p>
                        <p> {event.description}</p>
                      </div>

                      <div className="text-right">
                        <button
                          className="bg-blue-500 text-white px-[16px] rounded mr-[8px]"
                          onClick={() => {
                            const { id, title, date, start, end } = event;

                            const startTime = start.slice(11, 16); // "10:00"
                            const endTime = end.slice(11, 16); // "13:00"
                            updatingOrder({
                              id,
                              title,
                              date,
                              startTime: startTime,
                              endTime: endTime,
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="border border-red-500 text-red-500 px-[8px] rounded"
                          onClick={() => onOrderDelete(parseInt(event.id))}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      <Modal
        title="Order"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
          setIsUpdating(false);
        }}
      >
        <form
          onSubmit={
            isUpdating ? (e) => onOrderUpdate(e, orderId) : onOrderCreate
          }
        >
          <div className="mb-2">
            <p className="text-lg">Date : {form.order_date}</p>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="title">Title</label>
            <input
              className="border border-gray-300 flex-1 rounded-sm px-[8px] py-[4px]"
              type="text"
              placeholder="title"
              required
              value={form.title}
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
              onChange={(e) => {
                const newStart = e.target.value;
                setForm((prev) => {
                  const validEndSlots = slots.filter((slot) => slot > newStart);
                  const needsNewEnd = prev.end_at <= newStart;
                  return {
                    ...prev,
                    start_at: newStart,
                    end_at: needsNewEnd ? validEndSlots[0] : prev.end_at,
                  };
                });
              }}
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
              {isUpdating ? "Update" : "Add new order"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Calendar;
