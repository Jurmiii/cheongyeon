import { Badge, Button, Icon } from "../../common";
import "./ClassCard.scss";

export default function ClassCard({
  title,
  description,
  duration,
  capacity,
  price,
  badge,
  badgeVariant,
  buttonLabel,
  image,
}) {
  return (
    <article className="class-card">
      <div className="class-card__image-wrap">
        <img className="class-card__image" src={image} alt={title} />
      </div>
      <div className="class-card__body">
        <Badge variant={badgeVariant}>{badge}</Badge>
        <h3 className="class-card__title ft-22b">{title}</h3>
        <p className="class-card__description ft-16r">{description}</p>
        <ul className="class-card__meta ft-14r">
          <li className="class-card__meta-item">
            <Icon name="clock" />
            <span className="class-card__meta-label">{duration}</span>
          </li>
          <li className="class-card__meta-item">
            <Icon name="user" />
            <span className="class-card__meta-label">{capacity}</span>
          </li>
          <li className="class-card__meta-item">
            <Icon name="won-circle" />
            <span className="class-card__meta-label">{price}</span>
          </li>
        </ul>
        <Button variant="reservation">{buttonLabel}</Button>
      </div>
    </article>
  );
}
