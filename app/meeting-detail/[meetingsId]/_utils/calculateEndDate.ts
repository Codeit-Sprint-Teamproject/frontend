import { addWeeks, format } from 'date-fns';

export function calculateEndDate(startDate: string, weeks: number) {
  const start = new Date(startDate);
  const endDate = addWeeks(start, weeks);
  return format(endDate, 'yyyy-MM-dd');
}
