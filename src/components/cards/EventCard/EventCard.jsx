import { Badge, Button } from "../../common";
import "./EventCard.scss";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export default function EventCard({
  badge,
  badgeVariant,
  subTitle,
  title,
  description,
  date,
  buttonLabel,
}) {
  return (
    <article className="event-card">
      <Badge variant={badgeVariant}>{badge}</Badge>
      <p className="event-card__subtitle ft-16b">{subTitle}</p>
      <h3 className="event-card__title ft-22b">{title}</h3>
      <p className="event-card__description ft-16r">{description}</p>
      <p className="event-card__date ft-14r">{date}</p>
      <Button variant="more" icon={<ArrowIcon />}>
        {buttonLabel}
      </Button>
    </article>
  );
}
