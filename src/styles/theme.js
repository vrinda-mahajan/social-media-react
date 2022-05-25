import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
},
})

export const customTheme = extendTheme({
colors: {
    primary:'#53c050',
    primary2: '#1a3826',
    background: '#f4f6fa',
    text: '#404156',
    },
})