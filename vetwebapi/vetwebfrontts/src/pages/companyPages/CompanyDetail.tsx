import { useParams } from "react-router-dom";
import { CompanyPageMenu } from "widgets/company/CompanyPageMenu";

import { PageDetail } from "components/PageDetail";
import { useGetDataById } from "shared/hooks/useGetDataById";

import { Loader } from "shared/ui/Loader";
import { companyDetailUrl } from "shared/urls/companyUrls";

import { CompanyEmployees } from "entities/employee/ui/CompanyEmployees";
import { CompanyAnimals } from "entities/animal/ui/CompanyAnimals";
import { ErrorLoadDataMessage } from "shared/index";
import { ICompanyDetail } from "entities/company/model/companyInterfaces";
import { CompanyAddress } from "entities/address/ui/CompanyAddress";

interface CompanyData {
  data?: ICompanyDetail;
  isLoading: boolean;
  isError: boolean;
  error: Error;
}

export function CompanyDetail() {
  const { id } = useParams();
  const companyId = Number(id);

  const { isLoading, data, isError, error }: CompanyData = useGetDataById(
    "company",
    companyDetailUrl(companyId),
    id
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <>
      <PageDetail
        imgSrc="/animals.jpg"
        alt="animals.jpg"
        menu={<CompanyPageMenu />}
        title={data.full_name}
      >
        <>
          {data.address && <CompanyAddress address={data.address} />}
          {data.employees && <CompanyEmployees employees={data.employees} />}
          {data.animals && data.animals.length && (
            <CompanyAnimals animals={data.animals} companyId={data.id} />
          )}
        </>
      </PageDetail>
    </>
  );
}
