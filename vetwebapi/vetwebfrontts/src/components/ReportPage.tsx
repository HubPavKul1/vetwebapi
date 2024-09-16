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
  return (
    <>
      <PageDetail
        title={props.reportTitle}
        imgSrc={props.imgSrc}
        alt={props.reportTitle}
        menu={props.menu}
      >
        <Container>
          <Container>
            <PageTable
              tableHeaders={props.tableHeaders}
              tableItems={props.tableItems}
              isDrugReport
            />
          </Container>
        </Container>
      </PageDetail>
    </>
  );
}
