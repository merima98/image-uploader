import {
  Box,
  Button,
  Container,
  Text,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const onSubmit = (values: any) => {};
  const changePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <Container mt={"12rem"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} mb={2}>
          <Input
            placeholder="Email"
            type={"email"}
            {...register("email", {
              required: "Email is required field!",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password} mb={2}>
          <InputGroup>
            <Input
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              {...register("password", {
                required: "Password is required field!",
                minLength: {
                  value: 2,
                  message: "Password must have at least two letters!",
                },
              })}
            />
            <InputRightElement>
              {isPasswordVisible ? (
                <EyeOff cursor={"pointer"} onClick={changePasswordVisibility} />
              ) : (
                <Eye cursor={"pointer"} onClick={changePasswordVisibility} />
              )}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button w={"100%"} type="submit">
          Login
        </Button>
      </form>
      <Box textAlign={"center"}>
        <Text>
          Do not have an account? <Link to={"/register"}>Register</Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Login;
