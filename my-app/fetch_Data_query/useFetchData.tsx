"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./fetchdataquery";

export const useFetchData = () => {
  const { data } = useQuery({
    queryFn: fetchUser,
    queryKey: ["userdata"],
  });

  return data;
};
