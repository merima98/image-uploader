import { Box } from "@chakra-ui/react";

type ImageCollection = {
  id: number;
  name: string;
};

const SingleImage = (prop: ImageCollection) => {
  return (
    <Box cursor={"pointer"} p={2}>
      {prop.name}
    </Box>
  );
};

export default SingleImage;
