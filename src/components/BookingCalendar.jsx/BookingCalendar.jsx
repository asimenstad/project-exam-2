import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { addDays, subDays } from "date-fns";

function BookingCalendar({ onChange, bookings }) {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 0),
      endDate: addDays(new Date(), 0),
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

  return (
    <DateRange onChange={handleChange} moveRangeOnFirstSelection={false} ranges={state} disabledDates={disabledDates} />
  );
}
export default BookingCalendar;