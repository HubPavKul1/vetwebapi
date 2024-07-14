import { UseFormRegister } from "react-hook-form";

interface CustomCheckBoxProps {
  labelTitle?: string;
  id: string;
  register?: UseFormRegister<TFormValues>;
  animalId?: number;
}

export default function CustomCheckBox({
  labelTitle,
  id,
  register,
  animalId,
}: CustomCheckBoxProps) {
  const inputId = animalId && animalId.toString();

  return (
    <div className="flex items-center justify-center select-none">
      <label className="flex items-centr justify-center cursor-pointer">
        {labelTitle}
        <input
          className="absolute appearance-none" 
          type="checkbox"
          id={id}
          {...(register && register(id))}
        />
        <span className="relative before:content-normal before:absolute before:left-0 before:top-0 before:w-4 defore:h-4 before:border-2 "></span>
      </label>
    </div>
    // <div className="flex items-center justify-center">
    //   <input

    //   />
    //   <label
    //     className="peer-[.inputId]:focus:before:drop-shadow peer-[.inputId]:focus:before:shadow-red-950 peer-[.inputId]:checked:before:bg-red-700 flex cursor-pointer before:content-normal before:border-2 before:border-grey before:w-6 before:h-6 before:rounded-md before:mr-3 before:transition-colors before:hover:border-red-600"
    //     htmlFor={id}
    //   >
    //     {labelTitle}
    //   </label>
    // </div>
  );
}
