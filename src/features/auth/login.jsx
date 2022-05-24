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
             navigate("/");
        }
        else {
            toast.error("Please enter all details");
        }
    }
    const testLoginHandler = () => {
        dispatch(loginUser({username: "adarshbalika",password: "adarshBalika123"}));
        navigate("/");
    }

    return (
        <Stack align='center' bg={useColorModeValue('background',"gray.800")} >
        <Flex w={[300,400,450,500]} my={4} p={10} boxShadow='xl' rounded='2xl' bg={useColorModeValue('white',"gray.700")}  direction="column" gap={3} >
            <Stack alignItems='center' spacing={8}>
                <Heading>Login</Heading>
                <Image w={150} src={authImg} alt='auth img' />
            </Stack>
            {/* Username */}
            <FormControl isRequired>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input onChange={(e)=>{setUserDetails(prev=>({...prev,username:e.target.value}))}} size='lg' id='username' placeholder='Username' />
            </FormControl>
            {/* Password */}
            <FormControl isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup size='md'>
                <Input
                    size='lg'
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
