// src/app/page.js
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import HomePage from "./(visitor)/home/page";
// import GetStarted from "./(auth)/getStarted/page";
// import HomePage from "./(visitor)/home/page";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
