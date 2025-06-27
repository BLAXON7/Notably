"use client";
import React, { useEffect, useState } from "react";
import { handledeletenote, handlenoteboxdata } from "./handlenoteboxdata";
import { useFetchData } from "@/fetch_Data_query/useFetchData";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NoteType = {
  title: string | null;
  description: string | null;
  note_id: number;
};

export const Noteboxpage = () => {
  const userdata = useFetchData();
  const [selectedNote, setselectedNode] = useState<NoteType | null>(null);
  const [Notes, setNotes] = useState<NoteType[]>([]);

  const openModal = (note: NoteType) => {
    setselectedNode(note);
  };

  const closeModal = () => {
    setselectedNode(null);
  };

  const deleteupdate = async () => {
    if (!userdata?.id || !selectedNote?.note_id) return;

    const check = await handledeletenote(
      userdata?.id,
      selectedNote.note_id,
      userdata?.Notecount
    );

    if (check) {
      setNotes((prevNotes) =>
        prevNotes.filter(
          (note: NoteType) => note.note_id !== selectedNote.note_id
        )
      );
      closeModal();
    }
  };

  useEffect(() => {
    if (!userdata?.id) return;

    const fetcher = async () => {
      const data = await handlenoteboxdata(userdata.id);
      setNotes(data);
    };

    fetcher();
  }, [userdata?.id]);

  if (!userdata?.id || Notes.length === 0) {
    return (
      <div className="flex justify-center items-center mt">
        <p className="text-emerald-300 text-xl animate-pulse">
          Loading your notes...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center text-center overflow-x-hidden no-scrollbar ">
      <div>
        <p className="mt-8 text-center text-emerald-100 drop-shadow-md text-4xl font-bold">
          Notes Box
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-x-16 md:gap-x-32 md:gap-y-10 mt-10">
          {Notes.map((note, noteIndex) => (
            <Card
              onClick={() => openModal(note)}
              key={noteIndex}
              className="w-[80px] h-[80px] sm:w-[80px] sm:h-[80px] md:w-[150px] md:h-[150px] backdrop-blur-md bg-emerald-500/20 border-emerald-300/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer flex items-center justify-center"
            >
              <CardContent className="flex items-center justify-center text-center p-2">
                <h3 className="text-xs sm:text-sm md:text-xl font-bold text-emerald-100 group-hover:text-emerald-200 transition-colors duration-300">
                  {note.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedNote && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-sm sm:max-w-md md:max-w-2xl backdrop-blur-md bg-emerald-500/30 border-emerald-300/50 rounded-2xl shadow-2xl overflow-y-auto relative max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white transition-colors duration-200 z-10"
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-8 flex flex-col items-center">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-emerald-100 mb-4 text-center">
                  {selectedNote.title}
                </h2>

                <div className="text-emerald-200 leading-relaxed text-sm sm:text-base text-start w-full max-h-48 overflow-y-auto overflow-x-hidden whitespace-pre-line break-words pr-2 emerald-scrollbar">
                  {selectedNote.description}
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6">
                <div className="border-t border-emerald-300/30 pt-6 flex items-center justify-center text-center">
                  <Button
                    onClick={() => deleteupdate()}
                    className="bg-slate-800 hover:bg-emerald-300 hover:text-emerald-950"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Noteboxpage;
