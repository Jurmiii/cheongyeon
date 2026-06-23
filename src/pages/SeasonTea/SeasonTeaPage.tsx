import subSymbol from "../../assets/images/01main/subsymbol.svg";
import { Header } from "../../components/common";
import "./SeasonTeaPage.scss";

function SeasonTeaPage() {
  return (
    <main className="season-tea-page">
      <div className="season-tea-page__header">
        <Header />
      </div>

      <section className="season-tea-kv" aria-label="계절의 차 키비주얼">
        <div className="season-tea-kv__grid">
          <h1 className="season-tea-kv__title ft-64r ink500">계절의 차</h1>
          <img className="season-tea-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
          <p className="season-tea-kv__description ft-28r ink500">
            계절이 머문 향과 풍미를 담아,
            <br />
            가장 아름다운 순간을 전합니다.
          </p>
        </div>
      </section>
    </main>
  );
}

export default SeasonTeaPage;
