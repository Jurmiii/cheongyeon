import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { Link, Navigate, useLocation, useParams } from "react-router-dom";

import subSymbol from "../../assets/images/01main/subsymbol.svg";

import { Badge, Button, Footer, Header, Icon } from "../../components/common";

import {
  NOTICE_ITEMS_PER_PAGE,
  getNoticeById,
  noticeCategories,
  notices,
  type NoticeCategory,
  type NoticeItem,
} from "../../data/notices";

import "./NoticePage.scss";



function parseNoticeDate(date: string) {

  return new Date(date.replace(/\./g, "-")).getTime();

}



function getNoticeBasePath(pathname: string) {

  return pathname.startsWith("/notice") ? "/notice" : "/event/notice";

}



interface NoticeDetailFrameProps {

  notice: NoticeItem;

  basePath: string;

}



function NoticeDetailFrame({ notice, basePath }: NoticeDetailFrameProps) {

  return (

    <section className="notice-detail" aria-label="공지사항 상세">

      <div className="notice-detail__grid">

        <header className="notice-detail__head">

          <Badge className="notice-detail__badge" variant="ba1">

            {notice.category}

          </Badge>

          <div className="notice-detail__intro">

            <h2 className="notice-detail__title ft-48b ink500">{notice.title}</h2>

            <p className="notice-detail__summary ft-36r ink500">{notice.description}</p>

          </div>

        </header>

        <div className="notice-detail__content">

          <div className="notice-detail__divider" aria-hidden="true" />

          <p className="notice-detail__body ft-18r ink500">{notice.body}</p>

          <div className="notice-detail__divider" aria-hidden="true" />

        </div>

        <div className="notice-detail__actions">

          <Link className="notice-detail__back-link" to={`${basePath}#notice-list`}>

            <Button className="notice-detail__back-button" variant="btn1">

              목록으로

            </Button>

          </Link>

        </div>

      </div>

    </section>

  );

}



