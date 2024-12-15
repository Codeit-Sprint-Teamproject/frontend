import { useState } from 'react';
import CheckIcon from '@/app/auth/_svg/CheckIcon';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

type Terms = {
  all: CheckedState;
  age: boolean;
  service: boolean;
  privacy: boolean;
};
type Props = {
  setIsTermsAgreed: (isAgreed: boolean) => void;
};
export default function TermsAgreement({ setIsTermsAgreed }: Props) {
  const [terms, setTerms] = useState<Terms>({
    all: 'indeterminate',
    age: false,
    service: false,
    privacy: false,
  });

  const handleAllCheck = (isCheked: boolean) => {
    setTerms({
      all: isCheked,
      age: isCheked,
      service: isCheked,
      privacy: isCheked,
    });
    setIsTermsAgreed(isCheked);
  };
  const handleIndividualCheck = (key: keyof Omit<Terms, 'all'>) => {
    const isChecked = terms[key];
    const updated = { ...terms, [key]: !isChecked };
    setTerms(updated);

    const isAllChecked = updated.age && updated.service && updated.privacy;
    if (isAllChecked) {
      setTerms({ ...updated, all: isAllChecked });
      setIsTermsAgreed(true);
    } else {
      setIsTermsAgreed(false);
    }
  };

  return (
    <div className='flex flex-col gap-[18px] mt-[18px] my-[90px]'>
      <p className='text-lg font-bold'>약관동의</p>
      <div className='items-top flex space-x-2 border p-[18px] rounded'>
        <Checkbox
          id='terms'
          checked={terms.all}
          onCheckedChange={(isChecked) => handleAllCheck(isChecked as boolean)}
          className='w-5 h-5 rounded-full text-gray-200'
        />
        <div className='grid gap-1.5 leading-none'>
          <label
            htmlFor='terms'
            className='text-sm font-bold leading-none cursor-pointer peer-disabled:opacity-70'
          >
            전체 동의하기
          </label>
          <p className='text-xs text-[#828282]'>
            서비스 이용을 위한 필수 약관에 동의합니다.
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-[18px] text-xs'>
        <div className='flex gap-2'>
          <span className='w-5 h-5 flex items-center justify-center'>
            <CheckIcon
              className={`${terms.age ? 'opacity-100' : 'opacity-0'}`}
            />
          </span>
          <p
            className='color[#111827] cursor-pointer'
            onClick={() => handleIndividualCheck('age')}
          >
            (필수) 만 14세 이상입니다.
          </p>
        </div>
        <div className='flex gap-2'>
          <CheckIcon
            className={`${terms.service ? 'opacity-100' : 'opacity-0'}`}
          />
          <p
            className='flex-1 flex justify-between color-[#111827] cursor-pointer'
            onClick={() => handleIndividualCheck('service')}
          >
            (필수) 서비스 이용약관
            <span className='underline'>자세히</span>
          </p>
        </div>
        <div className='flex gap-2'>
          <CheckIcon
            className={`${terms.privacy ? 'opacity-100' : 'opacity-0'}`}
          />
          <p
            className='flex-1 flex justify-between  color-[#111827] cursor-pointer'
            onClick={() => handleIndividualCheck('privacy')}
          >
            (필수) 개인정보 수집 및 이용동의
            <span className='underline'>자세히</span>
          </p>
        </div>
      </div>
    </div>
  );
}
