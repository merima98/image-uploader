import useSWR, { useSWRConfig } from "swr";
import { and, map } from "ramda";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

import { supabase } from "../supabaseClient";

type ImageCollection = {
  id: number;
  name: string;
  created_at: string;
};

const useCollection = (
  id: number | undefined
): {
  collection: ImageCollection;
  isLoading: boolean;
  error: Error;
  updateCollection: (values: {
    name?: string;
  }) => Promise<PostgrestSingleResponse<any>>;
} => {
  const key = `/images/${id}`;
  const { data, error } = useSWR(id ? key : null, () => getCollection());
  const { mutate } = useSWRConfig();

  const getCollection = async () => {
    const resp = await supabase
      .from("images")
      .select(`id, name`)
      .eq("id", id)
      .single();
    if (resp.error) {
      throw resp.error;
    }
    if (resp.data) {
      return resp.data;
    }
  };

  const updateCollection = async (values: { name?: string }) => {
    const resp = await supabase.from("images").update(values).eq("id", id);
    mutate(
      key,
      (current: ImageCollection) => {
        return { ...current, ...values };
      },
      { revalidate: false }
    );
    mutate(
      "/images",
      (current: ImageCollection[]) => {
        return map((item) => {
          if (item.id === Number(id)) {
            return {
              ...item,
              ...values,
            };
          }
          return item;
        }, current);
      },
      { revalidate: false }
    );
    return resp;
  };

  return {
    collection: data || {},
    isLoading: and(!error, !data),
    error,
    updateCollection,
  };
};

export default useCollection;
