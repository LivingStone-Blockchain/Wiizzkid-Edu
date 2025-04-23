import { useEffect,useState } from 'react'
import { ChevronUp } from 'lucide-react';




const BackToTop = () => {
    const [showButton, setShowButton] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
          if (window.pageYOffset > 200) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        });
      }, []);

    
      // This function will scroll the window to the top 
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // for smoothly scrolling
        });
      };


  return (
    <>
        {showButton && (
        <div data-aos="fade-up" data-aos-delay="300" className="fixed bottom-7 right-6 z-[200] h-11 w-11 cursor-pointer rounded-md bg-teal flex justify-center items-center text-xl font-semibold text-white transition-all duration-300 ease-out delay-75 hover:shadow-lg hover:bg-tomato" onClick={scrollToTop}>
            <ChevronUp />
        </div>
        )}
    </>
  )
   }
export default BackToTop;
     