import {
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ChevronDown } from "react-feather";

import useImage from "../../data/useImage";
import useImages from "../../data/useImages";

const SingleImageDetails = () => {
  const params = useParams();
  const { onOpen } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateCollection, collection } = useImage(Number(params.id));
  const { deleteImageCollection } = useImages();
  const [collectionName, setCollectionName] = useState("");
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  useEffect(() => {
    setCollectionName(collection.name);
  }, [setCollectionName, params.id, collection.name]);

  const updateImageCollection = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: FieldValues) => {
    await updateCollection({ name: values.name });
    setIsModalOpen(false);
    setCollectionName(values.name);
  };

  const deleteCollection = async () => {
    await deleteImageCollection(Number(params.id));
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
              {collectionName ? collectionName : collection.name}
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
                <Box onClick={deleteCollection}>Delete image collection</Box>
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
