import { Badge, Button, Calendar, Footer, Header, Input, MainContentBox, ReservationInfoEdit, TeaClassContentBox } from "../components/common";
import {
  ClassCard,
  ContentCard,
  EventCard,
  ReservationCard,
  SeasonClassCard,
} from "../components/cards";
import { classes } from "../data/classes";
import { contents } from "../data/contents";
import { events } from "../data/events";
import { reservations } from "../data/reservations";
import Login from "./Login/Login";
import "./ComponentPreview.scss";

const typography = [
  "ft-96r",
  "ft-64r",
  "ft-48b",
  "ft-36b",
  "ft-36r",
  "ft-28b",
  "ft-28r",
  "ft-22b",
  "ft-22r",
  "ft-18b",
  "ft-18r",
  "ft-16b",
  "ft-16r",
  "ft-14b",
  "ft-14r",
];

const colors = [
  ["han50", "var(--han50)"],
  ["han100", "var(--han100)"],
  ["han200", "var(--han200)"],
  ["han300", "var(--han300)"],
  ["han400", "var(--han400)"],
  ["han500", "var(--han500)"],
  ["ink50", "var(--ink50)"],
  ["ink100", "var(--ink100)"],
  ["ink200", "var(--ink200)"],
  ["ink300", "var(--ink300)"],
  ["ink400", "var(--ink400)"],
  ["ink500", "var(--ink500)"],
  ["moon100", "var(--moon100)"],
  ["moon200", "var(--moon200)"],
  ["moon300", "var(--moon300)"],
  ["moon400", "var(--moon400)"],
  ["moon500", "var(--moon500)"],
  ["moon600", "var(--moon600)"],
  ["deep50", "var(--deep50)"],
  ["deep100", "var(--deep100)"],
  ["deep200", "var(--deep200)"],
  ["deep300", "var(--deep300)"],
  ["deep400", "var(--deep400)"],
  ["deep500", "var(--deep500)"],
  ["deep600", "var(--deep600)"],
  ["deep700", "var(--deep700)"],
  ["plum50", "var(--plum50)"],
  ["plum100", "var(--plum100)"],
  ["plum200", "var(--plum200)"],
  ["plum300", "var(--plum300)"],
  ["plum400", "var(--plum400)"],
  ["plum500", "var(--plum500)"],
  ["plum600", "var(--plum600)"],
  ["plum700", "var(--plum700)"],
  ["danger", "var(--danger)"],
  ["success", "var(--success)"],
  ["warning", "var(--warning)"],
  ["info", "var(--info)"],
  ["color-winter", "var(--color-winter)"],
  ["color-fall", "var(--color-fall)"],
  ["color-kakao", "var(--color-kakao)"],
  ["color-naver", "var(--color-naver)"],
  ["white", "var(--white)"],
];

const badges = [
  ["confirmed", "예약확정"],
  ["progress", "진행중"],
  ["disabled", "예약확정"],
  ["deadline", "마감임박"],
  ["recommend", "신규, 추천"],
  ["best", "BEST"],
  ["oneday", "원데이 클래스"],
  ["guide", "티 가이드"],
  ["d7", "D-7"],
];

const buttons = [
  ["payment", "결제하기"],
  ["reservationEdit", "예약변경"],
  ["cancel", "취소"],
  ["reservation", "예약하기"],
  ["favorite", "관심등록"],
  ["detail", "자세히"],
  ["classMore", "이벤트 자세히 보기"],
  ["kakao", "카카오로 시작하기"],
  ["naver", "네이버로 시작하기"],
];

export default function ComponentPreview() {
  return (
    <main className="component-preview">
      <section className="component-preview__section component-preview__section--header">
        <h2 className="ft-28b">Header</h2>
        <Header />
      </section>

      <section className="component-preview__section component-preview__section--full">
        <h2 className="ft-28b">Footer</h2>
        <Footer />
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Typography</h2>
        <div className="component-preview__stack">
          {typography.map((item) => (
            <p className={item} key={item}>
              {item} 청연에 오신 것을 환영합니다.
            </p>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Colors</h2>
        <div className="component-preview__colors">
          {colors.map(([name, value]) => (
            <div className="component-preview__color" key={name}>
              <span style={{ background: value }} />
              <p className="ft-14r">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Badges</h2>
        <div className="component-preview__row">
          {badges.map(([variant, text]) => (
            <Badge variant={variant} key={variant}>
              {text}
            </Badge>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Buttons</h2>
        <div className="component-preview__row">
          {buttons.map(([variant, text]) => (
            <Button variant={variant} key={variant}>
              {text}
            </Button>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Inputs</h2>
        <div className="component-preview__row">
          <Input state="default" placeholder="아이디를 입력하세요" />
          <Input state="default" placeholder="비밀번호를 입력하세요" />
          <Input state="default" placeholder="이름을 입력하세요" />
          <Input state="default" placeholder="전화번호를 입력하세요" />
          <Input state="default" placeholder="이메일을 입력하세요" />
        </div>
        <div className="component-preview__row">
          <Input state="error" defaultValue="이" placeholder="이름을 입력하세요" readOnly />
          <Input state="success" defaultValue="01012345678" placeholder="전화번호를 입력하세요" readOnly />
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Cards</h2>
        <div className="component-preview__cards">
          <ClassCard {...classes[0]} />
          <ContentCard {...contents[0]} />
          <ReservationCard {...reservations[0]} />
          <EventCard {...events[0]} />
          <SeasonClassCard />
        </div>
      </section>

      <section className="component-preview__section component-preview__section--login">
        <h2 className="ft-28b">Login</h2>
        <Login />
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Calendar</h2>
        <Calendar />
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Main Content Box</h2>
        <MainContentBox />
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Tea Class Content Box</h2>
        <TeaClassContentBox />
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Reservation Info Edit</h2>
        <ReservationInfoEdit />
      </section>
    </main>
  );
}
