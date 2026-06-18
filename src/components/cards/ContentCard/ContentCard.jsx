import { Badge, Button } from "../../common";
import "./ContentCard.scss";

function DetailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export default function ContentCard({
  title,
  description,
  date,
  viewCount,
  badge,
  badgeVariant,
  detailLabel,
  image,
}) {
  return (
    <article className="content-card">
      <div className="content-card__image-wrap">
        <img className="content-card__image" src={image} alt={title} />
      </div>
      <div className="content-card__body">
        <Badge variant={badgeVariant}>{badge}</Badge>
        <h3 className="content-card__title ft-22b">{title}</h3>
        <p className="content-card__description ft-16r">{description}</p>
        <div className="content-card__footer ft-14r">
          <span>{date}</span>
          <span>{viewCount}</span>
          <Button
            className="content-card__detail"
            variant="text-plum"
            icon={<DetailIcon />}
            aria-label={detailLabel}
          >
            {null}
          </Button>
        </div>
      </div>
    </article>
  );
}
