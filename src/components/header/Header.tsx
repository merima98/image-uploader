import { Breadcrumb, Box, BreadcrumbItem, Center } from "@chakra-ui/react";

const Header = () => {
  return (
    <Center mb={4}>
      <Breadcrumb
        p={4}
        backgroundColor={"white"}
        position={"fixed"}
        w={"100%"}
        top={"0"}
      >
        <BreadcrumbItem>
          <Box mb={2}>Home</Box>
        </BreadcrumbItem>
      </Breadcrumb>
    </Center>
  );
};

export default Header;
