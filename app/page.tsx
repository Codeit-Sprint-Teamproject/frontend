import MainPageBody from './_components/MainPageBody';
import MainPageHeader from './_components/MainPageHeader';

export default function Home() {
  return (
    <>
      {/* 슬라이더 영역 */}
      <MainPageHeader />

      {/* 하단 카드 레이아웃 */}
      <MainPageBody />
    </>
  );
}
