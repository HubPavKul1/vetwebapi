import { useForm, FormProvider, SubmitHandler, RegisterOptions } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { RegionsSelect } from "./RegionsSelect";
import { AddressService } from "../company.service";
import { IAddressIn } from "../../../interfaces/AddressInterfaces";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { CompanyPageProps } from "../company-detail/CompanyPageMenu";
import { fieldRequiredMessage, maxLenErrorMessage, minLenErrorMessage } from "../../ErrorMessages";



export function AddAddressForm({compId}: CompanyPageProps) {

    const rulesOptions: RegisterOptions = {
      required: {value: true, message: fieldRequiredMessage,}, 
      maxLength: {value: 20, message: maxLenErrorMessage+" 20 символов!"},
      minLength: {value: 1, message: minLenErrorMessage+" 1 символ!"}
    }

    const inputItems: FormInputProps<IAddressIn>[] = [
      {fieldName: "house_number", placeholder: "Номер дома *", type: "text", rules: rulesOptions},
      {fieldName: "phone_number1", placeholder: "Телефон1 *", type: "tel", rules: rulesOptions},
      {fieldName: "phone_number2", placeholder: "Телефон2", type: "tel", rules: {required: false}},
    ]


    const methods = useForm<IAddressIn>(
      {mode: "onChange",}
    )
  
    const { register, reset, handleSubmit, formState: {errors} } = methods
    const queryClient = useQueryClient()

    

    const {mutate} = useMutation(["create address"], {
        mutationFn: (data: IAddressIn) => AddressService.createAddress(data, compId.toString()),
        onSuccess: () => {
            alert("Адрес успешно добавлен!")
            queryClient.invalidateQueries(["company", compId])
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
    {
      inputItems.map(item =>(
      <Input key={item.fieldName}
        className="form-control"
        style={{ width: 200, height: 30}}
        placeholder={item.placeholder}
        register={register}
        fieldName={item.fieldName}
        type={item.type}
        errors={errors}
        rules={item.rules}
      />
      ))
    }

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