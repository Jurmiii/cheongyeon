import collectionLineSymbol from "../../assets/images/05collection/collection-line-symbol.svg";
import Content5 from "../../components/common/Content5/Content5";
import type { CollectionCategory } from "./collectionProducts";
import "./CollectionCategorySection.scss";

interface CollectionCategorySectionProps {
  category: CollectionCategory;
  title: string;
}

function CollectionCategorySection({ category, title }: CollectionCategorySectionProps) {
  return (
    <section className="collection-category" aria-label={title}>
      <h3 className="collection-category__title ft-36r ink500">{title}</h3>

      <div className="collection-category__line" aria-hidden="true">
        <span className="collection-category__line-bar" />
        <img className="collection-category__line-symbol" src={collectionLineSymbol} alt="" />
        <span className="collection-category__line-bar" />
      </div>

      <div className="collection-category__products">
        {category.products.map((product) => (
          <Content5
            key={`${category.id}-${product.title}`}
            title={product.title}
            weight={product.weight}
            price={product.price}
            summary={product.summary}
            description={product.description}
            imageSrc={product.imageSrc}
          />
        ))}
      </div>
    </section>
  );
}

export default CollectionCategorySection;
