import { useEffect } from "react";

import type { SeasonTeaDetail } from "./seasonTeaDetailData";
import "./SeasonTeaDetailModal.scss";

interface SeasonTeaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SeasonTeaDetail;
}

function SeasonTeaDetailModal({ isOpen, onClose, data }: SeasonTeaDetailModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const titleId = `season-tea-detail-title-${data.id}`;

  return (
    <div className="season-tea-detail-modal" role="presentation" onClick={onClose}>
      <div
        className={[
          "season-tea-detail-modal__dialog",
          `season-tea-detail-modal__dialog--theme-${data.titleColorClass}`,
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="season-tea-detail-modal__close"
          type="button"
          aria-label="닫기"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="season-tea-detail-modal__layout">
          <section className="season-tea-detail-modal__story">
            <div className="season-tea-detail-modal__story-head">
              <h2
                className={["season-tea-detail-modal__title", "ft-64r", data.titleColorClass].join(" ")}
                id={titleId}
              >
                {data.title}
              </h2>
              <p className="season-tea-detail-modal__tagline ft-28r ink500">{data.tagline}</p>
            </div>

            <div className="season-tea-detail-modal__story-content">
              <h3 className="season-tea-detail-modal__story-title ft-28r ink500">{data.storyTitle}</h3>
              <div className="season-tea-detail-modal__story-body">
                {data.storyParagraphs.map((paragraph) => (
                  <p key={paragraph} className="season-tea-detail-modal__story-text ft-18r ink500">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <div className="season-tea-detail-modal__detail">
            <section className="season-tea-detail-modal__sensory" aria-label="향·맛·여운">
              {data.sensoryRows.map((row) => {
                const rightPercent = 100 - row.leftPercent;
                const isLeftDominant = row.leftPercent >= rightPercent;

                return (
                  <div key={row.label} className="season-tea-detail-modal__sensory-col">
                    <p className="season-tea-detail-modal__sensory-label ft-28r ink500">{row.label}</p>
                    <p className="season-tea-detail-modal__sensory-range ft-18r">{row.rangeLabel}</p>
                    <div className="season-tea-detail-modal__sensory-scale">
                      <div className="season-tea-detail-modal__sensory-scale-labels">
                        <span
                          className={[
                            "season-tea-detail-modal__sensory-end",
                            "ft-18r",
                            isLeftDominant ? "ink500" : "ink300",
                          ].join(" ")}
                        >
                          {row.leftLabel}
                          {isLeftDominant && (
                            <span className="season-tea-detail-modal__sensory-percent">{row.leftPercent}%</span>
                          )}
                        </span>
                        <span
                          className={[
                            "season-tea-detail-modal__sensory-end",
                            "ft-18r",
                            isLeftDominant ? "ink300" : "ink500",
                          ].join(" ")}
                        >
                          {row.rightLabel}
                          {!isLeftDominant && (
                            <span className="season-tea-detail-modal__sensory-percent">{rightPercent}%</span>
                          )}
                        </span>
                      </div>
                      <div
                        className="season-tea-detail-modal__compare-bar"
                        role="img"
                        aria-label={`${row.leftLabel} ${row.leftPercent}%, ${row.rightLabel} ${rightPercent}%`}
                      >
                        <span
                          className={[
                            "season-tea-detail-modal__compare-bar-segment",
                            "season-tea-detail-modal__compare-bar-segment--left",
                            isLeftDominant
                              ? "season-tea-detail-modal__compare-bar-segment--strong"
                              : "season-tea-detail-modal__compare-bar-segment--weak",
                          ].join(" ")}
                          style={{ width: `${row.leftPercent}%` }}
                        />
                        <span
                          className={[
                            "season-tea-detail-modal__compare-bar-segment",
                            "season-tea-detail-modal__compare-bar-segment--right",
                            isLeftDominant
                              ? "season-tea-detail-modal__compare-bar-segment--weak"
                              : "season-tea-detail-modal__compare-bar-segment--strong",
                          ].join(" ")}
                          style={{ width: `${rightPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="season-tea-detail-modal__meta">
              <div className="season-tea-detail-modal__recommend">
                <h3 className="season-tea-detail-modal__section-title ft-28r ink500">
                  {data.recommendTitle}
                </h3>

                <div className="season-tea-detail-modal__recommend-block">
                  <p className="season-tea-detail-modal__meta-label ft-22r">
                    {data.recommendTimeLabel}
                  </p>
                  <p className="season-tea-detail-modal__meta-value ft-18r ink500">{data.recommendTime}</p>
                  <p className="season-tea-detail-modal__meta-note ft-18r ink300">{data.recommendTimeNote}</p>
                </div>

                <div className="season-tea-detail-modal__recommend-block">
                  <p className="season-tea-detail-modal__meta-label ft-22r">
                    {data.recommendAudienceLabel}
                  </p>
                  <ul className="season-tea-detail-modal__audience-list ft-18r ink500">
                    {data.recommendAudience.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="season-tea-detail-modal__brew">
                <h3 className="season-tea-detail-modal__section-title ft-28r ink500">{data.brewTitle}</h3>

                <div className="season-tea-detail-modal__brew-block">
                  <p className="season-tea-detail-modal__meta-label ft-22r">
                    {data.brewTemperatureLabel}
                  </p>
                  <p className="season-tea-detail-modal__meta-value ft-18r ink500">{data.brewTemperature}</p>
                </div>

                <div className="season-tea-detail-modal__brew-block">
                  <p className="season-tea-detail-modal__meta-label ft-22r">
                    {data.brewDurationLabel}
                  </p>
                  <p className="season-tea-detail-modal__meta-value ft-18r ink500">{data.brewDuration}</p>
                </div>

                <div className="season-tea-detail-modal__brew-block">
                  <p className="season-tea-detail-modal__meta-label ft-22r">{data.brewCountLabel}</p>
                  <p className="season-tea-detail-modal__meta-value ft-18r ink500">{data.brewCount}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeasonTeaDetailModal;
