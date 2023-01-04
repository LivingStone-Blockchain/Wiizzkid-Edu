import React, {FC} from 'react'

type CTAPropType = {
    message: string,
    name: string
}


const CTA:FC<CTAPropType> = ({message, name}) => {

  const greet = () => {
    let hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      return 'Good Morning';
    }
    else if (hour >= 12 && hour <= 16) {
      return 'Good Afternoon'
    }
    else {
      return 'Good Evening'
    }
  }


  return ( 
        <div data-aos="fade-up" data-aos-delay="200" className="relative w-full p-4 mb-8 md:text-base text-sm font-semibold text-white bg-navy rounded-xl focus:outline-none border border-gray-300 overflow-hidden">
    
          {/* Background illustration */}
          <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
            <svg width="319" height="198" xmlnsXlink="https://www.w3.org/1999/xlink">
              <defs>
                <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
                <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
                <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                  <stop stopColor="#555" offset="0%" />
                  <stop stopColor="#555" offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                  <stop stopColor="#37b9b2" offset="0%" />
                  <stop stopColor="#ff3939" stopOpacity="0" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <g transform="rotate(64 36.592 105.604)">
                  <mask id="welcome-d" fill="#fff">
                    <use xlinkHref="#welcome-a" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
                  <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
                </g>
                <g transform="rotate(-51 91.324 -105.372)">
                  <mask id="welcome-f" fill="#fff">
                    <use xlinkHref="#welcome-e" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                  <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
                </g>
                <g transform="rotate(44 61.546 392.623)">
                  <mask id="welcome-h" fill="#fff">
                    <use xlinkHref="#welcome-g" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                  <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
                </g>
              </g>
            </svg>
          </div>
    
          <div className="relative">
            <h1 className="md:text-3xl text-2xl font-semibold text-white mb-1">{greet()}, {name}! <span role="img" aria-label="Panda">👋</span></h1>
            <p className='text-sm leading-relaxed text-gray-300 font-medium'>{message}</p>
          </div>
    
        </div>
  )
}

export default CTA;
