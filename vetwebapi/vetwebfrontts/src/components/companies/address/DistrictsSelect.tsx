import Select, { SingleValue } from 'react-select';
import { useState } from 'react';
import { CitiesSelect } from './CitiesSelect';
import { IOption } from '../../../interfaces/FormInterface';
import { useGetData } from '../../../hooks/useGetData';



interface DistrictsSelectProps {
    regionId: string;
}



export function DistrictsSelect({regionId}: DistrictsSelectProps) {
    const [districtId, setDistrictId] = useState<string | undefined>()
    const url = `/api/companies/regions/${regionId}/districts`
    const { data, isLoading } = useGetData('regionDistricts', url);
   
   
    if(isLoading || !data) return <p>Загрузка ...</p>;
    const options = data.districts && data.districts.map(distr=>({value: distr.id, label: distr.name}))
    
    function handleSelect(data: SingleValue<IOption>) {
        setDistrictId(data?.value?.toString());
      }
                   
    return (
        <>
            <Select className='custom-select'
            isSearchable
            isClearable
            options={options}
            onChange={handleSelect}
            />
            {districtId ?
                <div className="form-group">
                <label>
                    Выберите город *
                </label>
                <CitiesSelect districtId={districtId}/>
                </div> : <p></p>
                }

        </>
        

    )
}