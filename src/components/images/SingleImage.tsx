import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useImages from "../../data/useImages";

type ImageCollection = {
  image: {
    id: number;
    name: string;
  };
  childToParent: any;
};

const SingleImage = (prop: ImageCollection) => {
  const [collectionName, setCollectionName] = useState("");
  useEffect(() => {
    console.log(
      "I am in use effect in single image component, ",
      prop.image.name
    );
    setCollectionName(prop.image.name);
  }, [prop.image, collectionName]);

  return (
    <Box
      cursor={"pointer"}
      p={2}
      onClick={() => prop.childToParent(prop.image)}
    >
      {collectionName}
    </Box>
  );
};

export default SingleImage;
