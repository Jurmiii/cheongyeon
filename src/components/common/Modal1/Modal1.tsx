import Badge from "../Badge";
import Button from "../Button";
import Icon from "../Icon";
import type { IconName } from "../Icon";
import "./Modal1.scss";

interface ModalInfoBlock {
  icon: IconName;
  title: string;
  content: string[];
  link?: string;
}

const modalInfoBlocks: ModalInfoBlock[] = [
  {
    icon: "calendar",
    title: "이벤트 기간",
    content: ["2026.07.10(금) ~ 2026.08.20(목)"],
  },
  {
    icon: "gift",
    title: "이벤트 내용",
    content: [
      "이벤트 기간 동안 2인 이상 방문 고객께 차와 함께",
      "즐기기 좋은 다식 세트를 제공해요. 친구, 가족, 연인과 함께 청연의 차자리에서 여유로운 시간을 보내보세요.",
    ],
  },
  {
    icon: "location-dot",
    title: "참여 매장",
    content: ["청연다도 공간 전체 매장"],
    link: "매장 위치 확인",
  },
  {
    icon: "user",
    title: "참여 대상",
    content: ["2人 이상 함께 방문한 고객 누구나"],
  },
  {
    icon: "clipboard",
    title: "유의사항",
    content: [
      "- 다식 세트는 한 팀당 1회 제공돼요.",
      "- 매장 상황에 따라 제공 구성이 달라질 수 있어요.",
      "- 좌석은 현장 상황에 따라 배정돼요.",
      "- 타 이벤트 및 쿠폰과 중복 적용되지 않아요.",
    ],
  },
];

export default function Modal1() {
  return (
    <section className="modal1" role="dialog" aria-modal="true" aria-labelledby="modal1-title">
      <header className="modal1__header">
        <Badge className="modal1__badge" variant="ba2">
          진행중
        </Badge>
        <p className="modal1__subtitle ft-22r ink500">함께하는 차자리 이벤트</p>
        <h2 className="modal1__title ft-36b ink500" id="modal1-title">
          둘이 함께 마시는 차
        </h2>
        <p className="modal1__description ft-22r ink500">
          소중한 사람과 함께 차를 마시며
          <br />
          다식이 더해진 따뜻한 시간을 나눠보세요.
        </p>
        <p className="modal1__period ft-18r ink500">2026.07.10 ~ 2026.08.20</p>
      </header>

      <div className="modal1__info-box">
        {modalInfoBlocks.map((block) => (
          <article className="modal1__info-block" key={block.title}>
            <div className="modal1__info-row">
              <span className="modal1__icon-circle" aria-hidden="true">
                <Icon className="modal1__info-icon" name={block.icon} />
              </span>
              <div className="modal1__info-copy">
                <h3 className="modal1__info-title ft-18r ink500">{block.title}</h3>
                <p className="modal1__info-content ft-14r ink500">
                  {block.content.map((line, index) => (
                    <span key={`${block.title}-${index}`}>
                      {line}
                      {index < block.content.length - 1 && <br />}
                    </span>
                  ))}
                </p>
                {block.link && (
                  <button className="modal1__inline-link ft-14r ink500" type="button">
                    <span>{block.link}</span>
                    <Icon className="modal1__inline-link-icon" name="chevron-right" />
                  </button>
                )}
              </div>
            </div>
            <span className="modal1__divider" aria-hidden="true" />
          </article>
        ))}
      </div>

      <Button className="modal1__close-button" variant="btn7" showIcon={false}>
        닫기
      </Button>
    </section>
  );
}
