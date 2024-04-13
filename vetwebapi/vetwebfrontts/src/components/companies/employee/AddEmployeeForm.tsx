import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { EmployeeService } from "../company.service";
import { PositionsSelect } from "./PositionsSelect";
import { IEmployeeCreate } from "../../../interfaces/EmployeeInterfaces";
import { CustomButton } from "../../button/CustomButton";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { fieldRequiredMessage, maxLenErrorMessage, minLenErrorMessage } from "../../ErrorMessages";
import { useParams } from "react-router-dom";
import { AppService } from "../../../app.service";



export function AddEmployeeForm() {

    
    const {id} = useParams()

    const url = `/api/companies/${id}/employees/`
    
   


    const inputItems: FormInputProps<IEmployeeCreate>[] = [
        {fieldName: "lastname", placeholder: "Введите фамилию *"},
        {fieldName: "firstname", placeholder: "Введите имя *"},
        {fieldName: "patronymic", placeholder: "Введите отчество *"},
    ];


    const methods = useForm<IEmployeeCreate>({
        mode: "onChange",
    })

    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["create employee"], {
        mutationFn: (data: IEmployeeCreate) => AppService.createItem(url, data),
        onSuccess: () => {
            alert("Работник успешно добавлен!")
            queryClient.invalidateQueries(["company", id])
            reset()
        }
    },
)

    // const { mutate } = useMutation(["create employee"], {
    //     mutationFn: (data: IEmployeeCreate) => EmployeeService.createEmployee(data, id),
    //     onSuccess: () => {
    //         alert("Работник успешно добавлен!")
    //         queryClient.invalidateQueries(["company", compId])
    //         reset()
    //     }
    // },
    // )

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
                <CustomButton
                    className="btn-submit" 
                    disabled={false}
                    onClick={handleSubmit(createEmployee)}
                    title="Зарегистрировать"
                />
               
            </div>

        </FormProvider>
    )
}