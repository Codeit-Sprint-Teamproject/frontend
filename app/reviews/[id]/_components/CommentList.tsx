import { useQuery } from '@tanstack/react-query';
import { getReviewDetail } from '../_lib/getReviewDetail';
import CommentInput from './CommentInput';
import Avatar from '@/components/common/icons/Avatar';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function CommentList() {
  const { id } = useParams();
  const { data: review } = useQuery({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReviewDetail(Number(id)),
    staleTime: 60 * 1000,
  });

  return (
    <div className='pt-5 border-t'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-lg font-bold'>
          댓글 {review?.commentList?.length}
        </h3>
        <CommentInput id={Number(id)} />
      </div>
      <ul>
        {review?.commentList?.map(
          ({ id, userName, content, profile, createTime }) => (
            <li key={id} className='py-4 border-b last:border-none'>
              <div className='flex gap-2'>
                {profile ? (
                  <Image src={profile} width={32} height={32} alt='프로필' />
                ) : (
                  <Avatar className='w-8 h-8' />
                )}
                <p>{userName}</p>
              </div>
              <div className='flex flex-col gap-2.5 ml-10'>
                {content}
                <p className='text-customGrey-300'>{createTime}</p>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
