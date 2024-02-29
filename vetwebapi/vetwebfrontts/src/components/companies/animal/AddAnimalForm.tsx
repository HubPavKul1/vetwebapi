import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { TypesOfFeedingSelect } from "./TypeOfFeedingSelect";
import { AnimalService } from "../company.service";
import { useParams } from "react-router-dom";
import { IAnimalCreate } from "../../../interfaces/AnimalInterfaces";
import { UsageTypesSelect } from "./UsageTypesSelect";




export function AddAnimalForm() {

    const { id } = useParams()
    if (!id) return;


    const methods = useForm<IAnimalCreate>()

    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["create animal"], {
        mutationFn: (data: IAnimalCreate) => AnimalService.createAnimal(data, id),
        onSuccess: () => {
            alert("Животное успешно добавлено!")
            queryClient.invalidateQueries(["company", id])
            reset()
        }
    },
    )

    const createAnimal: SubmitHandler<IAnimalCreate> = data => {
        mutate(data)

    }


    return (
        <FormProvider {...methods}>
            <div className="form-group">
                <label>
                    Выберите Тип Кормления *
                </label>
                <TypesOfFeedingSelect />
            </div>
            <div className="form-group">
                <label>
                    Выберите Тип Использования *
                </label>
                <UsageTypesSelect />
            </div>

            <div className="form-group">
                <label htmlFor="date_of_birth" className="">
                    Дата рождения *
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="date_of_birth"
                    style={{ width: 200, height: 30 }}
                    {...register("date_of_birth", { required: "Date of Birth is required!" })}
                />
                {errors?.date_of_birth?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="nickname"
                    placeholder="Кличка животного *"
                    style={{ width: 200, height: 30 }}
                    {...register("nickname", { required: "Nickname is required!" })}
                />
                {errors?.nickname?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="identification"
                    placeholder="Идентификация *"
                    style={{ width: 200, height: 30 }}
                    {...register("identification", { required: "Identification is required!" })}
                />
                {errors?.identification?.message && <p style={{ color: "red" }}>"Поле должно быть заполнено!"</p>}
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    id="btn-submit"
                    className="btn btn-primary btn-send-message btn-md"
                    defaultValue="Зарегистрировать"
                    onClick={handleSubmit(createAnimal)}
                />
            </div>

        </FormProvider>


    )
}