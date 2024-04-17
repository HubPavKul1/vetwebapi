import Select, { SingleValue } from 'react-select';
import { useQuery } from "react-query";
import { DistrictsSelect } from './DistrictsSelect';
import { useState } from 'react';
import { IOption } from '../../../interfaces/FormInterface';
import { AppService } from '../../../app.service';
import { IQueryData } from '../../../interfaces/BaseInterface';




export function RegionsSelect() {
    const [regionId, setRegionId] = useState<string | undefined>()

    const url = "/api/companies/regions"

    // const {data}: ISelectData = UseSelectData(url, "regions")

    const { data, isLoading }: IQueryData = useQuery(['regions'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.regions
    }
);

    if(isLoading || !data) return <p>Загрузка ...</p>;
    const options = data.map(reg=>({value: reg.id, label: reg.name}))
    
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

