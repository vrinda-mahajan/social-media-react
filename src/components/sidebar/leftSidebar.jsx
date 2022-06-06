import { Avatar, Box, Button, Flex, Icon, Text, useColorModeValue, useDisclosure,} from "@chakra-ui/react";
import { AiOutlineHome, BiBookmarks, CgProfile, MdOutlineExplore } from "assets";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { PostModal } from "features";

export const LeftSidebar = () => {
  const {isOpen,onOpen,onClose} = useDisclosure()
  const { user,token } = useSelector((store) => store.auth);

  const sidebarData = [
    { title: "Home", icon: AiOutlineHome, route: "/" },
    { title: "Explore", icon: MdOutlineExplore, route: "/explore" },
    { title: "Bookmarks", icon: BiBookmarks, route: "/bookmarks" },
    { title: "Profile", icon: CgProfile, route: "/profile" },
  ];
  return (
    <Box
      minW="300px"
      height="88vh"
      pl="80px"
      py="20px"
      position="sticky"
      top="81px"
      bg={useColorModeValue("background", "gray.800")}
    >
      <Box>
        {sidebarData.map((data) => (
          <NavLink key={data.route} to={data.route}>
            {({ isActive }) => (
              <Flex
                py="8px"
                gap="4"
                alignItems="center"
                color={isActive ? "primary" : "inherit"}
              >
                <Icon fontSize="25px" as={data.icon} />
                <Text fontSize="16px">{data.title}</Text>
              </Flex>
            )}
          </NavLink>
        ))}
      </Box>
      <Button
        my="40px"
        height="42px"
        width="170px"
        fontSize='lg'
        backgroundColor="primary"
        color='gray.800'
        onClick={onOpen}
      >
        Create new Post
      </Button>
      <PostModal isOpen={isOpen} onClose={onClose} />
      {token
      ?<Flex mt="230px" alignItems="center">
      <Avatar mr="10px" name="User profile" size="md" src={user.profilePic} />
      <Flex direction="column">
        <Text>{user.firstName}</Text>
        <Text>@{user.username}</Text>
      </Flex>
    </Flex>
    :<></>}
      
    </Box>
  );
};
