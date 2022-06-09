import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { editUser } from "./userSlice"
// import { toast } from "react-toastify"
// import { createPost, editPost } from "./postSlice"
// import { editUser } from "./userSlice"
console.log(editUser)

export const EditProfileModal = ({ isOpen, onClose, bio, portfolio }) => {
    const initialRef = useRef(null)
    const dispatch = useDispatch()
    // const [postContent,setPostContent] = useState(editPostData?.content||"");
    const [portfolioInput, setPortfolioInput] = useState(portfolio);
    const [bioInput, setBioInput] = useState(bio);
    // const [url, setUrl] = useState();
    const editUserHandler = () => {
        console.log(bioInput,portfolioInput)
            dispatch(editUser({portfolio:portfolioInput,bio:bioInput}))
            onClose()
    }
    return (
        <Modal
          isCentered
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>

            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Bio: </FormLabel>
                <Input onChange={(e)=>setBioInput(e.target.value)} value={bioInput} size='lg' ref={initialRef} />
                <FormLabel mt='20px'>Portfolio Url: </FormLabel>
                <Input onChange={(e)=>setPortfolioInput(e.target.value)} value={portfolioInput} size='lg' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button bg='primary' mr={3} onClick={editUserHandler}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }
  