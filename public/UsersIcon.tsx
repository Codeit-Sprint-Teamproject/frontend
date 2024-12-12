interface UserIconProps {
  width: string;
  height: string;
}

const UsersIcon = ({ width, height }: UserIconProps) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox='0 0 25 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='users'>
          <path
            id='Vector'
            d='M17.7079 21.877V19.7936C17.7079 18.6886 17.2689 17.6287 16.4875 16.8473C15.7061 16.0659 14.6463 15.627 13.5413 15.627H5.20793C4.10286 15.627 3.04305 16.0659 2.26165 16.8473C1.48025 17.6287 1.04126 18.6886 1.04126 19.7936V21.877'
            stroke='black'
            stroke-width='2.08333'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            id='Vector_2'
            d='M9.37565 11.4574C11.6768 11.4574 13.5423 9.59188 13.5423 7.29069C13.5423 4.9895 11.6768 3.12402 9.37565 3.12402C7.07446 3.12402 5.20898 4.9895 5.20898 7.29069C5.20898 9.59188 7.07446 11.4574 9.37565 11.4574Z'
            stroke='black'
            stroke-width='2.08333'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            id='Vector_3'
            d='M23.959 21.8734V19.79C23.9583 18.8668 23.651 17.97 23.0854 17.2404C22.5198 16.5107 21.7279 15.9896 20.834 15.7588'
            stroke='black'
            stroke-width='2.08333'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            id='Vector_4'
            d='M16.6663 3.2627C17.5625 3.49218 18.3569 4.01343 18.9242 4.74427C19.4915 5.47511 19.7994 6.37398 19.7994 7.29915C19.7994 8.22433 19.4915 9.12319 18.9242 9.85404C18.3569 10.5849 17.5625 11.1061 16.6663 11.3356'
            stroke='black'
            stroke-width='2.08333'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </g>
      </svg>
    </>
  );
};
export default UsersIcon;
