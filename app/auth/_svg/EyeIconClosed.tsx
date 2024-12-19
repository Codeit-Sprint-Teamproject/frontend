import React, { SVGProps } from 'react';

const EyeIconClosed: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <g clipPath='url(#clip0_1059_1453)'>
        <path
          d='M6.06 17.1975C7.76941 18.3376 9.85089 18.9693 12 19C19 19 23 12 23 12C21.7561 9.97167 20.0309 8.19955 17.94 6.80252M14.1 5.21002C13.4117 5.06904 12.7069 4.99857 12 5.00002C5 5.00002 1 12 1 12C1.60702 12.9937 2.33094 13.9292 3.16 14.7913M9.88 13.855C10.1546 14.1129 10.4859 14.3198 10.8538 14.4632C11.2218 14.6067 11.6191 14.6839 12.0219 14.6901C12.4247 14.6963 12.8248 14.6315 13.1984 14.4994C13.5719 14.3674 13.9113 14.1709 14.1962 13.9216C14.481 13.6724 14.7056 13.3755 14.8565 13.0486C15.0074 12.7217 15.0815 12.3716 15.0744 12.0192C15.0673 11.6667 14.9791 11.3191 14.8151 10.9971C14.6512 10.6751 14.4147 10.3853 14.12 10.145'
          stroke='#A9A9A9'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M23 1L1 23'
          stroke='#A9A9A9'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1059_1453'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='matrix(-1 0 0 1 24 0)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EyeIconClosed;
