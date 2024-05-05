import Select from 'react-select';

import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';
import { IQueryData } from '../../../interfaces/BaseInterface';
import { AppService } from '../../../app.service';



export function PlaceOfAdministrationSelect() {

    const url = "/api/drugs/places_of_administration"
 
    const { data, isLoading}: IQueryData = useQuery(['placeOfAdministration'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.places_of_administration,
    }
);

    const { control } = useFormContext()
    if (isLoading || !data) return <p>...Загрузка</p>;

    const options = data.map(unit => ({ value: unit.id, label: unit.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="place_of_administration_id"
            rules={
                { required: "Field is required!" }
            }
            render={({ field: { onChange, value }}) => (
                <Select className='custom-select'
                    isSearchable
                    isClearable
                    options={options}
                    placeholder="Выберите место введения *"
                    value={getValue(value)}
                    onChange={newValue => onChange((newValue as IOption).value)}
                />
            )

            } />
    )
}

