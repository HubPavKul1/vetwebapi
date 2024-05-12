import { useFormContext, Controller } from "react-hook-form";
import { IAnimal } from '../../../interfaces/AnimalInterfaces';


import styles from "./AnimalChekForm.module.scss"

interface AnimalCheckFormProps {
    animal: IAnimal;
}


export function AnimalCheckForm({ animal }: AnimalCheckFormProps) {


    const { control } = useFormContext()
    const animal_id = animal.id.toString()

    return (
        <>
        <div className={styles.formGroup}>
        <Controller
            control={control}
            name={animal_id}
            rules={
                { required: "Animal is required!" }
            }
            render={({ field: { onChange, value }}) => (
               <div>
                    <label htmlFor={animal_id}>
                        {animal.nickname}
                        <input
                            type="checkbox"
                            checked={value}  
                            onChange={onChange}
                        />
                    </label>
                </div>
                )
            } 
        />
        <Controller
            control={control}
            name="dosage"
            rules={
                { required: "Dosage is required!" }
            }
            render={({ field: { onChange, value }}) => (
               <div>
                    <label htmlFor="dosage">
                        Введите количество доз препарата *
                        <input
                            className="form-control"
                            name="dosage"
                            type="number"
                            id="dosage"
                            value={value}
                            onChange={onChange}  
                        />
                    </label>
                </div>
                )
            } 
        />
        <Controller
            control={control}
            name="is_positive"
            render={({ field: { onChange, value }}) => (
               <div>
                    <label htmlFor="is_positive">
                        Положительная реакция
                        <input
                            type="checkbox"
                            checked={value}  
                            onChange={onChange}
                        />
                    </label>
                </div>
                )
            } 
        />


        </div>
       
    </>
       
            
    )
}