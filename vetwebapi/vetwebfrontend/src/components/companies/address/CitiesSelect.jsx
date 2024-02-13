import Select from 'react-select'
import { AddressService } from '../company.service'
import { useQueryClient, useQuery } from "react-query";
import StreetsSelect from './StreetsSelect';


export default function CitiesSelect() {
    const { data, isLoading, error } = useQuery(['cities'], () => AddressService.getCities())
    
    // if(isLoading) return <p>Загрузка ...</p>
    
    const options = data?.map(city=>({value: city.id, label: city.name}))
    
    const handleChange = selectedOption => {
        
    }
                   
    return (
        <Select 
        isSearchable
        isClearable
        options={options}
        onChange={handleChange}
        />
    )
}