import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function Calendar(props) {
  const { bookedDates } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        disablePast
        shouldDisableDate={(day) => {
          if (bookedDates.length > 0) {
            return bookedDates.some((booking) => {
              return day >= new Date(booking.dateFrom) && day <= new Date(booking.dateTo);
            });
          } else {
            return false;
          }
        }}
        sx={{ margin: 0, backgroundColor: "#fff", padding: 2, width: "100%" }}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
