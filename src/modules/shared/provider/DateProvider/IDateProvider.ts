export abstract class IDateProvider {
  abstract compareInHours(start_date: Date, end_date: Date): number;
  abstract dateNow(): Date;
  abstract convertToUtc(date: Date): string;
  abstract compareInDays(start_date: Date, end_date: Date): number;
  abstract addDays(days: number): Date;
  abstract addHours(hours: number): Date;
  abstract compareIsBefore(start_date: Date, end_date: Date): Boolean;
}
