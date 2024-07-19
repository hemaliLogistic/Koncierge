import React from "react";
import { ThreeCircles } from "react-loader-spinner";
// import "react-loader-spinner/dist/";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loader() {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-30'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='bg-transparent p-4 rounded-lg'>
          <ThreeCircles
            visible={true}
            height='100'
            width='50'
            color='#F6F6F6'
            ariaLabel='three-circles-loading'
            wrapperStyle={{}}
            wrapperClass=''
          />
        </div>
      </div>
    </div>
  );
}
