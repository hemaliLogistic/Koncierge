"use client";

import React, { useEffect, useState } from "react";
import "../../../components/NavBar/global.css";
import CommonPageblock from "@/components/styles/common.style";
import Link from "next/link";
import "./global.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { serviceByMainCategoryListAction } from "@/redux/Home/action";
import { TOAST_ALERTS } from "@/constants/keywords";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { getData, saveData } from "@/utils/storage";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import AOS from 'aos';
import 'aos/dist/aos.css';
const OurService = () => {
    const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);
    const categoryData = useSelector((state) => state?.homeApi?.categoryData);

    let [apiData, setApiData] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const [checkedState, setCheckedState] = useState({});
    const [checkedData, setCheckedData] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const savedCheckedState = getData("checkedState");
        if (savedCheckedState) {
            setCheckedState(savedCheckedState);
        }
    }, []);

    const handleCheckboxChange = (serviceId, isChecked, service) => {
        if (isChecked) {
            // Deselect all other services when one is selected
            const newCheckedState = Object.keys(checkedState).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});

            newCheckedState[serviceId] = true;  // Select the current checkbox

            setCheckedState(newCheckedState);  // Update state to reflect only one selection
            setCheckedData([service]);  // Update selected services
        } else {
            setCheckedState((prevState) => ({
                ...prevState,
                [serviceId]: false,
            }));
            setCheckedData([]);
        }
    };

    console.log("checkedData===>", checkedData[[0]]);

    const handleBookNowClick = (category) => {
        console.log("hello");
        saveData("checkedFormData", checkedData[0]);
        saveData("Bookingid", category.id);
        router.push(`/bookService/${category.id}`);
    };
    const [currentPage, setCurrentPage] = useState(1);

    const handleTabClick = (index, category) => {
        setSelectedTabIndex(index);

        // Clear the previous checked state and checked data when switching main services
        setCheckedState({});
        setCheckedData([]);
    };

    const GetServices = async (categoryId) => {
        const param = {
            page: currentPage,
            limit: 20,
            mainCatId: categoryId,
        };
        setIsLoading(true);
        try {
            const data = await dispatch(serviceByMainCategoryListAction(param));
            if (data) {
                setIsLoading(false);
                setApiData(data?.payload?.data);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(TOAST_ALERTS.ERROR_MESSAGE);
            console.log("Error", error);
        }
    };

    useEffect(() => {
        if (categoryData.length > 0) {
            GetServices(categoryData[selectedTabIndex].id);
        }
    }, [selectedTabIndex, categoryData]);

    useEffect(() => {
        AOS.init({
            once: false,
            offset: 50
        });
    }, []);

    return (
        <>
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
                                    Our Services
                                </h1>
                                <p data-aos='fade-up' data-aos-duration='1100'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='our-services-block'>
                    <div className='common-container'>
                        <div className='common-title' data-aos='fade-up' data-aos-duration='1100'>
                            <div className='common-title-inner'>
                                <h2>Services</h2>
                                <h5>Koncierge</h5>
                            </div>
                            <h3>Services We Provide</h3>
                        </div>
                        <div className='react-custom-tabs'>
                            <div className='react-custom-tabs-left'>
                                <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => handleTabClick(index, categoryData[index])}>
                                    <TabList>
                                        {categoryData.length > 0 ? (
                                            categoryData.map((category, index) => (
                                                <Tab key={category.id || index}>
                                                    <div className='tabs-link-block' data-aos='fade-up' data-aos-duration='1100'>
                                                        <h2>{String(index + 1).padStart(2, '0')}</h2>
                                                        <h3>{category?.categoryName}</h3>
                                                        <div className='tabs-link-block-hover'>
                                                            <img
                                                                src={category?.fullImagePath || '/images/about-img.png'}
                                                                alt={category?.categoryName}
                                                            />
                                                        </div>
                                                    </div>
                                                </Tab>
                                            ))
                                        ) : (
                                            <p>No categories available.</p>
                                        )}
                                    </TabList>

                                    {categoryData.map((category, index) => (
                                        <TabPanel key={category.id || index}>
                                            {apiData && apiData.length > 0
                                                ? apiData.map((service) => (
                                                    <div
                                                        className='tab-content-block'
                                                        data-aos='fade-up'
                                                        data-aos-duration='1100'
                                                        key={service.id}
                                                    >
                                                        <div className='tab-content-block-inner'>
                                                            <div className='tab-content-block-inner-left'>
                                                                <h2>{service?.serviceName}</h2>
                                                                <p>{service?.description}</p>
                                                                <div className='checkbox-custom'>
                                                                    <div className='checkbox-custom-inner'>
                                                                        <input
                                                                            className='styled-checkbox'
                                                                            id={`styled-checkbox-${service.id}`}
                                                                            type='checkbox'
                                                                            checked={checkedState[service.id] || false}
                                                                            onChange={(e) => handleCheckboxChange(service.id, e.target.checked, service)}
                                                                            disabled={!service.is_available}  // Disable if not available
                                                                        />
                                                                        <label htmlFor={`styled-checkbox-${service.id}`}></label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='tab-content-block-inner-right'>
                                                                <img src={service?.fullImagePath} alt={service?.serviceName} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                                : !isLoading && (
                                                    <>
                                                        {console.log('No services available for this category.')}
                                                        <p>No services available for this category.</p>
                                                    </>
                                                )}
                                            <div
                                                className='total-cost-block justify-center items-center'
                                                data-aos='fade-up'
                                                data-aos-duration='1100'>
                                                <button
                                                    onClick={() => handleBookNowClick(category)}
                                                    className='common-btn'
                                                    disabled={checkedData.length === 0} // Disable if no services are selected
                                                    passHref
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                        </TabPanel>
                                    ))}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </CommonPageblock>
            {isLoading && <Loader isAuth={true} />}
        </>
    );
};

export default OurService;
