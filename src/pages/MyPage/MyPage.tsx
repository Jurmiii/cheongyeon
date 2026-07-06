import { Fragment, useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";



import myPageBg from "../../assets/images/13my-page/my-bg.webp";

import myIcon from "../../assets/images/13my-page/my-icon.svg";

import { Badge, Button, CustomModal, Footer, Header, Icon, Input, TeaClassContentBox } from "../../components/common";

import { useReservations } from "../../hooks/useReservations";

import { useUserProfile } from "../../hooks/useUserProfile";

import type { ProfileFormValues, Reservation } from "../../types/mypage";

import {

  calculateDDayLabel,

  canCancelReservation,

  formatGuestCount,

  formatReservationDate,

  formatReservationSchedule,

} from "../../utils/reservationFormat";

import MyPageCancelConfirmModal from "./MyPageCancelConfirmModal";
import MyPageCancelSuccessModal from "./MyPageCancelSuccessModal";
import { getHistoryBadgeLabel, getHistoryBadgeVariant } from "./myPageHistoryBadges";

import StampModal from "../Stamp/StampModal";

import "./MyPage.scss";



const HISTORY_PER_PAGE = 3;



const profileFieldConfig = [

  { id: "phone", label: "연락처" },

  { id: "email", label: "이메일" },

] as const;



const emptyProfileForm: ProfileFormValues = {

  name: "",

  phone: "",

  email: "",

};

type ProfileErrors = Partial<Record<keyof ProfileFormValues | "form", string>>;



function MyPage() {

  const navigate = useNavigate();

  const { profile, updateProfile } = useUserProfile();

  const { upcomingReservation, historyReservations, stats, cancelReservation } = useReservations();



  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profileForm, setProfileForm] = useState<ProfileFormValues>(emptyProfileForm);

  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});

  const [historyPage, setHistoryPage] = useState(0);

  const [cancelTargetReservation, setCancelTargetReservation] = useState<Reservation | null>(null);
  const [isCancelSuccessOpen, setIsCancelSuccessOpen] = useState(false);

  const [isStampOpen, setIsStampOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);



  const totalHistoryPages = Math.max(1, Math.ceil(historyReservations.length / HISTORY_PER_PAGE));



  const pagedHistory = useMemo(() => {

    const start = historyPage * HISTORY_PER_PAGE;

    return historyReservations.slice(start, start + HISTORY_PER_PAGE);

  }, [historyPage, historyReservations]);



  useEffect(() => {

    if (historyPage > totalHistoryPages - 1) {

      setHistoryPage(Math.max(0, totalHistoryPages - 1));

    }

  }, [historyPage, totalHistoryPages]);



  const statsItems = [

    {

      id: "reservation",

      title: "현재예약",

      value: String(stats.activeCount),

      unit: "건",

      icon: "calendar" as const,

    },

    {

      id: "class",

      title: "누적클래스",

      value: String(stats.completedCount),

      unit: "회",

      icon: "mug" as const,

    },

    {

      id: "stamp",

      title: "적립 스탬프",

      value: String(stats.stampCount),

      unit: "개",

      icon: "stamp" as const,

    },

  ] as const;



  const upcomingContent = upcomingReservation

    ? {

      title: upcomingReservation.classTitle,

      image: upcomingReservation.image,

      dateLabel: formatReservationDate(upcomingReservation.date),

      time: upcomingReservation.time,

      guestLabel: formatGuestCount(upcomingReservation.guestCount),

      location: upcomingReservation.location,

      dDayLabel: calculateDDayLabel(upcomingReservation.date),

    }

    : null;

  const canModifyUpcomingReservation = upcomingReservation
    ? canCancelReservation(upcomingReservation.date, upcomingReservation.time)
    : false;



  const startProfileEdit = () => {

    if (!profile) {

      return;

    }



    setProfileForm({

      name: profile.name,

      phone: profile.phone,

      email: profile.email,

    });

    setProfileErrors({});

    setIsEditingProfile(true);

  };



  const cancelProfileEdit = () => {

    setIsEditingProfile(false);

    setProfileErrors({});

  };



  const handleProfileFieldChange = (field: keyof ProfileFormValues, value: string) => {

    setProfileForm((current) => ({ ...current, [field]: value }));

    setProfileErrors((current) => ({ ...current, [field]: undefined }));

  };



  const handleProfileSave = () => {

    const result = updateProfile(profileForm);



    if (!result.success) {

      setProfileErrors(result.errors);

      return;

    }



    setIsEditingProfile(false);

    setProfileErrors({});

  };



  const handleConfirmCancel = () => {
    if (!cancelTargetReservation) {
      return;
    }

    if (!canCancelReservation(cancelTargetReservation.date, cancelTargetReservation.time)) {
      return;
    }

    cancelReservation(cancelTargetReservation.id);
    setCancelTargetReservation(null);
    setIsCancelSuccessOpen(true);
  };

  const handleCloseCancelConfirm = () => {
    setCancelTargetReservation(null);
  };

  const handleCloseCancelSuccess = () => {
    setIsCancelSuccessOpen(false);
  };



  return (

    <main className="my-page" style={{ backgroundImage: `url(${myPageBg})` }}>

      <div className="my-page__header">

        <Header />

      </div>



      <section className="my-page__content" aria-label="마이페이지">

        <div className="my-page__inner">

          <div className="my-page__greeting">

            <h1 className="my-page__greeting-name">

              <span className="my-page__greeting-name-primary ft-64r ink500">{profile?.name ?? ""}</span>

              <span className="my-page__greeting-name-suffix ft-48b ink500">님,</span>

            </h1>

            <p className="my-page__greeting-message ft-36r ink500">오늘도 차와 함께 평온한 하루 되세요.</p>

          </div>



          <div className="my-page__stats" role="list" aria-label="나의 활동 요약">

            {statsItems.map((stat, index) => {
              const isClickableStat =
                stat.id === "stamp" || (stat.id === "class" && historyReservations.length > 0);

              const handleStatClick = () => {
                if (stat.id === "stamp") {
                  setIsStampOpen(true);
                  return;
                }

                if (stat.id === "class") {
                  setIsHistoryModalOpen(true);
                }
              };

              return (
              <Fragment key={stat.id}>

                {index > 0 && (

                  <div className="my-page__stat-divider" aria-hidden="true">

                    <img className="my-page__stat-divider-image" src={myIcon} alt="" />

                  </div>

                )}

                <article
                  className={
                    isClickableStat
                      ? "my-page__stat-item my-page__stat-item--clickable"
                      : "my-page__stat-item"
                  }
                  role={isClickableStat ? "button" : "listitem"}
                  tabIndex={isClickableStat ? 0 : undefined}
                  onClick={isClickableStat ? handleStatClick : undefined}
                  onKeyDown={
                    isClickableStat
                      ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleStatClick();
                        }
                      }
                      : undefined
                  }
                >

                  <div className="my-page__stat-heading">

                    <div className="my-page__stat-icon" aria-hidden="true">

                      {stat.icon === "calendar" && <Icon className="my-page__stat-icon-graphic" name="calendar" />}

                      {stat.icon === "mug" && <Icon className="my-page__stat-icon-graphic" name="mug" />}

                      {stat.icon === "stamp" && <Icon className="my-page__stat-icon-graphic" name="stamp" />}

                    </div>

                    <h2 className="my-page__stat-title ft-28b ink500">{stat.title}</h2>

                  </div>

                  <p className="my-page__stat-value">

                    <span className="ft-48b ink500">{stat.value}</span>

                    <span className="ft-22r ink500">{stat.unit}</span>

                  </p>

                </article>

              </Fragment>
              );
            })}

          </div>

        </div>

      </section>



      <section className="my-page__upcoming" aria-label="다가오는 찻자리">

        <div className="my-page__upcoming-inner">

          <h2 className="my-page__upcoming-title ft-48b ink500">다가오는 찻자리</h2>

          {upcomingContent ? (

            <div className="my-page__upcoming-box">

              <TeaClassContentBox variant="upcoming" upcoming={upcomingContent} />

              <div className="my-page__upcoming-actions">

                <Button

                  variant="payment"

                  className="my-page__upcoming-button"

                  type="button"

                  disabled={!canModifyUpcomingReservation}

                  onClick={() => {
                    if (upcomingReservation && canModifyUpcomingReservation) {
                      navigate(`/reservation?mode=edit&reservationId=${upcomingReservation.id}`);
                    }
                  }}

                >

                  예약 변경

                </Button>

                <Button

                  variant="reservationEdit"

                  className="my-page__upcoming-button"

                  type="button"

                  disabled={!canModifyUpcomingReservation}

                  onClick={() => {
                    if (upcomingReservation && canModifyUpcomingReservation) {
                      setCancelTargetReservation(upcomingReservation);
                    }
                  }}

                >

                  예약 취소

                </Button>

              </div>

            </div>

          ) : (

            <div className="my-page__upcoming-empty">

              <p className="my-page__upcoming-empty-text ft-28r ink400">다가오는 예약이 없습니다.</p>

              <Link className="my-page__upcoming-empty-link" to="/reservation">

                <Button variant="payment" className="my-page__upcoming-button" type="button">

                  예약하기

                </Button>

              </Link>

            </div>

          )}

        </div>

      </section>



      <section className="my-page__history" aria-label="예약이력">

        <div className="my-page__history-inner">

          <div className="my-page__history-head">
            <h2 className="my-page__history-title ft-48b ink500">예약이력</h2>
            {historyReservations.length > 0 ? (
              <Button
                variant="btn7"
                className="my-page__history-more-button"
                type="button"
                onClick={() => setIsHistoryModalOpen(true)}
              >
                더보기
              </Button>
            ) : null}
          </div>

          {historyReservations.length > 0 ? (

            <>

              <ul className="my-page__history-list">

                {pagedHistory.map((item, index) => (

                  <Fragment key={item.id}>
                    <li className="my-page__history-card">

                      <img className="my-page__history-card-image" src={item.image} alt="" />

                      <div className="my-page__history-card-body">

                        <h3 className="my-page__history-card-title ft-36b ink500">{item.classTitle}</h3>

                        <p className="my-page__history-card-date ft-22r ink400">

                          {formatReservationSchedule(item.date, item.time)}

                        </p>

                      </div>

                      <Badge variant={getHistoryBadgeVariant(item.status)} className="my-page__history-card-badge">

                        {getHistoryBadgeLabel(item.status)}

                      </Badge>

                    </li>

                    {index < pagedHistory.length - 1 ? (
                      <li className="my-page__history-divider" aria-hidden="true" />
                    ) : null}

                  </Fragment>

                ))}

              </ul>

            </>

          ) : (

            <p className="my-page__history-empty ft-28r ink400">예약 이력이 없습니다.</p>

          )}

        </div>

      </section>



      <section className="my-page__profile" aria-label="회원정보">

        <div className="my-page__profile-inner">

          <h2 className="my-page__profile-title ft-48b ink500">회원정보</h2>

          <div className="my-page__profile-box">

            <dl className="my-page__profile-fields">

              {profileFieldConfig.map((field) => (

                <Fragment key={field.id}>

                  <dt className="my-page__profile-label ft-28b ink500">{field.label}</dt>

                  <dd className="my-page__profile-value">

                    {isEditingProfile ? (

                      <div className="my-page__profile-input-wrap">

                        <Input

                          className="my-page__profile-input"

                          id={`profile-${field.id}`}

                          name={field.id}

                          value={profileForm[field.id]}

                          state={profileErrors[field.id] ? "error" : "default"}

                          onChange={(event) => handleProfileFieldChange(field.id, event.target.value)}

                        />

                        {profileErrors[field.id] ? (

                          <p className="my-page__profile-error ft-14r" role="alert">

                            {profileErrors[field.id]}

                          </p>

                        ) : null}

                      </div>

                    ) : (

                      <span className="ft-28b ink500">{profile?.[field.id] ?? ""}</span>

                    )}

                  </dd>

                </Fragment>

              ))}

            </dl>

            {isEditingProfile ? (

              <div className="my-page__profile-edit-actions">

                <Button variant="payment" className="my-page__profile-edit-button" type="button" onClick={handleProfileSave}>

                  수정 완료

                </Button>

                <Button

                  variant="reservationEdit"

                  className="my-page__profile-edit-button"

                  type="button"

                  onClick={cancelProfileEdit}

                >

                  취소

                </Button>

              </div>

            ) : (

              <Button variant="reservationEdit" className="my-page__profile-edit-button" type="button" onClick={startProfileEdit}>

                정보수정

              </Button>

            )}

          </div>

        </div>

      </section>



      {cancelTargetReservation ? (
        <MyPageCancelConfirmModal
          reservation={cancelTargetReservation}
          onConfirm={handleConfirmCancel}
          onClose={handleCloseCancelConfirm}
        />
      ) : null}

      {isCancelSuccessOpen ? <MyPageCancelSuccessModal onClose={handleCloseCancelSuccess} /> : null}



      {isStampOpen ? <StampModal onClose={() => setIsStampOpen(false)} /> : null}

      <CustomModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)}>
        <section className="my-page__history-modal" aria-label="전체 예약 이력">
          <header className="my-page__history-modal-header">
            <h2 className="my-page__history-modal-title ft-28b ink500">전체 예약 이력</h2>
          </header>

          <div className="my-page__history-modal-scroll">
            <ul className="my-page__history-list my-page__history-modal-list">
              {historyReservations.map((item, index) => (
                <Fragment key={item.id}>
                  <li className="my-page__history-card my-page__history-modal-card">
                    <img className="my-page__history-card-image" src={item.image} alt="" />

                    <div className="my-page__history-card-body">
                      <h3 className="my-page__history-card-title my-page__history-modal-card-title ft-22b ink500">
                        {item.classTitle}
                      </h3>

                      <p className="my-page__history-card-date my-page__history-modal-card-date ft-16r ink400">
                        {formatReservationSchedule(item.date, item.time)}
                      </p>
                    </div>

                    <Badge
                      variant={getHistoryBadgeVariant(item.status)}
                      className="my-page__history-card-badge my-page__history-modal-card-badge ft-14r"
                    >
                      {getHistoryBadgeLabel(item.status)}
                    </Badge>
                  </li>

                  {index < historyReservations.length - 1 ? (
                    <li className="my-page__history-divider" aria-hidden="true" />
                  ) : null}
                </Fragment>
              ))}
            </ul>
          </div>
        </section>
      </CustomModal>



      <Footer />

    </main>

  );

}



export default MyPage;


