import React, { useEffect, useState } from 'react';
import { Banner, Preloader, BlogBuilder } from '../components';
import { bannerAd, blogging, news } from '../assets/blog';
import { Dotted } from '../shapes';
import blogData from '../components/blog/blogData';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon } from '../components/blog/icons';



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


          <div className="flex lg:gap-8 lg:items-stretch">
          {blogData.filter((item) => item.id === id).map((data) => 
            <div
            className="wow fadeInUp w-full lg:w-8/12 relative z-20 mb-[60px] h-[300px] overflow-hidden rounded md:h-[400px] lg:h-[500px]"
            data-wow-delay=".1s"
            key={data.id}
          >
            <img
              src={data.details.blogImg}
              alt="blog photo"
              className="mx-auto h-full w-full object-fill object-center"
            />
            <div
              className="absolute top-0 left-0 z-10 flex h-full w-full items-end bg-gradient-to-t from-[#1a1f45c4] to-transparent "
            >
              <div className="flex flex-wrap items-center p-4 pb-4 sm:p-8">
                <div className="mr-5 flex items-center md:mr-10">
                  <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src={data.details.authorImg}
                      alt="author"
                      className="w-full"
                    />
                  </div>
                  <div className='flex flex-wrap items-center justify-between md:gap-10 gap-3'>
                    <p className="md:text-base text-sm font-medium text-white">
                      By 
                      <a className="text-white hover:opacity-70 ml-1">
                        {data.details.author}
                      </a>
                    </p>
                    <div className="flex items-center">
                    <p
                      className="flex items-center text-sm font-medium text-white md:mr-8"
                    >
                      <span className="mr-3">
                        <CalendarIcon />
                      </span>
                      {data.details.date}
                    </p>
                  </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        )}

                  <div
                          className="wow fadeInUp lg:block  hidden w-full  h-[500px] lg:w-4/12 relative overflow-hidden rounded border-2 ml-4 pb-[60px] px-11 text-center lg:px-8"
                         data-wow-delay=".1s
                          "
                        >
                          <img src={blogging} alt="blog" className='relative w-full' />
                          <h3 className="mb-2 text-2xl font-semibold text-[#252641]">
                            Blogging the Wiizzkid Way!
                          </h3>
                          <p className="mb-8 md:text-base text-sm  text-[#252641]">
                            We are rolling out more more!
                          </p>
                          <div className="flex items-center justify-center h-[50px] w-full cursor-pointer rounded-full bg-[#37b9b2] text-center text-sm font-medium text-white">
                            Anticipate
                          </div>
                      
                          </div>

          </div>
        
        
        <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4 lg:w-8/12">
          {blogData?.filter((item) => item.id === id).map((data) =>  
                      <div  key={data.id}>
                        {
                          data.content.map((item) => (
                            <BlogBuilder 
                              key={item.datum}
                              type={item.type!}
                              data={item.datum}
                          /> 
                          ))
                        }
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
                                    {data.content[0].datum}…
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
        {blogData.filter((item) => item.id !== id).map((data, index) => 
            <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="wow fadeInUp group mb-10" data-wow-delay=".1s">
              <div className="mb-8 overflow-hidden rounded" onClick={() => setIsLoading(true)}>
                <Link to={`/blogs/${data.id}`} className="block">
                  <img
                    src={data.details.blogImg}
                    alt="image"
                    className="w-full lg:h-52 md:h-48 transition group-hover:rotate-6 group-hover:scale-125"
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
                    {data.content[0].datum}
                  </Link>
                </h3>
                <p className="md:text-base text-sm text-body-color">
                  {data.content[1].datum?.slice(0, 70)}...
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