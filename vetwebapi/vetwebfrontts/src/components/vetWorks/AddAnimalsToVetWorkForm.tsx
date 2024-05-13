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
import { IAnimalsInVetworkIn } from "../../interfaces/VetWorkInterfaces";



export function AddAnimalsToVetWorkForm() {

    const {id} = useParams()
    const url = `/api/vetwork/${id}/animals/`

 
    const methods = useForm<IAnimalsInVetworkIn>({
        mode: "onChange",
    })

    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["add animals"], {
        mutationFn: (data: IAnimalsInVetworkIn) => AppService.createItem(url, data),
        onSuccess: () => {
            alert("Животное успешно добавлено!")
            queryClient.invalidateQueries(["vaccination", id])
            reset()
        }
    },
    )

    const addAnimals: SubmitHandler<IAnimalsInVetworkIn> = data => {
        mutate(data)

    }


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(addAnimals)}>
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