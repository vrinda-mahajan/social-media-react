import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Button, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputRightElement, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import authImg from "assets/images/authentication.svg"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { signupUser } from "./authSlice"
 
export const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)

    const [userDetails,setUserDetails] = useState({
        firstname:"",
        lastname:"",
        username:"",
        password:"",
        confirmPassword:"",
    })
    const signupHandler = () => {
        if (userDetails.password !== userDetails.confirmPassword){
            toast.error("Confirm password doesn't match");
        }
        else if (userDetails.firstname==="" || userDetails.lastname==="" ||userDetails.username==="" || userDetails.password==="" ||  userDetails.confirmPassword===""){
            toast.error("Please enter all details");
        }
        else{
            dispatch(signupUser(userDetails));
            navigate("/");
        }
    }

    return (
        <Stack align='center' bg={useColorModeValue('background',"gray.800")} >
        <Flex w={[350,400,450]} my={4} p={10} boxShadow='xl' rounded='2xl' bg={useColorModeValue('white',"gray.700")}  direction="column" gap={3} >
            <Stack alignItems='center' spacing={8}>
                <Heading>Signup</Heading>
                <Image w={100} src={authImg} alt='auth img' />
            </Stack>
            <Flex gap={5}>
                {/* Firstname */}
                <FormControl isRequired>
                    <FormLabel htmlFor='firstname'>Firstname</FormLabel>
                    <Input onChange={(e)=>{setUserDetails(prev=>({...prev,firstname:e.target.value}))}} id='firstname' placeholder='Firstname' />
                </FormControl>
                {/* Lastname */}
                <FormControl isRequired>
                    <FormLabel htmlFor='lastname'>Lastname</FormLabel>
                    <Input onChange={(e)=>{setUserDetails(prev=>({...prev,lastname:e.target.value}))}} id='lastname' placeholder='Lastname' />
                </FormControl>
            </Flex>
            {/* Username */}
            <FormControl isRequired>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input onChange={(e)=>{setUserDetails(prev=>({...prev,username:e.target.value}))}} id='username' placeholder='Username' />
            </FormControl>
            {/* Password */}
            <FormControl isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup size='md'>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    onChange={(e)=>{setUserDetails(prev=>({...prev,password:e.target.value}))}}
                />
                <InputRightElement mt={1} width='4.5rem'>
                    <IconButton variant='ghost' size='lg' onClick={() => setshowPassword(!showPassword)}>
                    {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                    </IconButton>
                </InputRightElement>
                </InputGroup>
            </FormControl>
            {/* Confirm password */}
            <FormControl isRequired>
                <FormLabel htmlFor='password'>Confirm Password</FormLabel>
                <InputGroup size='md'>
                <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm password'
                    onChange={(e)=>{setUserDetails(prev=>({...prev,confirmPassword:e.target.value}))}}
                />
                <InputRightElement mt={1} width='4.5rem'>
                    <IconButton variant='ghost' size='lg' onClick={() => setshowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <ViewIcon/> : <ViewOffIcon/>}
                    </IconButton>
                </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button onClick={()=>signupHandler()} bg='primary' variant='solid'>Signup</Button>
            <Text>Already a user?
                <Link to="/login"> Login here</Link>
            </Text>
        </Flex>
        </Stack>
    )
}
