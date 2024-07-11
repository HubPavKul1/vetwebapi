import Select from "react-select";
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../interfaces/FormInterface";
import { AppService } from "../../app.service";
import { ICompany } from "../../interfaces/CompanyInterfaces";
import { IBase } from "../../interfaces/BaseInterface";
import { CustomSelect } from "../CustomSelect";

interface IBiomaterialsSelectProps {
  data?: IBase[];
  isLoading: boolean;
  error?: Error | null;
}

export function BiomaterialsSelect() {
  const url = "/api/vetwork/biomaterials";

  const { data, isLoading }: IBiomaterialsSelectProps = useQuery(
    ["biomaterials"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.biomaterials,
    }
  );


  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="biomaterial_id"
      placeholder="биоматериал"
    />
  );
}
