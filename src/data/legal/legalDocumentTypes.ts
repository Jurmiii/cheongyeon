export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface LegalArticle {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  id: "terms" | "privacy";
  title: string;
  subtitle: string;
  effectiveDateLabel: string;
  articles: LegalArticle[];
}
