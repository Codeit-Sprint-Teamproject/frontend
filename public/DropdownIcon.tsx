interface DropdownIconProps{
  width: number;
  height: number;
}

const DropdownIcon = ({width, height}:DropdownIconProps) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={`${width}px`}
        height={`${height}px`}
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='M6 9L12 15L18 9'
          stroke='black'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    </>
  );
};
export default DropdownIcon;
