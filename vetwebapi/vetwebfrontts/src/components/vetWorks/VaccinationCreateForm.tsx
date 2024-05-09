import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";

import { CustomButton } from "../button/CustomButton";
import { Input } from "../Input";
import { FormInputProps } from "../../interfaces/FormInterface";
import { fieldRequiredMessage } from "../ErrorMessages";


import { AppService } from "../../app.service";
import { IVetworkCreate } from "../../interfaces/VetWorkInterfaces";
import { ClinicSelect } from "./ClinicSelect";
import { DiseaseSelect } from "../drugs/drug/DiseaseSelect";
import { DoctorSelect } from "./DoctorsSelect";




export function VaccinationCreateForm() {


    const inputItems: FormInputProps<IVetworkCreate>[] = [
        {fieldName: "vetwork_date", id: "vetwork_date", type: "date"},
    ];


    const methods = useForm<IVetworkCreate>({
        mode: "onChange",
    })

    const url = "/api/vetwork/vaccinations"

    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["create vetWork"], {
        mutationFn: (data: IVetworkCreate) => AppService.createItem(url, data),
        onSuccess: () => {
            alert("Мероприятие успешно добавлено!")
            queryClient.invalidateQueries(["vaccinations"])
            reset()
        }
    },
    )

    
    const createVaccination: SubmitHandler<IVetworkCreate> = data => {
  
        mutate(data)

    }

    return (
        <>
            <FormProvider {...methods}>
                <div className="form-group">
                    <label>
                        Введите дату *
                    </label>
                    {
                        inputItems.map(item =>(
                        <Input key={item.fieldName}
                            className="form-control"
                            placeholder={item.placeholder}
                            register={register}
                            fieldName={item.fieldName}
                            type={item.type}
                            errors={errors}
                            rules={{
                                required: fieldRequiredMessage, 
                                
                            }}
                        />
                        ))
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="is_state_assignment">
                        Госзадание *
                        <Input
                            register={register}
                            errors={errors}
                            fieldName="is_state_assignment"
                            type="checkbox"
                            id="is_state_assignment"
                        />
                    </label>
                 </div>
                 <div className="form-group">
                    <label htmlFor="is_primary">
                        Первичное *
                        <Input
                            register={register}
                            errors={errors}
                            fieldName="is_primary"
                            type="checkbox"
                            id="is_primary"
                        />
                    </label>
                 </div>
                <div className="form-group">
                    <ClinicSelect/>
                </div>
                <div className="form-group">
                    <DiseaseSelect isMulti={true}/>
                </div>
                <div className="form-group">
                    <DoctorSelect />
                </div>
           
                <div className="form-group">
                    <CustomButton
                        className="btn-submit" 
                        disabled={false}
                        onClick={handleSubmit(createVaccination)}
                        title="Добавить"
                    />
                
                </div>

            </FormProvider>
        </>
       
    )
}