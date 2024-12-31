import { useState } from 'react';
import SearchIcon from '../common/icons/SearchIcon';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search/${searchValue.trim()}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className='flex h-[36px] w-[280px] items-center gap-2 rounded-[4px] border border-customGrey-100 px-[8px]'
    >
      <SearchIcon className='h-6 w-6' />
      <input
        type='text'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='읽고 싶은 책의 모임을 찾아보세요'
        className='flex-grow bg-transparent text-[14px] font-normal leading-[142%]  focus:outline-none'
      />
    </form>
  );
};

export default SearchBar;
