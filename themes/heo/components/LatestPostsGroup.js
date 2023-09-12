import BLOG from '@/blog.config'
import LazyImage from '@/components/LazyImage'
import Link from 'next/link'

/**
 * 最新文章列表
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
const LatestPostsGroup = ({ latestPosts, siteInfo }) => {
  // 获取当前路径

  if (!latestPosts) {
    return <></>
  }

  return <div className='grid grid-cols-2 gap-4'>
        {latestPosts.map(post => {
          const headerImage = post?.pageCoverThumbnail ? post.pageCoverThumbnail : siteInfo?.pageCover

          return (
            (<Link key={post.id} passHref
                    title={post.title}
                    href={`${BLOG.SUB_PATH}/${post.slug}`}

                    className={'my-3 flex flex-col w-full'}>

                    <div className="w-full h-24 md:h-60 overflow-hidden relative rounded-lg mb-2">
                        <LazyImage src={`${headerImage}`} className='object-cover w-full h-full' />
                    </div>

                    <div
                        className={
                            ' font-bold  overflow-x-hidden hover:text-indigo-600 px-2 duration-200 w-full rounded ' +
                            ' hover:text-indigo-400 cursor-pointer'
                        }
                    >

                        <div className='line-clamp-2 menu-link'>{post.title}</div>

                    </div>

                </Link>)
          )
        })}
    </div>
}
export default LatestPostsGroup
