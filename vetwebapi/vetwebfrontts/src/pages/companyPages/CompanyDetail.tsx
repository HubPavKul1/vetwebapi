import { useParams } from "react-router-dom";
import { CompanyPageMenu } from "../../components/menu/CompanyPageMenu";
import { ICompanyDetail } from "../../interfaces/CompanyInterfaces";
import { PageDetail } from "../../components/PageDetail";
import { useGetDataById } from "../../hooks/useGetDataById";
import { ErrorLoadDataMessage } from "../../components/ErrorLoadDataMessage";
import { Loader } from "../../components/Loader";
import { companyDetailUrl } from "../../Urls";

interface CompanyData {
  data?: ICompanyDetail;
  isLoading: boolean;
  isError: boolean;
  error: Error
}

export function CompanyDetail() {
  const { id } = useParams();
  const companyId = Number(id);
  
  const { isLoading, data, isError, error }: CompanyData = useGetDataById("company", companyDetailUrl(companyId), id);

  if (isError) return <ErrorLoadDataMessage error={error}/>;
  if (isLoading || !data) return <Loader />;

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
