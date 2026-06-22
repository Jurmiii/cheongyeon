import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import subSymbol from "../../assets/images/svg/subsymbol.svg";

import { Badge, Footer, Header, Icon } from "../../components/common";

import { faqs } from "../../data/faqs";

import {

  NOTICE_ITEMS_PER_PAGE,

  noticeCategories,

  notices,

  type NoticeCategory,

  type NoticeSortOrder,

} from "../../data/notices";

import "./NoticePage.scss";



const sortOptions: { value: NoticeSortOrder; label: string }[] = [

  { value: "latest", label: "최신순" },

  { value: "oldest", label: "오래된순" },

];



function parseNoticeDate(date: string) {

  return new Date(date.replace(/\./g, "-")).getTime();

}



function NoticePage() {

  const [activeCategory, setActiveCategory] = useState<NoticeCategory>("전체");

  const [activePage, setActivePage] = useState(1);

  const [sortOrder, setSortOrder] = useState<NoticeSortOrder>("latest");

  const [isSortOpen, setIsSortOpen] = useState(false);

  const [listAnimationKey, setListAnimationKey] = useState(0);

  const [openFaqId, setOpenFaqId] = useState<number | null>(null);



  const filteredNotices = useMemo(() => {

    const categoryFiltered =

      activeCategory === "전체" ? notices : notices.filter((notice) => notice.category === activeCategory);



    return [...categoryFiltered].sort((a, b) => {

      const diff = parseNoticeDate(b.date) - parseNoticeDate(a.date);

      return sortOrder === "latest" ? diff : -diff;

    });

  }, [activeCategory, sortOrder]);



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

  }, [activeCategory, activePage, sortOrder]);



  const handleCategoryChange = (category: NoticeCategory) => {

    setActiveCategory(category);

    setActivePage(1);

  };



  const handleSortChange = (order: NoticeSortOrder) => {

    setSortOrder(order);

    setIsSortOpen(false);

    setActivePage(1);

  };



  const handleFaqToggle = (faqId: number) => {

    setOpenFaqId((currentId) => (currentId === faqId ? null : faqId));

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

      <section className="notice-content" aria-label="공지 목록">

        <div className="notice-content__grid">

          <h2 className="notice-content__title ft-48b ink500">공지 목록</h2>

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

            <div

              className={["notice-content__sort-wrap", isSortOpen && "notice-content__sort-wrap--open"]

                .filter(Boolean)

                .join(" ")}

            >

              <button

                className="notice-content__sort ft-18r ink500"

                type="button"

                aria-haspopup="listbox"

                aria-expanded={isSortOpen}

                onClick={() => setIsSortOpen((open) => !open)}

              >

                <span className="notice-content__sort-label">{sortOptions.find((option) => option.value === sortOrder)?.label}</span>

                <Icon className="notice-content__sort-icon" name="angle-down" aria-hidden="true" />

              </button>

              <ul className="notice-content__sort-menu" role="listbox" aria-label="정렬 방식">

                {sortOptions.map((option) => (

                  <li key={option.value}>

                    <button

                      className={[

                        "notice-content__sort-option",

                        "ft-18r",

                        "ink500",

                        option.value === sortOrder && "notice-content__sort-option--active",

                      ]

                        .filter(Boolean)

                        .join(" ")}

                      type="button"

                      role="option"

                      aria-selected={option.value === sortOrder}

                      onClick={() => handleSortChange(option.value)}

                    >

                      {option.label}

                    </button>

                  </li>

                ))}

              </ul>

            </div>

            <ul className="notice-content__list notice-content__list--animated" key={listAnimationKey}>

              {paginatedNotices.map((notice, index) => (

                <li

                  className="notice-content__item"

                  key={notice.id}

                  style={{ animationDelay: `${index * 0.06}s` }}

                >

                  <Link className="notice-content__card" to={`/event/notice/${notice.id}`}>

                    <div className="notice-content__card-main">

                      <Badge className="notice-content__badge" variant="ba1">

                        {notice.category}

                      </Badge>

                      <div className="notice-content__card-text">

                        <h3 className="notice-content__card-title ft-36b ink500">{notice.title}</h3>

                        <p className="notice-content__card-description ft-28r ink500">{notice.description}</p>

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

                onClick={() => setActivePage((page) => Math.max(1, page - 1))}

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

                      onClick={() => setActivePage(pageNumber)}

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

                onClick={() => setActivePage((page) => Math.min(totalPages, page + 1))}

              >

                {">"}

              </button>

            </nav>

          </div>

        </div>

      </section>

      <section className="notice-faq" aria-label="자주 묻는 질문">

        <div className="notice-faq__grid">

          <h2 className="notice-faq__title ft-48b ink500">자주 묻는 질문</h2>

          <ul className="notice-faq__list">

            {faqs.map((faq) => {

              const isOpen = openFaqId === faq.id;



              return (

                <li

                  className={["notice-faq__item", isOpen && "notice-faq__item--open"].filter(Boolean).join(" ")}

                  key={faq.id}

                >

                  <button

                    className="notice-faq__question"

                    type="button"

                    aria-expanded={isOpen}

                    onClick={() => handleFaqToggle(faq.id)}

                  >

                    <span className="notice-faq__mark notice-faq__mark--question ft-22b ink500">Q</span>

                    <span className="notice-faq__question-text ft-28b ink500">{faq.question}</span>

                    <Icon className="notice-faq__chevron ink500" name="angle-down" aria-hidden="true" />

                  </button>

                  <div className="notice-faq__answer-wrap" aria-hidden={!isOpen}>

                    <div className="notice-faq__answer">

                      <span className="notice-faq__mark notice-faq__mark--answer ft-22b ink500">A.</span>

                      <p className="notice-faq__answer-text ft-22r ink500">{faq.answer}</p>

                    </div>

                  </div>

                </li>

              );

            })}

          </ul>

        </div>

      </section>

      <Footer />

    </main>

  );

}



export default NoticePage;

