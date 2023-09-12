import BLOG from '@/blog.config'
import LazyImage from '@/components/LazyImage'
import { useGitBookGlobal } from '@/themes/gitbook'
import Link from 'next/link'

/**
 * Logo区域
 * @param {*} props
 * @returns
 */
export default function LogoBar(props) {
  const { siteInfo } = props
  const { pageNavVisible, changePageNavVisible } = useGitBookGlobal()

  const togglePageNavVisible = () => {
    changePageNavVisible(!pageNavVisible)
  }
  return (
        <div id='top-wrapper' className='w-full flex items-center'>
            <div onClick={togglePageNavVisible} className='cursor-pointer md:hidden text-xl pr-3 hover:scale-110 duration-150'>
                <i className={`fa-solid ${pageNavVisible ? 'fa-align-justify' : 'fa-indent'}`}></i>
            </div>
            <Link href='/' className='flex text-md md:text-xl dark:text-gray-200'>
                <LazyImage src={siteInfo?.icon} width={24} height={24} alt={BLOG.AUTHOR} className='mr-2 hidden md:block' />
                {siteInfo?.title}
            </Link>
        </div>
  )
}
