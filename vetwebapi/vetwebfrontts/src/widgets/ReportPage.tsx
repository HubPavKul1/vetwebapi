import { Container } from "react-bootstrap";

import { PageTable } from "shared/index";
import { PageDetail } from "widgets/PageDetail";

interface ReportPageMainProps {
  reportTitle: string;
  imgSrc: string;
  tableHeaders: string[];
  menu: React.ReactElement;
  tableItems: React.ReactNode;
}

export function ReportPage({ ...props }: ReportPageMainProps) {
  const { reportTitle, imgSrc, tableHeaders, menu, tableItems } = props;
  return (
    <>
      <PageDetail
        title={reportTitle}
        imgSrc={imgSrc}
        alt={reportTitle}
        menu={menu}
      >
        <Container>
          <Container>
            <PageTable
              tableHeaders={tableHeaders}
              tableItems={tableItems}
            />
          </Container>
        </Container>
      </PageDetail>
    </>
  );
}
