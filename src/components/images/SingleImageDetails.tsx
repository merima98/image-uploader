import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown } from "react-feather";

import useImage from "../../data/useImage";
import useImages from "../../data/useImages";
import React from "react";

const SingleImageDetails = () => {
  const params = useParams();
  const toast = useToast();
  const navigation = useNavigate();
  const { onOpen } = useDisclosure();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateCollection, collection } = useImage(Number(params.id));
  const { deleteImageCollection } = useImages();
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const updateImageCollection = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const openAlertDialog = () => {
    setIsAlertDialogOpen(true);
  };

  const closeAlertDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const onSubmit = async (values: FieldValues) => {
    await updateCollection({ name: values.name });
    setIsModalOpen(false);
  };

  const deleteCollection = async () => {
    await deleteImageCollection(Number(params.id));
    navigation("/");
    toast({
      title: "Image collection deleted.",
      description: "You have deleted image collection.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      {collection.name ? (
        <Box display={"flex"}>
          <Menu>
            <MenuButton
              w={"100%"}
              p={2}
              mr={2}
              as={Button}
              rightIcon={<ChevronDown />}
            >
              {collection.name}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={onOpen}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Box onClick={updateImageCollection}>
                  Update image collection
                </Box>
                <>
                  <Modal isOpen={isModalOpen} onClose={onModalClose}>
                    <ModalOverlay />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <ModalContent>
                        <ModalHeader>
                          Update title of image collection
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <FormControl isInvalid={errors.name}>
                            <Input
                              placeholder="Content"
                              {...register("name", {
                                required: "This field is required!",
                              })}
                              defaultValue={collection.name}
                            />
                            <FormErrorMessage>
                              {errors.name && errors.name.message}
                            </FormErrorMessage>
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={onModalClose}
                          >
                            Close
                          </Button>
                          <Button type="submit">Save changes</Button>
                        </ModalFooter>
                      </ModalContent>
                    </form>
                  </Modal>
                </>
              </MenuItem>
              <MenuItem display={"flex"} justifyContent={"space-between"}>
                <Box onClick={openAlertDialog}>Delete image collection</Box>
                <AlertDialog
                  isOpen={isAlertDialogOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={closeAlertDialog}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete image collection
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        Are you sure? You want to delete this collection?
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button onClick={closeAlertDialog}>Cancel</Button>
                        <Button
                          colorScheme="red"
                          onClick={deleteCollection}
                          ml={3}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </MenuItem>
            </MenuList>
          </Menu>
          <Box>
            <Button>Add new link</Button>
          </Box>
        </Box>
      ) : (
        <Center mt={"12rem"}>Please select collection!</Center>
      )}
    </>
  );
};

export default SingleImageDetails;
