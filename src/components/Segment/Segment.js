"use client";

import Link from "next/link";
import "./global.css";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { removeData } from "@/utils/storage";
import { usePathname, useRouter } from "next/navigation";

const Segment = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const router = useRouter();
  const path = usePathname();
  const isActive = (pathName) => path === pathName;
  console.log("isActive--=-=-", path, isActive(path));

  const segments = {
    "/dashboard": { segment: "Dashboard", icon: "dashboard.png" },
    "/bookings": { segment: "Upcoming Bookings", icon: "upcoming.png" },
    "/service": { segment: "Past Services", icon: "service.png" },
    "/prefrences": { segment: "Preferences", icon: "prefrences.png" },
    "/history": { segment: "Payment History", icon: "review.png" },
    "/settings": { segment: "Settings", icon: "settings.png" },
  };

  useEffect(() => {
    if (segments[path]) {
      setSelectedSegment(segments[path].segment);
      setSelectedIcon(segments[path].icon);
    }
  }, [path]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isModalVisible &&
        !document.querySelector(".modal-content").contains(event.target)
      ) {
        setIsModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalVisible]);

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.clear();
    setIsModalVisible(false);
    removeData("user");
    router.push("/");
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='segment-container'>
      <div className='segment-nav'>
        <a
          href='/dashboard'
          className={`segment-link ${isActive("/dashboard") ? "active" : ""}`}>
          <img src='/images/dashboard.png' className='segment-icon' />
          <span className='segment-text'>Dashboard</span>
        </a>

        <a
          href='/bookings'
          className={`segment-link ${isActive("/bookings") ? "active" : ""}`}>
          <img src='/images/upcoming.png' className='segment-icon' />
          <span className='segment-text'>Upcoming Bookings</span>
        </a>

        <a
          href='/service'
          className={`segment-link ${isActive("/service") ? "active" : ""}`}>
          <img src='/images/service.png' className='segment-icon' />
          <span className='segment-text'>Past Services</span>
        </a>

        <a
          href='/prefrences'
          className={`segment-link ${isActive("/prefrences") ? "active" : ""}`}>
          <img src='/images/prefrences.png' className='segment-icon' />
          <span className='segment-text'>Preferences</span>
        </a>

        <a
          href='/history'
          className={`segment-link ${isActive("/history") ? "active" : ""}`}>
          <img src='/images/review.png' className='segment-icon' />
          <span className='segment-text'>Payment History</span>
        </a>

        <a
          href='/settings'
          className={`segment-link ${isActive("/settings") ? "active" : ""}`}>
          <img src='/images/settings.png' className='segment-icon' />
          <span className='segment-text'>Settings</span>
        </a>

        <button
          className='segment-link'
          onClick={() => setIsModalVisible(true)}>
          <img src='/images/logout.png' className='segment-icon' />
          <span className='segment-text'>Log out</span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className='mobile-segment'>
        <button
          className='mobile-segment-btn'
          onClick={() => setIsMobileDropdownVisible(!isMobileDropdownVisible)}>
          <div className='mobile-dropdown-view'>
            {selectedIcon && (
              <img
                className='segement-dropdown'
                src={`/images/${selectedIcon}`}
              />
            )}

            <p>{selectedSegment}</p>
          </div>
          <div className='mobile-dropdown-btn'>
            <img
              src='/images/down-drop-arrow.png'
              alt='downArrow'
              className='h-5 w-5'
            />
          </div>
        </button>
        {isMobileDropdownVisible && (
          <div className='mobile-segment-view'>
            <a
              href='/dashboard'
              onClick={() => {
                // setSelectedSegment("Dashboard");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("dashboard.png");
              }}
              className={`segment-link ${
                isActive("/dashboard") ? "active" : ""
              } mobile-segment-text-view `}>
              <img src='/images/dashboard.png' className='segment-icon' />
              <span className='segment-text'>Dashboard</span>
            </a>

            <a
              href='/bookings'
              onClick={() => {
                // setSelectedSegment("Upcoming Bookings");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("upcoming.png");
              }}
              className={`segment-link ${
                isActive("/bookings") ? "active" : ""
              } mobile-segment-text-view `}>
              <img src='/images/upcoming.png' className='segment-icon' />
              <span className='segment-text'>Upcoming Bookings</span>
            </a>

            <a
              href='/service'
              onClick={() => {
                // setSelectedSegment("Past Services");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("service.png");
              }}
              className={`segment-link ${
                isActive("/service") ? "active" : ""
              } mobile-segment-text-view `}>
              <img src='/images/service.png' className='segment-icon' />
              <span className='segment-text'>Past Services</span>
            </a>

            <a
              href='/prefrences'
              onClick={() => {
                // setSelectedSegment("Prefrences");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("prefrences.png");
              }}
              className={`segment-link ${
                isActive("/prefrences") ? "active" : ""
              } mobile-segment-text-view `}>
              <img src='/images/prefrences.png' className='segment-icon' />
              <span className='segment-text'>Preferences</span>
            </a>

            <a
              href='/history'
              onClick={() => {
                // setSelectedSegment("Payment History");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("review.png");
              }}
              className={`segment-link ${
                isActive("/history") ? "active" : ""
              } mobile-segment-text-view `}>
              <img src='/images/review.png' className='segment-icon' />
              <span className='segment-text'>Payment History</span>
            </a>

            <a
              href='/settings'
              onClick={() => {
                // setSelectedSegment("Settings");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("settings.png");
              }}
              className={`segment-link ${
                isActive("/settings") ? "active" : ""
              } mobile-segment-text-view `}>
              <img src='/images/settings.png' className='segment-icon' />
              <span className='segment-text'>Settings</span>
            </a>

            <button
              className='segment-link mobile-segment-text-view'
              onClick={() => setIsModalVisible(true)}>
              <img src='/images/logout.png' className='segment-icon' />
              <span className='segment-text'>Log out</span>
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalVisible}
        handleClose={handleClose}
        handleLogout={handleLogout}
        description={"Are you sure you want to LOG OUT?"}
        leftButton={"Yes"}
        rightButton={"No"}
      />
    </div>
  );
};

export default Segment;
