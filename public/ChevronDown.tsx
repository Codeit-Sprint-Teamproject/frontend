interface ChevronDownProps {
  width: number
  height: number
}

const ChevronDown = ({width, height}:ChevronDownProps) => {
  return (
    <>
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </>
  );
}
export default ChevronDown



