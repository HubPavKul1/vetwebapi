import { Container } from "react-bootstrap";

import { PageDetail } from "../PageDetail";

import { ITableHeaders } from "../../interfaces/BaseInterface";
import { PageTable } from "../PageTable";

interface ReportPageMainProps {
  reportTitle: string;
  imgSrc: string;
  reportHeaders: ITableHeaders[];
  menu: React.ReactElement;
  reportItems: any;
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
              reportHeaders={props.reportHeaders}
              reportItems={props.reportItems}
            />
          </Container>
        </Container>
      </PageDetail>
    </>
  );
}
