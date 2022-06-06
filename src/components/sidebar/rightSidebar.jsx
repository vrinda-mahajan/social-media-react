import { SearchIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, Spacer, Text, useColorModeValue } from "@chakra-ui/react"
import { useSelector } from "react-redux";

export const RightSidebar = () => {
  const { user,token } = useSelector((store) => store.auth);
  const {allUsers} = useSelector((store) => store.users);
  const peopleToFollow = token?(allUsers.filter((singleUser)=>singleUser.username!==user.username)):null
  return(
    <Box 
        minW="350px"
        height="88vh"
        pr="80px"
        py="20px"
        position="sticky"
        left='500'
        top="81px"
        bg={useColorModeValue("background", "gray.800")}>
        <InputGroup my='5'>
            <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
            />
            <Input placeholder='Search Posts, People, anything' size='md' />
        </InputGroup>
        <Text fontSize='xl' as='samp'>People to follow</Text>
            {token
            ?<>
                {peopleToFollow.map((user)=>
                <Flex key={user._id} py='3' alignItems="center">
                    <Avatar mr="10px" name={`${user.firstName} ${user.lastName}`} size="md" src={user.profilePic} />
                    <Flex direction="column">
                        <Heading fontSize='16px' as='h6'>{`${user.firstName} ${user.lastName}`}</Heading>
                        <Text>@{user.username}</Text>
                    </Flex>
                    <Spacer />
                    <Button borderRadius='100px'  variant='ghost'>Follow <SmallAddIcon/></Button>
                </Flex>)}
            </>
            :<></>}
              
    </Box>)
}
