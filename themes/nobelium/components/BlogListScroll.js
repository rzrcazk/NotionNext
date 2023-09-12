import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import React from 'react'
import throttle from 'lodash.throttle'
import { deepClone } from '@/lib/utils'

export const BlogListScroll = props => {
  const { posts } = props
  const { locale } = useGlobal()

  const [page, updatePage] = React.useState(1)

  let hasMore = false
  const postsToShow = posts && Array.isArray(posts)
    ? deepClone(posts).slice(0, BLOG.POSTS_PER_PAGE * page)
    : []

  if (posts) {
    const totalCount = posts.length
    hasMore = page * BLOG.POSTS_PER_PAGE < totalCount
  }
  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  const targetRef = React.useRef(null)

  // 监听滚动自动分页加载
  const scrollTrigger = React.useCallback(throttle(() => {
    const scrollS = window.scrollY + window.outerHeight
    const clientHeight = targetRef ? (targetRef.current ? (targetRef.current.clientHeight) : 0) : 0
    if (scrollS > clientHeight + 100) {
      handleGetMore()
    }
  }, 500))

  React.useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)

    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  return (
      <div id="posts-wrapper" className="w-full md:pr-12 mb-12" ref={targetRef}>
              {postsToShow.map(p => (
                  <article key={p.id} className="mb-12" >
                      <h2 className="mb-4">
                          <Link
                              href={`/${p.slug}`}
                              className="text-black text-xl md:text-2xl no-underline hover:underline">
                                {p.title}
                          </Link>
                      </h2>

                      <div className="mb-4 text-sm text-gray-700">
                          by <a href="#" className="text-gray-700">{BLOG.AUTHOR}</a> on {p.date?.start_date || p.createdTime}
                          <span className="font-bold mx-1"> | </span>
                          <a href="#" className="text-gray-700">{p.category}</a>
                          <span className="font-bold mx-1"> | </span>
                          {/* <a href="#" className="text-gray-700">2 Comments</a> */}
                      </div>

                      <p className="text-gray-700 leading-normal">
                          {p.summary}
                      </p>
                  </article>
              ))}

              <div
                  onClick={handleGetMore}
                  className="w-full my-4 py-4 text-center cursor-pointer "
              >
                  {' '}
                  {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE} 😰`}{' '}
              </div>

          </div>
  )
}
