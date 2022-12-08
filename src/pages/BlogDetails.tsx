import React, { useEffect, useState } from 'react';
import { Banner, Preloader, BlogBuilder } from '../components';
import { bannerAd } from '../assets/blog';
import { Dotted } from '../shapes';
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
              src={data.details.blogImg}
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
                      src={data.details.authorImg}
                      alt="author"
                      className="w-full"
                    />
                  </div>
                  <p className="md:text-base text-sm font-medium text-white">
                    By 
                    <a className="text-white hover:opacity-70 ml-1">
                      {data.details.author}
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
                    {data.details.date}
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
                        <BlogBuilder 
                          type={data.content.one.type}
                          data={data.content.one.datum}
                        />
                        <BlogBuilder 
                          type={data.content.two.type}
                          data={data.content.two.datum}
                        />
                        <BlogBuilder 
                          type={data.content.three.type}
                          data={data.content.three.datum}
                        />
                        <BlogBuilder 
                          type={data.content.four.type}
                          data={data.content.four.datum}
                        />
                        <BlogBuilder 
                          type={data.content.five.type}
                          data={data.content.five.datum}
                        />
                        <BlogBuilder 
                          type={data.content.six.type}
                          data={data.content.six.datum}
                        />
                        <BlogBuilder 
                          type={data.content.seven.type}
                          data={data.content.seven.datum}
                        />
                        <BlogBuilder 
                          type={data.content.eight.type}
                          data={data.content.eight.datum}
                        />

                        <BlogBuilder 
                          type={data.content.nine.type}
                          data={data.content.nine.datum}
                        />
                        <BlogBuilder 
                          type={data.content.ten.type}
                          data={data.content.ten.datum}
                        />
                         <BlogBuilder 
                          type={data.content.eleven.type}
                          data={data.content.eleven.datum}
                        />
                         <BlogBuilder 
                          type={data.content.twelve.type}
                          data={data.content.twelve.datum}
                        />
                         <BlogBuilder 
                          type={data.content.thirteen.type}
                          data={data.content.thirteen.datum}
                        />
                         <BlogBuilder 
                          type={data.content.fourteen.type}
                          data={data.content.fourteen.datum}
                        />
                        <BlogBuilder 
                          type={data.content.last.type}
                          data={data.content.last.datum}
                          title={data.content.last.title}
                        />
                      </div>
                  )}
                    </div>
                    
                    <div className="w-full px-4 lg:w-4/12">
                      <div className='sticky top-0'>
                        <div
                          className="wow fadeInUp relative mb-12 overflow-hidden rounded bg-[#252641] py-[60px] px-11 text-center lg:px-8"
                          data-wow-delay=".1s
                          "
                        >
                          <h3 className="mb-2 text-2xl font-semibold text-white">
                            Join our newsletter!
                          </h3>
                          <p className="mb-8 md:text-base text-sm  text-white">
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
                                  src={data.details.blogImg}
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
                                    {data.content.one.datum}…
                                  </Link>
                                </h4>
                                <p className="text-sm text-body-color">{data.details.author}</p>
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
            <div key={data.content.one.datum} className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="wow fadeInUp group mb-10" data-wow-delay=".1s">
              <div className="mb-8 overflow-hidden rounded" onClick={() => setIsLoading(true)}>
                <Link to={`/blogs/${data.id}`} className="block">
                  <img
                    src={data.details.blogImg}
                    alt="image"
                    className="w-full transition group-hover:rotate-6 group-hover:scale-125"
                  />
                </Link>
              </div>
              <div>
                <span
                  className="mb-5 inline-block rounded bg-[#37b9b2] py-1 px-4 text-center text-xs font-semibold leading-loose text-white"
                >
                  {data.details.date}
                </span>
                <h3 onClick={() => setIsLoading(true)}>
                  <Link
                    to={`/blogs/${data.id}`}
                    className="mb-4 inline-block text-xl font-semibold text-[#252641] hover:text-[#37b9b2] sm:text-2xl lg:text-xl xl:text-2xl"
                  >
                    {data.content.one.datum}
                  </Link>
                </h3>
                <p className="md:text-base text-sm text-body-color">
                  {data.content.two.datum?.slice(0, 70)}...
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