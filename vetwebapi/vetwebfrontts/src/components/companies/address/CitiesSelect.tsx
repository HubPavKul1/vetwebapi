import Select, { SingleValue } from 'react-select';
import { useState } from 'react';
import { StreetsSelect } from './StreetsSelect';
import { IOption } from '../../../interfaces/FormInterface';
import { useGetData } from '../../../hooks/useGetData';

interface CitiesSelectProps {
    districtId: string;
}



export function CitiesSelect({districtId}: CitiesSelectProps) {
    const [cityId, setCityId] = useState<string | undefined>();
    const url = `/api/companies/districts/${districtId}/cities`
    const { data, isLoading } = useGetData('cities', url);

   
    if(isLoading || !data) return <p>Загрузка ...</p>;
    const options = data.cities && data.cities.map(city=>({value: city.id, label: city.name}));
    
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