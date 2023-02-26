export abstract class IDateProvider {
  abstract compareInHours(start_date: Date, end_date: Date): number;
  abstract dateNow(): Date;
  abstract convertToUtc(date: Date): string;
  abstract compareInDays(start_date: Date, end_date: Date): number;
}
