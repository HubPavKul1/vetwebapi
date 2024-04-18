import Select from 'react-select';

import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';
import { IQueryData } from '../../../interfaces/BaseInterface';
import { AppService } from '../../../app.service';



export function AccountingUnitSelect() {

    const url = "/api/drugs/accounting_units"
 
    const { data, isLoading}: IQueryData = useQuery(['accountingUnits'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.accounting_units,
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
            name="accounting_unit_id"
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

