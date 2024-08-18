import { useQuery } from "@tanstack/react-query";
import { AppService } from "services/app.service";

export function useGetData(queryKey: string, url: string) {
  const getData = () => AppService.getAll(url);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: getData,
    select: (data) => data.data,
  });

  return { data, isLoading, isError, error };
}
