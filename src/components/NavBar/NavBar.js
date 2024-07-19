"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

const Navbar = () => {
  const [language, setLanguage] = useState("English");
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuDropdown, showDropdown]);

  useEffect(() => {
    const handleResize = () => {
      console.log("windowSize.width", windowSize.width);
      setIsMobile(windowSize.width < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  const handleOutsideClick = (event) => {
    if (
      menuDropdown &&
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      (!dropdownRef.current || !dropdownRef.current.contains(event.target))
    ) {
      setTimeout(() => {
        setMenuDropdown(false);
      }, 1000);
    } else if (
      showDropdown &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        {/* Logo */}
        <div className='nav-logo'>
          <img src='/images/webLogo.png' alt='Logo' className='nav-img-size' />
        </div>

        {/* Navigation Links */}
        <div className='nav-links md:flex hidden'>
          <a href='/home' className='nav-link'>
            Home
          </a>
          <a href='#' className='nav-link'>
            About
          </a>
          <a href='#' className='nav-link'>
            Our Services
          </a>
          <a href='#' className='nav-link'>
            Portfolio
          </a>
          <a href='#' className='nav-link'>
            Contact
          </a>
        </div>

        {/* Right Section */}
        <div className='nav-right'>
          {/* Language Dropdown */}
          <div className='relative'>
            <button
              ref={dropdownRef}
              className='nav-language-btn flex items-center'
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}>
              <div className='full-width'>
                <div className='btn-text-width'>
                  <text>{language}</text>
                </div>
                <div className='btn-icon-width'>
                  <img
                    src='/images/down-drop-arrow.png'
                    alt='downArrow'
                    className='drop-down-icon'
                  />
                </div>
              </div>
            </button>
            {showDropdown && (
              <div className='dropdown-box'>
                <ul className='py-0'>
                  <li className='dropdown-li'>
                    <a
                      href='#'
                      className={`block px-4 py-2 hover:bg-gray-100 ${
                        language === "English" ? "bg-gray-100" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage("English");
                        setShowDropdown(false);
                      }}>
                      English
                    </a>
                  </li>
                  <li className='dropdown-li'>
                    <a
                      href='#'
                      className={`block px-4 py-2 hover:bg-gray-100 ${
                        language === "Spanish" ? "bg-gray-100" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage("Spanish");
                        setShowDropdown(false);
                      }}>
                      Spanish
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className='nav-avatar'>
            <Image
              src='/images/userProfile.png'
              alt='User Avatar'
              width={32}
              height={32}
              className='rounded-full'
            />
          </div>

          {/* Notification Icon */}
          <div className='nav-notification relative'>
            <span className='absolute bottom-[10px] left-[8px] bg-themeColor text-white rounded-full h-3 w-3 font-Jost text-[10px] items-center justify-center flex p-[8px]'>
              99
            </span>
            <Image
              src='/images/bell.png'
              alt='Notification'
              width={20}
              height={20}
            />
          </div>
        </div>

        <div className='nav-menu-right'>
          <button
            ref={menuRef}
            onClick={(e) => {
              e.stopPropagation();
              setMenuDropdown(!menuDropdown);
            }}
            className='flex justify-center items-center'>
            <img
              src='/images/burger.png'
              alt='Logo'
              className='nav-menu-icon'
            />
          </button>
        </div>

        {isMobile && menuDropdown && (
          <div className='absolute top-20 right-0 bg-white rounded-md shadow-lg py-1 w-full'>
            <div className='flex w-[95%] justify-end space-x-2'>
              <div className='nav-avatar'>
                <Image
                  src='/images/userProfile.png'
                  alt='User Avatar'
                  width={40}
                  height={40}
                  className='rounded-full'
                />
              </div>

              {/* Notification Icon */}
              <div className='nav-notification relative'>
                <span className='absolute bottom-[22px] left-[10px] bg-themeColor text-white rounded-full h-3 w-3 font-Jost text-[10px] items-center justify-center flex p-[8px]'>
                  99
                </span>
                <Image
                  src='/images/bell.png'
                  alt='Notification'
                  width={25}
                  height={25}
                  className='mt-1'
                />
              </div>
            </div>

            <a href='#' className='mobile-menu-item'>
              Home
            </a>
            <a href='#' className='mobile-menu-item'>
              About
            </a>
            <a href='#' className='mobile-menu-item'>
              Our Services
            </a>
            <a href='#' className='mobile-menu-item'>
              Portfolio
            </a>
            <a href='#' className='mobile-menu-item'>
              Contact
            </a>

            <div className='relative flex m-0 sm:m-4'>
              <button
                className='nav-menu-language-btn flex justify-end items-center'
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}>
                <div className='full-width'>
                  <div className='btn-text-width'>
                    <text>{language}</text>
                  </div>
                  <div className='btn-icon-width'>
                    <img
                      src='/images/down-drop-arrow.png'
                      alt='downArrow'
                      className='drop-down-icon'
                    />
                  </div>
                </div>
              </button>
              {showDropdown && (
                <div className='dropdown-menu-box'>
                  <ul className='py-0'>
                    <li className='dropdown-li'>
                      <a
                        href='#'
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          language === "English" ? "bg-gray-100" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLanguage("English");
                          setShowDropdown(false);
                        }}>
                        English
                      </a>
                    </li>
                    <li className='dropdown-li'>
                      <a
                        href='#'
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          language === "Spanish" ? "bg-gray-100" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLanguage("Spanish");
                          setShowDropdown(false);
                        }}>
                        Spanish
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
