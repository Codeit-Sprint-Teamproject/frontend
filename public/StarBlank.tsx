interface starBlankProps {
  width: string;
  height: string;
}

const StarBlank = ({ width, height }: starBlankProps) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox='0 0 37 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.313 3.00098L22.948 12.391L33.313 13.906L25.813 21.211L27.583 31.531L18.313 26.656L9.04299 31.531L10.813 21.211L3.31299 13.906L13.678 12.391L18.313 3.00098Z'
          stroke='black'
          stroke-width='3.15625'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </>
  );
};

export default StarBlank;
