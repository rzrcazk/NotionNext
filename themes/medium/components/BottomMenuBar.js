import Link from 'next/link'
import React from 'react'
import { useMediumGlobal } from '@/themes/medium'
import JumpToTopButton from './JumpToTopButton'

export default function BottomMenuBar ({ post, className }) {
  const { tocVisible, changeTocVisible } = useMediumGlobal()
  const showTocBotton = post?.toc?.length > 0

  const toggleToc = () => {
    changeTocVisible(!tocVisible)
  }

  return (
    <div className={'sticky z-10 bottom-0 w-full h-12 bg-white dark:bg-hexo-black-gray ' + className}>
      <div className='flex justify-between h-full shadow-card'>
        <Link href='/search' passHref legacyBehavior>
          <div className='flex w-full items-center justify-center cursor-pointer'>
            <i className='fas fa-search'/>
          </div>
        </Link>
        <div className='flex w-full items-center justify-center cursor-pointer'>
          <JumpToTopButton/>
        </div>
        {showTocBotton && <div onClick={toggleToc} className='flex w-full items-center justify-center cursor-pointer'>
          <i className='fas fa-list-ol ' />
        </div>}
        { !showTocBotton && <Link href='/' passHref legacyBehavior>
          <div className='flex w-full items-center justify-center cursor-pointer'>
            <i className='fas fa-home' />
          </div>
        </Link>}
      </div>
    </div>
  )
}
