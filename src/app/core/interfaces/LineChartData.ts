import {Observable} from "rxjs";

export interface LineChartData {
  title: string
  data: Observable<number>
}
