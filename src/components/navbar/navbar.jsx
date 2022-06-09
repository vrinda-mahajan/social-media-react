import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {Avatar,Center,Flex,IconButton,Image,Menu,MenuButton,MenuDivider,MenuItem,MenuList,Spacer,Text,useColorMode,useColorModeValue,} from "@chakra-ui/react";
import { logo, logo2 } from "assets";
import { logoutUser } from "features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const {user,token} = useSelector((store)=>store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = ()=>{
      dispatch(logoutUser())
      navigate("/")
    }
    return (
      <Flex
        pos="sticky"
        py={4}
        px={16}
        top={0}
        borderBottom="1px"
        borderColor={useColorModeValue("green.100", "gray.700")}
        zIndex='2'
        bg={useColorModeValue("white", "gray.800")}
      >
        <Link to="/home">
            <Image w={150} src={useColorModeValue(logo,logo2)} alt='logo' />
        </Link>
        <Spacer />
        <IconButton mr={6} isRound="true" size='lg' variant="ghost" onClick={toggleColorMode}>
          {colorMode=='light'?<MoonIcon w={5} h={5} />:<SunIcon w={5} h={5} />}
        </IconButton>

        {token
        ?<Menu>
          <MenuButton variant="link">
            <Avatar name={`${user.firstName} ${user.lastName}`} size="md" src={user.profilePic} />
          </MenuButton>
          <MenuList minWidth="300px" pt={10} pb={2} px={4}>
            <Center>
              <Avatar name={`${user.firstName} ${user.lastName}`} size="2xl" src={user.profilePic} />
            </Center>
            <Center>
              <Text fontSize="lg">{`${user.firstName} ${user.lastName}`}</Text>
            </Center>
            <MenuDivider pt={2} />
            <MenuItem fontSize="xl">My Account</MenuItem>
            <MenuItem onClick={handleLogout} fontSize="xl">Logout</MenuItem>
          </MenuList>
        </Menu>
        :<></>}
        
      </Flex>
  );
};
