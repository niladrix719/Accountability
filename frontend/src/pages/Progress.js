import React from 'react';
import ok from '../assets/ok.png';

export default function () {
  const pageStyle = {
    backgroundImage: `url("https://i.pinimg.com/originals/1b/06/b8/1b06b87d5f493f93130ffcccdac578bf.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen h-20 flex items-center justify-center" style={pageStyle}>
      <div className="w-3/4 h-4/5 bg-white bg-opacity-20 p-8 rounded-md shadow-md backdrop-blur-md text-gray-800">
        <div className="flex items-center space-x-4">
          <img src={ok} alt="none" className="w-20 h-30" />
          <span className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-blue-300 text-transparent bg-clip-text">PHILIP</span>
        </div>
        {/* Heading for progress */}
        <h2 className="text-2xl text-white font-semibold mt-6">Progress</h2>

        {/* Single div for level, progress, and assignment name */}
        <div className="mt-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded-md p-4">
          <div className="block text-lg">
            <span>Level:</span>
            <span className="text-xl font-semibold"> 2</span>
          </div>
          <div className="block text-lg mt-4">
            <span>Assignment:</span>
            <span className="text-xl font-semibold"> Robotics</span>
          </div>
          <div className="block text-lg mt-4 bg-red-100 rounded-lg"> 62% done</div>
        </div>

        {/* New div for additional options */}
        <div className="mt-8 border-t border-gray-300 pt-6">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-blue-500 hover:text-blue-700 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md transition duration-300">Check Mutual Friends</button>
              <button className="text-blue-500 hover:text-blue-700 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md transition duration-300">Check Mutual Projects</button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-green-500 hover:text-green-700 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-md transition duration-300">Add Person</button>
              <button className="text-purple-500 hover:text-purple-700 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-md transition duration-300">Check Achievements</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
