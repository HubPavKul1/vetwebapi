import { useQuery } from "@tanstack/react-query";
import { AppService } from "shared/services/app.service";

export function useGetAllData(queryKey: string, url: string) {
  const getData = () => AppService.getAll(url);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: getData,
    select: (data) => data,
  });

  return { data, isLoading, isError, error };
}
