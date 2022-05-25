import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Center,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "assets/images/logo.png";
import logo2 from "assets/images/logo2.png";
import profile from "assets/images/profile.png";
import { logoutUser } from "features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const dispatch = useDispatch()
  return (
      <Flex
        pos="sticky"
        py={4}
        px={6}
        top={0}
        borderBottom="1px"
        borderColor={useColorModeValue("green.100", "gray.700")}
        zIndex='2'
        bg={useColorModeValue("white", "gray.800")}
      >
        <Link to="/">
            <Image w={150} src={useColorModeValue(logo,logo2)} alt='logo' />
        </Link>
        <Spacer />
        <IconButton mr={6} isRound="true" size='lg' variant="ghost" onClick={toggleColorMode}>
          {colorMode=='light'?<MoonIcon w={5} h={5} />:<SunIcon w={5} h={5} />}
        </IconButton>

        <Menu>
          <MenuButton variant="link">
            <Avatar name="User profile" size="md" src={profile} />
          </MenuButton>
          <MenuList minWidth="300px" pt={10} pb={2} px={4}>
            <Center>
              <Avatar name='User profile' size="2xl" src={profile} />
            </Center>
            <Center>
              <Text fontSize="lg">Username</Text>
            </Center>
            <MenuDivider pt={2} />
            <MenuItem fontSize="xl">My Account</MenuItem>
            <MenuItem onClick={()=>dispatch(logoutUser())} fontSize="xl">Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
  );
};
