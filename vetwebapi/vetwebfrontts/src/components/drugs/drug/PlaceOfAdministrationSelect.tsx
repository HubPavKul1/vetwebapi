import { useQuery } from "react-query";

import { IQueryData } from "../../../interfaces/BaseInterface";
import { AppService } from "../../../app.service";
import { CustomSelect } from "../../CustomSelect";

export function PlaceOfAdministrationSelect() {
  const url = "/api/drugs/places_of_administration";

  const { data, isLoading }: IQueryData = useQuery(
    ["placeOfAdministration"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.places_of_administration,
    }
  );

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="place_of_administration_id"
      placeholder="Выберите место введения *"
    />
  );
}
