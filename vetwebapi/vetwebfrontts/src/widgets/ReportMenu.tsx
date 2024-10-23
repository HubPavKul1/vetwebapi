import useReportStore from "features/vetWork/stores/useReportStore";
import {
  PageMenuButton,
  PageMenuButtonsBlock,
  PageMenuTop,
  PageMenuWrapper,
} from "shared/index";

export function ReportMenu() {
  const showReportPDF = useReportStore((state) => state.showReportPDF);
  const setReportInactive = useReportStore((state) => state.setReportInactive);
  const menuButtons = [
    {
      id: 1,
      element: <PageMenuButton title="Отчет PDF" showContent={showReportPDF} />,
    },
    {
      id: 2,
      element: (
        <PageMenuButton
          title="Выйти из отчета"
          showContent={setReportInactive}
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
