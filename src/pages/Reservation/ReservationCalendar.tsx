import { useMemo, useState } from "react";

import { Icon } from "../../components/common";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

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

function isSameMonth(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}

function isPastDate(date: Date, today: Date) {
  return startOfDay(date).getTime() < startOfDay(today).getTime();
}

interface ReservationCalendarProps {
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
}

export default function ReservationCalendar({ selectedDate, onSelectedDateChange }: ReservationCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [currentDate, setCurrentDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const dates = useMemo(() => getCalendarDates(year, month), [year, month]);
  const isCurrentMonth = isSameMonth(currentDate, today);
  const canGoPrevMonth = !isCurrentMonth;

  const moveMonth = (offset: number) => {
    if (offset < 0 && !canGoPrevMonth) {
      return;
    }

    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1));
  };

  const handleDateSelect = (date: Date) => {
    if (isPastDate(date, today)) {
      return;
    }

    onSelectedDateChange(startOfDay(date));
  };

  return (
    <section className="calendar reservation-calendar" aria-label="예약 날짜 선택">
      <header className="calendar__header">
        <button
          className="calendar__nav"
          type="button"
          aria-label="이전 달"
          disabled={!canGoPrevMonth}
          onClick={() => moveMonth(-1)}
        >
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
            date !== null &&
            date.getFullYear() === selectedDate.getFullYear() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getDate() === selectedDate.getDate();
          const isDisabled = date === null || isPastDate(date, today);

          return (
            <button
              className={[
                "calendar__day",
                isSelected && "calendar__day--selected",
                date !== null && isPastDate(date, today) && "calendar__day--past",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              disabled={isDisabled}
              key={`${date?.toISOString() ?? "blank"}-${index}`}
              onClick={() => date && handleDateSelect(date)}
            >
              {date?.getDate()}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export { startOfDay };
