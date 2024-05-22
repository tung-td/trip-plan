import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import EditField from './EditField'

import CSVReader from 'react-csv-reader'

import toast from 'react-hot-toast'

const AdminManageLocationDetail = () => {
    const [location, setLocation] = useState()
    const {filterby} = useParams()
    const [update, setUpdate] = useState(false)
    const getLocationsAPI = process.env.REACT_APP_SERVER_DOMAIN;

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
        return{
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
        positive:location.positive,
        negative:location.negative,
        neutral:location.neutral,
        convenient:location.convenient,
        service:location.service,
        yummy:location.yummy
      }
      try{
        const response = await axios.patch(`${getLocationsAPI}location/update/${parseInt(filterby)}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        const dataRes = response.data
        console.log(dataRes);
        toast.success(dataRes.message)
      }
      catch(err) {console.error(err)}
    }

    useEffect(() => {
        try{ 
            const getLocationDetail = async () => {
                const response = await axios.get(`${getLocationsAPI}location/get/detail/${parseInt(filterby)}`, {
                    headers: {
                        "Content-Type": "application/json", 
                        // Authorization: `Bearer ${token}`,
                      },
                })
                const dataRes = response.data
                setLocation(dataRes.data)
            }
            getLocationDetail()
        }
        catch(err) {console.error(err)}
    },[]) 

  return (
    <div className='w-full h-full bg-[#f9fbfd]'>
       {/* Header */}
       <div className='flex items-center justify-between'>
        <div className='mt-1 ml-5 font-bold text-2xl text-slate-900'>Change location: {location && location.name}</div> 
        <div className='relative'>
          
          <div className=' absolute top-0 right-0'>
            <CSVReader 
              cssClass='csv-reader-input'
              onFileLoaded={(data, fileInfo, originalFile) => handleGetData(data)} />
          </div>        
        </div>
       </div>
    {/* Content */}
      <div className=' bg-white mx-5 my-5 rounded-md'>
        <EditField title={'Name'} content={location && location.name }/>
        <EditField title={'Address'} content={location && location.address }/>
        <EditField title={'Longitude'} content={location && location.longitude }/>
        <EditField title={'Latitude'} content={location && location.latitude }/>
        <EditField title={'Category'} content={location && location.category.name}/>
        <EditField title={'Price'} content={location && location.subcategory }/>
        <EditField title={'Image'} content={location && location.image }/>
        <EditField title={'Positive'} content={location && location.positive } update={update}/>
        <EditField title={'Negative'} content={location && location.negative } update={update}/>
        <EditField title={'Neutral'} content={location && location.neutral } update={update}/>
        <EditField title={'Convenient'} content={location && location.convenient } update={update}/>
        <EditField title={'Service'} content={location && location.service } update={update}/>
        <EditField title={'Yummy'} content={location && location.yummy } update={update}/>
      </div>
      <div className=' inline-block mb-5'>
        <button 
          onClick={handleUpdateLocationData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Save Change
        </button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

export default AdminManageLocationDetail