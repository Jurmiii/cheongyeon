import { useEffect, useMemo, useRef, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import locationKv from "../../assets/images/04location/location-kv.webp";
import { Footer, Header } from "../../components/common";
import "./LocationPage.scss";

const KAKAO_MAP_APP_KEY = "723edbe830219d6cbf7c015343e297fe";
const KAKAO_MAP_SCRIPT_ID = "kakao-map-sdk";

type KakaoMapInstance = {
  setCenter: (position: KakaoLatLng) => void;
  setLevel: (level: number) => void;
};

type KakaoLatLng = unknown;

type KakaoMarker = {
  setMap: (map: KakaoMapInstance | null) => void;
};

type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng;
  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMapInstance;
  Marker: new (options: { map: KakaoMapInstance; position: KakaoLatLng; title?: string }) => KakaoMarker;
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}

let kakaoMapScriptPromise: Promise<KakaoMaps> | null = null;

function loadKakaoMapScript() {
  if (window.kakao?.maps) {
    return Promise.resolve(window.kakao.maps);
  }

  if (kakaoMapScriptPromise) {
    return kakaoMapScriptPromise;
  }

  kakaoMapScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(KAKAO_MAP_SCRIPT_ID) as HTMLScriptElement | null;

    const handleLoad = () => {
      if (!window.kakao?.maps) {
        reject(new Error("Kakao Maps SDK failed to load."));
        return;
      }

      window.kakao.maps.load(() => resolve(window.kakao?.maps as KakaoMaps));
    };

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Kakao Maps SDK failed to load.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false`;
    script.async = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", () => reject(new Error("Kakao Maps SDK failed to load.")), { once: true });
    document.head.appendChild(script);
  });

  return kakaoMapScriptPromise;
}

const locationStores = [
  {
    id: 1,
    name: "청연 북촌 티하우스 본원",
    address: "서울특별시 종로구 북촌로 58",
    type: "다실",
    position: { latitude: 37.5826, longitude: 126.9849 },
  },
  {
    id: 2,
    name: "청연 하동 티하우스",
    address: "경상남도 하동군 화개면 612",
    type: "다실",
    position: { latitude: 35.1916, longitude: 127.6262 },
  },
  {
    id: 3,
    name: "청연 보성 티하우스",
    address: "전라남도 보성군 보성읍 821",
    type: "다실",
    position: { latitude: 34.7715, longitude: 127.0801 },
  },
  {
    id: 4,
    name: "청연 강진 티하우스",
    address: "전라남도 강진군 성전면 437",
    type: "다실",
    position: { latitude: 34.6902, longitude: 126.7071 },
  },
  {
    id: 5,
    name: "청연 남산 티하우스",
    address: "서울특별시 중구 소파로 42",
    type: "차점",
    position: { latitude: 37.5571, longitude: 126.9882 },
  },
  {
    id: 6,
    name: "청연 구례 티하우스",
    address: "전라남도 구례군 마산면 214",
    type: "차점",
    position: { latitude: 35.2176, longitude: 127.4905 },
  },
  {
    id: 7,
    name: "청연 경주 티하우스",
    address: "경상북도 경주시 첨성로 177",
    type: "차점",
    position: { latitude: 35.8347, longitude: 129.2187 },
  },
  {
    id: 8,
    name: "청연 제주 티하우스",
    address: "제주도 서귀포시 안덕면 128",
    type: "차점",
    position: { latitude: 33.2551, longitude: 126.3521 },
  },
] as const;

function LocationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<number>(locationStores[0].id);
  const [isMapLoadFailed, setIsMapLoadFailed] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<KakaoMapInstance | null>(null);
  const markersRef = useRef<KakaoMarker[]>([]);

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
  const activeStore = locationStores.find((store) => store.id === activeStoreId) ?? locationStores[0];

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    if (!mapContainer) {
      return;
    }

    let isMounted = true;

    loadKakaoMapScript()
      .then((maps) => {
        if (!isMounted) {
          return;
        }

        const center = new maps.LatLng(activeStore.position.latitude, activeStore.position.longitude);

        if (!mapRef.current) {
          const map = new maps.Map(mapContainer, {
            center,
            level: 7,
          });

          mapRef.current = map;
          markersRef.current = locationStores.map((store) => {
            const markerPosition = new maps.LatLng(store.position.latitude, store.position.longitude);

            return new maps.Marker({
              map,
              position: markerPosition,
              title: store.name,
            });
          });
        }

        mapRef.current.setCenter(center);
        mapRef.current.setLevel(activeStore.type === "다실" ? 8 : 7);
        setIsMapLoadFailed(false);
      })
      .catch(() => {
        if (isMounted) {
          setIsMapLoadFailed(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeStore]);

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
              <div ref={mapContainerRef} className="location-map__kakao-map" aria-label="카카오 지도" />
              {isMapLoadFailed ? (
                <div className="location-map__map-fallback ft-18r ink500" role="alert">
                  지도를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default LocationPage;
