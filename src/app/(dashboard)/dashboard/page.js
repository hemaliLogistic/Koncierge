"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../components/NavBar/global.css";
import Navbar from "../../../components/NavBar/NavBar";
import "./global.css";
import { useTranslation } from "next-i18next";
import Loader from "@/components/Loader";
import DataTableComponent from "@/components/DataTable";
import { Button, IconButton } from "@material-tailwind/react";
import PaginationComponent from "@/components/Pagination";
import {
  allBookingAction,
  getBookingCountAction,
} from "@/redux/Dashboard/action";
import { toast } from "react-toastify";
import useToaster from "@/hooks/useToaster";
import { useDispatch } from "react-redux";
import { TOAST_ALERTS } from "@/constants/keywords";
import { getMessaging, onMessage } from "firebase/messaging";
import useFcmToken from "@/hooks/useFcmToken";
import firebaseApp from "@/utils/Firebase/firebase";

const UserDashBoard = () => {
  const { t } = useTranslation("common");
  const [totalBooking, setTotalBooking] = useState("10");
  const [pendingBooking, setPendingBooking] = useState("4");
  const [completedBooking, setCompletedBooking] = useState("15");
  const [upcomingBooking, setUpcomingBooking] = useState("100");
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = React.useState(1);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [appointmentData, setAppointmentData] = useState([]);
  const [bookingCount, setBookingCount] = useState("10");
  // const totalPages = 15; // Adjust this as per your requirement
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // console.log("ABCDEFGHI");

  useEffect(() => {
    // getAllBookingData();
    console.log("fcmToken-=-=", fcmToken);
  }, [fcmToken]);

  useEffect(() => {
    getAllBookingData();
    getBookingCount();
  }, []);

  useEffect(() => {
    getAllBookingData();
  }, [currentPage]);

  const getAllBookingData = async () => {
    setIsLoading(true);
    const bookingParam = {
      page: currentPage,
      limit: 5,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    console.log("bookingParam-=", bookingParam);
    try {
      const res = await dispatch(allBookingAction(bookingParam));

      if (res.meta.requestStatus === "fulfilled") {
        if (res.payload.status) {
          // setTimeout(() => {
          setIsLoading(false);
          // }, 1000);
          setAppointmentData(res?.payload?.data?.serviceList);
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

  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePageChange = (page) => {
    console.log("page=-=-=", page);

    setCurrentPage(page);
    // getAllBookingData();
    // Handle your data fetching or state update logic here
  };
  console.log("FCM token:", appointmentData);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const getBookingCount = async () => {
    try {
      console.log("hello");
      const res = await dispatch(getBookingCountAction());

      console.log("res-=-=-=-", res);

      if (res.meta.requestStatus === "fulfilled") {
        if (res.payload.status) {
          console.log("hello123");

          // setIsLoading(false);
          setBookingCount(res?.payload?.data);
        } else {
          // setIsLoading(false);
          toast.error(res.payload.message);
        }
      } else {
        // setIsLoading(false);
        toast.error(res.error.message || res.payload.message);
      }
    } catch (error) {
      // setIsLoading(false);

      toast.error(TOAST_ALERTS.ERROR_MESSAGE);
      console.log("Error", error);
    }
  };
  return (
    <>
      <div className='main-container-div'>
        <div className='dashboard-view'>
          <div className='total-booking'>
            <div className='column-view '>
              <div>
                <h3 className='title-text'>{t("TotalBookings")}</h3>
              </div>
              <div className='calendar-div'>
                <p className='booking-text'>
                  {bookingCount?.totalBookingCount}
                </p>
                <img src='/images/calendarAll.png' className='w-8 h-8' />
              </div>
            </div>
          </div>
          <div className='upcoming-booking'>
            <div className='column-view '>
              <div>
                <h3 className='title-text'>{t("UpcomingBookings")}</h3>
              </div>
              <div className='calendar-div'>
                <p className='booking-text'>
                  {bookingCount?.upcomingBookingCount}
                </p>
                <img src='/images/calendar.png' className='w-8 h-8' />
              </div>
            </div>
          </div>
          <div className='pending-booking'>
            <div className='column-view '>
              <div>
                <h3 className='title-text'>{t("PendingBookings")}</h3>
              </div>
              <div className='calendar-div'>
                <p className='booking-text'>
                  {bookingCount?.expiredBookingCount}
                </p>
                <img src='/images/calendarPending.png' className='w-8 h-8' />
              </div>
            </div>
          </div>

          <div className='completed-booking'>
            <div className='column-view '>
              <div>
                <h3 className='title-text'>{t("CompletedBookings")}</h3>
              </div>
              <div className='calendar-div'>
                <p className='booking-text'>
                  {bookingCount?.completedBookingCount}
                </p>
                <img src='/images/taskComplete.png' className='w-8 h-8' />
              </div>
            </div>
          </div>
        </div>
        <div className='main-table-div'>
          {/* {!isLoading && ( */}
          <>
            <div className='content-border'>
              <h1 className='main-table-title'>{t("AllList")}</h1>
            </div>
            <div className='main-table-column'>
              {/* {appointmentData?.length > 0 ? ( */}
              <>
                <div className='table-div-content cursor-pointer'>
                  <DataTableComponent
                    data={appointmentData}
                    isLoading={isLoading}
                    isPayment={false}
                    page={currentPage}
                  />
                </div>
                {appointmentData?.length > 0 && (
                  <div className='pagination-div'>
                    <PaginationComponent
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
              {/* ) : (
                  <div className='flex h-44 justify-center items-center'>
                    <p className='font-Jost text-[22px] font-normal'>
                      No Bookings Found
                    </p>
                  </div>
                )} */}
            </div>
          </>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default UserDashBoard;
