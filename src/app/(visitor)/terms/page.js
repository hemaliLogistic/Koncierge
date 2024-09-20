"use client";

import React, { useEffect, useState } from 'react';
import CommonPageblock from '@/components/styles/common.style';
import Header from '@/components/header';
import Link from 'next/link';
import "../../../components/NavBar/global.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
const Terms = () => {
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
                  Terms and Conditions
                </h1>
                {/* <button className='common-btn btn'>Book Now</button> */}
              </div>
            </div>
          </div>
          <div className='privacy-block common-padding'>
            <div className='common-container'>
              <div className='common-title mb-custom-60' data-aos='fade-up' data-aos-duration='1100'>
                <div className='common-title-inner'>
                  <h2>Welcome</h2>
                  <h5>Koncierge</h5>
                </div>
                <h3>Terms and Conditions</h3>
              </div>
              <div className='privacy-section-main' data-aos='fade-up' data-aos-duration='1100'>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.{' '}
                </p>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.{' '}
                </p>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.{' '}
                </p>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.{' '}
                </p>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.{' '}
                </p>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.{' '}
                </p>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CommonPageblock>
    </>
  );
};

export default Terms;
