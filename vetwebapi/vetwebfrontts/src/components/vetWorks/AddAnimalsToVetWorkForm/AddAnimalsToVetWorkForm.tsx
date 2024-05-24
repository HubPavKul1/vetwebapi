import { useForm, FormProvider, SubmitHandler, RegisterOptions } from "react-hook-form"
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


    const { isLoading, data }: CompanyData = useQuery(['company', id], () => AppService.get(companyUrl), {
      enabled: !!id
    }
    );

 
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
        console.log(data)
        mutate(data)

    }

    if(isLoading || !data) return <p>Загрузка ...</p>;

    if(!data.animals) return;

    const animals = data.animals


    return (
        <Container>
            <CustomButton className="btn-upload" title= "Назад" onClick={() => setAnimals(false)} />
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(addAnimals)}>
                {animals.map(animal => (
                    <Container className={styles.formWrap}>
                        <div className="form-group">
                            <label htmlFor="animal_id">
                                {animal.nickname}
                                <Input
                                    register={register}
                                    errors={errors}
                                    fieldName="animal_id"
                                    type="checkbox"
                                    id={animal.id.toString()}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dosage">
                                Введено доз препарата*
                                <Input
                                    register={register}
                                    errors={errors}
                                    fieldName="dosage"
                                    type="number"
                                    id="dosage"
                                />
                            </label>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="is_positive">
                                {animal.nickname}
                                <Input
                                    register={register}
                                    errors={errors}
                                    fieldName="animal_id"
                                    type="checkbox"
                                    id={animal.id.toString()}
                                />
                            </label>
                        </div> */}
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