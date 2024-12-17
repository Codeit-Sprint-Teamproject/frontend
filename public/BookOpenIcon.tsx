interface BookOpenIconProps {
  width: string;
  height: string;
}

const BookOpenIcon = ({ width, height }: BookOpenIconProps) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox='0 0 29 26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z'
          stroke='black'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z'
          stroke='black'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <g clip-path='url(#clip0_852_1940)'>
          <rect
            width='15'
            height='15'
            transform='translate(14 11)'
            fill='white'
          />
          <path
            d='M21.5 24.75C24.9518 24.75 27.75 21.9518 27.75 18.5C27.75 15.0482 24.9518 12.25 21.5 12.25C18.0482 12.25 15.25 15.0482 15.25 18.5C15.25 21.9518 18.0482 24.75 21.5 24.75Z'
            stroke='black'
            stroke-width='1.25'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M21.5 14.75V18.5L24 19.75'
            stroke='black'
            stroke-width='1.25'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </g>
        <defs>
          <clipPath id='clip0_852_1940'>
            <rect
              width='15'
              height='15'
              fill='white'
              transform='translate(14 11)'
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
export default BookOpenIcon;
