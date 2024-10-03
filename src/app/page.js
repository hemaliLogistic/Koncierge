// src/app/page.js
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import HomePage from "./(visitor)/home/page";
import Footer from "@/components/Footer";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "../utils/Firebase/firebase";
import useFcmToken from "@/hooks/useFcmToken";
// import GetStarted from "./(auth)/getStarted/page";
// import HomePage from "./(visitor)/home/page";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <HomePage />
      <Footer />
    </div>
  );
};

export default Home;
