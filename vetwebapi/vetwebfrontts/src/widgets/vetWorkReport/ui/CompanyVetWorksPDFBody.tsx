import { Container } from "react-bootstrap";
import { PageTable } from "shared/index";
import { companyVetWorksReportHeaders } from "shared/model/tableHeaders";
import { ICompanyVetWorksReport } from "features/vetWork/models/interfaces";
import { CompanyVetWorkReportItem } from "entities/vetWorkReport/ui/CompanyVetWorkReportItem";

interface CompanyVetWorksPDFBodyProps {
  data: ICompanyVetWorksReport[];
}

export function CompanyVetWorksPDFBody({
  ...props
}: CompanyVetWorksPDFBodyProps) {
  const { data } = props;
  const reportHeaders = companyVetWorksReportHeaders;
  const title = `Журнал ПЭМ для ${data[0].company}`;

  return (
    <Container className="text-center text-xl">
      <h1 className="mb-3">{title}</h1>
      <PageTable
        isPDF
        tableHeaders={reportHeaders}
        tableItems={data.map((item, index) => (
          <CompanyVetWorkReportItem
            key={index}
            data={item}
            rowNum={index + 1}
          />
        ))}
      />
    </Container>
  );
}
