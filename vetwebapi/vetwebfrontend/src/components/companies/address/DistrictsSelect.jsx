import Select from 'react-select'
import { AddressService } from '../company.service'
import { useQueryClient, useQuery } from "react-query";


export default function DistrictsSelect() {
    const { data, isLoading, error } = useQuery(['districts'], () => AddressService.getDistricts())
    
    // if(isLoading) return <p>Загрузка ...</p>
    
    const options = data?.map(distr=>({value: distr.id, label: distr.name}))
    
                   
    return (
        <Select 
        isSearchable
        isClearable
        options={options}
        />
    )
}