import Select from 'react-select';

import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';
import { IQueryData } from '../../../interfaces/BaseInterface';
import { AppService } from '../../../app.service';



export function DisposalMethodSelect() {

    const url = "/api/drugs/disposal_methods"
 
    const { data, isLoading}: IQueryData = useQuery(['disposalMethods'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.disposal_methods,
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
            name="disposal_method_id"
            rules={
                { required: "Field is required!" }
            }
            render={({ field: { onChange, value }}) => (
                <Select className='custom-select'
                    isSearchable
                    isClearable
                    options={options}
                    placeholder="Выберите способ утилизации *"
                    value={getValue(value)}
                    onChange={newValue => onChange((newValue as IOption).value)}
                />
            )

            } />
    )
}

