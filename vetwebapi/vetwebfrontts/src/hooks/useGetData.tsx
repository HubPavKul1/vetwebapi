import { useQuery } from "@tanstack/react-query";
import { AppService } from "../app.service";



export function useGetData(queryKey: string, url: string) {
    const getData = () => AppService.getAll(url)
    const {data, isLoading, isError, error} = useQuery({
        queryKey: [queryKey],
        queryFn: getData,
        select: data => data.data
    });

    if (isError) return <p>{`ERROR: ${JSON.stringify(error)}`}</p>;
    

    return ({data, isLoading, isError, error})
}