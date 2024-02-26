import Select, { SingleValue } from 'react-select'
import { AddressService } from '../company.service'
import { useQuery } from "react-query";
import { useState } from 'react';
import { CitiesSelect } from './CitiesSelect';
import { IOption } from '../../../interfaces/FormInterface';



interface DistrictsSelectProps {
    regionId: string;
}

export function DistrictsSelect({regionId}: DistrictsSelectProps) {
    const [districtId, setDistrictId] = useState<string | undefined>()
    const { data, isLoading, error } = useQuery(['regionDistricts'], () => AddressService.getRegionDistricts(regionId))
    
    const options = data?.data?.districts?.map(distr=>({value: distr.id, label: distr.name}))
    
    function handleSelect(data: SingleValue<IOption>) {
        setDistrictId(data?.value?.toString());
      }
                   
    return (
        <>
            <Select 
            isSearchable
            isClearable
            options={options}
            onChange={handleSelect}
            />
            {districtId ?
                <div className="form-group">
                <label htmlFor="name" className="">
                    Выберите город *
                </label>
                <CitiesSelect districtId={districtId}/>
                </div> : <p></p>
                }

        </>
        

    )
}