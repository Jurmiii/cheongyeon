import { Link } from "react-router-dom";
import classIntroCtaBg from "../../assets/images/08class/class-introduction-6-bg.webp";
import "./ClassIntroductionCtaSection.scss";

function ClassIntroductionCtaSection() {
  return (
    <section
      className="class-intro-cta"
      style={{ backgroundImage: `url(${classIntroCtaBg})` }}
      aria-label="클래스 예약 안내"
    >
      <div className="class-intro-cta__grid">
        <div className="class-intro-cta__content">
          <h2 className="class-intro-cta__title ft-48b white">
            <span>한 잔의 차로 머무는 시간</span>
            <span>청연에서 조용히 만나보세요</span>
          </h2>
          <Link className="class-intro-cta__button ft-22b" to="/reservation">
            클래스예약하기
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ClassIntroductionCtaSection;
