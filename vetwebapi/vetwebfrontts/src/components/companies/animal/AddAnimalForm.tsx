import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { TypesOfFeedingSelect } from "./TypeOfFeedingSelect";
import { AnimalService } from "../company.service";
import { useParams } from "react-router-dom";
import { IAnimalCreate } from "../../../interfaces/AnimalInterfaces";
import { UsageTypesSelect } from "./UsageTypesSelect";
import { Button } from "../../Button";
import { Input } from "../../Input";




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

                <label htmlFor="date_of_birth" className="">
                    Дата рождения *
                </label>
                <Input 
                    className="form-control"
                    style={{ width: 200, height: 30}}
                    id="date_of_birth"
                    register={register}
                    fieldName="date_of_birth"
                    type="date"
                    errors={errors}
                    isRequired={true}
                    maximLength={20}
                    minimLength={5}
                />

                <Input 
                    className="form-control"
                    style={{ width: 200, height: 30}}
                    id="nickname"
                    register={register}
                    placeHolder="Кличка животного *"
                    fieldName="nickname"
                    type="text"
                    errors={errors}
                    isRequired={true}
                    maximLength={20}
                    minimLength={3}
                />

                <Input 
                    className="form-control"
                    style={{ width: 200, height: 30}}
                    id="identification"
                    register={register}
                    placeHolder="Идентификация *"
                    fieldName="identification"
                    type="text"
                    errors={errors}
                    isRequired={true}
                    maximLength={20}
                    minimLength={2}
                />

            <div className="form-group">
                <Button 
                    className="btn btn-primary btn-send-message btn-md"
                    disabled={false}
                    onClick={handleSubmit(createAnimal)}
                    name="Зарегистрировать"
                />
            </div>

        </FormProvider>


    )
}