import { Badge, Icon } from "../../common";
import "./ContentCard.scss";

export default function ContentCard({
  category,
  title,
  description,
  date,
  viewCount,
  badge,
  badgeVariant,
  image,
}) {
  return (
    <article className="content-card">
      <div className="content-card__image-wrap">
        <img className="content-card__image" src={image} alt={title} />
      </div>
      <div className="content-card__body">
        <Badge variant={badgeVariant}>{badge}</Badge>
        <p className="content-card__category ft-16r">{category}</p>
        <h3 className="content-card__title ft-22b">{title}</h3>
        <p className="content-card__description ft-16r">{description}</p>
        <div className="content-card__footer ft-14r">
          <span>{date}</span>
          <span>{viewCount}</span>
          <Icon name="chevron-right" />
        </div>
      </div>
    </article>
  );
}
