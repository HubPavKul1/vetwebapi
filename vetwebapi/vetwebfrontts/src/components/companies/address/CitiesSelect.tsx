import Select, { SingleValue } from 'react-select'
import { AddressService } from '../company.service'
import { useQuery } from "react-query";
import { useState } from 'react';
import { StreetsSelect } from './StreetsSelect';
import { IOption } from '../../../interfaces/FormInterface';

interface CitiesSelectProps {
    districtId: string;
}

export function CitiesSelect({districtId}: CitiesSelectProps) {
    const [cityId, setCityId] = useState<string | undefined>();
    const { data, isLoading, error } = useQuery(['cities'], () => AddressService.getDistrictCities(districtId));
    
    const options = data?.data?.cities?.map(city=>({value: city.id, label: city.name}));
    
    function handleSelect(data: SingleValue<IOption>) {
        setCityId(data?.value?.toString());
      }
                   
    return (
            <>
            <Select className='custom-select'

                isSearchable
                isClearable
                options={options}
                onChange={handleSelect}
            />
            {cityId ?
                <div className="form-group">
                <label>
                    Выберите улицу *
                </label>
                <StreetsSelect cityId={cityId}/>
                </div> : <p></p>
                }
        </>
        )       
    
}