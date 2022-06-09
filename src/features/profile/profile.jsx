import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react"
import { LeftSidebar, RightSidebar } from "components"
import { Post } from "features"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ProfileDetailsCard } from "./profileDetailsCard"


export const Profile = () =>{
    const {allPosts} = useSelector((store) => store.posts)
    const {currUsername} = useParams()
    const userPosts = allPosts.filter(({username})=>username===currUsername)
    return(
        <>
        <Box display='flex'>
        <LeftSidebar w='20%' />
        <Flex w='80%' direction='column' backgroundColor={useColorModeValue( 'background','gray.800')} minW='600px' >
            <ProfileDetailsCard />
            <Heading fontSize='28px' as='h6' mx='20' py='4' px='2'>User's Post</Heading>
            {userPosts.length>0?userPosts.map((post)=><Post w='full' key={post._id} post={post} />):<>No Posts Yet</>}
        </Flex>
        
        <RightSidebar w='30%' />
       </Box>
        </>
    )
}