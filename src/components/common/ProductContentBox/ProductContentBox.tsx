import tea1 from "../../../assets/images/content-img/tea1.webp";
import "./ProductContentBox.scss";

export default function ProductContentBox() {
  return (
    <article className="product-content-box">
      <img className="product-content-box__image" src={tea1} alt="녹차 (綠茶)" />
      <div className="product-content-box__overlay">
        <div className="product-content-box__row">
          <h3 className="ft-22b white">녹차 (綠茶)</h3>
          <span className="ft-16r white">100g</span>
        </div>
        <p className="product-content-box__price ft-22b white">54,000원</p>
      </div>
    </article>
  );
}
