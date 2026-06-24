import { Badge, Button } from "../../common";
import "./Card6.scss";

export default function Card6() {
  return (
    <article className="card6" aria-label="여름 맞이 특별 이벤트">
      <div className="card6__content">
        <Badge className="card6__badge" variant="ba2">
          진행중
        </Badge>
        <p className="card6__event-title ft-16r ink500">여름 맞이 특별 이벤트</p>
        <h3 className="card6__main-copy ft-22b ink500">차 한 잔의 여름</h3>
        <p className="card6__description ft-16r ink500">
          청량한 여름, 소중한 사람과 함께
          <br />
          차 한 잔의 여유를 나누세요.
        </p>
        <p className="card6__period ft-16r ink500">2026.07.01 ~ 2026.08.30</p>
        <Button className="card6__button" variant="btn7">
          자세히 보기
        </Button>
      </div>
    </article>
  );
}
