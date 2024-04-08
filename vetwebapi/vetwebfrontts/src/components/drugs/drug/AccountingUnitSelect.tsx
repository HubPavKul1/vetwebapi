import Select from 'react-select';

import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';
import { DrugService } from '../drugs.service';



export function AccountingUnitSelect() {
 
    const { data, isLoading, error } = useQuery(['accountingUnits'], () => DrugService.getAccountingUnits())

    const { control } = useFormContext()

    console.log("units>>>>", data)

    const options = data?.data?.accounting_units?.map(unit => ({ value: unit.id, label: unit.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="accounting_unit_id"
            rules={
                { required: "Field is required!" }
            }
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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

