import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { WiizzkidContext, WiizzkidContextType } from '../context/wiizzkid.context';
import logo from './../assets/header/wiizzkid-logo.png';
import { MdLocationPin, MdCall, MdEmail } from 'react-icons/md';



const Footer = () => {
  const { value } = useContext(WiizzkidContext) as WiizzkidContextType;
  const colors = ['#ff5d5d', '#e0b00d', '#37b9b2'];
  const location = useLocation();
  const navigate = useNavigate();


  //render based on location
    if (location.pathname !== "/" && location.pathname !== "/pricing" && location.pathname !== "/roadmap"  && location.pathname !== "/about"  && location.pathname !== "/quiz-home" && location.pathname !== "/timestable-home" && !location.pathname.includes("blogs/")) {
      return null;
  }



   return (
   <footer className="mt-24 bg-navy">
   <div className="lg:container m-auto space-y-8 px-4 py-16 text-gray-600 md:px-8">
     <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-8">
       <div className={`flex justify-center items-center border-2  h-14 w-14 rounded-lg p-1`} style={{borderColor: `${colors[value]}`}}>
         <img className='w-full h-auto max-w-[50px]' src={logo} alt="wiizzkid logo" />
       </div>
       <div className="flex gap-6">
         
         <a href="#" target="blank" aria-label="github" className="hover:text-tealLight text-gray-400">
           <svg 
             xmlns="http://www.w3.org/2000/svg" 
             width="20"
             height="20"
             fill="currentColor"
             className="bi bi-instagram" 
             viewBox="0 0 24 24"
           >
             <path 
               d="M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z"
             />
           </svg>
         </a>
         <a href="#" target="blank" aria-label="twitter" className="hover:text-tealLight text-gray-400">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="20"
             height="20"
             fill="currentColor"
             className="bi bi-twitter"
             viewBox="0 0 16 16"
           >
             <path
               d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
             />
           </svg>
         </a>
         <a href="#" target="blank" aria-label="medium" className="hover:text-tealLight text-gray-400">
           <svg 
             xmlns="http://www.w3.org/2000/svg" 
             width="20"
             height="20"
             fill="currentColor"
             className="bi bi-facebook"
             viewBox="0 0 24 24"
           >
             <path 
             d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"            />
           </svg>
         </a>
         <a href="#" target="blank" aria-label="medium" className="hover:text-tealLight text-gray-400">
           <svg 
             xmlns="http://www.w3.org/2000/svg" 
             width="20"
             height="20"
             fill="currentColor"
             className="bi bi-linkedin"
             viewBox="0 0 24 24"
           >
             <path 
               d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"            />
           </svg>
         </a>
       </div>
     </div>
     <div className="grid grid-cols-2 gap-6 sm:gap-0 md:grid-cols-3">
       <div>
         <h6 className="text-lg font-medium text-white">Quick Links</h6>
         <ul className="mt-4 mb-5 md:mb-0 list-inside space-y-4 text-gray-400 text-sm">
           <li>
             <a href="#quiz" className={`transition hover:text-tealLight`}>Wiizzkid Quiz</a>
           </li>
           <li>
             <a href="#metaverse" className={`transition hover:text-tealLight`}>Wiizzkid Metaverse</a>
           </li>
           <li>
             <Link to="/roadmap" className={`transition hover:text-tealLight`}>Roadmap</Link>
           </li>
           <li>
             <a href="#blog" className={`transition hover:text-tealLight`}>Blog</a>
           </li>
         </ul>
       </div>
       <div>
         <h6 className="text-lg font-medium text-white">Information</h6>
         <ul className="mt-4 mb-5 md:mb-0 list-inside space-y-4 text-gray-400 text-sm">
           <li>
             <a href="#" className="transition hover:text-tealLight">Portfolio</a>
           </li>
           <li>
             <a href="#" className="transition hover:text-tealLight">Privacy Policy</a>
           </li>
           <li>
             <a href="#blog" className="transition hover:text-tealLight">Latest News</a>
           </li>
           <li>
             <Link to='/pricing' className="transition hover:text-tealLight">Pricing</Link>
           </li>
         </ul>
       </div>
       <div>
         <h6 className="text-lg font-medium text-white cursor-pointer" onClick={() => navigate('/about')}>Contact us</h6>
         <ul className="mt-4 list-inside space-y-4 text-gray-400 text-sm">
           <li className="flex gap-5 transition">
               <span className="justify-self-center self-center"><MdLocationPin /></span>
               <span>Ealing, London</span>
           </li>
           <li className="flex gap-5 transition">
               <span className="justify-self-center self-center"><MdCall /></span>
               <span>+447904805276</span>
           </li>
           <li className="flex gap-5 transition">
               <span className="justify-self-center self-center"><MdEmail /></span>
               <span>engagewithme007@gmail.com</span>
           </li>
         </ul>
       </div>
     </div>
     <div className="flex justify-between rounded-md bg-gray-200 px-4 py-3 text-gray-600">
       <span>&copy; Wiizzkid</span>
       <span className="font-medium transition">{new Date().getFullYear()}</span>
     </div>
   </div>
</footer>
)}


export default Footer;