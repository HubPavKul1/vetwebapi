import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { IAnimalCreate } from "../../interfaces/AnimalInterfaces";
import { CustomButton } from "../button/CustomButton";
import { Input } from "../Input";
import { FormInputProps } from "../../interfaces/FormInterface";
import { fieldRequiredMessage, maxLenErrorMessage, minLenErrorMessage } from "../ErrorMessages";
import { useParams } from "react-router-dom";
import { AppService } from "../../app.service";
import { CompanySelect } from "./CompanySelect";
import { IAnimalInVetworkIn } from "../../interfaces/VetWorkInterfaces";



export function AddAnimalsToVetWorkForm() {

    const {id} = useParams()
    const url = `/api/companies/${id}/animals/`

    const inputItems: FormInputProps<IAnimalInVetworkIn> = [
        {fieldName: "dosage", id: "dosage", type: "number"},
        {fieldName: "is_positive", type: "checkbox"},
      ]


    const methods = useForm<IAnimalInVetworkIn>({
        mode: "onChange",
    })

    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["add animal"], {
        mutationFn: (data: IAnimalInVetworkIn) => AppService.createItem(url, data),
        onSuccess: () => {
            alert("Животное успешно добавлено!")
            queryClient.invalidateQueries(["vaccination", id])
            reset()
        }
    },
    )

    const addAnimal: SubmitHandler<IAnimalInVetworkIn> = data => {
        mutate(data)

    }


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(addAnimal)}>
                <div>
                    <label>
                        Выберите Предприятие *
                    </label>
                    <CompanySelect />
                </div>
                
                
                
                <div className="form-group">
                    <CustomButton
                        className="btn-submit"
                        disabled={false}
                        title="Зарегистрировать"
                    />
                </div>

            </form>
            
        </FormProvider>


    )
}