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
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Registration = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const changePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      setLoading(true);
      setLoadingMessage("Check your email!");
    } catch (error) {
      console.error(error);
      setLoadingMessage("");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container mt={"12rem"}>
      <>
        {loadingMessage ? (
          <Text>We have sent you an email. Please check your email!</Text>
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
              <Button w={"100%"} type="submit" mb={2}>
                Register
              </Button>
            </form>
            <Box textAlign={"center"}>
              <Text mb={5}>
                Already have an account? <Link to={"/"}>Login</Link>
              </Text>
            </Box>
          </>
        )}
      </>
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
    </Container>
  );
};

export default Registration;
