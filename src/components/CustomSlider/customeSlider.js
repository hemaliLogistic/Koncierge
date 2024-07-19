"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../app/(auth)/login/global.css";

const CustomSlider = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const handleImagesLoaded = () => {
      setImagesLoaded(true);
    };

    const images = document.querySelectorAll(".slider-image-div");
    let loadedImagesCount = 0;
    console.log("images", images);
    console.log("images", images);

    let promises = [];
    images.forEach((img) => {
      const promise = new Promise((resolve) => {
        img.onload = () => {
          resolve();
        };
        img.src = img.src;
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      handleImagesLoaded();
    });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: true,

    appendDots: (dots) => (
      <div className='custom-dots-container'>
        <ul className='custom-dots'> {dots} </ul>
      </div>
    ),
    cssEase: "linear",
    beforeChange: (prevIndex, nextIndex) => {
      const images = document.querySelectorAll(".slider-image-div");
      images.forEach((img, index) => {
        if (index === nextIndex) {
          img.onload = () => {};
          img.src = `/images/property.png`;
          img.onload = () => {};
        } else if (index === prevIndex) {
          img.onload = () => {};
          img.src = `/images/property.png`;
          img.onload = () => {};
        }
      });
    },
  };

  return (
    <div className={imagesLoaded ? "" : "hidden"}>
      <Slider {...settings}>
        <div className='relative'>
          <img
            src='/images/property.png'
            className='slider-image-div'
            alt='Property'
          />
          <div className='slider-overlay-div'></div>
          <div className='text-content'>
            <h2 className='property-title'>All Home Management Services</h2>
            <p className='property-description'>
              Lorem ipsum dolor sit amet...
            </p>
          </div>
        </div>
        <div className='relative'>
          <img
            src='/images/property.png'
            className='slider-image-div'
            alt='Property'
          />
          <div className='slider-overlay-div'></div>
          <div className='text-content'>
            <h2 className='property-title'>All Home Management Services</h2>
            <p className='property-description'>
              Lorem ipsum dolor sit amet...
            </p>
          </div>
        </div>
        <div className='relative'>
          <img
            src='/images/property.png'
            className='slider-image-div'
            alt='Property'
          />
          <div className='slider-overlay-div'></div>
          <div className='text-content'>
            <h2 className='property-title'>All Home Management Services</h2>
            <p className='property-description'>
              Lorem ipsum dolor sit amet...
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default CustomSlider;
