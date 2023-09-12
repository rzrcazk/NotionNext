import BLOG from '@/blog.config'

function SiteInfo ({ title }) {
  const d = new Date()
  const currentYear = d.getFullYear()
  const copyrightDate = (function() {
    if (Number.isInteger(BLOG.SINCE) && BLOG.SINCE < currentYear) {
      return BLOG.SINCE + '-' + currentYear
    }
    return currentYear
  })()

  return (
        <footer
            className='relative leading-6 justify-start w-full text-gray-600 dark:text-gray-300 text-xs font-sans'
        >
            <span> © {`${copyrightDate}`} <span> <a href={BLOG.LINK}> <i className='mx-1 animate-pulse fas fa-heart'/> {BLOG.AUTHOR}</a>. <br /></span>

            {BLOG.BEI_AN && <><i className='fas fa-shield-alt' /> <a href='https://beian.miit.gov.cn/' className='mr-2'>{BLOG.BEI_AN}</a><br/></>}

            <span className='hidden busuanzi_container_site_pv'> <i className='fas fa-eye' /><span className='px-1 busuanzi_value_site_pv'> </span>  </span>
            <span className='pl-2 hidden busuanzi_container_site_uv'> <i className='fas fa-users' /> <span className='px-1 busuanzi_value_site_uv'> </span> </span>
            <br />
            <span className='text-xs font-serif'> Powered by <a href='https://github.com/tangly1024/NotionNext' className='underline'>NotionNext {BLOG.VERSION}</a></span><br /></span>
            <h1>{title}</h1>
        </footer>
  )
}
export default SiteInfo
