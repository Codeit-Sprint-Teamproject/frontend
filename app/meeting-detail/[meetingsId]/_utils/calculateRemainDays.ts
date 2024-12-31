import { differenceInCalendarDays } from 'date-fns';

export function calculateRemainingDays(endDate: string) {
  const today = new Date();
  const end = new Date(endDate);
  const remainingDays = differenceInCalendarDays(end, today);
  return remainingDays;
}
