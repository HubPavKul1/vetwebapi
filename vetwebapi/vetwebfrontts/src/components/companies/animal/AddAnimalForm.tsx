import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { TypesOfFeedingSelect } from "./TypeOfFeedingSelect";
import { AnimalService } from "../company.service";
import { IAnimalCreate } from "../../../interfaces/AnimalInterfaces";
import { UsageTypesSelect } from "./UsageTypesSelect";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { IInput } from "../../../interfaces/FormInterface";
import { CompanyPageProps } from "../company-detail/CompanyPageMenu";



export function AddAnimalForm({compId}: CompanyPageProps) {

   
    const inputItems: IInput[] = [
        {fieldName: "date_of_birth", id: "date_of_birth", type: "date", maximLength: 20, minimLength: 5},
        {fieldName: "nickname", placeHolder: "Кличка животного *", type: "text", maximLength: 20, minimLength: 3},
        {fieldName: "identification", placeHolder: "Идентификация *", type: "tel", maximLength: 20, minimLength: 2},
      ]


    const methods = useForm<IAnimalCreate>({
        mode: "onChange",
    })

    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["create animal"], {
        mutationFn: (data: IAnimalCreate) => AnimalService.createAnimal(data, compId.toString()),
        onSuccess: () => {
            alert("Животное успешно добавлено!")
            queryClient.invalidateQueries(["company", compId])
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
                {
                    inputItems.map(item =>(
                        <Input key={item.fieldName}
                            className="form-control"
                            style={{ width: 200, height: 30}}
                            id={item.id}
                            register={register}
                            fieldName={item.fieldName}
                            type={item.type}
                            errors={errors}
                            isRequired={true}
                            maximLength={item.maximLength}
                            minimLength={item.minimLength}
                            placeHolder={item.placeHolder}
                        />
                    ))
                }
              
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