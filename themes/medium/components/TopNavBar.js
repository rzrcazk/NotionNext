import LogoBar from './LogoBar'
import { useRef, useState } from 'react'
import Collapse from '@/components/Collapse'
import { MenuBarMobile } from './MenuBarMobile'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import BLOG from '@/blog.config'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 顶部导航栏 + 菜单
 * @param {} param0
 * @returns
 */
export default function TopNavBar(props) {
  const { className, customNav, customMenu } = props
  const [isOpen, changeShow] = useState(false)
  const collapseRef = useRef(null)

  const { locale } = useGlobal()

  const defaultLinks = [
    { icon: 'fas fa-th', name: locale.COMMON.CATEGORY, to: '/category', show: CONFIG.MENU_CATEGORY },
    { icon: 'fas fa-tag', name: locale.COMMON.TAGS, to: '/tag', show: CONFIG.MENU_TAG },
    { icon: 'fas fa-archive', name: locale.NAV.ARCHIVE, to: '/archive', show: CONFIG.MENU_ARCHIVE },
    { icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: CONFIG.MENU_SEARCH }
  ]

  let links = defaultLinks.concat(customNav)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (BLOG.CUSTOM_MENU) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
      <div id='top-nav' className={'sticky top-0 lg:relative w-full z-40 ' + className}>

            {/* 移动端折叠菜单 */}
            <Collapse type='vertical' collapseRef={collapseRef} isOpen={isOpen} className='md:hidden'>
                <div className='bg-white dark:bg-hexo-black-gray pt-1 py-2 lg:hidden '>
                    <MenuBarMobile {...props} onHeightChange={(param) => collapseRef.current?.updateCollapseHeight(param)} />
                </div>
            </Collapse>

            {/* 导航栏菜单 */}
            <div className='flex w-full h-12 shadow bg-white dark:bg-hexo-black-gray px-7 items-between'>

                {/* 左侧图标Logo */}
                <LogoBar {...props} />

                {/* 折叠按钮、仅移动端显示 */}
                <div className='mr-1 flex md:hidden justify-end items-center text-sm space-x-4 font-serif dark:text-gray-200'>
                    <div onClick={toggleMenuOpen} className='cursor-pointer'>
                        {isOpen ? <i className='fas fa-times' /> : <i className='fas fa-bars' />}
                    </div>
                </div>

                {/* 桌面端顶部菜单 */}
                <div className='hidden md:flex'>
                    {links && links?.map(link => <MenuItemDrop key={link?.id} link={link}/>)}
                </div>
            </div>
        </div>
  )
}
