import React from 'react'
import { 
    Card,
    CardHeader,
    Stack,
    Avatar,
    IconButton,
    Typography,
    Container,
    CssBaseline,
    Box,
    Grid,
    Button,
    TextField,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/Lock';
import { Outlet } from 'react-router-dom'

const AuthenticationLayout = ({children}) => {
    return(
        <Container component="main" maxWidth="xs" >
            <Card sx={{  p: 2, boxShadow: 2, mt: 8 }}  >
                <CssBaseline />
                <Box
                    sx={{
                        // marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Outlet>
                        {children}
                    </Outlet>
                </Box>
            </Card>
        </Container>
    )
}
export default AuthenticationLayout
