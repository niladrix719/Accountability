import React from 'react'
import Select from "react-dropdown-select";
export default function Assignment() {
    const options = [
        { 
          value: 1,
          label: "Vendetta"
        },
        {
          value:  2,
          label: "Robotics"
        },
        {
            value:  3,
            label: "Media"
          }
      ];
    return (
        <div className='bg-gradient-to-r from-yellow-100 to-orange-200 ... flex gap-20 items-center min-h-screen p-4 bg-gray-100 flex-col'>

        <div className='mt-4'>
            <div className='mb-2'> 
         <span className='text-4xl font-bold text-gray-900 dark:text-black'>  Assignment Name 
         </span> <br/>
         </div>
        <Select options={options} onChange={(values) => this.setValues(values)} />
        </div>
            <div className="w-1/2 h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="h-4 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: '45%' }}></div>
                
            </div>
            <div>
           
            <div className='text-4xl font-bold text-4xl flex p-10 m-10 font-mono bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 mt-3xl'>
            
            <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-10 text-center me-2 mb-2 text-4xl">Upload File</button>
            {' '}
            <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-10 py-10 text-center me-2 mb-2 text-4xl">Add Text</button>
            
            </div>
            <button type="button" class="flex items-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save</button>
            
            </div>      
        </div>
    )
}
