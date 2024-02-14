import Select from 'react-select'
import { AddressService } from '../company.service'
import { useQueryClient, useQuery } from "react-query";


export default function RegionsSelect() {
    const { data, isLoading, error } = useQuery(['regions'], () => AddressService.getRegions())
    
    // if(isLoading) return <p>Загрузка ...</p>

    // console.log(data)
    
    const options = data?.map(reg=>({value: reg.id, label: reg.name}))
    
                    
    return (
        
        <Select 
        isSearchable 
        isClearable
        options={options}
        />
        
    )
}

