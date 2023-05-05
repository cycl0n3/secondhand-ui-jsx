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

import {Link as ReactRouterLink} from "react-router-dom";

import * as Yup from "yup";

import { useToast } from '@chakra-ui/react';

import { SecondarySiteRoutes } from "../../_base/SiteRoutes.jsx";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required")
});

const ErrorLabel = ({ children }) => (
  <Text color={"red.500"}>{children}</Text>
);

const SignIn = () => {

  const toast = useToast();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            To enjoy all of our cool features ✌️
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
            onSubmit={async (values) => {
              const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
              await sleep(5000);

              toast({
                title: 'Account created. (' + values.email + '-' + values.password + ')',
                description: "We've created your account for you.",
                status: 'success',
                duration: 5000,
                isClosable: false,
              });
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
                      {/*<Checkbox disabled>Remember me</Checkbox>*/}
                    </Stack>
                    <Button
                      isLoading={props.isSubmitting}
                      loadingText='Submitting'
                      type={"submit"}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500"
                      }}>
                      Sign in
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      New user?
                      {/* insert space */}
                      <Text as={'span'} mx={1} />
                      <Link
                        to={SecondarySiteRoutes.find(route => route.key === "sign-up").path}
                        color={'blue.400'}
                        as={ReactRouterLink}>Sign Up</Link>
                    </Text>
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
