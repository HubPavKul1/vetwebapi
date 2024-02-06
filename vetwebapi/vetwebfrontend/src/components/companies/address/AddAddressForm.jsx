import { CompanyService } from "../company.service";
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";

export default function AddAddressForm() {
   

    const { register, reset, handleSubmit, formState: {errors} } = useForm({
        mode: "onChange",
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation(["create address"], (data) => CompanyService.createAddress(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["address"])
            reset()
        }
    })

    const createAddress = data => {
        
        mutate(data)
        
    }   

    
    return (

       
  <form
    className="contact-form"
    method="post"
    action="#"
  >
    <div className="form-group">
      <label htmlFor="name" className="">
        Выберите регион *
      </label>
      <select name="region_id" style={{ width: 350 }}>
        <option value="">
        </option>
        
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="name" className="">
        Выберите район *
      </label>
      <select name="district_id" style={{ width: 350 }}>
      
        <option value="">
        </option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="name" className="">
        Выберите город *
      </label>
      <select id="" name="city_id" style={{ width: 350 }}>
        <option value="">
        </option>
       
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="name" className="">
        Выберите улицу *
      </label>
      <select name="street_id" style={{ width: 350 }}>
        <option value="">
        
        </option>
      </select>
    </div>
    <div className="form-group">
      <input
        type="text"
        name="house_number"
        className="form-control"
        id="house_number"
        placeholder="Номер дома *"
        style={{ width: 200, height: 30 }}
      />
    </div>
    <div className="form-group">
      <input
        type="tel"
        name="phone_number1"
        className="form-control"
        id="phone_number1"
        placeholder="Телефон1 *"
        style={{ width: 200, height: 30 }}
      />
    </div>
    <div className="form-group">
      <input
        type="tel"
        name="phone_number2"
        className="form-control"
        id="phone_number1"
        placeholder="Телефон2"
        style={{ width: 200, height: 30 }}
      />
    </div>
    <div className="form-group">
      <input
        type="submit"
        id="btn-submit"
        className="btn btn-primary btn-send-message btn-md"
        defaultValue="Зарегистрировать"
      />
    </div>
  </form>


)}