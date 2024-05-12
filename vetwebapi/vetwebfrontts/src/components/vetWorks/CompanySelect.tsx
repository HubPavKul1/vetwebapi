import Select, { SingleValue } from 'react-select'

import { useQuery } from "react-query";
import { useState } from 'react';
import { IOption } from '../../interfaces/FormInterface';
import { AppService } from '../../app.service';
import { ICompany } from '../../interfaces/CompanyInterfaces';
import { CompanyAnymalsForm } from './CompanyAnimalsForm';



interface CompaniesProps {
    data?: ICompany[];
    isLoading: boolean;
}


export function CompanySelect() {
    const [CompanyId, setCompanyId] = useState<string | undefined>()

    const url = "/api/companies/"
    const { data, isLoading }: CompaniesProps = useQuery(['companies'], () => AppService.getAll(url),
    {
        select: ({data}) => data?.companies
    }
)

    if(isLoading || !data) return <p>Загрузка ...</p>;

    const options = data.map(item => ({ value: item.id, label: item.short_name }))

    function handleSelect(data: SingleValue<IOption>) {
        setCompanyId(data?.value.toString());
    }

    return (
        <>  
            <Select
                isSearchable
                isClearable
                options={options}
                onChange={handleSelect}
            />
            {CompanyId ?
                <div className="form-group">
                    <label>
                        Выберите животных *
                    </label>
                    <CompanyAnymalsForm companyId={CompanyId}/>
                </div> : <p></p>
            }
        </>


    )
}

