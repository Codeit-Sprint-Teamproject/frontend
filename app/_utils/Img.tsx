import Image, { StaticImageData } from 'next/image';

interface ImgProps {
  url: string | StaticImageData;
  alt: string;
  width?: string;
  height?: string;
  loader?: (props: { src: string; width: number; quality?: number }) => string;
  className?: string;
}

// function ImgCustomLoader({
//   src,
//   width,
//   quality,
// }: {
//   src: string;
//   width: number;
//   quality?: number;
// }) {
//   return `https://example.com/images/${src}?w=${width}&q=${quality || 75}`;
// }

export default function Img({
  url,
  alt,
  width = '100px',
  height = '100px',
  // loader,
  className,
}: ImgProps) {
  return (
    <Image
      src={url}
      alt={alt}
      style={{ width, height }}
      className={className}
      // loader={loader}
    />
  );
}
