import {
  Box,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  MenuList,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { ChevronDown, Settings, LogOut } from "react-feather";
import { useEffect, useState } from "react";

import { supabase } from "../../supabaseClient";

const Home = () => {
  const [email, setEmail] = useState<string | undefined>("");
  const signOut = () => {
    supabase.auth.signOut();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    getProfile();
  });

  const getProfile = async () => {
    const user = supabase.auth.user();
    setEmail(user?.email);
  };

  const onSubmit = (values: FieldValues) => {};

  return (
    <Grid templateColumns={"1fr 2fr"} height={"100vh"}>
      <Box mt={"3rem"} borderRight={"1px solid"} borderColor={"gray.200"}>
        <Menu>
          <MenuButton w={"100%"} p={2} as={Button} rightIcon={<ChevronDown />}>
            {email}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={onOpen}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box>Settings</Box>
              <Box>
                <Settings />
              </Box>
            </MenuItem>
            <MenuItem
              onClick={signOut}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box>Signout</Box>
              <Box>
                <LogOut />
              </Box>
            </MenuItem>
          </MenuList>
        </Menu>
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalContent>
                  <ModalHeader>Update your profile</ModalHeader>
                  <ModalBody>
                    <FormControl mb={2}>
                      <Input value={email} readOnly={true} disabled={true} />
                    </FormControl>
                    <FormControl mb={2} isInvalid={errors.firstName}>
                      <Input
                        placeholder="First name"
                        {...register("firstName", {
                          required: "First name is required field!",
                          minLength: {
                            value: 2,
                            message:
                              "First name must have at least two characters!",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.firstName && errors.firstName.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mb={2} isInvalid={errors.lastName}>
                      <Input
                        placeholder="Last name"
                        {...register("lastName", {
                          required: "Lasr name is required field!",
                          minLength: {
                            value: 2,
                            message:
                              "Last name must have at least two characters!",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.lastName && errors.lastName.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mb={2} isInvalid={errors.username}>
                      <Input
                        placeholder="Username"
                        {...register("username", {
                          required: "Username is required field!",
                          minLength: {
                            value: 2,
                            message:
                              "Username name must have at least two characters!",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.username && errors.username.message}
                      </FormErrorMessage>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={onClose}
                      size={"xs"}
                      colorScheme={"blue"}
                      mr={2}
                    >
                      Close
                    </Button>
                    <Button type="submit" size={"xs"} colorScheme={"green"}>
                      Save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </form>
            </ModalOverlay>
          </Modal>
        </>
      </Box>
      <Box mt={"12rem"}>right content</Box>
    </Grid>
  );
};

export default Home;
