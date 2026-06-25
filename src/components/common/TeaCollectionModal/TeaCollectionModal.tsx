import "./TeaCollectionModal.scss";

const teaSpecs = [
  { label: "종류", value: "녹차" },
  { label: "원산지", value: "전라남도 보성" },
  { label: "수확시기", value: "4월 초" },
  { label: "추천음용", value: "70ºC/2분" },
  { label: "보관방법", value: "서늘하고 건조한 곳" },
];

const recommendations = [
  "은은한 향을 선호하시는 분",
  "가벼운 식사와 함께 즐기고 싶은 분",
  "하루를 시작하는 상쾌한 차를 찾는 분",
];

function CloseIcon() {
  return (
    <svg className="tea-collection-modal__close-icon" viewBox="0 0 29 36" aria-hidden="true" focusable="false">
      <path d="M5 10L24 29" />
      <path d="M24 10L5 29" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="tea-collection-modal__check-icon" viewBox="0 0 12 10" aria-hidden="true" focusable="false">
      <path d="M1 5L4.5 8.5L11 1" />
    </svg>
  );
}

export default function TeaCollectionModal() {
  return (
    <section
      className="tea-collection-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tea-collection-modal-title"
    >
      <header className="tea-collection-modal__header">
        <h2 className="tea-collection-modal__title ft-48b deep400" id="tea-collection-modal-title">
          우전
        </h2>
        <button className="tea-collection-modal__close-button" type="button" aria-label="닫기">
          <CloseIcon />
        </button>
      </header>

      <section className="tea-collection-modal__summary" aria-label="상품 요약">
        <p className="tea-collection-modal__subtitle ft-28b ink500">깊은 향과 부드러운 맛</p>
        <div className="tea-collection-modal__meta" aria-label="용량 및 가격">
          <span className="tea-collection-modal__capacity ft-28b ink300">40g</span>
          <span className="tea-collection-modal__meta-divider" aria-hidden="true" />
          <span className="tea-collection-modal__price ft-28b ink300">35,000원</span>
        </div>
      </section>

      <section className="tea-collection-modal__description-section" aria-label="상품 상세 설명">
        <p className="tea-collection-modal__description ft-22r deep300">
          맑고 섬세한 향과 은은한 감칠맛이 어우러집니다.
          <br />
          봄의 첫 기운을 담아 섬세한 여운을 남깁니다.
        </p>
        <span className="tea-collection-modal__divider" aria-hidden="true" />
      </section>

      <dl className="tea-collection-modal__specs" aria-label="제원 정보">
        {teaSpecs.map((spec) => (
          <div className="tea-collection-modal__spec-row" key={spec.label}>
            <dt className="tea-collection-modal__spec-label ft-22r ink500">{spec.label}</dt>
            <dd className="tea-collection-modal__spec-value ft-22r ink300">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <section className="tea-collection-modal__recommendations" aria-label="추천 대상">
        <h3 className="tea-collection-modal__recommendation-title ft-28b deep400">이런 분들께 추천해요</h3>
        <ul className="tea-collection-modal__recommendation-list">
          {recommendations.map((item) => (
            <li className="tea-collection-modal__recommendation-item" key={item}>
              <span className="tea-collection-modal__check-circle" aria-hidden="true">
                <CheckIcon />
              </span>
              <span className="tea-collection-modal__recommendation-text ft-22r ink500">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
