"use client";
import { getData } from "@/utils/storage";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = ({ onToggleSidebar, isSidebarOpen, isLogin }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false); // New state for scroll detection

  const isHomePage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname == "/resetPassword" ||
    pathname == "/forgotPassword";

  useEffect(() => {
    const user = getData("user");
    if (user) {
      setUserAuth(user?.token);
    }
  }, []);

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

  return (
    <>
      <div
        className={`common-header ${isScrolled ? 'scrolled' : ''}`} // Conditionally add 'scrolled' class
        // data-aos="fade-down"
        // data-aos-duration="1100"
      >
        <div className='common-container'>
          <div className='common-header-inner'>
            <div className='header-left'>
              <Link href='/'>
                <img src='/images/logo.svg' alt='logo' className='logo-defailt' />
                <img src='/images/webLogo.png' alt='logo' className='logo-fixed' />
              </Link>
            </div>
            <div className='header-right'>
              <ul>
                <li>
                  <button onClick={() => router.push('/home')}>
                    <a className={pathname === '/home' ? 'text-[#006b20]' : ''}>Home</a>
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/about')}>
                    <a className={pathname === '/about' ? 'text-[#006b20]' : ''}>About</a>
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/ourServices')}>
                    <a className={pathname === '/ourServices' ? 'text-[#006b20]' : ''}>Our Services</a>
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/portfolio')}>
                    <a className={pathname === '/portfolio' ? 'text-[#006b20]' : ''}>Portfolio</a>
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/contactUs')}>
                    <a className={pathname === '/contactUs' ? 'text-[#006b20]' : ''}>Contact</a>
                  </button>
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
                      <svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
                  {userAuth !== null ? (
                    <Image
                      src='/images/chat-profile.svg'
                      alt='User Avatar'
                      width={40}
                      height={40}
                      className='rounded-full cursor-pointer'
                      onClick={() => router.push('/dashboard')}
                    />
                  ) : (
                    <button onClick={() => router.push('/getStarted')} className='header-btn'>
                      Login
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
