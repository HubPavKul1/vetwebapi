import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { RegionsSelect } from "./RegionsSelect";
import { AddressService } from "../company.service";
import { IAddressIn } from "../../../interfaces/AddressInterfaces";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { IInput } from "../../../interfaces/FormInterface";
import { CompanyPageProps } from "../company-detail/CompanyPageMenu";



interface InputItem extends IInput {
  isRequired: boolean;
}


export function AddAddressForm({compId}: CompanyPageProps) {


    const inputItems: InputItem[] = [
      {fieldName: "house_number", placeHolder: "Номер дома *", type: "text", isRequired: true, maximLength: 5, minimLength: 1},
      {fieldName: "phone_number1", placeHolder: "Телефон1 *", type: "tel", isRequired: true, maximLength: 20, minimLength: 6},
      {fieldName: "phone_number2", placeHolder: "Телефон2", type: "tel", isRequired: false, maximLength: 20, minimLength: 6},
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
        placeHolder={item.placeHolder}
        register={register}
        fieldName={item.fieldName}
        type={item.type}
        errors={errors}
        isRequired={item.isRequired}
        maximLength={item.maximLength}
        minimLength={item.minimLength}
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