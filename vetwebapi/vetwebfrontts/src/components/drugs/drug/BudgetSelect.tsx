import Select from 'react-select';

import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';
import { DrugService } from '../drugs.service';



export function BudgetSelect() {
 
    const { data, isLoading, error } = useQuery(['budgets'], () => DrugService.getBudgets())

    const { control } = useFormContext()

    const options = data?.data?.budgets?.map(budget => ({ value: budget.id, label: budget.name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="budget_id"
            rules={
                { required: "Budget is required!" }
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

