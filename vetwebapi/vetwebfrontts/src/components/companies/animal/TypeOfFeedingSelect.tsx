import Select, { SingleValue } from 'react-select'

import { useQuery } from "react-query";
import { AnimalGroupsSelect } from './AnimalGroupsSelect';
import { useState } from 'react';
import { IOption } from '../../../interfaces/FormInterface';
import { AnimalService } from '../company.service';



export function TypesOfFeedingSelect() {
    const [typeOfFeedingId, setTypeOfFeedingId] = useState<string | undefined>()
    const { data, isLoading, error } = useQuery(['types_of_feeding'], () => AnimalService.getTypeOfFeeding())

    const options = data?.data?.types_of_feeding?.map(item => ({ value: item.id, label: item.name }))

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

