import { useQuery } from "react-query";

import { AppService } from "../../app.service";
import { IQueryData } from "../../interfaces/BaseInterface";
import { CustomSelect } from "../CustomSelect";

export function BiomaterialsSelect() {
  const url = "/api/vetwork/biomaterials";

  const { data, isLoading }: IQueryData = useQuery(
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
      placeholder="Выберите биоматериал *"
    />
  );
}
