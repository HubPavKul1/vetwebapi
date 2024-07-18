import { useState } from "react";
import { IDateRange } from "../../../interfaces/BaseInterface";
import { Catalog } from "../../../components/Catalog";
import { DiagnosticBetweenDateRange } from "./DiagnosticBetweenDateRange";
import { DiagnosticReport } from "./DiagnosticReport";

export function VetWorkReportMainPage() {
  const [vetWorkReportData, setVetWorkReportData] = useState<object>({});
  const [dateRange, setDateRange] = useState<IDateRange>();
  const [reportActive, setReportActive] = useState(false);

  return (
    <>
    {!reportActive ? (
        <Catalog
        title="Отчеты по противоэпизоотической работе"
        cardsInRow={3}
        dataLength={1}
      >
        <DiagnosticBetweenDateRange
          setDiagnosticData={setVetWorkReportData}
          setDateRange={setDateRange}
          setReportActive={setReportActive}
        />
      </Catalog>
    ) : (
        dateRange && vetWorkReportData.diagnostics && 
            <DiagnosticReport
                data={vetWorkReportData.diagnostics} 
                dateStart={dateRange?.date_start}
                dateEnd={dateRange?.date_end} 
                setReportActive={setReportActive}
            />
        
    )

    }
      
    </>
  );
}
