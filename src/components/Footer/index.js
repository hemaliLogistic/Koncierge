import React from "react";

const Footer = () => {
  return (
    <footer className='bg-black33 text-white'>
      <div className='px-4 py-12 flex justify-between  flex-col lg:flex-row mx-5 lg:mx-32'>
        <div className='w-full lg:w-1/3 mb-8 sm:mb-0 flex flex-col justify-start'>
          <div className=''>
            <img className='w-72 h-24' src='images/logoWhite.png' />
            <div className='w-[80%]'>
              <p className='mt-4 font-Jost text-[20px]'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className='flex mt-5 space-x-4 items-center'>
              <img className='w-6 h-6' src='images/twitter.png' />
              <img className='w-6 h-5' src='images/facebook.png' />
              <img className='w-6 h-6' src='images/instagram.png' />
              <img className='w-6 h-6' src='images/youtube.png' />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col lg:w-2/3'>
          <div className='flex w-full lg:w-full mb-8 lg:mb-0 lg:text-center justify-between mx-0'>
            <h3 className='text-[20px] lg:text-[30px] font-Jost font-semibold'>
              Are You Interested in our Services?
            </h3>
            <div className='flex justify-end'>
              <button className='px-6 py-2 border-titleColor border hover:bg-green-700 text-white font-jost justify-end'>
                Book Now
              </button>
            </div>
          </div>
          <div className='lg:flex hidden justify-between mt-20'>
            <div className='flex flex-col '>
              <h4 className='text-[25px] font-Jost font-semibold'>
                Quick Links
              </h4>
              <div className='h-[2px] w-[50%] bg-green00 my-1'></div>
              <ul className='mt-4 space-y-2 text-[18px] font-Jost'>
                <li>
                  <a href='#'>Book Service</a>
                </li>
                <li>
                  <a href='#'>Terms of Service</a>
                </li>
                <li>
                  <a href='#'>Privacy policy</a>
                </li>
              </ul>
            </div>
            <div className='flex flex-col'>
              <h4 className='text-[25px] font-Jost font-semibold'>Company</h4>
              <div className='h-[2px] w-[50%] bg-green00 my-1'></div>
              <ul className='mt-4 space-y-2 text-[18px] font-Jost'>
                <li>
                  <a href='#'>About us</a>
                </li>
                <li>
                  <a href='#'>Our Services</a>
                </li>
                <li>
                  <a href='#'>Contact us</a>
                </li>
              </ul>
            </div>
            <div className='flex flex-col'>
              <h4 className='text-[25px] font-Jost font-semibold'>
                Contact Us
              </h4>
              <div className='h-[2px] w-[50%] bg-green00 my-1'></div>
              <ul className='mt-4 space-y-2 text-[18px] font-Jost'>
                <li>
                  <a href='tel:1234567890'>1234567890</a>
                </li>
                <li>
                  <a href='mailto:abc@gmail.com'>abc@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex flex-col lg:hidden'>
            <div className='flex space-x-12'>
              <div className='flex flex-col '>
                <h4 className='text-lg font-semibold'>Quick Links</h4>
                <div className='h-[2px] w-[50%] bg-green00 my-1'></div>
                <ul className='mt-4 space-y-2 text-sm'>
                  <li>
                    <a href='#'>Book Service</a>
                  </li>
                  <li>
                    <a href='#'>Terms of Service</a>
                  </li>
                  <li>
                    <a href='#'>Privacy policy</a>
                  </li>
                </ul>
              </div>
              <div className='flex flex-col'>
                <h4 className='text-lg font-semibold'>Company</h4>
                <div className='h-[2px] w-[50%] bg-green00 my-1'></div>
                <ul className='mt-4 space-y-2 text-sm'>
                  <li>
                    <a href='#'>About us</a>
                  </li>
                  <li>
                    <a href='#'>Our Services</a>
                  </li>
                  <li>
                    <a href='#'>Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='flex flex-col mt-10 w-[25%]'>
              <h4 className='text-lg font-semibold'>Contact Us</h4>
              <div className='h-[2px] w-[50%] bg-green00 my-1'></div>
              <ul className='mt-4 space-y-2 text-sm'>
                <li>
                  <a href='tel:1234567890'>1234567890</a>
                </li>
                <li>
                  <a href='mailto:abc@gmail.com'>abc@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-green-700 text-center py-4'>
        <p className='text-sm'>Copy right 2024 © ABC, All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
