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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const onSubmit = async (values: FieldValues) => {
    try {
      await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });
      setLoadingMessage("Check your email!");
    } catch (error) {
      setLoadingMessage("");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const changePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <Container mt={"12rem"}>
      <>
        {loadingMessage ? (
          <Text>We have sent you an email. Please chek your email!</Text>
        ) : (
          <>
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
                      <EyeOff
                        cursor={"pointer"}
                        onClick={changePasswordVisibility}
                      />
                    ) : (
                      <Eye
                        cursor={"pointer"}
                        onClick={changePasswordVisibility}
                      />
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
          </>
        )}
        <>
          <Center>
            {loading && (
              <Spinner
                thickness="6px"
                speed="0.65s"
                emptyColor={"gray.200"}
                color={"blue.500"}
                size={"xl"}
              />
            )}
          </Center>
        </>
      </>
    </Container>
  );
};

export default Login;
