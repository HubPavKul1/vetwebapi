import { useForm, FormProvider } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import RegionsSelect from "./RegionsSelect";
import DistrictsSelect from "./DistrictsSelect";
import CitiesSelect from "./CitiesSelect";
import StreetsSelect from "./StreetsSelect";
import { AddressService } from "../company.service";



export default function AddAddressForm({companyId}) {


    const methods = useForm()
  
   
    const { register, reset, handleSubmit, formState: {errors} } = methods
    const queryClient = useQueryClient()

    const {mutate} = useMutation(["create address"], {
        mutationFn: (data) => AddressService.createAddress(companyId, data), 
        onSuccess: () => {
            queryClient.invalidateQueries(["company", companyId])
            reset()
        }
    },
    )

    
    const createAddress = data => {
        mutate(data)
        
    }   

    
    return (

  
  <FormProvider {...methods}>
    <div className="form-group">
        <label htmlFor="name" className="">
          Выберите регион *
        </label>
          <RegionsSelect />
      </div>
      <div className="form-group">
        <label htmlFor="name" className="">
          Выберите район *
        </label>
          <DistrictsSelect />
      </div>
      <div className="form-group">
        <label htmlFor="name" className="">
          Выберите город *
        </label>
        <CitiesSelect />
      </div>
      
      <div className="form-group">
          <label htmlFor="name" className="">
            Выберите улицу *
          </label>
          <StreetsSelect 
          />
      </div>
 
    <div className="form-group">
      <input
        type="text"
        name="house_number"
        className="form-control"
        id="house_number"
        placeholder="Номер дома *"
        style={{ width: 200, height: 30 }}
        {...register("house_number", {required: "House_number is required!"})}
      />
      {errors?.house_number?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
    </div>
    <div className="form-group">
      <input
        type="tel"
        name="phone_number1"
        className="form-control"
        id="phone_number1"
        placeholder="Телефон1 *"
        style={{ width: 200, height: 30 }}
        {...register("phone_number1", {required: "Phone_number1 is required!"})}
      />
      {errors?.phone_number1?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
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
        onClick={handleSubmit(createAddress)}
      />
    </div>

  </FormProvider>
    

)}