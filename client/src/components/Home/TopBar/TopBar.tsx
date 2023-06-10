/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { DatePicker } from 'antd'
import { IconContext } from 'react-icons'
import { CiSun, CiDark, CiCalendar } from 'react-icons/ci'
import { RxDividerVertical } from 'react-icons/rx'
import UseAnimations from 'react-useanimations'
import menu4 from 'react-useanimations/lib/menu4'
import notification2 from 'react-useanimations/lib/notification2'
import { NavbarContext, ThemeContext, UserDataContext, UserSettingsContext } from '../../Contexts'
import { themeColors } from '../../functions'
import { Tooltip } from 'react-tooltip'
import SearchBar from './SearchBar'

const TopBar = (props: any) => {

    const [selectedDate, setSelectedDate] = useState(null);

    const { searchContent, setsearchContent, setFetchingData, setLoadNewData, setNoSearchedProjects, setSearchedProjectsData, notificationBar, setnotificationBar, notificationData } = props
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { expand, toggleExpand } = useContext(NavbarContext)
    const { toolTipisVisible } = useContext(UserSettingsContext)
    const userData = useContext(UserDataContext)
    const color = themeColors(theme, 'main')

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    return (
        <div className='h-[10%] flex flex-col justify-center items-center'>
            <div className='w-full h-[50%] items-center justify-between px-4 flex'>
                <IconContext.Provider value={{ color: color, size: '20' }}>
                    {/* LEFT */}
                    <div className='flex h-full items-center'>
                        {/* MENUBUTTON */}
                        <div className='flex items-center'>
                            <UseAnimations animation={menu4} size={25} reverse={expand} onClick={toggleExpand} strokeColor={color} className='cursor-pointer' data-tooltip-id='menuToolTip' />
                            {
                                toolTipisVisible &&
                                <Tooltip id='menuToolTip' delayShow={100} delayHide={0} place='top' float >
                                    Menu
                                </Tooltip>
                            }
                        </div>
                        {/* SEARCHBAR */}
                        <SearchBar searchContent={searchContent} setsearchContent={setsearchContent} setFetchingData={setFetchingData} setLoadNewData={setLoadNewData} setNoSearchedProjects={setNoSearchedProjects} setSearchedProjectsData={setSearchedProjectsData} />
                    </div>
                    {/* RIGHT */}
                    <div className={`h-full flex w-[20%] bg-green-500`}>
                        {/* OTHERS */}
                        <div className='flex justify-between items-center w-[40%]'>
                            <IconContext.Provider value={{ size: '25', color: color }}>
                                {/* THEME */}
                                <button onClick={toggleTheme} data-tooltip-id='themeIconToolTip' >
                                    {
                                        theme === 'dark' ?
                                            <CiSun />
                                            :
                                            <CiDark />
                                    }
                                </button>
                                {
                                    toolTipisVisible &&
                                    <Tooltip id='themeIconToolTip' delayShow={100} delayHide={0} place='top'>
                                        Theme
                                    </Tooltip>
                                }
                                {/* NOTIS */}
                                <button onClick={() => setnotificationBar(!notificationBar)} disabled={window.innerWidth >= 1060 ? false : true} className=' h-5 ' data-tooltip-id='notificationIconToolTip' >
                                    <UseAnimations animation={notification2} reverse={notificationBar} strokeColor={notificationData ? 'red' : color} />
                                </button>
                                {
                                    toolTipisVisible &&
                                    <Tooltip id='notificationIconToolTip' delayShow={100} delayHide={0} place='top'>
                                        Notification Bar
                                    </Tooltip>
                                }
                                {/* CALENDER */}
                                <div data-tooltip-id='calenderIconToolTip' >
                                    <DatePicker
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                        className=''
                                        style={{ backgroundColor: 'red', width: 40, cursor: 'pointer' }}
                                        allowClear={false}
                                        inputReadOnly={true}
                                        placeholder={''}
                                        bordered={false}
                                        suffixIcon={
                                            <IconContext.Provider value={{ color: color, size: '23' }}>
                                                <CiCalendar />
                                            </IconContext.Provider>
                                        }
                                    />
                                </div>
                                {
                                    toolTipisVisible &&
                                    <Tooltip id='calenderIconToolTip' delayShow={100} delayHide={0} place='top'>
                                        Calender
                                    </Tooltip>
                                }
                            </IconContext.Provider>
                        </div>
                        {/* SEPERATOR */}
                        <div className='py-2'>
                            <IconContext.Provider value={{ color: 'gray', size: '30' }}>
                                <RxDividerVertical />
                            </IconContext.Provider>
                        </div>
                        {/* PROFILE */}
                        <div className="w-[50%] flex justify-center items-center select-none" data-tooltip-id='profileToolTip' >
                            <Listbox value={userData?.userName}>
                                <div>
                                    <Listbox.Button className="flex justify-around relative w-full items-center cursor-default rounded-lg bg-transparent hover:shadow-md focus:outline-none">
                                        <div>
                                            <img src={userData?.userProfilePicture || 'src//assets/pfp.png'} className=" h-10 w-10 rounded-full" />
                                        </div>
                                        <div className="ml-2 text-xs flex" style={{ color: color }}> {userData.fullName || userData.userName} </div>
                                        <div className=''>
                                            <ChevronDownIcon
                                                className={`w-5`}
                                                style={{ color: color }}
                                            />
                                        </div>
                                    </Listbox.Button>
                                </div>
                            </Listbox>
                        </div>
                        {
                            toolTipisVisible &&
                            <Tooltip id='profileToolTip' delayShow={100} delayHide={0} place='top'>
                                Profile
                            </Tooltip>
                        }

                    </div>
                </IconContext.Provider>
            </div>
        </div>
    )
}

export default TopBar