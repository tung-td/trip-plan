import React from 'react'

const EditField = (props) => {
  return (
    <>
    {
      props.title == "Image" ? (
        <>
        <div className='flex items-center justify-start mb-2 '>
          <p className=' font-semibold text-slate-700 text-sm mb-0 mr-10 w-20'>{props.title}:</p>
          <div className=' max-w-xs max-h-52 relative overflow-hidden'>
            <img src={props.content || ''} title='location-image' className=' w-full h-full object-cover'/>
             <input 
              type='file' 
              className=' absolute top-1 right-2'
            />
          </div>
        </div>
        <div className='w-full h-[1px] bg-slate-300 rounded-lg mb-3'></div>
        </>
      ):
      (
        props.title == "Tag" ? (
          <>
            <div>
            <div className='flex items-center justify-start mb-2 '>
              <p className=' font-semibold text-slate-700 text-sm mb-0 mr-10 w-20'>{props.title}:</p>
              {
                props.content.map((item) =>                  
                 ( 
                  <div class="flex items-center" key={item.id}>
                        <input 
                          id="default-checkbox" 
                          type="checkbox" value={item.name} 
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 mr-2">{item.name}</label>
                    </div>
                  ))
              }
            </div>
            <div className='w-full h-[1px] bg-slate-300 rounded-lg mb-3'></div>
          </div>
         </>
        )
        :
        (
          <>
            <div>
            <div className='flex items-center justify-start mb-2 '>
              <p className=' font-semibold text-slate-700 text-sm mb-0 mr-10 w-20'>{props.title}:</p>
              <input 
                type='text' 
                defaultValue={props.content || ''} // Ensure props.content is not undefined
                size={(props.content && props.content.length) || 1} // Ensure props.content.length is not undefined
                className='border border-slate-700 py-1 px-2 rounded-md w-auto'/>
              {
                props.update && (
                  <label className=' text-green-700 font-semibold text-sm ml-2'>Updated new value</label>
                )
              }
            </div>
            <div className='w-full h-[1px] bg-slate-300 rounded-lg mb-3'></div>
          </div>
       </>
        )
        
      )
        

    }
        
    </>

  )
}

export default EditField