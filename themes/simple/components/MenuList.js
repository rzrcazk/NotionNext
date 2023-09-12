import BLOG from '@/blog.config'
import Collapse from '@/components/Collapse'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 菜单导航
 * @param {*} props
 * @returns
 */
export const MenuList = ({ customNav, customMenu }) => {
  const { locale } = useGlobal()
  const [isOpen, changeIsOpen] = useState(false)
  const toggleIsOpen = () => {
    changeIsOpen(!isOpen)
  }
  const closeMenu = (e) => {
    changeIsOpen(false)
  }
  const router = useRouter()
  const collapseRef = useRef(null)

  useEffect(() => {
    router.events.on('routeChangeStart', closeMenu)
  })

  let links = [
    { icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: CONFIG.MENU_SEARCH },
    { icon: 'fas fa-archive', name: locale.NAV.ARCHIVE, to: '/archive', show: CONFIG.MENU_ARCHIVE },
    { icon: 'fas fa-folder', name: locale.COMMON.CATEGORY, to: '/category', show: CONFIG.MENU_CATEGORY },
    { icon: 'fas fa-tag', name: locale.COMMON.TAGS, to: '/tag', show: CONFIG.MENU_TAG }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (BLOG.CUSTOM_MENU) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (<>
        {/* 大屏模式菜单 */}
        <div id='nav-menu-pc' className='hidden md:flex my-auto'>
            {links?.map(link => <MenuItemDrop key={link?.id} link={link} />)}
        </div>
        {/* 移动端小屏菜单 */}
        <div id='nav-menu-mobile' className='flex md:hidden my-auto justify-start'>
            <div onClick={toggleIsOpen} className='cursor-pointer hover:text-red-400 transition-all duration-200'>
                <i className={`${isOpen && 'rotate-90'} transition-all duration-200 fa fa-bars mr-3`} />
                <span>{!isOpen ? 'MENU' : 'CLOSE'}</span>
            </div>

            <Collapse collapseRef={collapseRef} className='absolute w-full top-12 left-0' isOpen={isOpen}>
                <div id='menu-wrap' className='bg-white dark:border-hexo-black-gray border'>
                {links?.map(link => <MenuItemCollapse key={link?.id} link={link} onHeightChange={(param) => collapseRef.current?.updateCollapseHeight(param)}/>)}
                </div>
            </Collapse>
        </div>
    </>

  )
}
