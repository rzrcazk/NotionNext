import { compressImage } from '@/lib/notion/mapImage'
import Link from 'next/link'
import { usePlogGlobal } from '..'
import { isMobile } from '@/lib/utils'
import LazyImage from '@/components/LazyImage'

/**
 * 博客照片卡牌
 * @param {*} props
 * @returns
 */
const BlogPost = (props) => {
  const { post, index, siteInfo } = props
  const pageThumbnail = compressImage(post?.pageCoverThumbnail || siteInfo?.pageCover, 800, 80)
  const { setModalContent, setShowModal } = usePlogGlobal()
  const handleClick = () => {
    setShowModal(true)
    setModalContent(post)
  }

  // 实现动画 一个接一个出现
  let delay = index * 100
  if (isMobile()) {
    delay = 0
  }

  return (
        <article
            onClick={handleClick}
            data-aos-delay={`${delay}`}
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-once="true"
            data-aos-anchor-placement="top-bottom"
            key={post?.id} className='cursor-pointer relative'>

            <LazyImage src={pageThumbnail} className='aspect-[16/9] w-full h-full object-cover filter contrast-120' />

            <h2 className="text-md absolute left-0 bottom-0 m-4 text-gray-100 shadow-text">
                {post?.title}
            </h2>
            {post?.category && <div className='text-xs rounded-lg absolute left-0 top-0 m-4 px-2 py-1 bg-gray-200 dark:bg-black dark:bg-opacity-25 hover:bg-blue-700 hover:text-white duration-200'>
                <Link href={`/category/${post?.category}`}>
                {post?.category}
                </Link>
            </div>}

        </article>

  )
}

export default BlogPost
