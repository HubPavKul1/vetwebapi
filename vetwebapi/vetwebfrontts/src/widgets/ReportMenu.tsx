import {
  CustomButton,
  PageMenuButtonsBlock,
  PageMenuTop,
  PageMenuWrapper,
} from "shared/index";

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

  return (
    <PageMenuWrapper>
      <PageMenuTop></PageMenuTop>
      <PageMenuButtonsBlock>
        {menuButtons.map((item) => (
          <div key={item.id}>{item.element}</div>
        ))}
      </PageMenuButtonsBlock>
    </PageMenuWrapper>
  );
}
