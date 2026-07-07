import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Badge, Button, Footer, Icon, Input } from "../../components/common";
import PageMeta from "../../components/seo/PageMeta";
import { PAGE_SEO } from "../../data/pageSeoMeta";
import { useAuth } from "../../contexts/AuthContext";
import {
  RESERVATION_CLASSES_PER_PAGE,
  cardCompanies,
  installmentPlans,
  reservationBranches,
  reservationBranchAddresses,
  reservationClasses,
  reservationNoticeSections,
  reservationTimeSlots,
  type CardCompany,
  type InstallmentPlan,
  type ReservationBranch,
  type ReservationTimeSlot,
} from "../../data/reservationClasses";
import { useReservations } from "../../hooks/useReservations";
import { useModalOpen } from "../../hooks/useLockBodyScroll";
import { useUserProfile } from "../../hooks/useUserProfile";
import type { Reservation } from "../../types/mypage";
import type { StampBenefitId } from "../../data/stampBenefits";
import {
  STAMP_BENEFITS,
  calculateStampPricing,
  getAvailableStampBenefits,
  getStampBenefitById,
  parsePriceKrw,
} from "../../data/stampBenefits";
import { TEMP_LOGIN_ID } from "../../data/tempLoginCredentials";
import { addReservation, getBookedSeatsForSession, getRemainingSeatsForSession, updateReservation } from "../../utils/reservationStorage";
import {
  consumeStamps,
  getAvailableStampBalance,
  restoreStamps,
} from "../../utils/stampStorage";
import {
  getFirstAvailableReservationTimeSlot,
  canCancelReservation,
  isReservationTimeSlotPast,
} from "../../utils/reservationFormat";
import {
  clearReservationDraft,
  readReservationDraft,
  saveReservationDraft,
} from "../../utils/reservationDraftStorage";
import { formatPhoneInput, isValidPhone, isValidReserverName, normalizeReserverName, sanitizeReserverNameInput } from "../../utils/validation";
import {
  getActiveSeasonReservationClassId,
  isReservationClassSelectable,
  isSeasonReservationClassActive,
  parseSeasonReservationClassId,
} from "../../data/seasonClassReservation";
import ReservationStampCoupon from "./ReservationStampCoupon";
import "./ReservationPage.scss";

type PaymentMethod = "card" | "bank";

type PaymentDropdown = "cardCompany" | "installment" | null;

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

/** 무통장입금 계좌 정보 */
const BANK_ACCOUNT = {
  bank: "기업은행",
  number: "013-130672-01-011",
  holder: "(주)청연",
} as const;

type ReservationFieldErrors = {
  name?: string;
  phone?: string;
};

const branchAliases: Record<string, ReservationBranch> = {
  북촌점: "북촌 지점",
  하동점: "하동 지점",
  보성점: "보성 지점",
  강진점: "강진 지점",
};

function isReservationBranch(value: string): value is ReservationBranch {
  return (reservationBranches as readonly string[]).includes(value);
}

function isReservationTimeSlot(value: string): value is ReservationTimeSlot {
  return (reservationTimeSlots as readonly string[]).includes(value);
}

function isCardCompany(value: string): value is CardCompany {
  return (cardCompanies as readonly string[]).includes(value);
}

function isInstallmentPlan(value: string): value is InstallmentPlan {
  return (installmentPlans as readonly string[]).includes(value);
}

function getReservationBranch(value: string) {
  if (isReservationBranch(value)) {
    return value;
  }

  return branchAliases[value] ?? reservationBranches[0];
}

function getClassIdFromReservation(reservation: Reservation) {
  const exactMatch = reservationClasses.find((classItem) => classItem.title === reservation.classTitle);

  if (exactMatch) {
    return exactMatch.id;
  }

  if (reservation.classTitle.includes("블렌더")) {
    return reservationClasses.find((classItem) => classItem.title.includes("블랜더"))?.id ?? reservationClasses[0].id;
  }

  if (reservation.classTitle.includes("계절")) {
    return reservationClasses[0].id;
  }

  return reservationClasses[0].id;
}

function parseReservationDate(date: string, fallback: Date) {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }

  return startOfDay(parsed);
}

/** 계절 클래스(id 1~4)는 메인 사계절 호버 색상, 나머지는 "나만의 차" 색(--deep500) */
const CLASS_BADGE_SEASON_MODIFIER: Record<number, string> = {
  5: "reservation-class-card__badge--spring",
  6: "reservation-class-card__badge--summer",
  7: "reservation-class-card__badge--autumn",
  8: "reservation-class-card__badge--winter",
};

function getClassBadgeModifier(classId: number) {
  return CLASS_BADGE_SEASON_MODIFIER[classId] ?? "";
}

function getMaxGuestCount(classId: number) {
  const classItem = reservationClasses.find((item) => item.id === classId);
  return classItem?.maxGuests ?? 6;
}

function getReservationFieldErrors(name: string, phone: string): ReservationFieldErrors {
  const errors: ReservationFieldErrors = {};
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();

  if (!trimmedName) {
    errors.name = "예약자명을 입력해주세요.";
  } else if (!isValidReserverName(trimmedName)) {
    errors.name = "예약자명을 올바른 형식으로 입력해주세요.";
  }

  if (!trimmedPhone) {
    errors.phone = "연락처를 입력해주세요.";
  } else if (!isValidPhone(trimmedPhone)) {
    errors.phone = "연락처를 올바른 형식으로 입력해주세요.";
  }

  return errors;
}

