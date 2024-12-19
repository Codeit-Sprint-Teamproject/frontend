export default function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.5 5L18.5 18'
        stroke='#64748B'
        strokeWidth='1.8'
        strokeLinecap='round'
      />
      <path
        d='M18.5 5L5.5 18'
        stroke='#64748B'
        strokeWidth='1.8'
        strokeLinecap='round'
      />
    </svg>
  );
}
