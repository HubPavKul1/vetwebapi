import { Catalog } from "components/Catalog";
import { useGetData } from "hooks/useGetData";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "components/Loader";
import { CreateCompany } from "./CreateCompany";
import { CompanyCards } from "./CompanyCards";

interface CompaniesCatalogProps {
  url: string;
  title: string;
  btnTitle: string;
  imgSrc: string;
  invQueryName: string;
}

export function CompaniesCatalog({
  url,
  title,
  btnTitle,
  imgSrc,
  invQueryName,
}: CompaniesCatalogProps) {
  const { data, isLoading, isError, error } = useGetData(invQueryName, url);

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <Catalog
      title={title}
      btnTitle={btnTitle}
      cardsInRow={3}
      createForm={<CreateCompany url={url} invQueryName={invQueryName} />}
      dataLength={data.length}
    >
      {data && data.companies && data.companies.length && (
        <CompanyCards
          companies={data.companies}
          invQueryName={invQueryName}
          imgSrc={imgSrc}
          />
      
      )}
    </Catalog>
  );
}
