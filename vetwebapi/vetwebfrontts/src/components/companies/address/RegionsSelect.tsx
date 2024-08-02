import Select, { SingleValue } from 'react-select';
import { DistrictsSelect } from './DistrictsSelect';
import { useState } from 'react';
import { IOption } from '../../../interfaces/FormInterface';
import { IQueryData } from '../../../interfaces/BaseInterface';
import { useGetData } from '../../../hooks/useGetData';




export function RegionsSelect() {
    const [regionId, setRegionId] = useState<string | undefined>()

    const url = "/api/companies/regions"

    const { data, isLoading } = useGetData('regions', url);
    

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.regions && data.regions.map(reg =>({value: reg.id, label: reg.name}))
    
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

