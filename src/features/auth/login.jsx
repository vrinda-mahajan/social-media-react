import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Button, Checkbox, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputRightElement, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import authImg from "assets/images/authentication.svg"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { loginUser } from "./authSlice"
 
export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showPassword, setshowPassword] = useState(false)
    const [userDetails,setUserDetails] = useState({
        username:"",
        password:"",
    })

    const loginHandler = () => {
        if (userDetails.username !=="" && userDetails.password !==""){
             dispatch(loginUser(userDetails));
             navigate("/home");
        }
        else {
            toast.error("Please enter all details");
        }
    }
    const testLoginHandler = () => {
        dispatch(loginUser({username: "adarshbalika",password: "adarshBalika123"}));
        navigate("/home");
    }

    return (
        <Stack align='center' minH={"90vh"} bg={useColorModeValue('background',"gray.800")} >
        <Flex w={[350,400,450]} my={4} px={10} py={4} boxShadow='xl' rounded='2xl' bg={useColorModeValue('white',"gray.700")}  direction="column" gap={3} >
            <Stack alignItems='center' spacing={8}>
                <Heading>Login</Heading>
                <Image w={100} src={authImg} alt='auth img' />
            </Stack>
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

            <Checkbox size='lg' pb={3}>Remember me</Checkbox>
            <Button onClick={()=>loginHandler()} bg='primary' variant='solid'>Login</Button>
            <Button onClick={()=>testLoginHandler()} color='primary' variant='outline'>Guest Login</Button>
            <Text>Not a user yet?  
                <Link to="/signup"> Create Account</Link>
            </Text>
        </Flex>
        </Stack>
    )
}
