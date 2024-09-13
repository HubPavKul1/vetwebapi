import { Container } from "react-bootstrap";

import { PageDetail } from "components/PageDetail";

import { PageTable } from "widgets/PageTable";

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
