export type CollectionTabId =
  | "all"
  | "green"
  | "white"
  | "oolong"
  | "black"
  | "dark"
  | "herbal";

export type CollectionTab = {
  id: CollectionTabId;
  label: string;
};

export const collectionTabs: CollectionTab[] = [
  { id: "all", label: "전체" },
  { id: "green", label: "녹차" },
  { id: "white", label: "백차" },
  { id: "oolong", label: "청차" },
  { id: "black", label: "홍차" },
  { id: "dark", label: "흑차" },
  { id: "herbal", label: "대용량 & 시그니처" },
];
