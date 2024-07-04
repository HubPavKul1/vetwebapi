import { Container } from "react-bootstrap";

import { useState } from "react";

import { PageDetail } from "../../PageDetail";

import { ITableHeaders } from "../../../interfaces/BaseInterface";
import { ReportPageTable } from "../ReportPageTable";

interface ReportPageMainProps {
  reportTitle: string;
  imgSrc: string;
  reportHeaders: ITableHeaders[];
  menu: React.ReactElement;
  reportItems: any;
}

export function ReportPageMain({ ...props }: ReportPageMainProps) {
  
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
              <ReportPageTable
                reportHeaders={props.reportHeaders}
                reportItems={props.reportItems}
              />
            </Container>
          </Container>
        </PageDetail>
    </>
  );
}
