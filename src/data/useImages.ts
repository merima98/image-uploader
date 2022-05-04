import useSWR, { useSWRConfig } from "swr";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { and, reject } from "ramda";

import { useSession } from "../hooks/useSession";
import { supabase } from "../supabaseClient";

type ImageCollection = {
  id: number;
  name: string;
};

const useImages = (): {
  imageCollections: ImageCollection[];
  isLoading: boolean;
  error: Error;
  insertImageCollectionCollection: (
    name?: string
  ) => Promise<PostgrestSingleResponse<any>>;
  deleteImageCollection: (id: number) => Promise<PostgrestSingleResponse<any>>;
} => {
  const session = useSession();
  const key = "/images";
  const { data, error } = useSWR(session?.user?.id ? key : null, () =>
    getImageCollection()
  );
  const { mutate } = useSWRConfig();

  const getImageCollection = async () => {
    const resp = await supabase
      .from("images")
      .select(`id, name`)
      .eq("user_id", session?.user?.id)
      .order("id", { ascending: false });
    if (resp.error) {
      throw resp.error;
    }
    if (resp.data) {
      return resp.data;
    }
  };

  const insertImageCollectionCollection = async (name = "Untitled") => {
    const resp = await supabase
      .from("images")
      .insert([{ user_id: session?.user?.id, name }])
      .single();
    mutate(
      key,
      (items: ImageCollection[]) => {
        return [...items, resp.data];
      },
      { revalidate: false }
    );
    mutate(
      `/images/${resp.data.id}`,
      () => {
        return { name };
      },
      { revalidate: false }
    );
    mutate(
      `/images/${resp.data.id}/links`,
      () => {
        return [];
      },
      { revalidate: false }
    );
    return resp;
  };

  const deleteImageCollection = async (id: number) => {
    await supabase.from("links").delete().eq("collection_id", id);
    const resp = await supabase.from("images").delete().eq("id", id).single();
    mutate(
      key,
      (items: ImageCollection[]) => {
        return reject(
          (item: ImageCollection) => item.id === resp.data.id,
          items
        );
      },
      { revalidate: false }
    );
    return resp;
  };

  return {
    imageCollections: data || [],
    isLoading: and(!error, !data),
    error,
    insertImageCollectionCollection,
    deleteImageCollection,
  };
};

export default useImages;
