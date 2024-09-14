import { useGetData } from "shared/hooks/useGetData";
import { CustomSelect } from "shared/index";
import { placesOfAdministrationUrl } from "shared/urls/drugUrls";

export function PlaceOfAdministrationSelect() {
  const { data, isLoading } = useGetData(
    "placeOfAdministration",
    placesOfAdministrationUrl
  );

  if (isLoading || !data) return <p>...Загрузка</p>;

  return (
    <CustomSelect
      data={data.places_of_administration}
      fieldName="place_of_administration"
      placeholder="Выберите место введения *"
      isValueString={true}
    />
  );
}
