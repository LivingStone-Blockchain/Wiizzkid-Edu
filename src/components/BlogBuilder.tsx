import React, { CSSProperties } from 'react'
import { QuarterCircle } from '../shapes';
import { Share } from '../components';



type BlogBuilderProps = {
    type: string,
    data: any,
    className?: CSSProperties,
    title?: string,
  };

  
const BlogBuilder = ({type, data, className, title}: BlogBuilderProps) => {

    if (type === "img") {
      return (
        <img src={data} alt={data} />
      )
    }
    else if ( type === "list") {
      return (
        <ul className="wow fadeInUp md:text-base text-[15px] md:leading-8 leading-8 tracking-wide px-5 text-body-color list-disc mb-8">
          {data.map((item:string) => <li key={item}>{item}</li>)}
      </ul>
      )
    }
    else if ( type === "questionnaire") {
        
        return (
          <ul className="wow fadeInUp md:text-base text-[15px] md:leading-8 leading-8 tracking-wide px-5 text-body-color list-disc mb-8">
            {data.map((item:any) => <li key={item.question}>{item.question} {<span className='font-bold block mb-4'>Ans: <span className='font-normal pl-1'>{item.answer}</span></span>}</li>)}
        </ul>
        )
      }
    else if (type === "link") {
      return (
        <p
        className="wow fadeInUp md:text-base text-[15px] mb-8 md:leading-8 leading-8 tracking-wide  text-body-color"
        data-wow-delay=".1s"
      >
        {data[0]}
        <a href={data[1]} target="_blank"  className="px-1 text-[#37b9b2]">{data[2]}</a>
        {data[3]}
      </p>
      )
    }
  
    else if (type === "header"){
      return (
        <h2 className="wow fadeInUp mb-6 text-2xl font-bold leading-snug text-[#252641] sm:leading-snug md:text-3xl md:leading-snug" >
        {data}
      </h2>
      )
    }
  
    else if (type === "subHeader"){
      return (
        <h3 className="wow fadeInUp mb-6 text-2xl font-bold leading-snug text-[#252641] sm:leading-snug md:leading-snug">
            {data}
        </h3>
      )
    }
  
    else if (type === "tagsShare") {
      return (
        <div className="-mx-4 mb-12 flex flex-wrap items-center">
        <div className="w-full px-4 md:w-1/2">
          <div
            className="wow fadeInUp mb-8 flex flex-wrap items-center md:mb-0"
            data-wow-delay=".1s"
          >
            {data.map((tag: string) => 
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
              text={title!}
              url={window.location.href}
              title={data[0]}
              className="mr-4"
            />
            </div>
          </div>
        </div>
      </div>
      )
    }
  
    else if ( type === "quote") {
      return (
      <div
        className="wow fadeInUp relative z-10 mb-10 mt-2 overflow-hidden rounded bg-[#37b9b2] bg-opacity-5 py-8 px-6 text-center sm:p-10 md:px-[60px]"
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
            {data[0]}
          </p>
          <span className="text-sm italic text-body-color">
          {`"${data[1]}"`}
          </span>
        </div>
        <QuarterCircle />
      </div>
      )
    }
    else if (type === "paragraph") {
      return (
        <p className={`${className} mb-8 md:text-base text-[15px] md:leading-8 leading-8 tracking-wide text-body-color`}>
        {data}
        </p>
      )
    }
    else {
      return null;
      }
  };
  

export default BlogBuilder;