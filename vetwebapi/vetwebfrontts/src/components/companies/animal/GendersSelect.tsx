import Select from 'react-select';

import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { useGetData } from '../../../hooks/useGetData';
import { IQueryData } from '../../../interfaces/BaseInterface';


interface GendersSelectProps {
    speciesId: string;
}

export function GendersSelect({ speciesId }: GendersSelectProps) {

    const url = `/api/companies/${speciesId}/genders`

    const { data, isLoading }: IQueryData = useGetData('genders', url);

    const { control } = useFormContext()

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.map(gender => ({ value: gender.id, label: gender.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="gender_id"
            rules={
                { required: "Gender is required!" }
            }
            render={({ field: { onChange, value }}) => (
                <Select className='custom-select'
                    isSearchable
                    isClearable
                    options={options}
                    value={getValue(value)}
                    onChange={newValue => onChange((newValue as IOption).value)}
                />
            )

            } />
    )
}