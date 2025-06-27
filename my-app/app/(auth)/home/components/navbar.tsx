"use client";
import React from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "./handlelogout";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetchData } from "@/fetch_Data_query/useFetchData";

export const Navbar = () => {
  const userdata = useFetchData();
  return (
    <div className="gap-10  flex flex-col">
      <div className="flex justify-between p-3 items-center">
        <p className="text-xl font-bold text-white">Notably</p>
        <div className="flex gap-4 md:gap-6  md:ml-10 sm:ml-3 lg:ml-20 lg:gap-10 bg-emerald-800 rounded-xl px-4 py-1">
          <button
            onClick={() => redirect("/home/dashboard")}
            className="font-bold text-emerald-50 hover:text-emerald-300 transition-all duration-300 active:text-emerald-700"
          >
            Dashboard
          </button>
          <button
            onClick={() => redirect("/home/notebox")}
            className="font-bold text-emerald-50  hover:text-emerald-300 transition-all duration-300 active:text-emerald-700"
          >
            NoteBox
          </button>
          <button
            onClick={() => redirect("/home/createnotes")}
            className="font-bold text-emerald-50  hover:text-emerald-300 transition-all duration-300 active:text-emerald-700"
          >
            CreateNote
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            onClick={() => logout()}
            className="hover:cursor-pointer w-24 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
          >
            Logout
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="hidden sm:inline">
                  <AvatarImage
                    className="w-9 rounded-full border border-emerald-100"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{userdata?.Email}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
