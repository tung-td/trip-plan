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
                    const filterSuperAdmin = dataRes.results.filter(user => { return user.is_superuser != true })
                    setUsersData(filterSuperAdmin);
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
            <div className='flex'>
                <div
                    className='p-3 flex items-center gap-x-3 mt-2 ml-5 font-semibold text-lg text-slate-700'><HiUsers /> Manage Users
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                    <button type="button" class="inline-flex items-center px-3 py-3 text-lg font-medium text-center text-black shadow-md rounded-lg">
                        Total users
                        <span class="p-3 inline-flex items-center justify-center ms-2 text-lg font-semibold text-blue-900 bg-yellow-300 rounded-md">
                            {usersData.length}
                        </span>
                    </button>
                </div>
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
                            {usersData.map((user, index) => {
                                return (
                                    <>
                                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {user.email}
                                            </th>
                                            <td class="px-6 py-4">
                                                {user.first_name}
                                            </td>
                                            <td class="px-6 py-4">
                                                {user.last_name}
                                            </td>
                                            <td class="px-6 py-4">
                                                {user.username}
                                            </td>
                                            <td class="px-6 py-4">
                                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{user.id}</a>
                                            </td>
                                        </tr>
                                    </>
                                )

                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminManageUsers