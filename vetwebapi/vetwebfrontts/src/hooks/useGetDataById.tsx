import { useQuery } from "@tanstack/react-query";
import { AppService } from "../app.service";


export function useGetDataById(queryKey: string, url: string, id?: string) {
    const getData = () => AppService.get(url)
    const {data, isLoading, isError, error} = useQuery({
        queryKey: [queryKey, id],
        queryFn: getData,
        enabled: !!id,
        // select: data => data.data
    });

    if (isError) return <p>{`ERROR: ${JSON.stringify(error)}`}</p>;
    
    return ({data, isLoading, isError, error})
}