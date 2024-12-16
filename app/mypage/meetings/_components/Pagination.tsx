import PageNext from '../_svg/PageNext';
import PagePrev from '../_svg/PagePrev';

type Props = {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPage, onPageChange }: Props) {
  return (
    <div className='flex justify-center gap-2 mt-20 absolute bottom-10 left-1/3'>
      <button onClick={() => onPageChange(page - 1)} disabled={!page}>
        <PagePrev className='w-8 h-8' />
      </button>
      {Array.from({ length: totalPage }, (_, index) => (
        <button
          className={`p-2 ${page === index ? 'font-bold' : ''}`}
          key={index}
          onClick={() => onPageChange(index)}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPage - 1}
      >
        <PageNext className='w-8 h-8' />
      </button>
    </div>
  );
}
