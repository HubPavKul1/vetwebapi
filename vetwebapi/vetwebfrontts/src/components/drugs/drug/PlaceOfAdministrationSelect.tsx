
import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";

export function PlaceOfAdministrationSelect() {
  const url = "/api/drugs/places_of_administration";

  const { data, isLoading } = useGetData("placeOfAdministration", url);
   
  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.places_of_administration}
      fieldName="place_of_administration_id"
      placeholder="Выберите место введения *"
    />
  );
}
