import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

import subSymbol from "../../assets/images/01main/subsymbol.svg";
import eventKvBg from "../../assets/images/11event/event-kv-bg.webp";
import { Badge, Footer, Header, Icon } from "../../components/common";
import type { IconName } from "../../components/common";
import { events, type EventItem, type EventStatus } from "../../data/eventList";
import "./EventPage.scss";
type EventFilter = EventStatus;

const filterTabs: { value: EventFilter; label: string }[] = [
  { value: "progress", label: "진행중" },
  { value: "ended", label: "종료" },
];

const ITEMS_PER_PAGE = 6;

interface EventDetailModalProps {
  event: EventItem;
  onClose: () => void;
}

interface InfoBlock {
  icon: IconName;
  title: string;
  lines: string[];
  link?: string;
  linkTo?: string;
}

function toLines(value: string) {
  return value.split("\n");
}

function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [modalScale, setModalScale] = useState(1);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const updateModalScale = () => {
      const availableHeight = window.innerHeight - 48;
      const nextScale = Math.min(1, availableHeight / panel.scrollHeight);

      setModalScale(Number.isFinite(nextScale) ? nextScale : 1);
    };

    updateModalScale();

    const resizeObserver = new ResizeObserver(updateModalScale);
    resizeObserver.observe(panel);
    window.addEventListener("resize", updateModalScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateModalScale);
    };
  }, [event]);

  useEffect(() => {
    const scrollBlockKeys = new Set(["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "]);

    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        onClose();
        return;
      }

      const target = keyboardEvent.target;
      const isInteractiveTarget =
        target instanceof HTMLElement && target.closest("button, a, input, textarea, select");

      if (scrollBlockKeys.has(keyboardEvent.key) && !isInteractiveTarget) {
        keyboardEvent.preventDefault();
      }
    };
    const preventBackgroundScroll = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false });
    panelRef.current?.scrollTo({ top: 0 });
    panelRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", preventBackgroundScroll);
      window.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [onClose]);

  const infoBlocks: InfoBlock[] = [
    { icon: "calendar", title: "이벤트 기간", lines: [event.period] },
    { icon: "gift", title: "이벤트 내용", lines: toLines(event.content) },
    {
      icon: "location-dot",
      title: "참여 매장",
      lines: [event.store],
      link: event.storeLink,
      linkTo: "/brand/location",
    },
    { icon: "user", title: "참여 대상", lines: [event.target] },
    { icon: "clipboard", title: "유의사항", lines: toLines(event.notice) },
  ];

  return (
    <div className="event-modal" role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        className="event-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        tabIndex={-1}
        style={{ "--event-modal-scale": modalScale } as CSSProperties}
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <header className="event-modal__header">
          <Badge
            className="event-modal__badge"
            variant={event.status === "ended" ? "oneday" : "progress"}
          >
            {event.statusLabel}
          </Badge>
          <p className="event-modal__subtitle ft-22r ink500">{event.subTitle}</p>
          <h2 className="event-modal__title ft-36b ink500" id="event-modal-title">
            {event.title}
          </h2>
          <p className="event-modal__description ft-22r ink500">
            {toLines(event.description).map((line, index, lines) => (
              <span key={`desc-${index}`}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p className="event-modal__period ft-18r ink500">{event.dateRange}</p>
        </header>

        <div className="event-modal__info-box">
          {infoBlocks.map((block, blockIndex) => (
            <article className="event-modal__info-block" key={block.title}>
              <div className="event-modal__info-row">
                <span className="event-modal__icon-circle" aria-hidden="true">
                  <Icon className="event-modal__info-icon" name={block.icon} />
                </span>
                <div className="event-modal__info-copy">
                  <h3 className="event-modal__info-title ft-18r ink500">{block.title}</h3>
                  <p className="event-modal__info-content ft-14r ink500">
                    {block.lines.map((line, index) => (
                      <span key={`${block.title}-${index}`}>
                        {line}
                        {index < block.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  {block.link && (
                    <button
                      className="event-modal__inline-link ft-14r ink500"
                      type="button"
                      onClick={() => {
                        if (block.linkTo) {
                          navigate(block.linkTo);
                        }
                      }}
                    >
                      <span>{block.link}</span>
                      <Icon className="event-modal__inline-link-icon" name="chevron-right" />
                    </button>
                  )}
                </div>
              </div>
              {blockIndex < infoBlocks.length - 1 && <span className="event-modal__divider" aria-hidden="true" />}
            </article>
          ))}
        </div>

        <button className="event-modal__close ft-16b" type="button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

function EventPage() {
  const [activeFilter, setActiveFilter] = useState<EventFilter>("progress");
  const [activePage, setActivePage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filteredEvents = useMemo(
    () => events.filter((event) => event.status === activeFilter),
    [activeFilter],
  );

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / ITEMS_PER_PAGE));
  const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, index) => index + 1), [totalPages]);

  const pagedEvents = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [activePage, filteredEvents]);

  const handleFilterChange = (filter: EventFilter) => {
    setActiveFilter(filter);
    setActivePage(1);
  };

  const handlePageChange = (page: number) => {
    setActivePage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <main className="event-page">
      <div className="event-page__header">
        <Header />
      </div>

      <section
        className="event-kv"
        style={{ backgroundImage: `url(${eventKvBg})` }}
        aria-label="진행중 이벤트"
      >
        <div className="event-kv__grid">
          <div className="event-kv__content">
            <div className="event-kv__head">
              <h1 className="event-kv__title ft-64b ink500">이벤트</h1>
              <img className="event-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
            </div>
            <p className="event-kv__description ft-28r ink500">
              청연에서 열리는 다양한 차의 시간과
              <br />
              이벤트 소식을 확인해보세요.
            </p>
          </div>
        </div>
      </section>

      <section className="event-content" aria-label="이벤트 목록">
        <div className="event-content__grid">
          <div className="event-content__filters" role="tablist" aria-label="이벤트 상태 필터">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                className={[
                  "event-content__filter",
                  "ft-28b",
                  tab.value === activeFilter && "event-content__filter--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-selected={tab.value === activeFilter}
                onClick={() => handleFilterChange(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <ul className="event-list">
            {pagedEvents.map((event) => (
              <li className="event-list__item" key={event.id}>
                <article
                  className={["event-card", "event-page-card", event.dark && "event-card--dark"].filter(Boolean).join(" ")}
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  <div className="event-card__content">
                    <div className="event-card__top">
                      <Badge
                        className="event-card__badge"
                        variant={event.status === "ended" ? "oneday" : "progress"}
                      >
                        {event.statusLabel}
                      </Badge>

                      <div className="event-card__text">
                        <div className="event-card__heading">
                          <p className="event-card__subtitle ft-16r">{event.subTitle}</p>
                          <h3 className="event-card__title ft-22b">{event.title}</h3>
                          <p className="event-card__description ft-16r">
                            {event.description.split("\n").map((line, index, lines) => (
                              <span key={`${event.id}-desc-${index}`}>
                                {line}
                                {index < lines.length - 1 && <br />}
                              </span>
                            ))}
                          </p>
                        </div>
                        <p className="event-card__date ft-16r">{event.dateRange}</p>
                      </div>
                    </div>

                    <button
                      className="event-card__more ft-18r"
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <span>자세히 보기</span>
                      <Icon className="event-card__more-icon" name="chevron-right" />
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <nav className="event-content__pagination" aria-label="이벤트 페이지">
            <button
              className="event-content__page-arrow ft-22b ink500"
              type="button"
              aria-label="이전 페이지"
              disabled={activePage === 1}
              onClick={() => handlePageChange(activePage - 1)}
            >
              {"<"}
            </button>
            <ol className="event-content__page-list">
              {pageNumbers.map((page) => (
                <li key={page}>
                  <button
                    className={[
                      "event-content__page-number",
                      "ft-22b",
                      page === activePage && "event-content__page-number--active",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    type="button"
                    aria-current={page === activePage ? "page" : undefined}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ol>
            <button
              className="event-content__page-arrow ft-22b ink500"
              type="button"
              aria-label="다음 페이지"
              disabled={activePage === totalPages}
              onClick={() => handlePageChange(activePage + 1)}
            >
              {">"}
            </button>
          </nav>
        </div>
      </section>

      <Footer />

      {selectedEvent && <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </main>
  );
}

export default EventPage;
