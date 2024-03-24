import Select, { SingleValue } from 'react-select'
import { AddressService } from '../company.service'
import { useQuery } from "react-query";
import { DistrictsSelect } from './DistrictsSelect';
import { useState } from 'react';
import { IOption } from '../../../interfaces/FormInterface';



export function RegionsSelect() {
    const [regionId, setRegionId] = useState<string | undefined>()
    const { data, isLoading, error } = useQuery(['regions'], () => AddressService.getRegions())
    
    const options = data?.data?.regions?.map(reg=>({value: reg.id, label: reg.name}))
    
    function handleSelect(data: SingleValue<IOption>) {
        setRegionId(data?.value.toString());
      }
                    
    return (
        <>
            <Select 
            className='custom-select'
            isSearchable 
            isClearable
            options={options}
            onChange={handleSelect}
            />
            {regionId ?
                <div className="form-group">
                <label>
                    Выберите район *
                </label>
                <DistrictsSelect regionId={regionId}/>
                </div> : <p></p>
                }
        </>
        
        
    )
}

