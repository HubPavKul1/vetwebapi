import { Row } from "react-bootstrap";
import { SectionWrapper } from "shared/index";

interface HomeContentWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function HomeContentWrapper({ ...props }: HomeContentWrapperProps) {
  const { title, children } = props;
  return (
    <SectionWrapper>
      <h1 className="page-title">{title}</h1>
      <Row xs={1} sm={2} md={3} lg={3} xl={4} className="mb-10">
        {children}
      </Row>
    </SectionWrapper>
  );
}
