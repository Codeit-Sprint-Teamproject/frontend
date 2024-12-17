interface CalendarDotIconProps {
  width: number;
  height: number;
}

const CalendarDotIcon = ({width, height}: CalendarDotIconProps) => {
  return (
    <>
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6667 2.66669H3.33333C2.59695 2.66669 2 3.26364 2 4.00002V13.3334C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3334V4.00002C14 3.26364 13.403 2.66669 12.6667 2.66669Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.6667 1.33331V3.99998" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.33331 1.33331V3.99998" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 6.66669H14" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5.66669" cy="10.3333" r="1" fill="#030303"/>
        <circle cx="8.33337" cy="10.3333" r="1" fill="#030303"/>
        <circle cx="11" cy="10.3333" r="1" fill="#030303"/>
      </svg>
    </>
  );
}
export default CalendarDotIcon
