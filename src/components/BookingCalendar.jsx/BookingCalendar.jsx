import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { addDays, subDays } from "date-fns";

function BookingCalendar({ onChange, bookings }) {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 0),
      endDate: addDays(new Date(), 1),
      key: "selection",
      color: "#000",
    },
  ]);

  const [disabledDates, setDisabledDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);

  const handleChange = (ranges) => {
    const { selection } = ranges;
    if (selection.startDate !== state[0].startDate) {
      selection.endDate = addDays(selection.startDate, 1);
    }
    if (selection.endDate <= state[0].startDate) {
      selection.endDate = addDays(selection.startDate, 1);
    }
    onChange(selection);
    setState([selection]);
  };

  const dates = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    const bookedDates = bookings.flatMap((booking) => dates(new Date(booking.dateFrom), new Date(booking.dateTo)));
    setDisabledDates(bookedDates);
  }, [bookings]);

  return <DateRange onChange={handleChange} ranges={state} disabledDates={disabledDates} minDate={new Date()} />;
}
export default BookingCalendar;
