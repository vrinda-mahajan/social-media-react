import { Avatar, Box, Button, Flex, Heading, Link, Text, useDisclosure } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { EditProfileModal } from "./editProfileModal";
import { followUser, unfollowUser } from "./userSlice";

export const ProfileDetailsCard = () => {
    const dispatch = useDispatch()
    const {isOpen,onOpen,onClose} = useDisclosure()
    const {user} = useSelector((store) =>store.auth)
    const {allUsers} = useSelector((store) =>store.users)
    const {allPosts} = useSelector((store) => store.posts)
    const {currUsername} = useParams()
    const selectedUser = allUsers.find(({username})=>username===currUsername)
    const {_id,firstName,lastName,username,bio,profilePic,portfolio,followers,following} = selectedUser;
    const userPosts = allPosts.filter(({username})=>username===currUsername)
    const followHandler = () => {
        dispatch(followUser(_id));
    }
    return(
        <Flex mt='50px' align='center' direction='column'>
            {console.log("Following",selectedUser.following,"followers",selectedUser.followers)}
            <Box p='16px' align='center' w={'350px'} boxShadow='base'>
                <Avatar mr="10px" name={username} size="2xl" src={profilePic} />
                <Heading pt='20px' fontSize='20px'>{`${firstName} ${lastName}`}</Heading>
                <Text>@{username}</Text>
                <Text pt='10px' fontSize="18px" >{bio}</Text>
                <Link color={'blue.600'}>{portfolio}</Link>
                <Flex mt='20px' justifyContent='space-around'>
                    <Flex align='center' direction='column' >
                        <Text>{followers.length}</Text>
                        <Heading size='16px'>Followers</Heading>
                    </Flex>
                    <Flex align='center' direction='column' >
                        <Text>{userPosts.length}</Text>
                        <Heading size='16px'>Posts</Heading>
                    </Flex>
                    <Flex align='center' direction='column' >
                        <Text>{following.length}</Text>
                        <Heading size='16px'>Following</Heading>
                    </Flex>
                </Flex>
                {user.username===username
                ?<Button mt="20px" width="80px" backgroundColor="primary" color='white' _hover={{bg: 'gray.700'}} onClick={onOpen} >
                    Edit
                </Button>
                :(selectedUser && selectedUser?.followers.some(users=>users.username===user.username))?
                <Button mt="20px" width="100px" backgroundColor="primary" color='white' _hover={{bg: 'gray.700'}} >
                    Following
                </Button>
                :<Button mt="20px" width="100px" backgroundColor="primary" color='white' _hover={{bg: 'gray.700'}} onClick={followHandler} >
                    Follow
                </Button>}
                
            </Box>
           
            <EditProfileModal isOpen={isOpen} onClose={onClose} bio={bio} portfolio={portfolio} />
        </Flex>
    )
}