function getInitialReservationTime(date: Date, now = new Date()) {
  return getFirstAvailableReservationTimeSlot(date, now) ?? reservationTimeSlots[reservationTimeSlots.length - 1];
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDateForStorage(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCalendarDates(year: number, month: number) {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  const dates: Array<Date | null> = [];

  for (let index = 0; index < firstDate.getDay(); index += 1) {
    dates.push(null);
  }

  for (let date = 1; date <= lastDate.getDate(); date += 1) {
    dates.push(new Date(year, month, date));
  }

  while (dates.length < 42) {
    dates.push(null);
  }

  return dates;
}

function isSameMonth(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}

function isPastDate(date: Date, today: Date) {
  return startOfDay(date).getTime() < startOfDay(today).getTime();
}

interface ReservationCalendarProps {
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
}

function ReservationCalendar({ selectedDate, onSelectedDateChange }: ReservationCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [currentDate, setCurrentDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    setCurrentDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const dates = useMemo(() => getCalendarDates(year, month), [year, month]);
  const isCurrentMonth = isSameMonth(currentDate, today);
  const canGoPrevMonth = !isCurrentMonth;

  const moveMonth = (offset: number) => {
    if (offset < 0 && !canGoPrevMonth) {
      return;
    }

    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1));
  };

  const handleDateSelect = (date: Date) => {
    if (isPastDate(date, today)) {
      return;
    }

    onSelectedDateChange(startOfDay(date));
  };

  return (
    <section className="calendar reservation-calendar" aria-label="예약 날짜 선택">
      <header className="calendar__header">
        <button
          className="calendar__nav"
          type="button"
          aria-label="이전 달"
          disabled={!canGoPrevMonth}
          onClick={() => moveMonth(-1)}
        >
          <Icon name="chevron-left" />
        </button>
        <h3 className="calendar__title ft-22b">
          {year}.{String(month + 1).padStart(2, "0")}
        </h3>
        <button className="calendar__nav" type="button" aria-label="다음 달" onClick={() => moveMonth(1)}>
          <Icon name="chevron-right" />
        </button>
      </header>
      <div className="calendar__weekdays">
        {weekdays.map((weekday) => (
          <span className="calendar__weekday ft-14b" key={weekday}>
            {weekday}
          </span>
        ))}
      </div>
      <div className="calendar__grid">
        {dates.map((date, index) => {
          const isSelected =
            date !== null &&
            date.getFullYear() === selectedDate.getFullYear() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getDate() === selectedDate.getDate();
          const isDisabled = date === null || isPastDate(date, today);

          return (
            <button
              className={[
                "calendar__day",
                isSelected && "calendar__day--selected",
                date !== null && isPastDate(date, today) && "calendar__day--past",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              disabled={isDisabled}
              key={`${date?.toISOString() ?? "blank"}-${index}`}
              onClick={() => date && handleDateSelect(date)}
            >
              {date?.getDate()}
            </button>
          );
        })}
      </div>
    </section>
  );
}

interface ReservationCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const RESERVATION_COMPLETE_NOTICES = [
  "예약 변경 및 취소는 수업 2일 전까지만 가능합니다.",
  "예약하신 클래스는 '마이 페이지'에서 확인하실 수 있습니다.",
] as const;

function ReservationCompleteModal({ isOpen, onClose, title = "예약완료" }: ReservationCompleteModalProps) {
  const navigate = useNavigate();

  useModalOpen(isOpen);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleGoHome = () => {
    onClose();
    navigate("/");
  };

  const handleGoMyPage = () => {
    onClose();
    navigate("/mypage");
  };

  return (
    <div className="reservation-complete-modal" role="presentation" onClick={onClose}>
      <div
        className="reservation-complete-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-complete-title"
        aria-describedby="reservation-complete-description"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="reservation-complete-modal__close"
          type="button"
          aria-label="닫기"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="reservation-complete-modal__icon-wrap" aria-hidden="true">
          <FontAwesomeIcon className="reservation-complete-modal__icon" icon={faCheck} />
        </div>

        <h2 className="reservation-complete-modal__title ft-40b ink500" id="reservation-complete-title">
          {title}
        </h2>
        <p className="reservation-complete-modal__description ft-16r ink500" id="reservation-complete-description">
          소중한 시간을 청연과 함께해 주셔서 감사합니다.
        </p>

        <div className="reservation-complete-modal__actions">
          <button
            className="reservation-complete-modal__action reservation-complete-modal__action--home ft-16b ink500"
            type="button"
            onClick={handleGoHome}
          >
            홈으로 가기
          </button>
          <button
            className="reservation-complete-modal__action reservation-complete-modal__action--mypage ft-16b"
            type="button"
            onClick={handleGoMyPage}
          >
            예약 내역 조회
          </button>
        </div>

        <div className="reservation-complete-modal__notice">
          <p className="reservation-complete-modal__notice-title ft-16b ink200">* 꼭 알아두세요!</p>
          <ul className="reservation-complete-modal__notice-list">
            {RESERVATION_COMPLETE_NOTICES.map((item) => (
              <li className="reservation-complete-modal__notice-item ft-14r ink200" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ReservationPage() {
  const { loginId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useUserProfile();
  const { reservations, upcomingReservation, stats } = useReservations();
  const [searchParams] = useSearchParams();
  const today = useMemo(() => startOfDay(new Date()), []);
  const isEditMode = searchParams.get("mode") === "edit";
  const editReservationId = searchParams.get("reservationId");
  const editReservation = useMemo(() => {
    if (!isEditMode) {
      return null;
    }

    return (
      reservations.find((reservation) => reservation.id === editReservationId) ??
      upcomingReservation ??
      null
    );
  }, [editReservationId, isEditMode, reservations, upcomingReservation]);
  const [selectedBranch, setSelectedBranch] = useState<ReservationBranch>(reservationBranches[0]);
  const [reservationName, setReservationName] = useState("");
  const [reservationPhone, setReservationPhone] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<number>(reservationClasses[0].id);
  const [classPage, setClassPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => today);
  const [scheduleNow, setScheduleNow] = useState(() => new Date());
  const [selectedTime, setSelectedTime] = useState<ReservationTimeSlot>(() => getInitialReservationTime(today));
  const [guestCount, setGuestCount] = useState(1);
  const [requestMessage, setRequestMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedCardCompany, setSelectedCardCompany] = useState<CardCompany | null>(null);
  const [selectedInstallment, setSelectedInstallment] = useState<InstallmentPlan>("일시불");
  const [openPaymentDropdown, setOpenPaymentDropdown] = useState<PaymentDropdown>(null);
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<ReservationFieldErrors>({});
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isCouponSheetOpen, setIsCouponSheetOpen] = useState(false);
  const [appliedStampBenefitId, setAppliedStampBenefitId] = useState<StampBenefitId | null>(null);
  const customerInfoRef = useRef<HTMLDivElement>(null);
  const isNameComposingRef = useRef(false);
  const initializedEditReservationIdRef = useRef<string | null>(null);
  const initializedFromQueryRef = useRef(false);
  const restoredDraftRef = useRef(false);

  const totalClassPages = Math.ceil(reservationClasses.length / RESERVATION_CLASSES_PER_PAGE);

  const paginatedClasses = useMemo(() => {
    const startIndex = (classPage - 1) * RESERVATION_CLASSES_PER_PAGE;
    return reservationClasses.slice(startIndex, startIndex + RESERVATION_CLASSES_PER_PAGE);
  }, [classPage]);

  const maxGuestCount = useMemo(() => getMaxGuestCount(selectedClassId), [selectedClassId]);
  const selectedClass = useMemo(
    () => reservationClasses.find((classItem) => classItem.id === selectedClassId) ?? reservationClasses[0],
    [selectedClassId],
  );
  const availableStamps = loginId ? getAvailableStampBalance(loginId, stats.stampCount) : 0;
  const isPracticeAccount = loginId === TEMP_LOGIN_ID;
  const availableStampBenefits = useMemo(
    () => (isPracticeAccount ? STAMP_BENEFITS : getAvailableStampBenefits(availableStamps)),
    [availableStamps, isPracticeAccount],
  );
  const unitPrice = useMemo(() => parsePriceKrw(selectedClass.price), [selectedClass.price]);
  const productAmount = useMemo(() => unitPrice * guestCount, [guestCount, unitPrice]);
  const pricing = useMemo(
    () => calculateStampPricing(productAmount, appliedStampBenefitId),
    [appliedStampBenefitId, productAmount],
  );
  const showStampCouponSection = !isEditMode;
  const isCouponDisabled = !loginId;
  const availableCouponCount = loginId ? availableStampBenefits.length : 0;
  const selectedDateKey = formatDateForStorage(selectedDate);

  const sessionAvailabilityByTime = useMemo(() => {
    return reservationTimeSlots.reduce<
      Record<ReservationTimeSlot, { bookedSeats: number; remainingSeats: number }>
    >((availabilityByTime, time) => {
      const sessionParams = {
        date: selectedDateKey,
        time,
        classTitle: selectedClass.title,
        branch: selectedBranch,
        sessionCapacity: maxGuestCount,
        excludeReservationId: editReservation?.id,
      };

      availabilityByTime[time] = {
        bookedSeats: getBookedSeatsForSession(sessionParams),
        remainingSeats: getRemainingSeatsForSession(sessionParams),
      };

      return availabilityByTime;
    }, {} as Record<ReservationTimeSlot, { bookedSeats: number; remainingSeats: number }>);
  }, [selectedBranch, selectedClass.title, selectedDateKey, editReservation?.id, maxGuestCount, reservations]);

  const selectedSessionAvailability = sessionAvailabilityByTime[selectedTime] ?? {
    bookedSeats: 0,
    remainingSeats: maxGuestCount,
  };
  const isSelectedTimePast = isReservationTimeSlotPast(selectedDate, selectedTime, scheduleNow);
  const selectedRemainingSeats = isSelectedTimePast ? 0 : selectedSessionAvailability.remainingSeats;
  const bookableGuestCount = Math.min(maxGuestCount, selectedRemainingSeats);
  const activeSeasonClassId = useMemo(
    () => getActiveSeasonReservationClassId(scheduleNow),
    [scheduleNow],
  );
  const editReservationClassId = useMemo(
    () => (editReservation ? getClassIdFromReservation(editReservation) : undefined),
    [editReservation],
  );

  const isClassSelectable = (classId: number) =>
    isReservationClassSelectable(classId, scheduleNow, editReservationClassId);
  const canEditReservation = !isEditMode || !editReservation
    ? true
    : canCancelReservation(editReservation.date, editReservation.time, scheduleNow);

  useEffect(() => {
    if (isEditMode || isClassSelectable(selectedClassId)) {
      return;
    }

    setSelectedClassId(activeSeasonClassId);
    setClassPage(Math.ceil(activeSeasonClassId / RESERVATION_CLASSES_PER_PAGE));
  }, [activeSeasonClassId, isEditMode, selectedClassId, scheduleNow, editReservationClassId]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setScheduleNow(new Date());
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isReservationTimeSlotPast(selectedDate, selectedTime, scheduleNow)) {
      return;
    }

    const nextTime = getFirstAvailableReservationTimeSlot(selectedDate, scheduleNow);
    if (nextTime) {
      setSelectedTime(nextTime);
    }
  }, [scheduleNow, selectedDate, selectedTime]);

  useEffect(() => {
    if (!isEditMode || !editReservation || canEditReservation) {
      return;
    }

    setValidationErrors(["예약 변경은 수업 시작 2일 전까지만 가능합니다."]);
  }, [canEditReservation, editReservation, isEditMode]);

  useEffect(() => {
    if (isEditMode || initializedFromQueryRef.current) {
      return;
    }

    const branchParam = searchParams.get("branch");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    const classIdParam = searchParams.get("classId");
    const hasQueryParams = Boolean(branchParam || dateParam || timeParam || classIdParam);

    if (!hasQueryParams) {
      initializedFromQueryRef.current = true;
      return;
    }

    if (branchParam) {
      setSelectedBranch(getReservationBranch(branchParam));
    }

    if (dateParam) {
      setSelectedDate(parseReservationDate(dateParam.replace(/\./g, "-"), today));
    }

    const resolvedDate = dateParam
      ? parseReservationDate(dateParam.replace(/\./g, "-"), today)
      : today;

    if (timeParam && isReservationTimeSlot(timeParam)) {
      if (!isReservationTimeSlotPast(resolvedDate, timeParam)) {
        setSelectedTime(timeParam);
      } else {
        const nextTime = getFirstAvailableReservationTimeSlot(resolvedDate);
        if (nextTime) {
          setSelectedTime(nextTime);
        }
      }
    } else if (dateParam) {
      const nextTime = getFirstAvailableReservationTimeSlot(resolvedDate);
      if (nextTime) {
        setSelectedTime(nextTime);
      }
    }

    const seasonClassId = parseSeasonReservationClassId(classIdParam);
    if (seasonClassId) {
      const resolvedSeasonClassId = isSeasonReservationClassActive(seasonClassId, today)
        ? seasonClassId
        : getActiveSeasonReservationClassId(today);
      setSelectedClassId(resolvedSeasonClassId);
      setClassPage(Math.ceil(resolvedSeasonClassId / RESERVATION_CLASSES_PER_PAGE));
    }

    initializedFromQueryRef.current = true;
  }, [isEditMode, searchParams, today]);

  useEffect(() => {
    if (!loginId || isEditMode || restoredDraftRef.current) {
      return;
    }

    const draft = readReservationDraft();

    if (!draft) {
      return;
    }

    restoredDraftRef.current = true;
    clearReservationDraft();

    setSelectedBranch(draft.selectedBranch);
    setReservationName(draft.reservationName);
    setReservationPhone(formatPhoneInput(draft.reservationPhone));
    setSelectedClassId(draft.selectedClassId);
    setClassPage(draft.classPage);
    setSelectedDate(parseReservationDate(draft.selectedDate, today));
    setSelectedTime(draft.selectedTime);
    setGuestCount(draft.guestCount);
    setRequestMessage(draft.requestMessage);
    setPaymentMethod(draft.paymentMethod);
    setSelectedCardCompany(draft.selectedCardCompany);
    setSelectedInstallment(draft.selectedInstallment);
    setSavePaymentMethod(draft.savePaymentMethod);
    setAppliedStampBenefitId(draft.appliedStampBenefitId);
    setValidationErrors([]);
    setFieldErrors({});
  }, [isEditMode, loginId, today]);

  useEffect(() => {
    if (isEditMode || !profile) {
      return;
    }

    setReservationName((current) => current || profile.name);
    setReservationPhone((current) => current || formatPhoneInput(profile.phone));
  }, [isEditMode, profile]);

  useEffect(() => {
    if (!isEditMode || !editReservation || initializedEditReservationIdRef.current === editReservation.id) {
      return;
    }

    const nextClassId = getClassIdFromReservation(editReservation);
    const nextMaxGuestCount = getMaxGuestCount(nextClassId);

    setSelectedBranch(getReservationBranch(editReservation.branch));
    setReservationName(editReservation.reserverName ?? profile?.name ?? "");
    setReservationPhone(formatPhoneInput(editReservation.reserverPhone ?? profile?.phone ?? ""));
    setSelectedClassId(nextClassId);
    setClassPage(Math.ceil(nextClassId / RESERVATION_CLASSES_PER_PAGE));
    setSelectedDate(parseReservationDate(editReservation.date, today));
    setSelectedTime(isReservationTimeSlot(editReservation.time) ? editReservation.time : reservationTimeSlots[0]);
    setGuestCount(Math.min(Math.max(1, editReservation.guestCount), nextMaxGuestCount));
    setRequestMessage(editReservation.requestMessage ?? "");
    setPaymentMethod(editReservation.paymentMethod ?? "card");
    setSelectedCardCompany(
      editReservation.cardCompany && isCardCompany(editReservation.cardCompany)
        ? editReservation.cardCompany
        : null,
    );
    setSelectedInstallment(
      editReservation.installmentPlan && isInstallmentPlan(editReservation.installmentPlan)
        ? editReservation.installmentPlan
        : "일시불",
    );
    setSavePaymentMethod(editReservation.savePaymentMethod ?? false);
    setValidationErrors([]);
    setFieldErrors({});
    initializedEditReservationIdRef.current = editReservation.id;
  }, [editReservation, isEditMode, profile, today]);

  useEffect(() => {
    setGuestCount((count) => Math.min(count, bookableGuestCount));
  }, [bookableGuestCount]);

  useEffect(() => {
    if (!appliedStampBenefitId) {
      return;
    }

    const benefit = getStampBenefitById(appliedStampBenefitId);

    if (!benefit) {
      setAppliedStampBenefitId(null);
    }
  }, [appliedStampBenefitId]);

  const handleCouponOpen = () => {
    if (isCouponDisabled) {
      return;
    }

    setIsCouponSheetOpen(true);
  };

  const handleCouponClose = () => {
    setIsCouponSheetOpen(false);
  };

  const handleApplyStampBenefit = (benefitId: StampBenefitId | null) => {
    if (!loginId) {
      return;
    }

    if (appliedStampBenefitId) {
      const previousBenefit = getStampBenefitById(appliedStampBenefitId);

      if (previousBenefit && !isPracticeAccount) {
        restoreStamps(loginId, previousBenefit.requiredStamps);
      }
    }

    if (!benefitId) {
      setAppliedStampBenefitId(null);
      setIsCouponSheetOpen(false);
      return;
    }

    const benefit = getStampBenefitById(benefitId);

    if (!benefit) {
      return;
    }

    if (!isPracticeAccount && availableStamps < benefit.requiredStamps) {
      return;
    }

    if (!isPracticeAccount) {
      consumeStamps(loginId, benefit.requiredStamps);
    }

    setAppliedStampBenefitId(benefitId);
    setIsCouponSheetOpen(false);
  };

  const handleGuestDecrease = () => {
    setGuestCount((count) => Math.max(1, count - 1));
  };

  const handleGuestIncrease = () => {
    setGuestCount((count) => Math.min(bookableGuestCount, count + 1));
  };

  const handlePaymentDropdownToggle = (dropdown: PaymentDropdown) => {
    setOpenPaymentDropdown((current) => (current === dropdown ? null : dropdown));
  };

  const handleCardCompanySelect = (company: CardCompany) => {
    setSelectedCardCompany(company);
    setOpenPaymentDropdown(null);
    setValidationErrors([]);
  };

  const handleInstallmentSelect = (plan: InstallmentPlan) => {
    setSelectedInstallment(plan);
    setOpenPaymentDropdown(null);
  };

  const validateCustomerFields = (name = reservationName, phone = reservationPhone) => {
    return getReservationFieldErrors(name, phone);
  };

  const handleNameBlur = () => {
    const normalizedName = normalizeReserverName(reservationName);

    if (normalizedName !== reservationName) {
      setReservationName(normalizedName);
    }

    const customerErrors = validateCustomerFields(normalizedName, reservationPhone);
    setFieldErrors((prev) => ({ ...prev, name: customerErrors.name }));
  };

  const handlePhoneBlur = () => {
    const formattedPhone = formatPhoneInput(reservationPhone);

    if (formattedPhone !== reservationPhone) {
      setReservationPhone(formattedPhone);
    }

    const customerErrors = validateCustomerFields(reservationName, formattedPhone);
    setFieldErrors((prev) => ({ ...prev, phone: customerErrors.phone }));
  };

  const validateReservation = () => {
    const errors: string[] = [];

    if (isEditMode && !editReservation) {
      errors.push("변경할 예약 정보를 찾을 수 없습니다.");
    }

    if (isEditMode && editReservation && !canCancelReservation(editReservation.date, editReservation.time, scheduleNow)) {
      errors.push("예약 변경은 수업 시작 2일 전까지만 가능합니다.");
    }

    if (!selectedBranch) {
      errors.push("지점을 선택해주세요.");
    }

    if (!reservationName.trim()) {
      errors.push("예약자명을 입력해주세요.");
    } else if (!isValidReserverName(reservationName)) {
      errors.push("예약자명을 올바른 형식으로 입력해주세요.");
    }

    if (!reservationPhone.trim()) {
      errors.push("연락처를 입력해주세요.");
    } else if (!isValidPhone(reservationPhone)) {
      errors.push("연락처를 올바른 형식으로 입력해주세요.");
    }

    if (!reservationClasses.some((classItem) => classItem.id === selectedClassId)) {
      errors.push("클래스를 선택해주세요.");
    } else if (!isClassSelectable(selectedClassId)) {
      errors.push("현재 시즌에 예약할 수 없는 클래스입니다. 다른 클래스를 선택해주세요.");
    }

    if (!selectedDate || startOfDay(selectedDate).getTime() < today.getTime()) {
      errors.push("날짜를 선택해주세요.");
    }

    if (!selectedTime) {
      errors.push("시간을 선택해주세요.");
    } else if (isReservationTimeSlotPast(selectedDate, selectedTime, scheduleNow)) {
      errors.push("이미 지난 시간은 예약할 수 없습니다. 다른 시간을 선택해주세요.");
    }

    if (guestCount < 1 || guestCount > bookableGuestCount) {
      errors.push(`인원은 1명에서 ${bookableGuestCount}명 사이로 선택해주세요.`);
    }

    if (selectedRemainingSeats < 1) {
      errors.push("선택한 시간의 잔여석이 없습니다. 다른 시간을 선택해주세요.");
    }

    if (!isEditMode && paymentMethod === "card" && !selectedCardCompany) {
      errors.push("카드사를 선택해주세요.");
    }

    return errors;
  };

  const handleReservationSubmit = () => {
    if (!loginId) {
      saveReservationDraft({
        selectedBranch,
        reservationName,
        reservationPhone,
        selectedClassId,
        classPage,
        selectedDate: formatDateForStorage(selectedDate),
        selectedTime,
        guestCount,
        requestMessage,
        paymentMethod,
        selectedCardCompany,
        selectedInstallment,
        savePaymentMethod,
        appliedStampBenefitId,
      });

      navigate("/login", {
        state: { redirectTo: `${location.pathname}${location.search}` },
      });
      return;
    }

    const errors = validateReservation();
    const nextFieldErrors = getReservationFieldErrors(reservationName, reservationPhone);
    setFieldErrors(nextFieldErrors);

    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsCompleteModalOpen(false);

      if (nextFieldErrors.name || nextFieldErrors.phone) {
        customerInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (isEditMode && editReservation && !canCancelReservation(editReservation.date, editReservation.time, scheduleNow)) {
      return;
    }

    setValidationErrors([]);
    setFieldErrors({});
    const nextReservation: Reservation = {
      id: editReservation?.id ?? `reservation-${Date.now()}`,
      userId: editReservation?.userId ?? (loginId as string),
      classTitle: selectedClass.title,
      branch: selectedBranch,
      location: selectedBranch,
      date: formatDateForStorage(selectedDate),
      time: selectedTime,
      guestCount,
      reserverName: reservationName.trim(),
      reserverPhone: reservationPhone.trim(),
      requestMessage: requestMessage.trim(),
      paymentMethod,
      cardCompany: paymentMethod === "card" ? selectedCardCompany : null,
      installmentPlan: paymentMethod === "card" ? selectedInstallment : undefined,
      savePaymentMethod,
      stampBenefitId: appliedStampBenefitId,
      productAmount: pricing.productAmount,
      discountAmount: pricing.discountAmount,
      finalAmount: pricing.finalAmount,
      status: editReservation?.status ?? "upcoming",
      image: selectedClass.image,
      createdAt: editReservation?.createdAt ?? new Date().toISOString(),
    };

    if (isEditMode && editReservation) {
      updateReservation(nextReservation.userId, editReservation.id, nextReservation);
    } else {
      addReservation(nextReservation);
    }

    clearReservationDraft();
    setIsCompleteModalOpen(true);
  };

  const cardCompanyLabel = selectedCardCompany ?? "카드사를 선택해주세요";

  return (
    <main className="reservation-page">
      <PageMeta {...(isEditMode ? PAGE_SEO.reservationEdit : PAGE_SEO.reservation)} />

      <section className="reservation-hero" aria-label="예약하기 안내">
        <div className="reservation-hero__grid">
          <h1 className="reservation-hero__title ft-32b ink500">{isEditMode ? "예약 변경" : "예약하기"}</h1>
          <p className="reservation-hero__description ft-18r ink500">
            {isEditMode ? (
              "기존 예약 정보를 확인하고 원하는 일정으로 변경하세요."
            ) : (
              <>
                원하시는 지점과 클래스를 고르고,
                <br className="reservation-hero__description-break" />
                차 한 잔의 시간을 예약하세요.
              </>
            )}
          </p>
          <div className="reservation-notice">
            <button
              className="reservation-notice__toggle"
              type="button"
              aria-expanded={isNoticeOpen}
              onClick={() => setIsNoticeOpen((open) => !open)}
            >
              <span className="reservation-notice__toggle-head">
                <span className="reservation-notice__asterisk ft-14b ink500" aria-hidden="true">
                  *
                </span>
                <span className="reservation-notice__toggle-text ft-14b ink500">
                  {isEditMode ? "예약 변경전 확인해주세요" : "예약 전 꼭 확인해주세요"}
                </span>
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

      <section className="reservation-form" aria-label="예약 정보 입력">
        <div className="reservation-form__grid">
          <div className="reservation-form__section">
            <h2 className="reservation-form__label ft-16b ink500">* 지점 선택</h2>
            <div className="reservation-form__branch-list" role="radiogroup" aria-label="지점 선택">
              {reservationBranches.map((branch) => (
                <button
                  className={[
                    "reservation-form__branch",
                    "ft-18b",
                    "ink500",
                    branch === selectedBranch && "reservation-form__branch--active",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={branch}
                  type="button"
                  role="radio"
                  aria-checked={branch === selectedBranch}
                  onClick={() => {
                    setSelectedBranch(branch);
                    setValidationErrors([]);
                  }}
                >
                  {branch}
                </button>
              ))}
            </div>
            <p className="reservation-form__branch-address ft-18r ink300">
              <Icon className="reservation-form__branch-address-icon" name="location-dot" aria-hidden="true" />
              <span>{reservationBranchAddresses[selectedBranch]}</span>
            </p>
          </div>

          <div className="reservation-form__row" ref={customerInfoRef}>
            <div className="reservation-form__field">
              <label className="reservation-form__label ft-16b ink500" htmlFor="reservation-name">
                * 예약자명
              </label>
              <Input
                id="reservation-name"
                state={fieldErrors.name ? "in3" : "in1"}
                placeholder="아이디를 입력하세요"
                value={reservationName}
                maxLength={20}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "reservation-name-error" : undefined}
                onCompositionStart={() => {
                  isNameComposingRef.current = true;
                }}
                onCompositionEnd={(event) => {
                  isNameComposingRef.current = false;
                  const nextName = sanitizeReserverNameInput(event.currentTarget.value);
                  setReservationName(nextName);
                  setValidationErrors([]);
                  setFieldErrors((prev) => ({ ...prev, name: undefined }));
                }}
                onChange={(event) => {
                  const nextName = isNameComposingRef.current
                    ? event.target.value
                    : sanitizeReserverNameInput(event.target.value);
                  setReservationName(nextName);
                  setValidationErrors([]);
                  setFieldErrors((prev) => ({ ...prev, name: undefined }));
                }}
                onBlur={handleNameBlur}
              />
              {fieldErrors.name ? (
                <p className="reservation-form__error ft-14r" id="reservation-name-error" role="alert">
                  {fieldErrors.name}
                </p>
              ) : null}
            </div>
            <div className="reservation-form__field">
              <label className="reservation-form__label ft-16b ink500" htmlFor="reservation-phone">
                * 연락처
              </label>
              <Input
                id="reservation-phone"
                state={fieldErrors.phone ? "in3" : "in1"}
                placeholder="휴대폰 번호를 입력하세요"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={reservationPhone}
                maxLength={13}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "reservation-phone-error" : undefined}
                onChange={(event) => {
                  const nextPhone = formatPhoneInput(event.target.value);
                  setReservationPhone(nextPhone);
                  setValidationErrors([]);
                  setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                onBlur={handlePhoneBlur}
              />
              {fieldErrors.phone ? (
                <p className="reservation-form__error ft-14r" id="reservation-phone-error" role="alert">
                  {fieldErrors.phone}
                </p>
              ) : null}
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
              const isSelectable = isClassSelectable(classItem.id);

              return (
                <li
                  className={[
                    "reservation-class-card",
                    !isSelectable && "reservation-class-card--inactive",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={classItem.id}
                >
                  <div
                    className={[
                      "reservation-class-card__image-wrap",
                      classItem.imageOverlay === "dark" && "reservation-class-card__image-wrap--dark",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <img className="reservation-class-card__image" src={classItem.image} alt="" />
                    <Badge
                      className={[
                        "reservation-class-card__badge",
                        "ft-14b",
                        getClassBadgeModifier(classItem.id),
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      variant="confirmed"
                    >
                      {classItem.badge}
                    </Badge>
                  </div>
                  <div className="reservation-class-card__body">
                    <h3 className="reservation-class-card__title ft-22b ink400">{classItem.title}</h3>
                    <div className="reservation-class-card__description ft-16r ink400">
                      {classItem.description.split("\n").map((line, lineIndex) => (
                        <p key={`${classItem.id}-${lineIndex}`}>{line}</p>
                      ))}
                    </div>
                    <ul className="reservation-class-card__meta ft-14r ink400">
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
                        "ft-18b",
                        isSelected && "reservation-class-card__select--active",
                        !isSelectable && "reservation-class-card__select--disabled",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      aria-pressed={isSelected}
                      disabled={!isSelectable}
                      onClick={() => {
                        if (!isSelectable) {
                          return;
                        }

                        const nextMaxGuestCount = getMaxGuestCount(classItem.id);
                        setSelectedClassId(classItem.id);
                        setGuestCount((count) => Math.min(count, nextMaxGuestCount));
                        setValidationErrors([]);
                      }}
                    >
                      {!isSelectable ? "준비중" : isSelected ? "선택 완료" : "선택하기"}
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
            <h2 className="reservation-form__label ft-16b ink500">* 날짜 선택</h2>
            <div className="reservation-schedule__calendar">
              <ReservationCalendar
                selectedDate={selectedDate}
                onSelectedDateChange={(date) => {
                  setSelectedDate(date);
                  setValidationErrors([]);
                  const nextTime = getFirstAvailableReservationTimeSlot(date, scheduleNow);
                  if (nextTime) {
                    setSelectedTime(nextTime);
                  }
                }}
              />
            </div>
          </div>
          <div className="reservation-schedule__options">
            <div className="reservation-schedule__times">
              <h2 className="reservation-form__label ft-16b ink500">* 시간 선택</h2>
              <div className="reservation-schedule__time-grid" role="radiogroup" aria-label="시간 선택">
                {reservationTimeSlots.map((time) => {
                  const { bookedSeats, remainingSeats } = sessionAvailabilityByTime[time] ?? {
                    bookedSeats: 0,
                    remainingSeats: 0,
                  };
                  const isPast = isReservationTimeSlotPast(selectedDate, time, scheduleNow);
                  const isFull = bookedSeats >= maxGuestCount || remainingSeats < 1;
                  const isTimeDisabled = isPast || isFull;

                  return (
                    <div className="reservation-schedule__time-slot" key={time}>
                      <button
                        className={[
                          "reservation-schedule__time",
                          "ft-14b",
                          "ink500",
                          time === selectedTime && !isTimeDisabled && "reservation-schedule__time--active",
                          isTimeDisabled && "reservation-schedule__time--disabled",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        type="button"
                        role="radio"
                        aria-checked={time === selectedTime && !isTimeDisabled}
                        aria-disabled={isTimeDisabled}
                        disabled={isTimeDisabled}
                        onClick={() => {
                          setSelectedTime(time);
                          setValidationErrors([]);
                        }}
                      >
                        {time}
                      </button>
                      <span className="reservation-schedule__time-occupancy">
                        {isPast ? "마감" : `예약현황: ${bookedSeats}/${maxGuestCount}석`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="reservation-schedule__guests">
              <h2 className="reservation-form__label ft-16b ink500">* 인원 선택</h2>
              <p className="reservation-schedule__guest-note">
                {bookableGuestCount < maxGuestCount
                  ? `선택한 시간 기준 최대 ${bookableGuestCount}명까지 예약 가능합니다.`
                  : `한 클래스 최대 ${maxGuestCount}인까지 예약 가능합니다.`}
              </p>
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
                  disabled={guestCount >= bookableGuestCount}
                  onClick={handleGuestIncrease}
                >
                  <span aria-hidden="true">+</span>
                </button>
              </div>
            </div>
            <div className="reservation-request" aria-label="요청사항">
              <h2 className="reservation-request__title reservation-form__label ft-16b ink500">요청사항 (선택)</h2>
              <textarea
                className="reservation-request__textarea ft-16r"
                placeholder="특이사항이나 요청사항이 있으시면 입력해주세요."
                value={requestMessage}
                onChange={(event) => setRequestMessage(event.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="reservation-payment" aria-label="결제">
        <div className="reservation-payment__grid">
          <div
            className={[
              "reservation-payment__stage",
              isEditMode && "reservation-payment__stage--single",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div
              className={[
                "reservation-payment__layout",
                isEditMode && "reservation-payment__layout--single",
                !isEditMode && paymentMethod === "card" && "reservation-payment__layout--card-match",
              ]
                .filter(Boolean)
                .join(" ")}
            >
            {showStampCouponSection ? (
              <div className="reservation-payment__checkout">
                <ReservationStampCoupon
                  isOpen={isCouponSheetOpen}
                  isDisabled={isCouponDisabled}
                  availableStamps={availableStamps}
                  availableCouponCount={availableCouponCount}
                  appliedBenefitId={appliedStampBenefitId}
                  isPracticeAccount={isPracticeAccount}
                  productAmount={productAmount}
                  pricing={pricing}
                  onOpen={handleCouponOpen}
                  onClose={handleCouponClose}
                  onApply={handleApplyStampBenefit}
                />
              </div>
            ) : null}

            <div className="reservation-payment__method">
              <div className="reservation-payment__method-card">
                <h2 className="reservation-payment__title ft-18b ink500">결제 방법</h2>
                <div className="reservation-payment__tabs" role="tablist" aria-label="결제 방식">
                  <button
                    className={[
                      "reservation-payment__tab",
                      "ft-16b",
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
                      "ft-16b",
                      paymentMethod === "bank" && "reservation-payment__tab--active",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    type="button"
                    role="tab"
                    aria-selected={paymentMethod === "bank"}
                    onClick={() => {
                      setPaymentMethod("bank");
                      setOpenPaymentDropdown(null);
                    }}
                  >
                    무통장입금
                  </button>
                </div>
                {paymentMethod === "card" ? (
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
                        className="reservation-payment__select ft-16b ink500"
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
                        "reservation-payment__select-wrap--installment",
                        openPaymentDropdown === "installment" && "reservation-payment__select-wrap--open",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <button
                        className="reservation-payment__select ft-16b ink500"
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
                ) : (
                  <div className="reservation-payment__bank" role="group" aria-label="무통장입금 계좌 안내">
                    <div className="reservation-payment__bank-messages">
                      <p className="reservation-payment__bank-guide ft-22r ink500">
                        아래 계좌로 입금해주시면 예약이 확정됩니다.
                      </p>
                      <p className="reservation-payment__bank-notice ft-14r ink300">
                        <span className="reservation-payment__bank-notice-mark" aria-hidden="true">
                          *
                        </span>{" "}
                        예약 확인을 위해 입금자명은 반드시 예약자명과 동일하게 입력해 주세요.
                      </p>
                    </div>
                    <dl className="reservation-payment__bank-info">
                      <div className="reservation-payment__bank-row">
                        <dt className="reservation-payment__bank-term ft-18r ink300">입금 은행</dt>
                        <dd className="reservation-payment__bank-desc ft-22b ink500">{BANK_ACCOUNT.bank}</dd>
                      </div>
                      <div className="reservation-payment__bank-row">
                        <dt className="reservation-payment__bank-term ft-18r ink300">계좌번호</dt>
                        <dd className="reservation-payment__bank-desc ft-22b ink500">{BANK_ACCOUNT.number}</dd>
                      </div>
                      <div className="reservation-payment__bank-row">
                        <dt className="reservation-payment__bank-term ft-18r ink300">예금주</dt>
                        <dd className="reservation-payment__bank-desc ft-22b ink500">{BANK_ACCOUNT.holder}</dd>
                      </div>
                    </dl>
                  </div>
                )}
                <label className="reservation-payment__remember ft-14r ink500">
                  <input
                    className="reservation-payment__checkbox"
                    type="checkbox"
                    checked={savePaymentMethod}
                    onChange={(event) => setSavePaymentMethod(event.target.checked)}
                  />
                  선택한 결제 수단을 다음에도 사용
                </label>
              </div>
            </div>
          </div>

          {validationErrors.length > 0 && (
            <div className="reservation-payment__errors" role="alert" aria-live="polite">
              <p className="reservation-payment__errors-title ft-18b">아래 항목을 확인해주세요.</p>
              <ul className="reservation-payment__errors-list ft-16r">
                {validationErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="reservation-payment__actions">
            <Button
              className="reservation-payment__action reservation-payment__action--submit ft-22b"
              variant="btn1"
              type="button"
              disabled={isEditMode && !canEditReservation}
              onClick={handleReservationSubmit}
            >
              {isEditMode ? "변경 완료하기" : "예약하기"}
            </Button>
          </div>
          </div>
        </div>
      </section>

      <ReservationCompleteModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        title={isEditMode ? "예약변경 완료" : "예약완료"}
      />

      <Footer />
    </main>
  );
}

export default ReservationPage;
