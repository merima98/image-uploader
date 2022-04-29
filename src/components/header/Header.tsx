import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
} from "@chakra-ui/react";

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
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Center>
  );
};

export default Header;
