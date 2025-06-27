"use server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export const handlenewnote = async (
  id: number,
  title: string,
  description: string,
  Notecounts: number
) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("Notes")
    .insert({ id, title, description })
    .single();

  if (error) {
    console.log(error.message);
    redirect("/error");
  }

  const { error: updateerror } = await supabase
    .from("User")
    .update({ Notecount: Number(Notecounts) + 1 })
    .eq("id", id);

  if (error) {
    console.log(updateerror);
    redirect("/error");
  }

  redirect("/home/notebox");
};
