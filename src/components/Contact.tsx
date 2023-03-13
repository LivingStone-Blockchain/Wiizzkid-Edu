import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';
import Button from './Button';

const Contact = () => {
    const [message, setMessage] = useState<string>(''); 
    const formRef = useRef<HTMLFormElement>(null);

    //notification
  const successNotify = () => toast.success("Message sent successfully!");
  const errorNotify = () => toast.error("Message not delivered!");

  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;

  const sendEmail = (e: any) => {
    e.preventDefault();

    const currentForm = formRef.current;
    if (currentForm === null) return;

    emailjs.sendForm(serviceId, templateId, currentForm, publicKey)
      .then((result) => {
          setMessage("success")
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
          setMessage("error")
      });

      e.target.reset();
  };

  return (
    <section className="text-navy pt-28" id="#contact">
    <div className="container">
      <div className="mx-4 flex flex-wrap items-center">
        <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
          <div data-aos="fade-right">
            <div className="mb-12 lg:mb-[150px]">
              <span
                className="font-headingFont mb-5 text-base font-semibold text-tomato"
              >
                CONTACT US
              </span>
              <h2 className="md:text-3xl text-2xl  font-semibold">
                Let's talk <br />
                Love to hear from you!
              </h2>
            </div>
            <div className="mb-12 flex flex-wrap justify-between lg:mb-0">
              <div className="mb-8 flex w-[330px] max-w-full">
                <div className="mr-6 text-[32px] text-navy">
                  <svg
                    viewBox="0 0 29 35"
                    className="fill-current md:w-[25px] md:h-[31px] w-[20px] h-[26px]"
                  >
                    <path
                      d="M14.5 0.710938C6.89844 0.710938 0.664062 6.72656 0.664062 14.0547C0.664062 19.9062 9.03125 29.5859 12.6406 33.5234C13.1328 34.0703 13.7891 34.3437 14.5 34.3437C15.2109 34.3437 15.8672 34.0703 16.3594 33.5234C19.9688 29.6406 28.3359 19.9062 28.3359 14.0547C28.3359 6.67188 22.1016 0.710938 14.5 0.710938ZM14.9375 32.2109C14.6641 32.4844 14.2812 32.4844 14.0625 32.2109C11.3828 29.3125 2.57812 19.3594 2.57812 14.0547C2.57812 7.71094 7.9375 2.625 14.5 2.625C21.0625 2.625 26.4219 7.76562 26.4219 14.0547C26.4219 19.3594 17.6172 29.2578 14.9375 32.2109Z"
                    />
                    <path
                      d="M14.5 8.58594C11.2734 8.58594 8.59375 11.2109 8.59375 14.4922C8.59375 17.7188 11.2187 20.3984 14.5 20.3984C17.7812 20.3984 20.4062 17.7734 20.4062 14.4922C20.4062 11.2109 17.7266 8.58594 14.5 8.58594ZM14.5 18.4297C12.3125 18.4297 10.5078 16.625 10.5078 14.4375C10.5078 12.25 12.3125 10.4453 14.5 10.4453C16.6875 10.4453 18.4922 12.25 18.4922 14.4375C18.4922 16.625 16.6875 18.4297 14.5 18.4297Z"
                    />
                  </svg>
                </div>
                <div>
                  <h5 className="md:mb-5 mb-3 text-lg font-semibold text-navy">Our Location</h5>
                  <p className="md:text-base text-sm text-gray-500">
                    Ealing, London
                  </p>
                </div>
              </div>
              <div className="mb-8 flex w-[330px] max-w-full">
                <div className="mr-6 text-[32px] text-navy">
                  <svg
                    width="30"
                    height="21"
                    viewBox="0 0 34 25"
                    className="fill-current md:w-[30px] md:h-[21px] w-[25px] h-[16px]"
                  >
                    <path
                      d="M30.5156 0.960938H3.17188C1.42188 0.960938 0 2.38281 0 4.13281V20.9219C0 22.6719 1.42188 24.0938 3.17188 24.0938H30.5156C32.2656 24.0938 33.6875 22.6719 33.6875 20.9219V4.13281C33.6875 2.38281 32.2656 0.960938 30.5156 0.960938ZM30.5156 2.875C30.7891 2.875 31.0078 2.92969 31.2266 3.09375L17.6094 11.3516C17.1172 11.625 16.5703 11.625 16.0781 11.3516L2.46094 3.09375C2.67969 2.98438 2.89844 2.875 3.17188 2.875H30.5156ZM30.5156 22.125H3.17188C2.51562 22.125 1.91406 21.5781 1.91406 20.8672V5.00781L15.0391 12.9922C15.5859 13.3203 16.1875 13.4844 16.7891 13.4844C17.3906 13.4844 17.9922 13.3203 18.5391 12.9922L31.6641 5.00781V20.8672C31.7734 21.5781 31.1719 22.125 30.5156 22.125Z"
                    />
                  </svg>
                </div>
                <div>
                  <h5 className="md:mb-5 mb-3 text-lg font-semibold text-navy">How Can We Help?</h5>
                  <p className="md:text-base text-sm text-gray-500">engagewithme007@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-5/12 xl:w-4/12 mx-auto" data-aos="fade-left">
          <div
            className="wow fadeInUp bg-white shadow-xl rounded-xl border border-gray-200 py-10 px-8 shadow-testimonial sm:py-12 sm:px-10 md:p-[60px] lg:p-10 lg:py-12 lg:px-10 2xl:p-[60px]"
            data-wow-delay=".2s"
          >
            <h3 className="mb-8 text-2xl font-semibold md:text-[26px]">
              Send us a Message
            </h3>
            <form ref={formRef} onSubmit = {sendEmail}>
              <div className="mb-6">
                <label htmlFor="fullName" className="block md:text-sm text-xs text-navy"
                  >Full Name*</label
                >
                <input
                  type="text"
                  name="fullName"
                  className="w-full border-0 border-b border-[#e9e9e9] py-4 focus:border-primary focus:outline-none text-gray-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block md:text-sm text-xs text-navy"
                  >Email*</label
                >
                <input
                  type="email"
                  name="email"
                  
                  className="w-full border-0 border-b border-[#e9e9e9] py-4 focus:border-primary focus:outline-none text-gray-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block md:text-sm text-xs text-navy"
                  >Phone*</label
                >
                <input
                  type="text"
                  name="phone"
                  
                  className="w-full border-0 border-b border-[#e9e9e9] py-4 focus:border-primary focus:outline-none text-gray-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block md:text-sm text-xs text-navy"
                  >Message*</label
                >
                <textarea
                  name="message"
                  rows={2}
                  
                  className="w-full resize-none border-0 border-b border-[#e9e9e9] py-4 focus:border-primary focus:outline-none text-gray-500"
                ></textarea>
              </div>
              <div className="mb-0">
                <Button 
                    type="submit"
                    onClick={message === 'success' ? successNotify :  errorNotify} 
                    children="Send Message"
                    className="my-1 relative flex text-white h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 rounded-full cursor-pointer transition duration-300 hover:scale-105 active:duration-75 active:scale-95 bg-[#252641]"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Contact