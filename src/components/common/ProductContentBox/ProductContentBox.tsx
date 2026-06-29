import tea1 from "../../../assets/images/01main/tea1.webp";
import "./ProductContentBox.scss";

type ProductContentBoxProps = {
  image?: string;
  name?: string;
  capacity?: string;
  price?: string;
  className?: string;
};

export default function ProductContentBox({
  image = tea1,
  name = "녹차 (綠茶)",
  capacity = "100g",
  price = "54,000원",
  className = "",
}: ProductContentBoxProps) {
  return (
    <article className={["product-content-box", className].filter(Boolean).join(" ")}>
      <img className="product-content-box__image" src={image} alt={name} />
      <div className="product-content-box__overlay">
        <div className="product-content-box__row">
          <h3 className="ft-22b white">{name}</h3>
          <span className="ft-16r white">{capacity}</span>
        </div>
        <p className="product-content-box__price ft-22b white">{price}</p>
      </div>
    </article>
  );
}
