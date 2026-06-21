import MainContentBox from "../MainContentBox/MainContentBox";
import ProductContentBox from "../ProductContentBox/ProductContentBox";
import ReviewContentBox from "../ReviewContentBox/ReviewContentBox";
import TeaClassContentBox from "../TeaClassContentBox/TeaClassContentBox";

export type ContentBoxAlias = "content1" | "content2" | "content3" | "content4";

export const contentBoxAliases: Record<ContentBoxAlias, string> = {
  content1: "MainContentBox",
  content2: "TeaClassContentBox",
  content3: "ProductContentBox",
  content4: "ReviewContentBox",
};

const contentBoxComponents = {
  content1: MainContentBox,
  content2: TeaClassContentBox,
  content3: ProductContentBox,
  content4: ReviewContentBox,
};

interface ContentBoxProps {
  name: ContentBoxAlias;
}

export default function ContentBox({ name }: ContentBoxProps) {
  const Component = contentBoxComponents[name];

  return <Component />;
}
