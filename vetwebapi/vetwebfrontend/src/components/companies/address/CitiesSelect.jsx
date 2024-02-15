import Select from 'react-select'
import { AddressService } from '../company.service'
import { useQuery } from "react-query";
import { useState } from 'react';
import StreetsSelect from './StreetsSelect';


export default function CitiesSelect({district_id}) {
    const [city, setCity] = useState({});
    const { data, isLoading, error } = useQuery(['cities'], () => AddressService.getDistrictCities(district_id));
    
    const options = data?.map(city=>({value: city.id, label: city.name}));
    
    function handleSelect(data) {
        setCity(data);
      }
                   
    return (
            <>
            <Select 
                isSearchable
                isClearable
                options={options}
                value={city}
                onChange={handleSelect}
            />
            {city?.value ?
                <div className="form-group">
                <label htmlFor="name" className="">
                    Выберите улицу *
                </label>
                <StreetsSelect city_id={city?.value}/>
                </div> : <p></p>
                }
        </>
        )       
    
}