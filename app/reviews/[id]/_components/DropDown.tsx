import MoreIcon from '@/components/common/icons/MoreIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

type Props = {
  onDelete: () => void;
  onUpdate?: () => void;
};
export default function DropDown({ onDelete, onUpdate }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='p-2 outline-none'>
          <MoreIcon className='w-6 h-6 stroke-black' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[108px] border px-1.5 py-2 flex flex-col items-center gap-3 bg-white rounded-sm overflow-hidden'>
        <DropdownMenuItem
          className='outline-none cursor-pointer hover:bg-customGrey-50'
          onClick={onUpdate}
        >
          수정하기
        </DropdownMenuItem>
        <DropdownMenuSeparator className='w-full border' />
        <DropdownMenuItem
          className='outline-none cursor-pointer text-[#f00] hover:bg-customGrey-50'
          onClick={onDelete}
        >
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
