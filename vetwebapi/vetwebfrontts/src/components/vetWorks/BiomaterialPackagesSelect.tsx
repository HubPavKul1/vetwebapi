import { useQuery } from "react-query";

import { AppService } from "../../app.service";
import { IQueryData } from "../../interfaces/BaseInterface";
import { CustomSelect } from "../CustomSelect";



export function BiomaterialPackagesSelect() {
  const url = "/api/vetwork/biomaterial_packages";

  const { data, isLoading }: IQueryData = useQuery(
    ["biomaterialPackages"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.biomaterial_packages,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="biomaterial_package_id"
      placeholder="способ упаковки биоматериала"
    />
  );
}
