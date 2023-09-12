import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import CONFIG from '../config'

export default function ArticleCopyright ({ author, url }) {
  const { locale } = useGlobal()
  if (!CONFIG.ARTICLE_COPYRIGHT) {
    return <></>
  }
  return (
    <section className="dark:text-gray-300 mt-6">
      <ul className="overflow-x-auto whitespace-nowrap text-sm dark:bg-gray-700 bg-gray-100 p-5 leading-8 border-l-2 border-blue-500">
        <li>
          <strong className='mr-2'>{locale.COMMON.AUTHOR}:</strong>
          <Link href={'/about'} className="hover:underline">
            {author}
          </Link>
        </li>
        <li>
        <strong className='mr-2'>{locale.COMMON.URL}:</strong>
          <a className="hover:underline" href={url}>
            {url}
          </a>
        </li>
        <li>
          <strong className='mr-2'>{locale.COMMON.COPYRIGHT}:</strong>
          {locale.COMMON.COPYRIGHT_NOTICE}
        </li>
      </ul>
    </section>
  )
}