function NoticePage() {
  const location = useLocation();
  const { noticeId } = useParams();
  const noticeListRef = useRef<HTMLElement>(null);
  const contentFrameRef = useRef<HTMLDivElement>(null);
  const basePath = getNoticeBasePath(location.pathname);
  const selectedNotice = noticeId ? getNoticeById(Number(noticeId)) : null;
  const [activeCategory, setActiveCategory] = useState<NoticeCategory>("전체");

  const [activePage, setActivePage] = useState(1);

  const [listAnimationKey, setListAnimationKey] = useState(0);



  const filteredNotices = useMemo(() => {

    const categoryFiltered =

      activeCategory === "전체" ? notices : notices.filter((notice) => notice.category === activeCategory);



    return [...categoryFiltered].sort(
      (a, b) => parseNoticeDate(b.date) - parseNoticeDate(a.date),
    );

  }, [activeCategory]);



  const totalPages = Math.max(1, Math.ceil(filteredNotices.length / NOTICE_ITEMS_PER_PAGE));



  const paginatedNotices = useMemo(() => {

    const startIndex = (activePage - 1) * NOTICE_ITEMS_PER_PAGE;

    return filteredNotices.slice(startIndex, startIndex + NOTICE_ITEMS_PER_PAGE);

  }, [activePage, filteredNotices]);



  const pageNumbers = useMemo(

    () => Array.from({ length: totalPages }, (_, index) => index + 1),

    [totalPages],

  );



  useEffect(() => {

    if (activePage > totalPages) {

      setActivePage(totalPages);

    }

  }, [activePage, totalPages]);



  useEffect(() => {

    setListAnimationKey((key) => key + 1);

  }, [activeCategory]);



  useLayoutEffect(() => {

    if (selectedNotice) {

      contentFrameRef.current?.scrollIntoView({ behavior: "auto", block: "start" });

      return;

    }

    if (location.hash !== "#notice-list") {

      return;

    }

    const scrollToNoticeList = () => {

      noticeListRef.current?.scrollIntoView({ behavior: "auto", block: "start" });

    };

    scrollToNoticeList();

    requestAnimationFrame(() => {

      requestAnimationFrame(scrollToNoticeList);

    });

  }, [location.hash, location.key, selectedNotice?.id]);



  if (noticeId && !selectedNotice) {

    return <Navigate to={basePath} replace />;

  }



  const handlePageChange = (pageNumber: number) => {

    if (pageNumber === activePage) {

      return;

    }

    setActivePage(pageNumber);

  };



  const handleCategoryChange = (category: NoticeCategory) => {

    setActiveCategory(category);

    setActivePage(1);

  };



  return (

    <main className="notice-page">

      <div className="notice-page__header">

        <Header />

      </div>

      <section className="notice-kv" aria-label="공지사항 키비주얼">

        <div className="notice-kv__grid">

          <h1 className="notice-kv__title ft-64r ink500">공지사항</h1>

          <img className="notice-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />

          <p className="notice-kv__description ft-28r ink500">

            계절마다 달라지는 차의 소식과

            <br />

            청연의 중요한 안내를 전합니다.

          </p>

        </div>

      </section>

      {selectedNotice ? (
        <div className="notice-content-frame" ref={contentFrameRef}>
          <NoticeDetailFrame notice={selectedNotice} basePath={basePath} />
        </div>
      ) : (
        <>
      <section className="notice-content" aria-label="공지 목록">

        <div className="notice-content__grid">

          <h2 className="notice-content__title ft-48b ink500" id="notice-list" ref={noticeListRef}>공지 목록</h2>

          <div className="notice-content__filters" role="tablist" aria-label="공지 카테고리">

            {noticeCategories.map((category) => (

              <button

                className={[

                  "notice-content__filter",

                  "ft-22b",

                  category === activeCategory && "notice-content__filter--active",

                ]

                  .filter(Boolean)

                  .join(" ")}

                key={category}

                type="button"

                role="tab"

                aria-selected={category === activeCategory}

                onClick={() => handleCategoryChange(category)}

              >

                {category}

              </button>

            ))}

          </div>

          <div className="notice-content__body">

            <ul className="notice-content__list notice-content__list--animated" key={listAnimationKey}>

              {paginatedNotices.map((notice, index) => (

                <li

                  className="notice-content__item"

                  key={notice.id}

                  style={{ animationDelay: `${index * 0.06}s` }}

                >

                  <Link className="notice-content__card" to={`${basePath}/${notice.id}`}>

                    <div className="notice-content__card-main">

                      <Badge className="notice-content__badge" variant="ba1">

                        {notice.category}

                      </Badge>

                      <div className="notice-content__card-text">

                        <h3 className="notice-content__card-title ft-22b ink500">{notice.title}</h3>

                        <p className="notice-content__card-description ft-18r ink500">{notice.description}</p>

                      </div>

                    </div>

                    <div className="notice-content__card-meta">

                      <time className="notice-content__date ft-18r ink500" dateTime={notice.date.replace(/\./g, "-")}>

                        {notice.date}

                      </time>

                      <Icon className="notice-content__arrow ink500" name="angle-right" aria-hidden="true" />

                    </div>

                  </Link>

                </li>

              ))}

            </ul>

            <nav className="notice-content__pagination" aria-label="공지사항 페이지">

              <button

                className="notice-content__page-arrow ft-22b ink500"

                type="button"

                aria-label="이전 페이지"

                disabled={activePage === 1}

                onClick={() => handlePageChange(Math.max(1, activePage - 1))}

              >

                {"<"}

              </button>

              <ol className="notice-content__page-list">

                {pageNumbers.map((pageNumber) => (

                  <li key={pageNumber}>

                    <button

                      className={[

                        "notice-content__page-number",

                        "ft-22b",

                        pageNumber === activePage && "notice-content__page-number--active",

                      ]

                        .filter(Boolean)

                        .join(" ")}

                      type="button"

                      aria-current={pageNumber === activePage ? "page" : undefined}

                      onClick={() => handlePageChange(pageNumber)}

                    >

                      {pageNumber}

                    </button>

                  </li>

                ))}

              </ol>

              <button

                className="notice-content__page-arrow ft-22b ink500"

                type="button"

                aria-label="다음 페이지"

                disabled={activePage === totalPages}

                onClick={() => handlePageChange(Math.min(totalPages, activePage + 1))}

              >

                {">"}

              </button>

            </nav>

          </div>

        </div>

      </section>
        </>
      )}

      <Footer />

    </main>

  );

}



export default NoticePage;

