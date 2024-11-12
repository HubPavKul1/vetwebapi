import { useQuery } from "@tanstack/react-query";
import { AppService } from "shared/services/app.service";
import { userUrl } from "shared/urls/userUrls";

export function useGetUser() {
  const getData = () => AppService.getAll(userUrl);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUser"],
    queryFn: getData,
    retry: 1,
    select: (data) => data,
  });

  return { data, isLoading, isError, error };
}