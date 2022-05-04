import { Box } from "@chakra-ui/react";

type ImageCollection = {
  image: {
    id: number;
    name: string;
  };
  childToParent: any;
};

const SingleImage = (prop: ImageCollection) => {
  return (
    <Box
      cursor={"pointer"}
      p={2}
      onClick={() => prop.childToParent(prop.image)}
    >
      {prop.image.name}
    </Box>
  );
};

export default SingleImage;
