import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'

/**
 * 简易翻页插件
 * @param page 当前页码
 * @param totalPage 是否有下一页
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationSimple = ({ page, totalPage }) => {
  const { locale } = useGlobal()
  const router = useRouter()
  const currentPage = +page
  const showNext = currentPage < totalPage
  const pagePrefix = router.asPath.replace(/\/page\/[1-9]\d*/, '').replace(/\/$/, '')

  return (
    <div className="my-10 flex justify-between font-medium text-black dark:text-gray-100 space-x-2">
      <Link
        href={{
          pathname:
            currentPage === 2
              ? `${pagePrefix}/`
              : `${pagePrefix}/page/${currentPage - 1}`,
          query: router.query.s ? { s: router.query.s } : {}
        }}
        passHref
        rel="prev"
        className={`${
          currentPage === 1 ? 'invisible' : 'block'
        } text-center w-full duration-200 px-4 py-2 hover:border-green-500 border-b-2 hover:font-bold`}>
        ←{locale.PAGINATION.PREV}

      </Link>
      <Link
        href={{
          pathname: `${pagePrefix}/page/${currentPage + 1}`,
          query: router.query.s ? { s: router.query.s } : {}
        }}
        passHref
        rel="next"
        className={`${
          +showNext ? 'block' : 'invisible'
        } text-center w-full duration-200 px-4 py-2 hover:border-green-500 border-b-2 hover:font-bold`}>

        {locale.PAGINATION.NEXT}→
      </Link>
    </div>
  )
}

export default PaginationSimple
