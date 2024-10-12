export class DateRange {
  startDate: Date;
  endDate: Date;

  constructor(startDate?: Date, endDate?: Date) {
    this.startDate = startDate ?? new Date();
    this.endDate = endDate ?? new Date();
  }
}
