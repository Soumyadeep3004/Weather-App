import React from 'react'

export default function TopButtons({ setQuery}) {
    const cities = [
        {
            id: 1,
            name: 'London'
        }, ,
        {
            id: 2,
            name: 'Sydney'
        },
        {
            id: 3,
            name: 'Tokyo'
        },
        {
            id: 4,
            name: 'Paris'
        },
        {
            id: 5,
            name: 'Toronto'
        }
    ]
    return (
        <div className='flex items-center justify-around my-6'>
            {
                cities.map((value) => (
                    <button
                        key={value.id}
                        className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in' 
                        onClick={()=>setQuery({q:value.name})}
                        >
                        {value.name}
                    </button>
                )
                )}

        </div>
    )
}
