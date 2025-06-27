"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handlenewnote } from "./handlenewnote";
import { useFetchData } from "@/fetch_Data_query/useFetchData";

const NewNotePage = () => {
  const [title, setTitle] = useState("");
  const userdata = useFetchData();
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mt-8 text-center text-emerald-100 drop-shadow-lg text-4xl font-bold shadow-2xl">
        Create New Note
      </p>
      <div className="w-[50%] bg-emerald-700/60 mx-32 mt-16 p-5 rounded-xl backdrop-blur-xl shadow-2xl border border-emerald-200/20 flex-col">
        <div className="flex flex-col gap-8">
          <div>
            <label className="text-center text-emerald-100 drop-shadow-lg text-lg block mb-2">
              Title
            </label>
            <Input
              className="text-emerald-50"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-center text-emerald-100 drop-shadow-lg text-lg block mb-2">
              Description
            </label>
            <Input
              className="text-emerald-50"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button
            type="button"
            className="mt-3 bg-emerald-100 text-emerald-950 hover:bg-emerald-950 hover:text-emerald-100 active:bg-emerald-100 active:text-emerald-950"
            onClick={() => {
              handlenewnote(
                userdata?.id,
                title,
                description,
                userdata?.Notecount
              );
            }}
          >
            Create +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewNotePage;
