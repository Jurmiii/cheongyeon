import { useMemo, useState } from "react";
import Icon from "../Icon";
import "./Calendar.scss";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

function getCalendarDates(year: number, month: number) {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  const dates: Array<Date | null> = [];

  for (let index = 0; index < firstDate.getDay(); index += 1) {
    dates.push(null);
  }

  for (let date = 1; date <= lastDate.getDate(); date += 1) {
    dates.push(new Date(year, month, date));
  }

  while (dates.length < 42) {
    dates.push(null);
  }

  return dates;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 5, 1));
  const [selectedDate, setSelectedDate] = useState(() => new Date(2026, 5, 15));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const dates = useMemo(() => getCalendarDates(year, month), [year, month]);

  const moveMonth = (offset: number) => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1));
  };

  return (
    <section className="calendar" aria-label="예약 날짜 선택">
      <header className="calendar__header">
        <button className="calendar__nav" type="button" aria-label="이전 달" onClick={() => moveMonth(-1)}>
          <Icon name="chevron-left" />
        </button>
        <h3 className="calendar__title ft-22b">
          {year}.{String(month + 1).padStart(2, "0")}
        </h3>
        <button className="calendar__nav" type="button" aria-label="다음 달" onClick={() => moveMonth(1)}>
          <Icon name="chevron-right" />
        </button>
      </header>
      <div className="calendar__weekdays">
        {weekdays.map((weekday) => (
          <span className="calendar__weekday ft-14b" key={weekday}>
            {weekday}
          </span>
        ))}
      </div>
      <div className="calendar__grid">
        {dates.map((date, index) => {
          const isSelected =
            date?.getFullYear() === selectedDate.getFullYear() &&
            date?.getMonth() === selectedDate.getMonth() &&
            date?.getDate() === selectedDate.getDate();

          return (
            <button
              className={["calendar__day", isSelected && "calendar__day--selected"].filter(Boolean).join(" ")}
              type="button"
              disabled={!date}
              key={`${date?.toISOString() ?? "blank"}-${index}`}
              onClick={() => date && setSelectedDate(date)}
            >
              {date?.getDate()}
            </button>
          );
        })}
      </div>
    </section>
  );
}
