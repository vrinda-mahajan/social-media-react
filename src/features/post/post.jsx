import { Avatar, Box, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { BsBookmark, BsHeart, BsShare, BsThreeDots, BsHeartFill, VscComment } from "assets";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostModal } from "./postModal";
import { deletePost, likePost } from "./postSlice";


export const Post = ({post}) => {
    const { _id,content,likes: {likeCount,likedBy},username,comments } = post
    const {user} = useSelector((store)=>store.auth);
    const {allUsers} = useSelector((store)=>store.users);
    const { firstName, lastName, profilePic } = allUsers?.find(user=>user.username===username)
    const dispatch = useDispatch()
    const {onOpen,isOpen,onClose} = useDisclosure()
    const [edit,setEdit] = useState(false)
    const likeHandler = () => {}
    const editHandler = () => {
        setEdit(true)
        onOpen()
    }
    return (
        <Box py='6' px='2' mx='20' boxShadow='base' bg={useColorModeValue()} >
            <Flex mx='10'>
                <Avatar mr="10px" name={`${firstName} ${lastName}`} size="md" src={profilePic} />
                <Box w='full'>
                    <Flex pb='5px' align='center' gap='1' >
                        <Heading fontSize='16px'>{`${firstName} ${lastName}`}</Heading>
                        <Text>{`@${username}`}</Text>
                        <Spacer />
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<BsThreeDots />}
                                variant='ghost'
                            />
                            <MenuList>
                                <MenuItem onClick={editHandler}>Edit</MenuItem>
                                <MenuItem onClick={()=>dispatch(deletePost(_id))}>Delete</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                    <Text> {content} </Text>
                    <Flex pt='20px' justify='space-between'>
                        <IconButton variant='ghost' mr='5' fontSize="20px" icon={<BsHeart/>} onClick={likeHandler} />
                        <IconButton variant='ghost' mr='5' fontSize="25px" icon={<VscComment />} />
                        <IconButton variant='ghost' mr='5' fontSize="20px" icon={<BsShare />} />
                        <IconButton variant='ghost' mr='5' fontSize="20px" icon={<BsBookmark />} />
                    </Flex>
                </Box>
            </Flex>   
            {edit?<PostModal editPostData={post} setEdit={setEdit} isOpen={isOpen} onClose={onClose} />:<></>}        
        </Box>
    )
}
