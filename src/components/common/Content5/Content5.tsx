import tea1 from "../../../assets/images/01main/tea1.webp";
import "./Content5.scss";

export default function Content5() {
  return (
    <article className="content5" aria-label="우전 상품 소개">
      <img className="content5__image" src={tea1} alt="우전" />
      <div className="content5__body">
        <h3 className="content5__title ft-22r ink500">우전</h3>
        <div className="content5__meta ft-16r ink300">
          <span>40g</span>
          <span>35,000원</span>
        </div>
        <span className="content5__divider" aria-hidden="true" />
        <p className="content5__summary ft-16r ink500">곡우 이전 첫물차</p>
        <p className="content5__description ft-16r ink500">
          맑고 섬세한 향과 은은한 감칠맛이 어우러집니다.
          <br />
          봄의 첫 기운을 담아 깨끗한 여운을 남깁니다.
        </p>
      </div>
    </article>
  );
}
