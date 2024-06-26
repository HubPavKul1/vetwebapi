import Select, { SingleValue } from 'react-select'

import { useQuery } from "react-query";
import { IOption } from '../../interfaces/FormInterface';
import { AppService } from '../../app.service';
import { ICompany } from '../../interfaces/CompanyInterfaces';
import { Controller, useFormContext } from 'react-hook-form';



interface CompaniesProps {
    data?: ICompany[];
    isLoading: boolean;
}


export function CompanySelect() {
    
    const url = "/api/companies/"
    const { data, isLoading }: CompaniesProps = useQuery(['companies'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.companies
    }
)

    const { control } = useFormContext()

    if(isLoading || !data) return <p>Загрузка ...</p>;

    

    const options = data.map(item => ({ value: item.id, label: item.short_name }))

    const getValue = (value: number) => 
        value ? options?.find((option) => option.value === value) : ""

    // function handleSelect(data: SingleValue<IOption>) {
    //     setCompanyId(data?.value.toString());
    // }

    return (
        <Controller 
            control={control} 
            name="company_id" 
            rules={
            {required: "Company is required!"}
            }
        render={({field: {onChange, value}}) => (
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

