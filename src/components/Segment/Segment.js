"use client";

import Link from "next/link";
import "./global.css";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { removeData } from "@/utils/storage";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";

const Segment = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const router = useRouter();
  const path = usePathname();
  const { t } = useTranslation("common");

  const isActive = (pathName) => path === pathName;
  //   console.log("isActive--=-=-", path, isActive(path));

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

  const handleLogout = async () => {
    console.log("Logged out");
    localStorage.clear();
    setIsModalVisible(false);
    removeData("user");
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="segment-container">
      <div className="segment-nav">
        <button
          onClick={() => router.push("/dashboard")}
          className={`segment-link ${isActive("/dashboard") ? "active" : ""}`}
        >
          <img src="/images/dashboard.png" className="segment-icon" />
          <span className="segment-text">{t("Dashboard")}</span>
        </button>

        <button
          onClick={() => router.push("/bookings")}
          className={`segment-link ${isActive("/bookings") ? "active" : ""}`}
        >
          <img src="/images/upcoming.png" className="segment-icon" />
          <span className="segment-text">{t("UpcomingBookings")}</span>
        </button>

        <button
          onClick={() => router.push("/service")}
          className={`segment-link ${isActive("/service") ? "active" : ""}`}
        >
          <img src="/images/service.png" className="segment-icon" />
          <span className="segment-text">{t("PastServices")}</span>
        </button>

        <button
          onClick={() => router.push("/prefrences")}
          className={`segment-link ${isActive("/prefrences") ? "active" : ""}`}
        >
          <img src="/images/prefrences.png" className="segment-icon" />
          <span className="segment-text">{t("Preferences")}</span>
        </button>

        <button
          onClick={() => router.push("/history")}
          className={`segment-link ${isActive("/history") ? "active" : ""}`}
        >
          <img src="/images/review.png" className="segment-icon" />
          <span className="segment-text">{t("PaymentHistory")}</span>
        </button>

        <button
          onClick={() => router.push("/settings-chat")}
          className={`segment-link ${
            isActive("/settings-chat") ? "active" : ""
          }`}
        >
          <img src="/images/MsgPng.png" className="segment-icon" />
          <span
            className={`segment-text ${
              isActive("/settings-chat") ? "active" : ""
            }`}
          >
            {t("Chat")}
          </span>
        </button>

        <button
          onClick={() => router.push("/settings")}
          className={`segment-link ${isActive("/settings") ? "active" : ""}`}
        >
          <img src="/images/settings.png" className="segment-icon" />
          <span className="segment-text">{t("Settings")}</span>
        </button>
        {/* 
        <button
          className="segment-link"
          onClick={() => setIsModalVisible(true)}
        >
          <img src="/images/logout.png" className="segment-icon" />
          <span className="segment-text">{t("Logout")}</span>
        </button> */}
      </div>

      {/* Mobile Dropdown */}
      <div className="mobile-segment">
        <button
          className="mobile-segment-btn"
          onClick={() => setIsMobileDropdownVisible(!isMobileDropdownVisible)}
        >
          <div className="mobile-dropdown-view">
            {selectedIcon && (
              <img
                className="segement-dropdown"
                src={`/images/${selectedIcon}`}
              />
            )}

            <p>{selectedSegment}</p>
          </div>
          <div className="mobile-dropdown-btn">
            <img
              src="/images/down-drop-arrow.png"
              alt="downArrow"
              className="h-5 w-5"
            />
          </div>
        </button>
        {isMobileDropdownVisible && (
          <div className="mobile-segment-view">
            <a
              href="/dashboard"
              onClick={() => {
                // setSelectedSegment("{t('Dashboard')}");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("dashboard.png");
              }}
              className={`segment-link ${
                isActive("/dashboard") ? "active" : ""
              } mobile-segment-text-view `}
            >
              <img src="/images/dashboard.png" className="segment-icon" />
              <span className="segment-text">{t("Dashboard")}</span>
            </a>

            <a
              href="/bookings"
              onClick={() => {
                // setSelectedSegment("{t('Upcoming Bookings')}");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("upcoming.png");
              }}
              className={`segment-link ${
                isActive("/bookings") ? "active" : ""
              } mobile-segment-text-view `}
            >
              <img src="/images/upcoming.png" className="segment-icon" />
              <span className="segment-text">{t("UpcomingBookings")}</span>
            </a>

            <a
              href="/service"
              onClick={() => {
                // setSelectedSegment("{t('PastServices')}");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("service.png");
              }}
              className={`segment-link ${
                isActive("/service") ? "active" : ""
              } mobile-segment-text-view `}
            >
              <img src="/images/service.png" className="segment-icon" />
              <span className="segment-text">{t("PastServices")}</span>
            </a>

            <a
              href="/prefrences"
              onClick={() => {
                // setSelectedSegment("Prefrences");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("prefrences.png");
              }}
              className={`segment-link ${
                isActive("/prefrences") ? "active" : ""
              } mobile-segment-text-view `}
            >
              <img src="/images/prefrences.png" className="segment-icon" />
              <span className="segment-text">{t("Preferences")}</span>
            </a>

            <a
              href="/history"
              onClick={() => {
                // setSelectedSegment("{t('PaymentHistory')}");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("review.png");
              }}
              className={`segment-link ${
                isActive("/history") ? "active" : ""
              } mobile-segment-text-view `}
            >
              <img src="/images/review.png" className="segment-icon" />
              <span className="segment-text">{t("PaymentHistory")}</span>
            </a>

            <a
              href="/settings"
              onClick={() => {
                // setSelectedSegment("{t('Settings')}");
                setIsMobileDropdownVisible(false);
                // setSelectedIcon("settings.png");
              }}
              className={`segment-link ${
                isActive("/settings") ? "active" : ""
              } mobile-segment-text-view `}
            >
              <img src="/images/settings.png" className="segment-icon" />
              <span className="segment-text">{t("Settings")}</span>
            </a>

            <button
              className="segment-link mobile-segment-text-view"
              onClick={() => setIsModalVisible(true)}
            >
              <img src="/images/logout.png" className="segment-icon" />
              <span className="segment-text">{t("Logout")}</span>
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
