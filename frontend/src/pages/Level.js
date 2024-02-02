import React from 'react';
import './Wave.css'; // Import your CSS file

export default function () {
  return (
    <div className='bg-blue-100 h-50 w-25 mt-5 flex flex-col items-center justify-center relative overflow-hidden'>
      
      <div className='grid grid-cols-4 gap-10'>
        {[3, 2, 1].map((level) => (
          <React.Fragment key={`level-${level}`}>
            <div className='w-16 h-16 flex items-center hover:scale-125 justify-center rounded-lg shadow-2xl bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden relative z-10 mb-4'>
              <p className='text-center text-gray-600 font-bold'>Level {level}</p>
            </div>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className='w-16 h-16 flex items-center justify-center motion-safe:animate-spin  rounded-full shadow-lg bg-gradient-to-r from-green-500 overflow-hidden relative z-10'
                style={{ border: '4px solid #ccc' }}
              >
                {/* You can add content inside each circular block if needed */}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className='liquid-container'>
        <div className='liquid-flow'></div>
      </div>
    </div>
  );
}
