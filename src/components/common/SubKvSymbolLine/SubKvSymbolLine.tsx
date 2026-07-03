import collectionLineSymbol from "../../../assets/images/05collection/collection-line-symbol.svg";
import symbolWhite from "../../../assets/images/01main/symbol-white.svg";

export type SubKvSymbolLineTone = "ink" | "white" | "responsive";

type SymbolLineProps = {
  blockClass: string;
  tone: "ink" | "white";
};

function SymbolLine({ blockClass, tone }: SymbolLineProps) {
  const symbol = tone === "white" ? symbolWhite : collectionLineSymbol;

  return (
    <div className={`${blockClass}__symbol-line ${blockClass}__symbol-line--${tone}`} aria-hidden="true">
      <span className={`${blockClass}__line-bar`} />
      <img className={`${blockClass}__line-symbol`} src={symbol} alt="" />
      <span className={`${blockClass}__line-bar`} />
    </div>
  );
}

type SubKvSymbolLineProps = {
  blockClass: string;
  tone?: SubKvSymbolLineTone;
};

export default function SubKvSymbolLine({ blockClass, tone = "ink" }: SubKvSymbolLineProps) {
  if (tone === "responsive") {
    return (
      <div className={`${blockClass}__symbol-line-group`} aria-hidden="true">
        <SymbolLine blockClass={blockClass} tone="ink" />
        <SymbolLine blockClass={blockClass} tone="white" />
      </div>
    );
  }

  return <SymbolLine blockClass={blockClass} tone={tone} />;
}
