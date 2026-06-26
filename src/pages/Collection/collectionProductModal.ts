import type { TeaCollectionModalData } from "../../components/common/TeaCollectionModal/teaCollectionModal.types";
import type { CollectionCategory, CollectionProduct } from "./collectionProducts";

const categoryTypeLabels: Record<CollectionCategory["id"], string> = {
  green: "녹차",
  white: "백차",
  oolong: "청차",
  black: "홍차",
  dark: "흑차",
  herbal: "시그니처",
};

const defaultRecommendations = [
  "은은한 향을 선호하시는 분",
  "가벼운 식사와 함께 즐기고 싶은 분",
  "편안한 차 한 잔을 찾는 분",
];

export function getCollectionProductModalData(
  product: CollectionProduct,
  categoryId: CollectionCategory["id"],
): TeaCollectionModalData {
  return {
    title: product.title,
    summary: product.summary ?? "",
    weight: product.weight,
    price: product.price,
    description: product.description,
    specs: product.specs ?? [
      { label: "종류", value: categoryTypeLabels[categoryId] },
      { label: "원산지", value: "전라남도 보성" },
      { label: "수확시기", value: "제철" },
      { label: "추천음용", value: "70ºC / 2분" },
      { label: "보관방법", value: "서늘하고 건조한 곳" },
    ],
    recommendations: product.recommendations ?? defaultRecommendations,
  };
}
