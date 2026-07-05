import eventCard1 from "../assets/images/11event/event-card-1.webp";
import eventCard2 from "../assets/images/11event/event-card-2.webp";
import eventCard3 from "../assets/images/11event/event-card-3.webp";
import eventCard4 from "../assets/images/11event/event-card-4.webp";
import eventCard5 from "../assets/images/11event/event-card-5.webp";
import eventCard6 from "../assets/images/11event/event-card-6.webp";
import eventCard7 from "../assets/images/11event/event-card-7.webp";
import eventCard8 from "../assets/images/11event/event-card-8.webp";
import eventCard9 from "../assets/images/11event/event-card-9.webp";

export type EventStatus = "progress" | "ended";

export interface EventItem {
  id: number;
  status: EventStatus;
  statusLabel: string;
  subTitle: string;
  title: string;
  /** 카드 설명 (2줄) */
  description: string;
  dateRange: string;
  image: string;
  /** 어두운 배경 이미지 → 흰색 텍스트 */
  dark?: boolean;
  /** 상세 모달 — 이벤트 기간 */
  period: string;
  /** 상세 모달 — 이벤트 내용 */
  content: string;
  /** 상세 모달 — 참여 매장 */
  store: string;
  storeLink: string;
  /** 상세 모달 — 참여 대상 */
  target: string;
  /** 상세 모달 — 유의사항 */
  notice: string;
}

const COMMON_STORE = "청연 다실 전체 매장";
const COMMON_STORE_LINK = "매장 위치 확인";
const COMMON_NOTICE =
  "사전 예약 고객에 한해 참여 가능합니다.\n원활한 진행을 위해 예약 시간을 꼭 확인해 주세요.\n매장 상황에 따라 클래스 구성이 달라질 수 있습니다.\n매장 상황에 따라 조기 마감될 수 있습니다.";

