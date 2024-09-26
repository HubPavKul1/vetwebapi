
interface DrugReportTopTextProps {
    textNumber: number;
}

export function DrugReportTopText({textNumber}: DrugReportTopTextProps) {
  return (
    <div>
        <p>
            Приложение № {textNumber} к Порядку учета, хранения, использования и списания
            лекарственных средств и препаратов для ветеринарного применения,
            поступающих за счет средств федерального и областного бюджетов,
            бюджетными государственными учреждениями ветеринарии Ивановской
            области
          </p>
    </div>
  )
}
