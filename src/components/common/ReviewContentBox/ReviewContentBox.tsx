import dado1 from "../../../assets/images/01main/dado1.webp";
import "./ReviewContentBox.scss";

export default function ReviewContentBox() {
  return (
    <article className="review-content-box">
      <img className="review-content-box__image" src={dado1} alt="" aria-hidden="true" />
      <div className="review-content-box__overlay ft-18r white">
        <p>[숙성 차_클래스]</p>
        <div className="review-content-box__meta">
          <span>★★★★★</span>
          <span>노*지</span>
        </div>
        <p className="review-content-box__text">
          시간이 만든 풍미를 이해할 수 있었던
          <br />
          특별한 수업이었습니다.
          <br />
          데이트로 추천합니다~
        </p>
      </div>
    </article>
  );
}
