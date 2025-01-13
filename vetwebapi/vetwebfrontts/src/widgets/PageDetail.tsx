import {
  PageDetailBody,
  PageDetailTitle,
  PageDetailTop,
  PageWrapper,
  SectionWrapper,
} from "shared/index";

interface PageDetailProps {
  imgSrc: string;
  alt: string;
  menu: React.ReactElement;
  title: string;
  children?: React.ReactElement;
}

export function PageDetail({ ...props }: PageDetailProps) {
  const { imgSrc, alt, menu, title, children } = props;
  return (
    <SectionWrapper>
      <PageDetailTop imgSrc={imgSrc} alt={alt} menu={menu} />
      <PageDetailTitle title={title} />
      <PageDetailBody>{children}</PageDetailBody>
    </SectionWrapper>
  );
}
