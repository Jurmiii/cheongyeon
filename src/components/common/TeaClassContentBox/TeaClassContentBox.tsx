import upcomingClassImage from "../../../assets/images/13my-page/my- 2.webp";
import { Badge, Button, Icon } from "../index";
import type { IconName } from "../index";
import "./TeaClassContentBox.scss";

export type UpcomingReservationContent = {
  title: string;
  image: string;
  dateLabel: string;
  time: string;
  guestLabel: string;
  location: string;
  dDayLabel: string;
};

const metaItems: Array<{ icon: IconName; label: string; price?: string }> = [
  { icon: "calendar", label: "날짜 / 2026.06.15 (월)" },
  { icon: "clock", label: "시간 / 10:00" },
  { icon: "user", label: "인원 / 1명" },
  { icon: "credit-card", label: "결제 금액 /", price: "70,000" },
];

const defaultUpcomingMetaItems: Array<{ icon: IconName; label: string }> = [
  { icon: "calendar", label: "2026.05.27 (월)" },
  { icon: "clock", label: "10:00" },
  { icon: "user", label: "1명" },
  { icon: "location-dot", label: "서울특별시 종로구 북촌로 58" },
];

type TeaClassContentBoxProps = {
  variant?: "default" | "upcoming";
  upcoming?: UpcomingReservationContent;
};

export default function TeaClassContentBox({ variant = "default", upcoming }: TeaClassContentBoxProps) {
  const isUpcoming = variant === "upcoming";
  const upcomingContent = upcoming ?? {
    title: "차 블렌더 클래스",
    image: upcomingClassImage,
    dateLabel: defaultUpcomingMetaItems[0].label,
    time: defaultUpcomingMetaItems[1].label,
    guestLabel: defaultUpcomingMetaItems[2].label,
    location: defaultUpcomingMetaItems[3].label,
    dDayLabel: "D-7",
  };

  const upcomingMetaItems: Array<{ icon: IconName; label: string }> = [
    { icon: "calendar", label: upcomingContent.dateLabel },
    { icon: "clock", label: upcomingContent.time },
    { icon: "user", label: upcomingContent.guestLabel },
    { icon: "location-dot", label: upcomingContent.location },
  ];

  return (
    <article className={`tea-class-content-box${isUpcoming ? " tea-class-content-box--upcoming" : ""}`}>
      <div
        className="tea-class-content-box__image"
        aria-hidden="true"
        style={isUpcoming ? { backgroundImage: `url(${upcomingContent.image})` } : undefined}
      />
      <div className="tea-class-content-box__content">
        <div className="tea-class-content-box__title-row">
          <h3 className="ft-22b ink500">{isUpcoming ? upcomingContent.title : "기본 다도 클래스"}</h3>
          {isUpcoming ? <Badge variant="d7">{upcomingContent.dDayLabel}</Badge> : <Badge variant="d7">D-7</Badge>}
        </div>
        {isUpcoming ? (
          <ul className="tea-class-content-box__meta">
            {upcomingMetaItems.map((item) => (
              <li className="tea-class-content-box__meta-item" key={item.label}>
                <Icon className="tea-class-content-box__meta-icon ink400" name={item.icon} />
                <span className="ft-22b ink500">{item.label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="tea-class-content-box__bottom">
            <div className="tea-class-content-box__detail">
              <p className="tea-class-content-box__description ft-18r ink400">
                다도의 기본 예절과 차 우리는 법을 배우는
                <br />
                초보자를 위한 입문 클래스입니다.
              </p>
              <ul className="tea-class-content-box__meta ft-14r">
                {metaItems.map((item) => (
                  <li className="tea-class-content-box__meta-item" key={item.label}>
                    <Icon className="tea-class-content-box__meta-icon ink400" name={item.icon} />
                    <span className="ink500">{item.label}</span>
                    {item.price && (
                      <span className="tea-class-content-box__price ink500">
                        <Icon name="won-circle" />
                        {item.price}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tea-class-content-box__actions">
              <Button variant="payment">결제하기</Button>
              <Button variant="reservationEdit">예약변경</Button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
