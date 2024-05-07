import { useState, useEffect, useRef } from "react";
import { format, addDays, subDays } from "date-fns";
import { DayModifiers, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./Date.scss";

const DateComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date() // Initialize with a default Date object
  );
  const [show, setShow] = useState<boolean>(false);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  type SelectSingleEventHandler = (
    day: Date,
    modifiers: DayModifiers,
    e: React.MouseEvent<HTMLDivElement>
  ) => void;
  const handleDateChange: SelectSingleEventHandler = (day) => {
    setSelectedDate(day);
    setShow(false);
  };

  const handlePrevDay = () => {
    setSelectedDate((prevDate) => subDays(prevDate, 1));
  };

  const handleNextDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 1));
  };

  return (
    <>
      <div className="date-picker" ref={dateRef}>
        <div className="tool-kit">
          <div className="date-btn-toolkit">
            <span className="arrow prev" onClick={handlePrevDay}>
              &lt;
            </span>
            <div className="selected-date" onClick={() => setShow(true)}>
              {selectedDate && format(selectedDate, "d MMM yyyy")}
            </div>
            <span className="arrow next" onClick={handleNextDay}>
              &gt;
            </span>
          </div>
          <div className="drop-btn-toolkit">
            <select className="drop-btn">
              <option value="general">General</option>
              <option value="dummy1">Dummy Value 1</option>
              <option value="dummy2">Dummy Value 2</option>
              <option value="dummy3">Dummy Value 3</option>
            </select>
          </div>
        </div>
        {show && (
          <div className="modal-day-picker">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              styles={{
                caption: { color: "pink" },
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DateComponent;
