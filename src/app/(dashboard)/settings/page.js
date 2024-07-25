"use client";

import React, { useEffect, useState } from "react";
import "../../../components/NavBar/global.css";
import "./global.css";
import Navbar from "../../../components/NavBar/NavBar";
import Modal from "@/components/Modal/Modal";
import { useTranslation } from "next-i18next";

const Settings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation("common");

  const handlePassword = (oldPassword, password) => {
    console.log("asdad", typeof oldPassword, typeof password);
    if (
      typeof oldPassword === "string" &&
      oldPassword !== "" &&
      typeof password === "string" &&
      password !== ""
    ) {
      setIsModalVisible(false);
    }
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/* {/ <div className='p-4'> /}
        {/ <p>Setting</p> /} */}
      {/* <Link href='?modal=true'>
          <button type='button' className='bg-blue-500 text-white p-2'>
            Open Modal
          </button>
        </Link> */}

      <div className='settings-main-container'>
        <div className='settings-left-section'>
          <div className='flex items-center'>
            <div className='setting-box-shadow flex'>
              <div className='flex-grow'>
                <p className='user-name'>User Name</p>
                <p className='user-description'>User</p>
                <div className='setting-icon-container'>
                  <img
                    src='/images/key.svg'
                    alt='Import'
                    className='setting-icon-img'
                  />
                  <button
                    onClick={() => setIsModalVisible(true)}
                    className='setting-icon-text'>
                    Change Password
                  </button>
                </div>
              </div>
              {/* <div className="setting-image-container">
                  <input type="file" /><img src="/images/import-image.svg" alt="Import" className="setting-image-element" />
                </div> */}
              <div className='setting-image-container'>
                <input
                  type='file'
                  accept='image/*'
                  id='imageUpload'
                  className='hidden'
                />
                <label htmlFor='imageUpload' className='image-upload-label'>
                  <img
                    src='/images/import-image.svg'
                    alt='Import'
                    className='setting-image-element'
                  />
                </label>
              </div>
            </div>
          </div>

          <div className='chat-btn-container'>
            <p className='chat-btn-text'>Chat</p>
          </div>
        </div>

        <div className='settings-right-section'>
          <div className='setting-box-shadow'>
            <div className='editprofile-header-container '>
              <p className='editprofile-header-text'>Edit Profile</p>
            </div>

            <div className='setting-horizontal-divider'></div>

            <form>
              <div className='setting-input-container'>
                <input
                  type='text'
                  placeholder='User Name'
                  className='setting-input-field'
                />
              </div>

              <div className='setting-input-container flex flex-col lg:flex-row gap-7'>
                <input
                  type='text'
                  placeholder='Email Address'
                  className='setting-input-field'
                />
                <input
                  type='text'
                  placeholder='Phone Number'
                  className='setting-input-field'
                />
              </div>

              <div className='setting-input-container'>
                <input
                  type='text'
                  placeholder='Address'
                  className='setting-input-field'
                />
              </div>

              {/* <div className="setting-input-container">
                <input type="text" placeholder="Role" className="setting-input-field"/>
              </div> */}

              <div className='setting-input-container relative'>
                <select className='select-input'>
                  <option value='admin' selected>
                    Role
                  </option>
                  <option value='editor'>Editor</option>
                  <option value='viewer'>Viewer</option>
                </select>
                <span className='absolute right-10 top-[25px]'>
                  <img src='/images/drop-down-icon.svg' />
                </span>
              </div>

              <div className='setting-horizontal-divider mt-[30px]'></div>

              <div className='buttons-container'>
                <button className='button-update'>Update Profile</button>
                <button className='button-cancel'>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        <Modal
          isOpen={isModalVisible}
          handleClose={() => handleClose()} // disable handleClose
          handlePassword={(oldPassword, newPassword) => {
            console.log("olddd---", oldPassword, newPassword);
            handlePassword(oldPassword, newPassword);
          }}
          description={"Change Password"}
          leftButton={"Save"}
          rightButton={"Cancel"}
          isChangePassword={true}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
      {/* {/ </div> /} */}
    </>
  );
};

export default Settings;
