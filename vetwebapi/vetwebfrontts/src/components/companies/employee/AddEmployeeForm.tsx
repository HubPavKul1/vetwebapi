import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { EmployeeService } from "../company.service";
import { PositionsSelect } from "./PositionsSelect";
import { IEmployeeCreate } from "../../../interfaces/EmployeeInterfaces";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { CompanyPageProps } from "../company-detail/CompanyPageMenu";
import { fieldRequiredMessage, maxLenErrorMessage, minLenErrorMessage } from "../../ErrorMessages";



export function AddEmployeeForm({compId}: CompanyPageProps) {


    const inputItems: FormInputProps<IEmployeeCreate>[] = [
        {fieldName: "lastname", placeholder: "Фамилия *"},
        {fieldName: "firstname", placeholder: "Имя *"},
        {fieldName: "patronymic", placeholder: "Отчество *"},
    ];


    const methods = useForm<IEmployeeCreate>({
        mode: "onChange",
    })

    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["create employee"], {
        mutationFn: (data: IEmployeeCreate) => EmployeeService.createEmployee(data, compId.toString()),
        onSuccess: () => {
            alert("Работник успешно добавлен!")
            queryClient.invalidateQueries(["company", compId])
            reset()
        }
    },
    )

    const createEmployee: SubmitHandler<IEmployeeCreate> = data => {
        console.log("employee: ", data)
        mutate(data)

    }

    return (

        <FormProvider {...methods}>
            <div className="form-group">
                <label>
                    Выберите должность *
                </label>
                <PositionsSelect />
            </div>
            {
                inputItems.map(item =>(
                    <Input key={item.fieldName}
                        className="form-control"
                        style={{ width: 200, height: 30}}
                        placeholder={item.placeholder}
                        register={register}
                        fieldName={item.fieldName}
                        type="text"
                        errors={errors}
                        rules={{
                            required: fieldRequiredMessage, 
                            maxLength: {
                                value: 50,
                                message: maxLenErrorMessage+" 50 символов!"
                                }, 
                            minLength: {
                                value: 3,
                                message: minLenErrorMessage+" 3 символа!"
                                },
                            
                        }}
                    />
                ))
            }

            <div className="form-group">
                <Button 
                    className="btn btn-primary btn-send-message btn-md"
                    disabled={false}
                    onClick={handleSubmit(createEmployee)}
                    name="Зарегистрировать"
                />
               
            </div>

        </FormProvider>
    )
}