import { Badge, Button } from "../../common";
import "./EventCard.scss";

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
      <p className="event-card__subtitle ft-16r">{subTitle}</p>
      <h3 className="event-card__title ft-22b">{title}</h3>
      <p className="event-card__description ft-16r">{description}</p>
      <p className="event-card__date ft-16r">{date}</p>
      <Button className="event-card__button ft-18r" variant="classMore">
        {buttonLabel}
      </Button>
    </article>
  );
}
