"use client";

import React, { useEffect, useState } from "react";
import "../../../components/NavBar/global.css";

import "./global.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getPrefrenceAction } from "@/redux/Dashboard/action";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { TOAST_ALERTS } from "@/constants/keywords";
import { useDispatch } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = () => {
    const lightness = Math.floor(Math.random() * 20 + 50);
    return `hsl(0, 0%, ${lightness}%)`;
};

const holdings = [
    { name: "INFY", percentage: "26.92%", color: getRandomColor() },
    { name: "TCS", percentage: "24.73%", color: getRandomColor() },
    { name: "HCLTECH", percentage: "9.66%", color: getRandomColor() },
    { name: "TECHM", percentage: "9.60%", color: getRandomColor() },
    { name: "WIPRO", percentage: "8.77%", color: getRandomColor() },
    { name: "Others", percentage: "19.76%", color: getRandomColor() },
];

const UserDashBoard = () => {
    const [bookings, setBookings] = useState([]);
    const [dataset, setDataSet] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getPrefrencesData();
    }, []);

    useEffect(() => {
        if (bookings && bookings.length > 0) {
            console.log("bookings-=-=", bookings);

            getDataSet();
        }
    }, [bookings]);

    const getDataSet = async () => {
        console.log("GET DATA SET", bookings);

        if (bookings && bookings.length > 0) {
            const data = {
                datasets: [
                    {
                        label: "% of Bookings",
                        data: await bookings.map((holding) => {
                            console.log("booking", holding);

                            const num = parseFloat(holding?.percentage);
                            return `${num}`;
                        }),
                        backgroundColor: holdings.map((holding) => holding.color),
                        borderColor: holdings.map((holding) => holding.color),
                        borderWidth: 1,
                    },
                ],
                labels: await bookings.map((holding) => holding?.serviceName),
            };
            console.log("Pie DATA-=", data);

            setDataSet(data);
        }
    };
    const getPrefrencesData = async () => {
        setIsLoading(true);

        try {
            const res = await dispatch(getPrefrenceAction({}));


            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload.status) {
                    let prefrences = [];
                    const data = res.payload.data?.preferences;
                    setIsLoading(false);
                    if (data.length > 0) {
                        prefrences = await data.map((item) => {
                            return { ...item, color: getRandomColor() };
                        });
                        // await getDataSet(prefrences);
                    }
                    setBookings(prefrences);
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

    return (
        <div className='prefrences-main-container'>
            <div className='prefrences-box-shadow'>
                <p className='prefrences-header'>Service Preferences</p>
                <div className='horizontal-divider'></div>
                <div className='prefrences-container'>
                    {/* <div className='prefrences-left-section'>
            <div className='selection-container'>
              <p className='selection-label'>Service Type</p>
              <select className='select-input'>
                <option value='admin' selected>
                  Service Type
                </option>
                <option value='editor'>Editor</option>
                <option value='viewer'>Viewer</option>
              </select>
              <span className='selection-image'>
                <img src='/images/drop-down-icon.svg' />
              </span>
            </div>

            <div className='mt-[20px] selection-container'>
              <p className='selection-label'>Service Type Name</p>
              <select className='select-input'>
                <option value='admin' selected>
                  Service Type Name
                </option>
                <option value='editor'>Editor</option>
                <option value='viewer'>Viewer</option>
              </select>
              <span className='selection-image'>
                <img src='/images/drop-down-icon.svg' />
              </span>
            </div>

            <div className='submit-btn-container'>
              <button className='submit-btn'>Submit</button>
            </div>
          </div> */}
                    {bookings && bookings.length > 0 ? (
                        <div className='prefrences-right-section w-full'>
                            <div className='flex w-[50%] bg-white justify-end items-center mr-20'>
                                {/* {/ <img src="/images/Pie.svg" className="service-chart-image" />  /} */}
                                <div className=''>
                                    {dataset?.datasets ? (
                                        <Pie data={dataset} className='service-chart-image' />
                                    ) : null}
                                </div>
                            </div>
                            <div className=' flex flex-col w-[50%] justify-start '>
                                <div className='bg-white shadow-lg w-[75%] p-10 rounded-lg'>
                                    <div className='flex mb-2 justify-between gap-20'>
                                        <span className='font-Jost text-[22px] font-semibold text-gray-500'>
                                            Top Services
                                        </span>
                                        <span className='font-Jost text-[22px] font-semibold text-gray-500'>
                                            % of Total Bookings
                                        </span>
                                    </div>
                                    <div className=' w-[100%]'>
                                        {bookings.length > 0 &&
                                            bookings.map((holding, index) => (
                                                <div
                                                    key={index}
                                                    className='flex justify-between items-center mb-2'>
                                                    <div className='flex items-center'>
                                                        <span
                                                            className='w-3 h-3 rounded-full mr-2'
                                                            style={{ backgroundColor: holding.color }}></span>
                                                        <span className='font-Jost text-[20px] font-normal'>
                                                            {holding.serviceName}
                                                        </span>
                                                    </div>
                                                    <span>{`${(
                                                        Math.round(parseFloat(holding.percentage) * 100) /
                                                        100
                                                    ).toFixed(2)} %`}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        !isLoading && (
                            <div className='flex h-44 justify-center items-center'>
                                <p className='font-Jost text-[22px] font-normal'>
                                    No payment records found. Once you make a payment, it will show up here
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
            {isLoading && <Loader />}
        </div>
    );
};

export default UserDashBoard;
