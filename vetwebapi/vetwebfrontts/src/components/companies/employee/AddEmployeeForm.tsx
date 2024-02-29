import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { EmployeeService } from "../company.service";
import { useParams } from "react-router-dom";
import { PositionsSelect } from "./PositionsSelect";
import { IEmployeeCreate } from "../../../interfaces/EmployeeInterfaces";



export function AddEmployeeForm() {

    const { id } = useParams()
    if (!id) return;


    const methods = useForm<IEmployeeCreate>()

    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["create employee"], {
        mutationFn: (data: IEmployeeCreate) => EmployeeService.createEmployee(data, id),
        onSuccess: () => {
            alert("Работник успешно добавлен!")
            queryClient.invalidateQueries(["company", id])
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

            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    placeholder="Фамилия *"
                    style={{ width: 200, height: 30 }}
                    {...register("lastname", { required: "Last Name is required!" })}
                />
                {errors?.lastname?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
            <div className="form-group">
                <input
                    type="tel"
                    className="form-control"
                    id="firstname"
                    placeholder="Имя *"
                    style={{ width: 200, height: 30 }}
                    {...register("firstname", { required: "First Name is required!" })}
                />
                {errors?.firstname?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
            <div className="form-group">
                <input
                    type="tel"
                    className="form-control"
                    id="patronymic"
                    placeholder="Отчество"
                    style={{ width: 200, height: 30 }}
                    {...register("patronymic", { required: "Patronymic is required!" })}
                />
                {errors?.patronymic?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    id="btn-submit"
                    className="btn btn-primary btn-send-message btn-md"
                    defaultValue="Зарегистрировать"
                    onClick={handleSubmit(createEmployee)}
                />
            </div>

        </FormProvider>
    )
}