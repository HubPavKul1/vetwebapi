import Select from 'react-select';

import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';
import { IBase } from '../../../interfaces/BaseInterface';

import { useGetData } from '../../../hooks/useGetData';
import { accountingUnitsUrl } from '../../../Urls';



export function AccountingUnitSelect() {

   
 
    const { data, isLoading} = useGetData('accountingUnits', accountingUnitsUrl);
   
    const { control } = useFormContext()
    if (isLoading || !data) return <p>...Загрузка</p>;

    const options = data.accounting_units && data.accounting_units.map((unit: IBase) => ({ value: unit.id, label: unit.name }))


    const getValue = (value: number) =>
        value ? options?.find((option: IOption) => option.value === value) : ""


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
                    placeholder="Выберите единицу учета *"
                    value={getValue(value)}
                    onChange={newValue => onChange((newValue as IOption).value)}
                />
            )

            } />
    )
}

