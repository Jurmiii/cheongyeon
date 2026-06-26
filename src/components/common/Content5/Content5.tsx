import type { KeyboardEvent } from "react";
import tea1 from "../../../assets/images/01main/tea1.webp";
import "./Content5.scss";

export type Content5Props = {
  title?: string;
  weight?: string;
  price?: string;
  summary?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  onClick?: () => void;
};

const defaultContent = {
  title: "우전",
  weight: "40g",
  price: "35,000원",
  summary: "곡우 이전 첫물차",
  description: "맑고 섬세한 향과 은은한 감칠맛이 어우러집니다.\n봄의 첫 기운을 담아 깨끗한 여운을 남깁니다.",
  imageSrc: tea1,
  imageAlt: "우전",
} as const;

export default function Content5(props: Content5Props = {}) {
  const isPreview = Object.keys(props).length === 0;
  const title = props.title ?? defaultContent.title;
  const weight = props.weight ?? defaultContent.weight;
  const price = props.price ?? defaultContent.price;
  const summary = props.summary ?? (isPreview ? defaultContent.summary : undefined);
  const description = props.description ?? (isPreview ? defaultContent.description : "");
  const imageSrc = isPreview ? defaultContent.imageSrc : props.imageSrc;
  const imageAlt = props.imageAlt ?? title;
  const descriptionLines = description.split("\n").filter(Boolean);
  const isClickable = Boolean(props.onClick);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!props.onClick) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      props.onClick();
    }
  };

  return (
    <article
      className={["content5", isClickable && "content5--clickable"].filter(Boolean).join(" ")}
      aria-label={`${title} 상품 소개`}
      onClick={props.onClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {imageSrc ? (
        <img className="content5__image" src={imageSrc} alt={imageAlt} />
      ) : (
        <div className="content5__image content5__image--placeholder" aria-hidden="true" />
      )}
      <div className="content5__body">
        <h3 className="content5__title ft-22r ink500">{title}</h3>
        <div className="content5__meta ft-16r ink300">
          <span>{weight}</span>
          <span>{price}</span>
        </div>
        <span className="content5__divider" aria-hidden="true" />
        {summary ? <p className="content5__summary ft-16r ink500">{summary}</p> : null}
        {descriptionLines.length > 0 ? (
          <p className="content5__description ft-16r ink500">
            {descriptionLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </article>
  );
}
