import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { CustomButton } from "../CustomButton";
import { Input } from "../Input";
import { FormInputProps } from "../../interfaces/FormInterface";

import { useParams } from "react-router-dom";
import { useUpdateItem } from "../../hooks/useUpdateItem";
import { IAnimalInVetWorkUpdate } from "../../interfaces/VetWorkInterfaces";
import CustomCheckBox from "../CustomCheckBox";
import { IAnimal } from "../../interfaces/AnimalInterfaces";


interface UpdateAnimalFormProps {
  url: string;
  animal: IAnimal;
  workType: string;

}

export function UpdateAnimalInVetWorkForm({url, workType, animal}: UpdateAnimalFormProps) {
  const { id } = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnimalInVetWorkUpdate>({
    mode: "onChange",
  });
  
  const { mutate } = useUpdateItem("update animalInVetWork", url, "vetwork", "Данные успешно обновлены!", reset, id)


  const updateAnimal: SubmitHandler<IAnimalInVetWorkUpdate> = (data) => {
    console.log("UPDATE DATA>>>", data)
    mutate(data);
  };

  return (
      <form onSubmit={handleSubmit(updateAnimal)}>
        <div className="mb-2">
        <input
        className="form-control"
              type="number"
              defaultValue={animal.dosage}
              id="dosage"
              placeholder="Дозировка"
              {...register("dosage")}
            />
            {/* <Input
                className="form-control"
                register={register}
                errors={errors}
                fieldName="dosage"
                type="number"
                step="any"
                id="dosage"
                placeholder="Доза"
                value={animal.dosage}
                
            /> */}
        </div>
        {workType.toLowerCase() === "диагностика" && 
            <div className="form-group mb-2">
                <label htmlFor="is_positive">
                    Положительно
                    <Input
                        register={register}
                        errors={errors}
                        fieldName="is_positive"
                        type="checkbox"
                        id="is_positive"
                        defaultValue={animal.is_positive}
                        
                    />
                </label>
            </div>
        }
        <div className="form-group">
          <CustomButton
            className="btn-submit"
            disabled={false}
            title="Отправить"
          />
        </div>
      </form>
  );
}
