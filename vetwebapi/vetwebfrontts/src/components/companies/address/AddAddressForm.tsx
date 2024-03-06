import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { RegionsSelect } from "./RegionsSelect";
import { AddressService } from "../company.service";
import { useParams } from "react-router-dom";
import { IAddressIn } from "../../../interfaces/AddressInterfaces";
import { Button } from "../../Button";
import { Input } from "../../Input";


export function AddAddressForm() {

    const {id} = useParams()
    if (!id) return;


    const methods = useForm<IAddressIn>()
  
    const { register, reset, handleSubmit, formState: {errors} } = methods
    const queryClient = useQueryClient()

    const {mutate} = useMutation(["create address"], {
        mutationFn: (data: IAddressIn) => AddressService.createAddress(data, id),
        onSuccess: () => {
            alert("Адрес успешно добавлен!")
            queryClient.invalidateQueries(["company", id])
            reset()
        }
    },
    )

    const createAddress: SubmitHandler<IAddressIn> = data => {
        mutate(data)
        
    }   

    return (

  <FormProvider {...methods}>
    <div className="form-group">
        <label>
          Выберите регион *
        </label>
          <RegionsSelect />
      </div>

    <Input
      className="form-control"
      style={{ width: 200, height: 30}}
      placeHolder="Номер дома *"
      register={register}
      fieldName="house_number"
      type="text"
      errors={errors}
      isRequired={true}
      maximLength={5}
      minimLength={1}
     />

    <Input
      className="form-control"
      style={{ width: 200, height: 30}}
      placeHolder="Телефон1 *"
      register={register}
      fieldName="phone_number1"
      type="tel"
      errors={errors}
      isRequired={true}
      maximLength={20}
      minimLength={6}
     />

    <Input
      className="form-control"
      style={{ width: 200, height: 30}}
      placeHolder="Телефон2"
      register={register}
      fieldName="phone_number2"
      type="tel"
      errors={errors}
      isRequired={false}
      maximLength={20}
      minimLength={6}
     />

    <div className="form-group">
      <Button 
          className="btn btn-primary btn-send-message btn-md"
          disabled={false}
          onClick={handleSubmit(createAddress)}
          name="Зарегистрировать"
      />
      
    </div>

  </FormProvider>
    
)}