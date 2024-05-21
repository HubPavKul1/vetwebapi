import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";

import { CustomButton } from "../button/CustomButton";

import { AppService } from "../../app.service";

import { useParams } from "react-router-dom";
import { CompanySelect } from "./CompanySelect";
import { ICompanyInVetWorkIn } from "../../interfaces/CompanyInterfaces";



interface AddCompanyToVetWorkFormProps {
    url: string;
    queryKey: string;
}

export function AddCompanyToVetWorkForm({url, queryKey}: AddCompanyToVetWorkFormProps) {

    const {id} = useParams();

    const methods = useForm<ICompanyInVetWorkIn>({
        mode: "onChange",
    })


    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["addCompanyToVetWork"], {
        mutationFn: (data: ICompanyInVetWorkIn) => AppService.createItem(url, data),
        onSuccess: () => {
            alert("Предприятие успешно добавлено!")
            queryClient.invalidateQueries([{queryKey}, id])
            reset()
        }
    },
    )

    
    const addCompanyToVetWork: SubmitHandler<ICompanyInVetWorkIn> = data => {
        mutate(data)

    }

    return (
        <>
             <FormProvider {...methods}>
                <form onSubmit={handleSubmit(addCompanyToVetWork)}>
                    <div className="form-group">
                        <label>
                            Выберите предприятие *
                        </label>
                        <CompanySelect />
                    </div>

                    <div className="form-group">
                        <CustomButton
                            className="btn-submit" 
                            disabled={false}
                            title="Добавить"
                        />
                    
                    </div>

                </form>
                

        </FormProvider>
        </>
       
    )
}