import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react"
import { LeftSidebar, RightSidebar } from "components"
import { Post } from "features"
import { useSelector } from "react-redux"

export const Bookmark = () => {
    const {bookmarks} = useSelector((store)=>store.users)
    let bookmarkIdArray = []
    bookmarks.map((bookmark)=>bookmarkIdArray.push(bookmark._id))
    const {allPosts} = useSelector(store=>store.posts);
    const bookmarkPosts = allPosts.filter((post)=>bookmarkIdArray.includes(post._id));
   
    return (
        <Box display='flex'>
        <LeftSidebar w='20%' />
        <Flex w='80%' direction='column' backgroundColor={useColorModeValue( 'background','gray.800')} minW='600px' >
        {bookmarkPosts.length>0?
            <>
                <Heading fontSize='28px' as='h6' mx='20' py='4' px='2'>Bookmarked Posts</Heading>
                {bookmarkPosts.map((post)=><Post key={post._id} post={post} />)}
            </>
            :<Heading align='center' fontSize='28px' as='h6' mx='20' py='4' px='2'>No Bookmark Added</Heading>}
        </Flex>
        
        <RightSidebar w='30%' />
       </Box>
    )
}
