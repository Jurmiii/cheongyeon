import { useState } from "react";

import subSymbol from "../../assets/images/01main/subsymbol.svg";
import { Footer, Header, Icon } from "../../components/common";
import { faqs } from "../../data/faqs";
import "./FaqPage.scss";

function FaqPage() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const handleFaqToggle = (faqId: number) => {
    setOpenFaqId((currentId) => (currentId === faqId ? null : faqId));
  };

  return (
    <main className="faq-page">
      <div className="faq-page__header">
        <Header />
      </div>

      <section className="faq-kv" aria-label="자주 묻는 질문 키비주얼">
        <div className="faq-kv__grid">
          <h1 className="faq-kv__title ft-64r ink500">자주 묻는 질문</h1>
          <img className="faq-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
          <p className="faq-kv__description ft-28r ink500">
            청연 이용에 필요한 궁금한 내용을
            <br />
            한눈에 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      <section className="faq-content" aria-label="자주 묻는 질문 목록">
        <div className="faq-content__grid">
          <h2 className="faq-content__title ft-48b ink500">질문 목록</h2>

          <ul className="faq-content__list">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <li
                  className={["faq-content__item", isOpen && "faq-content__item--open"].filter(Boolean).join(" ")}
                  key={faq.id}
                >
                  <button
                    className="faq-content__question"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => handleFaqToggle(faq.id)}
                  >
                    <span className="faq-content__mark faq-content__mark--question ft-28b ink500">Q</span>
                    <span className="faq-content__question-text ft-28b ink500">{faq.question}</span>
                    <Icon className="faq-content__chevron ink500" name="angle-down" aria-hidden="true" />
                  </button>

                  <div className="faq-content__answer-wrap" aria-hidden={!isOpen}>
                    <div className="faq-content__answer">
                      <span className="faq-content__mark faq-content__mark--answer ft-22b ink500">A.</span>
                      <p className="faq-content__answer-text ft-22r ink500">{faq.answer}</p>
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

export default FaqPage;
