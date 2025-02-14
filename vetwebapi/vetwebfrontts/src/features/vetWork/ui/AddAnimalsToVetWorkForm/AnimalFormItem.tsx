import { IAnimalInVetworkIn } from "entities/vetWork/model/vetWorkInterfaces";

import { SubmitHandler, useForm } from "react-hook-form";

import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { IAnimal } from "entities/animal/model/animalInterfaces";
import { CustomCheckBox } from "shared/index";
import { DISEASES, WORKTYPES } from "shared/constants/vetworkConst";

interface AnimalFormItemProps {
  index: number;
  animal: IAnimal;
  setAnimalsData: CallableFunction;
  animalsData: IAnimalInVetworkIn[];
  workType: string;
  disease: string;
}

export function AnimalFormItem({
  index,
  animal,
  setAnimalsData,
  animalsData,
  workType,
  disease,
}: AnimalFormItemProps) {
  const [animalChecked, setAnimalChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnimalInVetworkIn>({
    mode: "onChange",
  });

  const addAnimalData: SubmitHandler<IAnimalInVetworkIn> = (data) => {
    data.dosage?.toString() === "" && (data.dosage = 0);

    setAnimalsData([...animalsData, data]);

    setAnimalChecked(true);
  };

  const removeAnimalData = (animalId?: number) => {
    setAnimalsData(
      animalsData.filter(
        (animal) => Number(animal.animal_id) !== Number(animalId)
      )
    );

    setAnimalChecked(false);
  };

  return (
    <form onSubmit={handleSubmit(addAnimalData)}>
      <Row className="flex items-center justify-center text-sm h-8">
        <Col md={1}>{index}</Col>
        <Col md={3}>{animal.species}</Col>
        <Col md={4}>
          <label htmlFor="animal_id">
            {animal.nickname}
            <input
              type="hidden"
              defaultValue={animal.id}
              id="animal_id"
              {...register("animal_id")}
            />
          </label>
        </Col>
        {workType === WORKTYPES.vaccination && (
          <Col md={2}>
            <input
              className="border-2 rounded-md w-24 text-center bg-slate-200"
              type="number"
              step="any"
              id="dosage"
              placeholder="Доза"
              {...register("dosage")}
            />
          </Col>
        )}

        {workType === WORKTYPES.treatment && (
          <Col>
            <input
              className="border-2 rounded-md w-24 text-center bg-slate-200"
              type="number"
              step="any"
              id="dosage"
              placeholder="Доза"
              {...register("dosage")}
            />
          </Col>
        )}

        {disease === DISEASES.tbc && (
          <Col>
            <input
              className="border-2 rounded-md w-24 text-center bg-slate-200"
              type="number"
              step="any"
              id="dosage"
              placeholder="Доза"
              {...register("dosage")}
            />
          </Col>
        )}

        {workType === WORKTYPES.diagnostic && (
          <Col className="flex items-center justify-center">
            <CustomCheckBox
              inputId="is_positive"
              itemId={animal.id?.toString()}
              register={register}
            />
          </Col>
        )}

        {!animalChecked ? (
          <Col>
            <Container className="flex justify-center cursor-pointer p-1">
              <button
                type="submit"
                className="hover:scale-110 transition-transform"
              >
                <IoIosAddCircleOutline fontSize={30} color="green" />
              </button>
            </Container>
          </Col>
        ) : (
          <Col>
            <Container className="flex justify-center cursor-pointer p-1">
              <CiCircleRemove
                className="hover:scale-110 transition-transform"
                onClick={() => removeAnimalData(animal.id)}
                fontSize={30}
                color="red"
              />
            </Container>
          </Col>
        )}
      </Row>
    </form>
  );
}
