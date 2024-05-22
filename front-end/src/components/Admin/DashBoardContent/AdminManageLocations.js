import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const AdminManageLocations = () => {
    const [buttonValue, setButtonValue] = useState('--------')
    const [category, setCategory] = useState('Hotel')
    const [categoryID, setCategoryID] = useState('1')
    const [activeDropAction, setActiveDropAction] = useState(false)
    const [activeDropCategory, setActiveDropCategory] = useState(false)
    const [locationData, setLocationData] = useState([])

    const getLocationsAPI = process.env.REACT_APP_SERVER_DOMAIN;

    const handleActiveDropAction = () => {
        setActiveDropAction((prev) => !prev)
    }

    const handleActiveDropCategory = () => {
        setActiveDropCategory((prev) => !prev)
    }

    const handleGetCategory = (category) => {
        setCategory(category)
        setActiveDropCategory((prev) => !prev)
        category == 'Hotel'? setCategoryID(1):(category == 'Restaurant'? setCategoryID(2): setCategoryID(3))
    }

    useEffect(() => {
        try {
           const token = localStorage.getItem("accessToken");
           const getLocations = async () => {
            const response = await axios.get(`${getLocationsAPI}locations/get/category/${categoryID}`, {
                headers: {
                    "Content-Type": "application/json", 
                    // Authorization: `Bearer ${token}`,
                  },
            })
            const dataRes = response.data
            setLocationData([...dataRes.data])
           }
           getLocations()
        }
        catch (error) {
            console.error(error)
        }

    },[categoryID])

  return (
    <>
    {/* Header */}
    <div className=' mt-2 ml-5 font-semibold text-lg text-slate-700'>Select location to change</div>
    {/* Content */}
    <div>
        {/* Header */}
        <div className='mt-2 ml-5 flex items-center justify-start'>
            <div className='px-3 py-2'>Action: </div>
            {/* Drop down list */}
            <div className='relative inline-block text-left'>
                <div>
                    <button 
                        type="button" 
                        class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
                        id="menu-button" 
                        aria-expanded="true" 
                        aria-haspopup="true"
                        onClick={handleActiveDropAction}>
                    {buttonValue}
                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                    </button>
                </div>
                {
                    activeDropAction && (
                        <div class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                            <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Delete selected locations</a>                </div>
                        </div>
                    )
                }
            </div>
            {/* Excute button */}
            <button 
                type='button'
                className='ml-2 border border-slate-500 inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                Go
            </button>
            <div className=' ml-2 text-slate-700 text-sm font-normal'> 0 of 39 selected</div>
        </div>
        {/* Location lists */}
        <div>
            <div className='mt-2 ml-5 flex items-center justify-start'>
                <div className='px-3 py-2'>Category: </div>
                {/* Drop down list */}
                <div className='relative inline-block text-left'>
                    <div>
                        <button 
                            type="button" 
                            class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
                            id="menu-button" 
                            aria-expanded="true" 
                            aria-haspopup="true"
                            onClick={handleActiveDropCategory}>
                        {category}
                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                        </button>
                    </div>
                    {
                        activeDropCategory && (
                            <div class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0" onClick={() => handleGetCategory('Hotel')}>Hotel</a>  
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0" onClick={() => handleGetCategory('Restaurant')}>Restaurant</a>                
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0" onClick={() => handleGetCategory('Sight Seeing')}>Sight Seeing</a>                
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {/* List */}
            <div>
                <ul>
                    {
                        locationData.map((location, index) => {
                            return(
                                <NavLink to={`/admin-dashboard/manage-location/${location.id}`}>
                                    <li key={index} className='flex hover:underline'>
                                        <input type='checkbox'/>
                                        <p className='ml-2 mb-0'>{location.name}</p>
                                    </li>
                                </NavLink>                  
                            )
                        })
                    }
                    
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminManageLocations