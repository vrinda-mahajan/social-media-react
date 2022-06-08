import { Avatar, Box, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { BsBookmark, BsHeart, BsShare, BsThreeDots, BsHeartFill, VscComment, BsBookmarkFill } from "assets";
import { addBookmark, removeBookmark } from "features/profile/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "./comment";
import { PostModal } from "./postModal";
import { deletePost, dislikePost, likePost } from "./postSlice";


export const Post = ({post}) => {
    const { _id,content,likes: {likeCount,likedBy},username,comments } = post
    const {user} = useSelector((store)=>store.auth);
    const {bookmarks} = useSelector((store)=>store.users)
    const {allUsers,postStatus} = useSelector((store)=>store.users);
    const { firstName, lastName, profilePic } = allUsers?.find(user=>user.username===username)
    const dispatch = useDispatch()
    const {onOpen,isOpen,onClose} = useDisclosure()
    const [edit,setEdit] = useState(false)
    const editHandler = () => {
        setEdit(true)
        onOpen()
    }
    return (
        <Box py='6' px='2' mx='5' boxShadow='base' bg={useColorModeValue()} >
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
                        {likedBy.some((likedUser)=>likedUser.username===user.username)
                        ?
                        <IconButton 
                            variant='ghost' 
                            p='5px'
                            fontSize="20px" 
                            icon={<Flex align='center'><BsHeartFill /><Text p='5px'>{`${likeCount}`}</Text></Flex>} 
                            onClick={()=>dispatch(dislikePost(_id))} />
                        :<IconButton 
                        variant='ghost' 
                        p='5px'
                        fontSize="20px" 
                        icon={<Flex align='center'><BsHeart /><Text p='5px'>{`${likeCount}`}</Text></Flex>} 
                        onClick={()=>dispatch(likePost(_id))} />          
                    }
                        <IconButton variant='ghost' p='5px' fontSize="25px" icon={<VscComment />} />
                        <IconButton variant='ghost' p='5px' fontSize="20px" icon={<BsShare />} />

                        {bookmarks.some((bookmarkedPost)=>bookmarkedPost._id===_id)
                        ?<IconButton 
                            onClick={()=>dispatch(removeBookmark(_id))} 
                            variant='ghost' 
                            p='5px' 
                            fontSize="20px" 
                            icon={<BsBookmarkFill />} />
                        :<IconButton 
                            onClick={()=>dispatch(addBookmark(_id))} 
                            variant='ghost' 
                            p='5px' 
                            fontSize="20px" 
                            icon={<BsBookmark />} />}                    
                    </Flex>
                    <Comment _id={_id} comments={comments} />
                </Box>
            </Flex>   
            {edit?<PostModal editPostData={post} setEdit={setEdit} isOpen={isOpen} onClose={onClose} />:<></>}        
        </Box>
    )
}
