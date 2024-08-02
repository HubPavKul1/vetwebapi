import Select from 'react-select'
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "../../../interfaces/FormInterface";
import { IQueryData } from '../../../interfaces/BaseInterface';

import { useGetData } from '../../../hooks/useGetData';



export function UsageTypesSelect() {

    const url = "/api/companies/usage_types"

    const { data, isLoading }: IQueryData = useGetData('usage_types', url);

    const { control } = useFormContext()

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.map(item => ({ value: item.id, label: item.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="usage_type_id"
            rules={
                { required: "Usage Type is required!" }
            }
            render={({ field: { onChange, value } }) => (
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