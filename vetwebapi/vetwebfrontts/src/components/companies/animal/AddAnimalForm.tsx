import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { TypesOfFeedingSelect } from "./TypeOfFeedingSelect";
import { AnimalService } from "../company.service";
import { IAnimalCreate } from "../../../interfaces/AnimalInterfaces";
import { UsageTypesSelect } from "./UsageTypesSelect";
import { CustomButton } from "../../button/CustomButton";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { CompanyPageProps } from "../company-detail/menu/CompanyPageMenu";
import { fieldRequiredMessage, maxLenErrorMessage, minLenErrorMessage } from "../../ErrorMessages";



export function AddAnimalForm({compId}: CompanyPageProps) {


    const inputItems: FormInputProps<IAnimalCreate>[] = [
        {fieldName: "date_of_birth", id: "date_of_birth", type: "date"},
        {fieldName: "nickname", placeholder: "Введите кличку животного *", type: "text"},
        {fieldName: "identification", placeholder: "Введите номер микрочипа *", type: "text"},
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

                <label htmlFor="date_of_birth" className="form-group">
                    Дата рождения *
                </label>
                {
                    inputItems.map(item =>(
                        <Input key={item.fieldName}
                            className="form-control"
                            id={item.id}
                            register={register}
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
                            fieldName={item.fieldName}
                            type={item.type}
                            errors={errors}
                            placeholder={item.placeholder}
                        />
                    ))
                }
              
            <div className="form-group">
                <CustomButton
                    className="btn-submit"
                    disabled={false}
                    onClick={handleSubmit(createAnimal)}
                    title="Зарегистрировать"
                />
            </div>

        </FormProvider>


    )
}