export const events: EventItem[] = [
  {
    id: 1,
    status: "progress",
    statusLabel: "진행중",
    subTitle: "티하우스 방문 이벤트",
    title: "청연에서 머무는 여름",
    description: "방문 고객을 위한 여름 한정 혜택과 차 시음 이벤트를 준비했습니다.",
    dateRange: "2026.07.01 ~ 2026.08.30",
    image: eventCard1,
    period: "2026.07.01(수) ~ 2026.08.30(일)",
    content:
      "여름 시즌 동안 청연 티하우스를 방문하는 고객을 위해\n계절 한정 차 시음과 특별 혜택을 준비했습니다.\n무더위를 식히는 청량한 차 한 잔을 경험해보세요.",
    store: COMMON_STORE,
    storeLink: COMMON_STORE_LINK,
    target: "청연 티하우스 방문 고객 누구나",
    notice: COMMON_NOTICE,
  },
  {
    id: 2,
    status: "progress",
    statusLabel: "진행중",
    subTitle: "함께하는 찻자리 이벤트",
    title: "둘이 함께 마시는 차",
    description: "소중한 사람과 함께 방문하면 동반 10%할인 혜택을 준비했습니다.",
    dateRange: "2026.07.10 ~ 2026.08.20",
    image: eventCard2,
    period: "2026.07.10(금) ~ 2026.08.20(목)",
    content:
      "2인 이상 함께 방문하는 고객께\n동반 10% 할인과 다식 세트를 제공합니다.\n가까운 사람과 여유로운 차자리를 즐겨보세요.",
    store: COMMON_STORE,
    storeLink: COMMON_STORE_LINK,
    target: "2인 이상 함께 방문한 고객 누구나",
    notice: COMMON_NOTICE,
  },
  {
    id: 3,
    status: "progress",
    statusLabel: "진행중",
    subTitle: "티 페어링 이벤트",
    title: "차와 다과의 조화",
    description: "계절차와 어울리는 다과를 함께 즐기며 새로운 맛을 경험해보세요.",
    dateRange: "2026.07.05 ~ 2026.08.25",
    image: eventCard3,
    period: "2026.07.05(일) ~ 2026.08.25(화)",
    content:
      "계절을 담은 차와 어울리는 다과를\n페어링으로 즐기는 티 페어링 이벤트입니다.\n차와 다과가 어우러진 새로운 맛을 경험해보세요.",
    store: COMMON_STORE,
    storeLink: COMMON_STORE_LINK,
    target: "티 페어링 클래스 예약 고객 누구나",
    notice: COMMON_NOTICE,
  },
  {
    id: 4,
    status: "progress",
    statusLabel: "진행중",
    subTitle: "청연 1주년 이벤트",
    title: "청연의 첫 번째 생일",
    description: "1주년 기념하여 선착순 50분께 청연 다기 세트 증정",
    dateRange: "2026.07.03 ~ 2026.07.30",
    image: eventCard4,
    period: "2026.07.03(금) ~ 2026.07.30(목)",
    content:
      "청연의 첫 번째 생일을 기념하여\n선착순 50분께 청연 다기 세트를 증정합니다.\n특별한 순간을 함께 축하해 주세요.",
    store: COMMON_STORE,
    storeLink: COMMON_STORE_LINK,
    target: "기간 내 방문 및 예약 고객 누구나",
    notice: COMMON_NOTICE,
  },
  {
    id: 5,
    status: "progress",
    statusLabel: "진행중",
    subTitle: "SNS 이벤트",
    title: "차 한 잔을 공유해요",
    description: "청연 SNS를 태그하면 추첨을 통해 미니 티 셀렉션 증정",
    dateRange: "2026.07.01 ~ 2026.07.31",
    image: eventCard5,
    period: "2026.07.01(수) ~ 2026.07.31(금)",
    content:
      "청연에서의 차 한 잔을 SNS에 공유하고\n청연 계정을 태그하면 추첨을 통해\n미니 티 셀렉션을 증정합니다.",
    store: COMMON_STORE,
    storeLink: COMMON_STORE_LINK,
    target: "SNS 이벤트 참여 고객 누구나",
    notice: COMMON_NOTICE,
  },
  {
    id: 6,
    status: "progress",
    statusLabel: "진행중",
    subTitle: "한여름 저녁 다회 이벤트",
    title: "밤에 만나는 차의 시간",
    description: "은은한 조명 아래 조용히 차를 나누는 저녁 다회를 진행합니다.",
    dateRange: "2026.07.12 ~ 2026.08.24",
    image: eventCard6,
    dark: true,
    period: "2026.07.12(일) ~ 2026.08.24(월)",
    content:
      "무더운 한여름, 해가 진 뒤\n은은한 조명 아래 조용히 차를 나누는\n저녁 다회를 진행합니다.",
    store: COMMON_STORE,
    storeLink: COMMON_STORE_LINK,
    target: "저녁 다회 예약 고객 누구나",
    notice: COMMON_NOTICE,
  },
  {
    id: 7,
    status: "ended",
    statusLabel: "종료",
    subTitle: "블렌딩 체험 이벤트",
    title: "나만의 차를 만들다",
    description: "직접 찻잎을 블렌딩하며 나만의 향을 완성하는 클래스입니다.",
    dateRange: "2026.02.01 ~ 2026.03.31",
    image: eventCard7,
    period: "2026.02.01(일) ~ 2026.03.31(화)",
    content:
      "여러 찻잎과 꽃, 향을 직접 조합하여\n세상에 하나뿐인 나만의 블렌딩 차를\n만들어보는 체험형 클래스입니다.",
    store: COMMON_STORE,
    storeLink: COMMON_STORE_LINK,
    target: "블렌딩 클래스 예약 고객 누구나",
    notice: COMMON_NOTICE,
  },
  {
    id: 8,
    status: "ended",
    statusLabel: "종료",
    subTitle: "프라이빗 다회 이벤트",
    title: "오롯이 나를 위한 차",
    description: "조용한 공간에서 누리는 프라이빗 다회로 초대합니다.",
    dateRange: "2026.01.05 ~ 2026.02.28",
    image: eventCard8,
    period: "2026.01.05(월) ~ 2026.02.28(토)",
    content:
      "소수의 인원만을 위한 프라이빗 다회로,\n방해받지 않는 조용한 공간에서\n온전히 나를 위한 차 시간을 보냅니다.",
    store: COMMON_STORE,
    storeLink: COMMON_STORE_LINK,
    target: "프라이빗 다회 예약 고객 누구나",
    notice: COMMON_NOTICE,
  },
  {
    id: 9,
    status: "ended",
    statusLabel: "종료",
    subTitle: "봄 다도 이벤트",
    title: "봄의 향을 우리다",
    description: "따뜻한 동백꽃차와 함께 계절의 변화를 느끼는 클래스입니다.",
    dateRange: "2026.03.01 ~ 2026.05.30",
    image: eventCard9,
    period: "2026.03.01(일) ~ 2026.05.30(토)",
    content:
      "봄 시즌 동안 진행된 다도 클래스 이벤트로,\n따뜻한 동백꽃차와 함께 계절의 향과 변화를\n천천히 느껴보는 시간을 준비했습니다.",
    store: COMMON_STORE,
    storeLink: COMMON_STORE_LINK,
    target: "봄 다도 클래스 예약 고객 누구나",
    notice: COMMON_NOTICE,
  },
];
