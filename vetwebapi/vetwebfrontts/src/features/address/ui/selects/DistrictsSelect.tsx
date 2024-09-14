import Select, { SingleValue } from "react-select";
import { useState } from "react";
import { CitiesSelect } from "./CitiesSelect";
import { IOption } from "shared/model/FormInterface";
import { useGetData } from "shared/hooks/useGetData";
import { IBase } from "shared/model/BaseInterface";
import { districtsUrl } from "shared/urls/companyUrls";

interface DistrictsSelectProps {
  regionId: string;
}

export function DistrictsSelect({ regionId }: DistrictsSelectProps) {
  const [districtId, setDistrictId] = useState<string | undefined>();

  const { data, isLoading } = useGetData(
    "regionDistricts",
    districtsUrl(regionId)
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;
  const options =
    data.districts &&
    data.districts.map((distr: IBase) => ({
      value: distr.id,
      label: distr.name,
    }));

  function handleSelect(data: SingleValue<IOption>) {
    setDistrictId(data?.value?.toString());
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
      {districtId ? (
        <div className="form-group">
          <label>Выберите город *</label>
          <CitiesSelect districtId={districtId} />
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}
