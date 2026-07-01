import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, Calendar, Footer, Header, Input } from "../../components/common";
import { reservationTimeSlots, type ReservationTimeSlot } from "../../data/reservationClasses";
import { useReservations } from "../../hooks/useReservations";
import { useUserProfile } from "../../hooks/useUserProfile";
import { formatReservationSchedule } from "../../utils/reservationFormat";
import MyPageCancelModal from "../MyPage/MyPageCancelModal";
import "../Reservation/ReservationPage.scss";
import "./ReservationEditPage.scss";

const DEFAULT_CLASS_TITLE = "맑은 녹차 다도 클래스";

function isReservationTimeSlot(value: string): value is ReservationTimeSlot {
  return (reservationTimeSlots as readonly string[]).includes(value);
}

function ReservationEditPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCancelMode = searchParams.get("mode") === "cancel";

  const { profile } = useUserProfile();
  const { upcomingReservation, cancelReservation } = useReservations();

  const [reservationName, setReservationName] = useState("");
  const [reservationPhone, setReservationPhone] = useState("");
  const [selectedTime, setSelectedTime] = useState<ReservationTimeSlot>(reservationTimeSlots[0]);
  const [guestCount, setGuestCount] = useState(1);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      setReservationName(profile.name);
      setReservationPhone(profile.phone);
    }
  }, [profile]);

  useEffect(() => {
    if (!upcomingReservation) {
      return;
    }

    if (isReservationTimeSlot(upcomingReservation.time)) {
      setSelectedTime(upcomingReservation.time);
    }

    setGuestCount(upcomingReservation.guestCount);
  }, [upcomingReservation]);

  const classTitle = upcomingReservation?.classTitle ?? DEFAULT_CLASS_TITLE;
  const scheduleLabel = upcomingReservation
    ? formatReservationSchedule(upcomingReservation.date, upcomingReservation.time)
    : `${formatReservationSchedule("2026-07-10", selectedTime)}`;

  const goBackToMyPage = () => {
    navigate("/mypage");
  };

  const handleConfirmCancel = () => {
    if (upcomingReservation) {
      cancelReservation(upcomingReservation.id);
    }

    navigate("/mypage");
  };

  const handleGuestDecrease = () => {
    setGuestCount((count) => Math.max(1, count - 1));
  };

  const handleGuestIncrease = () => {
    setGuestCount((count) => Math.min(4, count + 1));
  };

  return (
    <main className="reservation-edit-page">
      <div className="reservation-edit-page__header">
        <Header />
      </div>

      <section className="reservation-edit" aria-label="예약 변경">
        <div className="reservation-edit__grid">
          <div className="reservation-edit__block">
            <h2 className="reservation-edit__title ft-36b ink500">예약자 정보</h2>
            <div className="reservation-form__row reservation-edit__row">
              <div className="reservation-form__field">
                <label className="reservation-form__label ft-18b ink500" htmlFor="edit-name">
                  예약자명
                </label>
                <Input
                  id="edit-name"
                  state="in1"
                  placeholder="이름을 입력하세요"
                  value={reservationName}
                  onChange={(event) => setReservationName(event.target.value)}
                />
              </div>
              <div className="reservation-form__field">
                <label className="reservation-form__label ft-18b ink500" htmlFor="edit-phone">
                  연락처
                </label>
                <Input
                  id="edit-phone"
                  state="in1"
                  type="tel"
                  placeholder="휴대폰 번호를 입력하세요"
                  value={reservationPhone}
                  onChange={(event) => setReservationPhone(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="reservation-edit__block">
            <h2 className="reservation-edit__title ft-36b ink500">예약 일정</h2>
            <p className="reservation-edit__subtitle ft-22r ink400">{classTitle}</p>

            <div className="reservation-schedule__grid">
              <div className="reservation-schedule__calendar-wrap">
                <div className="reservation-schedule__calendar">
                  <Calendar />
                </div>
              </div>
              <div className="reservation-schedule__options">
                <div className="reservation-schedule__times">
                  <h3 className="reservation-form__label ft-18b ink500">시간선택</h3>
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
                  <h3 className="reservation-form__label ft-18b ink500">인원선택</h3>
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
                </div>
              </div>
            </div>
          </div>

          <div className="reservation-edit__actions">
            {isCancelMode ? (
              <>
                <Button
                  className="reservation-edit__action reservation-edit__action--cancel"
                  variant="btn3"
                  type="button"
                  onClick={goBackToMyPage}
                >
                  돌아가기
                </Button>
                <Button
                  className="reservation-edit__action reservation-edit__action--cancel-confirm"
                  variant="btn3"
                  type="button"
                  onClick={() => setIsCancelModalOpen(true)}
                >
                  예약 취소하기
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="reservation-edit__action reservation-edit__action--cancel"
                  variant="btn3"
                  type="button"
                  onClick={goBackToMyPage}
                >
                  수정취소
                </Button>
                <Button
                  className="reservation-edit__action reservation-edit__action--submit"
                  variant="btn1"
                  type="button"
                  onClick={goBackToMyPage}
                >
                  변경 완료하기
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {isCancelModalOpen ? (
        <MyPageCancelModal
          classTitle={classTitle}
          schedule={scheduleLabel}
          onConfirm={handleConfirmCancel}
          onClose={() => setIsCancelModalOpen(false)}
        />
      ) : null}

      <Footer />
    </main>
  );
}

export default ReservationEditPage;
