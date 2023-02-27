import {FC} from 'react';
import { ninja } from './../../../assets/header';
import { Link, useLocation } from 'react-router-dom';



type SideBarProps = {
    open: boolean,
    setOpen: (value: React.SetStateAction<boolean>) => void,
    handleLogout: () => void,
    userFullName: string | undefined,
}



const SideBar:FC<SideBarProps> = ({open, setOpen, userFullName, handleLogout}) => {
    const { pathname } = useLocation();

  return (
    <aside
    className={`fixed top-0 z-[50] ${open ? '' : 'ml-[-100%]'} flex h-screen origin-left duration-300 ${open ? 'w-4/6 scale-x-1' : 'w-0 transform lg:transform-none scale-x-0'}  flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]`}
  >
    <div className='relative'>
      {/*mobile hamburger*/}
      <button className="absolute -mr-2 h-16 w-12 lg:hidden text-navy" onClick={() => setOpen(!open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className="mt-8 text-center">
        <img
          src={ninja}
          alt="user"
          className="m-auto h-10 w-10 rounded-full object-cover lg:h-20 lg:w-20"
        />
        <h5 className="mt-4 md:text-xl text-lg font-semibold text-gray-600 block">{userFullName}</h5>
        <span className="text-gray-400 block md:text-sm text-xs">User</span>
      </div>

      <ul className="mt-8 space-y-2 tracking-wide">
        <li>
          <Link
            to='/dashboard-home'
            aria-label="dashboard"
            onClick={() => setOpen(false)}
            className={`relative group flex items-center space-x-4 rounded-xl px-4 py-3 text-white ${pathname.includes('/dashboard-home') ? 'bg-navy' : 'text-gray-600'}`}
          >
            <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                className={`fill-current text-gray-600 group-hover:text-teal ${pathname.includes('/dashboard-home') ? 'text-[#26a8a1]' : 'text-gray-600'}`}
              ></path>
              <path
                d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                className={`fill-current text-gray-600 group-hover:text-teal  ${pathname.includes('/dashboard-home') ? 'text-teal' : 'text-gray-600'}`}
              ></path>
              <path
                d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                className={`fill-current text-gray-300 group-hover:text-[#98cfcc] ${pathname.includes('/dashboard-home') ? 'text-[#98cfcc]' : 'text-gray-300'}`}
              ></path>
            </svg>
            <span className="-mr-1 font-medium text-sm leading-relaxed">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to='/dashboard/quizzes'
            onClick={() => setOpen(false)}
            className={`relative group flex items-center space-x-4 rounded-xl px-4 py-3 ${pathname.includes('/dashboard/quizzes') ? 'bg-navy text-white' : 'text-gray-600'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className={`fill-current text-gray-300 group-hover:text-[#98cfcc] ${pathname.includes('/dashboard/quizzes') ? 'text-[#98cfcc]' : 'text-gray-300'}`}
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                clipRule="evenodd"
              />
              <path
                className={`fill-current text-gray-600 group-hover:text-teal ${pathname.includes('/dashboard/quizzes') ? 'text-[#26a8a1]' : 'text-gray-600'}`}
                d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
              />
            </svg>
            <span className={`text-sm leading-relaxed font-medium`}>Games</span>
          </Link>
        </li>
        <li>
          <Link
            to='/dashboard/quiz-history'
            onClick={() => setOpen(false)}
            className={`relative group flex items-center space-x-4 rounded-xl px-4 py-3 ${pathname.includes('/dashboard/quiz-history') ? 'bg-navy text-white' : 'text-gray-600'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className={`fill-current text-gray-600 group-hover:text-teal ${pathname.includes('/dashboard/quiz-history') ? 'text-[#26a8a1]' : 'text-gray-600'}`}
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clipRule="evenodd"
              />
              <path
                className={`fill-current text-gray-300 group-hover:text-[#98cfcc] ${pathname.includes('/dashboard/quiz-history') ? 'text-[#98cfcc]' : 'text-gray-300'}`}
                d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
              />
            </svg>
            <span className={`text-sm leading-relaxed font-medium`}>Game History</span>
          </Link>
        </li>
        <li>
          <Link
            to='/dashboard/wiizzkid-metaverse'
            onClick={() => setOpen(false)}
            className={`relative group flex items-center space-x-4 rounded-xl px-4 py-3 ${pathname.includes('/dashboard/wiizzkid-metaverse') ? 'bg-navy text-white' : 'text-gray-600'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className={`fill-current text-gray-600 group-hover:text-teal ${pathname.includes('/dashboard/wiizzkid-metaverse') ? 'text-[#26a8a1]' : 'text-gray-600'}`}
                d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
              />
              <path
                className={`fill-current text-gray-300 group-hover:text-[#98cfcc] ${pathname.includes('/dashboard/wiizzkid-metaverse') ? 'text-[#98cfcc]' : 'text-gray-300'}`}
                d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
              />
            </svg>
            <span className={`text-sm leading-relaxed font-medium`}>Wiizzkid Metaverse</span>
          </Link>
        </li>
        <li>
          <Link
            to='/dashboard/buy-token'
            onClick={() => setOpen(false)}
            className={`relative group flex items-center space-x-4 rounded-xl px-4 py-3 ${pathname.includes('/dashboard/buy-token') ? 'bg-navy text-white' : 'text-gray-600'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                className={`fill-current text-gray-300 group-hover:text-[#98cfcc] ${pathname.includes('/dashboard/buy-token') ? 'text-[#98cfcc]' : 'text-gray-300'}`}
                d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
              />
              <path
                className={`fill-current text-gray-600 group-hover:text-teal ${pathname.includes('/dashboard/buy-token') ? 'text-[#26a8a1]' : 'text-gray-600'}`}
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm leading-relaxed font-medium " onClick={() => setOpen(false)}>Buy Stone</span>
          </Link>
        </li>

        <li>
          <Link
            to='/dashboard/exchange'
            onClick={() => setOpen(false)}
            className={`relative group flex items-center space-x-4 rounded-xl px-4 py-3 ${pathname.includes('/dashboard/exchange') ? 'bg-navy text-white' : 'text-gray-600'}`}
          >
            <svg
             xmlns="http://www.w3.org/2000/svg"
             className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
             >
              <g fill="#252641">
                <path 
                    className={`fill-current text-gray-300 group-hover:text-[#98cfcc] ${pathname.includes('/dashboard/exchange') ? 'text-[#98cfcc]' : 'text-gray-300'}`}
                  d="m7.81 2h8.37c3.65 0 5.82 2.17 5.82 5.81v8.37c0 3.64-2.17 5.81-5.81 5.81h-8.38c-3.64.01-5.81-2.16-5.81-5.8v-8.38c0-3.64 2.17-5.81 5.81-5.81z"/>
                <path 
                   className={`fill-current text-gray-600 group-hover:text-teal ${pathname.includes('/dashboard/exchange') ? 'text-[#26a8a1]' : 'text-gray-600'}`}
                  d="m17.69 13.4798c-.08-.18-.22-.33-.41-.41-.09-.04-.19-.06-.29-.06h-9.99c-.41 0-.75.34-.75.75s.34.75.75.75h8.19l-1.67 1.67c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l2.95-2.95c.07-.07.12-.15.16-.24.08-.19.08-.39 0-.57z"/>
                <path 
                   className={`fill-current text-gray-600 group-hover:text-teal ${pathname.includes('/dashboard/exchange') ? 'text-[#26a8a1]' : 'text-gray-600'}`}
                  d="m6.31 10.52c.08.18.22.33.41.41.09.04.18.06.28.06h10c.41 0 .75-.34.75-.75 0-.41002-.34-.75002-.75-.75002h-8.19l1.67-1.67c.29-.29.29-.77 0-1.06s-.77-.29-1.06 0l-2.95 2.95c-.07.07-.12.15-.16.24-.08.19002-.08.39002 0 .57002z"/>
              </g>
            </svg>
            <span className="text-sm leading-relaxed font-medium " onClick={() => setOpen(false)}>Exchange</span>
          </Link>
        </li>

        <li>
          <Link
            to='/'
            className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
          >
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" 
                className="h-5 w-5"
                viewBox="0 0 24 24" >
                    <path
                        d="m5 14.0585c0-1.0091 0-1.5137.22166-1.9444.22167-.4308.63224-.724 1.45339-1.3106l4.16245-2.97316c.5614-.40096.842-.60144 1.1625-.60144s.6011.20048 1.1625.60144l4.1625 2.97316c.8211.5866 1.2317.8798 1.4533 1.3106.2217.4307.2217.9353.2217 1.9444v4.9415c0 .9428 0 1.4142-.2929 1.7071s-.7643.2929-1.7071.2929h-10c-.94281 0-1.41421 0-1.70711-.2929-.29289-.2929-.29289-.7643-.29289-1.7071z" 
                        className='fill-current text-gray-300 group-hover:text-[#98cfcc]'
                    />
                    <g className='fill-current text-gray-600 group-hover:text-teal'>
                        <path d="m3 12.3866c0 .2669 0 .4003.0841.4415.08409.0411.18942-.0408.40008-.2047l7.28792-5.66838c.5899-.45877.8848-.68816 1.2279-.68816s.638.22939 1.2279.68816l7.2879 5.66838c.2107.1639.316.2458.4001.2047.0841-.0412.0841-.1746.0841-.4415v-.4084c0-.4804 0-.7206-.1017-.9285s-.2913-.3553-.6704-.6502l-7-5.44448c-.5899-.45877-.8848-.68816-1.2279-.68816s-.638.22939-1.2279.68816l-6.99998 5.44448c-.37917.2949-.56875.4423-.67044.6502-.10168.2079-.10168.4481-.10168.9285z"/>
                        <path d="m12.5 15h-1c-1.1046 0-2 .8954-2 2v3.85c0 .0828.06716.15.15.15h4.7c.0828 0 .15-.0672.15-.15v-3.85c0-1.1046-.8954-2-2-2z"/><rect height="4" rx=".5" width="2" x="16" y="5"/>
                    </g>
                </svg>
            <span className="group-hover:text-navy text-sm leading-relaxed font-medium ">Home</span>
          </Link>
        </li>
      </ul>
    </div>

    <div className="-mx-6 flex items-center justify-between border-t px-6 pt-4">
      <button className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600" onClick={handleLogout}>
        <svg 
            fill="currentColor" 
            className="h-5 w-5"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                d="m6.70595 4.69844c-1.79894.21351-3.12126 1.50989-3.38007 3.30286-.38834 2.6904-.83369 7.6493-.83369 16.2438 0 7.7675.20209 12.5654.40025 15.4029.15694 2.2474 1.75885 3.9689 4.00032 4.1947 2.09609.2111 5.20724.4024 9.59944.4024s7.5033-.1913 9.5994-.4024c2.2415-.2258 3.8434-1.9473 4.0003-4.1947.1982-2.8375.4003-7.6354.4003-15.4029s-.2021-12.5654-.4003-15.40291c-.1569-2.24734-1.7588-3.96886-4.0003-4.19464-2.0961-.21113-5.2072-.40243-9.5994-.40243-4.7431 0-7.84643.22309-9.78625.45332z" 
                className='fill-current text-gray-300 group-hover:text-[#98cfcc]'
            />
            <path d="m37.8963 33.3948c-1.5092 1.2701-3.3735.4385-3.4835-1.5381-.0609-1.0945-.1141-2.4749-.146-4.2047-8.5544-.0865-15.2156-.2878-18.3328-.3961-1.0851-.0377-1.934-.9343-1.934-2.0269v-2.2444c0-1.0762.8242-1.9647 1.8922-2.0205 3.0992-.1619 9.7816-.4659 18.3742-.5963.0318-1.7388.0852-3.1255.1463-4.2241.11-1.977 1.9749-2.8087 3.4844-1.5383.8995.757 2.0084 1.7393 3.3435 3.0025 2.238 2.1175 3.5227 3.709 4.2488 4.7743.6809.9988.6808 2.2359-.0001 3.2347-.7262 1.0652-2.0109 2.6566-4.2487 4.7743-1.3355 1.2638-2.4447 2.2465-3.3443 3.0036z" 
                className='fill-current text-gray-600 group-hover:text-teal'
            />
        </svg>
        <span className="group-hover:text-navy text-sm">Logout</span>
      </button>
    </div>
  </aside>
  )
}

export default SideBar