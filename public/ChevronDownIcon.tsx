interface ChevronDownProps {
  width: number;
  height: number;
}

const ChevronDown = ({ width, height }: ChevronDownProps) => {
  return (
    <>
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='chevron-down'>
          <path
            id='Vector'
            d='M6 9L12 15L18 9'
            stroke='black'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </g>
      </svg>
    </>
  );
};
export default ChevronDown;
