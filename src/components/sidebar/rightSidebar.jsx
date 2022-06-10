import { SearchIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, Spacer, Text, useColorModeValue } from "@chakra-ui/react"
import { followUser } from "features/profile/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const RightSidebar = () => {
  const { user,token } = useSelector((store) => store.auth);
  const {allUsers} = useSelector((store) => store.users);
  const dispatch = useDispatch()
  const peopleToFollow = token?(allUsers.filter((singleUser)=>singleUser.username!==user.username)):null
  return(
    <Box 
        minW="350px"
        height="88vh"
        pr="70px"
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
                {peopleToFollow.map((currUser)=>
                <Flex key={currUser._id} py='3' alignItems="center">
                    <Link to={`/profile/${currUser.username}`}>
                        <Flex>
                            <Avatar mr="10px" name={`${currUser.firstName} ${currUser.lastName}`} size="md" src={currUser.profilePic} />
                            <Flex direction="column">
                                <Heading fontSize='16px' as='h6'>{`${currUser.firstName} ${currUser.lastName}`}</Heading>
                                <Text>@{currUser.username}</Text>
                            </Flex>
                        </Flex>
                    </Link>
                    <Spacer />
                    {currUser.followers.some(({username})=>username===user.username)
                    ?<Button borderRadius='100px' variant='ghost'>Following</Button>
                    :<Button onClick={()=>dispatch(followUser(currUser._id))} borderRadius='100px'  variant='ghost'>Follow <SmallAddIcon/></Button>}
                    
                </Flex>)}
            </>
            :<></>}
              
    </Box>)
}
