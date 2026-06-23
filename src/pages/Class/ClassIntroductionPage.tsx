import { Header } from "../../components/common";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import classIntroImage from "../../assets/images/08class/class-introduction-2-1.webp";
import ClassIntroductionScrollSection from "./ClassIntroductionScrollSection";
import ClassIntroductionCarouselSection from "./ClassIntroductionCarouselSection";
import ClassIntroductionCtaSection from "./ClassIntroductionCtaSection";
import "./ClassIntroductionPage.scss";

function ClassIntroductionPage() {
  return (
    <main className="class-intro-page">
      <div className="class-intro-page__header">
        <Header />
      </div>

      <section className="class-intro-kv" aria-label="클래스 소개">
        <div className="class-intro-kv__grid">
          <div className="class-intro-kv__content">
            <div className="class-intro-kv__head">
              <h1 className="class-intro-kv__title ft-64b ink500">클래스 소개</h1>
              <img className="class-intro-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
            </div>
            <p className="class-intro-kv__description ft-28r ink500">
              차를 이해하고, 천천히 우리며
              <br />
              청연의 다도 문화를 경험합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="class-intro-about" aria-label="클래스 소개 상세">
        <div className="class-intro-about__grid">
          <div className="class-intro-about__media">
            <img
              className="class-intro-about__image"
              src={classIntroImage}
              alt="차 도구와 다도 수업 공간"
            />
          </div>
          <div className="class-intro-about__content">
            <h2 className="class-intro-about__title ft-48b ink500">차를 더 가까이 만나는 첫 수업</h2>
            <div className="class-intro-about__description ft-28r ink500">
              <p className="class-intro-about__description-line">어렵게 느껴졌던 다도를 일상 속에서 </p>
              <p className="class-intro-about__description-line">
                즐길 수 있도록 쉽게 풀어냅니다.
                <br />
                차 도구의 쓰임과 기본 흐름을 익히며, 나에게 맞는 차의 취향을 발견해 보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClassIntroductionScrollSection />

      <ClassIntroductionCarouselSection />

      <ClassIntroductionCtaSection />
    </main>
  );
}

export default ClassIntroductionPage;
