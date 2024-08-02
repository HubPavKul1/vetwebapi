import Select, { SingleValue } from 'react-select'
import { AnimalGroupsSelect } from './AnimalGroupsSelect';
import { useState } from 'react';
import { IOption } from '../../../interfaces/FormInterface';
import { IQueryData } from '../../../interfaces/BaseInterface';
import { AppService } from '../../../app.service';
import { useGetData } from '../../../hooks/useGetData';



export function TypesOfFeedingSelect() {
    const [typeOfFeedingId, setTypeOfFeedingId] = useState<string | undefined>()

    const url = "/api/companies/types_of_feeding"
    const { data, isLoading } = useGetData('types_of_feeding', url);

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.types_of_feeding && data.types_of_feeding.map(item => ({ value: item.id, label: item.name }))

    function handleSelect(data: SingleValue<IOption>) {
        setTypeOfFeedingId(data?.value.toString());
    }

    return (
        <>  
            <Select
                isSearchable
                isClearable
                options={options}
                onChange={handleSelect}
            />
            {typeOfFeedingId ?
                <div className="form-group">
                    <label>
                        Выберите группу животных *
                    </label>
                    <AnimalGroupsSelect typeOfFeedingId={typeOfFeedingId} />
                </div> : <p></p>
            }
        </>


    )
}

