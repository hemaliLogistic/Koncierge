"use client";

import { getData, removeData, saveData } from "@/utils/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommonPageblock from "@/components/styles/common.style";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { mainCategoryListAction } from "@/redux/Home/action";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryData } from "@/redux/Home/HomeSlice";
import { TOAST_ALERTS, TOAST_TYPES } from "@/constants/keywords";
import useToaster from "@/hooks/useToaster";
import { toast } from "react-toastify";
import Header from "@/components/header";
import AOS from 'aos';
import 'aos/dist/aos.css';
const HomePage = () => {
    // const userAuth = ;

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [userAuth, setUserAuth] = useState(null);

    const [visibleItems, setVisibleItems] = useState(3);
    const [seeAllData, setSeeAllData] = useState(false);

    const loadMoreItems = () => {
        setSeeAllData(true);
        setVisibleItems([]);
        getServiceListData();
        // setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
    };

    const { toaster } = useToaster();
    const dispatch = useDispatch();
    const categoryData = useSelector((state) => state?.homeApi?.categoryData);

    useEffect(() => {
        const user = getData("user");
        if (user) {
            setUserAuth(user?.token);
        }
        getServiceListData();
    }, []);

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500
    };

    const getServiceListData = async () => {
        setIsLoading(true);
        let param = {};
        if (!seeAllData) {
            param = {
                page: currentPage,
                limit: 20,
            };
        }

        try {
            const res = await dispatch(mainCategoryListAction(param));

            console.log("res-=-=-=-", res);

            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    setIsLoading(false);
                    setTotalPages(res?.payload?.data?.totalPages);
                } else {
                    setIsLoading(false);
                    toast.error(res.payload.message);
                }
            } else {
                setIsLoading(false);
                toast.error(res.error.message || res.payload.message);
            }
        } catch (error) {
            setIsLoading(false);

            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
            console.log("Error", error);
        }
    };

    const handleClick = (a) => {
        saveData("Bookingid", a.id);
    };

     useEffect(() => {
       AOS.init({
         once: false,
         offset: 50
       });
     }, []);

    //   const getServiceListData = async () => {};

    return (
      // <></>
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
                  Home Management Service
                </h1>
                <p data-aos='fade-up' data-aos-duration='1100'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                <button className='common-btn btn' data-aos='fade-up' data-aos-duration='1150'>
                  Book Now
                </button>
              </div>
            </div>
          </div>
          <div className='about-section common-padding'>
            <div className='common-container'>
              <div className='about-section-flex'>
                <div className='about-section-flex-left'>
                  <div className='common-title' data-aos='fade-up' data-aos-duration='1000'>
                    <div className='common-title-inner'>
                      <h2>About</h2>
                      <h5>Who we Are</h5>
                    </div>
                    <h3>Home Management </h3>
                  </div>
                  <p data-aos='fade-up' data-aos-duration='1100'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.{' '}
                  </p>
                  <p data-aos='fade-up' data-aos-duration='1100'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                  <p data-aos='fade-up' data-aos-duration='1100'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                  <div className='common-btn-about' data-aos='fade-up' data-aos-duration='1100'>
                    <Link href='/' className='common-btn'>
                      Know More
                    </Link>
                  </div>
                </div>
                <div className='about-section-flex-right' data-aos='fade-up' data-aos-duration='1100'>
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
                <div className='care-section-text' data-aos='fade-up' data-aos-duration='1100'>
                  <h2>Expert Care For Your Home</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
                  </p>
                  <div className='care-section-text-link'>
                    <Link href='/' className='common-btn'>
                      Know More
                    </Link>
                  </div>
                </div>
                <div className='team-block-inner' data-aos='fade-up' data-aos-duration='1100'>
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
              <div className='common-title mb-custom-60' data-aos='fade-up' data-aos-duration='1100'>
                <div className='common-title-inner'>
                  <h2>Services</h2>
                  <h5>What We Offer</h5>
                </div>
                <h3>Koncierge Services</h3>
              </div>
              <div className='service-section-main'>
                <div className='service-section-inner'>
                  {!seeAllData
                    ? categoryData.slice(0, visibleItems).map((a, i) => (
                        <div
                          className='service-section-inner-block'
                          data-aos='fade-up'
                          data-aos-duration='1100'
                          key={a.id}>
                          <div className='service-section-text'>
                            <img src={a?.fullImagePath || '/images/about-img.png'} alt={a?.categoryName} />
                            <h3>{a.categoryName}</h3>
                            <p>{a.description}</p>
                            <Link
                              href={`/bookService/${a.id}`}
                              onClick={() => handleClick(a)}
                              className='common-btn'
                              passHref>
                              Book Now
                            </Link>
                          </div>
                        </div>
                      ))
                    : categoryData.map((a, i) => (
                        <div
                          className='service-section-inner-block'
                          data-aos='fade-up'
                          data-aos-duration='1100'
                          key={a.id}>
                          <div className='service-section-text'>
                            <img src={a?.fullImagePath || '/images/about-img.png'} alt={a?.categoryName} />
                            <h3>{a.categoryName}</h3>
                            <p>{a.description}</p>
                            <Link
                              href={`/bookService/${a.id}`}
                              onClick={() => handleClick(a)}
                              className='common-btn'
                              passHref>
                              Book Now
                            </Link>
                          </div>
                        </div>
                      ))}
                </div>
                {!seeAllData && (
                  <div className='services-block-btn' data-aos='fade-up' data-aos-duration='1100'>
                    <button className='common-btn' onClick={loadMoreItems}>
                      See All Services
                    </button>
                  </div>
                )}
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
    );
};

export default HomePage;
