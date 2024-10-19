"use client";

import React, { useEffect, useState } from "react";
import "./global.css";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setFooterBookNowButton } from "@/redux/Home/HomeSlice";
import Link from 'next/link'
const Footer = () => {
    const path = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    const [showFooter, setShowFooter] = useState(false);

    const visitorPages = [
        "/",
        "/home",
        "/about",
        "/bookService",
        "/contactUs",
        "/ourServices",
        "/portfolio",
    ];

    useEffect(() => {
        if (visitorPages.some((page) => path === page)) {
            setShowFooter(true);
        }
    }, []);

    return (
        <div
            className="common-footer "
            data-aos="fade-up"
            data-aos-duration="1100"
            style={{ paddingTop: showFooter ? "190px" : "0px" }}
        >
            {/* dashborad-footer aa class add karajo jyare dashboad footer ave tyare */}
            {showFooter && (
                <div className="newsleeter-custom">
                    <div className="common-container">
                        <div className="newsleeter-custom-inner">
                            <div className="newsleeter-custom-inner-left">
                                <img src="/images/email-icon.png" alt="email" />
                            </div>
                            <div className="newsleeter-custom-inner-right">
                                <h2>Subscribe to our Newsletter</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.{" "}
                                </p>
                                <div className="form-group">
                                    <input type="email" placeholder="Email Address"></input>
                                    <button className="common-btn btn">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer
                className={`bg-black33 text-white `}
                style={{ paddingTop: showFooter ? "300px" : "0px" }}
            >
                <div className="px-4 py-12 flex justify-between  flex-col lg:flex-row mx-5 lg:mx-20 xl:mx-32">
                    <div className="w-full lg:w-1/3 mb-8 sm:mb-0 flex flex-col justify-start lg:mx-5">
                        <div className="">
                            <img
                                className="w-72 h-24"
                                src="/images/logoWhite.png"
                                alt="text"
                            />
                            <div className="w-[80%]">
                                <p className="mt-4 font-Jost text-[20px]">
                                    {
                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                                    }
                                </p>
                            </div>
                            <div className="flex mt-5 space-x-4 items-center">
                                <img className="w-6 h-6" src="/images/twitter.png" />
                                <img className="w-6 h-5" src="/images/facebook.png" />
                                <img className="w-6 h-6" src="/images/instagram.png" />
                                <img className="w-6 h-6" src="/images/youtube.png" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col lg:w-2/3">
                        <div className="flex w-full lg:w-full mb-8 lg:mb-0  justify-between mx-0 sm:mt-5">
                            <div className="w-[60%] sm:w-[100%] flex justify-start">
                                <h3 className="text-[20px] lg:text-[30px] font-Jost font-semibold">
                                    Are You Interested in our Services?
                                </h3>
                            </div>
                            <div className="flex justify-end w-[40%]">
                                <button
                                    onClick={() => {
                                        router.push("/ourServices");
                                        dispatch(setFooterBookNowButton(true));
                                    }}
                                    className="px-6 py-2 border-titleColor border hover:bg-green-700 text-white font-jost justify-end"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                        <div className="lg:flex hidden justify-between mt-20">
                            <div className="flex flex-col ">
                                <h4 className="text-[25px] font-Jost font-semibold">
                                    Quick Links
                                </h4>
                                <div className="h-[2px] w-[50%] bg-green00 my-1"></div>
                                <ul className="mt-4 space-y-2 text-[18px] font-Jost">
                                    <li>
                                        <Link href="/ourServices">Book Service</Link>
                                    </li>
                                    <li>
                                        <Link href="/terms">Terms of Service</Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-[25px] font-Jost font-semibold">Company</h4>
                                <div className="h-[2px] w-[50%] bg-green00 my-1"></div>
                                <ul className="mt-4 space-y-2 text-[18px] font-Jost">
                                    <li>
                                        <Link href="/about">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/ourServices">Our Services</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">Contact us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-[25px] font-Jost font-semibold">
                                    Contact Us
                                </h4>
                                <div className="h-[2px] w-[50%] bg-green00 my-1"></div>
                                <ul className="mt-4 space-y-2 text-[18px] font-Jost">
                                    <li>
                                        <a href="tel:1234567890">1234567890</a>
                                    </li>
                                    <li>
                                        <a href="mailto:abc@gmail.com">abc@gmail.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col lg:hidden">
                            <div className="flex space-x-12">
                                <div className="flex flex-col ">
                                    <h4 className="text-lg font-semibold">Quick Links</h4>
                                    <div className="h-[2px] w-[50%] bg-green00 my-1"></div>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        <li>
                                            <Link href="/ourServices">Book Service</Link>
                                        </li>
                                        <li>
                                            <Link href="/terms">Terms of Service</Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy">Privacy Policy</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-lg font-semibold">Company</h4>
                                    <div className="h-[2px] w-[50%] bg-green00 my-1"></div>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        <li>
                                            <Link href="/about">About Us</Link>
                                        </li>
                                        <li>
                                            <Link href="/ourServices">Our Services</Link>
                                        </li>
                                        <li>
                                            <Link href="/contactUs">Contact us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col mt-10 w-[25%]">
                                <h4 className="text-lg font-semibold">Contact Us</h4>
                                <div className="h-[2px] w-[50%] bg-green00 my-1"></div>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li>
                                        <a href="tel:1234567890">1234567890</a>
                                    </li>
                                    <li>
                                        <a href="mailto:abc@gmail.com">abc@gmail.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-green-700 text-center py-4">
                    <p className="text-sm">Copy right 2024 © ABC, All right reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
