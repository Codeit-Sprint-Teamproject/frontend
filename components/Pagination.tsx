import PageNext from '@/components/common/icons/PageNext';
import PagePrev from '@/components/common/icons/PagePrev';

type Props = {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export default function Pagination({
  page,
  totalPage,
  onPageChange,
  className,
}: Props) {
  return (
    <div className={className}>
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
