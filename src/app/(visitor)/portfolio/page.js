"use client";

import React, { useEffect, useState } from 'react';
import CommonPageblock from '@/components/styles/common.style';
import Header from '@/components/header';
import Link from 'next/link';
import "../../../components/NavBar/global.css";

import "./global.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Portfolio = () => {
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
                  Our Portfolio
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
          <div className='portfolio-block common-padding'>
            <div className='common-container'>
              <div className='common-title mb-custom-60' data-aos='fade-up' data-aos-duration='1100'>
                <div className='common-title-inner'>
                  <h2>Portfolio</h2>
                  <h5>Our Work</h5>
                </div>
                <h3>Koncierge Gallery</h3>
              </div>
              <div className='portfolio-block-main'>
                <div className='portfolio-block-inner' data-aos='fade-up' data-aos-duration='1100'>
                  <div className='portfolio-slider-inner-block'>
                    <img src='/images/about-img.png' alt='img'></img>
                    <div className='portfolio-slider-inner-block-hover'>
                      <div className='portfolio-slider-inner-block-hover-inner'>
                        <h2>Home Cleaning</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='portfolio-block-inner'>
                  <div className='portfolio-slider-inner-block'>
                    <img src='/images/about-img.png' alt='img'></img>
                    <div className='portfolio-slider-inner-block-hover'>
                      <div className='portfolio-slider-inner-block-hover-inner'>
                        <h2>Home Cleaning</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='portfolio-block-inner'>
                  <div className='portfolio-slider-inner-block'>
                    <img src='/images/about-img.png' alt='img'></img>
                    <div className='portfolio-slider-inner-block-hover'>
                      <div className='portfolio-slider-inner-block-hover-inner'>
                        <h2>Home Cleaning</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='portfolio-block-inner'>
                  <div className='portfolio-slider-inner-block'>
                    <img src='/images/about-img.png' alt='img'></img>
                    <div className='portfolio-slider-inner-block-hover'>
                      <div className='portfolio-slider-inner-block-hover-inner'>
                        <h2>Home Cleaning</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='portfolio-block-inner'>
                  <div className='portfolio-slider-inner-block'>
                    <img src='/images/about-img.png' alt='img'></img>
                    <div className='portfolio-slider-inner-block-hover'>
                      <div className='portfolio-slider-inner-block-hover-inner'>
                        <h2>Home Cleaning</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua Ut enim ad minim veniam.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='portfolio-block-inner'>
                  <div className='portfolio-slider-inner-block'>
                    <img src='/images/about-img.png' alt='img'></img>
                    <div className='portfolio-slider-inner-block-hover'>
                      <div className='portfolio-slider-inner-block-hover-inner'>
                        <h2>Home Cleaning</h2>
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
          </div>
        </div>
      </CommonPageblock>
    </>
  );
};

export default Portfolio;
