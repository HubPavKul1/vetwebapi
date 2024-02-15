import Select from 'react-select'
import { AddressService } from '../company.service'
import { useQuery } from "react-query";
import DistrictsSelect from './DistrictsSelect';
import { useState } from 'react';

export default function RegionsSelect() {
    const [region, setRegion] = useState({})
    const { data, isLoading, error } = useQuery(['regions'], () => AddressService.getRegions())
    
    const options = data?.map(reg=>({value: reg.id, label: reg.name}))
    
    function handleSelect(data) {
        setRegion(data);
      }
                    
    return (
        <>
            <Select 
            isSearchable 
            isClearable
            options={options}
            onChange={handleSelect}
            />
            {region?.value ?
                <div className="form-group">
                <label htmlFor="name" className="">
                    Выберите район *
                </label>
                <DistrictsSelect region_id={region?.value}/>
                </div> : <p></p>
                }
        </>
        
        
    )
}

