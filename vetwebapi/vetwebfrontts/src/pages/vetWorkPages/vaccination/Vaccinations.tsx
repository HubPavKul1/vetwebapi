import { Row } from "react-bootstrap";

import { useQuery } from "react-query";
import { Catalog } from "../../../components/Catalog";
import { catalogItemData } from "../../../components/data/CatalogItemData";
import { CatalogItem } from "../../../components/catalogItem/CatalogItem";

import { CreateItem } from "../../../components/CreateItem";
import { CreateDrugReceiptForm } from "../../../components/drugs/drugMovements/CreateDrugReceiptForm";
import { AppService } from "../../../app.service";
import { IVetwork } from "../../../interfaces/VetWorkInterfaces";
import { VetWorkCard } from "../../../components/vetWorks/VetWorkCard";
import { VaccinationCreateForm } from "../../../components/vetWorks/VaccinationCreateForm";

interface VaccinationsData {
  data?: IVetwork[];
  isLoading: boolean;
  error?: Error | null;
}

export function Vaccinations() {
  const url = "/api/vetwork/vaccinations";

  const { data, isLoading, error }: VaccinationsData = useQuery(
    ["vaccinations"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.vetworks,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

 

  return (
    <Catalog
      title="Вакцинация"
      btnTitle="Добавить вакцинацию"
      createForm={<VaccinationCreateForm />}
      cardsInRow={4}
    >
        {data.length
          ? data.map((vetWork) => (
              <CatalogItem 
                key={vetWork.id} 
                delUrl={`/api/vetwork/${vetWork.id}`}
                url={`/vetwork/${vetWork.id}`}
                imgSrc="vetworkBg.jpg"
                invQueryName="vaccinations"
                cardTitle={AppService.convertDateString(vetWork.vetwork_date).fullDate}
                id={vetWork.id}
              >

              </CatalogItem>
            ))
          : (
            <h5>Мероприятия отсутствуют</h5>
          )}
    </Catalog>
  );
}
