import Select from 'react-select';
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from '../../interfaces/FormInterface';
import { ICompany } from '../../interfaces/CompanyInterfaces';
import { useGetData } from '../../hooks/useGetData';


interface IClinicSelectProps {
    data?: ICompany[];
    isLoading: boolean;
    error?: Error | null;

}

export function ClinicSelect() {

    const url = "/api/companies/vets"

    const { data, isLoading }: IClinicSelectProps = useGetData('clinics', url);
   
    
    const { control } = useFormContext()

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.companies && data.companies.map(company => ({ value: company.id, label: company.short_name }))


    const getValue = (value: number) =>
        value ? options?.find((option) => option.value === value) : ""


    return (
        <Controller
            control={control}
            name="clinic_id"
            rules={
                { required: "Clinic is required!" }
            }
            render={({ field: { onChange, value },
                    // fieldState: {error} 
                }) => (
                <Select className='custom-select'
                    isSearchable
                    isClearable
                    options={options}
                    value={getValue(value)}
                    onChange={newValue => onChange((newValue as IOption).value)}
                    placeholder="Выберите ветклинику"
                    
                />
            )

            } />
    )
}

