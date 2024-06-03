import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { CompanyPageMenu } from "../../../components/menu/CompanyPageMenu";

import { AppService } from "../../../app.service";
import { ICompanyDetail } from "../../../interfaces/CompanyInterfaces";
import { PageDetail } from "../../../components/PageDetail";

interface CompanyData {
  data?: ICompanyDetail;
  isLoading: boolean;
}

export function CompanyDetail() {
  const { id } = useParams();
  const url = `/api/companies/${id}`;

  const { isLoading, data }: CompanyData = useQuery(
    ["company", id],
    () => AppService.get(url),
    {
      enabled: !!id,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <>
      <PageDetail
        imgSrc="/animals.jpg"
        alt="animals.jpg"
        menu={<CompanyPageMenu />}
        title={data.full_name}
        address={data.address}
        employees={data.employees}
        animals={data.animals}
        companyId={data.id}
      ></PageDetail>

    </>
  );
}
