import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDateTime = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

export const safeFormatDateTime = (date: Date | null): string | null => {
  return date ? formatDateTime(date) : null;
};

export const formatDateWithWeekday = (date: Date): string => {
  return new Date(date)
    .toLocaleString('ko', {
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    })
    .replace(/(.*?\..*?)\./, '$1');
};

export const formatDateForDetailPageHeader = (date: string): string => {
  const currentDate = parse(date, 'yyyy-MM-dd', new Date());
  const formattedDate = format(currentDate, 'MM월 dd일 EEEE', { locale: ko });
  return formattedDate;
};
