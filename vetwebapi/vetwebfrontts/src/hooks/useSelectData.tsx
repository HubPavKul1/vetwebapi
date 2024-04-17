import { useQuery } from "react-query";
import { IQueryData } from "../interfaces/BaseInterface";
import { AppService } from "../app.service";
import { IOption } from "../interfaces/FormInterface";


interface UseSelectDataProps {
    url: string;
    queryKey: string;
}

export function UseSelectData(url: string, queryKey: string) {
    const { data, isLoading }: IQueryData = useQuery([`${queryKey}`], () => AppService.getAll(url),
    {
        select: ({data}) => data
    }
);

    console.log("QueryKey>>>", data)

    if(isLoading || !data) return;

    return {data}
}