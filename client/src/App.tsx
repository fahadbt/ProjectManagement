/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Routes, Route } from 'react-router-dom'
//AppComponents
import { Navbar, UnSupportedScreen, LoggingLoading } from './components'
import { Home, LoginPage, Messages, Profile, Settings, Tasks } from './Pages'
import { ThemeContextProvider, UserDataContextProvider, NavbarContextProvider, UserSettingsContextProvider } from './components/Contexts'
//OtherComponents
import { motion } from "framer-motion"
import axios from "axios"
import Cookies from 'js-cookie'
import { User } from "./components/interfaces"

function App() {

  const [userData, setUserData] = useState<User>()
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [expand, setExpand] = useState(false) // for SideBar 
  const [loading, setLoading] = useState(false) // well Loading used mostly while fetching Data
  const [width, setWidth] = useState(window.innerWidth) // debugging
  //const [guestLoggedIn, setGuestLoggedIn] = useState(true) // for guests
  const [userSettings, setUserSettings] = useState({
    theme: 'light',
    toolTipisVisible: false
  })

  const menuTransitionDuration = 0
  // get's width. debugging
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const session = Cookies.get('session') // get's token from session cookie 

  //fetches userData by id from session token
  const fetchUser = async () => {
    setLoading(true)
    if (session) {
      try {
        const response = await axios.post(`/server/api/getUserData`, { token: session })
        if (response.data != 'invalid token') {
          setUserData(response.data)
        } else {
          Cookies.set('session', '')
          setLoading(false)
          console.error('Invalid Session Cookie')
        }
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false)
  }


  // runs the fetchUser function when userLoggedIn or session changes
  useEffect(() => {
    if (session) {
      fetchUser()
    }
  }, [userLoggedIn, session])


  // well logouts the user
  const handleLogout = async () => {
    Cookies.remove('session')
    setUserData(undefined)
    setUserLoggedIn(false)
  }

  const handleThemeChange = () => {
    if (userSettings.theme === 'dark') {
      return setUserSettings({ ...userSettings, theme: 'light' })
    }
    setUserSettings({ ...userSettings, theme: 'dark' })
  }

  const handleNavbarExpansion = () => {
    setExpand(prevExpand => !prevExpand)
  }

  return (
    <>

      <div className={` h-[100vh] ${userSettings.theme === 'dark' ? 'bg-[#4c5e81]' : 'bg-[#f2f6fe]'} `}>

        {
          loading ?
            <LoggingLoading reference={'main'} setLoading={undefined} />
            :
            !userData ?
              <LoginPage setUserLoggedIn={setUserLoggedIn} />
              : width <= 720 ? // app wouldn't look good on mobile
                <UnSupportedScreen />
                :
                //MainApp
                <motion.div className="w-full h-full flex">
                  <Navbar expand={expand} handleLogout={handleLogout} menuTransitionDuration={menuTransitionDuration} />
                  <motion.div animate={{ width: '100%', marginLeft: expand ? 200 : 100 }} transition={{ duration: menuTransitionDuration || 0.5, ease: "easeInOut" }} >
                    <ThemeContextProvider theme={userSettings.theme} toggleTheme={handleThemeChange}>
                      <UserDataContextProvider userData={userData}>
                        <UserSettingsContextProvider theme={userSettings.theme} toolTipisVisible={userSettings.toolTipisVisible}>
                          <NavbarContextProvider expand={expand} toggleExpand={handleNavbarExpansion}>
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/messages" element={<Messages />} />
                              <Route path="/tasks" element={<Tasks />} />
                              <Route path="/settings" element={<Settings />} />
                            </Routes>
                          </NavbarContextProvider>
                        </UserSettingsContextProvider>
                      </UserDataContextProvider>
                    </ThemeContextProvider>
                  </motion.div>
                </motion.div>
        }
      </div>

    </>
  )
}

export default App