import { Badge, Button, Calendar, ContentBox, Footer, Header, Input, ReservationInfoEdit } from "../components/common";
import {
  Card,
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
  { alias: "ba1", variant: "confirmed", text: "예약확정" },
  { alias: "ba2", variant: "progress", text: "진행중" },
  { alias: "ba3", variant: "disabled", text: "예약확정" },
  { alias: "ba4", variant: "deadline", text: "마감임박" },
  { alias: "ba5", variant: "recommend", text: "신규, 추천" },
  { alias: "ba6", variant: "best", text: "BEST" },
  { alias: "ba7", variant: "oneday", text: "원데이 클래스" },
  { alias: "ba8", variant: "guide", text: "티 가이드" },
  { alias: "ba9", variant: "d7", text: "D-7" },
];

const buttons = [
  { alias: "btn1", variant: "payment", text: "결제하기" },
  { alias: "btn2", variant: "reservationEdit", text: "예약변경" },
  { alias: "btn3", variant: "cancel", text: "취소" },
  { alias: "btn4", variant: "reservation", text: "예약하기" },
  { alias: "btn5", variant: "favorite", text: "관심등록" },
  { alias: "btn6", variant: "detail", text: "자세히" },
  { alias: "btn7", variant: "classMore", text: "이벤트 자세히 보기" },
  { alias: "btn8", variant: "kakao", text: "카카오로 시작하기" },
  { alias: "btn9", variant: "naver", text: "네이버로 시작하기" },
];

const inputs = [
  { alias: "in1", state: "default", placeholder: "아이디를 입력하세요" },
  { alias: "in1", state: "default", placeholder: "비밀번호를 입력하세요" },
  { alias: "in1", state: "default", placeholder: "이름을 입력하세요" },
  { alias: "in1", state: "default", placeholder: "전화번호를 입력하세요" },
  { alias: "in1", state: "default", placeholder: "이메일을 입력하세요" },
];

const inputSamples = [
  { alias: "in3", state: "error", placeholder: "이름을 입력하세요", value: "이" },
  { alias: "in4", state: "success", placeholder: "전화번호를 입력하세요", value: "01012345678" },
];

const cards = [
  { alias: "card1", component: "ClassCard", props: classes[0] },
  { alias: "card2", component: "ContentCard", props: contents[0] },
  { alias: "card3", component: "ReservationCard", props: reservations[0] },
  { alias: "card4", component: "EventCard", props: events[0] },
  { alias: "card5", component: "SeasonClassCard", props: {} },
];

const contentBoxes = [
  { alias: "content1", component: "MainContentBox" },
  { alias: "content2", component: "TeaClassContentBox" },
  { alias: "content3", component: "ProductContentBox" },
  { alias: "content4", component: "ReviewContentBox" },
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
            <div className="component-preview__item component-preview__type-item" key={item}>
              <p className={item}>청연에 오신 것을 환영합니다.</p>
              <p className="component-preview__alias ft-14r">{item}</p>
            </div>
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
          {badges.map(({ alias, variant, text }) => (
            <div className="component-preview__item" key={alias}>
              <Badge variant={alias}>{text}</Badge>
              <p className="component-preview__alias ft-14r">
                {alias} / {variant}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Buttons</h2>
        <div className="component-preview__row">
          {buttons.map(({ alias, variant, text }) => (
            <div className="component-preview__item" key={alias}>
              <Button variant={alias}>{text}</Button>
              <p className="component-preview__alias ft-14r">
                {alias} / {variant}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Inputs</h2>
        <div className="component-preview__row">
          {inputs.map(({ alias, state, placeholder }) => (
            <div className="component-preview__item" key={placeholder}>
              <Input state={alias} placeholder={placeholder} />
              <p className="component-preview__alias ft-14r">
                {alias} / {state}
              </p>
            </div>
          ))}
        </div>
        <div className="component-preview__row">
          {inputSamples.map(({ alias, state, placeholder, value }) => (
            <div className="component-preview__item" key={alias}>
              <Input state={alias} defaultValue={value} placeholder={placeholder} readOnly />
              <p className="component-preview__alias ft-14r">
                {alias} / {state}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Cards</h2>
        <div className="component-preview__cards">
          {cards.map(({ alias, component, props }) => (
            <div className="component-preview__item" key={alias}>
              <Card name={alias} {...props} />
              <p className="component-preview__alias ft-14r">
                {alias} / {component}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section component-preview__section--login-reservation">
        <div className="component-preview__preview-panel component-preview__section--login">
          <h2 className="ft-28b">Login</h2>
          <Login />
        </div>
        <div className="component-preview__preview-panel">
          <h2 className="ft-28b">Reservation Info Edit</h2>
          <ReservationInfoEdit />
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Calendar</h2>
        <Calendar />
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Content Boxes</h2>
        <div className="component-preview__content-boxes">
          {contentBoxes.slice(0, 2).map(({ alias, component }) => (
            <div className="component-preview__item" key={alias}>
              <ContentBox name={alias} />
              <p className="component-preview__alias ft-14r">
                {alias} / {component}
              </p>
            </div>
          ))}
          <div className="component-preview__content-boxes-row">
            {contentBoxes.slice(2).map(({ alias, component }) => (
              <div className="component-preview__item" key={alias}>
                <ContentBox name={alias} />
                <p className="component-preview__alias ft-14r">
                  {alias} / {component}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
