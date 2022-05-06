import { useSWRConfig } from "swr";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

import { supabase } from "../supabaseClient";

type Link = {
  id: number;
  link: string;
};

const useLinks = (
  id: string | string[] | undefined
): {
  insertLink: (link: string) => Promise<PostgrestSingleResponse<any>>;
} => {
  const key = `/images/${id}/links`;
  const { mutate } = useSWRConfig();

  const insertLink = async (link: string) => {
    const resp = await supabase
      .from("links")
      .insert([{ image_id: id, link }])
      .single();

    mutate(
      key,
      (items: Link[]) => {
        return [...items, resp.data];
      },
      { revalidate: false }
    );
    return resp;
  };

  return {
    insertLink,
  };
};

export default useLinks;
