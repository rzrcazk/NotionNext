import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 最新文章列表
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
const LatestPostsGroup = ({ latestPosts }) => {
  // 获取当前路径
  const currentPath = useRouter().asPath
  const { locale } = useGlobal()

  if (!latestPosts) {
    return <></>
  }

  return <>
    <div className="text-sm pb-1 px-2 flex flex-nowrap justify-between">
      <div className="font-light text-gray-600  dark:text-gray-200">
        <i className="mr-2 fas fa-history" />
        {locale.COMMON.LATEST_POSTS}
      </div>
    </div>
    {latestPosts.map(post => {
      const selected = currentPath === `${BLOG.SUB_PATH}/${post.slug}`
      return (
        (<Link
          key={post.id}
          title={post.title}
          href={`${BLOG.SUB_PATH}/${post.slug}`}
          passHref
          className={'my-1 flex font-light'}>

          <div
            className={
              (selected
                ? 'text-white  bg-gray-600 '
                : 'text-gray-500 dark:text-gray-400 ') +
              ' text-xs py-1.5 flex hover:bg-gray-500 px-2 duration-200 w-full ' +
              'hover:text-white dark:hover:text-white cursor-pointer'
            }
          >
            <li className="line-clamp-2">{post.title}</li>
          </div>

        </Link>)
      )
    })}
  </>
}
export default LatestPostsGroup
