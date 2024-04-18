import Select from 'react-select';

import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../../interfaces/FormInterface';

import { IQueryData } from '../../../interfaces/BaseInterface';
import { AppService } from '../../../app.service';



export function BudgetSelect() {

    const url = "/api/drugs/budgets"
 
    const { data, isLoading}: IQueryData = useQuery(['budgets'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.budgets,
    }
)

    const { control } = useFormContext()

    if (isLoading || !data) return <p>...Загрузка</p>;

    const options = data.map(budget => ({ value: budget.id, label: budget.name }))

    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="budget_id"
            rules={
                { required: "Budget is required!" }
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

