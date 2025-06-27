"use server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export const handlenoteboxdata = async (id: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("Notes")
    .select("note_id,title,description")
    .eq("id", id);

  if (error) {
    console.log(error.message);
    redirect("/error");
  }
  return data;
};

export const handledeletenote = async (
  id: number,
  noteid: number,
  Notecounts: number
) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("Notes")
    .delete()
    .match({ note_id: noteid, id: id });

  if (error) {
    console.log(error.message);
    redirect("/error");
  }
  const { error: updateerror } = await supabase
    .from("User")
    .update({ Notecount: Number(Notecounts) - 1 })
    .eq("id", id);

  if (error) {
    console.log(updateerror);
    redirect("/error");
  }
  return true;
};
