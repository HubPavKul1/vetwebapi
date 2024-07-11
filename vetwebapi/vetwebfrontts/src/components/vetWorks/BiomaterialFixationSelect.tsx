
import { useQuery } from "react-query";

import { AppService } from "../../app.service";
import { IBase } from "../../interfaces/BaseInterface";
import { CustomSelect } from "../CustomSelect";

interface IBiomaterialFixationSelectProps {
  data?: IBase[];
  isLoading: boolean;
  error?: Error | null;
}

export function BiomaterialFixationsSelect() {
  const url = "/api/vetwork/biomaterial_fixations";

  const { data, isLoading }: IBiomaterialFixationSelectProps = useQuery(
    ["biomaterialFixations"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.biomaterial_fixations,
    }
  );


  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <CustomSelect
      data={data}
      fieldName="biomaterial_fixation_id"
      placeholder="способ фиксации биоматериала"
    />
  );
}
