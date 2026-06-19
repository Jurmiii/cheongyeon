import "./MainContentBox.scss";

export default function MainContentBox() {
  return (
    <article className="main-content-box">
      <div className="main-content-box__image" aria-hidden="true" />
      <div className="main-content-box__text">
        <h3 className="ft-28b ink500">티 블렌더 클래스</h3>
        <p className="ft-22r ink500">나만의 시그니처 블렌딩을 만들어보는 시간</p>
      </div>
    </article>
  );
}
