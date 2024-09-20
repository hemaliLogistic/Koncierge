import React from "react";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
// import "react-loader-spinner/dist/";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loader({ isAuth }) {
  return (
    <div
      className={`h-full z-10 bg-black bg-opacity-30 ${
        isAuth ? "fixed top-0 left-0 right-0 bottom-0" : ""
      }`}>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='bg-transparent p-4 rounded-lg'>
          <ThreeDots
            visible={true}
            height='80'
            width='80'
            color={isAuth ? "#F6F6F6" : "#00591B"}
            radius='9'
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            wrapperClass=''
          />
        </div>
      </div>
    </div>
  );
}
