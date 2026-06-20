import { Badge, Button, Icon } from "../../common";
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
            <Icon name="calendar" />
            <span>{schedule}</span>
          </p>
          <p className="reservation-card__info-item ft-16r">
            <Icon name="user" />
            <span>{reserverInfo}</span>
          </p>
          <p className="reservation-card__info-item ft-16r">
            <Icon name="won-circle" />
            <span>{price}</span>
          </p>
          <p className="reservation-card__info-item ft-16r">
            <Icon name="location-dot" />
            <span>{location}</span>
          </p>
        </div>
        <Button variant="reservationEdit">{buttonLabel}</Button>
      </div>
    </article>
  );
}
