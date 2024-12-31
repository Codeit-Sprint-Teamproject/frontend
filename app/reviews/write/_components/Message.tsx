export default function Message({ message }: { message: string }) {
  const sentences = message.split('.').filter((sentence) => sentence.trim());
  return (
    <div className='h-[575px] flex justify-center items-center text-lg text-customGrey-400'>
      <div className='w-full text-center'>
        {sentences.map((sentence, index) => (
          <p key={index}>{sentence.trim()}.</p>
        ))}
      </div>
    </div>
  );
}
