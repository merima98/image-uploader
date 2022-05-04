import {
  Box,
  Grid,
  Menu,
  MenuButton,
  Text,
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
  useToast,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { ChevronDown, Settings, LogOut, Plus } from "react-feather";
import { useEffect, useState } from "react";

import { supabase } from "../../supabaseClient";
import useImages from "../../data/useImages";
import SingleImage from "../images/SingleImage";
import SingleImageDetails from "../images/SingleImageDetails";

type ImageCollection = {
  id: number;
  name: string;
};
const Home = () => {
  const {
    imageCollections,
    deleteImageCollection,
    error,
    insertImageCollectionCollection,
    isLoading,
  } = useImages();

  const [imageData, setData] = useState<any>();

  const childToParent = (data: ImageCollection) => {
    setData(data);
  };
  const [images, setImages] = useState<ImageCollection[]>([]);
  const toast = useToast();
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
    const getImageCollections = async () => {
      return imageCollections;
    };

    getImageCollections().then((res) => {
      setImages(res);
    });
  }, [imageCollections, images, imageData]);

  const getProfile = async () => {
    const user = supabase.auth.user();
    setEmail(user?.email);
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      const user = supabase.auth.user();
      const updates = {
        id: user?.id,
        firstname: values.firstname,
        lastname: values.lastname,
        email: user?.email,
        username: values.username,
      };

      await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewCollection = async () => {
    const response = await insertImageCollectionCollection();
    if (response.error) {
      toast({
        title: "Collection of images is not created.",
        description: "Unfortunately you did not create collection of images.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (response.data) {
      toast({
        title: "You have successfully created collection of images.",
        description: "Congrats, you have created collection of images.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid templateColumns={"1fr 2fr"} height={"100vh"}>
      <Box mt={"3rem"} borderRight={"1px solid"} borderColor={"gray.200"}>
        <Box mb={4}>
          <Menu>
            <MenuButton
              w={"100%"}
              p={2}
              as={Button}
              rightIcon={<ChevronDown />}
            >
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
        </Box>
        <Box
          p={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Text>Image collection</Text>
          <Text cursor={"pointer"} onClick={handleNewCollection}>
            <Plus />
          </Text>
        </Box>
        <Box>
          {images.map((image) => {
            return (
              <SingleImage
                childToParent={childToParent}
                key={image.id}
                image={image}
              />
            );
          })}
        </Box>
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
                    <FormControl mb={2} isInvalid={errors.firstname}>
                      <Input
                        placeholder="First name"
                        {...register("firstname", {
                          required: "First name is required field!",
                          minLength: {
                            value: 2,
                            message:
                              "First name must have at least two characters!",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.firstname && errors.firstname.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mb={2} isInvalid={errors.lastname}>
                      <Input
                        placeholder="Last name"
                        {...register("lastname", {
                          required: "Lasr name is required field!",
                          minLength: {
                            value: 2,
                            message:
                              "Last name must have at least two characters!",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.lastname && errors.lastname.message}
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
      <Box mt={"3rem"}>
        <SingleImageDetails name={imageData?.name} id={imageData?.id} />
      </Box>
    </Grid>
  );
};

export default Home;
