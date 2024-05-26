import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HiUsers } from "react-icons/hi2";
const AdminManageUsers = () => {
    const [usersData, setUsersData] = useState([])
    const getUsersAPI = process.env.REACT_APP_SERVER_DOMAIN;

    useEffect(() => {
        try {
            const token = localStorage.getItem("accessToken");
            const getLocations = async () => {
                const response = await axios.get(`http://localhost:8000/users/`, {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                    },
                })
                const dataRes = response.data
                if (Array.isArray(dataRes.results)) {
                    setUsersData([...dataRes.results]);
                } else {
                    console.error("Data is not an array:", dataRes);
                }
            }
            getLocations()
        }
        catch (error) {
            console.error(error)
        }
    }, [])
    console.log("User data:", usersData)

    return (
        <>
            {/* Label */}
            <div
                className='p-3 flex items-center gap-x-3 mt-2 ml-5 font-semibold text-lg text-slate-700'><HiUsers /> Manage Users
            </div>
            <hr />
            {/* Content */}
            <div >
                <div class="m-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    First name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Last name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    User name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Id
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-6 py-4">
                                    Silver
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    $2999
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Microsoft Surface Pro
                                </th>
                                <td class="px-6 py-4">
                                    White
                                </td>
                                <td class="px-6 py-4">
                                    Laptop PC
                                </td>
                                <td class="px-6 py-4">
                                    $1999
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Magic Mouse 2
                                </th>
                                <td class="px-6 py-4">
                                    Black
                                </td>
                                <td class="px-6 py-4">
                                    Accessories
                                </td>
                                <td class="px-6 py-4">
                                    $99
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Google Pixel Phone
                                </th>
                                <td class="px-6 py-4">
                                    Gray
                                </td>
                                <td class="px-6 py-4">
                                    Phone
                                </td>
                                <td class="px-6 py-4">
                                    $799
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple Watch 5
                                </th>
                                <td class="px-6 py-4">
                                    Red
                                </td>
                                <td class="px-6 py-4">
                                    Wearables
                                </td>
                                <td class="px-6 py-4">
                                    $999
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 gap-4 mt-4 px-5 pb-10">

                    {usersData.map((user, index) => {
                        return (
                            <>
                                <NavLink
                                    to={`/admin-dashboard/manage-users/${user.id}`}
                                    key={index}
                                    className="bg-cover bg-center rounded-lg shadow-md p-4 flex items-center justify-between hover:bg-opacity-75 transition duration-200 ease-in-out"
                                >
                                    <div className="bg-gradient-to-r from-white to-transparent p-2 rounded w-2/3">
                                        <input type="text" className="flex items-center form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out" />
                                        <p className="mt-2 text-gray-900 font-semibold">{user.first_name}</p>
                                    </div>
                                </NavLink>
                            </>
                        )
                    }
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminManageUsers