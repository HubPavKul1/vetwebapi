import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";

import { CustomButton } from "../../button/CustomButton";
import { Input } from "../../Input";
import { fieldRequiredMessage } from "../../ErrorMessages";
import { IDrugInMovementIn } from "../../../interfaces/DrugInterfaces";

import { AppService } from "../../../app.service";
import { CatalogDrugSelect } from "./CatalogDrugSelect";
import { useParams } from "react-router-dom";



export function AddDrugForm() {

    const {id} = useParams();
    const url = `/api/drugs/receipts/${id}`;
   
    const methods = useForm<IDrugInMovementIn>({
        mode: "onChange",
    })


    const { register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["addDrugToReceipt"], {
        mutationFn: (data: IDrugInMovementIn) => AppService.createItem(url, data),
        onSuccess: () => {
            alert("Препарат успешно добавлен!")
            queryClient.invalidateQueries(['receipt', id])
            reset()
        }
    },
    )

    
    const addDrugToReceipt: SubmitHandler<IDrugInMovementIn> = data => {
        mutate(data)

    }

    return (
        <>
             <FormProvider {...methods}>
                <div className="form-group">
                    <label>
                        Выберите препарат *
                    </label>
                    <CatalogDrugSelect />
                </div>

            <div className="form-group">
                <label htmlFor="packs_amount">
                    Введите количество упаковок *
                </label>
                <Input
                    className="form-control"
                    register={register}
                    errors={errors}
                    fieldName="packs_amount"
                    type="number"
                    id="packs_amount"
                    rules={{
                        required: fieldRequiredMessage, 
                        
                    }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="units_amount">
                    Введите количество единиц учета *
                </label>
                <Input
                    className="form-control"
                    register={register}
                    errors={errors}
                    fieldName="units_amount"
                    type="number"
                    id="units_amount"
                    rules={{
                        required: fieldRequiredMessage, 
                        
                    }}
                />
            </div>

            <div className="form-group">
                <CustomButton
                    className="btn-submit" 
                    disabled={false}
                    onClick={handleSubmit(addDrugToReceipt)}
                    title="Добавить"
                />
               
            </div>

        </FormProvider>
        </>
       
    )
}