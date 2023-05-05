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
  MenuDivider,
  Image,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';

import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons';

import {PrimarySiteRoutes, SecondarySiteRoutes} from "./SiteRoutes";

import {nanoid} from "nanoid";

import {Outlet, Link as ReactRouterLink} from "react-router-dom";

import logo from "../../assets/logo-1.jpg";

const NavLink = ({ href, children }) => (
  <Link
    as={ReactRouterLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={href}>
    {children}
  </Link>
);

const SiteLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (<>
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Image borderRadius='full'
               boxSize='50px'
               src={logo}
               alt='Company Logo' />
          </Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {PrimarySiteRoutes.map((route) => (
              <NavLink key={nanoid(5)} href={route.path}>{route.label}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {SecondarySiteRoutes.map((route) => (
            <NavLink key={nanoid(5)} href={route.path}>{route.label}</NavLink>
          ))}
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Link 1</MenuItem>
              <MenuItem>Link 2</MenuItem>
              <MenuDivider />
              <MenuItem>Link 3</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {PrimarySiteRoutes.map((route) => (
              <NavLink key={nanoid(5)} href={route.path}>{route.label}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>

    <Box p={4}>
      <Outlet />
    </Box>
  </>);
};

export default SiteLayout;
