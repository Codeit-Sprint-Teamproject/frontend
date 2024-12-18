interface starFillProps {
  width: number;
  height: number;
}

const StarFill = ({ width, height }: starFillProps) => {
  return (
    <>
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox='0 0 37 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.1558 3.00098L22.7908 12.391L33.1558 13.906L25.6558 21.211L27.4258 31.531L18.1558 26.656L8.88576 31.531L10.6558 21.211L3.15576 13.906L13.5208 12.391L18.1558 3.00098Z'
          fill='black'
          stroke='black'
          stroke-width='3.15625'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </>
  );
};

export default StarFill;
