import { IDateRange } from "../../../shared/model/BaseInterface";

export interface IVetWorkReport {
  disease: string;
  animal_group: string;
  animal_count: number;
  positive_count?: number;
}

export interface VetWorkReportProps {
  data: IVetWorkReport[];
  dateEnd: string;
  dateStart: string;
  setReportActive: CallableFunction;
}

export interface ReportBetweenDateRangeProps {
  setReportData: CallableFunction;
  setDateRange: CallableFunction;
  setReportActive: CallableFunction;
  dateRange?: IDateRange;
}
