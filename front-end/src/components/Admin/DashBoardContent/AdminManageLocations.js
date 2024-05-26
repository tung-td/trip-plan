import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoLocationSharp } from "react-icons/io5";
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
        category == 'Hotel' ? setCategoryID(1) : (category == 'Restaurant' ? setCategoryID(2) : setCategoryID(3))
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

    }, [categoryID])

    const totalPositive = locationData.reduce((total, location) => total + location.positive, 0);
    const totalNegative = locationData.reduce((total, location) => total + location.negative, 0);
    const totalNeutral = locationData.reduce((total, location) => total + location.neutral, 0);

    return (
        <>
            {/* Label */}
            <div
                className='p-3 flex items-center gap-x-3 mt-2 ml-5 font-semibold text-lg text-slate-700'><IoLocationSharp /> Select location to change
            </div>
            <hr />

            {/* Content */}
            <div >
                {/* Header */}
                <div className='flex gap-4'>
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

                    {/* Pills */}
                    <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                        <button type="button" class="inline-flex items-center px-3 py-3 text-lg font-medium text-center text-black shadow-md rounded-lg">
                            Total locations
                            <span class="p-3 inline-flex items-center justify-center ms-2 text-lg font-semibold text-blue-900 bg-yellow-300 rounded-md">
                                {locationData.length}
                            </span>
                        </button>

                        <button type="button" class="inline-flex items-center px-3 py-3 text-lg font-medium text-center text-black shadow-md rounded-lg">
                            Total positive
                            <span class="p-3 inline-flex items-center justify-center ms-2 text-lg font-semibold text-blue-900 bg-green-300 rounded-md">
                                {totalPositive}
                            </span>
                        </button>

                        <button type="button" class="inline-flex items-center px-3 py-3 text-lg font-medium text-center text-black shadow-md rounded-lg">
                            Total negative
                            <span class="p-3 inline-flex items-center justify-center ms-2 text-lg font-semibold text-white bg-red-500 rounded-md">
                                {totalNegative}
                            </span>
                        </button>

                        <button type="button" class="inline-flex items-center px-3 py-3 text-lg font-medium text-center text-black shadow-md rounded-lg">
                            Total neutral
                            <span class="p-3 inline-flex items-center justify-center ms-2 text-lg font-semibold text-blue-900 bg-blue-100 rounded-md">
                                {totalNeutral}
                            </span>
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 px-5 pb-10">
                    {locationData.map((location, index) => {
                        return (
                            <NavLink
                                to={`/admin-dashboard/manage-location/${location.id}`}
                                key={index}
                                className="bg-cover bg-center rounded-lg shadow-md p-4 flex items-center justify-between hover:bg-opacity-75 transition duration-200 ease-in-out"
                                style={{ backgroundImage: `url(${location.image})`, minHeight: '150px' }}>
                                <div className="bg-gradient-to-r from-white to-transparent p-2 rounded w-2/3">
                                    <input type="checkbox" className="flex items-center form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out" />
                                    <p className="mt-2 text-gray-900 font-semibold">{location.name}</p>
                                </div>
                            </NavLink>
                        )
                    }
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminManageLocations