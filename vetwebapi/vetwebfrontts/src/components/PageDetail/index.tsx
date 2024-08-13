import { PageDetailTop } from "./PageDetailTop";
import { PageDetailTitle } from "./PageDetailTitle";
import { PageWrapper } from "../PageWrapper";
import { PageDetailBody } from "./PageDetailBody";

interface PageDetailProps {
  imgSrc: string;
  alt: string;
  menu: React.ReactElement;
  title: string;
  children?: React.ReactElement;
}

export function PageDetail({ ...props }: PageDetailProps) {
  return (
    <PageWrapper>
      <PageDetailTop imgSrc={props.imgSrc} alt={props.alt} menu={props.menu} />
      <PageDetailTitle title={props.title} />
      <PageDetailBody>{props.children}</PageDetailBody>
    </PageWrapper>
  );
}
