"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [language, setLanguage] = useState("English");
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // New state for scroll detection

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { t } = useTranslation("common");
  const windowSize = useWindowSize();
  const unreadNotificationCount = useSelector(
    (state) => state?.homeApi?.unreadNotificationCount
  );
  const profileData = useSelector((state) => state?.dashboardApi?.profileData);

  useEffect(() => {
    console.log("profileData", profileData);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuDropdown, showDropdown]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(windowSize.width < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  // Add event listener for scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className='nav-container'>
        {/* Logo */}
        <div className='nav-logo'>
          <img
            src='/images/webLogo.png'
            alt='Logo'
            className='nav-img-size'
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Navigation Links */}
        <div className='nav-links md:flex hidden'>
          <button onClick={() => router.push("/home")} className='nav-link'>
            {t("Home")}
          </button>
          <button onClick={() => router.push("/about")} className='nav-link'>
            {t("About")}
          </button>
          <button
            onClick={() => router.push("/ourServices")}
            className='nav-link'>
            {t("OurServices")}
          </button>
          <button
            onClick={() => router.push("/portfolio")}
            className='nav-link'>
            {t("Portfolio")}
          </button>
          <button
            onClick={() => router.push("/contactUs")}
            className='nav-link'>
            {t("Contact")}
          </button>
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
                      {t("English")}
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
                      {t("Spanish")}
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* User Avatar */}
          {profileData?.data?.fullImagePath ? (
            <div className='nav-avatar'>
              <Image
                src={profileData?.data?.fullImagePath}
                alt='User Avatar'
                width={32}
                height={32}
                className='w-10 h-10 rounded-full object-cover'
              />
            </div>
          ) : (
            <div className='nav-avatar'>
              <Image
                src='/images/chat-profile.svg'
                alt='User Avatar'
                width={32}
                height={32}
                className='rounded-full'
              />
            </div>
          )}

          {/* Notification Icon */}
          <button
            className='nav-notification relative'
            onClick={() => router.push("/notification")}>
            {unreadNotificationCount > 0 ? (
              <span className='absolute bottom-[10px] left-[8px] bg-themeColor text-white rounded-full h-3 w-3 font-Jost text-[10px] items-center justify-center flex p-[8px]'>
                {unreadNotificationCount}
              </span>
            ) : (
              ""
            )}

            <Image
              src='/images/bell.png'
              alt='Notification'
              width={20}
              height={20}
            />
          </button>
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
              {profileData?.data?.fullImagePath ? (
                <div className='nav-avatar'>
                  <Image
                    src={profileData?.data?.fullImagePath}
                    alt='User Avatar'
                    className='w-10 h-10 rounded-full object-cover'
                  />
                </div>
              ) : (
                <div className='nav-avatar'>
                  <Image
                    src='/images/chat-profile.svg'
                    alt='User Avatar'
                    width={40}
                    height={40}
                    className='rounded-full'
                  />
                </div>
              )}

              {unreadNotificationCount > 0 ? (
                <button
                  className='nav-notification relative'
                  onClick={() => router.push("/notification")}>
                  <span className='absolute bottom-[10px] left-[8px] bg-themeColor text-white rounded-full h-3 w-3 font-Jost text-[10px] items-center justify-center flex p-[8px]'>
                    {unreadNotificationCount}
                  </span>
                  <Image
                    src='/images/bell.png'
                    alt='Notification'
                    width={20}
                    height={20}
                  />
                </button>
              ) : (
                ""
              )}
            </div>

            <button
              onClick={() => router.push("/home")}
              className='mobile-menu-item'>
              {t("Home")}
            </button>
            <button
              onClick={() => router.push("/about")}
              className='mobile-menu-item'>
              {t("About")}
            </button>
            <button
              onClick={() => router.push("/ourServices")}
              className='mobile-menu-item'>
              {t("OurServices")}
            </button>
            <button
              onClick={() => router.push("/portfolio")}
              className='mobile-menu-item'>
              {t("Portfolio")}
            </button>
            <button
              onClick={() => router.push("/contactUs")}
              className='mobile-menu-item'>
              {t("Contact")}
            </button>

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
                        {t("English")}
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
                        {t("Spanish")}
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
