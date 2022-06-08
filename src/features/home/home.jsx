import { UpDownIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Spacer, useColorModeValue } from "@chakra-ui/react"
import { LeftSidebar, RightSidebar } from "components"
import { Post } from "features/post/post"
import { PostTextbox } from "features/post/postTextbox"
import { useState } from "react"
import { useSelector } from "react-redux"
import { getFilteredData } from "utils/getFilteredData"

export const Home = () => {
    const {user,token} = useSelector((store)=>store.auth);
    const {allUsers} = useSelector((store)=>store.users);
    const {allPosts} = useSelector((store)=>store.posts);
    const [filterBy,setFilterBy] = useState("")

    let feedPosts = token?(allPosts?.filter((post)=>post.username===user.username)):'null'
    if(filterBy!==""){
        feedPosts= getFilteredData(filterBy,feedPosts)
    }
   return(
       <Box display='flex'>
        <LeftSidebar w='20%' />
        <Flex w='80%' direction='column' backgroundColor={useColorModeValue( 'background','gray.800')} minW='600px' >
            <PostTextbox />
            <Flex align='center' mx='5' py='4' px='2'>
                <Heading fontSize='24px' as='h6'>Posts</Heading>
                <Spacer />
        <Menu>
          <MenuButton
            as={Button}
            variant='ghost'
            rightIcon={<UpDownIcon />}
          >Filter by</MenuButton>
          <MenuList>
            <MenuItem onClick={()=>setFilterBy("trending")}>Trending</MenuItem>
            <MenuItem onClick={()=>setFilterBy("oldest")}>Oldest</MenuItem>
            <MenuItem onClick={()=>setFilterBy("recent")}>Recent</MenuItem>
          </MenuList>
        </Menu>
        </Flex>
            {token?feedPosts.map((post)=><Post key={post._id} post={post} />):<></>}
        </Flex>
        <RightSidebar w='30%' />
       </Box>
        )
}
