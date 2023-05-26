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
  useColorModeValue, Center
} from "@chakra-ui/react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { Link as ReactRouterLink, useLocation, useNavigate } from "react-router-dom";

import * as Yup from "yup";

import { useToast } from '@chakra-ui/react';

import { GuestRoutes, AuthRoutes, UserRoutes } from "../../base/SiteRoutes.jsx";

import { net } from "../../io/net.js";

import { UserContext } from "../../context/UserContext.jsx";

import { useContext } from "react";

import { FcGoogle } from "react-icons/fc";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required")
});

const ErrorLabel = ({ children }) => (
  <Text color={"red.500"}>{children}</Text>
);

const SignIn = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const dashboard_url = UserRoutes.find((route) => route.path === "/dashboard").path;

  const toast = useToast();
  const { user, setUserToLocalStorage } = useContext(UserContext);

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
            To enjoy all of our cool features ✌️ {user && user.email}
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
              // sleep for 2 seconds
              await new Promise(r => setTimeout(r, 2000));

              net.login(values.email, values.password).then((res) => {
                const user = res.data.user;
                
                const tokens = { 
                  accessToken: res.data['access_token'], 
                  refreshToken: res.data['refresh_token']
                };

                user.tokens = tokens;
                setUserToLocalStorage(user);

                toast({
                  title: 'Account login successful.',
                  status: 'success',
                  duration: 2500,
                  isClosable: false,
                });

                values.email = "";
                values.password = "";

                // navigate to dashboard
                navigate(dashboard_url);
              }).catch((err) => {
                console.log(err);
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
                        <Input {...field} type="email" disabled={props.isSubmitting} />
                        <ErrorMessage name="email" component={ErrorLabel} />
                      </>)}
                    </Field>
                  </FormControl>
                  <FormControl id="password">
                    <Field type="password" name="password">
                      {({ field, form }) => (<>
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" disabled={props.isSubmitting} />
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
                  <Stack spacing={10} py={5}>
                    {/* Google */}
                    <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
                      <Center>
                        <Text>Sign in with Google</Text>
                      </Center>
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      New user?
                      {/* insert space */}
                      <Text as={'span'} mx={1} />
                      <Link
                        to={AuthRoutes.find(route => route.key === "sign-up").path}
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
