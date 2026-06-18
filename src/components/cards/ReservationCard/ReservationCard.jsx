import { Badge, Button } from "../../common";
import "./ReservationCard.scss";

export default function ReservationCard({
  status,
  badgeVariant,
  title,
  schedule,
  reserverInfo,
  price,
  location,
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
        <div className="reservation-card__info">
          <p className="reservation-card__info-item ft-16r">
            <i className="fa-regular fa-calendar" aria-hidden="true" />
            <span>{schedule}</span>
          </p>
          <p className="reservation-card__info-item ft-16r">
            <i className="fa-light fa-user" aria-hidden="true" />
            <span>{reserverInfo}</span>
          </p>
          <p className="reservation-card__info-item ft-16r">
            <span className="reservation-card__won-icon" aria-hidden="true" />
            <span>{price}</span>
          </p>
          <p className="reservation-card__info-item ft-16r">
            <i className="fa-regular fa-location-dot" aria-hidden="true" />
            <span>{location}</span>
          </p>
        </div>
        <Button variant="reservationEdit">{buttonLabel}</Button>
      </div>
    </article>
  );
}
