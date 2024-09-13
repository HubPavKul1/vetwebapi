import Select, { SingleValue } from "react-select";
import { AnimalGroupsSelect } from "./AnimalGroupsSelect";
import { useState } from "react";
import { IOption } from "shared/model/FormInterface";
import { IBase } from "shared/model/BaseInterface";
import { useGetData } from "hooks/useGetData";
import { typesOfFeedingUrl } from "shared/urls/companyUrls";

export function TypesOfFeedingSelect() {
  const [typeOfFeedingId, setTypeOfFeedingId] = useState<string | undefined>();

  const { data, isLoading } = useGetData("types_of_feeding", typesOfFeedingUrl);

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const options =
    data.types_of_feeding &&
    data.types_of_feeding.map((item: IBase) => ({
      value: item.id,
      label: item.name,
    }));

  function handleSelect(data: SingleValue<IOption>) {
    setTypeOfFeedingId(data?.value.toString());
  }

  return (
    <>
      <Select
        isSearchable
        isClearable
        options={options}
        onChange={handleSelect}
      />
      {typeOfFeedingId ? (
        <div className="form-group">
          <label>Выберите группу животных *</label>
          <AnimalGroupsSelect typeOfFeedingId={typeOfFeedingId} />
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}
