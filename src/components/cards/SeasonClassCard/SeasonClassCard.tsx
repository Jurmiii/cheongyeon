import { Button, Icon } from "../../common";
import "./SeasonClassCard.scss";

export default function SeasonClassCard() {
  return (
    <article className="season-class-card">
      <div className="season-class-card__image-wrap">
        <div className="season-class-card__image" aria-hidden="true" />
        <span className="season-class-card__badge ft-14b han200">시즌한정</span>
      </div>
      <div className="season-class-card__body">
        <h3 className="season-class-card__title ft-22b ink500">여름 다도클래스</h3>
        <p className="season-class-card__description ft-18r ink400">
          푸른 잎이 짙어지는 계절,
          <br />
          시원한 냉녹차로 만나는 여름
        </p>
        <ul className="season-class-card__meta ft-14r">
          <li className="season-class-card__meta-item">
            <Icon name="clock" />
            <span>90분</span>
          </li>
          <li className="season-class-card__meta-item">
            <Icon name="user" />
            <span>최대 6명</span>
          </li>
          <li className="season-class-card__meta-item">
            <Icon name="won-circle" />
            <span>70,000</span>
          </li>
        </ul>
        <Button className="season-class-card__button" variant="classMore">
          선택하기
        </Button>
      </div>
    </article>
  );
}
