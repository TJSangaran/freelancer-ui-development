import React, { useState } from 'react'
import {
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Alert,
    CircularProgress,
    FormControl,
    InputLabel,
    Input
} from '@mui/material'
import { red } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const SignIn = () => {
    const navigate = useNavigate()

    const { login } = useAuth()
    const [err, setErr] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            setErr(null)
            login(values.email, values.password, values.rememberMe)
                .then(() => {
                    navigate('/dashboard', { replace: true });
                })
                .catch(error => {
                    setErr('invalid credentials')
                    setSubmitting(false)
                })
        }
    })

    const { errors, touched, values, isSubmitting, setSubmitting, handleChange, handleSubmit, setFieldValue, getFieldProps, resetForm } = formik;

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <FormikProvider value={formik} >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        size='small'
                        variant="standard"
                        autoComplete="email"
                        autoFocus
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <FormControl variant="standard" sx={{ width: '100%', mt: 2 }}>
                        <InputLabel htmlFor="standard-adornment-password" error={Boolean(touched.password && errors.password)}>Password *</InputLabel>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            required
                            fullWidth
                            size='small'
                            name="password"
                            label="Password"
                            variant="standard"
                            id="password"
                            autoComplete="current-password"
                            {...getFieldProps("password")}
                            error={Boolean(touched.password && errors.password)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {touched.password && errors.password && <FormHelperText id="component-helper-text" error={true}>
                            {errors.password}
                        </FormHelperText>}
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        name='rememberMe'
                        {...getFieldProps("rememberMe")}
                    />
                    {err && <Alert severity="error">{err}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        disabled={isSubmitting}
                    >
                        Sign In
                        {isSubmitting && <CircularProgress size={14} sx={{ ml: 2 }} />}
                    </Button>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Link to="/auth/signup" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item >
                            <Link to="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                </Box>
            </FormikProvider>
        </React.Fragment>
    )
}
export default SignIn