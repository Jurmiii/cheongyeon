import { Badge, Button } from "../../common";
import "./ReservationCard.scss";

function DetailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4l3 2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export default function ReservationCard({
  status,
  badgeVariant,
  title,
  details,
  buttonLabel,
  image,
}) {
  return (
    <article className="reservation-card">
      <div className="reservation-card__image-wrap">
        <img className="reservation-card__image" src={image} alt={title} />
      </div>
      <div className="reservation-card__body">
        <div className="reservation-card__heading">
          <Badge variant={badgeVariant}>{status}</Badge>
          <h3 className="reservation-card__title ft-22b">{title}</h3>
        </div>
        <dl className="reservation-card__details">
          {details.map((item) => (
            <div className="reservation-card__detail ft-16r" key={item.id}>
              <DetailIcon />
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <Button variant="secondary-deep">{buttonLabel}</Button>
      </div>
    </article>
  );
}
