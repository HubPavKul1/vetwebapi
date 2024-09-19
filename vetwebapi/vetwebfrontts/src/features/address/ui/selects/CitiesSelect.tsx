import Select, { SingleValue } from "react-select";
import { useState } from "react";

import { IOption } from "shared/model/FormInterface";
import { useGetData } from "shared/hooks/useGetData";
import { citiesUrl } from "shared/urls/companyUrls";
import { StreetsSelect } from "./StreetsSelect";
import { IBase } from "shared/index";

interface CitiesSelectProps {
  districtId: string;
}

export function CitiesSelect({ districtId }: CitiesSelectProps) {
  const [cityId, setCityId] = useState<string | undefined>();
  const { data, isLoading } = useGetData("cities", citiesUrl(districtId));

  if (isLoading || !data) return <p>Загрузка ...</p>;
  const options =
    data.cities &&
    data.cities.map((city: IBase) => ({ value: city.id, label: city.name }));

  function handleSelect(data: SingleValue<IOption>) {
    setCityId(data?.value?.toString());
  }

  return (
    <>
      <Select
        className="custom-select"
        isSearchable
        isClearable
        options={options}
        onChange={handleSelect}
      />
      {cityId && (
        <div className="form-group">
          <label>Выберите улицу *</label>
          <StreetsSelect cityId={cityId} />
        </div>
      )}
    </>
  );
}
