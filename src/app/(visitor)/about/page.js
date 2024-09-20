"use client";

import React, { useEffect, useState } from 'react';
import CommonPageblock from '@/components/styles/common.style';
import "../../../components/NavBar/global.css";
import Header from '@/components/header';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./global.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
const About = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500
  };
  useEffect(() => {
    AOS.init({
      once: false,
      offset: 50
    });
  }, []);
  return (
    <>
      <CommonPageblock>
        <Header />
        <div className='common-page'>
          <div className='main-banner'>
            <div className='common-container'>
              <div className='main-banner-text'>
                <h3 data-aos='fade-up' data-aos-duration='1100'>
                  Welcome to Koncierge
                </h3>
                <h1 data-aos='fade-up' data-aos-duration='1100'>
                  About Us
                </h1>
                <p data-aos='fade-up' data-aos-duration='1100'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                {/* <button className='common-btn btn'>Book Now</button> */}
              </div>
            </div>
          </div>
          <div className='about-section-main common-padding'>
            <div className='common-container'>
              <div className='common-title' data-aos='fade-up' data-aos-duration='1100'>
                <div className='common-title-inner'>
                  <h2>About</h2>
                  <h5>Who we Are</h5>
                </div>
                <h3>What is Koncierge ?</h3>
              </div>
              <div className='about-section-main-inner'>
                <p data-aos='fade-up' data-aos-duration='1100'>
                  {' '}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt.{' '}
                </p>
              </div>
            </div>
            <div className='about-why'>
              <div className='about-why-left'>
                <div className='common-container'>
                  <div className='about-why-left-inner'>
                    <h3 data-aos='fade-up' data-aos-duration='1100'>
                      Why to Choose us ?
                    </h3>
                    <div className='flex-block-why'>
                      <div className='flex-block-why-inner' data-aos='fade-up' data-aos-duration='1100'>
                        <div className='flex-block-why-inner-block'>
                          <div className='flex-icon'>
                            <img src='/images/about-icon-1.png' alt='icon' />
                          </div>
                          <h3>Saving Time & Money</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                          </p>
                        </div>
                      </div>
                      <div className='flex-block-why-inner' data-aos='fade-up' data-aos-duration='1100'>
                        <div className='flex-block-why-inner-block'>
                          <div className='flex-icon'>
                            <img src='/images/about-icon-2.png' alt='icon' />
                          </div>
                          <h3>Short & long Term Partnership</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='about-why-right' data-aos='fade-up' data-aos-duration='1100'>
                <img src='/images/about-img.png' alt='img' />
              </div>
            </div>
          </div>
          <div className='portfolio-section common-padding pad-top-none'>
            <div className='common-container'>
              <div className='common-title mb-custom-60' data-aos='fade-up' data-aos-duration='1100'>
                <div className='common-title-inner'>
                  <h2>Portfolio</h2>
                  <h5>Our Work</h5>
                </div>
                <h3>Koncierge Gallery</h3>
              </div>
            </div>
            <div className='portfolio-slider' data-aos='fade-up' data-aos-duration='1100'>
              <div className='portfolio-slider-inner'>
                <Slider {...settings}>
                  <div>
                    <div className='portfolio-slider-inner-block'>
                      <img src='/images/about-img.png' alt='img'></img>
                      <div className='portfolio-slider-inner-block-hover'>
                        <div className='portfolio-slider-inner-block-hover-inner'>
                          <h2>Home Cleaning</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                          </p>
                          <button className='btn common-btn'>Explore</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='portfolio-slider-inner-block'>
                      <img src='/images/about-img.png' alt='img'></img>
                      <div className='portfolio-slider-inner-block-hover'>
                        <div className='portfolio-slider-inner-block-hover-inner'>
                          <h2>Home Cleaning</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                          </p>
                          <button className='btn common-btn'>Explore</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='portfolio-slider-inner-block'>
                      <img src='/images/about-img.png' alt='img'></img>
                      <div className='portfolio-slider-inner-block-hover'>
                        <div className='portfolio-slider-inner-block-hover-inner'>
                          <h2>Home Cleaning</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                          </p>
                          <button className='btn common-btn'>Explore</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='portfolio-slider-inner-block'>
                      <img src='/images/about-img.png' alt='img'></img>
                      <div className='portfolio-slider-inner-block-hover'>
                        <div className='portfolio-slider-inner-block-hover-inner'>
                          <h2>Home Cleaning</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                          </p>
                          <button className='btn common-btn'>Explore</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='portfolio-slider-inner-block'>
                      <img src='/images/about-img.png' alt='img'></img>
                      <div className='portfolio-slider-inner-block-hover'>
                        <div className='portfolio-slider-inner-block-hover-inner'>
                          <h2>Home Cleaning</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                          </p>
                          <button className='btn common-btn'>Explore</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='portfolio-slider-inner-block'>
                      <img src='/images/about-img.png' alt='img'></img>
                      <div className='portfolio-slider-inner-block-hover'>
                        <div className='portfolio-slider-inner-block-hover-inner'>
                          <h2>Home Cleaning</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                          </p>
                          <button className='btn common-btn'>Explore</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </CommonPageblock>
    </>
  );
};

export default About;
