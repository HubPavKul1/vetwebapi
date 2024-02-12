import Select from 'react-select'
import { AddressService } from '../company.service'
import { useQueryClient, useQuery } from "react-query";


export default function RegionsSelect() {
    const { data, isLoading, error } = useQuery(['regions'], () => AddressService.getRegions())
    
    // if(isLoading) return <p>Загрузка ...</p>

    console.log(data)
    
    const options = data
    
    
                    
    return (
        <Select 
        isSearchable={true} 
        isClearable={true} 
        options={options}
        />
    )
}

