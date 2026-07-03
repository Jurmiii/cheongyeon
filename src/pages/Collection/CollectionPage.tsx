import { useState } from "react";
import aromaGraph from "../../assets/images/05collection/graph.webp";
import { Footer, Header, MobileFooter, MobileHeader, Modal2, SubKvSymbolLine, TabletFooter, TabletHeader } from "../../components/common";
import type { TeaCollectionModalData } from "../../components/common/TeaCollectionModal/teaCollectionModal.types";
import { collectionTabs } from "./collectionTabs";
import type { CollectionTabId } from "./collectionTabs";
import { getCollectionProductModalData } from "./collectionProductModal";
import { collectionCategories } from "./collectionProducts";
import CollectionCategorySection from "./CollectionCategorySection";
import "./CollectionPage.scss";

function CollectionPage() {
  const [activeTab, setActiveTab] = useState<CollectionTabId>("all");
  const [selectedModalData, setSelectedModalData] = useState<TeaCollectionModalData | null>(null);

  const visibleCategories =
    activeTab === "all"
      ? collectionCategories
      : collectionCategories.filter((category) => category.id === activeTab);

  return (
    <main className="collection-page">
      <div className="collection-page__header collection-page__header--desktop">
        <Header />
      </div>
      <div className="collection-page__header collection-page__header--tablet">
        <TabletHeader />
      </div>
      <div className="collection-page__header collection-page__header--mobile">
        <MobileHeader />
      </div>

      <section className="collection-kv" aria-label="차 컬렉션 키비주얼">
        <div className="collection-kv__grid">
          <div className="collection-kv__content">
            <div className="collection-kv__head">
              <h1 className="collection-kv__title ft-64b ink500">차 컬렉션</h1>
              <SubKvSymbolLine blockClass="collection-kv" />
            </div>
            <p className="collection-kv__description ft-28r ink500">
              서로 다른 찻잎이 만들어내는 향의 깊이를 경험해보세요
            </p>
          </div>
        </div>
      </section>

      <section className="collection-aroma" aria-label="향으로 만나는차">
        <div className="collection-aroma__grid">
          <div className="collection-aroma__content">
            <h2 className="collection-aroma__title ft-48b ink500">향으로 만나는차</h2>
            <p className="collection-aroma__description ft-22r ink500">
              같은 차라도, 우리는 다른 향을 느낍니다.
              <br />
              <span className="collection-aroma__description-second">
                향미 맵을 따라가며 당신의 취향을 발견해보세요.
              </span>
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
                    tab.id === activeTab ? "ft-18b" : "ft-18r",
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
                onProductClick={(product, categoryId) => {
                  setSelectedModalData(getCollectionProductModalData(product, categoryId));
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <Modal2
        isOpen={selectedModalData !== null}
        onClose={() => setSelectedModalData(null)}
        data={selectedModalData ?? undefined}
      />

      <div className="collection-page__footer collection-page__footer--desktop">
        <Footer />
      </div>
      <div className="collection-page__footer collection-page__footer--tablet">
        <TabletFooter />
      </div>
      <div className="collection-page__footer collection-page__footer--mobile">
        <MobileFooter />
      </div>
    </main>
  );
}

export default CollectionPage;
