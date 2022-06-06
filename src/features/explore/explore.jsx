import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react"
import { LeftSidebar, RightSidebar } from "components"
import { Post } from "features/post/post"
import { useSelector } from "react-redux"

export const Explore = () => {
    const {allPosts} = useSelector((store)=>store.posts);
    const explorePosts = [...allPosts].reverse()
    console.log([...allPosts].reverse())
    return(
        <Box display='flex'>
        <LeftSidebar w='20%' />
        <Flex w='80%' direction='column' backgroundColor={useColorModeValue( 'background','gray.800')} minW='600px' >
            <Heading fontSize='28px' as='h6' mx='20' py='4' px='2'>Latest Posts</Heading>
            {explorePosts.map((post)=><Post key={post._id} post={post} />)}
        </Flex>
        <RightSidebar w='30%' />
       </Box>
        )
}
