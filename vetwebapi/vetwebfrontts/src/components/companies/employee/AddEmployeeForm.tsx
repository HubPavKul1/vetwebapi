import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { EmployeeService } from "../company.service";
import { PositionsSelect } from "./PositionsSelect";
import { IEmployeeCreate } from "../../../interfaces/EmployeeInterfaces";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { IInput } from "../../../interfaces/FormInterface";
import { CompanyPageProps } from "../company-detail/CompanyPageMenu";



export function AddEmployeeForm({compId}: CompanyPageProps) {



    const inputItems: IInput[] = [
        {fieldName: "lastname", placeHolder: "Фамилия *", maximLength: 50, minimLength: 1},
        {fieldName: "firstname", placeHolder: "Имя *", maximLength: 30, minimLength: 1},
        {fieldName: "patronymic", placeHolder: "Отчество *", maximLength: 50, minimLength: 5},
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
                        placeHolder={item.placeHolder}
                        register={register}
                        fieldName={item.fieldName}
                        type="text"
                        errors={errors}
                        isRequired={true}
                        maximLength={item.maximLength}
                        minimLength={item.minimLength}
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