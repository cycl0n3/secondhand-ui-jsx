import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Image,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { GuestRoutes, AuthRoutes, UserRoutes } from "./SiteRoutes";

import { nanoid } from "nanoid";

import { Outlet, Link as ReactRouterLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/logo-1.jpg";

import { UserContext } from "../context/UserContext";

import { useContext } from "react";

import { CgLogOff } from "react-icons/cg";

import { BsMoonStarsFill, BsSun } from "react-icons/all.js";

const NavLink = ({ href, page, children }) => {
  const color =
    page.path === href
      ? useColorModeValue("red.100", "blue.900")
      : useColorModeValue("gray.100", "gray.900");

  return (
    <Box bg={color}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link
          as={ReactRouterLink}
          px={2}
          py={1}
          rounded={"md"}
          _hover={{
            textDecoration: "none",
          }}
          to={href}
        >
          {children}
        </Link>
      </Flex>
    </Box>
  );
};

const SiteLayout = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setUserToLocalStorage } = useContext(UserContext);

  const navigate = useNavigate();

  const location = useLocation();

  const { colorMode, toggleColorMode } = useColorMode();

  const currentPage =
    GuestRoutes.find((route) => route.path === location.pathname) ||
    AuthRoutes.find((route) => route.path === location.pathname) ||
    UserRoutes.find((route) => route.path === location.pathname);

  const sign_in_url = AuthRoutes.find((route) => route.path === "/sign-in").path;

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image
                borderRadius="full"
                boxSize="50px"
                src={logo}
                alt="Company Logo"
              />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {!user &&
                GuestRoutes.map((route) => (
                  <NavLink key={nanoid(5)} href={route.path} page={currentPage}>
                    {route.label}
                  </NavLink>
                ))
              }
              {user &&
                UserRoutes.map((route) => (
                  <NavLink key={nanoid(5)} href={route.path} page={currentPage}>
                    {route.label}
                  </NavLink>
                ))
              }
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {!user &&
              AuthRoutes.map((route) => (
                <NavLink key={nanoid(5)} href={route.path} page={currentPage}>
                  {route.label}
                </NavLink>
              ))
            }
            {user && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      setUserToLocalStorage(null);
                      navigate(sign_in_url);
                    }}
                    icon={<Icon as={CgLogOff} boxSize={6} />}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
            <Button
              marginLeft={5}
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              _focus={{ boxShadow: "none" }}
              w="fit-content"
              {...props}
            >
              {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {GuestRoutes.map((route) => (
                <NavLink key={nanoid(5)} href={route.path} page={currentPage}>
                  {route.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
        <Outlet />
      </Box>
    </>
  );
};

export default SiteLayout;
