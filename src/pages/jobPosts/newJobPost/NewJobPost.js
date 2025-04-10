import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    Alert,
    Container,
    Card,
    CssBaseline,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material'
import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import TagField from '../../../components/input/tagField'
import moment from 'moment'
import { useAuth } from '../../../context/AuthContext'
import useEditData from '../../../hooks/useEditData'

const NewJobPost = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState('')
    const { id } = useParams()

    const handleTagChange = tags => {
        setFieldValue('tags', tags)
    }

    const { customFetch } = useAuth();

    const initialValues = {
        title: '',
        body: '',
        priceFrom: '',
        priceTo: '',
        days: '',
        tags: [],
        public: 'yes'
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
        body: Yup.string().required('Required'),
        priceFrom: Yup.number().required('required').test(
            'Is positive?',
            'Price must be greater than 0!',
            (value) => value >= 0
        ),
        priceTo: Yup.number().required('required').min(Yup.ref("priceFrom"), data => `Price To must be greater than ${data.min}`),
        days: Yup.number().integer().required('Required').test(
            'Is positive?',
            'Days must be greater than 0!',
            (value) => value >= 0
        )
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            const data = { ...values, public: values.public === 'yes' }
            customFetch(`/jobPosts/${id || ''}`, {
                method: id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => {
                    return res.json()
                })
                .then((res) => {
                    if (res) {
                        navigate('/myJobPosts');
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

    useEditData(!!id && `/jobPosts/editData/${id}`, data => {
        setFieldValue('title', data.title)
        setFieldValue('body', data.body)
        setFieldValue('priceFrom', data.priceFrom)
        setFieldValue('priceTo', data.priceTo)
        setFieldValue('days', data.days)
        setFieldValue('tags', data.tags)
        setFieldValue('public', data.public ? 'yes' : 'no')
    })

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
                        {id ? 'Edit Job Post' : "New Job Post"}
                    </Typography>
                    <FormikProvider value={formik} >
                        <Form onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                {!!err && <Alert color='error'>{err}</Alert>}
                                <Grid item xs={12} sm={12} >
                                    <TextField
                                        name="title"
                                        size="small"
                                        fullWidth
                                        label="Title"
                                        variant="standard"
                                        {...getFieldProps("title")}
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={touched.title && errors.title}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size="small"
                                        multiline
                                        rows={3}
                                        fullWidth
                                        label="Body"
                                        name="body"
                                        variant="standard"
                                        {...getFieldProps("body")}
                                        error={Boolean(touched.body && errors.body)}
                                        helperText={touched.body && errors.body}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="priceFrom"
                                        label="Price From"
                                        name="priceFrom"
                                        variant="standard"
                                        {...getFieldProps("priceFrom")}
                                        error={Boolean(touched.priceFrom && errors.priceFrom)}
                                        helperText={touched.priceFrom && errors.priceFrom}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="priceTo"
                                        label="Price To"
                                        name="priceTo"
                                        variant="standard"
                                        {...getFieldProps("priceTo")}
                                        error={Boolean(touched.priceTo && errors.priceTo)}
                                        helperText={touched.priceTo && errors.priceTo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="days"
                                        label="Days"
                                        name="days"
                                        variant="standard"
                                        {...getFieldProps("days")}
                                        error={Boolean(touched.days && errors.days)}
                                        helperText={touched.days && errors.days}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <FormLabel id="public">Status</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="public"
                                            {...getFieldProps("public")}
                                            row
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Public" />
                                            <FormControlLabel value="no" control={<Radio />} label="Private" />
                                        </RadioGroup>
                                    </FormControl>
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
export default NewJobPost