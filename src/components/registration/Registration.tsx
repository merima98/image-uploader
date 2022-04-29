import {
  Box,
  Button,
  Container,
  Text,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Registration = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: any) => {};

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.firstName}>
          <Input
            placeholder="First name"
            {...register("firstName", {
              required: "Fist name is required field!",
              minLength: {
                value: 2,
                message: "First name must have at least two letters!",
              },
            })}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.lastName}>
          <Input
            placeholder="Last name"
            {...register("lastName", {
              required: "Last name is required field!",
              minLength: {
                value: 2,
                message: "Last name must have at least two letters!",
              },
            })}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <Input
            placeholder="Email"
            {...register("email", {
              required: "Email is required field!",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <Input
            placeholder="Password"
            {...register("password", {
              required: "Password is required field!",
              minLength: {
                value: 2,
                message: "Password must have at least two letters!",
              },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button w={"100%"} type="submit">
          Register
        </Button>
      </form>
      <Box>
        <Text>
          Already have an account? <Link to={"/"}>Login</Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Registration;
