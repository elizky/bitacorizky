import React from 'react';

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='container-loader'>
        <div className='bar-loader'></div>
        <div className='bar-loader'></div>
        <div className='bar-loader'></div>
        <div className='bar-loader'></div>
      </div>
    </div>
  );
};

export default Loader;
