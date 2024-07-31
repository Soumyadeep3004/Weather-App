import React, { useState } from 'react'
import { BiSearch, BiCurrentLocation } from 'react-icons/bi'

export default function Inputs({ setQuery, setUnit }) {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    setQuery({ q: city })
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log("lat: ", latitude, "long: ", longitude)
        setQuery({ lat: latitude, long: longitude })
      })
    }
  }
  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input type="text" placeholder='Search by city...' className='text-gray-500 text-xl p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase'
          onChange={(e) => { setCity(e.currentTarget.value) }}
        />

        <BiSearch
          size={30} className='cursor-pointer transition ease-out hover:scale-125' onClick={handleSearch} />

        <BiCurrentLocation
          size={30} className='cursor-pointer transition ease-out hover:scale-125'
          onClick={handleLocationClick}
        />
      </div>
      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button className='text-2xl font-medium transition ease-out hover:scale-125'
          onClick={() => setUnit("metric")}
        >°C</button>

        <p className='text-2xl font-medium mx-1'>|</p>

        <button className='text-2xl font-medium transition ease-out hover:scale-125'
          onClick={() => setUnit("imperial")} >°F</button>
      </div>
    </div>
  )
}
