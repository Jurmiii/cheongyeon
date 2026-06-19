import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faCreditCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { Badge, Button } from "../index";
import "./TeaClassContentBox.scss";

function WonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 8l3 10 4-10 4 10 3-10" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M4 12h16M4 15h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

const metaItems = [
  { icon: faCalendar, label: "날짜 / 2026.06.15 (월)" },
  { icon: faClock, label: "시간 / 10:00" },
  { icon: faUser, label: "인원 / 1명" },
  { icon: faCreditCard, label: "결제 금액 /", price: "70,000" },
];

export default function TeaClassContentBox() {
  return (
    <article className="tea-class-content-box">
      <div className="tea-class-content-box__image" aria-hidden="true" />
      <div className="tea-class-content-box__content">
        <div className="tea-class-content-box__title-row">
          <h3 className="ft-22b ink500">기본 다도 클래스</h3>
          <Badge variant="d7">D-7</Badge>
        </div>
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
                  <FontAwesomeIcon className="tea-class-content-box__meta-icon ink400" icon={item.icon} />
                  <span className="ink500">{item.label}</span>
                  {item.price && (
                    <span className="tea-class-content-box__price ink500">
                      <WonIcon />
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
      </div>
    </article>
  );
}
