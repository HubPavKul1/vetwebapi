
import { PageDetailBody, PageDetailTitle, PageDetailTop } from "shared/index";
import { PageWrapper } from "../shared/ui/PageWrapper";


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
