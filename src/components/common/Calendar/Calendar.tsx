import { useCalendar, useSelection } from "@h6s/calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Calendar.scss";

const weekdayFormatter = new Intl.DateTimeFormat("ko-KR", { weekday: "short" });

function formatMonthTitle(year: number, month: number) {
  return `${year}.${String(month + 1).padStart(2, "0")}`;
}

export default function Calendar() {
  const { headers, body, navigation, year, month } = useCalendar({
    defaultDate: new Date(2026, 5, 1),
    defaultWeekStart: 0,
  });
  const selection = useSelection({ mode: "single", body });

  return (
    <section className="calendar" aria-label="calendar">
      <header className="calendar__header">
        <button className="calendar__nav" type="button" aria-label="previous month" onClick={navigation.toPrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2 className="calendar__title ft-22b color-ink500">{formatMonthTitle(year, month)}</h2>
        <button className="calendar__nav" type="button" aria-label="next month" onClick={navigation.toNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </header>

      <div className="calendar__weekdays" role="row">
        {headers.weekdays.map(({ key, value }) => (
          <span className="calendar__weekday ft-14b color-ink500" role="columnheader" key={key}>
            {weekdayFormatter.format(value)}
          </span>
        ))}
      </div>

      <div className="calendar__body">
        {selection.body.value.map((week) => (
          <div className="calendar__week" role="row" key={week.key}>
            {week.value.map((day) => {
              const dateToneClass = day.isCurrentMonth ? "color-ink500" : "color-ink200";
              const selectedClass = day.isSelected ? "calendar__date--selected" : "";

              return (
                <button
                  className={`calendar__date ft-16r ${dateToneClass} ${selectedClass}`}
                  type="button"
                  aria-pressed={day.isSelected}
                  aria-label={day.value.toLocaleDateString("ko-KR")}
                  disabled={day.isDisabled}
                  key={day.key}
                  onClick={() => selection.select(day.value)}
                >
                  {day.date}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
