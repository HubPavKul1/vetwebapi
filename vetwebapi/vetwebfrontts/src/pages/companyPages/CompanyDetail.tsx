import { useParams } from "react-router-dom";
import { CompanyPageMenu } from "../../components/menu/CompanyPageMenu";
import { ICompanyDetail } from "../../interfaces/CompanyInterfaces";
import { PageDetail } from "../../components/PageDetail";
import { useGetDataById } from "../../hooks/useGetDataById";
import { ErrorLoadDataMessage } from "../../components/ErrorLoadDataMessage";
import { Loader } from "../../components/Loader";
import { companyDetailUrl } from "../../urls/companyUrls";
import { CompanyAddress } from "../../components/companies/address/CompanyAddress";
import { CompanyEmployees } from "../../components/companies/employee/CompanyEmployees";
import { CompanyAnimals } from "../../components/companies/animal/CompanyAnimals";

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
          {data.address ? (
            <CompanyAddress address={data.address} />
          ) : (
            <span className="text-xl underline font-bold text-red-700">
              Добавьте адрес!
            </span>
          )}
          {data.employees && <CompanyEmployees employees={data.employees} />}
          {data.animals && data.animals.length && (
            <CompanyAnimals animals={data.animals} companyId={data.id} />
          )}
        </>
      </PageDetail>
    </>
  );
}
