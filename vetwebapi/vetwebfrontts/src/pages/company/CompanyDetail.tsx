import { useParams } from "react-router-dom";

import {
  companyDetailUrl,
  ErrorLoadDataMessage,
  Loader,
  useGetDataById,
} from "shared/index";


import { CompanyPageMenu, PageDetail } from "widgets/index";
import { CompanyEmployees } from "entities/employee";
import { CompanyAnimals } from "entities/animal";
import { CompanyAddress } from "entities/address";
import { ICompanyDetail } from "entities/company";
import { CompanyQueryKeys } from "shared/constants/companyConst";

interface CompanyData {
  data?: ICompanyDetail;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function CompanyDetail() {
  const { id } = useParams();
  const companyId = Number(id);
  const queryKey = CompanyQueryKeys.companyDetail

  const { isLoading, data, isError, error }: CompanyData = useGetDataById(
    queryKey,
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
