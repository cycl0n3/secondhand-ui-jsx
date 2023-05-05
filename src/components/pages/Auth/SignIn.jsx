import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required")
});

const ErrorLabel = ({ children }) => (
  <Text color={"red.500"}>{children}</Text>
);

const SignIn = () => {

  return (
    <Flex
      minH={"20vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>

      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <Stack spacing={4}>
            <Formik initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={SignInSchema}
            >
              {(props) => (
                <Form>
                  <FormControl id="email">
                    <Field type="email" name="email">
                      {({ field, form }) => (<>
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" />
                        <ErrorMessage name="email" component={ErrorLabel} />
                      </>)}
                    </Field>
                  </FormControl>
                  <FormControl id="password">
                    <Field type="password" name="password">
                      {({ field, form }) => (<>
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" />
                        <ErrorMessage name="password" component={ErrorLabel} />
                      </>)}
                    </Field>
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}>
                      <Checkbox disabled>Remember me</Checkbox>
                    </Stack>
                    <Button type={"submit"}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500"
                      }}>
                      Sign in
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
