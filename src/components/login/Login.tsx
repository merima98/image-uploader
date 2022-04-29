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

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: any) => {};

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Login
        </Button>
      </form>
      <Box>
        <Text>
          Do not have an account? <Link to={"/register"}>Register</Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Login;
