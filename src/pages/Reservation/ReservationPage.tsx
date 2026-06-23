import { useMemo, useState } from "react";

import { Button, Footer, Header, Icon, Input } from "../../components/common";
import ReservationCalendar from "./ReservationCalendar";
import {
  RESERVATION_CLASSES_PER_PAGE,
  cardCompanies,
  installmentPlans,
  reservationBranches,
  reservationClasses,
  reservationNoticeSections,
  reservationTimeSlots,
  type CardCompany,
  type InstallmentPlan,
  type ReservationBranch,
  type ReservationTimeSlot,
} from "../../data/reservationClasses";
import "./ReservationPage.scss";

type PaymentMethod = "card" | "easy";

type PaymentDropdown = "cardCompany" | "installment" | null;

function ReservationPage() {
  const [selectedBranch, setSelectedBranch] = useState<ReservationBranch>(reservationBranches[0]);
  const [selectedClassId, setSelectedClassId] = useState<number>(reservationClasses[0].id);
  const [classPage, setClassPage] = useState(1);
  const [selectedTime, setSelectedTime] = useState<ReservationTimeSlot>(reservationTimeSlots[0]);
  const [guestCount, setGuestCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedCardCompany, setSelectedCardCompany] = useState<CardCompany | null>(null);
  const [selectedInstallment, setSelectedInstallment] = useState<InstallmentPlan>("일시불");
  const [openPaymentDropdown, setOpenPaymentDropdown] = useState<PaymentDropdown>(null);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const totalClassPages = Math.ceil(reservationClasses.length / RESERVATION_CLASSES_PER_PAGE);

  const paginatedClasses = useMemo(() => {
    const startIndex = (classPage - 1) * RESERVATION_CLASSES_PER_PAGE;
    return reservationClasses.slice(startIndex, startIndex + RESERVATION_CLASSES_PER_PAGE);
  }, [classPage]);

  const handleGuestDecrease = () => {
    setGuestCount((count) => Math.max(1, count - 1));
  };

  const handleGuestIncrease = () => {
    setGuestCount((count) => Math.min(4, count + 1));
  };

  const handlePaymentDropdownToggle = (dropdown: PaymentDropdown) => {
    setOpenPaymentDropdown((current) => (current === dropdown ? null : dropdown));
  };

  const handleCardCompanySelect = (company: CardCompany) => {
    setSelectedCardCompany(company);
    setOpenPaymentDropdown(null);
  };

  const handleInstallmentSelect = (plan: InstallmentPlan) => {
    setSelectedInstallment(plan);
    setOpenPaymentDropdown(null);
  };

  const cardCompanyLabel = selectedCardCompany ?? "카드사를 선택해주세요";

  return (
    <main className="reservation-page">
      <div className="reservation-page__header">
        <Header />
      </div>

      <section className="reservation-hero" aria-label="예약하기 안내">
        <div className="reservation-hero__grid">
          <h1 className="reservation-hero__title ft-48b ink500">예약하기</h1>
          <p className="reservation-hero__description ft-28r ink500">
            원하시는 지점과 클래스를 고르고, 차 한 잔의 시간을 예약하세요.
          </p>
        </div>
      </section>

      <section className="reservation-form" aria-label="예약 정보 입력">
        <div className="reservation-form__grid">
          <div className="reservation-form__section">
            <h2 className="reservation-form__label ft-18b ink500">* 지점 선택</h2>
            <div className="reservation-form__branch-list" role="radiogroup" aria-label="지점 선택">
              {reservationBranches.map((branch) => (
                <button
                  className={[
                    "reservation-form__branch",
                    "ft-18r",
                    "ink500",
                    branch === selectedBranch && "reservation-form__branch--active",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={branch}
                  type="button"
                  role="radio"
                  aria-checked={branch === selectedBranch}
                  onClick={() => setSelectedBranch(branch)}
                >
                  {branch}
                </button>
              ))}
            </div>
          </div>

          <div className="reservation-form__row">
            <div className="reservation-form__field">
              <label className="reservation-form__label ft-18b ink500" htmlFor="reservation-name">
                * 예약자명
              </label>
              <Input id="reservation-name" state="in1" placeholder="이름을 입력하세요" />
            </div>
            <div className="reservation-form__field">
              <label className="reservation-form__label ft-18b ink500" htmlFor="reservation-phone">
                * 연락처
              </label>
              <Input id="reservation-phone" state="in1" placeholder="휴대폰 번호를 입력하세요" type="tel" />
            </div>
          </div>
        </div>
      </section>

      <section className="reservation-classes" aria-label="클래스 선택">
        <div className="reservation-classes__grid">
          <h2 className="reservation-form__label ft-18b ink500">* 클래스 선택</h2>
          <ul className="reservation-classes__list">
            {paginatedClasses.map((classItem) => {
              const isSelected = selectedClassId === classItem.id;

              return (
                <li className="reservation-class-card" key={classItem.id}>
                  <div
                    className={[
                      "reservation-class-card__image-wrap",
                      classItem.imageOverlay === "dark" && "reservation-class-card__image-wrap--dark",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <img className="reservation-class-card__image" src={classItem.image} alt="" />
                    <span className="reservation-class-card__badge ft-14b han200">{classItem.badge}</span>
                  </div>
                  <div className="reservation-class-card__body">
                    <h3 className="reservation-class-card__title ft-22b ink400">{classItem.title}</h3>
                    <div className="reservation-class-card__description ft-18r ink400">
                      {classItem.description.split("\n").map((line, lineIndex) => (
                        <p key={`${classItem.id}-${lineIndex}`}>{line}</p>
                      ))}
                    </div>
                    <ul className="reservation-class-card__meta ft-16r ink400">
                      <li>
                        <Icon name="clock" aria-hidden="true" />
                        <span>{classItem.duration}</span>
                      </li>
                      <li>
                        <Icon name="user" aria-hidden="true" />
                        <span>{classItem.capacity}</span>
                      </li>
                      <li>
                        <Icon name="won-circle" aria-hidden="true" />
                        <span>{classItem.price}</span>
                      </li>
                    </ul>
                    <button
                      className={[
                        "reservation-class-card__select",
                        "ft-16b",
                        isSelected && "reservation-class-card__select--active",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedClassId(classItem.id)}
                    >
                      {isSelected ? "선택됨" : "선택하기"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <nav className="reservation-classes__pagination" aria-label="클래스 페이지">
            <button
              className="reservation-classes__page-arrow ft-22b ink500"
              type="button"
              aria-label="이전 클래스 목록"
              disabled={classPage === 1}
              onClick={() => setClassPage((page) => Math.max(1, page - 1))}
            >
              {"<"}
            </button>
            <p className="reservation-classes__page-indicator ft-22r ink500">
              {classPage}/{totalClassPages}
            </p>
            <button
              className="reservation-classes__page-arrow ft-22b ink500"
              type="button"
              aria-label="다음 클래스 목록"
              disabled={classPage === totalClassPages}
              onClick={() => setClassPage((page) => Math.min(totalClassPages, page + 1))}
            >
              {">"}
            </button>
          </nav>
        </div>
      </section>

      <section className="reservation-schedule" aria-label="날짜 및 시간 선택">
        <div className="reservation-schedule__grid">
          <div className="reservation-schedule__calendar-wrap">
            <h2 className="reservation-form__label ft-18b ink500">* 날짜 선택</h2>
            <div className="reservation-schedule__calendar">
              <ReservationCalendar />
            </div>
          </div>
          <div className="reservation-schedule__options">
            <div className="reservation-schedule__times">
              <h2 className="reservation-form__label ft-18b ink500">* 시간 선택</h2>
              <div className="reservation-schedule__time-grid" role="radiogroup" aria-label="시간 선택">
                {reservationTimeSlots.map((time) => (
                  <button
                    className={[
                      "reservation-schedule__time",
                      "ft-14b",
                      "ink500",
                      time === selectedTime && "reservation-schedule__time--active",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={time}
                    type="button"
                    role="radio"
                    aria-checked={time === selectedTime}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="reservation-schedule__guests">
              <h2 className="reservation-form__label ft-18b ink500">* 인원 선택</h2>
              <div className="reservation-schedule__counter">
                <button
                  className="reservation-schedule__counter-btn"
                  type="button"
                  aria-label="인원 감소"
                  onClick={handleGuestDecrease}
                >
                  <span aria-hidden="true">−</span>
                </button>
                <span className="reservation-schedule__counter-value ft-14b ink500">{guestCount}명</span>
                <button
                  className="reservation-schedule__counter-btn"
                  type="button"
                  aria-label="인원 증가"
                  onClick={handleGuestIncrease}
                >
                  <span aria-hidden="true">+</span>
                </button>
              </div>
              <p className="reservation-schedule__guest-note ft-18r ink300">
                한 클래스 최대 4인까지 예약 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="reservation-request" aria-label="요청사항">
        <div className="reservation-request__grid">
          <h2 className="reservation-request__title ft-28b ink500">요청사항 (선택)</h2>
          <textarea
            className="reservation-request__textarea ft-22r"
            placeholder="특이사항이나 요청사항이 있으시면 입력해주세요."
          />
        </div>
      </section>

      <section className="reservation-payment" aria-label="결제수단">
        <div className="reservation-payment__grid">
          <h2 className="reservation-payment__title ft-36b ink500">결제수단</h2>
          <div className="reservation-payment__tabs" role="tablist" aria-label="결제 방식">
            <button
              className={[
                "reservation-payment__tab",
                "ft-22b",
                paymentMethod === "card" && "reservation-payment__tab--active",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              role="tab"
              aria-selected={paymentMethod === "card"}
              onClick={() => {
                setPaymentMethod("card");
                setOpenPaymentDropdown(null);
              }}
            >
              신용카드
            </button>
            <button
              className={[
                "reservation-payment__tab",
                "ft-22b",
                paymentMethod === "easy" && "reservation-payment__tab--active",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              role="tab"
              aria-selected={paymentMethod === "easy"}
              onClick={() => {
                setPaymentMethod("easy");
                setOpenPaymentDropdown(null);
              }}
            >
              간편결제
            </button>
          </div>
          <div className="reservation-payment__selects">
            <div
              className={[
                "reservation-payment__select-wrap",
                openPaymentDropdown === "cardCompany" && "reservation-payment__select-wrap--open",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                className="reservation-payment__select ft-22b ink500"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openPaymentDropdown === "cardCompany"}
                disabled={paymentMethod !== "card"}
                onClick={() => handlePaymentDropdownToggle("cardCompany")}
              >
                <span className="reservation-payment__select-label">{cardCompanyLabel}</span>
                <Icon className="reservation-payment__select-icon" name="angle-down" aria-hidden="true" />
              </button>
              <ul className="reservation-payment__select-menu" role="listbox" aria-label="카드사 선택">
                {cardCompanies.map((company) => (
                  <li key={company}>
                    <button
                      className={[
                        "reservation-payment__select-option",
                        "ft-18r",
                        "ink500",
                        company === selectedCardCompany && "reservation-payment__select-option--active",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      role="option"
                      aria-selected={company === selectedCardCompany}
                      onClick={() => handleCardCompanySelect(company)}
                    >
                      {company}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={[
                "reservation-payment__select-wrap",
                openPaymentDropdown === "installment" && "reservation-payment__select-wrap--open",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                className="reservation-payment__select ft-22b ink500"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openPaymentDropdown === "installment"}
                disabled={paymentMethod !== "card"}
                onClick={() => handlePaymentDropdownToggle("installment")}
              >
                <span className="reservation-payment__select-label">{selectedInstallment}</span>
                <Icon className="reservation-payment__select-icon" name="angle-down" aria-hidden="true" />
              </button>
              <ul className="reservation-payment__select-menu" role="listbox" aria-label="할부 선택">
                {installmentPlans.map((plan) => (
                  <li key={plan}>
                    <button
                      className={[
                        "reservation-payment__select-option",
                        "ft-18r",
                        "ink500",
                        plan === selectedInstallment && "reservation-payment__select-option--active",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      role="option"
                      aria-selected={plan === selectedInstallment}
                      onClick={() => handleInstallmentSelect(plan)}
                    >
                      {plan}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <label className="reservation-payment__remember ft-18r ink500">
            <input
              className="reservation-payment__checkbox"
              type="checkbox"
              checked={savePaymentMethod}
              onChange={(event) => setSavePaymentMethod(event.target.checked)}
            />
            선택한 결제 수단을 다음에도 사용
          </label>
          <div className="reservation-payment__actions">
            <Button className="reservation-payment__action reservation-payment__action--edit" variant="btn2">
              예약변경
            </Button>
            <Button className="reservation-payment__action reservation-payment__action--submit" variant="btn1">
              예약하기
            </Button>
          </div>
          <div className="reservation-notice">
            <button
              className="reservation-notice__toggle"
              type="button"
              aria-expanded={isNoticeOpen}
              onClick={() => setIsNoticeOpen((open) => !open)}
            >
              <span className="reservation-notice__toggle-head">
                <span className="reservation-notice__asterisk ft-22b ink500" aria-hidden="true">
                  *
                </span>
                <span className="reservation-notice__toggle-text ft-22b ink500">예약 전 꼭 확인해주세요</span>
              </span>
              <Icon
                className={["reservation-notice__chevron", isNoticeOpen && "reservation-notice__chevron--open"]
                  .filter(Boolean)
                  .join(" ")}
                name="angle-down"
                aria-hidden="true"
              />
            </button>
            <div className="reservation-notice__content-wrap" aria-hidden={!isNoticeOpen}>
              <div className="reservation-notice__content">
                {reservationNoticeSections.map((section) => (
                  <div className="reservation-notice__column" key={section.title}>
                    <h3 className="reservation-notice__column-title ft-18r">{section.displayTitle}</h3>
                    <ul className="reservation-notice__list ft-16r">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default ReservationPage;
