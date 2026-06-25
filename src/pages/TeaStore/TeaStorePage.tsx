import subSymbol from "../../assets/images/01main/subsymbol.svg";
import { Footer, Header } from "../../components/common";
import {
  teaStoreSeasons,
  teaStoreTypes,
} from "./teaStoreData";
import "./TeaStorePage.scss";

function TeaStorePage() {
  return (
    <main className="tea-store-page">
      <div className="tea-store-page__header">
        <Header />
      </div>

      <section className="tea-store-kv" aria-label="차 이야기 키비주얼">
        <div className="tea-store-kv__grid">
          <div className="tea-store-kv__content">
            <h1 className="tea-store-kv__title ft-64b ink500">차 이야기</h1>
            <img className="tea-store-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
            <p className="tea-store-kv__description ft-28r ink500">
              차에는 자연의 시간이 담겨 있습니다.
              <br />
              한 잔에는 사람의 정성이 담겨 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="tea-store-intro" aria-label="차란 무엇인가">
        <div className="tea-store-intro__grid">
          <div className="tea-store-intro__content">
            <h2 className="tea-store-intro__title ft-48b ink500">차란 무엇인가</h2>
            <p className="tea-store-intro__description ft-28r ink500">
              차는 차나무의 잎을 수확하여
              <br />
              다듬고 만들고 우려 낸 자연의 음료입니다.
            </p>
            <p className="tea-store-intro__description ft-28r ink500">
              한 잎의 차는 자연과 시간, 그리고 사람의
              <br />
              정성이 어우러져 우리의 일상에 스며듭니다.
            </p>
          </div>
        </div>
      </section>

      <section className="tea-store-culture" aria-label="차 문화">
        <div className="tea-store-culture__grid">
          <div className="tea-store-culture__content">
            <h2 className="tea-store-culture__title ft-48b ink500">차 문화</h2>
            <p className="tea-store-culture__description ft-28r ink500">
              바쁜 일상 속에서도
              <br />
              차 한 잔은 사람을 마주 앉게 합니다.
            </p>
            <p className="tea-store-culture__description ft-28r ink500">
              차는 대화를 이어주고,
              <br />
              기다림의 가치를 알려주는 작은 문화입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="tea-store-ceremony" aria-label="다도와 차의 관계">
        <div className="tea-store-ceremony__grid">
          <div className="tea-store-ceremony__content">
            <h2 className="tea-store-ceremony__title ft-48b white">다도와 차의 관계</h2>
            <p className="tea-store-ceremony__description ft-28r white">
              다도는 차를 마시는 것을 넘어, 차를 통해 자신과
              <br />
              사람, 자연을 마주하는 하나의 생활 방식입니다.
            </p>
            <p className="tea-store-ceremony__description ft-28r white">
              청연은 이러한 다도의 정신을 바탕으로 일상 속에서
              <br />
              도 차의 가치를 온전히 느낄 수 있도록 제안합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="tea-store-kinds" aria-label="차의 종류">
        <div className="tea-store-kinds__grid">
          <div className="tea-store-kinds__content">
            <h2 className="tea-store-kinds__title ft-48b ink500">차의 종류</h2>
            <p className="tea-store-kinds__description ft-28r ink500">
              차는 발효 정도와 제조 방식에 따라 다양한 종류로 나뉩니다. 각각의 차는 고유의 향, 맛, 색을 가지고 있어 다양한 매력을 느낄 수 있습니다.
            </p>
            <p className="tea-store-kinds__description ft-28r ink500">
              청연은 한국의 자연에서 자란 찻잎으로 정성을 다해 다양한 차를 만듭니다.
            </p>
          </div>
        </div>
      </section>

      <section className="tea-store-types" aria-label="차의 기본 분류">
        <div className="tea-store-types__inner">
          <header className="tea-store-types__head">
            <h2 className="tea-store-types__title ft-36b ink500">차의 기본 분류</h2>
            <p className="tea-store-types__subtitle ft-28r ink500">
              차는 제조 방식과 발효 정보에 따라 각기 다른 맛과 향으로 나뉩니다.
            </p>
          </header>

          <div className="tea-store-types__grid">
            {teaStoreTypes.map((type) => (
              <article className="tea-store-type" key={type.id} aria-label={type.name}>
                <div className="tea-store-type__head">
                  <h3 className="tea-store-type__name ft-22b ink500">{type.name}</h3>
                  <p className="tea-store-type__tagline ft-16r ink300">{type.tagline}</p>
                </div>
                <div className="tea-store-type__visual">
                  <img
                    className="tea-store-type__image tea-store-type__image--leaf"
                    src={type.leafImage}
                    alt=""
                    aria-hidden="true"
                  />
                  <img
                    className="tea-store-type__image tea-store-type__image--cup"
                    src={type.cupImage}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <p className="tea-store-type__description ft-16r ink500">{type.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tea-store-seasons" aria-label="사계의 찻자리">
        <div className="tea-store-seasons__inner">
          <div className="tea-store-seasons__grid">
            <header className="tea-store-seasons__head">
              <h2 className="tea-store-seasons__title ft-48b white">사계의 찻자리</h2>
              <p className="tea-store-seasons__subtitle ft-28r white">
                계절이 빚어내는 네가지 향연,
                <br />
                가장 아름다운 순간의 청연을 만나보세요
              </p>
            </header>

            {teaStoreSeasons.map((season) => (
              <article className="tea-store-season" key={season.id}>
                <img
                  className="tea-store-season__image"
                  src={season.image}
                  alt={season.description.split("\n")[0]}
                />
                <p className="tea-store-season__description ft-28r white">{season.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default TeaStorePage;
