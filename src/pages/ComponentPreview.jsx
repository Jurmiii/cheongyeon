import { useState } from "react";
import {
  Badge,
  Button,
  Calendar,
  ContentBox,
  CustomModal,
  Footer,
  Header,
  Icon,
  Input,
  MobileFooter,
  MobileHeader,
  Modal1,
  Modal2,
  ReservationInfoEdit,
  TabletFooter,
  TabletHeader,
} from "../components/common";
import {
  Card,
} from "../components/cards";
import { classes } from "../data/classes";
import { contents } from "../data/contents";
import { events } from "../data/events";
import { reservations } from "../data/reservations";
import githubIcon from "../assets/images/00header-footer/github.svg";
import kakaoIcon from "../assets/images/00header-footer/kakao.svg";
import logo from "../assets/images/00header-footer/logo.svg";
import logoWhite from "../assets/images/00header-footer/logo-white.svg";
import naverIcon from "../assets/images/00header-footer/naver.svg";
import centerLine from "../assets/images/01main/center-line.svg";
import chajeomIcon from "../assets/images/01main/chajeom-icon.svg";
import dasilIcon from "../assets/images/01main/dasil-icon.svg";
import markIcon from "../assets/images/01main/mark.svg";
import subSymbol from "../assets/images/01main/subsymbol.svg";
import symbolBlack from "../assets/images/01main/symbol-black.svg";
import symbolWhite from "../assets/images/01main/symbol-white.svg";
import symbol1 from "../assets/images/01main/symbol1.svg";
import mapMarker1 from "../assets/images/03space/1.svg";
import mapMarker2 from "../assets/images/03space/2.svg";
import mapMarker3 from "../assets/images/03space/3.svg";
import mapMarker4 from "../assets/images/03space/4.svg";
import mapMarker5 from "../assets/images/03space/5.svg";
import cuser from "../assets/images/03space/cuser.svg";
import spaceLine from "../assets/images/03space/space-3-line.svg";
import collectionLineSymbol from "../assets/images/05collection/collection-line-symbol.svg";
import chaIcon from "../assets/images/09season-class/cha-icon.svg";
import tryIcon from "../assets/images/09season-class/try-icon.svg";
import myDividerIcon from "../assets/images/13my-page/my-icon.svg";
import Login from "./Login/Login";
import "./ComponentPreview.scss";

