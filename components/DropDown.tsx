import MoreIcon from '@/components/common/icons/MoreIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

type Item = {
  text: string;
  onClick: () => void;
  isDelete?: boolean;
};
type Props = {
  items: Item[];
};

export default function DropDown({ items }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='p-2 outline-none'>
          <MoreIcon className='w-6 h-6 stroke-customGrey-300' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[108px] border px-1.5 py-2 flex flex-col items-center gap-3 bg-white rounded-sm overflow-hidden'>
        {items.map((item, i) => (
          <div key={i} className='w-full'>
            <DropdownMenuItem
              className={`w-full outline-none cursor-pointer text-center hover:bg-customGrey-50 ${item.isDelete ? 'text-[#f00]' : ''}`}
              onClick={item.onClick}
            >
              {item.text}
            </DropdownMenuItem>
            {i < items.length - 1 && (
              <DropdownMenuSeparator className='w-full border mt-3' />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
