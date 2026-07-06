import type { LegalBlock, LegalDocument } from "../../data/legal";
import "./LegalDocument.scss";

interface LegalDocumentProps {
  document: LegalDocument;
  variant?: "page" | "modal";
}

function renderBlock(block: LegalBlock, index: number) {
  if (block.type === "paragraph") {
    return (
      <p className="legal-document__paragraph ft-18r ink500" key={`p-${index}`}>
        {block.text}
      </p>
    );
  }

  return (
    <ul className="legal-document__list" key={`l-${index}`}>
      {block.items.map((item) => (
        <li className="legal-document__list-item ft-18r ink500" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function LegalDocument({ document, variant = "page" }: LegalDocumentProps) {
  return (
    <article
      className={["legal-document", variant === "modal" && "legal-document--modal"]
        .filter(Boolean)
        .join(" ")}
      aria-label={document.title}
    >
      <header className="legal-document__header">
        <h1 className="legal-document__title ft-48b ink500">{document.title}</h1>
        <p className="legal-document__subtitle ft-22r ink300">{document.subtitle}</p>
        <p className="legal-document__effective ft-16r ink300">{document.effectiveDateLabel}</p>
      </header>

      <div className="legal-document__body">
        {document.articles.map((article) => (
          <section className="legal-document__article" key={article.id} aria-labelledby={article.id}>
            <h2 className="legal-document__article-title ft-28b ink500" id={article.id}>
              {article.title}
            </h2>
            <div className="legal-document__article-content">
              {article.blocks.map((block, index) => renderBlock(block, index))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