const typography = [
  "ft-96r",
  "ft-64r",
  "ft-64b",
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

const tabletTypography = [
  { className: "ft-64r", label: ".ft-64r / 80 / Weight 400" },
  { className: "ft-48r", label: ".ft-48r / 58 / Weight 400" },
  { className: "ft-48b", label: ".ft-48b / 58 / Weight 700" },
  { className: "ft-40b", label: ".ft-40b / 52 / Weight 700" },
  { className: "ft-30b", label: ".ft-30b / 42 / Weight 700" },
  { className: "ft-30r", label: ".ft-30r / 42 / Weight 400" },
  { className: "ft-24b", label: ".ft-24b / 34 / Weight 700" },
  { className: "ft-24r", label: ".ft-24r / 34 / Weight 400" },
  { className: "ft-20b", label: ".ft-20b / 32 / Weight 500" },
  { className: "ft-20r", label: ".ft-20r / 32 / Weight 400" },
  { className: "ft-18b", label: ".ft-18b / 30 / Weight 500" },
  { className: "ft-18r", label: ".ft-18r / 30 / Weight 400" },
  { className: "ft-16r", label: ".ft-16r / 26 / Weight 400" },
  { className: "ft-14b", label: ".ft-14b / 22 / Weight 500" },
  { className: "ft-14r", label: ".ft-14r / 22 / Weight 400" },
];

const mobileTypography = [
  { className: "ft-36r", label: ".ft-36r / 46 / Weight 400" },
  { className: "ft-36b", label: ".ft-36b / 46 / Weight 700" },
  { className: "ft-32b", label: ".ft-32b / 42 / Weight 700" },
  { className: "ft-26b", label: ".ft-26b / 36 / Weight 700" },
  { className: "ft-26r", label: ".ft-26r / 36 / Weight 400" },
  { className: "ft-22b", label: ".ft-22b / 30 / Weight 700" },
  { className: "ft-22r", label: ".ft-22r / 30 / Weight 400" },
  { className: "ft-18b", label: ".ft-18b / 28 / Weight 500" },
  { className: "ft-18r", label: ".ft-18r / 28 / Weight 400" },
  { className: "ft-16b", label: ".ft-16b / 26 / Weight 500" },
  { className: "ft-16r", label: ".ft-16r / 26 / Weight 400" },
  { className: "ft-14r", label: ".ft-14r / 22 / Weight 400" },
  { className: "ft-14b", label: ".ft-14b / 22 / Weight 500" },
  { className: "ft-10r", label: ".ft-10r / 22 / Weight 400" },
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

const icons = [
  "angle-down",
  "calendar",
  "chevron-left",
  "chevron-right",
  "circle-info",
  "clock",
  "credit-card",
  "envelope",
  "eye-slash",
  "gift",
  "image",
  "location-dot",
  "lock",
  "magnifying-glass",
  "mobile",
  "mug",
  "clipboard",
  "star-of-life",
  "stamp",
  "user",
  "won-circle",
];

const imageIcons = [
  { name: "cha-icon.svg", src: chaIcon },
  { name: "try-icon.svg", src: tryIcon },
  { name: "github.svg", src: githubIcon },
  { name: "kakao.svg", src: kakaoIcon },
  { name: "naver.svg", src: naverIcon },
];

const svgIcons = [
  { name: "logo.svg", src: logo, wide: true },
  { name: "logo-white.svg", src: logoWhite, dark: true, wide: true },
  { name: "chajeom-icon.svg", src: chajeomIcon },
  { name: "dasil-icon.svg", src: dasilIcon },
  { name: "subsymbol.svg", src: subSymbol },
  { name: "symbol1.svg", src: symbol1 },
  { name: "symbol-black.svg", src: symbolBlack },
  { name: "symbol-white.svg", src: symbolWhite, dark: true },
  { name: "mark.svg", src: markIcon },
  { name: "center-line.svg", src: centerLine, wide: true },
  { name: "collection-line-symbol.svg", src: collectionLineSymbol, wide: true },
  { name: "space-3-line.svg", src: spaceLine, wide: true },
  { name: "cuser.svg", src: cuser },
  { name: "space-marker-1.svg", src: mapMarker1 },
  { name: "space-marker-2.svg", src: mapMarker2 },
  { name: "space-marker-3.svg", src: mapMarker3 },
  { name: "space-marker-4.svg", src: mapMarker4 },
  { name: "space-marker-5.svg", src: mapMarker5 },
  { name: "my-icon.svg", src: myDividerIcon },
];

const cards = [
  { alias: "card1", component: "ClassCard", props: classes[0] },
  { alias: "card2", component: "ContentCard", props: contents[0] },
  { alias: "card3", component: "ReservationCard", props: reservations[0] },
  { alias: "card4", component: "EventCard", props: events[0] },
  { alias: "card5", component: "SeasonClassCard", props: {} },
  { alias: "card6", component: "Card6", props: {} },
];

const contentBoxes = [
  { alias: "content1", component: "MainContentBox" },
  { alias: "content2", component: "TeaClassContentBox" },
  { alias: "content3", component: "ProductContentBox" },
  { alias: "content4", component: "ReviewContentBox" },
  { alias: "content5", component: "Content5" },
  { alias: "content6", component: "Content6" },
];

export default function ComponentPreview() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  return (
    <main className="component-preview">
      <section className="component-preview__section component-preview__section--header">
        <h2 className="ft-28b">Header</h2>
        <Header />
      </section>

      <section className="component-preview__section component-preview__section--tablet-header">
        <h2 className="ft-28b">Tablet Header / 햄버거 메뉴</h2>
        <p className="component-preview__description ft-16r ink300">
          버튼 클릭 시 상단에서 슬라이드 다운되는 태블릿 전용 메뉴입니다. 1댑스 호버, 유저 팝업,
          언어 팝업 인터랙션을 이 영역에서 확인할 수 있습니다.
        </p>
        <div className="component-preview__tablet-header-stage">
          <TabletHeader />
        </div>
      </section>

      <section className="component-preview__section component-preview__section--mobile-header">
        <h2 className="ft-28b">Mobile Header / 모바일 헤더 및 햄버거 메뉴</h2>
        <p className="component-preview__description ft-16r ink300">
          402px 모바일 해상도 기준의 투명 헤더와 위에서 내려오는 아코디언 햄버거 메뉴입니다.
          버튼을 눌러 헤더 스위칭과 2댑스 펼침 동작을 확인할 수 있습니다.
        </p>
        <div className="component-preview__mobile-header-stage">
          <MobileHeader />
        </div>
      </section>

      <section className="component-preview__section component-preview__section--full">
        <h2 className="ft-28b">Footer</h2>
        <Footer />
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Tablet Footer / 태블릿 푸터(768*250)</h2>
        <p className="component-preview__description ft-16r ink300">
          768px x 250px 태블릿 푸터입니다. ta-bg.webp 배경과 640px 구분선, 소셜/약관 영역의
          지정 좌표를 고정 프레임에서 확인할 수 있습니다.
        </p>
        <div className="component-preview__tablet-footer-stage">
          <TabletFooter />
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Mobile Footer / 모바일 푸터(402*250)</h2>
        <p className="component-preview__description ft-16r ink300">
          402px x 250px 모바일 푸터입니다. mo-bg.webp 배경 위에서 로고, 카피, 구분선,
          소셜 아이콘과 약관 링크가 수직 중앙 축 기준으로 정렬됩니다.
        </p>
        <div className="component-preview__mobile-footer-stage">
          <MobileFooter />
        </div>
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
        <h2 className="ft-28b">Tablet Typography</h2>
        <div className="component-preview__responsive-type typography-preview--tablet">
          {tabletTypography.map((item) => (
            <div className="component-preview__responsive-type-row" key={item.className}>
              <p className="component-preview__responsive-type-label ft-14r">{item.label}</p>
              <p className={item.className}>청연다도 공간의 은은한 감칠맛</p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Mobile Typography</h2>
        <div className="component-preview__responsive-type typography-preview--mobile">
          {mobileTypography.map((item) => (
            <div className="component-preview__responsive-type-row" key={item.className}>
              <p className="component-preview__responsive-type-label ft-14r">{item.label}</p>
              <p className={item.className}>청연다도 공간의 은은한 감칠맛</p>
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
          {badges.map(({ alias, text }) => (
            <div className="component-preview__item" key={alias}>
              <Badge variant={alias}>{text}</Badge>
              <p className="component-preview__alias ft-14r">{alias}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Buttons</h2>
        <div className="component-preview__row component-preview__button-list">
          {buttons.map(({ alias, text }) => (
            <div className="component-preview__item component-preview__button-item" key={alias}>
              <Button variant={alias}>{text}</Button>
              <p className="component-preview__alias ft-14r">{alias}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Responsive Button System / 반응형 버튼 시스템(Tablet / Mobile)</h2>
        <div className="component-preview__responsive-buttons">
          <div className="component-preview__responsive-button-panel component-preview__responsive-button-panel--tablet">
            <h3 className="ft-22b ink500">Tablet Button</h3>
            <div className="component-preview__responsive-button-row">
              <Button responsiveSize="tablet" responsiveTone="primary" type="button">
                태블릿 버튼
              </Button>
              <Button
                icon={<Icon name="calendar" />}
                responsiveSize="tablet"
                responsiveTone="outline"
                type="button"
              >
                일정 확인
              </Button>
            </div>
          </div>

          <div className="component-preview__responsive-button-panel component-preview__responsive-button-panel--mobile">
            <h3 className="ft-22b ink500">Mobile Button</h3>
            <div className="component-preview__responsive-button-row">
              <Button responsiveSize="mobile" responsiveTone="primary" type="button">
                모바일 버튼
              </Button>
              <Button
                icon={<Icon name="calendar" />}
                responsiveSize="mobile"
                responsiveTone="outline"
                type="button"
              >
                일정 확인
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Inputs</h2>
        <div className="component-preview__row">
          {inputs.map(({ alias, placeholder }) => (
            <div className="component-preview__item" key={placeholder}>
              <Input state={alias} placeholder={placeholder} />
              <p className="component-preview__alias ft-14r">{alias}</p>
            </div>
          ))}
        </div>
        <div className="component-preview__row">
          {inputSamples.map(({ alias, placeholder, value }) => (
            <div className="component-preview__item" key={alias}>
              <Input state={alias} defaultValue={value} placeholder={placeholder} readOnly />
              <p className="component-preview__alias ft-14r">{alias}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Icons</h2>
        <div className="component-preview__icons">
          {icons.map((name) => (
            <div className="component-preview__icon-item" key={name}>
              <Icon className="component-preview__icon ink500" name={name} />
              <p className="component-preview__alias ft-14r">{name}</p>
            </div>
          ))}
          {imageIcons.map(({ name, src }) => (
            <div className="component-preview__icon-item" key={name}>
              <img className="component-preview__icon component-preview__image-icon" src={src} alt="" aria-hidden="true" />
              <p className="component-preview__alias ft-14r">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">SVG Icons</h2>
        <div className="component-preview__icons">
          {svgIcons.map(({ dark, name, src, wide }) => (
            <div
              className={[
                "component-preview__icon-item",
                "component-preview__svg-icon-item",
                dark && "component-preview__svg-icon-item--dark",
                wide && "component-preview__svg-icon-item--wide",
              ]
                .filter(Boolean)
                .join(" ")}
              key={name}
            >
              <img className="component-preview__svg-icon-image" src={src} alt="" aria-hidden="true" />
              <p className="component-preview__alias ft-14r">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Cards</h2>
        <div className="component-preview__cards">
          {cards.map(({ alias, props }) => (
            <div className="component-preview__item" key={alias}>
              <Card name={alias} {...props} />
              <p className="component-preview__alias ft-14r">{alias}</p>
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
        <h2 className="ft-28b">Modals</h2>
        <div className="component-preview__modals">
          <div className="component-preview__item">
            <Modal1 />
            <p className="component-preview__alias ft-14r">modal1</p>
          </div>
          <div className="component-preview__item">
            <Modal2 />
            <p className="component-preview__alias ft-14r">modal2</p>
          </div>
          <div className="component-preview__item component-preview__custom-modal-preview">
            <Button variant="btn1" type="button" onClick={() => setIsCustomModalOpen(true)}>
              커스텀 모달 열기
            </Button>
            <p className="component-preview__alias ft-14r">CustomModal / 커스텀 모달</p>
          </div>
        </div>
        <CustomModal isOpen={isCustomModalOpen} onClose={() => setIsCustomModalOpen(false)}>
          <article className="component-preview__custom-modal-sample">
            <h3 className="ft-28b ink500">커스텀 모달</h3>
            <p className="component-preview__custom-modal-lead ft-18r ink500">
              이 모달은 콘텐츠를 직접 갖지 않는 순수 래퍼입니다. 외부에서 전달된 children의 크기를
              기준으로 자연스럽게 감싸며, 닫기 버튼과 오버레이 클릭, Esc 키로 닫을 수 있습니다.
            </p>
            <div className="component-preview__custom-modal-grid">
              <section className="component-preview__custom-modal-card">
                <h4 className="ft-22b ink500">텍스트 콘텐츠</h4>
                <p className="ft-16r ink300">
                  배경색, 둥근 모서리, 좌측 정렬은 차 컬렉션 모달의 스타일을 기준으로 맞췄습니다.
                  데스크탑은 80vw/85vh, 태블릿은 90vw/80vh, 모바일은 94vw/75vh를 기준으로 합니다.
                </p>
              </section>
              <section className="component-preview__custom-modal-card">
                <h4 className="ft-22b ink500">양식 콘텐츠</h4>
                <label className="component-preview__custom-modal-field ft-14r ink500">
                  이름
                  <Input placeholder="이름을 입력하세요" />
                </label>
                <label className="component-preview__custom-modal-field ft-14r ink500">
                  메모
                  <textarea
                    className="component-preview__custom-modal-textarea ft-16r ink500"
                    placeholder="필요한 콘텐츠를 자유롭게 주입할 수 있습니다."
                    rows={5}
                  />
                </label>
              </section>
            </div>
            <ul className="component-preview__custom-modal-list ft-16r ink300">
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index + 1}>
                  샘플 콘텐츠 {index + 1}: 실제 사용처에서는 필요한 마크업을 children으로 전달합니다.
                </li>
              ))}
            </ul>
          </article>
        </CustomModal>
      </section>

      <section className="component-preview__section">
        <h2 className="ft-28b">Content Boxes</h2>
        <div className="component-preview__content-boxes">
          {contentBoxes.slice(0, 2).map(({ alias }) => (
            <div className="component-preview__item" key={alias}>
              <ContentBox name={alias} />
              <p className="component-preview__alias ft-14r">{alias}</p>
            </div>
          ))}
          <div className="component-preview__content-boxes-row">
            {contentBoxes.slice(2).map(({ alias }) => (
              <div className="component-preview__item" key={alias}>
                <ContentBox name={alias} />
                <p className="component-preview__alias ft-14r">{alias}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
