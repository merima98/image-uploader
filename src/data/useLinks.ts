import useSWR, { useSWRConfig } from "swr";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

import { supabase } from "../supabaseClient";

type Link = {
  id: number;
  link: string;
};

const useLinks = (
  id: string | string[] | undefined
): {
  links: Link[];
  insertLink: (link: string) => Promise<PostgrestSingleResponse<any>>;
} => {
  const key = `/collections/${id}/links`;
  const { data } = useSWR(id ? key : null, () => getLinks());
  const { mutate } = useSWRConfig();

  const getLinks = async () => {
    const response = await supabase
      .from("links")
      .select(`id, link`)
      .eq("image_id", id)
      .order("id", { ascending: false });

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data;
    }
  };

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
    links: data || [],
    insertLink,
  };
};

export default useLinks;
