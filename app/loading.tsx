export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className='container-loader'>
        <div className='bar-loader'></div>
        <div className='bar-loader'></div>
        <div className='bar-loader'></div>
        <div className='bar-loader'></div>
      </div>
    </div>
  );
}
