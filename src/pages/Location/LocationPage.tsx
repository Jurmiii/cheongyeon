import { useMemo, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import locationKv from "../../assets/images/04location/location-kv.webp";
import mapImage from "../../assets/images/04location/map.png";
import { Footer, Header } from "../../components/common";
import "./LocationPage.scss";

const locationStores = [
  {
    id: 1,
    name: "청연 북촌 티하우스 본원",
    address: "서울특별시 종로구 북촌로 58",
    type: "다실",
  },
  {
    id: 2,
    name: "청연 하동 티하우스",
    address: "경상남도 하동군 화개면 612",
    type: "다실",
  },
  {
    id: 3,
    name: "청연 보성 티하우스",
    address: "전라남도 보성군 보성읍 821",
    type: "다실",
  },
  {
    id: 4,
    name: "청연 강진 티하우스",
    address: "전라남도 강진군 성전면 437",
    type: "다실",
  },
  {
    id: 5,
    name: "청연 남산 티하우스",
    address: "서울특별시 중구 소파로 42",
    type: "차점",
  },
  {
    id: 6,
    name: "청연 구례 티하우스",
    address: "전라남도 구례군 마산면 214",
    type: "차점",
  },
  {
    id: 7,
    name: "청연 경주 티하우스",
    address: "경상북도 경주시 첨성로 177",
    type: "차점",
  },
  {
    id: 8,
    name: "청연 제주 티하우스",
    address: "제주도 서귀포시 안덕면 128",
    type: "차점",
  },
] as const;

function LocationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState(locationStores[0].id);

  const filteredStores = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return locationStores;
    }

    return locationStores.filter((store) => {
      const searchableText = `${store.name} ${store.address} ${store.type}`.toLowerCase();
      return searchableText.includes(query);
    });
  }, [searchQuery]);

  const activeStoreId = filteredStores.some((store) => store.id === selectedStoreId)
    ? selectedStoreId
    : (filteredStores[0]?.id ?? null);

  return (
    <main className="location">
      <div className="location__header">
        <Header />
      </div>

      <section
        className="location-kv"
        style={{ backgroundImage: `url(${locationKv})` }}
        aria-label="오시는 길 키비주얼"
      >
        <div className="location-kv__content">
          <h1 className="location-kv__title ft-64r ink500">오시는길</h1>
          <div className="location-kv__ornament" aria-hidden="true">
            <img src={subSymbol} alt="" />
          </div>
          <p className="location-kv__desc ft-28r ink500">
            차를 마주하는 모든 순간이
            <br />
            하나의 풍경이 되길 바랍니다.
          </p>
        </div>
      </section>

      <section className="location-map" aria-label="매장 위치">
        <div className="location-map__inner">
          <h2 className="location-map__title ft-48b ink500">매장 위치</h2>

          <div className="location-map__card">
            <div className="location-map__list">
              <div className="location-map__search-wrap">
                <div className="location-map__search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="location-map__search-icon" aria-hidden="true" />
                  <input
                    type="search"
                    className="location-map__search-input ft-16r ink500"
                    placeholder="지점 검색"
                    aria-label="지점 검색"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>
              </div>

              <ul className="location-map__list-scroll">
                {filteredStores.map((store) => (
                  <li key={store.id}>
                    <button
                      type="button"
                      className={`location-map__item${activeStoreId === store.id ? " location-map__item--active" : ""}`}
                      onClick={() => setSelectedStoreId(store.id)}
                    >
                      <span className="location-map__item-head">
                        <span className="location-map__item-name ft-18r ink500">{store.name}</span>
                        <span className="location-map__item-type ft-18r han500">{store.type}</span>
                      </span>
                      <span className="location-map__item-address ft-16r ink200">{store.address}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="location-map__map">
              <img src={mapImage} alt="" className="location-map__map-image" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default LocationPage;
