import React from 'react'
import peep from './../assets/peep.png'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <div>
      <div className='grid gap-4 grid-cols-2 bg-gradient-to-r from-indigo-500 m-20 rounded-3xl h-96 flex shadow-lg'>
        <p className='p-20 text-gray-200 md:text-5xl mb-6 lg:text-6xl text-coolGray-500 font-bold tracking-tight'>
          Accountability for one is Accountability for all
        </p>
        
          <image src={peep} alt="image"/>
       
      </div>
      <div className='font-bold text-4xl flex p-10 m-10 font-mono  bg-white shadow-lg rounded-lg scale-x-30'>
        <div className='mx-20 flex-auto grid bg-yellow-200 items-center justify-center p-20 rounded-lg shadow-2xl'>
          <Link to="/team">
            Join A Project
          </Link>
          <input type='textbox' placeholder='Input Code' className='m-4'></input>
          <button className='bg-blue-100'>
            Join
          </button>

        </div>
        <div className='mx-20 bg-green-100 flex-auto grid items-center justify-center p-20 rounded-lg shadow-2xl'>
          Create A New Project
          <button className='bg-blue-100 mx-20'>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
