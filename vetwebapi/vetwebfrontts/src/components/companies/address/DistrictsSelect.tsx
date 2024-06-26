import Select, { SingleValue } from 'react-select';
import { useQuery } from "react-query";
import { useState } from 'react';
import { CitiesSelect } from './CitiesSelect';
import { IOption } from '../../../interfaces/FormInterface';
import { AppService } from '../../../app.service';
import { IQueryData } from '../../../interfaces/BaseInterface';



interface DistrictsSelectProps {
    regionId: string;
}



export function DistrictsSelect({regionId}: DistrictsSelectProps) {
    const [districtId, setDistrictId] = useState<string | undefined>()
    const url = `/api/companies/regions/${regionId}/districts`
    const { data, isLoading }: IQueryData = useQuery(['regionDistricts'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.districts
    }
);
   
    if(isLoading || !data) return <p>Загрузка ...</p>;
    const options = data.map(distr=>({value: distr.id, label: distr.name}))
    
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