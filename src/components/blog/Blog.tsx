import { useNavigate } from 'react-router-dom';
import blogData from '../blog/blogData';


const Blog = () => {
    const navigate = useNavigate();
    

  return (
    <div id="blog">
        <div data-aos="zoom-in" className="mt-24 text-center">
            <h1 className="text-navy md:text-3xl text-2xl font-semibold">Wiizzkid <span className="text-tomato">Blog</span></h1>
            <p className="text-gray-500 my-5 lg:text-base text-sm">Stay ahead with our latest blog posts.</p>
        </div>
        <div data-aos="zoom-in-up" className="my-14 flex flex-col lg:flex-row lg:space-x-20">
        {blogData?.filter((item) => item.id === blogData[0].id).map((data) => 
            <div className="lg:w-6/12 rounded-lg" key={data.id}>
                
                <img className="w-full rounded-xl mb-6" src={data.details.blogImg} />
                <span className="bg-golden text-navy font-semibold px-4 py-px text-sm rounded-full">Latest</span>
                <h1 className="text-navy font-semibold my-3 sm:text-xl text-lg">{typeof data.content[0].datum === 'string' ?  data.content[0].datum : null}</h1>
                <p className="text-gray-500 mb-3 sm:text-base text-sm leading-relaxed">{typeof data.content[1].datum === 'string' ?  data.content[1].datum?.slice(0, 124) : null}...</p>
                <button onClick={() => navigate(`/blogs/${data.id}`) } className="underline sm:text-base text-sm hover:text-teal cursor-pointer">Read more</button>
            </div>  
        )}

        <div className="lg:w-7/12 flex flex-col justify-between mt-12 space-y-5 lg:space-y-0 lg:mt-0">
            {blogData?.filter((item) => item.id !== blogData[0].id).map((data) => 
                <div className="flex space-x-5 rounded-lg"key={data.id}>
                <div className="w-4/12">
                    <div className="relative">
                        <img className="rounded-xl w-full" src={data.details.blogImg} />
                        <span className="absolute bottom-2 right-2 bg-golden text-navy font-semibold px-4 py-px text-xs rounded-full hidden sm:block">
                        {data.content[data.content.length - 1].datum[0]}
                        </span>
                    </div>
                </div>
                <div className="w-8/12">
                    <h1 onClick={() => navigate(`/blogs/${data.id}`)} className="text-navy text-base sm:text-lg font-semibold hover:text-teal cursor-pointer">{typeof data.content[0].datum === 'string' ?  data.content[0].datum : null}</h1>
                    <p className="text-gray-500 my-2 sm:my-4 text-sm sm:text-base leading-relaxed">{typeof data.content[1].datum === 'string' ?  data.content[1].datum?.slice(0, 95) : null}...</p>
                </div>
            </div>
            )}
          
        </div>
    </div>
</div>
  )
}

export default Blog;

