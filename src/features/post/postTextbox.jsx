import { Avatar, Box, Button, Flex, Icon, Spacer, Textarea, useColorModeValue } from "@chakra-ui/react"
import { AiOutlineFileGif, BsEmojiLaughing, MdOutlinePhoto } from "assets";
import { createPost } from "./postSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";

export const PostTextbox = () => {
    const dispatch = useDispatch()
    const {user,token} = useSelector((store)=>store.auth)
    const [postContent,setPostContent] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (emojiObject) => {
        setPostContent((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
      };

    const createPostHandler = () => {
        if(postContent){
            dispatch(createPost({content:postContent}))
            setPostContent("")
        }
        else{
            toast.warning("Post can't be empty!");
        }
    }
    return (
        <Box mx='20' py='6' px='2' boxShadow='base' >
            <Flex mx='10'>
                {token?<Avatar mr="10px" name={user.username} size="md" src={user.profilePic} />:<></>}
                
                <Box w='full'>
                    <Textarea onChange={(e)=>setPostContent(e.target.value)} value={postContent} bg={useColorModeValue('white','gray.700')} mb='5' height='120px' placeholder='Here is a sample placeholder' />
                    <Flex position='relative' background={useColorModeValue('background','gray.800')}>
                        <Icon cursor='pointer' mr='5' fontSize="27px" as={MdOutlinePhoto} />
                        <Icon cursor='pointer' mr='5' fontSize="25px" as={AiOutlineFileGif} />
                        <Icon cursor='pointer' mr='5' fontSize="25px" as={BsEmojiLaughing} onClick={() => setShowPicker((val) => !val)} />
                        {showPicker && (
                            <Picker bg={'primary'} zIndex={7} pickerStyle={{ width: "50%",position:'absolute',top:'25px',left:"100px",background:"inherit" }} onEmojiClick={onEmojiClick} />
                        )}
                        <Spacer />
                        <Button px='8' bg='primary' size='md' onClick={createPostHandler}>Post</Button>
                    </Flex>
                </Box>
            </Flex>           
        </Box>
    )
}

