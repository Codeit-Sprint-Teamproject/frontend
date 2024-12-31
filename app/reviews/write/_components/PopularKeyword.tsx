type Keyword = { id: number; title: string };

export default function PopularKeyword({ keywords }: { keywords: Keyword[] }) {
  return (
    <div className='mt-6'>
      <h4 className='text-lg text-customGrey-500 font-bold pb-6'>
        추천 검색어
      </h4>
      <div className='flex flex-wrap gap-2.5'>
        {keywords?.map(({ id, title }) => (
          <p key={id} className='px-2 py-3 bg-customGreen-50 rounded-full'>
            {title}
          </p>
        ))}
      </div>
    </div>
  );
}
