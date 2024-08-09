
import { CustomSelect } from "../../CustomSelect";
import { useGetData } from "../../../hooks/useGetData";
import { placesOfAdministrationUrl } from "../../../Urls";

export function PlaceOfAdministrationSelect() {
 
  const { data, isLoading } = useGetData("placeOfAdministration", placesOfAdministrationUrl);
   
  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.places_of_administration}
      fieldName="place_of_administration_id"
      placeholder="Выберите место введения *"
    />
  );
}
