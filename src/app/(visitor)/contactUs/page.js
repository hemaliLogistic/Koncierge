"use client";

import React, { useEffect, useState } from 'react';
import CommonPageblock from '@/components/styles/common.style';
import Header from '@/components/header';
import Link from 'next/link';
import "../../../components/NavBar/global.css";

import "./global.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
const Contact = () => {
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
                  Contact US
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
          <div className='contact-block common-padding'>
            <div className='common-container'>
              <div className='common-title mb-custom-60' data-aos='fade-up' data-aos-duration='1100'>
                <div className='common-title-inner'>
                  <h2>Contact</h2>
                  <h5>Our Work</h5>
                </div>
                <h3>Contact Info</h3>
              </div>
              <div className='contact-section-main'>
                <div className='common-container'>
                  <div className='contact-section-main-inner'>
                    <div className='contact-section-main-inner-left' data-aos='fade-up' data-aos-duration='1100'>
                      <h3>We will be in touch Shortly</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.{' '}
                      </p>
                      <div className='contact-info'>
                        <div className='contact-info-inner'>
                          <div className='contact-info-inner-icon'>
                            <img src='/images/map-img-contact.png' alt='img'></img>
                          </div>
                          <div className='contact-info-right'>
                            <h4>Address</h4>
                            <p>44 Rue de l’Industrie, L-8069 Luxembourg</p>
                          </div>
                        </div>
                        <div className='contact-info-inner'>
                          <div className='contact-info-inner-icon'>
                            <img src='/images/cell-info-icon.png' alt='img'></img>
                          </div>
                          <div className='contact-info-right'>
                            <h4>Phone Number</h4>
                            <p>+352 661522484</p>
                          </div>
                        </div>
                        <div className='contact-info-inner'>
                          <div className='contact-info-inner-icon'>
                            <img src='/images/email-info-icon.png' alt='img'></img>
                          </div>
                          <div className='contact-info-right'>
                            <h4>Email Address</h4>
                            <p>info@koncierge.lu</p>
                          </div>
                        </div>
                        <div className='contact-info-inner'>
                          <div className='contact-info-inner-icon'>
                            <img src='/images/calendar-info.png' alt='img'></img>
                          </div>
                          <div className='contact-info-right'>
                            <h4>Working Days / Hours</h4>
                            <p>Mon - Sun / 8:00AM - 9:00AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='contact-section-main-inner-right' data-aos='fade-up' data-aos-duration='1100'>
                      <div className='contact-section-main-inner-right-inner'>
                        <h2>Send us a Message</h2>
                        <form>
                          <div className='form-two'>
                            <div className='form-group'>
                              <input type='text' placeholder='User Name'></input>
                            </div>
                            <div className='form-group'>
                              <input type='email' placeholder='Email Address'></input>
                            </div>
                          </div>
                          <div className='form-two'>
                            <div className='form-group'>
                              <input type='text' placeholder='Phone Number'></input>
                            </div>
                            <div className='form-group'>
                              <input type='text' placeholder='Zip Code'></input>
                            </div>
                          </div>
                          <div className='form-two'>
                            <div className='form-group'>
                              <input type='text' placeholder='City'></input>
                            </div>
                            <div className='form-group'>
                              <input type='text' placeholder='Region'></input>
                            </div>
                          </div>
                          <div className='form-two'>
                            <div className='form-group'>
                              <input type='text' placeholder='Country'></input>
                            </div>
                            <div className='form-group'>
                              <input type='text' placeholder='Address 1'></input>
                            </div>
                          </div>
                          <div className='form-group'>
                            <textarea placeholder='Comments'></textarea>
                          </div>
                          <button className='common-btn btn'>Submit</button>
                        </form>
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

export default Contact;
