import { useQuery } from "@tanstack/react-query";
import { AppService } from "services/app.service";

export function useGetDataPage(queryKey: string, url: string, pageNum: number) {
  const getData = () => AppService.getPagination(url, pageNum);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: getData,
    select: (data) => data.data,
  });

  return { data, isLoading, isError, error };
}
