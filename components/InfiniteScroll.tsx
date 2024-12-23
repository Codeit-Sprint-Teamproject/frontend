import { useEffect, useRef } from 'react';

type Props<T> = {
  list: T[];
  renderItem: (item: T) => JSX.Element;
  onView: () => void;
  className?: string;
  hasMore: boolean;
  isFetching: boolean;
  emptyMessage: string;
};

export default function InfiniteScroll<T>({
  list,
  renderItem,
  onView,
  className,
  hasMore,
  isFetching,
  emptyMessage,
}: Props<T>) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current) return;
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        onView();
      }
    };
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
    });
    observer.observe(targetRef.current);
    return () => observer && observer.disconnect();
  }, [onView]);

  if (!list.length) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className={className}>
      {list.map((item) => renderItem(item))}
      {hasMore && (
        <div ref={targetRef} className='h-[50px]'>
          {isFetching && <p>Loading...</p>}
        </div>
      )}
    </div>
  );
}
