
/**
 * 空白博客 列表
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostListEmpty = ({ currentSearch }) => {
  return <div className='flex w-full items-center justify-center min-h-screen mx-auto md:-mt-20'>
        <p className='text-gray-500 dark:text-gray-300'>没有找到文章 {(currentSearch && <div>{currentSearch}</div>)}</p>
  </div>
}
export default NavPostListEmpty
