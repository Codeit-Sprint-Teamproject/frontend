interface UsersIconProps {
  width: number;
  height: number;
}

const UsersIcon = ({width, height}:UsersIconProps) => {
  return (
    <>
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.3327 14V12.6667C11.3327 11.9594 11.0517 11.2811 10.5516 10.781C10.0515 10.281 9.37326 10 8.66602 10H3.33268C2.62544 10 1.94716 10.281 1.44706 10.781C0.946967 11.2811 0.666016 11.9594 0.666016 12.6667V14" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.99967 7.33333C7.47243 7.33333 8.66634 6.13943 8.66634 4.66667C8.66634 3.19391 7.47243 2 5.99967 2C4.52692 2 3.33301 3.19391 3.33301 4.66667C3.33301 6.13943 4.52692 7.33333 5.99967 7.33333Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.333 13.9993V12.6659C15.3326 12.0751 15.1359 11.5011 14.7739 11.0341C14.4119 10.5672 13.9051 10.2336 13.333 10.0859" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.666 2.08984C11.2396 2.23671 11.748 2.57031 12.1111 3.03805C12.4742 3.50579 12.6712 4.08106 12.6712 4.67318C12.6712 5.26529 12.4742 5.84056 12.1111 6.3083C11.748 6.77604 11.2396 7.10964 10.666 7.25651" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </>
  );
}
export default UsersIcon
