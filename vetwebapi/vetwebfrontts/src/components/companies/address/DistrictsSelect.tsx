import Select from 'react-select'
import { AddressService } from '../company.service'
import { useQuery } from "react-query";
import { useState } from 'react';
import CitiesSelect from './CitiesSelect';


export default function DistrictsSelect({region_id}) {
    const [district, setDistrict] = useState({})
    const { data, isLoading, error } = useQuery(['regionDistricts'], () => AddressService.getRegionDistricts(region_id))
    
    const options = data?.map(distr=>({value: distr.id, label: distr.name}))
    
    function handleSelect(data) {
        setDistrict(data);
      }
                   
    return (
        <>
            <Select 
            isSearchable
            isClearable
            options={options}
            onChange={handleSelect}
            />
            {district?.value ?
                <div className="form-group">
                <label htmlFor="name" className="">
                    Выберите город *
                </label>
                <CitiesSelect district_id={district?.value}/>
                </div> : <p></p>
                }

        </>
        

    )
}