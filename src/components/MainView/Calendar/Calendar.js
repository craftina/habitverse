import React, { useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="calendar-component d-flex flex-column align-items-center gap-3">
      <div className="calendar-name">
        <h1>Calendar</h1>
      </div>
      <div className="calendar-content w-100 d-flex px-3">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
          className="react-datepicker"
        />
      </div>
    </div>
  );
}

export default Calendar;
