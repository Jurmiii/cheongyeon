import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faCreditCard, faUser } from "@fortawesome/free-regular-svg-icons";
import Badge from "../Badge";
import Button from "../Button";
import "./TeaClassContentBox.scss";

function WonIcon() {
  return (
    <svg className="tea-class-content-box__won-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7 9l2 7 3-7 3 7 2-7M7 12h10M7 14h10"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function TeaClassContentBox() {
  return (
    <article className="tea-class-content-box">
      <div className="tea-class-content-box__image" aria-hidden="true" />
      <div className="tea-class-content-box__content">
        <div className="tea-class-content-box__details">
          <div className="tea-class-content-box__heading">
            <h2 className="ft-22b ink500">기본 다도 클래스</h2>
            <Badge variant="d7">D-7</Badge>
          </div>
          <div className="tea-class-content-box__lower">
            <div className="tea-class-content-box__text">
              <p className="tea-class-content-box__description ft-18r ink400">
                다도의 기본 예절과 차 우리는 법을 배우는
                <br />
                초보자를 위한 입문 클래스입니다.
              </p>
              <div className="tea-class-content-box__meta">
                <p className="tea-class-content-box__meta-row">
                  <FontAwesomeIcon className="tea-class-content-box__meta-icon ink400" icon={faCalendar} />
                  <span className="ft-16r ink500">날짜 / 2026.06.15 (월)</span>
                </p>
                <p className="tea-class-content-box__meta-row">
                  <FontAwesomeIcon className="tea-class-content-box__meta-icon ink400" icon={faClock} />
                  <span className="ft-16r ink500">시간 / 10:00</span>
                </p>
                <p className="tea-class-content-box__meta-row">
                  <FontAwesomeIcon className="tea-class-content-box__meta-icon ink400" icon={faUser} />
                  <span className="ft-16r ink500">인원 / 1명</span>
                </p>
                <p className="tea-class-content-box__meta-row">
                  <FontAwesomeIcon className="tea-class-content-box__meta-icon ink400" icon={faCreditCard} />
                  <span className="ft-16r ink500">결제 금액 /</span>
                  <WonIcon />
                  <span className="ft-16r ink500">70,000</span>
                </p>
              </div>
            </div>
            <div className="tea-class-content-box__actions">
              <Button variant="payment">결제하기</Button>
              <Button variant="reservationEdit">예약변경</Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
