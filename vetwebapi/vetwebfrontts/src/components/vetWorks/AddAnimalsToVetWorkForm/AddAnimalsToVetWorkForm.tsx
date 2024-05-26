import { useForm, FormProvider, SubmitHandler, RegisterOptions, Controller, useFieldArray } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IAnimal, IAnimalCreate } from "../../../interfaces/AnimalInterfaces";
import { CustomButton } from "../../button/CustomButton";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import { fieldRequiredMessage, maxLenErrorMessage, minLenErrorMessage } from "../../ErrorMessages";
import { useParams } from "react-router-dom";
import { AppService } from "../../../app.service";
import { CompanySelect } from "../CompanySelect";
import { IAnimalInVetworkIn, IAnimalsInVetworkIn } from "../../../interfaces/VetWorkInterfaces";
import { ICompanyDetail } from "../../../interfaces/CompanyInterfaces";
import { Container } from "react-bootstrap";

import styles from "./AddAnimalsToVetWorkForm.module.scss"


interface AddAnimalsToVetWorkFormProps {
    companyId: string;
    setAnimals: CallableFunction;
}

interface CompanyData {
    data?: ICompanyDetail;
    isLoading: boolean;
  }

export function AddAnimalsToVetWorkForm({companyId, setAnimals}: AddAnimalsToVetWorkFormProps) {

    const {id} = useParams()
    const url = `/api/vetwork/${id}/animals/`

    const companyUrl = `/api/companies/${companyId}`;


    const { isLoading, data }: CompanyData = useQuery(['vetworkCompany', id], () => AppService.get(companyUrl), {
      enabled: !!id
    }
    );

 
    const methods = useForm<IAnimalsInVetworkIn>({
        mode: "onChange",
        defaultValues: {
            animals:[{animal_id: 0, dosage: 0, is_positive: false}]

        }
    })

    // const { register, reset, handleSubmit, formState: {errors} } = useForm<IAnimalInVetworkIn>({
    //     mode: "onChange",
    // })

    const { control, register, reset, handleSubmit, formState: { errors } } = methods
    const queryClient = useQueryClient()

    const { fields } = useFieldArray({
        name: "animals",
        control: control,
        shouldUnregister: true
      })

    const { mutate } = useMutation(["add animals"], {
        mutationFn: (data: IAnimalsInVetworkIn) => AppService.createItem(url, data),
        onSuccess: () => {
            alert("Животное успешно добавлено!")
            queryClient.invalidateQueries(["vaccination", id])
            reset()
        }
    },
    )

    const addAnimals: SubmitHandler<IAnimalsInVetworkIn> = (data) => {
        console.log("DATA>>>>", data)
        console.log()
        
        // mutate(data)

    }

 

    if(isLoading || !data) return <p>Загрузка ...</p>;

    if(!data.animals) return;

    const animals = data.animals


    return (
        <Container>
            <CustomButton className="btn-upload" title= "Назад" onClick={() => setAnimals(false)} />
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(addAnimals)}>
            {fields.map((animal, index) => (
            <Container className={styles.formWrap} key={animal.id}>
                 <Controller 
                    name={`animals.${index}.id`}
                    control={control}
                    defaultValue={animals[index].id}
                    render={({ field: { value, onChange } }) =>
                    <div className="form-group">
                        <label htmlFor={animal.id.toString()}>
                            {animals[index].nickname} {animals[index].id}
                        <input
                            type="number"
                            id={animal.id.toString()}
                            value={value}
                            onChange={onChange}
                                        
                        />
                        </label>
                    </div>
                            
                    }
                />
                <Controller 
                    name="dosage"
                    control={control}
                    render={({ field: { value, onChange } }) =>
                    <div className="form-group">
                        <label htmlFor="dosage">
                            Дозировка
                        <input
                            name="dosage"
                            type="number"
                            id="dosage"
                            value={value}
                            onChange={onChange}
                                        
                        />
                        </label>
                    </div>
                            
                    }
                    />   
                    </Container>
                    
                    
                ))}
            
                <div className="form-group">
                    <CustomButton
                        className="btn-submit"
                        disabled={false}
                        title="Зарегистрировать"
                    />
                </div>

            </form>
                

            </FormProvider>

        </Container>
        

    )
}