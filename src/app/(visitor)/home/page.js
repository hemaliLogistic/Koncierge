"use client";

import { removeData } from "@/utils/storage";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CommonPageblock from "@/components/styles/common.style";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomePage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    // <></>
    <CommonPageblock>
      <div className='common-header'>
        <div className='common-container'>
          <div className='common-header-inner'>
            <div className='header-left'>
              <Link href='/'>
                <img src='/images/logo.svg' alt='logo' />
              </Link>
            </div>
            <div className='header-right'>
              <ul>
                <li>
                  <Link href='/'>Home</Link>
                </li>
                <li>
                  <Link href='/'>About</Link>
                </li>
                <li>
                  <Link href='/'>Our Services</Link>
                </li>
                <li>
                  <Link href='/'>Portfolio</Link>
                </li>
                <li>
                  <Link href='/'>Contact</Link>
                </li>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                  }}
                  className='dropdown-header'>
                  <div className='dropdown-header-inner'>
                    <div className='dropdown-header-inner-link'>
                      <span>English</span>
                      <svg
                        width='12'
                        height='8'
                        viewBox='0 0 12 8'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M0.862831 2.97877L4.90267 7.49047C5.51098 8.16984 6.49365 8.16984 7.10196 7.49047L11.1418 2.97877C12.1245 1.88133 11.4226 0 10.0344 0H1.95468C0.566472 0 -0.119832 1.88133 0.862831 2.97877Z'
                          fill='white'
                        />
                      </svg>
                    </div>
                    {showDropdown && (
                      <div className='dropdown-header-inner-link-open'>
                        <ul>
                          <li>
                            <Link href='/'>English</Link>
                          </li>
                          <li>
                            <Link href='/'>Abc</Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/getStarted")}
                    className='header-btn'>
                    Login
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='common-page'>
        <div className='main-banner'>
          <div className='common-container'>
            <div className='main-banner-text'>
              <h3>Welcome to Koncierge</h3>
              <h1>Home Management Service</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <button className='common-btn btn'>Book Now</button>
            </div>
          </div>
        </div>
        <div className='about-section common-padding'>
          <div className='common-container'>
            <div className='about-section-flex'>
              <div className='about-section-flex-left'>
                <div className='common-title'>
                  <div className='common-title-inner'>
                    <h2>About</h2>
                    <h5>Who we Are</h5>
                  </div>
                  <h3>Home Management </h3>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.{" "}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className='common-btn-about'>
                  <Link href='/' className='common-btn'>
                    Know More
                  </Link>
                </div>
              </div>
              <div className='about-section-flex-right'>
                <div className='about-block-flex'>
                  <div className='top-img'>
                    <img src='/images/about-img.png' alt='about' />
                  </div>
                  <div className='top-img-contact'>
                    <p>Contact</p>
                    <Link href='/'>+91 1234567890</Link>
                  </div>
                </div>
                <div className='about-block-flex'>
                  <div className='top-img'>
                    <img src='/images/about-img.png' alt='about' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='care-section common-padding'>
          <div className='common-container'>
            <div className='care-section-inner'>
              <div className='care-section-text'>
                <h2>Expert Care For Your Home</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
                <div className='care-section-text-link'>
                  <Link href='/' className='common-btn'>
                    Know More
                  </Link>
                </div>
              </div>
              <div className='team-block-inner'>
                <div className='team-block-inner-block'>
                  <h2>60 +</h2>
                  <p>Team Member</p>
                </div>
                <div className='team-block-inner-block'>
                  <h2>20 +</h2>
                  <p>Complete Project</p>
                </div>
                <div className='team-block-inner-block'>
                  <h2>90 +</h2>
                  <p>Client Review</p>
                </div>
                <div className='team-block-inner-block'>
                  <h2>10 +</h2>
                  <p>Company Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='service-section common-padding'>
          <div className='common-container'>
            <div className='common-title mb-custom-60'>
              <div className='common-title-inner'>
                <h2>Services</h2>
                <h5>What We Offer</h5>
              </div>
              <h3>Koncierge Services</h3>
            </div>
            <div className='service-section-main'>
              <div className='service-section-inner'>
                <div className='service-section-inner-block'>
                  <div className='service-section-text'>
                    <h3>Cleaning & Maintenance</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua Ut enim ad minim veniam.
                    </p>
                    <Link href='/' className='common-btn'>
                      Book Now
                    </Link>
                  </div>
                </div>
                <div className='service-section-inner-block'>
                  <div className='service-section-text'>
                    <h3>Moving & Coordination</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua Ut enim ad minim veniam.
                    </p>
                    <Link href='/' className='common-btn'>
                      Book Now
                    </Link>
                  </div>
                </div>
                <div className='service-section-inner-block'>
                  <div className='service-section-text'>
                    <h3>Renovation & Handyman</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua Ut enim ad minim veniam.
                    </p>
                    <Link href='/' className='common-btn'>
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className='services-block-btn'>
                <button className='common-btn'>See All Service</button>
              </div>
            </div>
          </div>
        </div>
        <div className='portfolio-section common-padding pad-top-none'>
          <div className='common-container'>
            <div className='common-title mb-custom-60'>
              <div className='common-title-inner'>
                <h2>Portfolio</h2>
                <h5>Our Work</h5>
              </div>
              <h3>Koncierge Gallery</h3>
            </div>
          </div>
          <div className='portfolio-slider'>
            <div className='portfolio-slider-inner'>
              <Slider {...settings}>
                <div>
                  <div className='portfolio-slider-inner-block'>
                    <div className=''></div>
                  </div>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
                <div>
                  <h3>5</h3>
                </div>
                <div>
                  <h3>6</h3>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </CommonPageblock>
  );
};

export default HomePage;
