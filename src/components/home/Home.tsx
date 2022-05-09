import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useImages from "../../data/useImages";
import SingleImageDetails from "../images/SingleImageDetails";

type ImageCollection = {
  id: number;
  name: string;
};
const Home = () => {
  const { imageCollections } = useImages();

  const [images, setImages] = useState<ImageCollection[]>([]);

  useEffect(() => {
    const getImageCollections = async () => {
      return imageCollections;
    };

    getImageCollections().then((res) => {
      setImages(res);
    });
  }, [imageCollections, images]);

  return (
    <Box mt={"3rem"}>
      <SingleImageDetails />
    </Box>
  );
};

export default Home;
