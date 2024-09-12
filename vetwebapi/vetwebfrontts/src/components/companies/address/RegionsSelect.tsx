import Select, { SingleValue } from "react-select";
import { DistrictsSelect } from "./DistrictsSelect";
import { useState } from "react";
import { IOption } from "shared/model/FormInterface";
import { IBase } from "shared/model/BaseInterface";
import { useGetData } from "hooks/useGetData";
import { regionsUrl } from "urls/companyUrls";

export function RegionsSelect() {
  const [regionId, setRegionId] = useState<string | undefined>();

  const { data, isLoading } = useGetData("regions", regionsUrl);

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const options =
    data.regions &&
    data.regions.map((reg: IBase) => ({ value: reg.id, label: reg.name }));

  function handleSelect(data: SingleValue<IOption>) {
    setRegionId(data?.value.toString());
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
      {regionId ? (
        <div className="form-group">
          <label>Выберите район *</label>
          <DistrictsSelect regionId={regionId} />
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}
