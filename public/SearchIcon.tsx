interface SearchIconProps {
  width: number;
  height: number;
}

const SearchIcon = ({width, height}: SearchIconProps) => {
  return (
    <>
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="search">
        <path id="Vector" d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Vector_2" d="M21 21L16.65 16.65" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </>
  );
}
export default SearchIcon