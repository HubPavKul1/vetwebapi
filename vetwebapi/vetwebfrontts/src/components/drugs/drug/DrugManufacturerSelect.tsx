import Select from 'react-select';

import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';

import { AppService } from '../../../app.service';
import { IQueryData } from '../../../interfaces/BaseInterface';



export function DrugManufacturerSelect() {

    const url = "/api/drugs/drug_manufacturers"
 
    const { data, isLoading }: IQueryData = useQuery(['drugManufacturers'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.drug_manufacturers,
    }
);

    const { control } = useFormContext()
    if (isLoading || !data) return <p>...Загрузка</p>;

    const options = data.map(item => ({ value: item.id, label: item.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="drug_manufacturer_id"
            rules={
                { required: "Field is required!" }
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

