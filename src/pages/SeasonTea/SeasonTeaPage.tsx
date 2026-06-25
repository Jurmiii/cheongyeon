import { useState } from "react";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import springTeaImage from "../../assets/images/07season-tea/sec2-tea.webp";
import summerTeaImage from "../../assets/images/07season-tea/sec3-tea.webp";
import autumnTeaImage from "../../assets/images/07season-tea/sec4-tea.webp";
import winterTeaImage from "../../assets/images/07season-tea/sec5-tea.webp";
import { Button, Footer, Header } from "../../components/common";
import SeasonTeaDetailModal from "./SeasonTeaDetailModal";
import { springTeaDetail } from "./seasonTeaDetailData";
import "./SeasonTeaPage.scss";

function SeasonTeaPage() {
  const [isSpringModalOpen, setIsSpringModalOpen] = useState(false);

  return (
    <main className="season-tea-page">
      <div className="season-tea-page__header">
        <Header />
      </div>

      <section className="season-tea-kv" aria-label="계절의 차 키비주얼">
        <div className="season-tea-kv__grid">
          <h1 className="season-tea-kv__title ft-64b ink500">계절의 차</h1>
          <img className="season-tea-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
          <p className="season-tea-kv__description ft-28r ink500">
            계절이 머문 향과 풍미를 담아,
            <br />
            가장 아름다운 순간을 전합니다.
          </p>
        </div>
      </section>

      <section className="season-tea-spring" aria-label="봄의 차">
        <div className="season-tea-spring__grid">
          <div className="season-tea-spring__media">
            <img
              className="season-tea-spring__image"
              src={springTeaImage}
              alt="동백꽃 차 한 잔과 동백꽃"
            />
          </div>
          <div className="season-tea-spring__content">
            <h2 className="season-tea-spring__season ft-64b plum500">봄의 차</h2>
            <p className="season-tea-spring__name ft-28r ink500">동백꽃 차</p>
            <p className="season-tea-spring__lead ft-22r ink500">
              봄의 첫 설렘을 담은 한 잔
              <br />
              은은한 꽃향기와 부드러운 여운이 머무는 동백꽃 차
            </p>
            <p className="season-tea-spring__body ft-18r ink500">
              첫 꽃이 피어나는 계절의 기운을 담아
              <br />
              부드럽고 은은한 향으로 완성했습니다.
              <br />
              한 모금마다 차분한 여운이 이어지며
              <br />
              봄의 풍경을 천천히 펼쳐냅니다.
            </p>
            <Button
              className="season-tea-spring__button"
              variant="btn7"
              type="button"
              onClick={() => setIsSpringModalOpen(true)}
            >
              차 특징 보기
            </Button>
          </div>
        </div>
      </section>

      <section className="season-tea-summer" aria-label="여름의 차">
        <div className="season-tea-summer__grid">
          <div className="season-tea-summer__content">
            <h2 className="season-tea-summer__season ft-64b deep400">여름의 차</h2>
            <p className="season-tea-summer__name ft-28r ink500">냉녹차</p>
            <p className="season-tea-summer__lead ft-22r ink500">
              여름의 맑음을 담은 한 잔
              <br />
              청량한 향과 시원한 여운이 머무는 냉녹차
            </p>
            <p className="season-tea-summer__body ft-18r ink500">
              푸른 계절의 생기를 담아
              <br />
              맑고 산뜻한 향으로 우려냈습니다.
              <br />
              한 모금마다 시원한 여운이 이어지며
              <br />
              푸른 계절의 풍경을 천천히 펼쳐냅니다.
            </p>
            <Button className="season-tea-summer__button" variant="btn7">
              차 특징 보기
            </Button>
          </div>
          <div className="season-tea-summer__media">
            <img
              className="season-tea-summer__image"
              src={summerTeaImage}
              alt="냉녹차 한 잔과 찻잎"
            />
          </div>
        </div>
      </section>

      <section className="season-tea-autumn" aria-label="가을의 차">
        <div className="season-tea-autumn__grid">
          <div className="season-tea-autumn__media">
            <img
              className="season-tea-autumn__image"
              src={autumnTeaImage}
              alt="국화차 한 잔과 가을 잎"
            />
          </div>
          <div className="season-tea-autumn__content">
            <h2 className="season-tea-autumn__season ft-64b color-fall">가을의 차</h2>
            <p className="season-tea-autumn__name ft-28r ink500">국화차</p>
            <p className="season-tea-autumn__lead ft-22r ink500">
              가을의 여백을 담은 한 잔
              <br />
              은은한 꽃향기와 깊은 여운이 머무는 국화차
            </p>
            <p className="season-tea-autumn__body ft-18r ink500">
              꽃이 지고 계절이 익어가는 시간,
              <br />
              은은한 꽃향기와 깊은 여운이 머무는 국화차
              <br />
              한 모금마다 차분한 여운이 이어지며
              <br />
              가을의 풍경을 천천히 펼쳐냅니다.
            </p>
            <Button className="season-tea-autumn__button" variant="btn7">
              차 특징 보기
            </Button>
          </div>
        </div>
      </section>

      <section className="season-tea-winter" aria-label="겨울의 차">
        <div className="season-tea-winter__grid">
          <div className="season-tea-winter__content">
            <h2 className="season-tea-winter__season ft-64b color-winter">겨울의 차</h2>
            <p className="season-tea-winter__name ft-28r ink500">우롱차</p>
            <p className="season-tea-winter__lead ft-22r ink500">
              겨울의 깊이를 담은 한 잔
              <br />
              깊은 향과 긴 여운이 머무는 우롱차
            </p>
            <p className="season-tea-winter__body ft-18r ink500">
              운무가 산을 감싸는 새벽처럼
              <br />
              향은 고요하게 잔 안에 머뭅니다.
              <br />
              한 모금마다 깊은 여운이 이어지며
              <br />
              겨울의 풍경을 천천히 펼쳐냅니다.
            </p>
            <Button className="season-tea-winter__button" variant="btn7">
              차 특징 보기
            </Button>
          </div>
          <div className="season-tea-winter__media">
            <img
              className="season-tea-winter__image"
              src={winterTeaImage}
              alt="우롱차 한 잔과 찻잎"
            />
          </div>
        </div>
      </section>

      <SeasonTeaDetailModal
        isOpen={isSpringModalOpen}
        onClose={() => setIsSpringModalOpen(false)}
        data={springTeaDetail}
      />

      <Footer />
    </main>
  );
}

export default SeasonTeaPage;
