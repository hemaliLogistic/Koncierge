"use client";

import { removeData } from "@/utils/storage";
import { useRouter } from "next/navigation";
import React from "react";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className='h-screen'>
      <div className='w-[98%] flex justify-end mr-10'>
        <button
          className='bg-themeColor text-white p-2 rounded-md'
          onClick={() => {
            // removeData("user");
            router.push("/getStarted");
          }}>
          Log In
        </button>
      </div>
      <div className='flex items-center justify-center m-auto h-[80%]'>
        <p className='text-themeColor font-Jost text-[25px]'>Home Page</p>
      </div>
    </div>
  );
};

export default HomePage;
