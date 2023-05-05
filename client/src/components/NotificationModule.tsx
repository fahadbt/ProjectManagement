import React, { useEffect, useState } from 'react'
import { Divider } from 'antd'
import { IconContext } from 'react-icons'

const NotificationModule = ({ notificationData, height, icon, actionIcon, iconBackgroundColor, title, description }) => {

    const notificationfilteredData = notificationData.map((notification) => ({
        icon: notification.icon || icon,
        iconBackgroundColor: notification.iconBackgroundColor || iconBackgroundColor,
        title: notification.title || title,
        description: notification.description || description,
        actionIcon: notification.actionIcon || actionIcon,
    }))


    return (
        <>
            {
                notificationfilteredData.map((notification, index) => (

                    <div key={notification.title}>
                        <div className={` w-full rounded-3xl flex `} style={{ height: height || 80 }} >

                            <div className=' w-[30%] h-full flex justify-center items-center '>
                                <div className={` w-[70%] h-[60%] rounded-lg flex justify-center items-center `} style={{ backgroundColor: notification.iconBackgroundColor }}  >
                                    <IconContext.Provider value={{ color: 'white', size: '30' }}>
                                        <button key={notification.title}>
                                            {
                                                notification.icon
                                            }
                                        </button>
                                    </IconContext.Provider>
                                </div>
                            </div>
                            <div className=' w-[70%] h-full flex justify-center items-center pr-2'>
                                <div className='flex flex-col flex-1 '>
                                    <span className='font-josefin text-sm'>
                                        {notification.title}
                                    </span>
                                    <span className='font-semibold'>
                                        {notification.description}
                                    </span>
                                </div>
                                <div>
                                    <button>
                                        <IconContext.Provider value={{ color: 'black', size: '18' }}>
                                            {notification.actionIcon}
                                        </IconContext.Provider>
                                    </button>
                                </div>
                            </div>

                        </div >

                        {
                            index != notificationfilteredData.length - 1 ?
                                <div className='h-[10px] px-4 flex justify-center items-center '>
                                    <Divider />
                                </div>
                                :
                                null
                        }


                    </div>
                ))}
        </>

    )
}

export default NotificationModule