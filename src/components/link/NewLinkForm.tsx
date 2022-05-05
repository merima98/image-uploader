import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const NewLinkForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [isLinkModalOpen, setIsLinkMpdalOpen] = useState(false);
  const openLinkModal = () => {
    setIsLinkMpdalOpen(true);
  };
  const closeLinkModal = () => {
    setIsLinkMpdalOpen(false);
  };

  const onSubmit = async (values: FieldValues) => {
    console.log("Values from for are, ", values);
  };
  return (
    <Box>
      <Button onClick={openLinkModal}>Add new link</Button>
      <Modal isOpen={isLinkModalOpen} onClose={closeLinkModal}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent p={2}>
            <ModalHeader>Add new link into collection</ModalHeader>
            <ModalCloseButton />
            <FormControl mb={2} isInvalid={errors.url}>
              <Input
                placeholder="URL"
                {...register("url", {
                  required: "URL is required field!",
                  minLength: {
                    value: 2,
                    message: "URL name must have at least two characters!",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.url && errors.url.message}
              </FormErrorMessage>
            </FormControl>
            <ModalFooter>
              <Button
                colorScheme="blue"
                size={"xs"}
                mr={3}
                onClick={closeLinkModal}
              >
                Close
              </Button>
              <Button size={"xs"} colorScheme={"green"} type={"submit"}>
                Add new link into collection
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};

export default NewLinkForm;
