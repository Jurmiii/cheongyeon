import MainContentBox from "../MainContentBox/MainContentBox";
import TeaClassContentBox from "../TeaClassContentBox/TeaClassContentBox";

export type ContentBoxAlias = "content1" | "content2";

export const contentBoxAliases: Record<ContentBoxAlias, string> = {
  content1: "MainContentBox",
  content2: "TeaClassContentBox",
};

const contentBoxComponents = {
  content1: MainContentBox,
  content2: TeaClassContentBox,
};

interface ContentBoxProps {
  name: ContentBoxAlias;
}

export default function ContentBox({ name }: ContentBoxProps) {
  const Component = contentBoxComponents[name];

  return <Component />;
}
