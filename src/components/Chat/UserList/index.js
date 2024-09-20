"use client";

import React, { useEffect, useState } from "react";
import "../../../components/NavBar/global.css";
import "../../../app/(dashboard)/settings-chat/global.css";
import Navbar from "../../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/Chat/ChatSlice";
import { getChatListAction } from "@/redux/Chat/action";

const UserList = ({ chatIdRef }) => {
    const dispatch = useDispatch();
    const chatUserList = useSelector((state) => state?.chatApi?.chatUserList);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [filteredUserList, setFilteredUserList] = useState([]);

    useEffect(() => {
        GetChatUserList();
    }, [currentPage]);

    useEffect(() => {
        // Filter the user list based on the search term
        if (searchTerm) {
            const filteredUsers = chatUserList?.data?.filter((user) =>
                user.adminName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUserList(filteredUsers);
        } else {
            setFilteredUserList(chatUserList?.data);
        }
    }, [searchTerm, chatUserList]);

    const GetChatUserList = async () => {
        try {
            await dispatch(
                getChatListAction({
                    page: currentPage,
                    limit: 5,
                })
            );
        } catch (error) {
            console.error("Error", error);
        }
    };

    const handleUserClick = (message) => {
        chatIdRef.current = message?.id;
        dispatch(setSelectedUser(message));
    };

    return (
        <div className="settings-chat-left-section">
            <div className="setting-box-shadow h-[640px] max-lg:h-[175px] overflow-auto">
                <div className="settings-chat-search-input-container">
                    <div className="search-container">
                        <input
                            type="text"
                            className="settings-chat-search-input"
                            placeholder="Search Here......"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                        <span className="settings-search-icon">
                            <img src="/images/search-icon.svg" />
                        </span>
                    </div>
                </div>

                <div className="mt-10">
                    {filteredUserList?.map((message) => (
                        <div key={message.id} className="cursor-pointer" onClick={() => handleUserClick(message)}>
                            <div className="flex mt-[20px]">
                                <div className="relative flex">
                                    <img
                                        src={
                                            message?.adminProfile
                                                ? `${message.adminProfile}`
                                                : "/images/chat-profile.svg"
                                        }
                                        className="settings-chat-profile-image"
                                    />
                                    {message?.isUserOnline ? (
                                        <img src="/images/Ellipse179.svg" className="profile-active-icon" />
                                    ) : null}
                                </div>
                                <div className="message-detail-container">
                                    <p className="message-username">{message.adminName}</p>
                                    {message?.typeOfMessage !== "text" ? (
                                        <p className="message-text">media</p>
                                    ) : (
                                        <p className="message-text">{message?.message}</p>
                                    )}
                                </div>

                                <div className="time-detail-container">
                                    <p className="time-text">{message.timeText}</p>
                                    <p className="message-count">{message.unreadCount}</p>
                                </div>
                            </div>
                            <div className="horizontal-line"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;
