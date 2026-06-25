import { useState } from "react";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import aromaGraph from "../../assets/images/05collection/graph.webp";
import { Footer, Header } from "../../components/common";
import { collectionTabs } from "./collectionTabs";
import type { CollectionTabId } from "./collectionTabs";
import { collectionCategories } from "./collectionProducts";
import CollectionCategorySection from "./CollectionCategorySection";
import "./CollectionPage.scss";

function CollectionPage() {
  const [activeTab, setActiveTab] = useState<CollectionTabId>("all");
  const visibleCategories =
    activeTab === "all"
      ? collectionCategories
      : collectionCategories.filter((category) => category.id === activeTab);

  return (
    <main className="collection-page">
      <div className="collection-page__header">
        <Header />
      </div>

      <section className="collection-kv" aria-label="차 컬렉션 키비주얼">
        <div className="collection-kv__grid">
          <div className="collection-kv__content">
            <h1 className="collection-kv__title ft-64b ink500">차 컬렉션</h1>
            <img className="collection-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
            <p className="collection-kv__description ft-28r ink500">
              자연의 향과 맛을 오롯이 담아낸
              <br />
              청연만의 다채로운 차 컬렉션
            </p>
          </div>
        </div>
      </section>

      <section className="collection-aroma" aria-label="향으로 만나는 차">
        <div className="collection-aroma__grid">
          <div className="collection-aroma__content">
            <h2 className="collection-aroma__title ft-48b ink500">향으로 만나는 차</h2>
            <p className="collection-aroma__description ft-28r ink500">
              같은 차라도, 우리는 다른 향을 느낍니다.
              <br />
              향미 맵을 따라가며 당신의 취향을 발견해보세요.
            </p>
          </div>
          <div className="collection-aroma__chart">
            <img
              className="collection-aroma__chart-image"
              src={aromaGraph}
              alt="차 향미 그래프"
            />
          </div>
        </div>
      </section>

      <section className="collection-catalog" aria-label="청연의 차 컬렉션">
        <div className="collection-catalog__grid">
          <h2 className="collection-catalog__title ft-48b ink500">청연의 차 컬렉션</h2>

          <div className="collection-catalog__tabs">
            <div className="collection-catalog__tabs-inner" role="tablist" aria-label="차 카테고리">
              {collectionTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  className={[
                    "collection-catalog__tab",
                    tab.id === activeTab ? "ft-22b" : "ft-22r",
                    tab.id === activeTab && "collection-catalog__tab--active",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-selected={tab.id === activeTab}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="collection-catalog__content">
            {visibleCategories.map((category) => (
              <CollectionCategorySection
                key={category.id}
                category={category}
                title={activeTab === "all" ? category.title : category.lineupTitle}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default CollectionPage;
