import { Footer, Header } from "../../components/common";
import { seasonClassAssets } from "../../data/seasonClassItems";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import SeasonClassListSection from "./SeasonClassListSection";
import SeasonClassPromoSection from "./SeasonClassPromoSection";
import SeasonClassScheduleSection from "./SeasonClassScheduleSection";
import SeasonClassGallerySection from "./SeasonClassGallerySection";
import "./SeasonClassPage.scss";

function SeasonClassPage() {
  return (
    <main className="season-class-page">
      <div className="season-class-page__header">
        <Header />
      </div>

      <section
        className="season-class-kv"
        style={{ backgroundImage: `url(${seasonClassAssets.kvBg})` }}
        aria-label="시즌 클래스"
      >
        <div className="season-class-kv__grid">
          <div className="season-class-kv__content">
            <div className="season-class-kv__head">
              <h1 className="season-class-kv__title ft-64b ink500">시즌 클래스</h1>
              <img className="season-class-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
            </div>
            <p className="season-class-kv__description ft-28r ink500">
              계절마다 다른 향기를 따라
              <br />
              새로운 차를 경험합니다.
            </p>
          </div>
        </div>
      </section>

      <SeasonClassListSection />

      <SeasonClassPromoSection />

      <SeasonClassScheduleSection />

      <SeasonClassGallerySection />

      <Footer />
    </main>
  );
}

export default SeasonClassPage;
