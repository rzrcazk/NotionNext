import Link from 'next/link'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  return (
    <li
      onMouseOver={() => {
        changeShow(true)
      }}
      onMouseOut={() => changeShow(false)}
      className='relative py-1 mb-1.5 duration-500 justify-between text-gray-500 dark:text-gray-300 hover:text-black hover:underline cursor-pointer flex flex-nowrap items-center '>
      {!hasSubMenu && (
        <Link
          href={link?.href}
          target={link?.target}
          className='w-full my-auto items-center justify-between flex '>
          <div>
            <div className={`${link.icon} text-center w-4 mr-2`} />
            {link.name}
          </div>
          {link.slot}
        </Link>
      )}

      {hasSubMenu && (
        <div className='w-full my-auto items-center justify-between flex '>
          <div>
            <div className={`${link.icon} text-center w-4 mr-2`} />
            {link.name}
          </div>
          {link.slot}
          {hasSubMenu && (
            <div className='text-right'>
              <i
                className={`px-2 fas fa-chevron-left duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
            </div>
          )}
        </div>
      )}

      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          className={`${show ? 'visible opacity-100 left-72' : 'invisible opacity-0 left-80'} z-20 p-2 absolute right-0 top-0 w-full border-gray-100  bg-white  dark:bg-black dark:border-gray-800 transition-all duration-300 drop-shadow-lg `}>
          {link?.subMenus?.map((sLink, index) => {
            return (
              <li key={index}>
                <Link
                  href={sLink.href}
                  target={link?.target}
                  className='my-auto py-1 px-2 items-center justify-start flex text-gray-500 dark:text-gray-300 hover:text-black  hover:bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200 dark:border-gray-800 '>
                  {sLink.icon && (
                    <i className={`${sLink.icon} w-4 text-center `} />
                  )}
                  <div className={'ml-2 whitespace-nowrap'}>{sLink.name}</div>
                  {sLink.slot}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}
