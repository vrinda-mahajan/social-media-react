import { Flex, Avatar, Text, InputGroup, Input, InputRightElement, Button, useColorModeValue, Box, Heading, IconButton } from "@chakra-ui/react"
import { useState } from "react";
import { MdDelete } from "assets";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { addComment, deleteComment } from "./postSlice";


export const Comment = ({_id,comments}) => {
    const dispatch = useDispatch()
    const {user} = useSelector((store)=>store.auth)
    const {allUsers} = useSelector(store=>store.users);
    const {postStatus} = useSelector(store=>store.posts)
    const commentBgColor = useColorModeValue("white","gray.700")
    const [commentText , setCommentText] = useState("")
    const commentHandler = () => {
        if(commentText===""){
            toast.warning("Comment cant't be Empty!")
        }
        else{
            dispatch(addComment({postId:_id,commentData:{text:commentText}}))
            setCommentText("")
        }
    }
    return(
        <Box mt='16px'>
            <InputGroup size='md'>
            <Input
                p='20px'
                value={commentText}
                placeholder='Comment here'
                onChange={(e)=>setCommentText(e.target.value)}
            />
            <InputRightElement width='24'>
                <Button onClick={commentHandler} mr="5px" p='10px' h="80%" bg="primary" color="white" _hover={{ bg: 'gray.700' }} zIndex='0'>
                Comment
                </Button>
            </InputRightElement>
            </InputGroup>
            {postStatus==="success" && comments?.map((comment)=>{
                const {firstName,lastName,profilePic} = allUsers?.find((user)=>user.username===comment.username)
                return(
            <Flex key={comment._id} bg={commentBgColor} my='16px' p='8px' borderRadius='10px' >
                <Avatar mr="10px" name={`${firstName} ${lastName}`} size="sm" src={profilePic} />
                <Box w='full'>
                    <Flex pb='5px' align='center' gap='1' >
                        <Heading fontSize='16px'>{`${firstName} ${lastName}`}</Heading>
                    </Flex>
                    <Text>{comment.text}</Text>
                </Box>
                {comment.username==user.username &&
                <IconButton onClick={() => dispatch(deleteComment({postId:_id,commentId:comment._id}))} variant='ghost' fontSize="25px" icon={<MdDelete />} />
                }
            </Flex>)})}
        
        </Box>
    )
}
