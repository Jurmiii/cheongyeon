import { SEASON_CLASS_PROMO, seasonClassAssets } from "../../data/seasonClassItems";
import "./SeasonClassPromoSection.scss";

function SeasonClassPromoSection() {
  return (
    <section className="season-promo" aria-label={SEASON_CLASS_PROMO.title}>
      <img
        className="season-promo__bg"
        src={seasonClassAssets.promoBg}
        alt=""
        aria-hidden="true"
      />
      <div className="season-promo__shade" aria-hidden="true" />

      <div className="season-promo__content">
        <div className="season-promo__copy">
          <h2 className="season-promo__title ft-48b white">{SEASON_CLASS_PROMO.title}</h2>
          <p className="season-promo__subtitle ft-28r white">{SEASON_CLASS_PROMO.subtitle}</p>
        </div>
        <p className="season-promo__date ft-22r white">{SEASON_CLASS_PROMO.openLabel}</p>
      </div>
    </section>
  );
}

export default SeasonClassPromoSection;
