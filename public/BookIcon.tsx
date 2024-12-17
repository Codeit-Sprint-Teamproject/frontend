interface BookIconProps{
  width: number;
  height: number;
}

const BookIcon = ({width, height}:BookIconProps) => {
  return (
    <>
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_776_1156)">
        <path d="M3.48639 3.77332H6.9721C7.58842 3.77332 8.17949 4.01814 8.61528 4.45394C9.05108 4.88974 9.29591 5.48081 9.29591 6.09712V14.2305C9.29591 13.7682 9.11229 13.3249 8.78544 12.9981C8.45859 12.6712 8.01529 12.4876 7.55306 12.4876H3.48639V3.77332Z" stroke="black" strokeWidth="1.1619" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.1045 3.77332H11.6188C11.0025 3.77332 10.4114 4.01814 9.97561 4.45394C9.53981 4.88974 9.29498 5.48081 9.29498 6.09712V14.2305C9.29498 13.7682 9.4786 13.3249 9.80545 12.9981C10.1323 12.6712 10.5756 12.4876 11.0378 12.4876H15.1045V3.77332Z" stroke="black" strokeWidth="1.1619" strokeLinecap="round" strokeLinejoin="round"/>
        <g clipPath="url(#clip1_776_1156)">
        <rect width="8.71428" height="8.71428" transform="translate(10.457 8.42163)" fill="white"/>
        <path d="M14.8142 16.4083C16.8196 16.4083 18.4452 14.7827 18.4452 12.7774C18.4452 10.7721 16.8196 9.14642 14.8142 9.14642C12.8089 9.14642 11.1833 10.7721 11.1833 12.7774C11.1833 14.7827 12.8089 16.4083 14.8142 16.4083Z" stroke="black" strokeWidth="0.726191" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.8143 10.5981V12.7767L16.2667 13.5028" stroke="black" strokeWidth="0.726191" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        </g>
        <defs>
        <clipPath id="clip0_776_1156">
        <rect width="20.3333" height="17.4286" fill="white" transform="translate(0 0.285706)"/>
        </clipPath>
        <clipPath id="clip1_776_1156">
        <rect width="8.71428" height="8.71428" fill="white" transform="translate(10.457 8.42163)"/>
        </clipPath>
        </defs>
      </svg>
    </>
  );
}
export default BookIcon
