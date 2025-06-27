"use server";
import React from "react";
import { Navbar } from "../components/navbar";
import NewNotePage from "./components/NewNotePage";

const page = () => {
  return (
    <div className="gap-10 w-screen h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-700 flex flex-col">
      <Navbar />
      <NewNotePage />
    </div>
  );
};

export default page;
