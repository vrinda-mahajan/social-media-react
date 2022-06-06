import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { createPost, editPost } from "./postSlice"


export const PostModal = ({ isOpen, onClose, setEdit, editPostData }) => {
    const initialRef = useRef(null)
    const dispatch = useDispatch()
    const [postContent,setPostContent] = useState(editPostData?.content||"");

    const createPostHandler = () => {
        if(editPostData){
            dispatch(editPost({...editPostData,content:postContent}))
            setEdit(false)
        }else if(postContent){
            dispatch(createPost({content:postContent}))
            setPostContent("")
            onClose();
        }else{
            toast.warning("Post can't be empty!");
        }
    }
    return (
      <>
        <Modal
          isCentered
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>

            <ModalHeader>{setEdit?`Edit Post`:`Create new Post`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Enter Post Content here</FormLabel>
                <Input onChange={(e)=>setPostContent(e.target.value)} value={postContent} size='lg' height='80px' ref={initialRef} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button bg='primary' mr={3} onClick={createPostHandler}>
                {setEdit?`Edit`:`Post`}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  