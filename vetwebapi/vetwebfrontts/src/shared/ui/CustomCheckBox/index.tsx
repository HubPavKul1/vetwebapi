import { UseFormRegister } from "react-hook-form";

import styles from "./CustomCheckBox.module.scss";

interface CustomCheckBoxProps {
  labelTitle?: string;
  itemId?: string;
  inputId: string;
  register?: UseFormRegister<TFormValues>;
}

export function CustomCheckBox({
  labelTitle,
  itemId,
  inputId,
  register,
}: CustomCheckBoxProps) {
  return (
    <div>
      <label htmlFor={itemId}>
        <input
          className={styles.custom_checkbox}
          type="checkbox"
          id={itemId}
          {...(register && register(inputId))}
        />
        <span className={styles.styled_checkbox}></span>
        {labelTitle}
      </label>
    </div>
  );
}
