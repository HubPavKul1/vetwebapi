import Select, { SingleValue } from "react-select";
import { useState } from "react";
import { SpeciesSelect } from "./SpeciesSelect";
import { IOption } from "interfaces/FormInterface";
import { useGetData } from "hooks/useGetData";
import { animalGroupsUrl } from "urls/companyUrls";
import { IBase } from "interfaces/BaseInterface";

interface AnimalGroupsSelectProps {
  typeOfFeedingId: string;
}

export function AnimalGroupsSelect({
  typeOfFeedingId,
}: AnimalGroupsSelectProps) {
  const [animalGroupId, setAnimalGroupId] = useState<string | undefined>();

  const { data, isLoading } = useGetData(
    "animal_groups",
    animalGroupsUrl(typeOfFeedingId)
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const options =
    data.animal_groups &&
    data.animal_groups.map((group: IBase) => ({
      value: group.id,
      label: group.name,
    }));

  function handleSelect(data: SingleValue<IOption>) {
    setAnimalGroupId(data?.value?.toString());
  }

  return (
    <>
      <Select
        className="custom-select"
        id="animalGroup"
        isSearchable
        isClearable
        options={options}
        onChange={handleSelect}
      />
      {animalGroupId ? (
        <div className="form-group">
          <label>Выберите вид животного *</label>
          <SpeciesSelect animalGroupId={animalGroupId} />
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}
