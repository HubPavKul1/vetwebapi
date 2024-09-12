import { Menu } from "../Menu";
import { CustomButton } from "../../shared/ui/CustomButton";

interface ReportMenuProps {
  setPdf: CallableFunction;
  setReportActive: CallableFunction;
}

export function ReportMenu({ setPdf, setReportActive }: ReportMenuProps) {
  const menuButtons = [
    {
      id: 1,
      element: (
        <CustomButton
          className="btn-submit"
          title="Отчет PDF"
          onClick={() => setPdf(true)}
        />
      ),
    },
    {
      id: 2,
      element: (
        <CustomButton
          className="btn-submit"
          title="Выйти из отчета"
          onClick={() => setReportActive(false)}
        />
      ),
    },
  ];

  return <Menu buttons={menuButtons}></Menu>;
}
