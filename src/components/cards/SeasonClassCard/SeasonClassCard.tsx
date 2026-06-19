import { useState } from "react";
import Button from "../../common/Button";
import "./SeasonClassCard.scss";

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

export default function SeasonClassCard() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

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
            <ClockIcon />
            <span>90분</span>
          </li>
          <li className="season-class-card__meta-item">
            <UserIcon />
            <span>8명</span>
          </li>
          <li className="season-class-card__meta-item">
            <WonIcon />
            <span>70,000원</span>
          </li>
        </ul>
        <Button
          className="season-class-card__button"
          variant="classMore"
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          {isButtonHovered ? "선택완료" : "선택하기"}
        </Button>
      </div>
    </article>
  );
}
