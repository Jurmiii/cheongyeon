import { useEffect } from "react";

import {
  previewTeaCollectionModalData,
  type TeaCollectionModalData,
} from "./teaCollectionModal.types";
import "./TeaCollectionModal.scss";

export type { TeaCollectionModalData } from "./teaCollectionModal.types";
export { previewTeaCollectionModalData } from "./teaCollectionModal.types";
export type TeaCollectionModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  data?: TeaCollectionModalData;
};

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

function TeaCollectionModalPanel({
  data,
  onClose,
  isModalMode,
}: {
  data: TeaCollectionModalData;
  onClose?: () => void;
  isModalMode: boolean;
}) {
  const titleId = `tea-collection-modal-title-${data.title}`;
  const descriptionLines = data.description.split("\n").filter(Boolean);

  return (
    <section
      className="tea-collection-modal"
      role="dialog"
      aria-modal={isModalMode}
      aria-labelledby={titleId}
    >
      <header className="tea-collection-modal__header">
        <h2 className="tea-collection-modal__title ft-48b han500" id={titleId}>
          {data.title}
        </h2>
        {isModalMode ? (
          <button className="tea-collection-modal__close-button" type="button" aria-label="닫기" onClick={onClose}>
            <CloseIcon />
          </button>
        ) : (
          <button className="tea-collection-modal__close-button" type="button" aria-label="닫기" disabled>
            <CloseIcon />
          </button>
        )}
      </header>

      <section className="tea-collection-modal__summary" aria-label="상품 요약">
        <p className="tea-collection-modal__subtitle ft-28b ink500">{data.summary}</p>
        <div className="tea-collection-modal__meta" aria-label="용량 및 가격">
          <span className="tea-collection-modal__capacity ft-22b ink300">{data.weight}</span>
          <span className="tea-collection-modal__meta-divider" aria-hidden="true" />
          <span className="tea-collection-modal__price ft-22b ink300">{data.price}</span>
        </div>
      </section>

      <section className="tea-collection-modal__description-section" aria-label="상품 상세 설명">
        <p className="tea-collection-modal__description ft-18r ink300">
          {descriptionLines.map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </p>
        <span className="tea-collection-modal__divider" aria-hidden="true" />
      </section>

      <dl className="tea-collection-modal__specs" aria-label="제원 정보">
        {data.specs.map((spec) => (
          <div className="tea-collection-modal__spec-row" key={spec.label}>
            <dt className="tea-collection-modal__spec-label ft-18r ink500">{spec.label}</dt>
            <dd className="tea-collection-modal__spec-value ft-18r ink300">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <section className="tea-collection-modal__recommendations" aria-label="추천 대상">
        <h3 className="tea-collection-modal__recommendation-title ft-28b han500">이런 분들께 추천해요</h3>
        <ul className="tea-collection-modal__recommendation-list">
          {data.recommendations.map((item) => (
            <li className="tea-collection-modal__recommendation-item" key={item}>
              <span className="tea-collection-modal__check-circle" aria-hidden="true">
                <CheckIcon />
              </span>
              <span className="tea-collection-modal__recommendation-text ft-18r ink500">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default function TeaCollectionModal({ isOpen, onClose, data }: TeaCollectionModalProps = {}) {
  const isModalMode = onClose !== undefined;
  const content = data ?? previewTeaCollectionModalData;

  useEffect(() => {
    if (!isModalMode || !isOpen) {
      return;
    }

    const scrollBlockKeys = new Set(["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "]);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      const target = event.target;
      const isInteractiveTarget =
        target instanceof HTMLElement && target.closest("button, a, input, textarea, select");

      if (scrollBlockKeys.has(event.key) && !isInteractiveTarget) {
        event.preventDefault();
      }
    };
    const preventBackgroundScroll = (event: WheelEvent | TouchEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest(".tea-collection-modal__dialog")) {
        return;
      }

      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", preventBackgroundScroll);
      window.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [isModalMode, isOpen, onClose]);

  if (isModalMode && !isOpen) {
    return null;
  }

  if (!isModalMode) {
    return <TeaCollectionModalPanel data={content} isModalMode={false} />;
  }

  return (
    <div className="tea-collection-modal__overlay" role="presentation" onClick={onClose}>
      <div className="tea-collection-modal__dialog" onClick={(event) => event.stopPropagation()}>
        <TeaCollectionModalPanel data={content} onClose={onClose} isModalMode />
      </div>
    </div>
  );
}
