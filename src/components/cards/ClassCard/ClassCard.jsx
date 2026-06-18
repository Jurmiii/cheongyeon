import { Badge, Button } from "../../common";
import "./ClassCard.scss";

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20c1.2-4 12.8-4 14 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function WonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 8l3 10 4-10 4 10 3-10" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M4 12h16M4 15h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

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
            <ClockIcon />
            <span className="class-card__meta-label">{duration}</span>
          </li>
          <li className="class-card__meta-item">
            <UserIcon />
            <span className="class-card__meta-label">{capacity}</span>
          </li>
          <li className="class-card__meta-item">
            <WonIcon />
            <span className="class-card__meta-label">{price}</span>
          </li>
        </ul>
        <Button variant="reservation">{buttonLabel}</Button>
      </div>
    </article>
  );
}
