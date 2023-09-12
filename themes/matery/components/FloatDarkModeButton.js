import { useGlobal } from '@/lib/global'
import { saveDarkModeToCookies } from '@/themes/theme'
import CONFIG from '../config'

export default function FloatDarkModeButton() {
  const { isDarkMode, updateDarkMode } = useGlobal()

  if (!CONFIG.WIDGET_DARK_MODE) {
    return <></>
  }

  // 用户手动设置主题
  const handleChangeDarkMode = () => {
    const newStatus = !isDarkMode
    saveDarkModeToCookies(newStatus)
    updateDarkMode(newStatus)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(newStatus ? 'light' : 'dark')
    htmlElement.classList?.add(newStatus ? 'dark' : 'light')
  }

  return (
        <div className={'justify-center items-center text-center' } onClick={handleChangeDarkMode}>
            <i id="darkModeButton" className={`${isDarkMode ? 'fa-sun' : 'fa-moon'} fas transform hover:scale-105 duration-200
                 text-white bg-indigo-700  w-10 h-10  py-2.5 rounded-full dark:bg-black cursor-pointer`} />
        </div>
  )
}
