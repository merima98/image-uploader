import { Box, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type ImageCollection = {
  image: {
    id: number;
    name: string;
  };
};

const SingleImage = (prop: ImageCollection) => {
  const navigation = useNavigate();
  const showSingleImageDetails = () => {
    navigation(`/collection/${prop.image.id}`);
  };
  return (
    <Tooltip label="Click here to see collection!">
      <Box cursor={"pointer"} p={2} onClick={showSingleImageDetails}>
        {prop.image.name}
      </Box>
    </Tooltip>
  );
};

export default SingleImage;
