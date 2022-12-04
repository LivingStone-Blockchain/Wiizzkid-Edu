import React, { useEffect, useState } from 'react';
import { Banner, Preloader, Share } from '../components';
import { bannerAd } from '../assets/blog';
import { Dotted, QuarterCircle } from '../shapes';
import blogData from '../data/blogData';
import { useParams, Link } from 'react-router-dom';


const BlogDetails = () => {
  const [isLoading ,setIsLoading] = useState<boolean>(true);
  let { id } = useParams();

  
//kill loader after 2sec
useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  setTimeout(() => {
  id && setIsLoading(false);
}, 3000)
}, [isLoading, id])




  return (
    <>
    {isLoading && (<Preloader homeLoader={true} />)}
    <Banner 
      title='Blogs'
    />
    <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20 container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
    <div className="container mx-auto">
         <div className="-mx-4 flex flex-wrap justify-center">
        <div className="w-full px-4">
        {blogData.filter((item) => item.id === id).map((data) => 
            <div
            className="wow fadeInUp relative z-20 mb-[60px] h-[300px] overflow-hidden rounded md:h-[400px] lg:h-[500px]"
            data-wow-delay=".1s"
            key={data.id}
          >
            <img
              src={data.blogImg}
              alt="blog photo"
              className="h-full w-full object-cover object-center"
            />
            <div
              className="absolute top-0 left-0 z-10 flex h-full w-full items-end bg-gradient-to-t from-[#090e34b3] to-transparent"
            >
              <div className="flex flex-wrap items-center p-4 pb-4 sm:p-8">
                <div className="mb-4 mr-5 flex items-center md:mr-10">
                  <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src={data.authorImg}
                      alt="author"
                      className="w-full"
                    />
                  </div>
                  <p className="md:text-base text-sm font-medium text-white">
                    By 
                    <a className="text-white hover:opacity-70 ml-1">
                      {data.author}
                    </a>
                  </p>
                </div>
                <div className="mb-4 flex items-center">
                  <p
                    className="mr-5 flex items-center text-sm font-medium text-white md:mr-8"
                  >
                    <span className="mr-3">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        className="fill-current"
                      >
                        <path
                          d="M3.8958 8.67529H3.10715C2.96376 8.67529 2.86816 8.77089 2.86816 8.91428V9.67904C2.86816 9.82243 2.96376 9.91802 3.10715 9.91802H3.8958C4.03919 9.91802 4.13479 9.82243 4.13479 9.67904V8.91428C4.13479 8.77089 4.03919 8.67529 3.8958 8.67529Z"
                        />
                        <path
                          d="M6.429 8.67529H5.64035C5.49696 8.67529 5.40137 8.77089 5.40137 8.91428V9.67904C5.40137 9.82243 5.49696 9.91802 5.64035 9.91802H6.429C6.57239 9.91802 6.66799 9.82243 6.66799 9.67904V8.91428C6.66799 8.77089 6.5485 8.67529 6.429 8.67529Z"
                        />
                        <path
                          d="M8.93779 8.67529H8.14914C8.00575 8.67529 7.91016 8.77089 7.91016 8.91428V9.67904C7.91016 9.82243 8.00575 9.91802 8.14914 9.91802H8.93779C9.08118 9.91802 9.17678 9.82243 9.17678 9.67904V8.91428C9.17678 8.77089 9.08118 8.67529 8.93779 8.67529Z"
                        />
                        <path
                          d="M11.472 8.67529H10.6833C10.5399 8.67529 10.4443 8.77089 10.4443 8.91428V9.67904C10.4443 9.82243 10.5399 9.91802 10.6833 9.91802H11.472C11.6154 9.91802 11.711 9.82243 11.711 9.67904V8.91428C11.711 8.77089 11.5915 8.67529 11.472 8.67529Z"
                        />
                        <path
                          d="M3.8958 11.1606H3.10715C2.96376 11.1606 2.86816 11.2562 2.86816 11.3996V12.1644C2.86816 12.3078 2.96376 12.4034 3.10715 12.4034H3.8958C4.03919 12.4034 4.13479 12.3078 4.13479 12.1644V11.3996C4.13479 11.2562 4.03919 11.1606 3.8958 11.1606Z"
                        />
                        <path
                          d="M6.429 11.1606H5.64035C5.49696 11.1606 5.40137 11.2562 5.40137 11.3996V12.1644C5.40137 12.3078 5.49696 12.4034 5.64035 12.4034H6.429C6.57239 12.4034 6.66799 12.3078 6.66799 12.1644V11.3996C6.66799 11.2562 6.5485 11.1606 6.429 11.1606Z"
                        />
                        <path
                          d="M8.93779 11.1606H8.14914C8.00575 11.1606 7.91016 11.2562 7.91016 11.3996V12.1644C7.91016 12.3078 8.00575 12.4034 8.14914 12.4034H8.93779C9.08118 12.4034 9.17678 12.3078 9.17678 12.1644V11.3996C9.17678 11.2562 9.08118 11.1606 8.93779 11.1606Z"
                        />
                        <path
                          d="M11.472 11.1606H10.6833C10.5399 11.1606 10.4443 11.2562 10.4443 11.3996V12.1644C10.4443 12.3078 10.5399 12.4034 10.6833 12.4034H11.472C11.6154 12.4034 11.711 12.3078 11.711 12.1644V11.3996C11.711 11.2562 11.5915 11.1606 11.472 11.1606Z"
                        />
                        <path
                          d="M13.2637 3.3697H7.64754V2.58105C8.19721 2.43765 8.62738 1.91189 8.62738 1.31442C8.62738 0.597464 8.02992 0 7.28906 0C6.54821 0 5.95074 0.597464 5.95074 1.31442C5.95074 1.91189 6.35702 2.41376 6.93058 2.58105V3.3697H1.31442C0.597464 3.3697 0 3.96716 0 4.68412V13.2637C0 13.9807 0.597464 14.5781 1.31442 14.5781H13.2637C13.9807 14.5781 14.5781 13.9807 14.5781 13.2637V4.68412C14.5781 3.96716 13.9807 3.3697 13.2637 3.3697ZM6.6677 1.31442C6.6677 0.979841 6.93058 0.716957 7.28906 0.716957C7.62364 0.716957 7.91042 0.979841 7.91042 1.31442C7.91042 1.649 7.64754 1.91189 7.28906 1.91189C6.95448 1.91189 6.6677 1.6251 6.6677 1.31442ZM1.31442 4.08665H13.2637C13.5983 4.08665 13.8612 4.34954 13.8612 4.68412V6.45261H0.716957V4.68412C0.716957 4.34954 0.979841 4.08665 1.31442 4.08665ZM13.2637 13.8612H1.31442C0.979841 13.8612 0.716957 13.5983 0.716957 13.2637V7.16957H13.8612V13.2637C13.8612 13.5983 13.5983 13.8612 13.2637 13.8612Z"
                        />
                      </svg>
                    </span>
                    {data.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4 lg:w-8/12">
          {blogData.filter((item) => item.id === id).map((data) =>  
                      <div  key={data.id}>
                        <h2
                          className="wow fadeInUp mb-6 text-2xl font-bold leading-snug text-[#252641] sm:leading-snug md:text-3xl md:leading-snug"
                          data-wow-delay=".1s
                          "
                        >
                          {data.title}
                        </h2>
                        <p
                          className="wow fadeInUp mb-8 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.content?.one}
                        </p>
                        <p
                          className="wow fadeInUp mb-10 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide  text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.content?.two}
                        </p>
                        <div
                          className="wow fadeInUp relative z-10 mb-10 overflow-hidden rounded bg-[#37b9b2] bg-opacity-5 py-8 px-6 text-center sm:p-10 md:px-[60px]"
                          data-wow-delay=".1s
                          "
                        >
                          <div className="mx-auto max-w-[530px]">
                            <span className="mb-6 flex justify-center text-[#37b9b2]">
                              <svg
                                width="44"
                                height="26"
                                viewBox="0 0 44 26"
                                className="fill-current"
                              >
                                <path
                                  d="M10.1101 0.00124908C5.46698 -0.0701833 1.25247 2.92998 0.252417 7.00162C-0.319041 9.50175 0.180985 12.0019 1.68106 14.002C3.25258 16.145 5.68128 17.5022 8.39571 17.8593L10.8958 24.0025C11.1816 24.6454 11.8245 25.074 12.5388 25.074C13.2531 25.074 13.896 24.6454 14.1817 24.0025C14.6103 22.931 15.1103 21.7881 15.6104 20.7166C16.8247 18.0022 18.0391 15.2163 18.9677 12.359C19.9677 9.35889 19.5392 6.14443 17.8248 3.71573C16.1104 1.35846 13.396 0.0726814 10.1101 0.00124908ZM16.6104 11.6447C15.6818 14.3592 14.4675 17.145 13.3245 19.788C13.1102 20.3595 12.8245 20.8595 12.6102 21.431L10.1815 15.5735L9.39576 15.5021C7.10992 15.3592 4.96695 14.2163 3.7526 12.5733C2.68112 11.1447 2.32396 9.35889 2.75255 7.64451C3.46687 4.71579 6.53846 2.57281 10.0386 2.57281H10.1101C12.5388 2.57281 14.5389 3.57287 15.8247 5.28724C17.039 7.00162 17.3247 9.43032 16.6104 11.6447Z"
                                />
                                <path
                                  d="M42.3267 3.78726C40.6124 1.35856 37.8979 0.00134277 34.612 0.00134277C34.5406 0.00134277 34.5406 0.00134277 34.4692 0.00134277C29.8975 0.00134277 25.7544 3.0015 24.7544 7.00171C24.1829 9.50185 24.6829 12.002 26.183 14.0735C27.7545 16.2165 30.1832 17.5737 32.8977 17.9309L35.3978 24.074C35.6835 24.7169 36.3264 25.1455 37.0407 25.1455C37.7551 25.1455 38.398 24.7169 38.6837 24.074C39.1123 23.0026 39.6123 21.8596 40.1123 20.7882C41.3267 18.0737 42.541 15.2879 43.4696 12.4306C44.4697 9.50184 44.0411 6.21596 42.3267 3.78726ZM41.1124 11.6448C40.1838 14.3592 38.9694 17.1451 37.8265 19.7881C37.6122 20.3596 37.3265 20.8596 37.1122 21.431L34.6835 15.5736L33.8977 15.5022C31.6119 15.3593 29.4689 14.2164 28.2546 12.5734C27.1831 11.1448 26.8259 9.35898 27.2545 7.57317C27.9688 4.64445 31.0404 2.50147 34.5406 2.50147H34.612C37.0407 2.50147 39.0408 3.50153 40.3266 5.2159C41.541 7.00171 41.8267 9.43041 41.1124 11.6448Z"
                                />
                              </svg>
                            </span>
                            <p
                              className="mb-4 text-base font-medium italic leading-[26px] text-[#252641]"
                            >
                              {data.quote}
                            </p>
                            <span className="text-sm italic text-body-color">
                            {`"${data.quoteAuthor}"`}
                            </span>
                          </div>
                          <QuarterCircle />
                        </div>
        
                        <h3
                          className="wow fadeInUp mb-6 text-2xl font-bold leading-snug text-[#252641] sm:leading-snug md:leading-snug"
                          data-wow-delay=".1s"
                        >
                           {data.subTitleOne}
                        </h3>
        
                        <p
                          className="wow fadeInUp mb-8 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide  text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.subContentOne?.one}
                        </p>
                        <p
                          className="wow fadeInUp mb-11 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide  text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.subContentOne?.two}
                        </p>
                        <p
                          className="wow fadeInUp mb-11 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide  text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.subContentOne?.three}
                        </p>
                        <p
                          className="wow fadeInUp mb-11 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide  text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.subContentOne?.four}
                        </p>
                        <p
                          className="wow fadeInUp mb-11 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide  text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.subContentOne?.five}
                        </p>
                        <h3
                          className="wow fadeInUp mb-6 text-2xl font-bold leading-snug text-[#252641] sm:leading-snug md:leading-snug"
                          data-wow-delay=".1s"
                        >
                           {data.subTitleTwo}
                        </h3>
                        <p
                          className="wow fadeInUp mb-11 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide  text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.subContentTwo.one}
                        </p>
                        <p
                          className="wow fadeInUp mb-11 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide  text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.subContentTwo.two?.contentStart}
                          <a href={data.subContentTwo.two?.url} className="px-1 text-[#37b9b2]">{data.subContentTwo.two?.text}</a>
                          {data.subContentTwo.two?.contentEnd}
                        </p>

                        <p
                          className="wow fadeInUp mb-11 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide  text-body-color"
                          data-wow-delay=".1s"
                        >
                          {data.subContentTwo.three?.contentStart}
                          {data.subContentTwo.three?.contentEnd}
                        </p>
        
                        <div className="-mx-4 mb-12 flex flex-wrap items-center">
                          <div className="w-full px-4 md:w-1/2">
                            <div
                              className="wow fadeInUp mb-8 flex flex-wrap items-center md:mb-0"
                              data-wow-delay=".1s"
                            >
                              {data.tags.map((tag) => 
                                <span key={tag} className="mr-2 mb-2 block rounded bg-[#37b9b2] bg-opacity-5 py-2 px-5 text-xs font-medium text-[#37b9b2] hover:bg-opacity-100 hover:text-white md:mr-4 lg:mr-2 xl:mr-4">
                                {tag}
                              </span>
                              )}
                            </div>
                          </div>
                          <div className="w-full px-4 md:w-1/2">
                            <div
                              className="wow fadeInUp flex items-center md:justify-end"
                              data-wow-delay=".1s"
                            >
                              <span className="mr-5 text-sm font-medium text-body-color">
                                Share This Post
                              </span>
                            
                              <div className="flex items-center">
                              <Share 
                                text={data.title}
                                url={window.location.href}
                                title={data.tags[0]}
                                className="mr-4"
                              />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  )}
                    </div>
                    
                    <div className="w-full px-4 lg:w-4/12">
                      <div>
                        <div
                          className="wow fadeInUp relative mb-12 overflow-hidden rounded bg-[#252641] py-[60px] px-11 text-center lg:px-8"
                          data-wow-delay=".1s
                          "
                        >
                          <h3 className="mb-2 text-2xl font-semibold text-white">
                            Join our newsletter!
                          </h3>
                          <p className="mb-8 text-base text-white">
                            Enter your email to receive our latest articles.
                          </p>
                          <form>
                            <input
                              type="email"
                              placeholder="Your email address"
                              className="mb-4 h-[50px] w-full rounded-full border border-transparent bg-white bg-opacity-20 text-center text-sm font-normal text-white placeholder-white outline-none focus:border-white focus-visible:shadow-none"
                            />
                            <input
                              type="submit"
                              value="Subscribe Now"
                              className="mb-6 h-[50px] w-full cursor-pointer rounded-full bg-[#37b9b2] text-center text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-lg"
                            />
                          </form>
                          <p className="text-sm font-medium text-white">
                            Don't worry, we don't spam
                          </p>
                          <Dotted />
        
                          </div>
        
                         
                        <div className="-mx-4 mb-8 flex flex-wrap">
                          <div className="w-full px-4">
                            <h2
                              className="wow fadeInUp relative pb-5 text-2xl font-semibold text-[#252641] sm:text-[28px]"
                              data-wow-delay=".1s
                              "
                            >
                              Popular Articles
                            </h2>
                            <span
                              className="mb-10 inline-block h-[2px] w-20 bg-[#37b9b2]"
                            ></span>
                          </div>
                          {blogData.filter((item) => item.id !== id).map((data) =>                  
                            <div className="w-full px-4 md:w-1/2 lg:w-full" key={data.id}>
                            <div
                              className="wow fadeInUp mb-5 flex w-full items-center border-b border-[#F2F3F8] pb-5"
                              data-wow-delay=".1s
                              "
                            >
                              <div
                                className="mr-5 h-20 w-full max-w-[80px] overflow-hidden rounded-full"
                              >
                                <img
                                  src={data.blogImg}
                                  alt="image"
                                  className="w-full"
                                />
                              </div>
                              <div className="w-full">
                                <h4 onClick={() => setIsLoading(true)}>
                                  <Link 
                                    to={`/blogs/${data.id}`}
                                    className="mb-1 inline-block text-lg font-medium cursor-pointer leading-snug text-[#252641] hover:text-[#37b9b2] lg:text-base xl:text-lg"
                                  >
                                    {data.title}…
                                  </Link>
                                </h4>
                                <p className="text-sm text-body-color">{data.author}</p>
                              </div>
                            </div>
                          </div>
                              )}
                        </div>
        
                        <div
                          className="wow fadeInUp mb-12 overflow-hidden rounded"
                          data-wow-delay=".1s"
                        >
                          <img
                            src={bannerAd}
                            alt="image"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
      </div>

      <div className="-mx-4 flex flex-wrap">
        <div className="wow fadeInUp mt-14 w-full px-4" data-wow-delay=".2s">
          <h2
            className="relative pb-5 text-2xl font-semibold text-[#252641] sm:text-[28px]"
          >
            Related Articles
          </h2>
          <span className="mb-10 inline-block h-[2px] w-20 bg-[#37b9b2]"></span>
        </div>
        {blogData.filter((item) => item.id !== id).map((data) => 
            <div key={data.title} className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="wow fadeInUp group mb-10" data-wow-delay=".1s">
              <div className="mb-8 overflow-hidden rounded" onClick={() => setIsLoading(true)}>
                <Link to={`/blogs/${data.id}`} className="block">
                  <img
                    src={data.blogImg}
                    alt="image"
                    className="w-full transition group-hover:rotate-6 group-hover:scale-125"
                  />
                </Link>
              </div>
              <div>
                <span
                  className="mb-5 inline-block rounded bg-[#37b9b2] py-1 px-4 text-center text-xs font-semibold leading-loose text-white"
                >
                  {data.date}
                </span>
                <h3 onClick={() => setIsLoading(true)}>
                  <Link
                    to={`/blogs/${data.id}`}
                    className="mb-4 inline-block text-xl font-semibold text-[#252641] hover:text-[#37b9b2] sm:text-2xl lg:text-xl xl:text-2xl"
                  >
                    {data.title}
                  </Link>
                </h3>
                <p className="md:text-base text-sm text-body-color">
                  {data.content.one?.slice(0, 70)}...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
    </>
  )
}

export default BlogDetails;




