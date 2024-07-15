import Select from 'react-select';
import { useQuery } from "react-query";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../interfaces/FormInterface';
import { AppService } from '../../app.service';
import { ICompany } from '../../interfaces/CompanyInterfaces';


interface ILabsSelectProps {
    data?: ICompany[];
    isLoading: boolean;
    error?: Error | null;

}

export function LabsSelect() {

    const url = "/api/companies/labs"

    const { data, isLoading }: ILabsSelectProps = useQuery(['labs'], () => AppService.getAll(url), 
    {
        select: ({data}) => data?.companies
    }
);
    
    const { control } = useFormContext()

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.map(company => ({ value: company.id, label: company.short_name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="laboratory_id"
            render={({ field: { onChange, value },
                    // fieldState: {error} 
                }) => (
                <Select className='custom-select'
                    isSearchable
                    isClearable
                    options={options}
                    value={getValue(value)}
                    onChange={newValue => onChange((newValue as IOption).value)}
                    placeholder="Выберите лабораторию"
                    
                />
            )

            } />
    )
}

