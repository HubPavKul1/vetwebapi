import { UseFormRegister } from "react-hook-form";

import styles from "./CustomCheckBox.module.scss";

interface CustomCheckBoxProps {
  labelTitle?: string;
  id: string;
  register?: UseFormRegister<TFormValues>;
}

export function CustomCheckBox({
  labelTitle,
  id,
  register,
}: CustomCheckBoxProps) {
  return (
    <div className="pb-3">
      <label className="" htmlFor={id}>
        <input
          className={styles.custom_checkbox}
          type="checkbox"
          id={id}
          {...(register && register(id))}
        />
        <span className={styles.styled_checkbox}></span>
        {labelTitle}
      </label>
    </div>
  );
}
