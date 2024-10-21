"use client";

import React, { useEffect, useState } from "react";
import "../../../components/NavBar/global.css";
import "../../../app/(dashboard)/settings-chat/global.css";
import Navbar from "../../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredUserList1, setSelectedUser } from "@/redux/Chat/ChatSlice";
import { getChatListAction } from "@/redux/Chat/action";

const UserList = ({ chatIdRef }) => {
  const dispatch = useDispatch();
  const chatUserList = useSelector((state) => state?.chatApi?.chatUserList);
  const filteredUserList = useSelector(
    (state) => state?.chatApi?.filteredUserList
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  // const [filteredUserList, setFilteredUserList] = useState([]);

  useEffect(() => {
    GetChatUserList();
  }, [currentPage]);

  useEffect(() => {
    // Filter the user list based on the search term
    if (searchTerm) {
      const filteredUsers = chatUserList?.data?.filter((user) =>
        user.adminName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // setFilteredUserList(filteredUsers);
      dispatch(setFilteredUserList1(filteredUsers));
    } else {
      // setFilteredUserList(chatUserList?.data);
      dispatch(setFilteredUserList1(chatUserList?.data));
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
      <div
        className="setting-box-shadow h-[640px] max-lg:h-[175px]  border border-gray-200  overflow-auto "
        style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)" }}
      >
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

        <div className="mt-4 ">
          {filteredUserList?.length > 0 && filteredUserList ? (
            <>
              {filteredUserList?.map((message) => {
                const isSelected = message.id === chatIdRef.current;
                const formattedDate = new Date(
                  message?.date
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                });

                return (
                  <div
                    key={message.id}
                    className={`cursor-pointer ${
                      isSelected ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleUserClick(message)}
                  >
                    <div
                      className={`flex pt-[20px]  ${
                        isSelected ? "!bg-gray-300" : ""
                      }`}
                    >
                      <div className="relative flex">
                        <img
                          src={
                            message?.adminProfile
                              ? `${message.adminProfile}`
                              : "/images/chat-profile.svg"
                          }
                          className="settings-chat-profile-image"
                        />
                        {/* {message?.isUserOnline ? (
                          <img
                            src="/images/Ellipse179.svg"
                            className="profile-active-icon"
                          />
                        ) : null} */}
                        {message?.isUserOnline ? (
                          <img
                            src="/images/Ellipse179.svg"
                            className="profile-active-icon"
                          />
                        ) : null}
                      </div>

                      <div className="message-detail-container">
                        <p
                          className={`message-username ${
                            isSelected ? "text-black" : ""
                          }`}
                        >
                          {message.adminName}
                        </p>
                        {message?.typeOfMessage !== "text" ? (
                          <p
                            className={`message-text ${
                              isSelected ? "text-black" : ""
                            }`}
                          >
                            media
                          </p>
                        ) : (
                          <p
                            className={`message-text ${
                              isSelected ? "text-black" : ""
                            }`}
                          >
                            {message?.message.length > 10
                              ? `${message.message.substring(0, 25)}...`
                              : message?.message}
                          </p>
                        )}
                      </div>

                      <div className="time-detail-container">
                        <p
                          className={`time-text  ${
                            isSelected ? "text-black" : ""
                          }`}
                        >
                          {formattedDate}
                        </p>
                        {message.unreadCount > 0 && (
                          <p className="message-count">{message.unreadCount}</p>
                        )}
                      </div>
                    </div>
                    <div className="horizontal-line"></div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-500px)] text-center">
              <h1 className="text-2xl font-bold text-black">
                {filteredUserList?.length === 0
                  ? "No profiles found"
                  : "No chats available"}
              </h1>
              <p className="text-lg text-gray-500 mt-2">
                {filteredUserList?.length === 0
                  ? "Try searching with a different name."
                  : "Once you make a booking and employees are assigned to your appointments, they will appear here for chat."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
