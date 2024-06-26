import { Menu } from "../MenuComponent";
import { CustomButton } from "../CustomButton";

interface ReceiptPageMenuProps {
  setPdf: CallableFunction;
  setReportActive: CallableFunction;
}

export function DrugReportMenu({
  setPdf,
  setReportActive,
}: ReceiptPageMenuProps) {
  const menuButtons = [
    {
      id: 1,
      element: <CustomButton
      className="btn-submit"
      title="Отчет PDF"
      onClick={() => setPdf(true)}
    />
    }
    ,

    {
      id: 2,
      element: <CustomButton
      className="btn-submit"
      title="Выйти из отчета"
      onClick={() => setReportActive(false)}
    />
    }
    
  ];

  return <Menu buttons={menuButtons}></Menu>;
}
