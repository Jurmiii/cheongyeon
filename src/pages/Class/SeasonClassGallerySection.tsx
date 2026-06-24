import {
  SEASON_CLASS_GALLERY_GRID,
  SEASON_CLASS_GALLERY_TITLE,
  seasonClassGalleryItems,
} from "../../data/seasonClassGallery";
import "./SeasonClassGallerySection.scss";

const PX_PER_REM = 16;

function pxToRem(px: number) {
  return `${px / PX_PER_REM}rem`;
}

function SeasonClassGallerySection() {
  return (
    <section className="season-gallery" aria-label={SEASON_CLASS_GALLERY_TITLE}>
      <h2 className="season-gallery__title ft-48b ink500">{SEASON_CLASS_GALLERY_TITLE}</h2>

      <div className="season-gallery__grid">
        {seasonClassGalleryItems.map((item) => {
          const leftRem = pxToRem(item.frame.leftPx - SEASON_CLASS_GALLERY_GRID.leftPx);
          const topRem = pxToRem(item.frame.topPx - SEASON_CLASS_GALLERY_GRID.topPx);
          const widthRem = pxToRem(item.frame.widthPx);
          const heightRem = pxToRem(item.frame.heightPx);

          return (
            <figure
              key={item.id}
              className="season-gallery__item"
              style={{
                left: leftRem,
                top: topRem,
                width: widthRem,
                height: heightRem,
              }}
            >
              <img
                className="season-gallery__img"
                src={item.image}
                alt={item.alt}
                style={
                  item.crop
                    ? {
                        width: `${item.crop.widthPercent}%`,
                        height: `${item.crop.heightPercent}%`,
                        left: `${item.crop.leftPercent}%`,
                        top: `${item.crop.topPercent}%`,
                      }
                    : undefined
                }
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export default SeasonClassGallerySection;
