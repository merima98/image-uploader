import {
  Breadcrumb,
  Box,
  BreadcrumbItem,
  Text,
  Center,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Sun, Moon } from "react-feather";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("white", "gray.800");

  return (
    <Center mb={4}>
      <Breadcrumb
        p={4}
        backgroundColor={backgroundColor}
        position={"fixed"}
        w={"100%"}
        top={"0"}
      >
        <BreadcrumbItem>
          <Box mb={2}>Home</Box>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {colorMode === "light" ? (
            <Text cursor={"pointer"}>
              <Moon
                onClick={toggleColorMode}
                style={{ height: "20px", width: "20px" }}
              />
            </Text>
          ) : (
            <Text cursor={"pointer"}>
              <Sun
                onClick={toggleColorMode}
                style={{ height: "20px", width: "20px" }}
              />
            </Text>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
    </Center>
  );
};

export default Header;
