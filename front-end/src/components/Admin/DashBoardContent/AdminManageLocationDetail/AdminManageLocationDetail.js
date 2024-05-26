import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import axios from 'axios'

import EditField from './EditField'

import CSVReader from 'react-csv-reader'

import toast from 'react-hot-toast'

import './AdminManageLocationDetail.css'

const AdminManageLocationDetail = () => {
  const [location, setLocation] = useState()
  const { filterby } = useParams()
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate(); // useNavigate hook
  const getLocationsAPI = process.env.REACT_APP_SERVER_DOMAIN;
  console.log("Location la:", location)
  const handleGetData = (data) => {
    function arraysToObject(keys, values) {
      if (keys.length !== values.length) {
        throw new Error('Arrays must be of equal length');
      }

      const result = {};
      for (let i = 0; i < keys.length; i++) {
        result[keys[i].toLowerCase()] = values[i];
      }
      return result;
    }

    const resultObject = arraysToObject(data[0], data[1])

    setLocation((prev) => {
      return {
        ...prev,
        positive: resultObject.positive,
        negative: resultObject.negative,
        neutral: resultObject.neutral,
        convenient: resultObject.convenient,
        service: resultObject.service,
        yummy: resultObject.yummy
      }
    })

    setUpdate(true)
  }

  const handleUpdateLocationData = async () => {
    const data = {
      positive: location.positive,
      negative: location.negative,
      neutral: location.neutral,
      convenient: location.convenient,
      service: location.service,
      yummy: location.yummy
    }
    try {
      const response = await axios.patch(`${getLocationsAPI}location/update/${parseInt(filterby)}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const dataRes = response.data
      console.log(dataRes);
      toast.success(dataRes.message)
    }
    catch (err) { console.error(err) }
  }

  useEffect(() => {
    try {
      const getLocationDetail = async () => {
        const response = await axios.get(`${getLocationsAPI}location/get/detail/${parseInt(filterby)}`, {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        })
        console.log("Data response", response)
        const dataRes = response.data
        setLocation(dataRes.data)
      }
      getLocationDetail()
    }
    catch (err) { console.error(err) }
  }, [])

  const handleCancelClick = () => {
    navigate('/admin-dashboard/manage-locations'); // Redirect to specified route
  };


  return (
    <div className='w-full h-full bg-[#f9fbfd]'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='px-4 pt-5 mt-1 ml-5 font-bold text-2xl text-slate-900'>Change location: {location && location.name}</div>
        <div className='relative'>

          <div className='absolute top-0 right-0 mr-12'>
            <CSVReader
              cssClass='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
              onFileLoaded={(data, fileInfo, originalFile) => handleGetData(data)} />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className=' bg-white mx-5 my-5 rounded-md'>
        <EditField title={'Name'} content={location && location.name} />
        <EditField title={'Address'} content={location && location.address} />
        <EditField title={'Longitude'} content={location && location.longitude} />
        <EditField title={'Latitude'} content={location && location.latitude} />
        <EditField title={'Category'} content={location && location.category.name} />
        <EditField title={'Price'} content={location && location.subcategory} />
        <EditField title={'Positive'} content={location && location.positive} update={update} />
        <EditField title={'Negative'} content={location && location.negative} update={update} />
        <EditField title={'Neutral'} content={location && location.neutral} update={update} />
        <EditField title={'Convenient'} content={location && location.convenient} update={update} />
        <EditField title={'Service'} content={location && location.service} update={update} />
        <EditField title={'Yummy'} content={location && location.yummy} update={update} />
      </div>
      <div className=' inline-block mb-5 ml-11'>
        <button
          onClick={handleUpdateLocationData}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Save Change
        </button>
        <button
          onClick={handleCancelClick}
          className='text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 opacity-75'>Cancel</button>
      </div>
    </div>
  )
}

export default AdminManageLocationDetail