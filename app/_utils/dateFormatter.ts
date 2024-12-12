import { format } from 'date-fns';

/**
 * Date 객체를 YYYY-MM-DDTHH:mm:ss의 문자열 타입으로 변환합니다.
 * @param date - 포맷팅할 날짜 데이터
 * @returns "YYYY-MM-DDTHH:mm:ss" 형식에 맞춘 문자열
 */
export const formatDateTime = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

/**
 * 선택적으로 제공된 Date 객체를 "YYYY-MM-DDTHH:mm:ss" 문자열 형식으로 변환합니다.
 *  Date 객체가 null이거나 undefined인 경우 null을 반환합니다.
 * @param date - 변환할 Date 객체 (선택 사항)
 * @returns "YYYY-MM-DDTHH:mm:ss" 형식의 문자열 또는 null
 */
export const safeFormatDateTime = (date: Date | null): string | null => {
  return date ? formatDateTime(date) : null;
};
