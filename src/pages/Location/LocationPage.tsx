import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Footer, Header, Icon, SubKvSymbolLine } from "../../components/common";
import "./LocationPage.scss";

const KAKAO_MAP_APP_KEY = "723edbe830219d6cbf7c015343e297fe";
const KAKAO_MAP_SCRIPT_ID = "kakao-map-sdk";

type KakaoMapInstance = {
  setCenter: (position: KakaoLatLng) => void;
  setLevel: (level: number) => void;
  relayout: () => void;
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

const LOCATION_MAP_COMPACT_MQ = "(max-width: 1024px)";
const SHEET_PEEK_RATIO = 0.38;
const SHEET_EXPANDED_RATIO = 0.55;

type SheetSnap = "peek" | "expanded";

function LocationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<number>(locationStores[0].id);
  const [isMapLoadFailed, setIsMapLoadFailed] = useState(false);
  const [scrollbarThumb, setScrollbarThumb] = useState({ height: 0, top: 0 });
  const [isCompactMap, setIsCompactMap] = useState(
    () => typeof window !== "undefined" && window.matchMedia(LOCATION_MAP_COMPACT_MQ).matches,
  );
  const [sheetSnap, setSheetSnap] = useState<SheetSnap>("peek");
  const [sheetDragPx, setSheetDragPx] = useState(0);
  const [isSheetDragging, setIsSheetDragging] = useState(false);
  const mapCardRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const listScrollRef = useRef<HTMLUListElement>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<KakaoMapInstance | null>(null);
  const markersRef = useRef<KakaoMarker[]>([]);
  const sheetDragStateRef = useRef({ startY: 0, startDragPx: 0 });

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

  const getSheetMaxHeightPercent = () => {
    const baseRatio = sheetSnap === "expanded" ? SHEET_EXPANDED_RATIO : SHEET_PEEK_RATIO;
    const cardHeight = mapCardRef.current?.clientHeight ?? 0;

    if (!isCompactMap || cardHeight <= 0) {
      return baseRatio * 100;
    }

    const draggedRatio = baseRatio + sheetDragPx / cardHeight;
    return Math.min(SHEET_EXPANDED_RATIO, Math.max(0.24, draggedRatio)) * 100;
  };

  const finishSheetDrag = () => {
    const cardHeight = mapCardRef.current?.clientHeight ?? 0;
    const baseRatio = sheetSnap === "expanded" ? SHEET_EXPANDED_RATIO : SHEET_PEEK_RATIO;
    const draggedRatio = cardHeight > 0 ? baseRatio + sheetDragPx / cardHeight : baseRatio;
    const snapThreshold = (SHEET_PEEK_RATIO + SHEET_EXPANDED_RATIO) / 2;

    setSheetSnap(draggedRatio >= snapThreshold ? "expanded" : "peek");
    setSheetDragPx(0);
    setIsSheetDragging(false);
  };

  const handleSheetPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isCompactMap) {
      return;
    }

    sheetDragStateRef.current = {
      startY: event.clientY,
      startDragPx: sheetDragPx,
    };
    setIsSheetDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleSheetPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isSheetDragging) {
      return;
    }

    const deltaY = sheetDragStateRef.current.startY - event.clientY;
    setSheetDragPx(sheetDragStateRef.current.startDragPx + deltaY);
  };

  const handleSheetPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isSheetDragging) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    finishSheetDrag();
  };

  const handleSheetPointerCancel = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isSheetDragging) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    finishSheetDrag();
  };

  const handleSheetKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!isCompactMap) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSheetSnap((current) => (current === "expanded" ? "peek" : "expanded"));
    }
  };

  useEffect(() => {
    const media = window.matchMedia(LOCATION_MAP_COMPACT_MQ);
    const syncCompactMap = () => {
      setIsCompactMap(media.matches);
      if (!media.matches) {
        setSheetSnap("peek");
        setSheetDragPx(0);
        setIsSheetDragging(false);
      }
    };

    syncCompactMap();
    media.addEventListener("change", syncCompactMap);

    return () => {
      media.removeEventListener("change", syncCompactMap);
    };
  }, []);

  useEffect(() => {
    if (!isCompactMap) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      mapRef.current?.relayout();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isCompactMap, sheetSnap, sheetDragPx, isSheetDragging]);

  useEffect(() => {
    const listEl = listScrollRef.current;
    const trackEl = scrollbarTrackRef.current;

    if (!listEl || !trackEl) {
      return;
    }

    const updateScrollbar = () => {
      const { scrollTop, scrollHeight, clientHeight } = listEl;
      const trackHeight = trackEl.clientHeight;
      const minThumbHeight = 40;

      if (trackHeight <= 0) {
        return;
      }

      if (scrollHeight <= clientHeight) {
        setScrollbarThumb({ height: trackHeight, top: 0 });
        return;
      }

      const thumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, minThumbHeight);
      const thumbTravel = trackHeight - thumbHeight;
      const scrollableDistance = scrollHeight - clientHeight;
      const top = scrollableDistance > 0 ? (scrollTop / scrollableDistance) * thumbTravel : 0;

      setScrollbarThumb({ height: thumbHeight, top });
    };

    updateScrollbar();

    listEl.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar);

    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(listEl);
    resizeObserver.observe(trackEl);

    return () => {
      listEl.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      resizeObserver.disconnect();
    };
  }, [filteredStores]);

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

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    if (!mapContainer) {
      return;
    }

    const relayoutMap = () => {
      mapRef.current?.relayout();
    };

    const resizeObserver = new ResizeObserver(relayoutMap);
    resizeObserver.observe(mapContainer);
    window.addEventListener("resize", relayoutMap);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", relayoutMap);
    };
  }, []);

  return (
    <main className="location">
      <div className="location__header">
        <Header />
      </div>

      <section className="location-kv" aria-label="오시는 길 키비주얼">
        <div className="location-kv__grid">
          <div className="location-kv__content">
            <div className="location-kv__head">
              <h1 className="location-kv__title ft-64r ink500">오시는길</h1>
              <SubKvSymbolLine blockClass="location-kv" tone="responsive" />
            </div>
            <p className="location-kv__desc ft-28r ink500">
              <span className="location-kv__desc-line">차를 마주하는 모든 순간이</span>
              <span className="location-kv__desc-line">하나의 풍경이 되길 바랍니다.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="location-map" aria-label="매장 위치">
        <div className="location-map__inner">
          <h2 className="location-map__title ft-48b ink500">매장 위치</h2>

          <div className="location-map__card" ref={mapCardRef}>
            <div className="location-map__map">
              <div ref={mapContainerRef} className="location-map__kakao-map" aria-label="카카오 지도" />
              {isMapLoadFailed ? (
                <div className="location-map__map-fallback ft-18r ink500" role="alert">
                  지도를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
                </div>
              ) : null}
            </div>

            <div
              className={[
                "location-map__sheet",
                isCompactMap && "location-map__sheet--compact",
                isSheetDragging && "location-map__sheet--dragging",
                sheetSnap === "expanded" && "location-map__sheet--expanded",
              ]
                .filter(Boolean)
                .join(" ")}
              style={isCompactMap ? { maxHeight: `${getSheetMaxHeightPercent()}%` } : undefined}
            >
              <button
                type="button"
                className="location-map__sheet-handle"
                aria-label={sheetSnap === "expanded" ? "지점 목록 접기" : "지점 목록 펼치기"}
                aria-expanded={sheetSnap === "expanded"}
                onPointerDown={handleSheetPointerDown}
                onPointerMove={handleSheetPointerMove}
                onPointerUp={handleSheetPointerUp}
                onPointerCancel={handleSheetPointerCancel}
                onKeyDown={handleSheetKeyDown}
              />
              <div className="location-map__list">
                <div className="location-map__search-wrap">
                  <div className="location-map__search">
                    <Icon className="location-map__search-icon" name="magnifying-glass" aria-hidden="true" />
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

                <div className="location-map__list-scroll-wrap">
                  <ul ref={listScrollRef} className="location-map__list-scroll">
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
                  <div className="location-map__scrollbar" aria-hidden="true">
                    <div ref={scrollbarTrackRef} className="location-map__scrollbar-track">
                      <span
                        className="location-map__scrollbar-thumb"
                        style={{ height: `${scrollbarThumb.height}px`, top: `${scrollbarThumb.top}px` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default LocationPage;
