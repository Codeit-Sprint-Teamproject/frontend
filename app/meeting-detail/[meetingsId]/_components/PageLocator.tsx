import ChevronRightIcon from '@/public/ChevronRightIcon';
import HomeIcon from '@/public/HomeIcon';

interface PageLocatorProps {
  pagePath: string[];
  currentPage: string;
}

const PageLocator = ({ pagePath, currentPage }: PageLocatorProps) => {
  return (
    <div className='flex flex-row justify-start items-center text-sm font-medium'>
      <HomeIcon width={14} height={14} className='mr-2' />
      {pagePath.map((item, idx) => (
        <div key={idx} className='flex flex-row justify-start items-center'>
          <span>{item}</span>
          <ChevronRightIcon width={14} height={14} />
        </div>
      ))}
      <span>{currentPage}</span>
    </div>
  );
};
export default PageLocator;
