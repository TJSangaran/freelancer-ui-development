import React, { useState } from 'react'
import {
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    Alert,
    Container,
    Card,
    CssBaseline
} from '@mui/material'
import { red } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import TagField from '../../components/input/tagField'
import moment from 'moment'
import { useAuth } from '../../context/AuthContext'

const EditProfile = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState('')

    const handleTagChange = tags => {
        setFieldValue('tags', tags)
    }

    const { user: { firstname, lastname, phone, description, tags, dob, readyToWork, address: { street, city, town, country } }, customFetch, getUserInfo } = useAuth();

    const initialValues = { firstname, lastname, phone, description, tags, street, town, city, country, dob: moment(dob).format('yyyy-DD-mm'), readyToWork }

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        phone: Yup.string().required('required'),
        street: Yup.string().required('required'),
        town: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        dob: Yup.date()
            .required('Date of birth is required')
            .test(
                "DOB",
                "User should be 18 years or older",
                (date) => moment().diff(moment(date), "years") >= 18
            ),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            const data = {
                address: { city: values.city, town: values.town, street: values.street, country: values.country },
                readyToWork: values.readyToWork,
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                phone: values.phone,
                description: values.description,
                tags: values.tags,
                dob: values.dob,
            }
            customFetch('/user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => {
                    return res.json()
                })
                .then((res) => {
                    if (res) {
                        navigate('/profile');
                        getUserInfo()
                    }
                    else {
                        setErr('error occured')
                    }
                })
                .catch(error => {
                    setSubmitting(false)
                })
        }
    })
    const { errors, touched, values, isSubmitting, setSubmitting, handleChange, handleSubmit, setFieldValue, getFieldProps, resetForm, setFieldError } = formik;

    return (
        <Container maxWidth="lg">
            <Card sx={{ p: 2, boxShadow: 2 }}  >
                <CssBaseline />
                <Box
                    sx={{
                        // marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" mb={2}>
                        Edit Profile
                    </Typography>
                    <FormikProvider value={formik} >
                        <Form onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                {!!err && <Alert color='error'>{err}</Alert>}
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        //name="firstname"
                                        size="small"
                                        fullWidth
                                        //id="firstname"
                                        label="First Name"
                                        variant="standard"
                                        {...getFieldProps("firstname")}
                                        error={Boolean(touched.firstname && errors.firstname)}
                                        helperText={touched.firstname && errors.firstname}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        size="small"
                                        fullWidth
                                        //id="lastname"
                                        label="Last Name"
                                        //name="lastname"
                                        variant="standard"
                                        {...getFieldProps("lastname")}
                                        error={Boolean(touched.lastname && errors.lastname)}
                                        helperText={touched.lastname && errors.lastname}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        //id="phone"
                                        label="Phone Number"
                                        //name="phone"
                                        variant="standard"
                                        {...getFieldProps("phone")}
                                        error={Boolean(touched.phone && errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        type='date'
                                        label="DOB"
                                        //name="dob"
                                        variant="standard"
                                        {...getFieldProps("dob")}
                                        error={Boolean(touched.dob && errors.dob)}
                                        helperText={touched.dob && errors.dob}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="Street"
                                        //name="street"
                                        variant="standard"
                                        {...getFieldProps("street")}
                                        error={Boolean(touched.street && errors.street)}
                                        helperText={touched.street && errors.street}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="Town"
                                        //name="town"
                                        variant="standard"
                                        {...getFieldProps("town")}
                                        error={Boolean(touched.town && errors.town)}
                                        helperText={touched.town && errors.town}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="City"
                                        //name="city"
                                        variant="standard"
                                        {...getFieldProps("city")}
                                        error={Boolean(touched.city && errors.city)}
                                        helperText={touched.city && errors.city}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="Country"
                                        //name="country"
                                        variant="standard"
                                        {...getFieldProps("country")}
                                        error={Boolean(touched.country && errors.country)}
                                        helperText={touched.country && errors.country}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size="small"
                                        multiline
                                        rows={3}
                                        fullWidth
                                        //id="description"
                                        label="Description"
                                        //name="description"
                                        variant="standard"
                                        {...getFieldProps("description")}
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TagField
                                        onTagChange={handleTagChange}
                                        tags={values.tags}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, px: 6 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Loading...' : 'Save'}
                                </Button>
                            </Box>
                        </Form>
                    </FormikProvider>
                </Box>
            </Card>
        </Container>
    )
}
export default EditProfile